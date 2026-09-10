import Stripe from "stripe";

/**
 * Lazy Stripe client. Instantiated on first use so the module can be imported
 * at build time without STRIPE_SECRET_KEY being present (e.g., during
 * `next build`). All callers use helpers in this file, never touch `_stripe`
 * directly.
 */
let _stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Configure it in Vercel env vars.",
    );
  }
  _stripe = new Stripe(key);
  return _stripe;
}

/** Exported as a getter proxy so `stripe.webhooks.constructEvent` etc. work. */
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    // @ts-expect-error — delegate to the real instance once instantiated
    return getStripe()[prop];
  },
});

/** Get an existing Stripe customer by email, or create a new one. */
export async function getOrCreateStripeCustomer(
  email: string,
  name: string,
  metadata?: Record<string, string>,
): Promise<Stripe.Customer> {
  const client = getStripe();
  const existing = await client.customers.list({ email, limit: 1 });
  if (existing.data.length > 0) return existing.data[0];
  return client.customers.create({ email, name, metadata });
}

/** Create a one-time price for custom-amount products (50% splits, etc.). */
export async function createOneTimePrice(
  amount: number, // cents
  description: string,
): Promise<Stripe.Price> {
  return getStripe().prices.create({
    unit_amount: amount,
    currency: "usd",
    product_data: { name: description },
  });
}

/** Create a recurring monthly price for custom managed intelligence amounts. */
export async function createRecurringPrice(
  amount: number, // cents
  description: string,
): Promise<Stripe.Price> {
  return getStripe().prices.create({
    unit_amount: amount,
    currency: "usd",
    recurring: { interval: "month" },
    product_data: { name: description },
  });
}

/** Create a Checkout Session. Used for the upfront payment in the closer flow. */
export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  mode: "payment" | "subscription",
  metadata: Record<string, string>,
  successUrl = "https://xeedly.com/admin/close?success=true",
  cancelUrl = "https://xeedly.com/admin/close?cancelled=true",
): Promise<Stripe.Checkout.Session> {
  const params: Stripe.Checkout.SessionCreateParams = {
    customer: customerId,
    mode,
    line_items: [{ price: priceId, quantity: 1 }],
    metadata,
    success_url: successUrl,
    cancel_url: cancelUrl,
  };
  if (mode === "payment") {
    params.payment_method_types = ["card"];
    // Forward metadata onto the resulting payment intent so the webhook can read
    // the deal_id / payment_stage.
    params.payment_intent_data = { metadata };
  } else {
    // For subscriptions, attach metadata to the subscription itself too.
    params.subscription_data = { metadata };
  }
  return getStripe().checkout.sessions.create(params);
}

/** Create + finalize + send an invoice. Used for go-live (50% back-half) payments. */
export async function createAndSendInvoice(
  customerId: string,
  amount: number, // cents
  description: string,
  options?: {
    enableACH?: boolean;
    daysUntilDue?: number;
    metadata?: Record<string, string>;
  },
): Promise<Stripe.Invoice> {
  const client = getStripe();

  const invoice = await client.invoices.create({
    customer: customerId,
    collection_method: "send_invoice",
    days_until_due: options?.daysUntilDue ?? 7,
    metadata: options?.metadata ?? {},
    payment_settings: {
      payment_method_types: options?.enableACH
        ? ["card", "us_bank_account"]
        : ["card"],
    },
  });

  await client.invoiceItems.create({
    customer: customerId,
    amount,
    currency: "usd",
    description,
    invoice: invoice.id,
  });

  const finalized = await client.invoices.finalizeInvoice(invoice.id!);
  return client.invoices.sendInvoice(finalized.id!);
}

/** Create a subscription that starts on a future date. */
export async function createScheduledSubscription(
  customerId: string,
  priceId: string,
  startDate: Date,
  metadata?: Record<string, string>,
): Promise<Stripe.SubscriptionSchedule> {
  // `iterations` is a supported API field but TypeScript types in @stripe/stripe
  // v22 omit it from the phase shape. Using a typed-escape here so the schedule
  // renews for 12 months before releasing into a standalone subscription.
  const phase: Stripe.SubscriptionScheduleCreateParams.Phase & {
    iterations?: number;
  } = {
    items: [{ price: priceId, quantity: 1 }],
    iterations: 12,
  };
  return getStripe().subscriptionSchedules.create({
    customer: customerId,
    start_date: Math.floor(startDate.getTime() / 1000),
    end_behavior: "release",
    phases: [phase],
    metadata: metadata ?? {},
  });
}

/** Create a subscription that starts immediately. */
export async function createSubscription(
  customerId: string,
  priceId: string,
  metadata?: Record<string, string>,
): Promise<Stripe.Subscription> {
  return getStripe().subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    metadata: metadata ?? {},
  });
}
