import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { theme } from "../theme";
import { PLAYFAIR, DM_SANS } from "../components/FontLoader";

const LETTER_DEFS = [
  { char: "ع", startX: -900, startY: -1200, endX: -220, endY: -280, startRot: -45, endRot: -15, delay: 0 },
  { char: "ر", startX: 950, startY: -900, endX: 240, endY: -350, startRot: 40, endRot: 18, delay: 8 },
  { char: "ب", startX: -800, startY: 800, endX: -180, endY: 200, startRot: -30, endRot: -10, delay: 16 },
  { char: "ي", startX: 1000, startY: 600, endX: 220, endY: 280, startRot: 35, endRot: 12, delay: 24 },
  { char: "ة", startX: 100, startY: -1300, endX: 40, endY: -450, startRot: 15, endRot: 5, delay: 32 },
];

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lettersGlobalOpacity = interpolate(frame, [70, 100], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const word1Scale = spring({
    frame: frame - 85,
    fps,
    config: { stiffness: 220, damping: 16 },
    from: 0.82,
    to: 1,
  });
  const word1Op = spring({
    frame: frame - 85,
    fps,
    config: { stiffness: 220, damping: 16 },
    from: 0,
    to: 1,
  });
  const word2Scale = spring({
    frame: frame - 108,
    fps,
    config: { stiffness: 220, damping: 16 },
    from: 0.82,
    to: 1,
  });
  const word2Op = spring({
    frame: frame - 108,
    fps,
    config: { stiffness: 220, damping: 16 },
    from: 0,
    to: 1,
  });

  return (
    <AbsoluteFill style={{ background: theme.white }}>
      {/* Floating Arabic letters */}
      <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: lettersGlobalOpacity,
        }}
      >
        {LETTER_DEFS.map((def) => {
          const sp = spring({
            frame: frame - def.delay,
            fps,
            config: { stiffness: 130, damping: 15 },
            from: 0,
            to: 1,
          });
          const x = interpolate(sp, [0, 1], [def.startX, def.endX]);
          const y = interpolate(sp, [0, 1], [def.startY, def.endY]);
          const rot = interpolate(sp, [0, 1], [def.startRot, def.endRot]);

          return (
            <div
              key={def.char + def.delay}
              style={{
                position: "absolute",
                fontSize: 170,
                color: theme.red,
                fontFamily: "serif",
                fontWeight: 700,
                lineHeight: 1,
                transform: `translate(${x}px, ${y}px) rotate(${rot}deg)`,
                opacity: sp,
                userSelect: "none",
              }}
            >
              {def.char}
            </div>
          );
        })}
      </AbsoluteFill>

      {/* Word reveal */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ transform: `scale(${word1Scale})`, opacity: word1Op }}>
          <span
            style={{
              fontSize: 116,
              fontWeight: 900,
              color: theme.red,
              fontFamily: DM_SANS,
              letterSpacing: -3,
              display: "block",
              textAlign: "center",
            }}
          >
            Arabisch
          </span>
        </div>

        <div style={{ transform: `scale(${word2Scale})`, opacity: word2Op }}>
          <span
            style={{
              fontSize: 116,
              fontWeight: 900,
              fontStyle: "italic",
              color: theme.red,
              fontFamily: PLAYFAIR,
              letterSpacing: -2,
              display: "block",
              textAlign: "center",
            }}
          >
            lernen.
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
