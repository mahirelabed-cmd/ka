import React from "react";
import { AbsoluteFill } from "remotion";
import { theme } from "../theme";
import { StrikethroughText } from "../components/StrikethroughText";

const PROBLEMS = [
  { text: "Kein klarer Lernweg.", delay: 0, strikeDelay: 22 },
  { text: "Keine Struktur.", delay: 42, strikeDelay: 64 },
  { text: "Kein echtes Verständnis.", delay: 84, strikeDelay: 106 },
];

export const Scene2Problem: React.FC = () => (
  <AbsoluteFill
    style={{
      background: theme.white,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "0 90px",
      gap: 52,
    }}
  >
    {PROBLEMS.map((p) => (
      <StrikethroughText
        key={p.text}
        text={p.text}
        delay={p.delay}
        strikeDelay={p.strikeDelay}
        fontSize={66}
      />
    ))}
  </AbsoluteFill>
);
