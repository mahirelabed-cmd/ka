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
const RED2 = "#c02020";
const WHITE = "#FFFFFF";
const DARK_RED = "#4a0000";

// ── helpers ──────────────────────────────────────────────────────────────────

const useFade = (start: number, duration = 18) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

const useSlideUp = (start: number, distance = 70) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - start, fps, config: { damping: 16, stiffness: 90 } });
  return interpolate(p, [0, 1], [distance, 0]);
};

// ── decorative geometric pattern ─────────────────────────────────────────────

const PatternBg: React.FC<{ opacity?: number }> = ({ opacity = 0.06 }) => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity }} xmlns="http://www.w3.org/2000/svg">
    {Array.from({ length: 10 }).map((_, row) =>
      Array.from({ length: 6 }).map((_, col) => (
        <g key={`${row}-${col}`} transform={`translate(${col * 200 - 30},${row * 210 - 30})`}>
          <polygon points="100,0 200,50 200,150 100,200 0,150 0,50" fill="none" stroke={WHITE} strokeWidth="1.2" />
          <polygon points="100,28 172,64 172,136 100,172 28,136 28,64" fill="none" stroke={WHITE} strokeWidth="0.6" />
        </g>
      ))
    )}
  </svg>
);

// ── logo mark SVG ─────────────────────────────────────────────────────────────

const LogoMark: React.FC<{ size?: number; bgColor?: string; letterColor?: string }> = ({
  size = 80, bgColor = RED, letterColor = WHITE,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="48" fill={bgColor} />
    <circle cx="50" cy="50" r="40" fill="none" stroke={letterColor} strokeWidth="1.5" opacity="0.3" />
    <text x="50" y="66" textAnchor="middle" fontSize="46" fill={letterColor} fontFamily="Georgia, serif" fontWeight="bold">ع</text>
  </svg>
);

// ── large phone mockup ────────────────────────────────────────────────────────

const Phone: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{
    width: 480,
    height: 960,
    borderRadius: 56,
    background: "#111",
    boxShadow: "0 50px 120px rgba(0,0,0,0.6), 0 0 0 3px #333, inset 0 0 0 1px #555",
    overflow: "hidden",
    position: "relative",
    flexShrink: 0,
  }}>
    {/* dynamic island */}
    <div style={{
      position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)",
      width: 120, height: 34, background: "#111",
      borderRadius: 20, zIndex: 20,
    }} />
    <div style={{ width: "100%", height: "100%", borderRadius: 56, overflow: "hidden" }}>
      {children}
    </div>
  </div>
);

// ── course card ───────────────────────────────────────────────────────────────

const CourseCard: React.FC<{ title: string; subtitle: string; progress: number; emoji: string; delay: number }> = ({
  title, subtitle, progress, emoji, delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const slide = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 75 } });
  const bar = spring({ frame: frame - delay - 8, fps, config: { damping: 18, stiffness: 55 } });

  return (
    <div style={{
      transform: `translateX(${interpolate(slide, [0, 1], [140, 0])}px)`,
      opacity: Math.min(slide * 2, 1),
      background: WHITE,
      borderRadius: 20,
      padding: "18px 20px",
      marginBottom: 14,
      boxShadow: "0 6px 20px rgba(151,0,0,0.15)",
      display: "flex",
      alignItems: "center",
      gap: 14,
    }}>
      <div style={{ fontSize: 32, flexShrink: 0 }}>{emoji}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: "#1a1a1a" }}>{title}</span>
          <span style={{ fontSize: 11, color: RED, fontWeight: 700 }}>{progress}%</span>
        </div>
        <div style={{ fontSize: 11, color: "#888", marginBottom: 8 }}>{subtitle}</div>
        <div style={{ height: 6, background: "#f0e0e0", borderRadius: 3, overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${interpolate(bar, [0, 1], [0, progress])}%`,
            background: `linear-gradient(90deg, ${RED}, ${RED2})`,
            borderRadius: 3,
          }} />
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCENE 1 – HOOK
// ══════════════════════════════════════════════════════════════════════════════

const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgIn = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  const q1O = useFade(15);
  const q1Y = useSlideUp(15);
  const q2O = useFade(35);
  const q2Y = useSlideUp(35);
  const q3O = useFade(58);
  const q3Y = useSlideUp(58);
  const lineO = useFade(80);
  const lineW = spring({ frame: frame - 80, fps, config: { damping: 18, stiffness: 60 } });
  const accentO = interpolate(frame, [60, 90], [0, 0.12], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(175deg, ${DARK_RED} 0%, ${RED} 55%, ${RED2} 100%)`, opacity: bgIn }}>
      <PatternBg opacity={0.07} />

      {/* big arabic question mark watermark */}
      <div style={{
        position: "absolute", right: -60, top: 200,
        fontSize: 600, color: WHITE, opacity: accentO,
        fontFamily: "serif", lineHeight: 1, userSelect: "none",
        pointerEvents: "none",
      }}>؟</div>

      <AbsoluteFill style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 90px", gap: 0 }}>
        <p style={{ opacity: q1O, transform: `translateY(${q1Y}px)`, fontSize: 88, fontWeight: 900, color: WHITE, margin: "0 0 6px", lineHeight: 1.0, letterSpacing: -2 }}>
          Du willst
        </p>
        <p style={{ opacity: q2O, transform: `translateY(${q2Y}px)`, fontSize: 88, fontWeight: 900, color: WHITE, margin: "0 0 6px", lineHeight: 1.0, letterSpacing: -2 }}>
          Arabisch
        </p>
        <p style={{ opacity: q2O, transform: `translateY(${q2Y}px)`, fontSize: 88, fontWeight: 900, color: "rgba(255,255,255,0.45)", margin: "0 0 48px", lineHeight: 1.0, letterSpacing: -2 }}>
          lernen?
        </p>
        <p style={{ opacity: q3O, transform: `translateY(${q3Y}px)`, fontSize: 42, color: "rgba(255,255,255,0.85)", margin: "0 0 48px", fontWeight: 400, lineHeight: 1.4 }}>
          Aber es fühlt sich<br />zu kompliziert an.
        </p>

        <div style={{
          opacity: lineO,
          width: interpolate(lineW, [0, 1], [0, 200]),
          height: 5,
          background: WHITE,
          borderRadius: 3,
        }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCENE 2 – BRAND REVEAL  (clean, no overlap with hook)
// ══════════════════════════════════════════════════════════════════════════════

const SceneBrandReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // logo burst in
  const logoS = spring({ frame: frame - 5, fps, config: { damping: 10, stiffness: 55 } });
  const logoO = useFade(5, 12);

  // brand name slides in from left
  const nameX = spring({ frame: frame - 30, fps, config: { damping: 16, stiffness: 70 } });
  const nameO = useFade(30, 15);

  // divider grows
  const divW = spring({ frame: frame - 50, fps, config: { damping: 20, stiffness: 60 } });
  const divO = useFade(50, 12);

  // tagline
  const tagO = useFade(65, 18);
  const tagY = useSlideUp(65, 50);

  // sub
  const subO = useFade(82, 18);
  const subY = useSlideUp(82, 50);

  // bottom badge
  const badgeO = useFade(98, 18);
  const badgeS = spring({ frame: frame - 98, fps, config: { damping: 12, stiffness: 70 } });

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(175deg, ${DARK_RED} 0%, ${RED} 50%, ${RED2} 100%)`,
      opacity: bgIn,
    }}>
      <PatternBg opacity={0.07} />

      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0, padding: "0 80px" }}>

        {/* logo */}
        <div style={{
          opacity: logoO,
          transform: `scale(${logoS})`,
          marginBottom: 48,
          filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))",
        }}>
          <div style={{
            width: 200, height: 200, borderRadius: "50%",
            background: WHITE,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 0 12px rgba(255,255,255,0.12)",
          }}>
            <LogoMark size={160} bgColor={RED} letterColor={WHITE} />
          </div>
        </div>

        {/* brand name */}
        <div style={{
          opacity: nameO,
          transform: `translateX(${interpolate(nameX, [0, 1], [-80, 0])}px)`,
          fontSize: 76,
          fontWeight: 900,
          color: WHITE,
          letterSpacing: 4,
          marginBottom: 12,
          textAlign: "center",
        }}>
          ARABICROOTS
        </div>

        {/* divider */}
        <div style={{
          opacity: divO,
          width: interpolate(divW, [0, 1], [0, 300]),
          height: 4,
          background: "rgba(255,255,255,0.5)",
          borderRadius: 2,
          margin: "8px 0 32px",
        }} />

        {/* tagline */}
        <p style={{
          opacity: tagO,
          transform: `translateY(${tagY}px)`,
          fontSize: 46,
          color: WHITE,
          fontWeight: 300,
          textAlign: "center",
          margin: "0 0 8px",
          letterSpacing: 1,
        }}>
          Arabisch lernen
        </p>
        <p style={{
          opacity: subO,
          transform: `translateY(${subY}px)`,
          fontSize: 52,
          color: WHITE,
          fontWeight: 800,
          textAlign: "center",
          margin: "0 0 64px",
        }}>
          leicht gemacht.
        </p>

        {/* badge */}
        <div style={{
          opacity: badgeO,
          transform: `scale(${badgeS})`,
          background: "rgba(255,255,255,0.15)",
          border: "2px solid rgba(255,255,255,0.35)",
          borderRadius: 60,
          padding: "16px 48px",
          fontSize: 28,
          color: WHITE,
          fontWeight: 600,
          letterSpacing: 1,
        }}>
          arabicroots.de
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCENE 3 – KURSE  (full screen, big phone)
// ══════════════════════════════════════════════════════════════════════════════

const SceneCourses: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleO = useFade(8, 18);
  const titleY = useSlideUp(8);
  const phoneY = spring({ frame: frame - 12, fps, config: { damping: 16, stiffness: 55 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(175deg, ${DARK_RED} 0%, ${RED} 40%, #b01515 100%)`, opacity: bgIn }}>
      <PatternBg opacity={0.05} />

      {/* top label + title */}
      <div style={{
        position: "absolute", top: 100, left: 0, right: 0,
        display: "flex", flexDirection: "column", alignItems: "center",
        opacity: titleO, transform: `translateY(${titleY}px)`,
        zIndex: 10,
      }}>
        <div style={{
          background: "rgba(255,255,255,0.18)", border: "1.5px solid rgba(255,255,255,0.4)",
          borderRadius: 40, padding: "8px 28px", fontSize: 22, color: WHITE,
          letterSpacing: 4, fontWeight: 600, textTransform: "uppercase", marginBottom: 20,
        }}>
          Feature 01
        </div>
        <p style={{ fontSize: 72, fontWeight: 900, color: WHITE, margin: 0, letterSpacing: -1, textAlign: "center" }}>
          Deine Kurse
        </p>
      </div>

      {/* phone centered */}
      <div style={{
        position: "absolute",
        bottom: -40,
        left: "50%",
        transform: `translateX(-50%) translateY(${interpolate(phoneY, [0, 1], [300, 0])}px)`,
        zIndex: 5,
        filter: "drop-shadow(0 -20px 60px rgba(0,0,0,0.5))",
      }}>
        <Phone>
          <div style={{
            background: `linear-gradient(180deg, ${RED} 0%, #a01010 28%, #f5eded 28%)`,
            height: "100%",
            padding: "60px 24px 24px",
          }}>
            {/* app header */}
            <p style={{ color: WHITE, fontSize: 15, fontWeight: 700, letterSpacing: 3, margin: "0 0 4px", textTransform: "uppercase" }}>ArabicRoots</p>
            <p style={{ color: WHITE, fontSize: 26, fontWeight: 900, margin: "0 0 28px" }}>Meine Kurse</p>

            <CourseCard title="Arabisch Grundkurs" subtitle="Anfänger · 12 Lektionen" progress={75} emoji="📖" delay={18} />
            <CourseCard title="Arabische Schrift" subtitle="Grundlagen · 8 Lektionen" progress={45} emoji="✍️" delay={28} />
            <CourseCard title="Alltags-Arabisch" subtitle="Mittelstufe · 15 Lektionen" progress={22} emoji="🗣️" delay={38} />
          </div>
        </Phone>
      </div>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCENE 4 – VOKABELN
// ══════════════════════════════════════════════════════════════════════════════

const FlashCard: React.FC<{ arabic: string; transliteration: string; german: string; delay: number; accent?: boolean }> = ({
  arabic, transliteration, german, delay, accent = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 65 } });

  return (
    <div style={{
      transform: `translateY(${interpolate(s, [0, 1], [100, 0])}px)`,
      opacity: Math.min(s * 1.5, 1),
      background: accent ? `linear-gradient(135deg, ${RED}, ${RED2})` : WHITE,
      borderRadius: 24,
      padding: "22px 28px",
      marginBottom: 16,
      boxShadow: accent ? "0 12px 32px rgba(151,0,0,0.4)" : "0 8px 24px rgba(0,0,0,0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}>
      <div>
        <div style={{ fontSize: 14, color: accent ? "rgba(255,255,255,0.7)" : "#999", marginBottom: 4 }}>{transliteration}</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: accent ? WHITE : "#1a1a1a" }}>{german}</div>
      </div>
      <div style={{ fontSize: 42, color: accent ? WHITE : RED, fontWeight: 900, direction: "rtl" }}>{arabic}</div>
    </div>
  );
};

const SceneVocab: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleO = useFade(8, 18);
  const titleY = useSlideUp(8);
  const phoneY = spring({ frame: frame - 12, fps, config: { damping: 16, stiffness: 55 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(175deg, ${DARK_RED} 0%, #8a0000 40%, ${RED} 100%)`, opacity: bgIn }}>
      <PatternBg opacity={0.05} />

      <div style={{
        position: "absolute", top: 100, left: 0, right: 0,
        display: "flex", flexDirection: "column", alignItems: "center",
        opacity: titleO, transform: `translateY(${titleY}px)`,
        zIndex: 10,
      }}>
        <div style={{
          background: "rgba(255,255,255,0.18)", border: "1.5px solid rgba(255,255,255,0.4)",
          borderRadius: 40, padding: "8px 28px", fontSize: 22, color: WHITE,
          letterSpacing: 4, fontWeight: 600, textTransform: "uppercase", marginBottom: 20,
        }}>
          Feature 02
        </div>
        <p style={{ fontSize: 72, fontWeight: 900, color: WHITE, margin: 0, letterSpacing: -1 }}>
          Vokabeln
        </p>
      </div>

      <div style={{
        position: "absolute",
        bottom: -40,
        left: "50%",
        transform: `translateX(-50%) translateY(${interpolate(phoneY, [0, 1], [300, 0])}px)`,
        zIndex: 5,
        filter: "drop-shadow(0 -20px 60px rgba(0,0,0,0.5))",
      }}>
        <Phone>
          <div style={{ background: "#f9f0f0", height: "100%", padding: "64px 24px 24px" }}>
            <p style={{ color: RED, fontSize: 15, fontWeight: 800, letterSpacing: 2, margin: "0 0 6px", textTransform: "uppercase" }}>Lektion 4</p>
            <p style={{ color: "#1a1a1a", fontSize: 28, fontWeight: 900, margin: "0 0 30px" }}>Familie & Zuhause</p>
            <FlashCard arabic="أسرة" transliteration="usra" german="Familie" delay={18} accent />
            <FlashCard arabic="أب" transliteration="ab" german="Vater" delay={30} />
            <FlashCard arabic="أم" transliteration="umm" german="Mutter" delay={42} accent />
            <FlashCard arabic="بيت" transliteration="bayt" german="Haus" delay={54} />
          </div>
        </Phone>
      </div>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCENE 5 – FORTSCHRITT
// ══════════════════════════════════════════════════════════════════════════════

const SceneProgress: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleO = useFade(8, 18);
  const titleY = useSlideUp(8);
  const phoneY = spring({ frame: frame - 12, fps, config: { damping: 16, stiffness: 55 } });
  const circP = spring({ frame: frame - 30, fps, config: { damping: 18, stiffness: 40 } });

  const R = 88;
  const C = 2 * Math.PI * R;
  const offset = C * (1 - interpolate(circP, [0, 1], [0, 0.78]));

  const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  const heights = [55, 40, 65, 50, 42, 20, 8];

  return (
    <AbsoluteFill style={{ background: `linear-gradient(175deg, ${DARK_RED} 0%, ${RED} 50%, #b01515 100%)`, opacity: bgIn }}>
      <PatternBg opacity={0.05} />

      <div style={{
        position: "absolute", top: 100, left: 0, right: 0,
        display: "flex", flexDirection: "column", alignItems: "center",
        opacity: titleO, transform: `translateY(${titleY}px)`,
        zIndex: 10,
      }}>
        <div style={{
          background: "rgba(255,255,255,0.18)", border: "1.5px solid rgba(255,255,255,0.4)",
          borderRadius: 40, padding: "8px 28px", fontSize: 22, color: WHITE,
          letterSpacing: 4, fontWeight: 600, textTransform: "uppercase", marginBottom: 20,
        }}>
          Feature 03
        </div>
        <p style={{ fontSize: 72, fontWeight: 900, color: WHITE, margin: 0, letterSpacing: -1 }}>
          Fortschritt
        </p>
      </div>

      <div style={{
        position: "absolute",
        bottom: -40,
        left: "50%",
        transform: `translateX(-50%) translateY(${interpolate(phoneY, [0, 1], [300, 0])}px)`,
        zIndex: 5,
        filter: "drop-shadow(0 -20px 60px rgba(0,0,0,0.5))",
      }}>
        <Phone>
          <div style={{
            background: WHITE,
            height: "100%",
            padding: "60px 28px 28px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <p style={{ color: "#1a1a1a", fontSize: 26, fontWeight: 900, margin: "0 0 28px", alignSelf: "flex-start" }}>
              Diese Woche
            </p>

            {/* ring */}
            <svg width={200} height={200} style={{ marginBottom: 24 }}>
              <circle cx={100} cy={100} r={R} fill="none" stroke="#f0e0e0" strokeWidth={16} />
              <circle cx={100} cy={100} r={R} fill="none" stroke={`url(#ring-grad)`}
                strokeWidth={16} strokeDasharray={C} strokeDashoffset={offset}
                strokeLinecap="round" transform="rotate(-90 100 100)" />
              <defs>
                <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={DARK_RED} />
                  <stop offset="100%" stopColor={RED2} />
                </linearGradient>
              </defs>
              <text x={100} y={92} textAnchor="middle" fontSize={38} fontWeight={900} fill={RED}>78%</text>
              <text x={100} y={118} textAnchor="middle" fontSize={14} fill="#aaa">Wochenziel</text>
            </svg>

            {/* streak bars */}
            <div style={{ display: "flex", gap: 10, alignItems: "flex-end", width: "100%" }}>
              {days.map((day, i) => {
                const bH = spring({ frame: frame - 35 - i * 6, fps, config: { damping: 14, stiffness: 55 } });
                return (
                  <div key={day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{
                      width: "100%",
                      height: interpolate(bH, [0, 1], [0, heights[i]]),
                      background: i < 5 ? `linear-gradient(180deg, ${RED}, ${RED2})` : "#f0e0e0",
                      borderRadius: 6,
                    }} />
                    <span style={{ fontSize: 11, color: i < 5 ? RED : "#ccc", fontWeight: i < 5 ? 700 : 400 }}>{day}</span>
                  </div>
                );
              })}
            </div>

            {/* stats row */}
            <div style={{ display: "flex", gap: 16, marginTop: 24, width: "100%" }}>
              {[["🔥", "12", "Streak"], ["⭐", "240", "Punkte"], ["📚", "3", "Kurse"]].map(([icon, val, label]) => (
                <div key={label} style={{
                  flex: 1, background: "#fdf5f5", borderRadius: 16, padding: "14px 0",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                }}>
                  <span style={{ fontSize: 22 }}>{icon}</span>
                  <span style={{ fontSize: 18, fontWeight: 900, color: RED }}>{val}</span>
                  <span style={{ fontSize: 11, color: "#aaa" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </Phone>
      </div>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCENE 6 – CTA
// ══════════════════════════════════════════════════════════════════════════════

const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const logoS = spring({ frame: frame - 8, fps, config: { damping: 11, stiffness: 55 } });
  const logoO = useFade(8, 15);
  const t1O = useFade(30, 18);
  const t1Y = useSlideUp(30);
  const t2O = useFade(50, 18);
  const t2Y = useSlideUp(50);
  const btnS = spring({ frame: frame - 70, fps, config: { damping: 10, stiffness: 75 } });
  const btnO = useFade(70, 18);
  const urlO = useFade(92, 18);

  return (
    <AbsoluteFill style={{ background: `linear-gradient(175deg, ${DARK_RED} 0%, ${RED} 50%, ${RED2} 100%)`, opacity: bgIn }}>
      <PatternBg opacity={0.07} />

      {/* glow circle behind logo */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -100%)",
        width: 500, height: 500,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
      }} />

      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 80px", gap: 0 }}>

        <div style={{ opacity: logoO, transform: `scale(${logoS})`, marginBottom: 52, filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.35))" }}>
          <div style={{
            width: 180, height: 180, borderRadius: "50%",
            background: WHITE,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 0 16px rgba(255,255,255,0.1), 0 0 0 32px rgba(255,255,255,0.05)",
          }}>
            <LogoMark size={140} bgColor={RED} letterColor={WHITE} />
          </div>
        </div>

        <p style={{ opacity: t1O, transform: `translateY(${t1Y}px)`, fontSize: 82, fontWeight: 900, color: WHITE, textAlign: "center", margin: "0 0 10px", lineHeight: 1.0, letterSpacing: -2 }}>
          Starte jetzt
        </p>
        <p style={{ opacity: t2O, transform: `translateY(${t2Y}px)`, fontSize: 82, fontWeight: 900, color: "rgba(255,255,255,0.45)", textAlign: "center", margin: "0 0 64px", lineHeight: 1.0, letterSpacing: -2 }}>
          kostenlos.
        </p>

        <div style={{
          opacity: btnO,
          transform: `scale(${btnS})`,
          background: WHITE,
          color: RED,
          fontSize: 34,
          fontWeight: 900,
          padding: "28px 80px",
          borderRadius: 80,
          boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
          marginBottom: 40,
          letterSpacing: 0.5,
        }}>
          Jetzt starten →
        </div>

        <p style={{ opacity: urlO, fontSize: 26, color: "rgba(255,255,255,0.6)", margin: 0, letterSpacing: 2 }}>
          arabicroots.de
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Transition – hard cut with fade-in only ───────────────────────────────────

const FadeScene: React.FC<{ children: React.ReactNode; fadeDuration?: number }> = ({ children, fadeDuration = 18 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, fadeDuration], [0, 1], { extrapolateRight: "clamp" });
  return <div style={{ position: "absolute", inset: 0, opacity }}>{children}</div>;
};

// ── Main composition ──────────────────────────────────────────────────────────
// 20s @ 30fps = 600 frames
// Scene 1 Hook:         0  – 110  (110 frames = 3.7s)
// Scene 2 Brand Reveal: 110 – 230 (120 frames = 4s)
// Scene 3 Courses:      230 – 365 (135 frames = 4.5s)
// Scene 4 Vocab:        365 – 490 (125 frames = 4.2s)
// Scene 5 Progress:     490 – 560 (70 frames  = 2.3s)
// Scene 6 CTA:          560 – 600 (40 frames  = 1.3s) ← punchy ending

export const ArabicRootsVideo: React.FC = () => (
  <AbsoluteFill style={{ background: DARK_RED, fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
    <Sequence from={0} durationInFrames={110}>
      <FadeScene><SceneHook /></FadeScene>
    </Sequence>
    <Sequence from={110} durationInFrames={120}>
      <FadeScene><SceneBrandReveal /></FadeScene>
    </Sequence>
    <Sequence from={230} durationInFrames={135}>
      <FadeScene><SceneCourses /></FadeScene>
    </Sequence>
    <Sequence from={365} durationInFrames={125}>
      <FadeScene><SceneVocab /></FadeScene>
    </Sequence>
    <Sequence from={490} durationInFrames={70}>
      <FadeScene><SceneProgress /></FadeScene>
    </Sequence>
    <Sequence from={560} durationInFrames={40}>
      <FadeScene fadeDuration={10}><SceneCTA /></FadeScene>
    </Sequence>
  </AbsoluteFill>
);
