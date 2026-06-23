import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

export const LayeredIntegrations: React.FC = () => {
  const frame = useCurrentFrame();

  const uiEase = Easing.bezier(0.16, 1, 0.3, 1);
  const fgEase = Easing.bezier(0.33, 1, 0.68, 1);

  // Scene fade in (0-8)
  const sceneOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // UI entrance animation
  const uiScale = interpolate(frame, [0, 30, 45], [0.39, 0.93, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: uiEase,
  });

  const uiX = interpolate(frame, [0, 30, 45], [-420, -40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: uiEase,
  });

  const uiY = interpolate(frame, [0, 30, 45], [318, 52, 18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: uiEase,
  });

  const uiBorderRadius = interpolate(frame, [0, 30], [20, 32], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: uiEase,
  });

  // Foreground settling
  const fgScale = interpolate(frame, [0, 45], [1.05, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: fgEase,
  });

  const fgY = interpolate(frame, [0, 30, 59], [36, 10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: fgEase,
  });

  // Foreground shadow/drift layer
  const shadowX = interpolate(frame, [0, 45], [-18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: fgEase,
  });

  const shadowY = interpolate(frame, [0, 45], [-10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: fgEase,
  });

  return (
    <AbsoluteFill
      style={{
        width: 1920,
        height: 1080,
        background: "transparent",
        opacity: sceneOpacity,
      }}
    >
      {/* Background layer */}
      <Img
        src={staticFile("assets/layer-bg-fore/background.webp")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* UI screenshot layer */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: uiY,
          width: 1200,
          transform: `translateX(calc(-50% + ${uiX}px)) scale(${uiScale})`,
          transformOrigin: "center",
          zIndex: 20,
        }}
      >
        <Img
          src={staticFile("assets/layered-hover/integrations-ui.webp")}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: uiBorderRadius,
          }}
        />
      </div>

      {/* Foreground layer */}
      <Img
        src={staticFile("assets/layer-bg-fore/foreground.webp")}
        style={{
          position: "absolute",
          left: "50%",
          top: 40 + fgY,
          width: "100%",
          height: "auto",
          transform: `translateX(-50%) scale(${fgScale})`,
          zIndex: 30,
        }}
      />

      {/* Foreground shadow/drift layer */}
      <Img
        src={staticFile("assets/layer-bg-fore/foreground.webp")}
        style={{
          position: "absolute",
          left: "50%",
          top: 40 + fgY + shadowY,
          width: "100%",
          height: "auto",
          transform: `translateX(-50%) scale(${fgScale}) translateX(${shadowX}px)`,
          zIndex: 25,
          opacity: 0.35,
          mixBlendMode: "multiply",
        }}
      />
    </AbsoluteFill>
  );
};
