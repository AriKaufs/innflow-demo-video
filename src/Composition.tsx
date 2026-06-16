import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const ACCENT = '#7c5cff';
const CYAN = '#31d8ff';
const GREEN = '#38e8a5';
const AMBER = '#ffbf47';
const BG = '#06070b';

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const easeOut = Easing.bezier(0.23, 1, 0.32, 1);

const fade = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], { ...clamp, easing: easeOut });

const fadeOut = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [1, 0], { ...clamp, easing: easeOut });

const sceneOpacity = (
  frame: number,
  inStart: number,
  inEnd: number,
  outStart: number,
  outEnd: number,
) => fade(frame, inStart, inEnd) * fadeOut(frame, outStart, outEnd);

const enterY = (frame: number, start: number, distance = 22) =>
  interpolate(frame, [start, start + 18], [distance, 0], {
    ...clamp,
    easing: easeOut,
  });

const softScale = (frame: number, start: number, fps: number) =>
  interpolate(
    spring({
      frame: frame - start,
      fps,
      config: { damping: 18, stiffness: 140, mass: 0.8 },
    }),
    [0, 1],
    [0.94, 1],
    clamp,
  );

const GridBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = frame * 0.18;
  const glow = interpolate(Math.sin(frame / 28), [-1, 1], [0.35, 0.72]);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 35%, rgba(124,92,255,0.18), transparent 34%), radial-gradient(circle at 70% 55%, rgba(49,216,255,0.10), transparent 28%), radial-gradient(circle at 30% 70%, rgba(56,232,165,0.08), transparent 25%)',
          opacity: glow,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: -80,
          transform: `translate3d(${-drift}px, ${drift * 0.45}px, 0)`,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(circle at center, black, transparent 74%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(6,7,11,0.25), rgba(6,7,11,0.88))',
        }}
      />
    </AbsoluteFill>
  );
};

const Badge: React.FC<{
  children: React.ReactNode;
  color?: string;
  delay?: number;
}> = ({ children, color = ACCENT, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = fade(frame, delay, delay + 14);
  const scale = softScale(frame, delay, fps);
  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale}) translateY(${enterY(frame, delay, 10)}px)`,
        padding: '12px 18px',
        borderRadius: 999,
        border: `1px solid ${color}66`,
        background: `linear-gradient(180deg, ${color}24, rgba(255,255,255,0.045))`,
        boxShadow: `0 0 34px ${color}22`,
        color: 'rgba(255,255,255,0.88)',
        fontSize: 22,
        fontWeight: 650,
        letterSpacing: '-0.02em',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </div>
  );
};

const RequestCard: React.FC<{
  label: string;
  detail: string;
  color: string;
  start: number;
  x: number;
  y: number;
}> = ({ label, detail, color, start, x, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = fade(frame, start, start + 18);
  const exit = fadeOut(frame, 78, 100);
  const float = Math.sin((frame + start) / 12) * 5;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 348,
        opacity: progress * exit,
        transform: `translateY(${enterY(frame, start, 36) + float}px) scale(${softScale(frame, start, fps)})`,
        borderRadius: 28,
        border: '1px solid rgba(255,255,255,0.10)',
        background: 'rgba(12,14,23,0.82)',
        boxShadow: `0 28px 90px rgba(0,0,0,0.38), 0 0 45px ${color}1f`,
        backdropFilter: 'blur(18px)',
        padding: 24,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            background: color,
            boxShadow: `0 0 28px ${color}`,
          }}
        />
        <div style={{ color: 'rgba(255,255,255,0.95)', fontSize: 24, fontWeight: 750 }}>
          {label}
        </div>
      </div>
      <div style={{ color: 'rgba(255,255,255,0.48)', fontSize: 18, marginTop: 10 }}>
        {detail}
      </div>
    </div>
  );
};

const WorkflowNode: React.FC<{
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  start: number;
  active?: boolean;
}> = ({ title, subtitle, icon, color, start, active }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = fade(frame, start, start + 14);
  const pulse = active ? interpolate(Math.sin(frame / 6), [-1, 1], [0.45, 1]) : 0.42;
  return (
    <div
      style={{
        width: 245,
        minHeight: 172,
        borderRadius: 30,
        border: `1px solid ${active ? color + '99' : 'rgba(255,255,255,0.12)'}`,
        background: `linear-gradient(180deg, ${color}18, rgba(12,14,23,0.92))`,
        boxShadow: `0 30px 90px rgba(0,0,0,0.32), 0 0 ${active ? 70 : 30}px ${color}${active ? '55' : '1c'}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        opacity,
        transform: `translateY(${enterY(frame, start, 18)}px) scale(${softScale(frame, start, fps)})`,
      }}
    >
      <div
        style={{
          width: 58,
          height: 58,
          borderRadius: 18,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 29,
          background: `${color}20`,
          boxShadow: `0 0 ${36 * pulse}px ${color}80`,
        }}
      >
        {icon}
      </div>
      <div style={{ color: '#fff', fontSize: 26, fontWeight: 790, letterSpacing: '-0.035em' }}>
        {title}
      </div>
      <div style={{ color: 'rgba(255,255,255,0.47)', fontSize: 17, fontWeight: 520 }}>
        {subtitle}
      </div>
    </div>
  );
};

const ConnectionLine: React.FC<{ start: number; color: string }> = ({ start, color }) => {
  const frame = useCurrentFrame();
  const progress = fade(frame, start, start + 20);
  const shimmer = interpolate(frame % 36, [0, 36], [-60, 180]);
  return (
    <div
      style={{
        position: 'relative',
        width: 180,
        height: 5,
        borderRadius: 999,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.09)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transformOrigin: 'left center',
          transform: `scaleX(${progress})`,
          background: `linear-gradient(90deg, ${color}, #fff)`,
          boxShadow: `0 0 25px ${color}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: -7,
          left: shimmer,
          width: 42,
          height: 18,
          opacity: progress,
          background: 'rgba(255,255,255,0.55)',
          filter: 'blur(8px)',
        }}
      />
    </div>
  );
};

const ProductShell: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = fade(frame, start, start + 18);
  const y = enterY(frame, start, 36);
  const scale = softScale(frame, start, fps);
  const scan = interpolate(frame % 90, [0, 90], [-260, 1080]);

  return (
    <div
      style={{
        width: 1180,
        height: 585,
        borderRadius: 36,
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'linear-gradient(180deg, rgba(16,18,30,0.94), rgba(8,9,15,0.94))',
        boxShadow: '0 55px 180px rgba(0,0,0,0.52), 0 0 120px rgba(124,92,255,0.18)',
        overflow: 'hidden',
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
      }}
    >
      <div
        style={{
          height: 70,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 28px',
          gap: 13,
        }}
      >
        <div style={{ width: 14, height: 14, borderRadius: 999, background: '#ff5f57' }} />
        <div style={{ width: 14, height: 14, borderRadius: 999, background: '#ffbd2e' }} />
        <div style={{ width: 14, height: 14, borderRadius: 999, background: '#28c840' }} />
        <div style={{ marginLeft: 22, color: 'rgba(255,255,255,0.72)', fontSize: 20, fontWeight: 680 }}>
          Innflow / Property Ops Workflow
        </div>
        <div
          style={{
            marginLeft: 'auto',
            padding: '9px 15px',
            borderRadius: 999,
            background: 'rgba(56,232,165,0.12)',
            color: GREEN,
            fontSize: 15,
            fontWeight: 720,
          }}
        >
          Live automation
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '270px 1fr 300px', height: 515 }}>
        <div style={{ borderRight: '1px solid rgba(255,255,255,0.08)', padding: 24 }}>
          {['New lead form', 'Tenant email', 'Maintenance request', 'Invoice update'].map((item, i) => (
            <div
              key={item}
              style={{
                marginBottom: 14,
                padding: '16px 17px',
                borderRadius: 18,
                border: '1px solid rgba(255,255,255,0.08)',
                background: i === 0 ? 'rgba(124,92,255,0.16)' : 'rgba(255,255,255,0.035)',
                color: i === 0 ? '#fff' : 'rgba(255,255,255,0.58)',
                fontSize: 17,
                fontWeight: 650,
              }}
            >
              {item}
            </div>
          ))}
        </div>

        <div style={{ position: 'relative', padding: 36 }}>
          <div
            style={{
              position: 'absolute',
              left: scan,
              top: 0,
              width: 100,
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(124,92,255,0.16), transparent)',
              transform: 'skewX(-18deg)',
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 28 }}>
            <WorkflowNode title="Trigger" subtitle="New lead" icon="⚡" color={AMBER} start={start + 16} />
            <ConnectionLine start={start + 44} color={AMBER} />
            <WorkflowNode title="AI Agent" subtitle="Score + route" icon="✦" color={ACCENT} start={start + 65} active={frame > start + 82 && frame < start + 142} />
            <ConnectionLine start={start + 105} color={CYAN} />
            <WorkflowNode title="Action" subtitle="CRM + Slack" icon="✓" color={GREEN} start={start + 128} />
          </div>
        </div>

        <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', padding: 24 }}>
          <div style={{ color: 'rgba(255,255,255,0.44)', fontSize: 15, fontWeight: 720, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 18 }}>
            Agent run
          </div>
          {[
            ['Extract lead details', start + 78],
            ['Check portfolio fit', start + 98],
            ['Create CRM record', start + 118],
            ['Notify leasing team', start + 138],
          ].map(([item, itemStart], i) => (
            <div
              key={item as string}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                opacity: fade(frame, itemStart as number, (itemStart as number) + 12),
                transform: `translateX(${interpolate(frame, [itemStart as number, (itemStart as number) + 12], [14, 0], { ...clamp, easing: easeOut })}px)`,
                marginBottom: 17,
                color: 'rgba(255,255,255,0.78)',
                fontSize: 17,
                fontWeight: 610,
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 999,
                  background: i < 3 ? `${GREEN}22` : `${CYAN}22`,
                  color: i < 3 ? GREEN : CYAN,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                }}
              >
                ✓
              </div>
              {item as string}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const MyComposition: React.FC = () => {
  const frame = useCurrentFrame();

  const painOpacity = sceneOpacity(frame, 0, 20, 78, 100);
  const productOpacity = sceneOpacity(frame, 72, 92, 205, 225);
  const ctaOpacity = fade(frame, 196, 218);

  return (
    <AbsoluteFill style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', color: 'white' }}>
      <GridBackground />

      <div
        style={{
          position: 'absolute',
          top: 54,
          left: 72,
          display: 'flex',
          alignItems: 'center',
          gap: 13,
          opacity: fade(frame, 8, 24),
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 11,
            background: `linear-gradient(135deg, ${ACCENT}, ${CYAN})`,
            boxShadow: `0 0 34px ${ACCENT}88`,
          }}
        />
        <div style={{ fontSize: 27, fontWeight: 820, letterSpacing: '-0.045em' }}>Innflow</div>
      </div>

      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          opacity: painOpacity,
          transform: `translateY(${enterY(frame, 0, 20)}px)`,
        }}
      >
        <div style={{ textAlign: 'center', width: 1300 }}>
          <div
            style={{
              fontSize: 86,
              lineHeight: 0.98,
              fontWeight: 880,
              letterSpacing: '-0.075em',
              textWrap: 'balance',
            }}
          >
            Property teams lose hours to repetitive admin.
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 32,
              color: 'rgba(255,255,255,0.58)',
              fontWeight: 520,
              letterSpacing: '-0.035em',
            }}
          >
            Leads, tenant requests, follow-ups, CRM updates — all routed manually.
          </div>
          <div style={{ marginTop: 46, display: 'flex', justifyContent: 'center', gap: 18 }}>
            <Badge delay={34} color={AMBER}>New lead</Badge>
            <Badge delay={42} color={CYAN}>Tenant email</Badge>
            <Badge delay={50} color={ACCENT}>Maintenance request</Badge>
            <Badge delay={58} color={GREEN}>CRM update</Badge>
          </div>
        </div>
      </AbsoluteFill>

      <RequestCard label="Lead form submitted" detail="2:14 PM · Downtown portfolio" color={AMBER} start={28} x={210} y={690} />
      <RequestCard label="Tenant email received" detail="AC issue · Unit 1108" color={CYAN} start={38} x={735} y={760} />
      <RequestCard label="Follow-up overdue" detail="CRM task waiting 3 days" color={ACCENT} start={48} x={1260} y={690} />

      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          opacity: productOpacity,
        }}
      >
        <div style={{ position: 'absolute', top: 126, textAlign: 'center' }}>
          <div style={{ fontSize: 54, fontWeight: 850, letterSpacing: '-0.06em' }}>
            Innflow turns the busywork into an AI workflow.
          </div>
          <div style={{ marginTop: 12, color: 'rgba(255,255,255,0.52)', fontSize: 24, fontWeight: 520 }}>
            Classify requests, enrich context, update tools, and notify the right people.
          </div>
        </div>
        <ProductShell start={86} />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          opacity: ctaOpacity,
          transform: `translateY(${interpolate(frame, [196, 218], [22, 0], { ...clamp, easing: easeOut })}px)`,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              padding: '13px 20px',
              borderRadius: 999,
              border: '1px solid rgba(56,232,165,0.35)',
              background: 'rgba(56,232,165,0.10)',
              color: GREEN,
              fontSize: 18,
              fontWeight: 760,
              marginBottom: 34,
            }}
          >
            ✓ Every request routed. Every system updated.
          </div>
          <div style={{ fontSize: 92, fontWeight: 900, letterSpacing: '-0.08em', lineHeight: 0.95 }}>
            Automate the busywork.
          </div>
          <div style={{ marginTop: 28, fontSize: 35, color: 'rgba(255,255,255,0.66)', fontWeight: 620, letterSpacing: '-0.035em' }}>
            Build your first workflow free at innflow.ai
          </div>
          <div
            style={{
              margin: '52px auto 0',
              width: 280,
              height: 68,
              borderRadius: 999,
              background: `linear-gradient(135deg, ${ACCENT}, ${CYAN})`,
              boxShadow: `0 0 70px ${ACCENT}66`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              fontWeight: 820,
            }}
          >
            innflow.ai
          </div>
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: 'absolute',
          bottom: 54,
          left: 72,
          opacity: fade(frame, 126, 146) * fadeOut(frame, 224, 238),
          color: 'rgba(255,255,255,0.34)',
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}
      >
        AI workflow automation for property operations
      </div>
    </AbsoluteFill>
  );
};
