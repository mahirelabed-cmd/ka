import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import { PLAYFAIR, DM_SANS } from "./FontLoader";

interface AnimatedWordProps {
  text: string;
  delay?: number;
  italic?: boolean;
  fontSize?: number;
  color?: string;
}

export const AnimatedWord: React.FC<AnimatedWordProps> = ({
  text,
  delay = 0,
  italic = false,
  fontSize = 80,
  color = "#970000",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scaleSp = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 220, damping: 16 },
    from: 0.82,
    to: 1,
  });
  const opSp = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 220, damping: 16 },
    from: 0,
    to: 1,
  });

  return (
    <span
      style={{
        display: "inline-block",
        fontSize,
        fontWeight: 900,
        fontStyle: italic ? "italic" : "normal",
        color,
        transform: `scale(${scaleSp})`,
        opacity: opSp,
        fontFamily: italic ? PLAYFAIR : DM_SANS,
        lineHeight: 1.1,
      }}
    >
      {text}
    </span>
  );
};
