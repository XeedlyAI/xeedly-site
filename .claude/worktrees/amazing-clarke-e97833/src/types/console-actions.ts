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

export type ConsoleAction =
  | CalendarAction
  | ContactInfoAction
  | IntakeAction
  | DirectChatAction;
