export type CalendarAction = {
  type: "calendar";
  label: string;
  url: string;
  description?: string;
};

export type ContactInfoAction = {
  type: "contact_info";
  label: string;
  email: string;
  phone: string;
};

export type IntakeAction = {
  type: "intake";
  label: string;
  description?: string;
  fields?: string[]; // advisory only — renderer uses name/email/phone/message
};

export type DirectChatAction = {
  type: "direct_chat";
  label: string;
  description?: string;
};

export type ArticleLinkAction = {
  type: "article_link";
  label: string;       // article title
  url: string;         // /blog/[silo]/[slug]
  silo?: string;       // e.g., "PRINCIPAL-INTELLIGENCE"
  description?: string; // 1-line excerpt
};

export type ConsoleAction =
  | CalendarAction
  | ContactInfoAction
  | IntakeAction
  | DirectChatAction
  | ArticleLinkAction;
