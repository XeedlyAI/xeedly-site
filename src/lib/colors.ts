export const colors = {
  // Brand Primary
  primary: "#38b6ff",
  primaryDark: "#0A8FD4",
  primary50: "#E8F6FF",
  primary100: "#B8E4FF",
  primary200: "#88D2FF",
  primary400: "#38b6ff",
  primary600: "#0A8FD4",
  primary800: "#066BA0",
  primary900: "#034A6E",

  // Platform Purple
  purple: "#8b5cf6",
  purpleLight: "#a78bfa",
  purple50: "#f5f3ff",

  // Status Colors
  red: "#ef4444",
  amber: "#f59e0b",
  teal: "#14b8a6",
  blue: "#3b82f6",

  // Dark Sections
  navDark: "#0f172a",
  navDarkLighter: "#1e293b",

  // Light Section Backgrounds
  white: "#FFFFFF",
  offWhite: "#FAFAFA",
  blueWash: "#F0F6FF",
  warmWash: "#F5F5F0",
  mintWash: "#F0FFF4",
  lavenderWash: "#F5F3FF",

  // Text on Light
  textDark: "#0f172a",
  textBody: "#334155",
  textMuted: "#64748b",

  // Text on Dark
  textLight: "#f1f5f9",
  textLightSecondary: "#94a3b8",
  textLightMuted: "#64748b",

  // Borders & Cards
  borderLight: "#e2e8f0",
  borderDark: "rgba(255,255,255,0.08)",
  cardShadow:
    "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
  cardShadowHover:
    "0 4px 12px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.03)",
} as const;

export type ColorKey = keyof typeof colors;
