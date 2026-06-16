import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from 'remotion';
import {
  innflow,
  luminousCard,
  statusPill,
  primaryCta,
} from './innflowStyles';

export const MyComposition2: React.FC = () => {
  const frame = useCurrentFrame();
  useVideoConfig();

  const ease = Easing.bezier(...innflow.easing.precision);

  // Header fade
  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
    easing: ease,
  });

  // Log rows appearing
  const row1Opacity = interpolate(frame, [30, 50], [0, 1], { easing: ease, extrapolateRight: 'clamp' });
  const row2Opacity = interpolate(frame, [55, 75], [0, 1], { easing: ease, extrapolateRight: 'clamp' });
  const row3Opacity = interpolate(frame, [80, 100], [0, 1], { easing: ease, extrapolateRight: 'clamp' });

  // Progress bar on active row
  const progress = interpolate(frame, [110, 170], [0, 1], {
    extrapolateRight: 'clamp',
    easing: ease,
  });

  // Success check pop
  const successScale = interpolate(frame, [155, 175], [0.6, 1], {
    extrapolateRight: 'clamp',
    easing: ease,
  });

  return (
    <div
      style={{
        background: innflow.colors.canvas,
        fontFamily: innflow.fonts.sans,
      }}
      className="flex h-full w-full flex-col items-center justify-center text-white"
    >
      {/* Subtle grid */}
      <div
        style={{
          backgroundImage: `radial-gradient(${innflow.colors.surface300} 1px, transparent 1px)`,
          backgroundSize: '4px 4px',
          opacity: 0.5,
        }}
        className="absolute inset-0"
      />

      {/* Header */}
      <div
        style={{
          opacity: headerOpacity,
          ...luminousCard,
          padding: '16px 28px',
          marginBottom: 24,
          width: 720,
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div style={{ fontSize: 20, fontWeight: 500 }}>Live Execution</div>
            <div style={{ fontSize: 14, color: innflow.colors.textMuted }}>
              Workflow #4821 • Started 14s ago
            </div>
          </div>
          <div style={{ ...statusPill, background: innflow.colors.success, color: '#fff', border: 'none' }}>
            RUNNING
          </div>
        </div>
      </div>

      {/* Execution log panel */}
      <div
        style={{
          ...luminousCard,
          padding: '24px 32px',
          width: 720,
        }}
      >
        <div style={{ fontSize: 14, color: innflow.colors.textMuted, marginBottom: 16, letterSpacing: 1 }}>
          EXECUTION LOG
        </div>

        {/* Row 1 */}
        <div style={{ opacity: row1Opacity, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${innflow.colors.border}` }}>
          <div className="flex items-center gap-3">
            <div style={{ color: innflow.colors.accent }}>→</div>
            <div>Trigger received • New lead from Typeform</div>
          </div>
          <div style={{ fontSize: 13, color: innflow.colors.textMuted }}>0.2s</div>
        </div>

        {/* Row 2 - AI Agent active */}
        <div style={{ opacity: row2Opacity, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: `1px solid ${innflow.colors.border}` }}>
          <div className="flex items-center gap-3">
            <div style={{ color: innflow.colors.aiAccent }}>→</div>
            <div>AI Agent • Scoring + enrichment (OpenAI + Clearbit)</div>
          </div>
          <div style={{ fontSize: 13, color: innflow.colors.textMuted }}>1.8s</div>
        </div>

        {/* Row 3 - Action with progress */}
        <div style={{ opacity: row3Opacity, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0' }}>
          <div className="flex items-center gap-3">
            <div style={{ color: innflow.colors.success }}>→</div>
            <div>Action • Notify Slack + write to CRM</div>
          </div>
          <div className="flex items-center gap-3">
            <div style={{ width: 120, height: 4, background: innflow.colors.surface300, borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: `${progress * 100}%`, height: '100%', background: innflow.colors.accent }} />
            </div>
            <div style={{ fontSize: 13, color: innflow.colors.textMuted, width: 40 }}>3.4s</div>
          </div>
        </div>
      </div>

      {/* Success footer */}
      <div
        style={{
          opacity: row3Opacity,
          transform: `scale(${successScale})`,
          marginTop: 32,
          ...primaryCta, // reuse style even if not imported
          padding: '10px 24px',
          fontSize: 15,
        }}
      >
        ✓ Workflow complete — 4.1s total
      </div>
    </div>
  );
};
