import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import { theme } from "../theme";
import { Scene1Hook } from "../scenes/Scene1Hook";
import { Scene2Problem } from "../scenes/Scene2Problem";
import { Scene3Brand } from "../scenes/Scene3Brand";
import { Scene4Levels } from "../scenes/Scene4Levels";
import { Scene5SocialProof } from "../scenes/Scene5SocialProof";
import { Scene6CTA } from "../scenes/Scene6CTA";

// 4-frame flash overlay, centered on triggerFrame
const Flash: React.FC<{ triggerFrame: number; color: string }> = ({
  triggerFrame,
  color,
}) => {
  const frame = useCurrentFrame();
  const local = frame - (triggerFrame - 2);
  const opacity = interpolate(local, [0, 2, 4], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (opacity <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: color,
        opacity,
        pointerEvents: "none",
        zIndex: 200,
      }}
    />
  );
};

export const ReelAd: React.FC = () => (
  <AbsoluteFill>
    {/* Scene 1 – Hook           (  0 – 150 ) white bg */}
    <Sequence from={0} durationInFrames={150}>
      <Scene1Hook />
    </Sequence>

    {/* Scene 2 – Problem        (150 – 300 ) white bg */}
    <Sequence from={150} durationInFrames={150}>
      <Scene2Problem />
    </Sequence>

    {/* Scene 3 – Brand          (300 – 540 ) red bg  */}
    <Sequence from={300} durationInFrames={240}>
      <Scene3Brand />
    </Sequence>

    {/* Scene 4 – Levels         (540 – 720 ) white bg */}
    <Sequence from={540} durationInFrames={180}>
      <Scene4Levels />
    </Sequence>

    {/* Scene 5 – Social Proof   (720 – 810 ) white bg */}
    <Sequence from={720} durationInFrames={90}>
      <Scene5SocialProof />
    </Sequence>

    {/* Scene 6 – CTA            (810 – 900 ) red bg  */}
    <Sequence from={810} durationInFrames={90}>
      <Scene6CTA />
    </Sequence>

    {/* ── Transitions ─────────────────────────────────
        white → white  @150: white flash
        white → red    @300: red flash
        red   → white  @540: white flash
        white → white  @720: white flash
        white → red    @810: red flash
    ─────────────────────────────────────────────── */}
    <Flash triggerFrame={150} color={theme.white} />
    <Flash triggerFrame={300} color={theme.red} />
    <Flash triggerFrame={540} color={theme.white} />
    <Flash triggerFrame={720} color={theme.white} />
    <Flash triggerFrame={810} color={theme.red} />
  </AbsoluteFill>
);
