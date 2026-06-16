import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from 'remotion';
import {
  innflowTokens,
  innflowFonts,
  innflowType,
  luminousCard,
  editorialStatusPill,
  luminousBtnPrimary,
} from './innflowTokens';

export const MyComposition3: React.FC = () => {
  const frame = useCurrentFrame();
  useVideoConfig();

  const ease = Easing.bezier(0.16, 1, 0.3, 1);

  const headerOpacity = interpolate(frame, [0, 18], [0, 1], { easing: ease, extrapolateRight: 'clamp' });
  const headerY = interpolate(frame, [0, 18], [12, 0], { easing: ease, extrapolateRight: 'clamp' });

  const row1 = interpolate(frame, [28, 48], [0, 1], { easing: ease, extrapolateRight: 'clamp' });
  const row2 = interpolate(frame, [52, 72], [0, 1], { easing: ease, extrapolateRight: 'clamp' });
  const row3 = interpolate(frame, [76, 96], [0, 1], { easing: ease, extrapolateRight: 'clamp' });

  const ctaOpacity = interpolate(frame, [110, 140], [0, 1], { easing: ease, extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        background: innflowTokens.canvas,
        fontFamily: innflowFonts.sans,
        color: innflowTokens.foreground,
      }}
      className="flex h-full w-full flex-col items-center justify-center"
    >
      {/* Canvas grid */}
      <div
        style={{
          backgroundImage: `radial-gradient(${innflowTokens.surface300} 1px, transparent 1px)`,
          backgroundSize: '4px 4px',
          opacity: 0.4,
        }}
        className="absolute inset-0"
      />

      {/* Header with editorial style */}
      <div
        style={{
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          maxWidth: 860,
          width: '100%',
          padding: '0 48px',
        }}
      >
        <div style={editorialStatusPill} className="mb-3 w-fit">
          WORKSPACE · WORKFLOWS
        </div>

        <div
          style={{
            fontFamily: innflowFonts.display,
            fontSize: innflowType.h2.fontSize,
            lineHeight: innflowType.h2.lineHeight,
            letterSpacing: innflowType.h2.letterSpacing,
          }}
        >
          Workflows. <span style={{ color: innflowTokens.mutedForeground }}>Build, deploy, ship.</span>
        </div>

        <div style={{ marginTop: 28, display: 'flex', gap: 12 }}>
          <div style={luminousBtnPrimary}>New workflow</div>
          <div
            style={{
              ...luminousBtnPrimary,
              background: 'transparent',
              color: innflowTokens.foreground,
              border: `1px solid ${innflowTokens.border}`,
              boxShadow: 'none',
            }}
          >
            Import from GitHub
          </div>
        </div>
      </div>

      {/* Stat strip */}
      <div
        style={{
          ...luminousCard,
          marginTop: 48,
          padding: '20px 32px',
          display: 'flex',
          gap: 48,
          width: 860,
        }}
      >
        {[
          { label: 'Active', value: '47' },
          { label: 'Runs today', value: '1,284' },
          { label: 'Avg. duration', value: '3.2s' },
        ].map((s, i) => (
          <div key={i}>
            <div style={{ fontSize: 13, color: innflowTokens.mutedForeground }}>{s.label}</div>
            <div style={{ fontSize: 32, fontWeight: 500, marginTop: 2 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Workflow rows */}
      <div style={{ marginTop: 32, width: 860 }}>
        {[ 
          { name: 'New Lead → Slack + CRM', status: 'Active', runs: '312', time: '2.1s', opacity: row1 },
          { name: 'Support Ticket Triage', status: 'Active', runs: '89', time: '4.8s', opacity: row2 },
          { name: 'Weekly Report Generator', status: 'Paused', runs: '41', time: '12s', opacity: row3 },
        ].map((wf, idx) => (
          <div
            key={idx}
            style={{
              ...luminousCard,
              opacity: wf.opacity,
              padding: '18px 24px',
              marginBottom: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 500 }}>{wf.name}</div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 32, fontSize: 15 }}>
              <div style={editorialStatusPill}>
                {wf.status}
              </div>
              <div style={{ color: innflowTokens.mutedForeground }}>{wf.runs} runs</div>
              <div style={{ color: innflowTokens.mutedForeground }}>{wf.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA area */}
      <div style={{ opacity: ctaOpacity, marginTop: 40, fontSize: 15, color: innflowTokens.mutedForeground }}>
        All workflows are versioned and observable in real time.
      </div>
    </div>
  );
};
