import React from "react";
import { loadFont } from "@remotion/google-fonts/DMSans";
import { theme } from "../theme";

const { fontFamily } = loadFont();

export const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      background: theme.white,
      color: theme.red,
      borderRadius: 999,
      padding: "12px 28px",
      fontSize: 30,
      fontWeight: 700,
      fontFamily,
      display: "inline-block",
      letterSpacing: 0,
    }}
  >
    {children}
  </div>
);
