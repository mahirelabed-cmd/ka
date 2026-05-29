import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

const RED = "#970000";
const WHITE = "#FFFFFF";
const CREAM = "#FFF8F0";
const DARK_RED = "#5a0000";

// ── helpers ─────────────────────────────────────────────────────────────────

const useFade = (start: number, duration = 20) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

const useSlideUp = (start: number, delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - start - delay, fps, config: { damping: 14, stiffness: 80 } });
  return interpolate(progress, [0, 1], [60, 0]);
};

// ── decorative Arabic pattern background ─────────────────────────────────────

const PatternBg: React.FC<{ opacity?: number }> = ({ opacity = 0.07 }) => (
  <svg
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity }}
    xmlns="http://www.w3.org/2000/svg"
  >
    {Array.from({ length: 8 }).map((_, row) =>
      Array.from({ length: 5 }).map((_, col) => (
        <g key={`${row}-${col}`} transform={`translate(${col * 220 - 20},${row * 240 - 20})`}>
          <polygon
            points="110,0 220,55 220,165 110,220 0,165 0,55"
            fill="none"
            stroke={WHITE}
            strokeWidth="1.5"
          />
          <polygon
            points="110,30 190,72 190,155 110,197 30,155 30,72"
            fill="none"
            stroke={WHITE}
            strokeWidth="0.8"
          />
        </g>
      ))
    )}
  </svg>
);

// ── Arabic calligraphy SVG logo mark ─────────────────────────────────────────

const LogoMark: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = RED }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" fill={color} />
    <text
      x="50"
      y="65"
      textAnchor="middle"
      fontSize="42"
      fill={WHITE}
      fontFamily="serif"
      fontWeight="bold"
    >
      ع
    </text>
  </svg>
);

// ── phone mockup ──────────────────────────────────────────────────────────────

const Phone: React.FC<{ children: React.ReactNode; scale?: number }> = ({ children, scale = 1 }) => (
  <div
    style={{
      transform: `scale(${scale})`,
      width: 280,
      height: 560,
      borderRadius: 40,
      background: "#1a1a1a",
      boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 2px #444",
      overflow: "hidden",
      position: "relative",
      flexShrink: 0,
    }}
  >
    {/* notch */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: 100,
        height: 28,
        background: "#1a1a1a",
        borderRadius: "0 0 20px 20px",
        zIndex: 10,
      }}
    />
    <div style={{ width: "100%", height: "100%", borderRadius: 40, overflow: "hidden" }}>
      {children}
    </div>
  </div>
);

// ── course card ───────────────────────────────────────────────────────────────

const CourseCard: React.FC<{ title: string; level: string; progress: number; delay: number }> = ({
  title,
  level,
  progress,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const slideIn = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 80 } });
  const barWidth = spring({ frame: frame - delay - 10, fps, config: { damping: 16, stiffness: 50 } });

  return (
    <div
      style={{
        transform: `translateX(${interpolate(slideIn, [0, 1], [120, 0])}px)`,
        background: WHITE,
        borderRadius: 16,
        padding: "14px 16px",
        marginBottom: 10,
        boxShadow: "0 4px 12px rgba(151,0,0,0.12)",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#222" }}>{title}</span>
        <span
          style={{
            fontSize: 10,
            background: RED,
            color: WHITE,
            borderRadius: 20,
            padding: "2px 8px",
          }}
        >
          {level}
        </span>
      </div>
      <div style={{ height: 6, background: "#f0e0e0", borderRadius: 3, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${interpolate(barWidth, [0, 1], [0, progress])}%`,
            background: `linear-gradient(90deg, ${RED}, #cc3333)`,
            borderRadius: 3,
          }}
        />
      </div>
      <span style={{ fontSize: 10, color: "#888" }}>{progress}% abgeschlossen</span>
    </div>
  );
};

// ── Scene 1 – Problem / Hook ──────────────────────────────────────────────────

const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const line1Y = useSlideUp(10);
  const line1O = useFade(10);
  const line2Y = useSlideUp(25);
  const line2O = useFade(25);
  const line3Y = useSlideUp(45);
  const line3O = useFade(45);
  const accentScale = spring({ frame: frame - 55, fps, config: { damping: 10, stiffness: 60 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, ${DARK_RED} 0%, ${RED} 60%, #c02020 100%)` }}>
      <PatternBg opacity={0.06} />
      <AbsoluteFill style={{ opacity: bgOpacity, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 80px" }}>
        {/* question mark */}
        <div style={{
          fontSize: 120,
          opacity: interpolate(accentScale, [0, 1], [0, 0.15]),
          transform: `scale(${accentScale})`,
          marginBottom: -30,
          color: WHITE,
          fontWeight: 900,
        }}>
          ؟
        </div>

        <p style={{ opacity: line1O, transform: `translateY(${line1Y}px)`, fontSize: 52, fontWeight: 900, color: WHITE, textAlign: "center", margin: "0 0 16px", lineHeight: 1.2 }}>
          Arabisch<br />lernen?
        </p>
        <p style={{ opacity: line2O, transform: `translateY(${line2Y}px)`, fontSize: 34, color: "rgba(255,255,255,0.85)", textAlign: "center", margin: "0 0 24px", fontWeight: 400 }}>
          Zu kompliziert.<br />Kein System. Keine Struktur.
        </p>
        <div style={{
          opacity: line3O,
          transform: `translateY(${line3Y}px)`,
          width: 80,
          height: 4,
          background: WHITE,
          borderRadius: 2,
          marginTop: 8,
        }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Scene 2 – Brand Reveal ────────────────────────────────────────────────────

const SceneBrandReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 50 } });
  const logoO = useFade(10, 15);
  const lineO = useFade(35, 20);
  const lineScale = spring({ frame: frame - 35, fps, config: { damping: 14, stiffness: 70 } });
  const taglineO = useFade(55, 20);
  const taglineY = useSlideUp(55);
  const subO = useFade(75, 20);
  const subY = useSlideUp(75);

  return (
    <AbsoluteFill style={{ background: WHITE }}>
      {/* red top half */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "52%",
        background: `linear-gradient(160deg, ${DARK_RED}, ${RED})`,
        borderRadius: "0 0 60px 60px",
      }}>
        <PatternBg opacity={0.08} />
      </div>

      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0 }}>
        {/* Logo circle */}
        <div style={{
          opacity: logoO,
          transform: `scale(${logoScale})`,
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: WHITE,
          boxShadow: "0 20px 60px rgba(151,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 32,
        }}>
          <LogoMark size={120} color={RED} />
        </div>

        {/* Brand name */}
        <div style={{
          opacity: lineO,
          transform: `scale(${lineScale})`,
          fontSize: 64,
          fontWeight: 900,
          color: RED,
          letterSpacing: -1,
          marginBottom: 4,
        }}>
          ARABICROOTS
        </div>

        {/* divider */}
        <div style={{
          opacity: lineO,
          width: interpolate(lineScale, [0, 1], [0, 200]),
          height: 3,
          background: RED,
          borderRadius: 2,
          margin: "16px 0",
        }} />

        {/* tagline */}
        <p style={{
          opacity: taglineO,
          transform: `translateY(${taglineY}px)`,
          fontSize: 36,
          color: "#444",
          textAlign: "center",
          margin: "0 0 8px",
          fontWeight: 600,
        }}>
          Arabisch lernen
        </p>
        <p style={{
          opacity: subO,
          transform: `translateY(${subY}px)`,
          fontSize: 36,
          color: RED,
          fontWeight: 800,
          margin: 0,
        }}>
          leicht gemacht.
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Scene 3 – Kurse Overview ──────────────────────────────────────────────────

const SceneCourses: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleO = useFade(5, 20);
  const titleY = useSlideUp(5);
  const phoneScale = spring({ frame: frame - 15, fps, config: { damping: 14, stiffness: 55 } });

  return (
    <AbsoluteFill style={{ background: CREAM }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 360, background: `linear-gradient(160deg, ${DARK_RED}, ${RED})`, borderRadius: "0 0 50px 50px" }}>
        <PatternBg opacity={0.07} />
      </div>

      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 40px 0" }}>
        <div style={{ opacity: titleO, transform: `translateY(${titleY}px)`, textAlign: "center", marginBottom: 40, zIndex: 1 }}>
          <p style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", margin: "0 0 6px", letterSpacing: 3, textTransform: "uppercase" }}>Feature 1</p>
          <p style={{ fontSize: 52, fontWeight: 900, color: WHITE, margin: 0 }}>Strukturierte Kurse</p>
        </div>

        <div style={{ transform: `scale(${phoneScale})`, zIndex: 2 }}>
          <Phone>
            <div style={{ background: `linear-gradient(180deg, ${RED} 0%, #c02020 30%, CREAM 30%)`, height: "100%", padding: "40px 16px 16px" }}>
              <p style={{ color: WHITE, fontSize: 11, fontWeight: 700, letterSpacing: 2, margin: "0 0 6px" }}>ARABICROOTS</p>
              <p style={{ color: WHITE, fontSize: 18, fontWeight: 800, margin: "0 0 20px" }}>Meine Kurse</p>
              <CourseCard title="Arabisch Grundkurs" level="Anfänger" progress={75} delay={20} />
              <CourseCard title="Arabische Schrift" level="Grundlagen" progress={45} delay={30} />
              <CourseCard title="Alltags-Arabisch" level="Mittelstufe" progress={20} delay={40} />
            </div>
          </Phone>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Scene 4 – Vocabulary / Lernen ────────────────────────────────────────────

const FlashCard: React.FC<{ arabic: string; german: string; delay: number; flipped?: boolean }> = ({ arabic, german, delay, flipped = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 70 } });

  return (
    <div style={{
      transform: `translateY(${interpolate(appear, [0, 1], [80, 0])}px)`,
      opacity: appear,
      background: flipped ? RED : WHITE,
      borderRadius: 20,
      padding: "20px 24px",
      marginBottom: 12,
      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <span style={{ fontSize: 32, color: flipped ? WHITE : RED, fontWeight: 900, marginBottom: 4, direction: "rtl" }}>{arabic}</span>
      <span style={{ fontSize: 14, color: flipped ? "rgba(255,255,255,0.9)" : "#555", fontWeight: 500 }}>{german}</span>
    </div>
  );
};

const SceneVocab: React.FC = () => {
  const frame = useCurrentFrame();

  const titleO = useFade(5, 20);
  const titleY = useSlideUp(5);
  const { fps } = useVideoConfig();
  const phoneScale = spring({ frame: frame - 15, fps, config: { damping: 14, stiffness: 55 } });

  return (
    <AbsoluteFill style={{ background: CREAM }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 360, background: `linear-gradient(160deg, ${RED}, #cc2222)`, borderRadius: "0 0 50px 50px" }}>
        <PatternBg opacity={0.07} />
      </div>

      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 40px 0" }}>
        <div style={{ opacity: titleO, transform: `translateY(${titleY}px)`, textAlign: "center", marginBottom: 40, zIndex: 1 }}>
          <p style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", margin: "0 0 6px", letterSpacing: 3, textTransform: "uppercase" }}>Feature 2</p>
          <p style={{ fontSize: 52, fontWeight: 900, color: WHITE, margin: 0 }}>Vokabeln lernen</p>
        </div>

        <div style={{ transform: `scale(${phoneScale})`, zIndex: 2 }}>
          <Phone>
            <div style={{ background: "#f8f0f0", height: "100%", padding: "40px 16px 16px" }}>
              <p style={{ color: RED, fontSize: 13, fontWeight: 800, letterSpacing: 1, margin: "0 0 16px", textAlign: "center" }}>Lektion 3 – Familie</p>
              <FlashCard arabic="أسرة" german="Familie" delay={20} />
              <FlashCard arabic="أب" german="Vater" delay={35} flipped />
              <FlashCard arabic="أم" german="Mutter" delay={50} />
            </div>
          </Phone>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Scene 5 – Progress / Fortschritt ─────────────────────────────────────────

const SceneProgress: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleO = useFade(5, 20);
  const titleY = useSlideUp(5);
  const phoneScale = spring({ frame: frame - 15, fps, config: { damping: 14, stiffness: 55 } });
  const circleProgress = spring({ frame: frame - 25, fps, config: { damping: 16, stiffness: 40 } });

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - interpolate(circleProgress, [0, 1], [0, 0.72]));

  return (
    <AbsoluteFill style={{ background: CREAM }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 360, background: `linear-gradient(160deg, ${DARK_RED}, ${RED})`, borderRadius: "0 0 50px 50px" }}>
        <PatternBg opacity={0.07} />
      </div>

      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 40px 0" }}>
        <div style={{ opacity: titleO, transform: `translateY(${titleY}px)`, textAlign: "center", marginBottom: 40, zIndex: 1 }}>
          <p style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", margin: "0 0 6px", letterSpacing: 3, textTransform: "uppercase" }}>Feature 3</p>
          <p style={{ fontSize: 52, fontWeight: 900, color: WHITE, margin: 0 }}>Dein Fortschritt</p>
        </div>

        <div style={{ transform: `scale(${phoneScale})`, zIndex: 2 }}>
          <Phone>
            <div style={{ background: WHITE, height: "100%", padding: "40px 16px 16px", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <p style={{ color: RED, fontSize: 13, fontWeight: 800, margin: "0 0 20px" }}>Wochenübersicht</p>

              {/* circular progress */}
              <svg width={150} height={150} style={{ marginBottom: 12 }}>
                <circle cx={75} cy={75} r={radius} fill="none" stroke="#f0e0e0" strokeWidth={12} />
                <circle
                  cx={75} cy={75} r={radius}
                  fill="none"
                  stroke={RED}
                  strokeWidth={12}
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  transform="rotate(-90 75 75)"
                />
                <text x={75} y={70} textAnchor="middle" fontSize={28} fontWeight={900} fill={RED}>72%</text>
                <text x={75} y={90} textAnchor="middle" fontSize={11} fill="#888">Wochenziel</text>
              </svg>

              {/* streak bars */}
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((day, i) => {
                  const barH = spring({ frame: frame - 30 - i * 5, fps, config: { damping: 14, stiffness: 60 } });
                  return (
                    <div key={day} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <div style={{
                        width: 24,
                        height: interpolate(barH, [0, 1], [0, [50, 40, 60, 55, 35, 45, 20][i]]),
                        background: i < 5 ? RED : "#f0e0e0",
                        borderRadius: 4,
                      }} />
                      <span style={{ fontSize: 9, color: "#aaa" }}>{day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Phone>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Scene 6 – CTA ─────────────────────────────────────────────────────────────

const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgO = useFade(0, 15);
  const logoScale = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 60 } });
  const logoO = useFade(10, 20);
  const textO = useFade(30, 20);
  const textY = useSlideUp(30);
  const btnScale = spring({ frame: frame - 55, fps, config: { damping: 10, stiffness: 80 } });
  const btnO = useFade(55, 20);
  const subO = useFade(75, 20);

  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, ${DARK_RED} 0%, ${RED} 50%, #c02020 100%)`, opacity: bgO }}>
      <PatternBg opacity={0.08} />

      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0, padding: "0 60px" }}>
        <div style={{ opacity: logoO, transform: `scale(${logoScale})`, marginBottom: 32 }}>
          <div style={{
            width: 120, height: 120, borderRadius: "50%",
            background: WHITE,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
          }}>
            <LogoMark size={90} color={RED} />
          </div>
        </div>

        <p style={{ opacity: textO, transform: `translateY(${textY}px)`, fontSize: 56, fontWeight: 900, color: WHITE, textAlign: "center", margin: "0 0 12px", lineHeight: 1.1 }}>
          Starte noch<br />heute!
        </p>
        <p style={{ opacity: textO, transform: `translateY(${textY}px)`, fontSize: 28, color: "rgba(255,255,255,0.85)", textAlign: "center", margin: "0 0 48px", fontWeight: 400 }}>
          Arabisch lernen leicht gemacht.
        </p>

        <div style={{
          opacity: btnO,
          transform: `scale(${btnScale})`,
          background: WHITE,
          color: RED,
          fontSize: 28,
          fontWeight: 900,
          padding: "22px 64px",
          borderRadius: 60,
          boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
          marginBottom: 32,
          letterSpacing: 0.5,
        }}>
          Jetzt starten →
        </div>

        <p style={{ opacity: subO, fontSize: 22, color: "rgba(255,255,255,0.7)", textAlign: "center", margin: 0 }}>
          arabicroots.de
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Crossfade transition wrapper ─────────────────────────────────────────────

const Crossfade: React.FC<{ children: React.ReactNode; startFrame: number; endFrame: number; fadeDuration?: number }> = ({
  children, startFrame, endFrame, fadeDuration = 15,
}) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [startFrame, startFrame + fadeDuration], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [endFrame - fadeDuration, endFrame], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opacity = Math.min(fadeIn, fadeOut);

  if (frame < startFrame || frame > endFrame) return null;
  return <div style={{ position: "absolute", inset: 0, opacity }}>{children}</div>;
};

// ── Main composition ──────────────────────────────────────────────────────────

export const ArabicRootsVideo: React.FC = () => {
  // 20s @ 30fps = 600 frames
  // Scene timings:
  // 0-120   Scene 1 – Hook       (4s)
  // 100-210 Scene 2 – Brand      (3.7s, overlaps for crossfade)
  // 195-315 Scene 3 – Courses    (4s)
  // 300-420 Scene 4 – Vocab      (4s)
  // 405-510 Scene 5 – Progress   (3.5s)
  // 495-600 Scene 6 – CTA        (3.5s)

  return (
    <AbsoluteFill style={{ background: "#000", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
      <Crossfade startFrame={0} endFrame={125}>
        <Sequence from={0}><SceneHook /></Sequence>
      </Crossfade>
      <Crossfade startFrame={105} endFrame={220}>
        <Sequence from={105}><SceneBrandReveal /></Sequence>
      </Crossfade>
      <Crossfade startFrame={205} endFrame={325}>
        <Sequence from={205}><SceneCourses /></Sequence>
      </Crossfade>
      <Crossfade startFrame={310} endFrame={430}>
        <Sequence from={310}><SceneVocab /></Sequence>
      </Crossfade>
      <Crossfade startFrame={415} endFrame={520}>
        <Sequence from={415}><SceneProgress /></Sequence>
      </Crossfade>
      <Crossfade startFrame={505} endFrame={600}>
        <Sequence from={505}><SceneCTA /></Sequence>
      </Crossfade>
    </AbsoluteFill>
  );
};
