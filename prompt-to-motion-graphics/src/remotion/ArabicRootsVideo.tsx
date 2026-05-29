import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

const FONT = "'Inter', 'Helvetica Neue', Arial, sans-serif";
const RED = "#970000";
const BRIGHT_RED = "#B91C1C";
const BG = "#FFFFFF";           // website white
const TEXT = "#0f1729";         // website dark navy
const WHITE = "#FFFFFF";
const MUTED = "#6b7280";        // medium grey on white bg
const PAD = 80;

// ── FadeIn wrapper: opacity 0→1 over first N frames of local timeline ──────────
const FadeIn: React.FC<{ children: React.ReactNode; duration?: number }> = ({
  children,
  duration = 18,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, duration], [0, 1], {
    extrapolateRight: "clamp",
  });
  return <div style={{ opacity, width: "100%", height: "100%" }}>{children}</div>;
};

// ── Spring slide-up + fade helper ─────────────────────────────────────────────
function useSlideIn(
  frame: number,
  fps: number,
  delay = 0
): React.CSSProperties {
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 120, mass: 1 },
    durationInFrames: 40,
  });
  const translateY = interpolate(s, [0, 1], [60, 0]);
  const opacity = interpolate(s, [0, 1], [0, 1]);
  return { transform: `translateY(${translateY}px)`, opacity };
}

// ── Dark flash overlay for scene transitions ───────────────────────────────────
const DarkFlash: React.FC<{ triggerFrame: number }> = ({ triggerFrame }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - triggerFrame;
  if (localFrame < 0 || localFrame > 18) return null;
  const opacity = interpolate(localFrame, [0, 9, 18], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#000",
        opacity,
        zIndex: 100,
        pointerEvents: "none",
      }}
    />
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCENE 1 – Hook (frames 0–120)
// ══════════════════════════════════════════════════════════════════════════════
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const line1 = useSlideIn(frame, fps, 10);
  const line2 = useSlideIn(frame, fps, 35);
  const accent = useSlideIn(frame, fps, 0);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: `0 ${PAD}px`,
      }}
    >
      <FadeIn>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
          {/* Decorative accent line */}
          <div
            style={{
              ...accent,
              width: 60,
              height: 4,
              backgroundColor: RED,
              marginBottom: 48,
            }}
          />
          <div style={line1}>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 110,
                fontWeight: 900,
                color: TEXT,
                margin: 0,
                lineHeight: 1.1,
                letterSpacing: "-2px",
              }}
            >
              Du willst
              <br />
              Arabisch lernen.
            </p>
          </div>
          <div style={{ ...line2, marginTop: 48 }}>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 80,
                fontWeight: 400,
                color: MUTED,
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              Aber es fehlt
              <br />
              ein klarer Weg.
            </p>
          </div>
        </div>
      </FadeIn>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCENE 2 – Brand Reveal (frames 120–240)
// ══════════════════════════════════════════════════════════════════════════════
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const badgeSlide = useSlideIn(frame, fps, 5);
  const logoSlide = useSlideIn(frame, fps, 20);
  const subSlide = useSlideIn(frame, fps, 38);
  const dividerOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: `0 ${PAD}px`,
      }}
    >
      <FadeIn>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
          {/* Badge */}
          <div style={{ ...badgeSlide, marginBottom: 32 }}>
            <span
              style={{
                fontFamily: FONT,
                fontSize: 26,
                fontWeight: 600,
                color: WHITE,
                backgroundColor: RED,
                padding: "10px 20px",
                borderRadius: 4,
                letterSpacing: "0.5px",
              }}
            >
              Live, online &amp; strukturiert lernen
            </span>
          </div>

          {/* Logo */}
          <div style={logoSlide}>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 118,
                fontWeight: 900,
                color: TEXT,
                margin: 0,
                letterSpacing: "-3px",
                lineHeight: 1,
                textTransform: "uppercase",
              }}
            >
              ARABIC<span style={{ color: RED }}>ROOTS</span>
            </p>
          </div>

          {/* Red divider */}
          <div
            style={{
              width: "100%",
              height: 3,
              backgroundColor: RED,
              margin: "32px 0",
              opacity: dividerOpacity,
            }}
          />

          {/* Headline */}
          <div style={subSlide}>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 65,
                fontWeight: 700,
                color: TEXT,
                margin: 0,
                lineHeight: 1.25,
              }}
            >
              Arabisch lernen mit
              <br />
              echtem Fortschritt.
            </p>
          </div>
        </div>
      </FadeIn>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCENE 3 – Live Feature (frames 240–360)
// ══════════════════════════════════════════════════════════════════════════════
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sectionSlide = useSlideIn(frame, fps, 5);
  const liveTagSlide = useSlideIn(frame, fps, 18);
  const headSlide = useSlideIn(frame, fps, 30);
  const subSlide = useSlideIn(frame, fps, 44);
  const statsSlide = useSlideIn(frame, fps, 58);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: RED,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: `0 ${PAD}px`,
      }}
    >
      <FadeIn>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
          {/* Section label */}
          <div style={{ ...sectionSlide, marginBottom: 24 }}>
            <span
              style={{
                fontFamily: FONT,
                fontSize: 22,
                fontWeight: 700,
                color: "rgba(255,255,255,0.75)",
                letterSpacing: "4px",
                textTransform: "uppercase",
              }}
            >
              Mehr als nur Unterricht
            </span>
          </div>

          {/* Live tag */}
          <div style={{ ...liveTagSlide, marginBottom: 36 }}>
            <span
              style={{
                fontFamily: FONT,
                fontSize: 20,
                fontWeight: 700,
                color: RED,
                backgroundColor: WHITE,
                padding: "8px 18px",
                borderRadius: 4,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              ● LIVE-INTERAKTION
            </span>
          </div>

          {/* Main headline */}
          <div style={{ ...headSlide, marginBottom: 28 }}>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 100,
                fontWeight: 900,
                color: WHITE,
                margin: 0,
                lineHeight: 1.1,
                letterSpacing: "-2px",
              }}
            >
              Echte
              <br />
              Live-Sessions.
            </p>
          </div>

          {/* Sub headline */}
          <div style={{ ...subSlide, marginBottom: 36 }}>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 44,
                fontWeight: 400,
                color: "rgba(255,255,255,0.85)",
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              Ein Lernsystem, das dich
              <br />
              wirklich voranbringt.
            </p>
          </div>

          {/* Divider */}
          <div style={{ width: 80, height: 4, backgroundColor: WHITE, opacity: 0.5, marginBottom: 32 }} />

          {/* Stats */}
          <div style={statsSlide}>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 36,
                fontWeight: 600,
                color: WHITE,
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              4–8 Schüler · auf Deutsch · in kleinen Gruppen
            </p>
          </div>
        </div>
      </FadeIn>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCENE 4 – 6 Kurse (frames 360–480)
// ══════════════════════════════════════════════════════════════════════════════
const COURSES: Array<{ name: string; detail: string }> = [
  { name: "Buchstabenkurs", detail: "Level 1 · 20 Wochen · 50 Live-Sessions · 4–8 Schüler" },
  { name: "Grundlagenkurs", detail: "Level 2 · 35 Wochen · 70 Live-Sessions" },
  { name: "Aufbaukurs", detail: "Level 3 · 35 Wochen · 70 Live-Sessions" },
  { name: "Fortgeschrittenenkurs", detail: "Level 4 · 35 Wochen · 70 Live-Sessions" },
  { name: "Expertenkurs", detail: "Level 5 · 35 Wochen · 70 Live-Sessions" },
  { name: "Meisterstufe", detail: "Level 6 · 50 Wochen · 100 Live-Sessions" },
];

const CourseRow: React.FC<{ course: (typeof COURSES)[0]; index: number }> = ({
  course,
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = 22 + index * 12;
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 120, mass: 1 },
    durationInFrames: 35,
  });
  const translateY = interpolate(s, [0, 1], [40, 0]);
  const opacity = interpolate(s, [0, 1], [0, 1]);

  return (
    <div
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 16,
        marginBottom: 20,
      }}
    >
      <span
        style={{
          fontFamily: FONT,
          fontSize: 15,
          fontWeight: 700,
          color: WHITE,
          backgroundColor: RED,
          padding: "5px 12px",
          borderRadius: 3,
          whiteSpace: "nowrap" as const,
          minWidth: 40,
          textAlign: "center" as const,
        }}
      >
        L{index + 1}
      </span>
      <div>
        <span
          style={{
            fontFamily: FONT,
            fontSize: 34,
            fontWeight: 700,
            color: TEXT,
            display: "block",
            lineHeight: 1.2,
          }}
        >
          {course.name}
        </span>
        <span
          style={{
            fontFamily: FONT,
            fontSize: 22,
            fontWeight: 400,
            color: MUTED,
          }}
        >
          {course.detail}
        </span>
      </div>
    </div>
  );
};

const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headSlide = useSlideIn(frame, fps, 5);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: `0 ${PAD}px`,
      }}
    >
      <FadeIn>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
          {/* Headline */}
          <div style={{ ...headSlide, marginBottom: 48 }}>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 92,
                fontWeight: 900,
                color: TEXT,
                margin: 0,
                lineHeight: 1.1,
                letterSpacing: "-2px",
              }}
            >
              6 Kurse.
              <br />
              <span style={{ color: RED }}>Ein klarer Weg.</span>
            </p>
          </div>

          {/* Course list */}
          {COURSES.map((course, i) => (
            <CourseRow key={course.name} course={course} index={i} />
          ))}
        </div>
      </FadeIn>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCENE 5 – Qur'an / Vision (frames 480–555)
// ══════════════════════════════════════════════════════════════════════════════
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headSlide = useSlideIn(frame, fps, 5);
  const taglineSlide = useSlideIn(frame, fps, 28);
  const quoteSlide = useSlideIn(frame, fps, 44);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRIGHT_RED,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: `0 ${PAD}px`,
      }}
    >
      <FadeIn>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
          {/* Main headline */}
          <div style={{ ...headSlide, marginBottom: 36 }}>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 90,
                fontWeight: 900,
                color: WHITE,
                margin: 0,
                lineHeight: 1.1,
                letterSpacing: "-2px",
              }}
            >
              Lerne den Qur'an
              <br />
              in seiner eigenen
              <br />
              Sprache.
            </p>
          </div>

          {/* Divider */}
          <div style={{ width: 60, height: 3, backgroundColor: WHITE, opacity: 0.7, marginBottom: 32 }} />

          {/* Tagline */}
          <div style={{ ...taglineSlide, marginBottom: 40 }}>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 34,
                fontWeight: 400,
                color: "rgba(255,255,255,0.85)",
                margin: 0,
                lineHeight: 1.5,
                maxWidth: 920,
              }}
            >
              Arabisch verständlich, strukturiert und auf Deutsch zu vermitteln —
              ohne Chaos, ohne Überforderung.
            </p>
          </div>

          {/* Testimonial */}
          <div
            style={{
              ...quoteSlide,
              backgroundColor: "rgba(0,0,0,0.18)",
              borderRadius: 8,
              padding: "32px 36px",
              borderLeft: `5px solid ${WHITE}`,
            }}
          >
            <p
              style={{
                fontFamily: FONT,
                fontSize: 28,
                fontWeight: 400,
                color: WHITE,
                margin: "0 0 10px",
              }}
            >
              ⭐⭐⭐⭐⭐
            </p>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 34,
                fontWeight: 600,
                color: WHITE,
                margin: "0 0 14px",
                lineHeight: 1.4,
                fontStyle: "italic",
              }}
            >
              "Ich habe in wenigen Wochen mehr gelernt als in Monaten zuvor."
            </p>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 26,
                fontWeight: 400,
                color: "rgba(255,255,255,0.7)",
                margin: 0,
              }}
            >
              — S.M, Level 2
            </p>
          </div>
        </div>
      </FadeIn>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCENE 6 – CTA (frames 555–600)
// ══════════════════════════════════════════════════════════════════════════════
const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoSlide = useSlideIn(frame, fps, 5);
  const subSlide = useSlideIn(frame, fps, 18);
  const ctaSlide = useSlideIn(frame, fps, 30);
  const urlSlide = useSlideIn(frame, fps, 42);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: `0 ${PAD}px`,
      }}
    >
      <FadeIn>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
          {/* Logo */}
          <div style={logoSlide}>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 116,
                fontWeight: 900,
                color: TEXT,
                margin: 0,
                letterSpacing: "-3px",
                lineHeight: 1,
                textTransform: "uppercase" as const,
              }}
            >
              ARABIC<span style={{ color: RED }}>ROOTS</span>
            </p>
          </div>

          {/* Sub tagline */}
          <div style={{ ...subSlide, marginTop: 16, marginBottom: 56 }}>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 36,
                fontWeight: 400,
                color: MUTED,
                margin: 0,
              }}
            >
              Arabisch lernen — und endlich verstehen
            </p>
          </div>

          {/* Primary CTA */}
          <div style={{ ...ctaSlide, marginBottom: 28 }}>
            <div
              style={{
                display: "inline-block",
                backgroundColor: RED,
                padding: "32px 64px",
                borderRadius: 8,
              }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 44,
                  fontWeight: 800,
                  color: WHITE,
                  letterSpacing: "0.5px",
                }}
              >
                ▶ Jetzt anmelden
              </span>
            </div>
          </div>

          {/* Secondary CTA */}
          <div style={{ ...ctaSlide, marginBottom: 56 }}>
            <span
              style={{
                fontFamily: FONT,
                fontSize: 32,
                fontWeight: 600,
                color: MUTED,
                borderBottom: `1px solid ${MUTED}`,
                paddingBottom: 2,
              }}
            >
              Kostenlose Beratung
            </span>
          </div>

          {/* URL & social */}
          <div style={urlSlide}>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 36,
                fontWeight: 700,
                color: RED,
                margin: "0 0 8px",
                letterSpacing: "1px",
              }}
            >
              arabicroots.de
            </p>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 28,
                fontWeight: 400,
                color: MUTED,
                margin: 0,
              }}
            >
              @arabic.roots
            </p>
          </div>
        </div>
      </FadeIn>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// ROOT COMPOSITION
// ══════════════════════════════════════════════════════════════════════════════
export const ArabicRootsVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily: FONT }}>
      {/* Scene 1: Hook */}
      <Sequence from={0} durationInFrames={120}>
        <Scene1 />
      </Sequence>

      {/* Scene 2: Brand Reveal */}
      <Sequence from={120} durationInFrames={120}>
        <Scene2 />
      </Sequence>

      {/* Scene 3: Live Feature */}
      <Sequence from={240} durationInFrames={120}>
        <Scene3 />
      </Sequence>

      {/* Dark flash between Scene 3 and 4 */}
      <DarkFlash triggerFrame={360} />

      {/* Scene 4: 6 Kurse */}
      <Sequence from={360} durationInFrames={120}>
        <Scene4 />
      </Sequence>

      {/* Dark flash between Scene 4 and 5 */}
      <DarkFlash triggerFrame={480} />

      {/* Scene 5: Qur'an / Vision */}
      <Sequence from={480} durationInFrames={120}>
        <Scene5 />
      </Sequence>

      {/* Scene 6: CTA */}
      <Sequence from={600} durationInFrames={120}>
        <Scene6 />
      </Sequence>
    </AbsoluteFill>
  );
};
