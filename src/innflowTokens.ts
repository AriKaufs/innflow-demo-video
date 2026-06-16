/** Derived from globals.css `.dark` — source of truth */
export const innflowTokens = {
  // Surfaces
  canvas: "#121414",
  card: "#1c1f1f",
  surface100: "#1c1f1f",
  surface200: "#262a2a",
  surface300: "#303535",

  // Text
  foreground: "#fafaf9",
  mutedForeground: "#a8a29e",
  primaryOnDark: "#ffffff",
  primaryForeground: "#121414",

  // Brand
  accent: "#3b82f6",
  accentHover: "#60a5fa",
  accentForeground: "#ffffff",
  accentSoft: "rgba(59, 130, 246, 0.1)",
  accentBorder: "rgba(59, 130, 246, 0.18)",
  accentGlow: "rgba(59, 130, 246, 0.5)",

  // AI (periwinkle)
  accentAi: "oklch(0.78 0.07 280)",
  accentAiForeground: "#2e2e2e",

  // Borders & strokes
  border: "rgba(255, 255, 255, 0.1)",
  canvasBorder: "rgba(255, 255, 255, 0.1)",
  blueprintStroke: "#3a4040",
  nodeBorder: "#272a2a",

  // Semantic
  success: "oklch(0.68 0.18 145)",
  warning: "oklch(0.78 0.16 75)",
  danger: "oklch(0.62 0.22 25)",

  // Template vars
  templateVarText: "#3b82f6",
  templateVarBg: "rgba(59, 130, 246, 0.1)",
  templateVarBorder: "rgba(59, 130, 246, 0.18)",

  // Glass
  glassGradient: "linear-gradient(180deg, rgba(30,34,34,0.6) 0%, rgba(20,24,24,0.6) 100%)",
  glassInner: "inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
  inputFocus: "0 0 0 2px rgba(59, 130, 246, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
  glowPrimary: "0 0 15px rgba(59, 130, 246, 0.4)",
  glowPrimaryStrong: "0 0 20px rgba(59, 130, 246, 0.6)",
  panelShadow: "0 12px 32px -6px rgba(0, 0, 0, 0.55)",

  sidebar: "#1c1f1f",
} as const;

export const innflowFonts = {
  sans: "Figtree, Geist, Helvetica Neue, Arial, sans-serif",
  mono: "Figtree, Geist, Helvetica Neue, Arial, sans-serif",
  display: "Josefin Sans, Helvetica Neue, Arial, sans-serif",
  brand: "Cal Sans, Helvetica Neue, Arial, sans-serif",
};

export const innflowType = {
  eyebrow: { fontSize: 18, lineHeight: 1, letterSpacing: 2.5, fontWeight: 500 },
  body: { fontSize: 26, lineHeight: 1.45, fontWeight: 400 },
  bodySmall: { fontSize: 20, lineHeight: 1.45, fontWeight: 400 },
  label: { fontSize: 16, lineHeight: 1.1, letterSpacing: 1.6, fontWeight: 500 },
  h2: { fontSize: 54, lineHeight: 1.06, fontWeight: 400, letterSpacing: -0.8 },
  h1: { fontSize: 76, lineHeight: 1.03, fontWeight: 400, letterSpacing: -1.2 },
  hero: { fontSize: 84, lineHeight: 1.08, fontWeight: 400 },
};

export const innflowRadius = {
  node: 4,
  input: 8,
  card: 12,
  canvasInset: 12,
  glass: 16,
  composer: 20,
  composerInner: 18,
  pill: 9999,
};

export const luminousCard = {
  background: innflowTokens.card,
  border: `1px solid ${innflowTokens.border}`,
  borderRadius: innflowRadius.card,
  boxShadow: innflowTokens.glassInner,
};

export const editorialStatusPill = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "4px 10px",
  borderRadius: innflowRadius.pill,
  border: `1px solid ${innflowTokens.border}`,
  background: innflowTokens.card,
  fontFamily: innflowFonts.mono,
  fontSize: 14,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  fontWeight: 500,
  color: innflowTokens.mutedForeground,
};

export const baseNode = {
  borderRadius: innflowRadius.node,
  background: innflowTokens.card,
  border: `1px solid ${innflowTokens.border}`,
  boxShadow: innflowTokens.glassInner,
};

export const luminousBtnPrimary = {
  background: innflowTokens.accent,
  color: innflowTokens.accentForeground,
  border: "1px solid rgba(255, 255, 255, 0.35)",
  borderRadius: 8,
  fontWeight: 500,
  fontSize: 16,
  padding: "0 20px",
  boxShadow: innflowTokens.glowPrimary,
};
