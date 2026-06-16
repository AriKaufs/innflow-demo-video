export const innflowColors = {
  canvas: "#121414",
  surface100: "#1c1f1f",
  surface200: "#262a2a",
  surface300: "#303535",
  border: "#272a2a",
  blueprintStroke: "#3a4040",

  text: "#ffffff",
  textMuted: "#a1a1aa",
  textDim: "rgba(255, 255, 255, 0.58)",

  accent: "#3b82f6",
  accentHover: "#60a5fa",
  accentGlow: "rgba(59, 130, 246, 0.5)",
  accentSoft: "rgba(59, 130, 246, 0.1)",
  accentBorder: "rgba(59, 130, 246, 0.18)",

  aiAccent: "oklch(0.78 0.07 280)",
  success: "oklch(0.68 0.18 145)",
  warning: "oklch(0.78 0.16 75)",
  danger: "oklch(0.62 0.22 25)",
};

export const innflowFonts = {
  sans: "Figtree, Geist, Helvetica Neue, Arial, sans-serif",
  display: "Josefin Sans, Helvetica Neue, Arial, sans-serif",
  mono: "Figtree, Geist, Helvetica Neue, Arial, sans-serif",
  brand: "Cal Sans, Helvetica Neue, Arial, sans-serif",
};

export const innflowType = {
  eyebrow: { fontSize: 18, lineHeight: 1, letterSpacing: 2.5, fontWeight: 500 },
  body: { fontSize: 26, lineHeight: 1.45, fontWeight: 400 },
  bodySmall: { fontSize: 20, lineHeight: 1.45, fontWeight: 400 },
  label: { fontSize: 16, lineHeight: 1.1, letterSpacing: 1.6, fontWeight: 500 },
  h2: { fontSize: 54, lineHeight: 1.06, fontWeight: 400, letterSpacing: -0.8 },
  h1: { fontSize: 76, lineHeight: 1.03, fontWeight: 400, letterSpacing: -1.2 },
};

export const innflow = {
  colors: innflowColors,
  fonts: innflowFonts,
  type: innflowType,
  radius: {
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
  },
  shadows: {
    glassInner: "inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
    panel: "0 12px 32px -6px rgba(0, 0, 0, 0.55)",
    glowPrimary: "0 0 15px rgba(59, 130, 246, 0.4)",
    glowPrimaryStrong: "0 0 20px rgba(59, 130, 246, 0.6)",
  },
  easing: {
    precision: [0.16, 1, 0.3, 1] as const,
  },
};

export const luminousCard = {
  background: innflowColors.surface100,
  border: `1px solid ${innflowColors.border}`,
  borderRadius: 12,
  boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
};

export const primaryCta = {
  background: innflowColors.accent,
  color: "#ffffff",
  border: "1px solid rgba(255, 255, 255, 0.35)",
  borderRadius: 8,
  fontWeight: 500,
  boxShadow: "0 0 15px rgba(59, 130, 246, 0.4)",
};

export const statusPill = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "4px 10px",
  borderRadius: 999,
  border: `1px solid ${innflowColors.border}`,
  background: innflowColors.surface100,
  color: innflowColors.textMuted,
  fontSize: 14,
  letterSpacing: 1.3,
  textTransform: "uppercase" as const,
  fontWeight: 500,
};

export const blueprintLine = {
  stroke: innflowColors.blueprintStroke,
  strokeWidth: 1,
  opacity: 0.9,
};
