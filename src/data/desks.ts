/**
 * Desks — one knowledge base per business, a phone-first surface per role.
 * Single source of truth for the /desks page: stories, primitives, catalog,
 * the Desk Sprint offer, and the FAQ (rendered with FAQPage schema).
 *
 * Names of individual people are withheld until each has approved being
 * named publicly. Roles and business shapes are real.
 */

export const DESK_SPRINT = {
  name: "The Desk Sprint",
  listPrice: 15000,
  salePrice: 5950,
  monthly: 995,
  slots: 8,
  saleEnds: "2026-11-30",
  saleEndsLabel: "Cyber Monday, November 30",
  deliveredBy: "December 31, 2026",
  goLiveDays: 21,
  changeHoursPerMonth: 2,
  linksIncluded: 50,
  secondDesk: 3950,
  /** Public Stripe Payment Link, set in Vercel. The pay button renders only when present. */
  paymentLink: process.env.NEXT_PUBLIC_DESK_SPRINT_PAYMENT_LINK ?? "",
} as const;

export interface DeskStory {
  role: string;
  business: string;
  asked: string;
  shipped: string;
  time: string;
  accent: string;
}

export const DESK_STORIES: DeskStory[] = [
  {
    role: "The on-site manager",
    business: "A 300-home community in Utah",
    asked:
      "The board wanted to know what their salaried on-site manager did all week. He wanted to stop filling out paper.",
    shipped:
      "A phone link, no login. His work orders ranked by urgency, daily rounds, done with a note and a photo. Every Monday the board gets a report: days on site, work closed, backlog, cost beside output.",
    time: "First version in two days. Then every on-site worker at the firm.",
    accent: "#14b8a6",
  },
  {
    role: "The board",
    business: "Two HOA boards, then more",
    asked:
      "Volunteers who meet once a month and will never manage a password wanted the packet, the votes and the open items on their phones.",
    shipped:
      "A board desk: the meeting, the financial snapshot, the to-do list with who holds what, votes cast from a link, minutes drafted after.",
    time: "One board first. The second took an afternoon.",
    accent: "#38b6ff",
  },
  {
    role: "The treasurer",
    business: "A Utah HOA, 30 minutes in the office",
    asked:
      "She wanted to see bank balances, which bills were approved and which were paid, and how long payment took. She did not want to learn the accounting system.",
    shipped:
      "A finance desk: balances book and bank as of the bank date, bills in four lanes, statements, read-only, on her phone. It was working before she left.",
    time: "Built during the meeting.",
    accent: "#8b5cf6",
  },
  {
    role: "Contractors and crews",
    business: "Pando Rent, Keokuk, Iowa",
    asked:
      "An investor's rehab crews and managers in another state needed to log work with proof and see what was owed, without an app store and without accounts.",
    shipped:
      "A contractor desk: open a house from a link, log work with photos, mark the punch list, see draw status. Ops verifies from the photos and schedules move-ins.",
    time: "The platform and the desk came together in days.",
    accent: "#F97316",
  },
];

export interface DeskPrimitive {
  name: string;
  what: string;
}

export const DESK_PRIMITIVES: DeskPrimitive[] = [
  { name: "List", what: "The lines that matter to this role, ranked. Nothing else." },
  { name: "Line", what: "One thing: its history, its photos, who holds it." },
  { name: "Mark", what: "Done, with a note or a photo. Note-only marks are flagged." },
  { name: "Approve", what: "A plain sentence, a yes, and a ledger row with your name on it." },
  { name: "Pin", what: "Put a line on the agenda or into the report." },
  { name: "Balance", what: "Book, bank, the difference, and the date it was true." },
  { name: "Report", what: "The Monday document the person who pays reads." },
  { name: "Ask", what: "A question in plain words, answered from your data, within what this role may see." },
];

export interface DeskCatalogRow {
  desk: string;
  forWhom: string;
  firstScreen: string;
  dayOneData: string;
  actions: string;
  report: string;
}

export const DESK_CATALOG: DeskCatalogRow[] = [
  {
    desk: "Site Desk",
    forWhom: "The person on the property, plant or route",
    firstScreen: "Today's lines ranked, the rounds",
    dayOneData: "Work orders or tasks, from your system or a spreadsheet",
    actions: "Mark done with photo · report an issue · ask",
    report: "Monday: present, done, backlog, cost beside output",
  },
  {
    desk: "Contractor Desk",
    forWhom: "Vendors and crews with no account",
    firstScreen: "My jobs, the punch list",
    dayOneData: "Jobs and scope lines",
    actions: "Log work with photo · mark done · see my draw status",
    report: "Per job: progress and evidence",
  },
  {
    desk: "Treasurer Desk",
    forWhom: "The person who signs the checks or watches them",
    firstScreen: "Balances book and bank, bills in four lanes",
    dayOneData: "Bank balances and payables (QuickBooks, CINC, or a sheet)",
    actions: "Question a bill · acknowledge · ask",
    report: "Monthly: paid, pending, aging, variance",
  },
  {
    desk: "Board or Owner Desk",
    forWhom: "People who govern and do not operate",
    firstScreen: "The meeting, the packet, what needs a vote",
    dayOneData: "Agenda, financials, open items",
    actions: "Vote · approve · comment",
    report: "The packet, the minutes",
  },
  {
    desk: "Manager Desk",
    forWhom: "The person running the day",
    firstScreen: "Today: triage, signals, who is waiting",
    dayOneData: "Mail and messages, your system of record",
    actions: "Assign · close · ask",
    report: "Weekly: throughput and what slipped",
  },
  {
    desk: "Sales or Rep Desk",
    forWhom: "Reps, dealers, third-party sellers",
    firstScreen: "My accounts, follow-ups due, the price book",
    dayOneData: "CRM or a sheet, products",
    actions: "Log a recap by text · request a quote · ask",
    report: "Weekly: pipeline moved, recaps logged",
  },
  {
    desk: "Customer or Tenant Desk",
    forWhom: "The people you serve",
    firstScreen: "My requests and their status",
    dayOneData: "Requests, documents",
    actions: "Submit · confirm · ask",
    report: "Counted in the manager's report",
  },
];

export const DESK_SPRINT_INCLUDED: string[] = [
  "Half a day with you to pick the one role whose week hurts the most",
  "That role's desk, built on your real data, under your name and your domain",
  "Up to six screens from the eight parts, and one report",
  "One data source connected by API, export or spreadsheet",
  "Magic-link access for up to 50 people. No app store, no passwords",
  "Live in 21 days or less from the day your data arrives",
];

export const DESK_MONTHLY_INCLUDED: string[] = [
  "Hosting, security, backups and upkeep",
  "Up to two hours of changes a month",
  "Support on business days, next-business-day response",
  "The Monday report, every week, to the person who reads it",
  "Ask, the question-answering agent, within a usage ceiling",
  "A quarterly review of what the desk should do next",
];

export const DESK_FAQS: { question: string; answer: string }[] = [
  {
    question: "What exactly is a desk?",
    answer:
      "A phone-first view of your business built for one role. It shows that person the lines that matter to them, lets them take the few actions that are theirs, and produces the report the person who pays them reads. It is built on the data you already have, under your name, and opened from a link with no password.",
  },
  {
    question: "What counts as one desk in the Desk Sprint?",
    answer:
      "One role, up to six screens built from our eight parts (List, Line, Mark, Approve, Pin, Balance, Report, Ask), one data source connected by API, export or spreadsheet, one report, and magic-link access for up to 50 people. A second desk for another role is $3,950 while the first is live.",
  },
  {
    question: "Do my people have to install an app or create accounts?",
    answer:
      "No. Each person gets a link bound to them. It opens on any phone or computer, can be added to the home screen like an app, and can be revoked in one click. Boards, crews and contractors have used this for months without a single password.",
  },
  {
    question: "What if we cannot get an API key for our software?",
    answer:
      "The desk goes live on an export or a spreadsheet on day one and moves to the API when the key arrives. The 21 days start when your data arrives in any form. A missing API key never delays a go-live.",
  },
  {
    question: "What does $995 a month cover, and what does it not?",
    answer:
      "Hosting, security, backups and upkeep; up to two hours of changes a month; next-business-day support; the Monday report; the Ask agent within a usage ceiling; and a quarterly review. Larger changes, new data sources and additional desks are quoted. Three-month minimum, then month to month.",
  },
  {
    question: "Is the data mine?",
    answer:
      "Yes. Your data and your people's data stay yours. We never publish it, and you can export all of it at any time and at exit. The desk software and its parts are ours.",
  },
  {
    question: "Does the agent act on its own?",
    answer:
      "No. Ask answers questions from your data within what each role may see. Any action that changes a record or sends a message is taken by a person, or proposed by the agent and approved by a person, with a log of who approved what.",
  },
  {
    question: "Why is the price $5,950 instead of $15,000?",
    answer:
      "It is a dated launch price for eight slots, delivered by December 31, 2026, paid at purchase and refundable in full until the discovery call happens. The list price applies after Cyber Monday.",
  },
];
