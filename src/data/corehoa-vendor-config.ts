export type VendorTier = "fast_action" | "vendor_program" | "final_window" | "closed";

export const currentTier: VendorTier = "fast_action";

export const TIER_DATA = {
  fast_action: {
    price: 495,
    label: "FAST-ACTION WINDOW",
    dates: "through Sunday, June 1",
    heroUrgency: "$495 build — through Sunday, June 1",
    heroSubtext: "Then $995. Then $1,495. Then it's gone.",
    ctaSubtext: "$495 fast-action pricing closes Sunday, June 1",
  },
  vendor_program: {
    price: 995,
    label: "VENDOR PROGRAM",
    dates: "week of June 2–8",
    heroUrgency: "$995 build — week of June 2–8",
    heroSubtext: "Then $1,495. Then it's gone.",
    ctaSubtext: "$995 vendor pricing closes Sunday, June 8",
  },
  final_window: {
    price: 1495,
    label: "FINAL WINDOW",
    dates: "week of June 9–15, final window",
    heroUrgency: "$1,495 build — week of June 9–15",
    heroSubtext: "Last chance before standard pricing returns.",
    ctaSubtext: "$1,495 final window closes Sunday, June 15",
  },
  closed: {
    price: 2500,
    label: "PROGRAM CLOSED",
    dates: "",
    heroUrgency: "Vendor program has closed",
    heroSubtext: "Join the waitlist for the next program.",
    ctaSubtext: "Join the waitlist for the next vendor program",
  },
} as const;

export const TIMELINE_WINDOWS = [
  {
    key: "fast_action" as VendorTier,
    eyebrow: "48 HOURS",
    dates: "Through Sun June 1",
    price: 495,
    subtitle: "Fast-action pricing",
    note: "Best deal",
  },
  {
    key: "vendor_program" as VendorTier,
    eyebrow: "WEEK 1",
    dates: "Mon June 2 → Sun June 8",
    price: 995,
    subtitle: "Vendor program",
    note: "Still aggressive",
  },
  {
    key: "final_window" as VendorTier,
    eyebrow: "WEEK 2",
    dates: "Mon June 9 → Sun June 15",
    price: 1495,
    subtitle: "Final window",
    note: "Last chance",
  },
] as const;

export const STANDARD_WINDOW = {
  eyebrow: "AFTER JUNE 15",
  dates: "—",
  price: 2500,
  subtitle: "Standard pricing",
  note: "Program closes",
} as const;

const TIER_ORDER: VendorTier[] = ["fast_action", "vendor_program", "final_window"];

export function getTierStatus(
  windowKey: VendorTier,
  current: VendorTier,
): "active" | "past" | "future" {
  if (current === "closed") return "past";
  const currentIdx = TIER_ORDER.indexOf(current);
  const windowIdx = TIER_ORDER.indexOf(windowKey);
  if (windowIdx < currentIdx) return "past";
  if (windowIdx === currentIdx) return "active";
  return "future";
}
