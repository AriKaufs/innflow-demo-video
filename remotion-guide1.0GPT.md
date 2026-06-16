# Innflow Remotion Style Guide

Use this as a portable visual brief for Remotion agents making Innflow videos on another machine. It summarizes the product CSS without requiring the full app to be running.

## Visual Positioning

Innflow should feel like a precise operator tool: dark, calm, structured, and technical without looking like generic cyber/SaaS art. The current default product theme is **Luminous Precision Dark**:

- Near-black canvas.
- Tiered charcoal surfaces.
- Azure brand accents.
- Hairline borders.
- Subtle glass and inset highlights.
- Glow only for primary CTAs and active AI/product moments.

Avoid marketing-page excess: no oversized decorative gradients, no purple-blue wash over everything, no bokeh/orbs, no heavy card stacks, no transform-on-hover language.

## Core Color Scale

Prefer these raw values in Remotion inline styles. If a color needs opacity, use `rgba(...)`.

```ts
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
```

### Surface Use

- `canvas`: full-frame background.
- `surface100`: sidebars, cards, primary panels.
- `surface200`: hover states, secondary fills, input wells.
- `surface300`: elevated or pressed states.
- `border`: all hairlines, dividers, input outlines.
- `accent`: product mark, active states, links, primary CTAs.
- `aiAccent`: agent/chat/send affordances only.

## Typography

App fonts:

- Primary UI: `Figtree`, fallback `Geist`, `"Helvetica Neue"`, system sans.
- Display headings: `Josefin Sans`, fallback `"Helvetica Neue"`, system sans.
- Mono labels in the product use the same sans stack, styled as mono-like uppercase microcopy.
- Optional brand/auth face: `Cal Sans`, only for direct brand/title moments.

Remotion font stack:

```ts
export const innflowFonts = {
  sans: "Figtree, Geist, Helvetica Neue, Arial, sans-serif",
  display: "Josefin Sans, Helvetica Neue, Arial, sans-serif",
  mono: "Figtree, Geist, Helvetica Neue, Arial, sans-serif",
  brand: "Cal Sans, Helvetica Neue, Arial, sans-serif",
};
```

### Type Scale For Video

These are video-friendly sizes. Scale proportionally for 9:16, 1:1, or 16:9.

```ts
export const innflowType = {
  eyebrow: { fontSize: 18, lineHeight: 1, letterSpacing: 2.5, fontWeight: 500 },
  body: { fontSize: 26, lineHeight: 1.45, fontWeight: 400 },
  bodySmall: { fontSize: 20, lineHeight: 1.45, fontWeight: 400 },
  label: { fontSize: 16, lineHeight: 1.1, letterSpacing: 1.6, fontWeight: 500 },
  h2: { fontSize: 54, lineHeight: 1.06, fontWeight: 400, letterSpacing: -0.8 },
  h1: { fontSize: 76, lineHeight: 1.03, fontWeight: 400, letterSpacing: -1.2 },
};
```


### Text Patterns

- Use two-tone headings: primary phrase in white, continuation in muted zinc.
- Use uppercase micro labels for state, step numbers, and small metadata.
- Keep UI text dense and scannable. Avoid large generic marketing copy unless it is the actual video hook.
- Letter spacing should not be negative in compact UI labels.

## Component Primitives

### Luminous Card

Use for grouped UI panels.

```ts
export const luminousCard = {
  background: innflowColors.surface100,
  border: `1px solid ${innflowColors.border}`,
  borderRadius: 12,
  boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
};
```

### Luminous Input Or Composer

Use for chat composers, command palettes, prompt inputs, and schedule/task dialogs.

```ts
export const luminousInput = {
  background: innflowColors.canvas,
  border: `1px solid ${innflowColors.border}`,
  borderRadius: 8,
  color: innflowColors.text,
  boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
};

export const inputFocusGlow =
  "0 0 0 2px rgba(59, 130, 246, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)";
```

### Primary CTA

Use sparingly. Glow is allowed here.

```ts
export const primaryCta = {
  background: innflowColors.accent,
  color: "#ffffff",
  border: "1px solid rgba(255, 255, 255, 0.35)",
  borderRadius: 8,
  fontWeight: 500,
  boxShadow: "0 0 15px rgba(59, 130, 246, 0.4)",
};
```

### Status Pill

```ts
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
```

### Blueprint Lines

Use for workflow edges, diagrams, canvas grids, and technical overlays.

```ts
export const blueprintLine = {
  stroke: innflowColors.blueprintStroke,
  strokeWidth: 1,
  opacity: 0.9,
};
```

## Layout Rules For Video

- Build around real product surfaces: workflow canvas, chat composer, node cards, integrations, schedule calendar, execution rows.
- Favor dense but readable operational layouts over hero-only slides.
- UI cards should usually have 8-12px radius. Avoid pill-shaped large cards.
- Use one framed tool surface per scene instead of nested cards inside cards.
- Borders should be 1px hairlines, not thick outlines.
- Keep backgrounds near-black with subtle radial washes only if they support depth.
- Use azure as a signal, not as a full-scene wash.

## Motion Rules For Remotion

Remotion must animate with frames, not CSS transitions.

- Do not use CSS transitions or Tailwind animation classes in rendered compositions.
- Use `useCurrentFrame()`, `useVideoConfig()`, `interpolate()`, and `Easing`.
- Use opacity, clip/reveal, blur, numeric transforms, and line-drawing animations.
- Do not animate product UI with bouncy or playful motion. Use calm, precise easing.
- Good default easing: `Easing.bezier(0.16, 1, 0.3, 1)`.

Recommended motion vocabulary:

- Panels fade and slide 8-24px.
- Edges draw from source to target.
- Nodes appear in sequence with subtle opacity and y-offset.
- CTA glow can intensify when the action is the focus.
- Cursor or typing effects should be restrained and readable.

Example:

```tsx
const frame = useCurrentFrame();
const opacity = interpolate(frame, [0, 18], [0, 1], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
  easing: Easing.bezier(0.16, 1, 0.3, 1),
});

const y = interpolate(frame, [0, 18], [18, 0], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
  easing: Easing.bezier(0.16, 1, 0.3, 1),
});
```

## Do Not Do This

- Do not use generic purple SaaS gradients as the main background.
- Do not add decorative orbs, bokeh blobs, or abstract SVG mascots.
- Do not use transform-on-hover language in mock UI. State changes should be color, glow, or border changes.
- Do not make every panel glassy. Reserve blur/glass for prominent inputs and command surfaces.
- Do not use chunky tinted icon boxes everywhere. Prefer bare icons or hairline icon frames.
- Do not over-round cards. Buttons and panels should feel precise, not bubbly.
- Do not make captions the main visual if the product UI should be inspected.

## Remotion Agent Checklist

Before rendering:

- Use `AbsoluteFill` and explicit composition dimensions.
- Put reusable style constants in one file.
- Place local assets in `public/` and load with `staticFile()`.
- Use `<Img>`, `<Video>`, and `<Audio>` instead of raw media tags.
- Verify at least one representative still frame with `npx remotion still <composition-id> --frame=<n> --scale=0.25` when possible.
- For 9:16 videos, keep important UI within the center 80 percent width and leave room for platform chrome/captions if captions are required.

## One-File Style Object

Agents can paste this into a Remotion project and adjust only dimensions:

```ts
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
```
