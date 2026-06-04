import React from "react";
import {
  Document,
  Image as PdfImage,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  renderToBuffer,
  Link,
} from "@react-pdf/renderer";

// ---------------------------------------------------------------------------
// Font registration
// ---------------------------------------------------------------------------

Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf",
      fontWeight: 400,
    },
    {
      src: "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-600-normal.ttf",
      fontWeight: 600,
    },
    {
      src: "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.ttf",
      fontWeight: 700,
    },
  ],
});

Font.register({
  family: "JetBrains Mono",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-400-normal.ttf",
      fontWeight: 400,
    },
    {
      src: "https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-700-normal.ttf",
      fontWeight: 700,
    },
  ],
});

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

const C = {
  accent: "#38b6ff",
  dark: "#0f172a",
  white: "#ffffff",
  gray50: "#f8fafc",
  gray100: "#f1f5f9",
  gray400: "#94a3b8",
  gray500: "#64748b",
  gray700: "#334155",
  teal: "#14b8a6",
};

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const s = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 9,
    color: C.dark,
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 44,
  },
  // Header
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  wordmark: { fontSize: 26, fontWeight: 700, color: C.dark },
  wordmarkAI: { color: C.accent },
  tagline: { fontSize: 9, color: C.gray500, marginTop: 2 },
  contactLine: {
    fontFamily: "JetBrains Mono",
    fontSize: 7.5,
    color: C.gray500,
    marginTop: 3,
  },
  invoiceLabel: {
    fontFamily: "JetBrains Mono",
    fontSize: 22,
    fontWeight: 700,
    color: C.dark,
    textAlign: "right" as const,
    letterSpacing: 2,
  },
  invoiceMeta: {
    fontFamily: "JetBrains Mono",
    fontSize: 7.5,
    color: C.gray500,
    textAlign: "right" as const,
    marginTop: 3,
  },
  hr: { height: 2, backgroundColor: C.accent, marginVertical: 14 },
  // Billing block
  billingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  billingCol: { width: "48%" },
  billingHeader: {
    fontFamily: "JetBrains Mono",
    fontSize: 7,
    fontWeight: 700,
    color: C.gray500,
    letterSpacing: 1.5,
    textTransform: "uppercase" as const,
    marginBottom: 6,
  },
  billingText: { fontSize: 9, lineHeight: 1.6, color: C.dark },
  billingMuted: { fontSize: 8, color: C.gray500, lineHeight: 1.5 },
  // Comparable value banner
  banner: {
    backgroundColor: "#eef7ff",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginBottom: 14,
    textAlign: "center" as const,
  },
  bannerText: { fontSize: 9, fontWeight: 600, color: C.accent },
  // Table
  tableHeader: {
    flexDirection: "row",
    backgroundColor: C.dark,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 3,
  },
  tableHeaderText: {
    fontFamily: "JetBrains Mono",
    fontSize: 7,
    fontWeight: 700,
    color: C.white,
    textTransform: "uppercase" as const,
    letterSpacing: 1,
  },
  sectionRow: {
    flexDirection: "row",
    backgroundColor: C.gray50,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e2e8f0",
  },
  sectionRowText: {
    fontFamily: "JetBrains Mono",
    fontSize: 7.5,
    fontWeight: 700,
    color: C.accent,
    textTransform: "uppercase" as const,
    letterSpacing: 1,
  },
  itemRow: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e2e8f0",
  },
  itemRowAlt: { backgroundColor: C.gray50 },
  colDesc: { width: "58%" },
  colQty: { width: "10%", textAlign: "center" as const },
  colUnit: { width: "16%", textAlign: "right" as const },
  colAmt: { width: "16%", textAlign: "right" as const },
  cellText: { fontSize: 8, color: C.dark },
  cellMono: {
    fontFamily: "JetBrains Mono",
    fontSize: 8,
    color: C.dark,
  },
  subtotalRow: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  totalRow: {
    flexDirection: "row",
    backgroundColor: C.dark,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 3,
    marginTop: 2,
  },
  totalText: {
    fontFamily: "JetBrains Mono",
    fontSize: 10,
    fontWeight: 700,
    color: C.white,
  },
  // Payment options
  paymentSection: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
    marginBottom: 14,
  },
  paymentCol: {
    flex: 1,
    backgroundColor: C.gray50,
    borderRadius: 4,
    padding: 10,
    borderWidth: 0.5,
    borderColor: "#e2e8f0",
  },
  paymentTitle: {
    fontFamily: "JetBrains Mono",
    fontSize: 7.5,
    fontWeight: 700,
    color: C.dark,
    textTransform: "uppercase" as const,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  paymentPreferred: {
    fontSize: 6.5,
    color: C.teal,
    fontWeight: 700,
    marginTop: -2,
    marginBottom: 4,
  },
  paymentBody: {
    fontFamily: "JetBrains Mono",
    fontSize: 7,
    color: C.gray700,
    lineHeight: 1.6,
  },
  paymentLink: {
    fontFamily: "JetBrains Mono",
    fontSize: 6.5,
    color: C.accent,
    marginTop: 2,
  },
  // Terms
  termsHeader: {
    fontFamily: "JetBrains Mono",
    fontSize: 7,
    fontWeight: 700,
    color: C.gray500,
    letterSpacing: 1.5,
    textTransform: "uppercase" as const,
    marginBottom: 6,
    marginTop: 14,
  },
  termsBody: { fontSize: 7.5, color: C.gray700, lineHeight: 1.7 },
  // Partnership
  partnership: {
    textAlign: "center" as const,
    marginTop: 16,
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderTopColor: "#e2e8f0",
    borderBottomWidth: 0.5,
    borderBottomColor: "#e2e8f0",
  },
  partnershipText: {
    fontSize: 9,
    color: C.dark,
    lineHeight: 1.6,
  },
  // Footer
  footer: {
    position: "absolute" as const,
    bottom: 30,
    left: 44,
    right: 44,
    textAlign: "center" as const,
  },
  footerText: { fontSize: 8, color: C.gray500 },
  footerContact: {
    fontFamily: "JetBrains Mono",
    fontSize: 7,
    color: C.gray500,
    marginTop: 3,
  },
  footerRule: {
    height: 2,
    backgroundColor: C.accent,
    marginTop: 10,
    borderRadius: 1,
  },
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type InvoiceLineItem = {
  section: "build" | "platform" | "service";
  description: string;
  quantity: number;
  unit_price: number; // cents
  amount: number; // cents
};

export type InvoiceData = {
  logoUrl: string;
  invoiceNumber: string;
  dateIssued: string;
  dueLabel: string;
  from: {
    address: string;
    cityStateZip: string;
  };
  customer: {
    name: string;
    company?: string;
    email: string;
    phone?: string;
  };
  comparableValue?: string;
  lineItems: InvoiceLineItem[];
  buildTotal: number; // cents
  dueNow?: number; // cents — if split payment
  dueAtDelivery?: number; // cents — remainder due later
  serviceMonthly: number; // cents
  terms: string;
  stripeInvoiceUrl: string;
  venmoHandle: string;
  venmoQrUrl?: string;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatCents(cents: number): string {
  if (!cents) return "";
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ---------------------------------------------------------------------------
// PDF Document
// ---------------------------------------------------------------------------

function InvoiceDocument({ data }: { data: InvoiceData }) {
  const buildItems = data.lineItems.filter((i) => i.section === "build");
  const platformItems = data.lineItems.filter((i) => i.section === "platform");
  const serviceItems = data.lineItems.filter((i) => i.section === "service");
  const buildSubtotal = buildItems.reduce((s, i) => s + i.amount, 0) + platformItems.reduce((s, i) => s + i.amount, 0);
  const hasPlatform = platformItems.length > 0;

  let rowIndex = 0;

  return (
    <Document>
      <Page size="LETTER" style={s.page}>
        {/* HEADER */}
        <View style={s.headerRow}>
          <View>
            <PdfImage src={data.logoUrl} style={{ width: 140, height: 36 }} />
            <Text style={s.tagline}>AI-Native Business Intelligence</Text>
            <Text style={s.contactLine}>
              xeedly.com | shad@xeedly.com
            </Text>
          </View>
          <View>
            <Text style={s.invoiceLabel}>INVOICE</Text>
            <Text style={s.invoiceMeta}>{data.invoiceNumber}</Text>
            <Text style={s.invoiceMeta}>
              Issued: {data.dateIssued}
            </Text>
            <Text style={s.invoiceMeta}>Due: {data.dueLabel}</Text>
          </View>
        </View>

        <View style={s.hr} />

        {/* BILLING BLOCK */}
        <View style={s.billingRow}>
          <View style={s.billingCol}>
            <Text style={s.billingHeader}>From</Text>
            <Text style={s.billingText}>XeedlyAI</Text>
            <Text style={s.billingText}>{data.from.address}</Text>
            <Text style={s.billingText}>{data.from.cityStateZip}</Text>
            <Text style={s.billingMuted}>shad@xeedly.com</Text>
            <Text style={s.billingMuted}>xeedly.com</Text>
          </View>
          <View style={s.billingCol}>
            <Text style={s.billingHeader}>Bill To</Text>
            <Text style={s.billingText}>{data.customer.name}</Text>
            {data.customer.company && (
              <Text style={s.billingText}>{data.customer.company}</Text>
            )}
            <Text style={s.billingMuted}>{data.customer.email}</Text>
            {data.customer.phone && (
              <Text style={s.billingMuted}>{data.customer.phone}</Text>
            )}
          </View>
        </View>

        {/* COMPARABLE VALUE BANNER */}
        {data.comparableValue && (
          <View style={s.banner}>
            <Text style={s.bannerText}>{data.comparableValue}</Text>
          </View>
        )}

        {/* SCOPE OF WORK TABLE */}
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderText, s.colDesc]}>Description</Text>
          <Text style={[s.tableHeaderText, s.colQty]}>Qty</Text>
          <Text style={[s.tableHeaderText, s.colUnit]}>Unit Price</Text>
          <Text style={[s.tableHeaderText, s.colAmt]}>Amount</Text>
        </View>

        {/* Site build section */}
        {buildItems.length > 0 && (
          <>
            <View style={s.sectionRow}>
              <Text style={s.sectionRowText}>
                {hasPlatform ? "Site Build Deliverables" : "Build Deliverables"}
              </Text>
            </View>
            {buildItems.map((item, i) => {
              const alt = rowIndex++ % 2 === 1;
              return (
                <View
                  key={`b-${i}`}
                  style={alt ? [s.itemRow, s.itemRowAlt] : s.itemRow}
                >
                  <Text style={[s.cellText, s.colDesc]}>
                    {item.description}
                  </Text>
                  <Text style={[s.cellMono, s.colQty]}>
                    {item.quantity}
                  </Text>
                  <Text style={[s.cellMono, s.colUnit]}>
                    {formatCents(item.unit_price)}
                  </Text>
                  <Text style={[s.cellMono, s.colAmt]}>
                    {formatCents(item.amount)}
                  </Text>
                </View>
              );
            })}
          </>
        )}

        {/* Platform build section */}
        {platformItems.length > 0 && (
          <>
            <View style={s.sectionRow}>
              <Text style={[s.sectionRowText, { color: "#8b5cf6" }]}>
                Platform Build Deliverables
              </Text>
            </View>
            {platformItems.map((item, i) => {
              const alt = rowIndex++ % 2 === 1;
              return (
                <View
                  key={`p-${i}`}
                  style={alt ? [s.itemRow, s.itemRowAlt] : s.itemRow}
                >
                  <Text style={[s.cellText, s.colDesc]}>
                    {item.description}
                  </Text>
                  <Text style={[s.cellMono, s.colQty]}>
                    {item.quantity}
                  </Text>
                  <Text style={[s.cellMono, s.colUnit]}>
                    {formatCents(item.unit_price)}
                  </Text>
                  <Text style={[s.cellMono, s.colAmt]}>
                    {formatCents(item.amount)}
                  </Text>
                </View>
              );
            })}
          </>
        )}

        {/* Build total */}
        <View style={s.subtotalRow}>
          <Text style={[s.cellText, s.colDesc, { fontWeight: 600 }]}>
            Build Total
          </Text>
          <Text style={[s.cellMono, s.colQty]} />
          <Text style={[s.cellMono, s.colUnit]} />
          <Text style={[s.cellMono, s.colAmt, { fontWeight: 700 }]}>
            {formatCents(buildSubtotal)}
          </Text>
        </View>

        {/* Total project (shown for split payments) */}
        {data.dueNow && data.dueAtDelivery && (
          <View style={s.subtotalRow}>
            <Text style={[s.cellText, s.colDesc, { fontWeight: 600 }]}>Total Project</Text>
            <Text style={[s.cellMono, s.colQty]} />
            <Text style={[s.cellMono, s.colUnit]} />
            <Text style={[s.cellMono, s.colAmt, { fontWeight: 700 }]}>{formatCents(buildSubtotal)}</Text>
          </View>
        )}

        {/* Total due now */}
        <View style={s.totalRow}>
          <Text style={[s.totalText, s.colDesc]}>
            {data.dueNow ? "DUE NOW" : "TOTAL DUE NOW"}
          </Text>
          <Text style={[s.totalText, s.colQty]} />
          <Text style={[s.totalText, s.colUnit]} />
          <Text style={[s.totalText, s.colAmt]}>
            {formatCents(data.dueNow || buildSubtotal)}
          </Text>
        </View>

        {/* Due at delivery (split payment) */}
        {data.dueAtDelivery && data.dueAtDelivery > 0 && (
          <View style={{ flexDirection: "row", paddingVertical: 6, paddingHorizontal: 8, marginTop: 2 }}>
            <Text style={{ fontSize: 8, color: "#f59e0b", fontWeight: 700, flex: 1 }}>
              Due at platform delivery
            </Text>
            <Text style={{ fontFamily: "JetBrains Mono", fontSize: 8, fontWeight: 700, color: "#f59e0b" }}>
              {formatCents(data.dueAtDelivery)}
            </Text>
          </View>
        )}

        {/* Monthly service note */}
        <View style={{ flexDirection: "row", paddingVertical: 6, paddingHorizontal: 8, marginTop: 4 }}>
          <Text style={{ fontSize: 8, color: C.gray500, flex: 1 }}>
            Monthly service (begins 30 days after first payment)
          </Text>
          <Text style={{ fontFamily: "JetBrains Mono", fontSize: 8, fontWeight: 700, color: C.accent }}>
            {formatCents(data.serviceMonthly)}/mo
          </Text>
        </View>

        {/* Service deliverables — checklist, not priced table rows */}
        {serviceItems.length > 0 && (
          <View style={{ marginTop: 10, paddingHorizontal: 8 }}>
            <Text style={[s.sectionRowText, { marginBottom: 6 }]}>
              Ongoing Service Deliverables{hasPlatform ? " — Site + Platform" : ""} — Included
            </Text>
            {serviceItems.map((item, i) => (
              <View key={`s-${i}`} style={{ flexDirection: "row", marginBottom: 3, paddingLeft: 4 }}>
                <Text style={{ fontSize: 7, color: C.accent, marginRight: 5, marginTop: 1 }}>✓</Text>
                <Text style={{ fontSize: 7.5, color: C.gray700, lineHeight: 1.5 }}>
                  {item.description}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* PAYMENT OPTIONS */}
        <View style={s.paymentSection}>
          {/* Pay Online — Stripe handles card + ACH */}
          <View style={[s.paymentCol, { flex: 2 }]}>
            <Text style={s.paymentTitle}>Pay Online</Text>
            <Text style={s.paymentBody}>
              Secure payment via card or bank transfer
            </Text>
            <Link src={data.stripeInvoiceUrl} style={[s.paymentLink, { fontSize: 8, marginTop: 6 }]}>
              Click here to pay invoice →
            </Link>
          </View>

          {/* Venmo */}
          <View style={[s.paymentCol, { flex: 1, alignItems: "center" as const }]}>
            <Text style={s.paymentTitle}>Venmo</Text>
            {data.venmoQrUrl && (
              <PdfImage src={data.venmoQrUrl} style={{ width: 70, height: 70, marginVertical: 4 }} />
            )}
            <Link
              src={`https://venmo.com/${data.venmoHandle.replace("@", "")}`}
              style={[s.paymentLink, { fontSize: 8, marginTop: 4, textAlign: "center" as const }]}
            >
              Pay with Venmo →
            </Link>
            <Text style={[s.paymentBody, { marginTop: 3, fontSize: 6.5, textAlign: "center" as const }]}>
              Include invoice # in memo
            </Text>
          </View>
        </View>

        {/* TERMS */}
        <Text style={s.termsHeader}>Terms & Conditions</Text>
        <Text style={s.termsBody}>{data.terms}</Text>

        {/* PARTNERSHIP STATEMENT */}
        <View style={s.partnership}>
          <Text style={s.partnershipText}>
            We don&apos;t deliver a website and disappear. Your site is a living
            system — we build it, grow it, and never stop. You own the code.
            Always.
          </Text>
        </View>

        {/* FOOTER */}
        <View style={s.footer} fixed>
          <Text style={s.footerText}>Thank you for your business.</Text>
          <Text style={s.footerContact}>
            xeedly.com | shad@xeedly.com
          </Text>
          <View style={s.footerRule} />
        </View>
      </Page>
    </Document>
  );
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function generateInvoicePdf(
  data: InvoiceData,
): Promise<Buffer> {
  const buffer = await renderToBuffer(
    <InvoiceDocument data={data} />,
  );
  return Buffer.from(buffer);
}
