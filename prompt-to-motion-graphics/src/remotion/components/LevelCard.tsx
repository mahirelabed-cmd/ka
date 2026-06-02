import React from "react";
import { loadFont } from "@remotion/google-fonts/DMSans";
import { theme } from "../theme";

const { fontFamily } = loadFont();

interface LevelCardProps {
  level: number;
  title: string;
  isActive?: boolean;
}

export const LevelCard: React.FC<LevelCardProps> = ({
  level,
  title,
  isActive = false,
}) => (
  <div
    style={{
      width: 300,
      minHeight: 200,
      background: theme.white,
      border: `${isActive ? 2.5 : 1.5}px solid ${theme.red}`,
      borderRadius: 24,
      padding: "32px 28px",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      flexShrink: 0,
      transform: `scale(${isActive ? 1.05 : 1})`,
    }}
  >
    <div
      style={{
        fontSize: 14,
        fontWeight: 700,
        color: theme.red,
        letterSpacing: 3,
        textTransform: "uppercase",
        fontFamily,
      }}
    >
      LEVEL {level}
    </div>
    <div
      style={{
        fontSize: 30,
        fontWeight: 800,
        color: theme.red,
        fontFamily,
        letterSpacing: -0.5,
        lineHeight: 1.2,
      }}
    >
      {title}
    </div>
  </div>
);
