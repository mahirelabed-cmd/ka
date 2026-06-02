import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";
import { theme } from "../theme";

const { fontFamily: playfairFamily } = loadPlayfair();
const { fontFamily: dmSansFamily } = loadDMSans();

export const Scene6CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow scale-up 0.95 → 1.0 over the whole scene (90 frames)
  const overallScale = interpolate(frame, [0, 90], [0.95, 1.0], {
    extrapolateRight: "clamp",
  });

  const mainSp = spring({
    frame,
    fps,
    config: { stiffness: 120, damping: 18 },
    from: 0,
    to: 1,
  });
  const urlSp = spring({
    frame: frame - 22,
    fps,
    config: { stiffness: 120, damping: 18 },
    from: 0,
    to: 1,
  });

  // Arabic symbol pulse: spring to 1.06 then sine oscillation
  const pulseSpring = spring({
    frame,
    fps,
    config: { stiffness: 100, damping: 10 },
    from: 0.88,
    to: 1.06,
  });
  const arabicScale =
    frame < 20
      ? pulseSpring
      : 1.0 + 0.06 * Math.cos(((frame - 20) / 45) * Math.PI * 2);

  // Cursor blink every 15 frames
  const cursorVisible = Math.floor(frame / 15) % 2 === 0;

  return (
    <AbsoluteFill style={{ background: theme.red }}>
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 36,
          transform: `scale(${overallScale})`,
        }}
      >
        {/* Arabic symbol pulsing */}
        <div
          style={{
            fontSize: 110,
            color: theme.white,
            lineHeight: 1,
            opacity: mainSp,
            transform: `scale(${arabicScale})`,
            display: "inline-block",
          }}
        >
          ع
        </div>

        {/* Main headline */}
        <div style={{ opacity: mainSp, textAlign: "center", position: "relative" }}>
          <span
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: theme.white,
              fontFamily: playfairFamily,
              letterSpacing: -2,
            }}
          >
            Jetzt anmelden.
          </span>
          <span
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: theme.white,
              fontFamily: playfairFamily,
              opacity: cursorVisible ? 1 : 0,
              marginLeft: 6,
            }}
          >
            |
          </span>
        </div>

        {/* URL */}
        <div
          style={{
            opacity: urlSp,
            transform: `translateY(${interpolate(urlSp, [0, 1], [22, 0])}px)`,
          }}
        >
          <span
            style={{
              fontSize: 32,
              color: theme.white,
              fontFamily: dmSansFamily,
              letterSpacing: 7,
              fontWeight: 400,
            }}
          >
            arabicroots.de
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
