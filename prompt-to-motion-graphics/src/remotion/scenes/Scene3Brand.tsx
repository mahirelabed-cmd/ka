import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { theme } from "../theme";
import { Pill } from "../components/Pill";
import { DM_SANS } from "../components/FontLoader";

const TAGLINE_WORDS = ["Arabisch.", "Strukturiert.", "Auf Deutsch."];
const PILLS = ["Live Online", "4–8 Schüler", "Madina Bücher"];

export const Scene3Brand: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: { stiffness: 150, damping: 18 },
    from: 0.85,
    to: 1,
  });
  const titleOp = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: theme.red }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "80px",
          gap: 48,
        }}
      >
        {/* ARABICROOTS */}
        <div
          style={{
            transform: `scale(${titleScale})`,
            opacity: titleOp,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 88,
              fontWeight: 900,
              color: theme.white,
              letterSpacing: 14,
              fontFamily: DM_SANS,
              lineHeight: 1,
            }}
          >
            ARABICROOTS
          </div>
        </div>

        {/* Tagline: staggered words */}
        <div
          style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}
        >
          {TAGLINE_WORDS.map((word, i) => {
            const sp = spring({
              frame: frame - (22 + i * 8),
              fps,
              config: { stiffness: 160, damping: 15 },
              from: 0,
              to: 1,
            });
            return (
              <span
                key={word}
                style={{
                  fontSize: 46,
                  color: theme.white,
                  fontFamily: DM_SANS,
                  fontWeight: 500,
                  opacity: sp,
                  display: "inline-block",
                  transform: `translateY(${interpolate(sp, [0, 1], [24, 0])}px)`,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* Pills */}
        <div
          style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}
        >
          {PILLS.map((pill, i) => {
            const sp = spring({
              frame: frame - (55 + i * 10),
              fps,
              config: { stiffness: 150, damping: 14 },
              from: 0,
              to: 1,
            });
            return (
              <div
                key={pill}
                style={{
                  transform: `translateY(${interpolate(sp, [0, 1], [90, 0])}px)`,
                  opacity: sp,
                }}
              >
                <Pill>{pill}</Pill>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
