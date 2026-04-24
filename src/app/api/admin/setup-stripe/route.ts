import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { requireAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";

type Catalog = {
  name: string;
  price: number; // cents
  recurring: "month" | null;
  envKey: string;
};

const CATALOG: Catalog[] = [
  // Growth Systems
  {
    name: "Growth Systems — Starter",
    price: 29700,
    recurring: "month",
    envKey: "STRIPE_PRICE_GS_STARTER",
  },
  {
    name: "Growth Systems — Growth",
    price: 59700,
    recurring: "month",
    envKey: "STRIPE_PRICE_GS_GROWTH",
  },
  {
    name: "Growth Systems — Scale",
    price: 99700,
    recurring: "month",
    envKey: "STRIPE_PRICE_GS_SCALE",
  },

  // Maintenance (shared $199/mo)
  {
    name: "Monthly Maintenance",
    price: 19900,
    recurring: "month",
    envKey: "STRIPE_PRICE_MAINTENANCE",
  },

  // Property products (one-time)
  {
    name: "PropertyDocz Setup",
    price: 50000,
    recurring: null,
    envKey: "STRIPE_PRICE_DOCZ_SETUP",
  },
  {
    name: "PropertyJobz Setup",
    price: 50000,
    recurring: null,
    envKey: "STRIPE_PRICE_JOBZ_SETUP",
  },
  {
    name: "PropertyDocz + PropertyJobz Combined Setup",
    price: 100000,
    recurring: null,
    envKey: "STRIPE_PRICE_PROPERTY_COMBINED",
  },
];

/**
 * Idempotent: finds an existing product by exact name, and its matching price
 * (same unit_amount + currency + recurring interval). Only creates when
 * nothing matches.
 */
async function ensureProductPrice(item: Catalog): Promise<{
  productId: string;
  priceId: string;
  created: boolean;
}> {
  // 1. Find product by name
  const productSearch = await stripe.products.search({
    query: `name:'${item.name.replace(/'/g, "\\'")}'`,
  });
  let product = productSearch.data[0];
  if (!product) {
    product = await stripe.products.create({ name: item.name });
  }

  // 2. Find matching price
  const priceList = await stripe.prices.list({
    product: product.id,
    active: true,
    limit: 100,
  });
  const matchingPrice = priceList.data.find(
    (p) =>
      p.unit_amount === item.price &&
      p.currency === "usd" &&
      (item.recurring
        ? p.recurring?.interval === item.recurring
        : p.recurring === null),
  );

  if (matchingPrice) {
    return { productId: product.id, priceId: matchingPrice.id, created: false };
  }

  // 3. Create new price
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: item.price,
    currency: "usd",
    ...(item.recurring ? { recurring: { interval: item.recurring } } : {}),
  });

  return { productId: product.id, priceId: price.id, created: true };
}

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "STRIPE_SECRET_KEY is not configured." },
      { status: 503 },
    );
  }

  const results: Array<{
    envKey: string;
    name: string;
    priceId: string;
    productId: string;
    created: boolean;
  }> = [];

  try {
    for (const item of CATALOG) {
      const { productId, priceId, created } = await ensureProductPrice(item);
      results.push({
        envKey: item.envKey,
        name: item.name,
        productId,
        priceId,
        created,
      });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    return NextResponse.json(
      { error: `Setup failed: ${message}`, partial: results },
      { status: 500 },
    );
  }

  const envBlock = results.map((r) => `${r.envKey}=${r.priceId}`).join("\n");

  return NextResponse.json({
    ok: true,
    created: results.filter((r) => r.created).length,
    existing: results.filter((r) => !r.created).length,
    results,
    copy_into_vercel: envBlock,
    next_steps: [
      "Copy the `copy_into_vercel` block into your Vercel project's environment variables.",
      "Redeploy.",
      "Re-run this endpoint anytime — it's idempotent and will return the same IDs.",
    ],
  });
}
