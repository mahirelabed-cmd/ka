import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// ─── Brand Constants ──────────────────────────────────────────────────────────
const RED = "#970000";
const RED2 = "#BF1010";
const WHITE = "#FFFFFF";
const FONT = "'Inter', 'Helvetica Neue', Arial, sans-serif";

const pillStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.18)",
  border: "1px solid rgba(255,255,255,0.35)",
  borderRadius: 999,
  padding: "8px 20px",
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: 500,
  display: "inline-block",
};

const infoTagStyle: React.CSSProperties = {
  background: "#FFFFFF",
  borderRadius: 999,
  padding: "8px 18px",
  color: "#970000",
  fontWeight: 700,
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  fontSize: 15,
};

// ─── Shared Components ────────────────────────────────────────────────────────
const GridBg: React.FC = () => (
  <svg
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
    }}
  >
    <defs>
      <pattern
        id="grid"
        width="80"
        height="80"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M 80 0 L 0 0 0 80"
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);

const GlowBg: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: `radial-gradient(ellipse at 25% 20%, rgba(191,16,16,0.55) 0%, transparent 55%),
                   radial-gradient(ellipse at 75% 75%, rgba(255,255,255,0.07) 0%, transparent 45%),
                   #970000`,
    }}
  />
);

const SceneBase: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill
    style={{ background: RED, fontFamily: FONT, overflow: "hidden" }}
  >
    <GlowBg />
    <GridBg />
    {children}
  </AbsoluteFill>
);

const FadeIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  return <div style={{ opacity, width: "100%", height: "100%" }}>{children}</div>;
};

function useSpring(frame: number, fps: number, delay = 0): number {
  return spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 120, damping: 14, mass: 1 },
    from: 0,
    to: 1,
  });
}

const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={pillStyle}>{children}</div>
);

const InfoTag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={infoTagStyle}>{children}</div>
);

// DarkFlash: renders a full-screen dark overlay that pulses opacity 0→0.7→0 over 20 frames
const DarkFlash: React.FC<{ triggerFrame: number }> = ({ triggerFrame }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - (triggerFrame - 10);
  const opacity = interpolate(localFrame, [0, 10, 20], [0, 0.7, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: RED,
        opacity,
        pointerEvents: "none",
        zIndex: 100,
      }}
    />
  );
};

// ─── Scene 1: Hook ────────────────────────────────────────────────────────────
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sp0 = useSpring(frame, fps, 0);
  const sp1 = useSpring(frame, fps, 8);
  const sp2 = useSpring(frame, fps, 16);
  const sp3 = useSpring(frame, fps, 24);

  const word1Y = interpolate(sp1, [0, 1], [50, 0]);
  const word2Y = interpolate(sp2, [0, 1], [50, 0]);

  const arabicScale1 = useSpring(frame, fps, 5);
  const arabicScale2 = useSpring(frame, fps, 12);

  // Sinusoidal SVG sweep
  const dashOffset = interpolate(frame, [0, 150], [800, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <SceneBase>
      {/* Floating Arabic letters */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 40,
          fontSize: 200,
          color: WHITE,
          opacity: 0.12,
          transform: `scale(${arabicScale1}) rotateY(20deg) rotateZ(-10deg)`,
          transformStyle: "preserve-3d",
          perspective: 600,
          lineHeight: 1,
          pointerEvents: "none",
        }}
      >
        ع
      </div>
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 60,
          fontSize: 180,
          color: WHITE,
          opacity: 0.1,
          transform: `scale(${arabicScale2}) rotateY(-15deg) rotateZ(8deg)`,
          transformStyle: "preserve-3d",
          perspective: 600,
          lineHeight: 1,
          pointerEvents: "none",
        }}
      >
        ر
      </div>

      {/* Main content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          gap: 24,
        }}
      >
        <div style={{ opacity: sp0 }}>
          <Pill>Live, online &amp; strukturiert</Pill>
        </div>

        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              fontSize: 112,
              fontWeight: 900,
              color: WHITE,
              letterSpacing: -3,
              lineHeight: 1,
              transform: `translateY(${word1Y}px)`,
              opacity: sp1,
            }}
          >
            ARABISCH
          </div>
        </div>
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              fontSize: 112,
              fontWeight: 900,
              color: WHITE,
              letterSpacing: -3,
              lineHeight: 1,
              transform: `translateY(${word2Y}px)`,
              opacity: sp2,
            }}
          >
            LERNEN.
          </div>
        </div>
      </div>

      {/* Bottom-right InfoTag */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          right: 80,
          opacity: sp3,
        }}
      >
        <InfoTag>▶ arabicroots.de</InfoTag>
      </div>

      {/* Sinusoidal SVG line */}
      <svg
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 200,
          pointerEvents: "none",
        }}
      >
        <path
          d="M -100 100 Q 170 30 340 100 Q 510 170 680 100 Q 850 30 1020 100 Q 1190 170 1360 100"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="2"
          strokeDasharray="800"
          strokeDashoffset={dashOffset}
        />
      </svg>
    </SceneBase>
  );
};

// ─── Scene 2: Brand Reveal ────────────────────────────────────────────────────
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scaleSpring = spring({
    frame,
    fps,
    config: { stiffness: 130, damping: 16 },
    from: 0.7,
    to: 1.0,
  });
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const dividerWidth = interpolate(frame, [20, 60], [0, 800], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subOpacity = interpolate(frame, [50, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tagSp = useSpring(frame, fps, 30);

  return (
    <SceneBase>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.12) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 32,
        }}
      >
        <div
          style={{
            transform: `scale(${scaleSpring})`,
            opacity,
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: WHITE,
              letterSpacing: -2,
            }}
          >
            ARABIC
          </span>
          <span
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: WHITE,
              letterSpacing: -2,
              textShadow: "0 0 40px rgba(255,255,255,0.4)",
            }}
          >
            ROOTS
          </span>
        </div>

        <div
          style={{
            width: dividerWidth,
            height: 2,
            background: WHITE,
            borderRadius: 1,
          }}
        />

        <div
          style={{
            fontSize: 38,
            color: WHITE,
            opacity: subOpacity * 0.85,
            textAlign: "center",
          }}
        >
          Arabisch lernen mit echtem Fortschritt.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 80,
          right: 80,
          opacity: tagSp,
        }}
      >
        <InfoTag>▶ arabicroots.de</InfoTag>
      </div>
    </SceneBase>
  );
};

// ─── Scene 3: Statement ───────────────────────────────────────────────────────
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pillSp = useSpring(frame, fps, 0);

  const w1Sp = spring({
    frame: frame - 10,
    fps,
    config: { stiffness: 180, damping: 12 },
    from: 0,
    to: 1,
  });
  const w2Sp = spring({
    frame: frame - 20,
    fps,
    config: { stiffness: 180, damping: 12 },
    from: 0,
    to: 1,
  });
  const w3Sp = spring({
    frame: frame - 30,
    fps,
    config: { stiffness: 180, damping: 12 },
    from: 0,
    to: 1,
  });
  const w4Sp = spring({
    frame: frame - 40,
    fps,
    config: { stiffness: 180, damping: 12 },
    from: 0,
    to: 1,
  });

  return (
    <SceneBase>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 200,
          height: 200,
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          gap: 20,
        }}
      >
        <div style={{ opacity: pillSp }}>
          <Pill>Genau das</Pill>
        </div>
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            {[
              { text: "HABEN", sp: w1Sp },
              { text: "WIR", sp: w2Sp },
            ].map(({ text, sp }) => (
              <div
                key={text}
                style={{
                  fontSize: 100,
                  fontWeight: 900,
                  color: WHITE,
                  transform: `translateY(${interpolate(sp, [0, 1], [60, 0])}px)`,
                  opacity: sp,
                  lineHeight: 1.05,
                }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            {[
              { text: "AUCH", sp: w3Sp },
              { text: "VOR", sp: w4Sp },
            ].map(({ text, sp }) => (
              <div
                key={text}
                style={{
                  fontSize: 100,
                  fontWeight: 900,
                  color: WHITE,
                  transform: `translateY(${interpolate(sp, [0, 1], [60, 0])}px)`,
                  opacity: sp,
                  lineHeight: 1.05,
                }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SceneBase>
  );
};

// ─── Scene 4: Offer ───────────────────────────────────────────────────────────
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pillSp = useSpring(frame, fps, 0);
  const headlineSp = useSpring(frame, fps, 10);
  const badgeSp = useSpring(frame, fps, 25);
  const tagSp = useSpring(frame, fps, 40);

  const headlineY = interpolate(headlineSp, [0, 1], [50, 0]);
  const badgeX = interpolate(badgeSp, [0, 1], [-200, 0]);

  return (
    <SceneBase>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          gap: 28,
        }}
      >
        <div style={{ opacity: pillSp }}>
          <Pill>Das Ergebnis nach</Pill>
        </div>
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              fontSize: 104,
              fontWeight: 900,
              color: WHITE,
              transform: `translateY(${headlineY}px)`,
              opacity: headlineSp,
              lineHeight: 1,
            }}
          >
            GERADE MAL
          </div>
        </div>

        {/* Floating badge */}
        <div
          style={{
            transform: `translateX(${badgeX}px)`,
            opacity: badgeSp,
          }}
        >
          <div
            style={{
              background: WHITE,
              borderRadius: 12,
              padding: "14px 28px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                color: RED,
                fontSize: 13,
                letterSpacing: 2,
                marginBottom: 6,
              }}
            >
              ● ● ●
            </div>
            <div
              style={{
                color: RED,
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              Level 1 · Buchstabenkurs
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 100,
          right: 80,
          opacity: tagSp,
        }}
      >
        <InfoTag>▶ Buchstabenkurs</InfoTag>
      </div>
    </SceneBase>
  );
};

// ─── Scene 5: Course Table ────────────────────────────────────────────────────
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagSp = useSpring(frame, fps, 0);

  const courses = [
    { name: "Buchstabenkurs", duration: "20 Wo." },
    { name: "Grundlagenkurs", duration: "35 Wo." },
    { name: "Aufbaukurs", duration: "35 Wo." },
    { name: "Fortgeschrittenenkurs", duration: "35 Wo." },
    { name: "Expertenkurs", duration: "35 Wo." },
  ];

  return (
    <SceneBase>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.28)",
            backdropFilter: "blur(16px)",
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.15)",
            padding: 40,
            width: "100%",
            maxWidth: 900,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 24,
              borderBottom: "1px solid rgba(255,255,255,0.15)",
              paddingBottom: 16,
            }}
          >
            <div
              style={{
                color: WHITE,
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: 3,
                opacity: 0.6,
                textTransform: "uppercase",
              }}
            >
              KURS
            </div>
            <div
              style={{
                color: WHITE,
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: 3,
                opacity: 0.6,
                textTransform: "uppercase",
              }}
            >
              DAUER
            </div>
          </div>

          {/* Rows */}
          {courses.map((course, i) => {
            const rowSp = spring({
              frame: frame - i * 15,
              fps,
              config: { stiffness: 120, damping: 14 },
              from: 0,
              to: 1,
            });
            const rowY = interpolate(rowSp, [0, 1], [30, 0]);
            return (
              <div
                key={course.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 0",
                  borderBottom:
                    i < courses.length - 1
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "none",
                  transform: `translateY(${rowY}px)`,
                  opacity: rowSp,
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: 16 }}
                >
                  <span style={{ color: RED2, fontSize: 20 }}>●</span>
                  <span style={{ color: WHITE, fontSize: 28, fontWeight: 500 }}>
                    {course.name}
                  </span>
                </div>
                <span style={{ color: WHITE, fontSize: 28, opacity: 0.8 }}>
                  {course.duration}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{ position: "absolute", top: 80, right: 80, opacity: tagSp }}
      >
        <InfoTag>▶ arabicroots.de</InfoTag>
      </div>
    </SceneBase>
  );
};

// ─── Scene 6: Transition Pill ─────────────────────────────────────────────────
const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scaleSp = spring({
    frame,
    fps,
    config: { stiffness: 140, damping: 10 },
    from: 0.7,
    to: 1.0,
  });

  const pulseScale =
    frame > 40
      ? 1 +
        0.03 *
          Math.sin(((frame - 40) / 60) * Math.PI * 2)
      : scaleSp;

  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <SceneBase>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "2px solid rgba(255,255,255,0.6)",
            borderRadius: 999,
            padding: "20px 52px",
            boxShadow:
              "0 0 40px rgba(255,255,255,0.4), 0 0 80px rgba(255,255,255,0.15)",
            fontSize: 36,
            fontWeight: 700,
            color: WHITE,
            transform: `scale(${frame <= 40 ? scaleSp : pulseScale})`,
            opacity,
          }}
        >
          Und das...
        </div>
      </div>
    </SceneBase>
  );
};

// ─── Scene 7: iPhone Demo ─────────────────────────────────────────────────────
const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneSp = spring({
    frame,
    fps,
    config: { stiffness: 110, damping: 16 },
    from: 0,
    to: 1,
  });
  const phoneY = interpolate(phoneSp, [0, 1], [400, 0]);
  const tagSp = useSpring(frame, fps, 40);

  return (
    <SceneBase>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            transform: `translateY(${phoneY}px) perspective(1200px) rotateY(-8deg) rotateX(4deg)`,
            opacity: phoneSp,
          }}
        >
          {/* iPhone outer frame */}
          <div
            style={{
              width: 380,
              height: 760,
              background: "#1a1a1a",
              borderRadius: 52,
              boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 3px #333",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Dynamic island */}
            <div
              style={{
                width: 120,
                height: 32,
                background: "#111",
                borderRadius: 20,
                marginTop: 16,
                flexShrink: 0,
              }}
            />

            {/* Screen content */}
            <div
              style={{
                flex: 1,
                width: "100%",
                background: WHITE,
                padding: "16px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                overflow: "hidden",
              }}
            >
              {/* URL bar */}
              <div
                style={{
                  background: "#f0f0f0",
                  borderRadius: 8,
                  padding: "8px 12px",
                  fontSize: 13,
                  color: "#666",
                  textAlign: "center",
                }}
              >
                arabicroots.de
              </div>

              {/* Logo */}
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: RED,
                  textAlign: "center",
                  letterSpacing: -1,
                }}
              >
                ARABICROOTS
              </div>

              {/* Headline */}
              <div
                style={{
                  fontSize: 16,
                  color: "#1a1a1a",
                  fontWeight: 600,
                  textAlign: "center",
                  lineHeight: 1.4,
                }}
              >
                Arabisch lernen mit echtem Fortschritt.
              </div>

              {/* CTA button */}
              <div
                style={{
                  background: RED,
                  borderRadius: 10,
                  padding: "14px 20px",
                  color: WHITE,
                  fontSize: 16,
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                ▶ Jetzt anmelden
              </div>

              {/* Outline button */}
              <div
                style={{
                  border: `2px solid ${RED}`,
                  borderRadius: 10,
                  padding: "12px 20px",
                  color: RED,
                  fontSize: 15,
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                Kostenlose Beratung →
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{ position: "absolute", top: 80, right: 80, opacity: tagSp }}
      >
        <InfoTag>▶ arabicroots.de</InfoTag>
      </div>
    </SceneBase>
  );
};

// ─── Scene 8: Proof Bridge ────────────────────────────────────────────────────
const Scene8: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 8, 20], [0, 1, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <SceneBase>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.18) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.12)",
            border: "2px solid rgba(255,255,255,0.8)",
            borderRadius: 999,
            padding: "20px 52px",
            boxShadow:
              "0 0 25px #fff, 0 0 50px rgba(255,255,255,0.3), inset 0 0 20px rgba(255,255,255,0.08)",
            fontSize: 40,
            fontWeight: 700,
            color: WHITE,
            opacity,
          }}
        >
          und über...
        </div>
      </div>
    </SceneBase>
  );
};

// ─── Scene 9: Testimonial ─────────────────────────────────────────────────────
const Scene9: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pillSp = useSpring(frame, fps, 0);
  const h1Sp = useSpring(frame, fps, 10);
  const h2Sp = useSpring(frame, fps, 18);
  const h3Sp = useSpring(frame, fps, 26);
  const cardSp = useSpring(frame, fps, 40);

  return (
    <SceneBase>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          gap: 20,
        }}
      >
        <div style={{ opacity: pillSp }}>
          <Pill>Unsere Schüler</Pill>
        </div>

        {[
          { text: "BEWERTUNG", sp: h1Sp, style: {} },
          { text: "SPRICHT", sp: h2Sp, style: { fontStyle: "italic" as const } },
          { text: "FÜR SICH!", sp: h3Sp, style: {} },
        ].map(({ text, sp, style }) => (
          <div key={text} style={{ overflow: "hidden" }}>
            <div
              style={{
                fontSize: 96,
                fontWeight: 900,
                color: WHITE,
                transform: `translateY(${interpolate(sp, [0, 1], [50, 0])}px)`,
                opacity: sp,
                lineHeight: 1,
                ...style,
              }}
            >
              {text}
            </div>
          </div>
        ))}

        {/* Testimonial card */}
        <div
          style={{
            transform: `translateY(${interpolate(cardSp, [0, 1], [60, 0])}px)`,
            opacity: cardSp,
            width: "100%",
          }}
        >
          <div
            style={{
              background: "rgba(0,0,0,0.25)",
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.2)",
              padding: 32,
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 12 }}>⭐⭐⭐⭐⭐</div>
            <div
              style={{
                fontSize: 26,
                fontStyle: "italic",
                color: WHITE,
                lineHeight: 1.5,
                marginBottom: 16,
              }}
            >
              &ldquo;Ich habe in wenigen Wochen mehr gelernt als in Monaten
              zuvor. Klarer Aufbau, direkte Anwendung &ndash; genau das hat mir
              gefehlt.&rdquo;
            </div>
            <div style={{ fontSize: 22, color: WHITE, opacity: 0.7 }}>
              — S.M, Level 2
            </div>
          </div>
        </div>
      </div>
    </SceneBase>
  );
};

// ─── Scene 10: Stats ──────────────────────────────────────────────────────────
const Scene10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const counterVal = Math.floor(
    interpolate(frame, [0, 60], [0, 6], { extrapolateRight: "clamp" })
  );

  const headlineSp = useSpring(frame, fps, 0);

  const badges = ["6 KURSE ↑", "4–8 SCHÜLER ↑", "100% LIVE ↑"];

  return (
    <SceneBase>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Counter */}
        <div
          style={{
            textAlign: "center",
            opacity: headlineSp,
            transform: `translateY(${interpolate(headlineSp, [0, 1], [40, 0])}px)`,
          }}
        >
          <div
            style={{ fontSize: 108, fontWeight: 900, color: WHITE, lineHeight: 1 }}
          >
            {counterVal} KURSE.
          </div>
          <div style={{ fontSize: 40, color: WHITE, opacity: 0.8 }}>
            100% LIVE
          </div>
        </div>

        {/* Stat badges */}
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
          {badges.map((badge, i) => {
            const sp = spring({
              frame: frame - i * 15,
              fps,
              config: { stiffness: 120, damping: 14 },
              from: 0,
              to: 1,
            });
            return (
              <div
                key={badge}
                style={{
                  background: WHITE,
                  borderRadius: 999,
                  padding: "16px 28px",
                  color: RED,
                  fontWeight: 700,
                  fontSize: 26,
                  transform: `translateY(${interpolate(sp, [0, 1], [60, 0])}px)`,
                  opacity: sp,
                }}
              >
                {badge}
              </div>
            );
          })}
        </div>
      </div>
    </SceneBase>
  );
};

// ─── Scene 11: 3 Pillars ──────────────────────────────────────────────────────
const Scene11: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineSp = useSpring(frame, fps, 0);
  const tagSp = useSpring(frame, fps, 10);

  const cards = [
    { symbol: "ا", label: "KLARER LERNWEG" },
    { symbol: "▶", label: "LIVE-SESSIONS" },
    { symbol: "◉", label: "AUF DEUTSCH ERKLÄRT" },
  ];

  return (
    <SceneBase>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px",
          gap: 40,
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: WHITE,
              transform: `translateY(${interpolate(headlineSp, [0, 1], [50, 0])}px)`,
              opacity: headlineSp,
            }}
          >
            3 DINGE
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, width: "100%" }}>
          {cards.map((card, i) => {
            const sp = spring({
              frame: frame - i * 20,
              fps,
              config: { stiffness: 120, damping: 14 },
              from: 0.85,
              to: 1,
            });
            const opSp = spring({
              frame: frame - i * 20,
              fps,
              config: { stiffness: 120, damping: 14 },
              from: 0,
              to: 1,
            });
            return (
              <div
                key={card.label}
                style={{
                  flex: 1,
                  height: 280,
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                  transform: `scale(${sp})`,
                  opacity: opSp,
                }}
              >
                <div style={{ fontSize: 56, color: WHITE, lineHeight: 1 }}>
                  {card.symbol}
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: WHITE,
                    textAlign: "center",
                    padding: "0 12px",
                  }}
                >
                  {card.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{ position: "absolute", top: 80, right: 80, opacity: tagSp }}
      >
        <InfoTag>▶ arabicroots.de</InfoTag>
      </div>
    </SceneBase>
  );
};

// ─── Scene 12: CTA ────────────────────────────────────────────────────────────
const Scene12: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const counterVal = Math.floor(
    interpolate(frame, [0, 45], [0, 6], { extrapolateRight: "clamp" })
  );

  const ctaSp = spring({
    frame: frame - 30,
    fps,
    config: { stiffness: 110, damping: 16 },
    from: 0,
    to: 1,
  });
  const ctaY = interpolate(ctaSp, [0, 1], [150, 0]);

  const headlineSp = useSpring(frame, fps, 0);
  const urlSp = useSpring(frame, fps, 50);

  return (
    <SceneBase>
      {/* 3D perspective grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, transparent 1px, transparent 79px, rgba(255,255,255,0.06) 80px), repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0px, transparent 1px, transparent 79px, rgba(255,255,255,0.06) 80px)",
          transform: "perspective(800px) rotateX(45deg)",
          transformOrigin: "bottom center",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 32,
        }}
      >
        {/* Counter */}
        <div
          style={{
            textAlign: "center",
            opacity: headlineSp,
            transform: `translateY(${interpolate(headlineSp, [0, 1], [40, 0])}px)`,
          }}
        >
          <div
            style={{ fontSize: 140, fontWeight: 900, color: WHITE, lineHeight: 1 }}
          >
            {counterVal}
          </div>
          <div style={{ fontSize: 52, color: WHITE, opacity: 0.7 }}>LEVEL</div>
        </div>

        {/* CTA Card */}
        <div
          style={{
            background: WHITE,
            borderRadius: 20,
            padding: "36px 80px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            transform: `translateY(${ctaY}px)`,
            opacity: ctaSp,
          }}
        >
          <div
            style={{ fontSize: 44, fontWeight: 900, color: RED, whiteSpace: "nowrap" }}
          >
            ▶ Jetzt anmelden
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: 30,
            color: WHITE,
            opacity: urlSp * 0.8,
            letterSpacing: 2,
          }}
        >
          arabicroots.de
        </div>
      </div>
    </SceneBase>
  );
};

// ─── Root Export ──────────────────────────────────────────────────────────────
export const ArabicRootsVideo: React.FC = () => (
  <AbsoluteFill style={{ background: RED, fontFamily: FONT }}>
    <Sequence from={0} durationInFrames={150}>
      <FadeIn>
        <Scene1 />
      </FadeIn>
    </Sequence>
    <Sequence from={150} durationInFrames={150}>
      <FadeIn>
        <Scene2 />
      </FadeIn>
    </Sequence>
    <Sequence from={300} durationInFrames={150}>
      <FadeIn>
        <Scene3 />
      </FadeIn>
    </Sequence>
    <Sequence from={450} durationInFrames={150}>
      <FadeIn>
        <Scene4 />
      </FadeIn>
    </Sequence>
    <Sequence from={600} durationInFrames={150}>
      <FadeIn>
        <Scene5 />
      </FadeIn>
    </Sequence>
    <Sequence from={750} durationInFrames={150}>
      <FadeIn>
        <Scene6 />
      </FadeIn>
    </Sequence>
    <Sequence from={900} durationInFrames={150}>
      <FadeIn>
        <Scene7 />
      </FadeIn>
    </Sequence>
    <Sequence from={1050} durationInFrames={150}>
      <FadeIn>
        <Scene8 />
      </FadeIn>
    </Sequence>
    <Sequence from={1200} durationInFrames={150}>
      <FadeIn>
        <Scene9 />
      </FadeIn>
    </Sequence>
    <Sequence from={1350} durationInFrames={150}>
      <FadeIn>
        <Scene10 />
      </FadeIn>
    </Sequence>
    <Sequence from={1500} durationInFrames={150}>
      <FadeIn>
        <Scene11 />
      </FadeIn>
    </Sequence>
    <Sequence from={1650} durationInFrames={150}>
      <FadeIn>
        <Scene12 />
      </FadeIn>
    </Sequence>

    <DarkFlash triggerFrame={150} />
    <DarkFlash triggerFrame={300} />
    <DarkFlash triggerFrame={450} />
    <DarkFlash triggerFrame={600} />
    <DarkFlash triggerFrame={750} />
    <DarkFlash triggerFrame={900} />
    <DarkFlash triggerFrame={1050} />
    <DarkFlash triggerFrame={1200} />
    <DarkFlash triggerFrame={1350} />
    <DarkFlash triggerFrame={1500} />
    <DarkFlash triggerFrame={1650} />
  </AbsoluteFill>
);
