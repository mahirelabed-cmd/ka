import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { theme } from "../theme";
import { LevelCard } from "../components/LevelCard";
import { DM_SANS } from "../components/FontLoader";

const LEVELS = [
  { level: 1, title: "Buchstabenkurs" },
  { level: 2, title: "Grundlagenkurs" },
  { level: 3, title: "Aufbaukurs" },
  { level: 4, title: "Fortgeschritten" },
  { level: 5, title: "Expertenkurs" },
  { level: 6, title: "Meisterstufe" },
];

const CARD_WIDTH = 300;
const CARD_GAP = 24;
const CARD_STRIDE = CARD_WIDTH + CARD_GAP;

export const Scene4Levels: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineSp = spring({
    frame,
    fps,
    config: { stiffness: 150, damping: 18 },
    from: 0,
    to: 1,
  });

  const maxScroll = CARD_STRIDE * (LEVELS.length - 1);
  const scrollX = interpolate(frame, [20, 170], [0, -maxScroll], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const activeIndex = Math.round(
    interpolate(frame, [20, 170], [0, LEVELS.length - 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  return (
    <AbsoluteFill style={{ background: theme.white }}>
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          gap: 56,
        }}
      >
        <div
          style={{
            opacity: headlineSp,
            transform: `translateY(${interpolate(headlineSp, [0, 1], [-28, 0])}px)`,
          }}
        >
          <div
            style={{
              fontSize: 100,
              fontWeight: 900,
              color: theme.red,
              fontFamily: DM_SANS,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            6 Levels.
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 600,
              color: theme.red,
              fontFamily: DM_SANS,
              marginTop: 12,
            }}
          >
            Vom Anfänger zum Experten.
          </div>
        </div>

        <div style={{ overflow: "hidden", width: "100%" }}>
          <div
            style={{
              display: "flex",
              gap: CARD_GAP,
              transform: `translateX(${scrollX}px)`,
            }}
          >
            {LEVELS.map((l, i) => (
              <LevelCard
                key={l.level}
                level={l.level}
                title={l.title}
                isActive={i === activeIndex}
              />
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
