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

const STAR_DELAYS = [0, 6, 12, 18, 24];

export const Scene5SocialProof: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const quoteSp = spring({
    frame: frame - 35,
    fps,
    config: { stiffness: 120, damping: 16 },
    from: 0,
    to: 1,
  });
  const nameSp = spring({
    frame: frame - 56,
    fps,
    config: { stiffness: 120, damping: 16 },
    from: 0,
    to: 1,
  });

  return (
    <AbsoluteFill style={{ background: theme.white }}>
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          gap: 44,
        }}
      >
        <div style={{ display: "flex", gap: 14 }}>
          {STAR_DELAYS.map((delay, i) => {
            const sp = spring({
              frame: frame - delay,
              fps,
              config: { stiffness: 200, damping: 14 },
              from: 0,
              to: 1,
            });
            return (
              <span
                key={i}
                style={{
                  fontSize: 64,
                  color: theme.red,
                  display: "inline-block",
                  transform: `translateX(${interpolate(sp, [0, 1], [-70, 0])}px)`,
                  opacity: sp,
                  lineHeight: 1,
                }}
              >
                ★
              </span>
            );
          })}
        </div>

        <div
          style={{
            transform: `translateY(${interpolate(quoteSp, [0, 1], [44, 0])}px)`,
            opacity: quoteSp,
          }}
        >
          <p
            style={{
              fontSize: 54,
              color: theme.red,
              fontFamily: PLAYFAIR,
              fontStyle: "italic",
              fontWeight: 600,
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            „Ich habe in wenigen Wochen mehr gelernt als in Monaten zuvor."
          </p>
        </div>

        <div
          style={{
            opacity: nameSp * 0.6,
            transform: `translateY(${interpolate(nameSp, [0, 1], [20, 0])}px)`,
          }}
        >
          <span
            style={{
              fontSize: 34,
              color: theme.red,
              fontFamily: DM_SANS,
              fontWeight: 500,
            }}
          >
            S.M – Level 2
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
