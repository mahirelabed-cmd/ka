import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { theme } from "../theme";
import { FontLoader } from "../components/FontLoader";
import { Scene1Hook } from "../scenes/Scene1Hook";
import { Scene2Problem } from "../scenes/Scene2Problem";
import { Scene3Brand } from "../scenes/Scene3Brand";
import { Scene4Levels } from "../scenes/Scene4Levels";
import { Scene5SocialProof } from "../scenes/Scene5SocialProof";
import { Scene6CTA } from "../scenes/Scene6CTA";

// 4-frame flash overlay centered on triggerFrame
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

// Transition timestamps (frame numbers at scene boundaries)
const TRANSITIONS = [150, 300, 540, 720, 810];

export const ReelAd: React.FC = () => (
  <AbsoluteFill>
    <FontLoader />

    {/* ── Scenes ──────────────────────────────────────── */}
    <Sequence from={0} durationInFrames={150}>
      <Scene1Hook />
    </Sequence>
    <Sequence from={150} durationInFrames={150}>
      <Scene2Problem />
    </Sequence>
    <Sequence from={300} durationInFrames={240}>
      <Scene3Brand />
    </Sequence>
    <Sequence from={540} durationInFrames={180}>
      <Scene4Levels />
    </Sequence>
    <Sequence from={720} durationInFrames={90}>
      <Scene5SocialProof />
    </Sequence>
    <Sequence from={810} durationInFrames={90}>
      <Scene6CTA />
    </Sequence>

    {/* ── Visual transitions ──────────────────────────── */}
    <Flash triggerFrame={150} color={theme.white} />
    <Flash triggerFrame={300} color={theme.red} />
    <Flash triggerFrame={540} color={theme.white} />
    <Flash triggerFrame={720} color={theme.white} />
    <Flash triggerFrame={810} color={theme.red} />

    {/* ── Voiceover (starts at 0.5s / frame 15) ────────
        Script: "Arabisch lernen – aber wie? Kein klarer Weg.
        Keine Struktur. Kein echtes Verständnis. Das ändert
        Arabicroots. Arabisch – strukturiert und auf Deutsch
        erklärt. Sechs Levels – vom ersten Buchstaben bis zur
        Meisterstufe. Unsere Schüler machen echte Fortschritte.
        Jetzt anmelden auf arabicroots.de"  (~28 s)
    ──────────────────────────────────────────────────── */}
    <Sequence from={15} durationInFrames={900}>
      <Audio src={staticFile("voiceover_reel.wav")} volume={1} />
    </Sequence>

    {/* ── Transition whoosh SFX ───────────────────────── */}
    {TRANSITIONS.map((f) => (
      <Sequence key={`whoosh-${f}`} from={f} durationInFrames={12}>
        <Audio src={staticFile("sfx-whoosh.wav")} volume={0.6} />
      </Sequence>
    ))}

    {/* ── Scene 3: Pills pop-in (frame 355, 365, 375) ── */}
    {[355, 365, 375].map((f) => (
      <Sequence key={`pop-${f}`} from={f} durationInFrames={4}>
        <Audio src={staticFile("sfx-pop.wav")} volume={0.55} />
      </Sequence>
    ))}

    {/* ── Scene 5: Testimonial ding ─────────────────── */}
    <Sequence from={755} durationInFrames={18}>
      <Audio src={staticFile("sfx-ding.wav")} volume={0.7} />
    </Sequence>
  </AbsoluteFill>
);
