# Innflow Remotion Style Guide (from src)

Portable visual brief for Remotion agents making Innflow product videos on another machine. Derived from the live app source — primarily `src/app/globals.css` and component usage across `src/`.

**Source of truth:** `/Developer/innflow/src/app/globals.css` (`.dark` block)  
**Default theme:** Luminous Precision Dark (`defaultTheme="dark"` in `src/app/layout.tsx`)  
**Regenerate tokens when `globals.css` changes.** Do not hand-maintain hex values separately.

---

## Visual Positioning

Innflow should feel like a precise operator tool: dark, calm, structured, and technical without looking like generic cyber/SaaS art.

- Near-black canvas with tiered charcoal surfaces
- Azure brand accents (`#3b82f6`) for links, active states, and primary CTAs
- Periwinkle AI accent (`--accent-ai`) for send buttons, sparkles, and agent affordances only
- Hairline borders (translucent white in dark mode, not thick outlines)
- Subtle glass inset highlights on cards
- Glow only for primary CTAs, active category pills, and focused AI surfaces

**Avoid:** oversized decorative gradients, purple-blue scene washes, bokeh/orbs, heavy card stacks, transform-on-hover UI, bubbly radii.

---

## Theme Scopes

Remotion product scenes should use **Luminous Precision Dark** (`.dark`). Two other scopes exist in the app — use only when the scene explicitly shows that surface.

| Scope | When to use | Canvas | Notes |
|---|---|---|---|
| **Product dark** (default) | Dashboard, editor, lists, home | `oklch(0.147 0.004 49.25)` ≈ `#121414` | All scenes unless specified |
| **Auth / onboarding** | Login, signup, onboarding only | `#070909` | Split Exa layout: white left panel + blue code visual |
| **Editorial light** | Rare; user toggled light mode | `#ffffff` | Nearly shadowless; no glass glow |

Auth borders use `#272a2a` (opaque). **Product dark borders use `rgba(255,255,255,0.1)`** — do not mix them.

---

## Token Map

Map CSS variables to Remotion inline values. Prefer `rgba(...)` for opacity.

```ts
/** Derived from globals.css `.dark` — verify after token changes */
export const innflowTokens = {
  // Surfaces
  canvas: "#121414",              // --canvas / --background / --editor-surface
  card: "#1c1f1f",                // --card (luminous-card, node bodies)
  surface100: "#1c1f1f",          // --surface-100
  surface200: "#262a2a",          // --surface-200 / --muted
  surface300: "#303535",          // --surface-300 / --secondary

  // Text
  foreground: "#fafaf9",          // --foreground
  mutedForeground: "#a8a29e",     // --muted-foreground (≈ zinc-400)
  primaryOnDark: "#ffffff",         // --primary (inverted: white rect buttons)
  primaryForeground: "#121414",   // --primary-foreground

  // Brand
  accent: "#3b82f6",              // --accent
  accentHover: "#60a5fa",         // --primary-hover
  accentForeground: "#ffffff",
  accentSoft: "rgba(59, 130, 246, 0.1)",       // --sidebar-accent
  accentBorder: "rgba(59, 130, 246, 0.18)",    // --template-var-border
  accentGlow: "rgba(59, 130, 246, 0.5)",       // --primary-glow

  // AI (periwinkle — send/agent only)
  accentAi: "oklch(0.78 0.07 280)",
  accentAiForeground: "#2e2e2e",

  // Borders & strokes
  border: "rgba(255, 255, 255, 0.1)",        // --border / --hairline
  canvasBorder: "rgba(255, 255, 255, 0.1)",    // --canvas-border
  blueprintStroke: "#3a4040",                   // --stroke-blueprint / --edge-stroke
  nodeBorder: "#272a2a",                        // workflow node outlines only

  // Semantic
  success: "oklch(0.68 0.18 145)",
  warning: "oklch(0.78 0.16 75)",
  danger: "oklch(0.62 0.22 25)",

  // Template variables (workflow chips)
  templateVarText: "#3b82f6",
  templateVarBg: "rgba(59, 130, 246, 0.1)",
  templateVarBorder: "rgba(59, 130, 246, 0.18)",

  // Glass
  glassGradient:
    "linear-gradient(180deg, rgba(30,34,34,0.6) 0%, rgba(20,24,24,0.6) 100%)",
  glassInner: "inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
  inputFocus:
    "0 0 0 2px rgba(59, 130, 246, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
  glowPrimary: "0 0 15px rgba(59, 130, 246, 0.4)",
  glowPrimaryStrong: "0 0 20px rgba(59, 130, 246, 0.6)",
  panelShadow: "0 12px 32px -6px rgba(0, 0, 0, 0.55)",

  // Sidebar
  sidebar: "#1c1f1f",
} as const;
```

### Surface Use

| Token | Product use |
|---|---|
| `canvas` | Full frame, React Flow base, node footers, composer wells |
| `card` | Panels, nodes, discovery cards, stat cells |
| `surface200` | Hover fills, assistant message bubbles (`bg-muted`) |
| `surface300` | Secondary pressed / elevated states |
| `border` | All hairlines, dividers, input outlines |
| `accent` | Active tabs, selected nodes, links, azure CTAs |
| `accentAi` | Send buttons, sparkles, AI loaders — never scene-wide wash |

---

## Typography

### Fonts (from `src/app/layout.tsx`)

| Role | CSS variable | Stack | Used for |
|---|---|---|---|
| UI body | `--font-sans` | Figtree → Geist → system | All product UI (13px default) |
| Mono labels | `--font-mono` | Same as sans (styled uppercase) | Eyebrows, status pills, step labels |
| Display | `--font-display` | Josefin Sans | List page headings (`.editorial-display`) |
| Brand hero | `--font-cal` | Cal Sans | Home chat hero only |
| Optional | `--font-fraunces` | Fraunces | Loaded but rarely surfaced |

**Remotion:** load via `@remotion/google-fonts` — **Figtree**, **Josefin Sans**, **Cal Sans**.

```ts
export const innflowFonts = {
  sans: "Figtree, Geist, Helvetica Neue, Arial, sans-serif",
  mono: "Figtree, Geist, Helvetica Neue, Arial, sans-serif",
  display: "Josefin Sans, Helvetica Neue, Arial, sans-serif",
  brand: "Cal Sans, Helvetica Neue, Arial, sans-serif",
};
```

### App Type Scale (pixel-perfect UI mocks)

| Role | Class / location | Size | Weight | Tracking |
|---|---|---|---|---|
| Body | `body` / default | 13px | 400 | normal |
| Body small | `text-sm` | 13px | 400 | normal |
| Eyebrow | `.editorial-eyebrow` | 11px | 500 | 0.14em uppercase |
| Display h1 | `.editorial-display` | 24–30px | 400 | -0.022em |
| Home hero | `font-cal` | 32–42px | 400 | normal |
| Node title | `BaseNodeHeaderTitle` | 12px | 500 | normal |
| Node type | `BaseNodeTypeLabel` | 9px | 500 | 0.12em uppercase |
| Status pill | `.editorial-status-pill` | 10.5px | 500 | 0.1em uppercase |
| Toolbar | `workflow-toolbar` | 12px (`text-xs`) | 400 | normal |

### Video Type Scale (scale ~2× for legibility)

```ts
export const innflowType = {
  eyebrow: { fontSize: 18, lineHeight: 1, letterSpacing: 2.5, fontWeight: 500 },
  body: { fontSize: 26, lineHeight: 1.45, fontWeight: 400 },
  bodySmall: { fontSize: 20, lineHeight: 1.45, fontWeight: 400 },
  label: { fontSize: 16, lineHeight: 1.1, letterSpacing: 1.6, fontWeight: 500 },
  h2: { fontSize: 54, lineHeight: 1.06, fontWeight: 400, letterSpacing: -0.8 },
  h1: { fontSize: 76, lineHeight: 1.03, fontWeight: 400, letterSpacing: -1.2 },
  hero: { fontSize: 84, lineHeight: 1.08, fontWeight: 400 }, // Cal Sans home only
};
```

### Text Patterns

- **Two-tone headings:** white primary + muted continuation  
  `Workflows.` (foreground) + `Build, deploy, ship.` (muted)
- **Eyebrows:** `Workspace · Workflows`, `Ask · Build · Automate`, `STEP 01 / 03`
- **Home hero uses Cal Sans; list pages use Josefin** — do not swap them
- Keep UI copy dense and operational; marketing copy only when it is the video hook
- No negative letter-spacing on compact UI labels

---

## Radius

CSS token base: `--radius: 0.45rem` (7.2px). Components override — use these in Remotion:

| Token / class | px | Use |
|---|---|---|
| `rounded-sm` | ~4px | Workflow nodes (`BaseNode`) |
| `--radius-md` / `.editorial-input` | 6px | Inputs, calm buttons |
| `.luminous-input` | 8px | Dark inputs, composers |
| `.editorial-panel` | 8px | Light editorial cards |
| `.luminous-card` | 12px | Grouped panels |
| Main canvas inset | 12px (`rounded-xl`) | Dashboard content shell |
| `.luminous-glass-panel` | 16px | Glass command surfaces |
| `.ai-gradient-composer` | 20px outer / 18px inner | Home + copilot composer |
| Pills | 9999px | Status pills, category chips, AI send |

```ts
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
```

---

## Component Primitives

Mirror CSS class names from `globals.css`. Three vocabularies coexist:

### Luminous (default product dark)

**`.luminous-card`** — grouped panels, stat cells, discovery cards

```ts
export const luminousCard = {
  background: innflowTokens.card,
  border: `1px solid ${innflowTokens.border}`,
  borderRadius: 12,
  boxShadow: innflowTokens.glassInner,
};
```

**`.luminous-input`** — prompt fields, command inputs

```ts
export const luminousInput = {
  background: innflowTokens.canvas,
  border: `1px solid ${innflowTokens.border}`,
  borderRadius: 8,
  color: innflowTokens.foreground,
  boxShadow: innflowTokens.glassInner,
};
// Focus: border accent/50% + innflowTokens.inputFocus
```

**`.luminous-btn-primary`** — azure CTA with glow (no transform on hover)

```ts
export const luminousBtnPrimary = {
  background: innflowTokens.accent,
  color: innflowTokens.accentForeground,
  border: "1px solid rgba(255, 255, 255, 0.35)",
  borderRadius: 8,
  fontWeight: 500,
  fontSize: 13,
  height: 36,
  padding: "0 12px",
  letterSpacing: "-0.005em",
  boxShadow: innflowTokens.glowPrimary,
};
// Hover: accentHover + glowPrimaryStrong
```

**`.luminous-glass-panel`** — command palettes, prominent inputs

```ts
export const luminousGlassPanel = {
  background: innflowTokens.glassGradient,
  backdropFilter: "blur(20px)",
  border: `1px solid ${innflowTokens.border}`,
  borderRadius: 16,
  boxShadow: `${innflowTokens.glassInner}, 0 24px 48px -12px rgba(0,0,0,0.7)`,
};
```

### Editorial (shared across dark + light)

**`.editorial-eyebrow`** — section labels above headings

```ts
export const editorialEyebrow = {
  fontFamily: innflowFonts.mono,
  fontSize: 11,
  fontWeight: 500,
  textTransform: "uppercase" as const,
  letterSpacing: "0.14em",
  color: innflowTokens.mutedForeground,
};
```

**`.editorial-display`** — two-tone list headings (Josefin Sans)

```ts
export const editorialDisplay = {
  fontFamily: innflowFonts.display,
  fontWeight: 400,
  letterSpacing: "-0.022em",
  lineHeight: 1.05,
};
```

**`.editorial-status-pill`** — execution state, row metadata

```ts
export const editorialStatusPill = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "4px 10px",
  borderRadius: 9999,
  border: `1px solid ${innflowTokens.border}`,
  background: innflowTokens.card,
  fontFamily: innflowFonts.mono,
  fontSize: 10.5,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  fontWeight: 500,
  color: innflowTokens.mutedForeground,
};
// ::before dot: 5×5px circle
// success: oklch(0.68 0.18 145)
// idle:    oklch(0.78 0.16 75)
// muted:   mutedForeground at 60% opacity
```

**`.editorial-btn-ai`** — periwinkle send (workflow generator, not home composer)

```ts
export const editorialBtnAi = {
  background: innflowTokens.accentAi,
  color: innflowTokens.accentAiForeground,
  borderRadius: 9999,
  border: "1px solid color-mix(in srgb, accent-ai 80%, black)",
  boxShadow: "0 1px 0 0 rgba(255,255,255,0.4) inset, 0 1px 2px 0 rgba(0,0,0,0.1)",
};
```

### AI Composer (signature surface)

**`.ai-gradient-composer`** — home chat + editor copilot (`home-chat-composer.tsx`, `copilot-chat.tsx`)

```ts
export const aiGradientComposer = {
  padding: 1.5, // p-[1.5px] reveals conic border
  borderRadius: 20,
  // Animated conic border (7s linear infinite):
  conicGradient:
    "conic-gradient(from var(--angle), #22d3ee, #3b82f6, #c084fc, #ec4899, #f97316, #facc15, #22d3ee)",
  boxShadow: `${innflowTokens.glassInner}, 0 0 24px rgba(59,130,246,0.16)`,
};

export const aiGradientComposerInner = {
  borderRadius: 18,
  background: "color-mix(in srgb, canvas 88%, transparent)",
  backdropFilter: "blur(20px)",
  minHeight: 150, // home; copilot uses 125
};
```

**Copilot icon buttons** (attach, mic, send):

```ts
export const copilotIconButton = {
  width: 36,
  height: 36,
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.04)",
  boxShadow: "0 3px 10px rgba(0,0,0,0.18)",
  backdropFilter: "blur(4px)",
};
```

**App mention chips** (in composer TipTap):

```ts
export const appMentionChip = {
  border: "1px solid rgba(59,130,246,0.35)",
  borderRadius: 9999,
  background: "rgba(59,130,246,0.1)",
  padding: "2px 6px",
  boxShadow: innflowTokens.glassInner,
};
```

### Workflow Nodes (`base-node.tsx`)

```ts
export const baseNode = {
  borderRadius: 4,
  background: innflowTokens.card,
  border: `1px solid ${innflowTokens.border}`,
  boxShadow: innflowTokens.glassInner,
};
// hover:  border accent/45% + ring 1px accent/25%
// selected: border accent/70% + ring 1px accent/45%

export const baseNodeHeader = {
  borderBottom: `1px solid ${innflowTokens.border}`,
  padding: "14px 16px",
};
export const baseNodeFooter = {
  borderTop: `1px solid ${innflowTokens.border}`,
  background: innflowTokens.canvas,
  padding: "12px 16px",
};
```

**Blueprint edges:** stroke `#3a4040`, 1px, opacity 0.9. Node connector borders: `0.5px solid #272a2a`.

### Calm Rect CTA (non-glow actions)

Run button, entity "New" buttons — **not** azure glow:

```ts
export const calmRectCta = {
  height: 36,
  borderRadius: 6,
  background: innflowTokens.primaryOnDark, // white
  color: innflowTokens.primaryForeground, // near-black
  fontSize: 13,
};
```

### Chat Messages (`message-bubble.tsx`)

| Role | Background | Text |
|---|---|---|
| User | `bg-primary` (white in dark) | `primary-foreground` |
| Assistant | `bg-muted` (surface200) | `foreground` |
| Progress pill | `bg-card` + `shadow-glass-inner` | `muted-foreground`, 11px |
| OAuth card | `bg-card` + hairline border | `foreground` |

### Category Pills (home discovery)

```ts
// Active
{ border: accent, background: accent, color: "#fff", boxShadow: glowPrimary }
// Inactive
{ border: border, background: card, color: mutedForeground }
```

---

## Scene Templates

Build scenes from real app hierarchy. One framed tool surface per scene — avoid nested cards inside cards.

### 1. Dashboard Shell

From `src/app/(dashboard)/(rest)/layout.tsx`:

```
SidebarProvider.app-sidebar-gradient
├── AppSidebar (width 10rem / 3rem icon)
└── SidebarInset
    └── main.ml-[3px].mr-3.rounded-xl.border-canvas-border.bg-canvas/90
        └── page content
```

**Sidebar gradient** (`.app-sidebar-gradient`):

```ts
export const sidebarGradient = `
  radial-gradient(circle at 8% 18%, rgba(59,130,246,0.22) 0, transparent 42%),
  radial-gradient(circle at 72% 88%, rgba(accent-ai,0.18) 0, transparent 46%),
  linear-gradient(235deg, mix(sidebar,accent,12%) 0%, sidebar 42%, mix(sidebar,accent-ai,14%) 100%)
`;
```

### 2. Home / Discovery

From `home-template-discovery.tsx`:

```
bg-canvas (full height)
├── Hero: font-cal 32–42px centered
├── ai-gradient-composer (centered, max-w-3xl)
├── Category pills (rounded-full row)
└── Discovery cards: border-border bg-card shadow-glass-inner rounded-lg
```

### 3. List Page (Workflows, Knowledge, Tables)

From `workflows.tsx` pattern:

```
flex h-full flex-col gap-8 bg-canvas p-4–10
└── max-w-7xl
    ├── editorial-eyebrow + editorial-display (two-tone) + luminous-btn-primary h-9
    ├── Stat strip: gap-px border bg-border → cells bg-card shadow-glass-inner
    └── Rows: rounded-md border-border bg-card shadow-glass-inner hover:bg-secondary
```

### 4. Workflow Editor

From `editor.tsx` / `editor-copilot.tsx`:

```
EditorHeader
└── EditorCopilot
    ├── [optional] Copilot aside.editor-canvas-shell (360px)
    └── main.editor-canvas-shell.rounded-xl.border-canvas-border
        ├── ReactFlow canvas (transparent over shell)
        ├── MiniMap: border-hairline bg-canvas
        ├── Floating toolbar (bottom-center): h-9 rounded-xl border-hairline bg-canvas
        └── EditorRightPanel: w-[286px] border-l border-canvas-border
```

**Editor canvas shell** (`.editor-canvas-shell`):

```ts
export const editorCanvasShell = {
  background: `
    radial-gradient(circle at 12% 8%, rgba(59,130,246,0.10) 0, transparent 34%),
    radial-gradient(circle at 88% 86%, rgba(accent-ai,0.08) 0, transparent 38%),
    linear-gradient(180deg, mix(canvas,foreground,6%) 0%, canvas 48%, mix(canvas,accent,4%) 100%)
  `,
  boxShadow: `
    inset 0 1px 0 rgba(255,255,255,0.08),
    inset 0 0 0 1px rgba(255,255,255,0.03)
  `,
};
```

**Workflow toolbar:** `h-9 rounded-xl border border-hairline bg-canvas px-2.5 shadow-sm`  
Run = `calmRectCta`. Copilot toggle = `SparklesIcon` + `bg-muted` when active.

### 5. Standalone Chat

From `standalone-chat.tsx`:

```
flex h-full bg-canvas
├── SessionHistory: w-[280px] border-r border-border/70 bg-sidebar/40
└── Chat panel + optional ChatArtifactPanel (45%)
    ├── header h-14 border-b border-border/70
    ├── messages max-w-3xl
    └── composer footer border-t border-border/70 + ai-gradient-composer
```

### 6. Auth (only if scene requires it)

From `auth-layout.tsx` — split `auth-exa-shell`:

- Left `auth-exa-left`: white `#ffffff`, text `#202124`
- Right `auth-exa-visual`: blue gradient + code cards
- Cards: `.auth-card` with glass + glow
- CTA: `.auth-btn-primary` warm white on near-black (not azure)

---

## Layout Rules For Video

- Build around real surfaces: workflow canvas, chat composer, node cards, integrations, schedule calendar, execution rows
- Favor dense but readable operational layouts over hero-only slides
- UI cards: 8–12px radius for panels; 4px for nodes; 20px for composer
- One framed tool surface per scene
- Borders: 1px hairlines
- Backgrounds: near-black with subtle radial washes (editor shell, sidebar) — not full-scene azure wash
- Azure = signal. Periwinkle = AI send only

---

## Motion Rules For Remotion

Remotion animates with frames, not CSS transitions.

- Do not use CSS transitions or Tailwind animation classes in rendered compositions
- Use `useCurrentFrame()`, `useVideoConfig()`, `interpolate()`, and `Easing`
- Animate opacity, clip/reveal, blur, numeric transforms, line-drawing, conic angle
- No bouncy or playful motion — calm, precise easing

### Two motion systems

| Context | Duration | Easing |
|---|---|---|
| **Remotion scene reveals** | 12–24 frames | `Easing.bezier(0.16, 1, 0.3, 1)` |
| **In-UI state changes** (mock hover/focus) | 120ms ≈ 7 frames @60fps | `cubic-bezier(0.4, 0, 0.2, 1)` |
| **Panel collapse** | 200ms | ease-out |
| **AI composer border** | 7s linear loop | rotate `--ai-composer-angle` 0→360deg |
| **Auth surfaces** | 140–160ms | `cubic-bezier(0.23, 1, 0.32, 1)` |

**Luminous primary hover:** intensify glow only — no `translateY` or `scale`.

### Motion vocabulary

- Panels fade + slide 8–24px
- Workflow edges draw source → target
- Nodes appear in sequence with opacity + 8px y-offset
- CTA glow intensifies when action is the focus
- Composer conic border rotates continuously (disable if `prefers-reduced-motion`)
- Cursor/typing effects restrained and readable

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

// AI composer border rotation
const angle = interpolate(frame % (7 * fps), [0, 7 * fps], [0, 360]);
```

---

## Do Not Do This

- Generic purple SaaS gradients as main background
- Decorative orbs, bokeh blobs, abstract SVG mascots
- Transform-on-hover in mock UI (use color, glow, border changes)
- Glass blur on every panel — reserve for composer, glass panel, command surfaces
- Chunky tinted icon boxes — prefer bare icons or hairline icon frames
- Over-round cards — precise, not bubbly
- Azure for AI send buttons — use periwinkle `accentAi`
- White glow CTAs in product scenes — those are auth-only
- Captions as main visual when product UI should be inspected
- `#272a2a` borders in product dark scenes — use translucent `rgba(255,255,255,0.1)`

---

## Remotion Agent Checklist

Before rendering:

- [ ] Use `AbsoluteFill` and explicit composition dimensions
- [ ] Put tokens in one `innflow-tokens.ts` file (paste from this guide)
- [ ] Load Figtree + Josefin Sans + Cal Sans via `@remotion/google-fonts`
- [ ] Place assets in `public/` and load with `staticFile()`
- [ ] Use `<Img>`, `<Video>`, `<Audio>` — not raw media tags
- [ ] Apply `shadow-glass-inner` on every card/panel
- [ ] Use `editorCanvasShell` background for workflow scenes (not flat black)
- [ ] Animate `ai-gradient-composer` conic border for chat scenes
- [ ] Verify still: `npx remotion still <id> --frame=<n> --scale=0.25`
- [ ] 9:16: keep UI in center 80% width; leave room for platform chrome

---

## One-File Style Object

Paste into Remotion project. Adjust only video type scale and composition dimensions.

```ts
export const innflow = {
  tokens: innflowTokens,
  fonts: innflowFonts,
  type: innflowType,
  radius: innflowRadius,

  components: {
    luminousCard,
    luminousInput,
    luminousBtnPrimary,
    luminousGlassPanel,
    editorialEyebrow,
    editorialDisplay,
    editorialStatusPill,
    editorialBtnAi,
    aiGradientComposer,
    aiGradientComposerInner,
    copilotIconButton,
    appMentionChip,
    baseNode,
    calmRectCta,
  },

  scenes: {
    sidebarGradient,
    editorCanvasShell,
  },

  shadows: {
    glassInner: innflowTokens.glassInner,
    panel: innflowTokens.panelShadow,
    glowPrimary: innflowTokens.glowPrimary,
    glowPrimaryStrong: innflowTokens.glowPrimaryStrong,
    inputFocus: innflowTokens.inputFocus,
  },

  easing: {
    sceneReveal: [0.16, 1, 0.3, 1] as const,
    uiTransition: [0.4, 0, 0.2, 1] as const,
    auth: [0.23, 1, 0.32, 1] as const,
  },

  motion: {
    uiTransitionMs: 120,
    panelCollapseMs: 200,
    composerBorderSpinSec: 7,
  },
};
```

---

## Key Source Files

| Area | Path |
|---|---|
| Tokens + classes | `src/app/globals.css` |
| Fonts + theme | `src/app/layout.tsx` |
| Dashboard shell | `src/app/(dashboard)/(rest)/layout.tsx` |
| Sidebar | `src/components/app-sidebar.tsx` |
| Home chat | `src/features/home-chat/components/home-template-discovery.tsx` |
| Composer | `src/features/home-chat/components/home-chat-composer.tsx` |
| Editor | `src/features/editor/components/editor.tsx`, `editor-copilot.tsx` |
| Toolbar | `src/features/editor/components/workflow-toolbar.tsx` |
| Nodes | `src/components/react-flow/base-node.tsx` |
| List pages | `src/features/workflows/components/workflows.tsx` |
| Chat bubbles | `src/components/chat/message-bubble.tsx` |
| Auth | `src/features/auth/components/auth-layout.tsx` |

---

*Last synced against `innflow/src` — June 2026. Re-verify `globals.css` `.dark` block when the design system changes.*