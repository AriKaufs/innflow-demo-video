import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';

export const MyComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const titleY = interpolate(frame, [0, 30], [20, 0], {
    extrapolateRight: 'clamp',
  });

  // Workflow nodes animation
  const node1Progress = spring({
    frame: frame - 40,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const node2Progress = spring({
    frame: frame - 70,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const connectionProgress = interpolate(frame, [100, 130], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Feature text fade in
  const featureOpacity = interpolate(frame, [140, 170], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[#0a0a0a] text-white font-sans">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(#1f1f1f_1px,transparent_1px)] bg-[length:4px_4px]" />

      {/* Title Section */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
        className="mb-12 text-center z-10"
      >
        <div className="text-6xl font-bold tracking-tighter mb-4">
          Innflow
        </div>
        <div className="text-2xl text-zinc-400">
          Workflow automation that actually works
        </div>
      </div>

      {/* Workflow Visualization */}
      <div className="relative z-10 flex items-center gap-8 mb-16">
        {/* Node 1 - Trigger */}
        <div
          style={{
            transform: `scale(${node1Progress})`,
            opacity: node1Progress,
          }}
          className="flex h-24 w-24 flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 p-4 shadow-xl"
        >
          <div className="text-3xl mb-1">⚡</div>
          <div className="text-sm font-medium">Trigger</div>
          <div className="text-[10px] text-zinc-500">New Lead</div>
        </div>

        {/* Connection Line */}
        <div className="relative h-1 w-32 overflow-hidden rounded-full bg-zinc-800">
          <div
            style={{
              width: `${connectionProgress * 100}%`,
            }}
            className="absolute h-full bg-white transition-all"
          />
        </div>

        {/* Node 2 - AI Agent */}
        <div
          style={{
            transform: `scale(${node2Progress})`,
            opacity: node2Progress,
          }}
          className="flex h-24 w-24 flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 p-4 shadow-xl"
        >
          <div className="text-3xl mb-1">🤖</div>
          <div className="text-sm font-medium">AI Agent</div>
          <div className="text-[10px] text-zinc-500">Enrich + Score</div>
        </div>

        {/* Connection Line 2 */}
        <div className="relative h-1 w-32 overflow-hidden rounded-full bg-zinc-800">
          <div
            style={{
              width: `${connectionProgress * 100}%`,
            }}
            className="absolute h-full bg-white"
          />
        </div>

        {/* Node 3 - Action */}
        <div
          style={{
            transform: `scale(${node2Progress})`,
            opacity: node2Progress,
          }}
          className="flex h-24 w-24 flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 p-4 shadow-xl"
        >
          <div className="text-3xl mb-1">📬</div>
          <div className="text-sm font-medium">Action</div>
          <div className="text-[10px] text-zinc-500">Slack + CRM</div>
        </div>
      </div>

      {/* Feature highlights */}
      <div
        style={{ opacity: featureOpacity }}
        className="z-10 flex gap-8 text-center text-sm"
      >
        <div>
          <div className="font-semibold text-white">30+ Integrations</div>
          <div className="text-zinc-500">Slack • Airtable • HubSpot</div>
        </div>
        <div>
          <div className="font-semibold text-white">Visual Editor</div>
          <div className="text-zinc-500">Drag • Drop • Connect</div>
        </div>
        <div>
          <div className="font-semibold text-white">AI Agents</div>
          <div className="text-zinc-500">Autonomous workflows</div>
        </div>
      </div>

      {/* Bottom tagline */}
      <div className="absolute bottom-12 text-xs tracking-[3px] text-zinc-600">
        INNFLOW.AI — AUTOMATE THE BUSYWORK
      </div>
    </div>
  );
};
