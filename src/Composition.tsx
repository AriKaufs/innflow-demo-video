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
  blueprintLine,
  primaryCta,
} from './innflowStyles';

export const MyComposition: React.FC = () => {
  const frame = useCurrentFrame();
  useVideoConfig();

  const ease = Easing.bezier(...innflow.easing.precision);

  // Title animation - precise slide + fade
  const titleOpacity = interpolate(frame, [0, 24], [0, 1], {
    extrapolateRight: 'clamp',
    easing: ease,
  });
  const titleY = interpolate(frame, [0, 24], [24, 0], {
    extrapolateRight: 'clamp',
    easing: ease,
  });

  // Workflow nodes - sequential appear with calm motion
  const node1Opacity = interpolate(frame, [32, 52], [0, 1], {
    extrapolateRight: 'clamp',
    easing: ease,
  });
  const node1Y = interpolate(frame, [32, 52], [16, 0], {
    extrapolateRight: 'clamp',
    easing: ease,
  });

  const node2Opacity = interpolate(frame, [58, 78], [0, 1], {
    extrapolateRight: 'clamp',
    easing: ease,
  });
  const node2Y = interpolate(frame, [58, 78], [16, 0], {
    extrapolateRight: 'clamp',
    easing: ease,
  });

  const node3Opacity = interpolate(frame, [84, 104], [0, 1], {
    extrapolateRight: 'clamp',
    easing: ease,
  });
  const node3Y = interpolate(frame, [84, 104], [16, 0], {
    extrapolateRight: 'clamp',
    easing: ease,
  });

  // Blueprint connection lines drawing
  const conn1Progress = interpolate(frame, [110, 140], [0, 1], {
    extrapolateRight: 'clamp',
    easing: ease,
  });
  const conn2Progress = interpolate(frame, [145, 175], [0, 1], {
    extrapolateRight: 'clamp',
    easing: ease,
  });

  // Feature text and CTA
  const featuresOpacity = interpolate(frame, [160, 190], [0, 1], {
    extrapolateRight: 'clamp',
    easing: ease,
  });

  const ctaGlow = interpolate(frame, [200, 230], [0.4, 1], {
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
      {/* Subtle grid for technical feel */}
      <div
        style={{
          backgroundImage: `radial-gradient(${innflow.colors.surface300} 1px, transparent 1px)`,
          backgroundSize: '4px 4px',
          opacity: 0.6,
        }}
        className="absolute inset-0"
      />

      {/* Title Section - two-tone heading per guide */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
        className="mb-16 text-center z-10"
      >
        <div
          style={{
            fontFamily: innflow.fonts.display,
            fontSize: innflow.type.h1.fontSize,
            lineHeight: innflow.type.h1.lineHeight,
            letterSpacing: innflow.type.h1.letterSpacing,
            fontWeight: innflow.type.h1.fontWeight,
          }}
        >
          Innflow
        </div>
        <div
          style={{
            fontSize: innflow.type.h2.fontSize,
            lineHeight: innflow.type.h2.lineHeight,
            color: innflow.colors.textMuted,
            letterSpacing: innflow.type.h2.letterSpacing,
          }}
          className="mt-2"
        >
          Workflow automation that actually works
        </div>
      </div>

      {/* Workflow Canvas - real product surface */}
      <div
        style={{
          ...luminousCard,
          padding: '32px 48px',
          position: 'relative',
        }}
        className="z-10 mb-12 flex items-center gap-12"
      >
        {/* Node 1 - Trigger */}
        <div
          style={{
            ...luminousCard,
            opacity: node1Opacity,
            transform: `translateY(${node1Y}px)`,
            padding: '20px 24px',
            width: 160,
            border: `1px solid ${innflow.colors.accentBorder}`,
          }}
        >
          <div style={statusPill} className="mb-3 w-fit">
            STEP 01
          </div>
          <div className="flex items-center gap-3">
            <div
              style={{
                width: 36,
                height: 36,
                background: innflow.colors.accentSoft,
                borderRadius: innflow.radius.md,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: innflow.colors.accent,
              }}
            >
              ⚡
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 500 }}>New Lead</div>
              <div style={{ fontSize: 14, color: innflow.colors.textMuted }}>
                Webhook • Typeform
              </div>
            </div>
          </div>
        </div>

        {/* Connection 1 - Blueprint line */}
        <svg width="120" height="4" style={{ overflow: 'visible' }}>
          <line
            x1="0"
            y1="2"
            x2="120"
            y2="2"
            style={{
              stroke: blueprintLine.stroke,
              strokeWidth: blueprintLine.strokeWidth,
              opacity: blueprintLine.opacity,
            }}
          />
          <line
            x1="0"
            y1="2"
            x2={120 * conn1Progress}
            y2="2"
            style={{
              stroke: innflow.colors.accent,
              strokeWidth: 2,
              strokeDasharray: '4 2',
            }}
          />
        </svg>

        {/* Node 2 - AI Agent */}
        <div
          style={{
            ...luminousCard,
            opacity: node2Opacity,
            transform: `translateY(${node2Y}px)`,
            padding: '20px 24px',
            width: 180,
            border: `1px solid ${innflow.colors.accentBorder}`,
          }}
        >
          <div style={statusPill} className="mb-3 w-fit">
            STEP 02
          </div>
          <div className="flex items-center gap-3">
            <div
              style={{
                width: 36,
                height: 36,
                background: innflow.colors.accentSoft,
                borderRadius: innflow.radius.md,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: innflow.colors.aiAccent,
              }}
            >
              🤖
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 500 }}>AI Agent</div>
              <div style={{ fontSize: 14, color: innflow.colors.textMuted }}>
                Enrich • Score • Route
              </div>
            </div>
          </div>
        </div>

        {/* Connection 2 */}
        <svg width="120" height="4" style={{ overflow: 'visible' }}>
          <line
            x1="0"
            y1="2"
            x2="120"
            y2="2"
            style={{
              stroke: blueprintLine.stroke,
              strokeWidth: blueprintLine.strokeWidth,
              opacity: blueprintLine.opacity,
            }}
          />
          <line
            x1="0"
            y1="2"
            x2={120 * conn2Progress}
            y2="2"
            style={{
              stroke: innflow.colors.accent,
              strokeWidth: 2,
              strokeDasharray: '4 2',
            }}
          />
        </svg>

        {/* Node 3 - Action */}
        <div
          style={{
            ...luminousCard,
            opacity: node3Opacity,
            transform: `translateY(${node3Y}px)`,
            padding: '20px 24px',
            width: 180,
            border: `1px solid ${innflow.colors.accentBorder}`,
          }}
        >
          <div style={statusPill} className="mb-3 w-fit">
            STEP 03
          </div>
          <div className="flex items-center gap-3">
            <div
              style={{
                width: 36,
                height: 36,
                background: innflow.colors.accentSoft,
                borderRadius: innflow.radius.md,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: innflow.colors.success,
              }}
            >
              📬
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 500 }}>Action</div>
              <div style={{ fontSize: 14, color: innflow.colors.textMuted }}>
                Slack • CRM • Email
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature highlights + CTA */}
      <div
        style={{ opacity: featuresOpacity }}
        className="z-10 flex flex-col items-center gap-8 text-center"
      >
        <div className="flex gap-16 text-sm">
          <div>
            <div style={{ color: innflow.colors.text, fontWeight: 500 }}>
              30+ Integrations
            </div>
            <div style={{ color: innflow.colors.textMuted }}>
              Slack • Airtable • HubSpot
            </div>
          </div>
          <div>
            <div style={{ color: innflow.colors.text, fontWeight: 500 }}>
              Visual Editor
            </div>
            <div style={{ color: innflow.colors.textMuted }}>
              Drag • Drop • Connect
            </div>
          </div>
          <div>
            <div style={{ color: innflow.colors.text, fontWeight: 500 }}>
              AI Agents
            </div>
            <div style={{ color: innflow.colors.textMuted }}>
              Autonomous workflows
            </div>
          </div>
        </div>

        {/* Primary CTA with glow */}
        <div
          style={{
            ...primaryCta,
            boxShadow: `0 0 15px rgba(59, 130, 246, ${0.4 * ctaGlow})`,
            padding: '12px 32px',
            fontSize: 16,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          Start free automation →
        </div>
      </div>

      {/* Bottom micro label */}
      <div
        style={{
          ...statusPill,
          position: 'absolute',
          bottom: 48,
          fontSize: 11,
          letterSpacing: 2.5,
        }}
      >
        INNFLOW.AI — AUTOMATE THE BUSYWORK
      </div>
    </div>
  );
};
