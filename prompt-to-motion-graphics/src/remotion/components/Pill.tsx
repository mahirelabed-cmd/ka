import React from "react";
import { theme } from "../theme";
import { DM_SANS } from "./FontLoader";

export const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      background: theme.white,
      color: theme.red,
      borderRadius: 999,
      padding: "12px 28px",
      fontSize: 30,
      fontWeight: 700,
      fontFamily: DM_SANS,
      display: "inline-block",
    }}
  >
    {children}
  </div>
);
