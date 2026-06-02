import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { loadFont } from "@remotion/google-fonts/DMSans";
import { theme } from "../theme";

const { fontFamily } = loadFont();

interface StrikethroughTextProps {
  text: string;
  delay?: number;
  strikeDelay?: number;
  fontSize?: number;
}

export const StrikethroughText: React.FC<StrikethroughTextProps> = ({
  text,
  delay = 0,
  strikeDelay = 0,
  fontSize = 60,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - delay;

  const slideX = interpolate(localFrame, [0, 16], [-1200, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(localFrame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Quick shake: horizontal sine wobble for 8 frames after appearance
  const shake =
    localFrame >= 0 && localFrame < 10
      ? Math.sin(localFrame * 2.8) * 10
      : 0;

  const strikeLocalFrame = frame - strikeDelay;
  const lineWidth = interpolate(strikeLocalFrame, [0, 22], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        transform: `translateX(${slideX + shake}px)`,
        opacity,
        position: "relative",
        display: "inline-block",
      }}
    >
      <span
        style={{
          fontSize,
          fontWeight: 700,
          color: theme.red,
          fontFamily,
          letterSpacing: -1,
          lineHeight: 1.2,
        }}
      >
        {text}
      </span>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          height: 4,
          width: `${lineWidth}%`,
          background: theme.red,
          borderRadius: 2,
          transform: "translateY(-50%)",
        }}
      />
    </div>
  );
};
