/**
 * Canonical contact details for XeedlyAI.
 * Referenced across navbar, footer, contact page, pricing CTAs, AI action renderers,
 * and the sticky widget. Update once here — everything downstream stays in sync.
 */
export const CONTACT = {
  email: "hello@xeedly.com",
  /** Human-readable phone for display. */
  phone: "(801) 882-0094",
  /** tel: URI — digits only, E.164. */
  phoneHref: "+18018820094",
  /** Internal booking page — used by calendar actions, Book Demo, all booking CTAs. */
  calendar: "/booking",
  locationShort: "Salt Lake City, UT",
  locationLong: "Salt Lake City, Utah — Mountain Time (MST)",
  /** Founder direct-line hours, displayed beneath the phone card. */
  hours: "Mon–Fri, 9–5 MST",
} as const;

export const MAILTO = `mailto:${CONTACT.email}`;
export const TEL = `tel:${CONTACT.phoneHref}`;
