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
    {Array.from({ length: 12 }).map((_, row) =>
      Array.from({ length: 7 }).map((_, col) => (
        <g key={`${row}-${col}`} transform={`translate(${col * 200 - 30},${row * 210 - 30})`}>
          <polygon points="100,0 200,50 200,150 100,200 0,150 0,50" fill="none" stroke={WHITE} strokeWidth="1.2" />
          <polygon points="100,28 172,64 172,136 100,172 28,136 28,64" fill="none" stroke={WHITE} strokeWidth="0.6" />
        </g>
      ))
    )}
  </svg>
);

// ── full ARABICROOTS logo SVG (matches the actual brand logo) ─────────────────

const ArabicRootsLogo: React.FC<{ width?: number; dark?: boolean }> = ({ width = 400, dark = false }) => {
  const textColor = dark ? RED : WHITE;
  const markColor = dark ? RED : WHITE;
  const h = width * 0.38;
  return (
    <svg width={width} height={h} viewBox="0 0 400 152" xmlns="http://www.w3.org/2000/svg">
      {/* Arabic calligraphy mark – stylised version of the actual logo mark */}
      <g transform="translate(0, 4)">
        {/* outer flame/tulip shape */}
        <path
          d="M58,10 C58,10 30,30 24,55 C18,80 28,100 45,112 C52,117 60,120 68,118
             C80,116 88,108 92,96 C96,84 94,70 88,58 C82,46 72,36 68,24
             C65,16 62,8 58,10 Z"
          fill={markColor} opacity="0.95"
        />
        {/* inner decorative loops */}
        <path
          d="M58,22 C58,22 42,40 40,58 C38,72 46,88 58,96 C65,100 72,100 78,96
             C86,90 88,78 84,66 C80,54 72,44 68,34 C64,26 62,18 58,22 Z"
          fill={dark ? WHITE : DARK_RED} opacity="0.3"
        />
        {/* left curl */}
        <path d="M30,70 C22,62 18,50 22,40 C24,34 30,28 36,26" stroke={markColor} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* right curl */}
        <path d="M88,70 C96,62 98,50 94,40 C92,34 86,28 80,26" stroke={markColor} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* base stem */}
        <path d="M48,118 C42,126 36,134 40,142" stroke={markColor} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M70,118 C76,126 82,134 78,142" stroke={markColor} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M40,142 C48,148 68,148 78,142" stroke={markColor} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* Arabic text inside mark */}
        <text x="58" y="80" textAnchor="middle" fontSize="28" fill={dark ? WHITE : DARK_RED} fontFamily="Georgia, serif" fontWeight="bold" opacity="0.9">عر</text>
      </g>
      {/* ARABICROOTS wordmark */}
      <text
        x="118" y="78"
        fontSize="52"
        fontWeight="900"
        fill={textColor}
        fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
        letterSpacing="2"
      >
        ARABIC
      </text>
      <text
        x="118" y="132"
        fontSize="52"
        fontWeight="900"
        fill={textColor}
        fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
        letterSpacing="2"
        opacity="0.75"
      >
        ROOTS
      </text>
    </svg>
  );
};

// ── full-screen phone (bleeds to edges) ───────────────────────────────────────

const FullPhone: React.FC<{ children: React.ReactNode; translateY?: number }> = ({ children, translateY = 0 }) => (
  <div style={{
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    transform: `translateY(${translateY}px)`,
  }}>
    {/* phone frame overlay */}
    <div style={{
      position: "absolute", inset: 0,
      border: "8px solid rgba(255,255,255,0.08)",
      borderRadius: 52,
      zIndex: 20,
      pointerEvents: "none",
      boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.05)",
    }} />
    {/* dynamic island */}
    <div style={{
      position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)",
      width: 130, height: 36, background: "rgba(0,0,0,0.85)",
      borderRadius: 22, zIndex: 25,
    }} />
    {/* content */}
    <div style={{ position: "absolute", inset: 0, borderRadius: 52, overflow: "hidden" }}>
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
      transform: `translateX(${interpolate(slide, [0, 1], [160, 0])}px)`,
      opacity: Math.min(slide * 2, 1),
      background: WHITE,
      borderRadius: 24,
      padding: "22px 26px",
      marginBottom: 18,
      boxShadow: "0 8px 28px rgba(151,0,0,0.18)",
      display: "flex",
      alignItems: "center",
      gap: 18,
    }}>
      <div style={{ fontSize: 42, flexShrink: 0 }}>{emoji}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: "#1a1a1a" }}>{title}</span>
          <span style={{ fontSize: 16, color: RED, fontWeight: 700 }}>{progress}%</span>
        </div>
        <div style={{ fontSize: 15, color: "#888", marginBottom: 10 }}>{subtitle}</div>
        <div style={{ height: 8, background: "#f0e0e0", borderRadius: 4, overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${interpolate(bar, [0, 1], [0, progress])}%`,
            background: `linear-gradient(90deg, ${RED}, ${RED2})`,
            borderRadius: 4,
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
  const accentO = interpolate(frame, [60, 90], [0, 0.1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(175deg, ${DARK_RED} 0%, ${RED} 55%, ${RED2} 100%)`, opacity: bgIn }}>
      <PatternBg opacity={0.07} />

      <div style={{
        position: "absolute", right: -80, top: 150,
        fontSize: 600, color: WHITE, opacity: accentO,
        fontFamily: "serif", lineHeight: 1, userSelect: "none",
        pointerEvents: "none",
      }}>؟</div>

      <AbsoluteFill style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 90px", gap: 0 }}>
        <p style={{ opacity: q1O, transform: `translateY(${q1Y}px)`, fontSize: 96, fontWeight: 900, color: WHITE, margin: "0 0 4px", lineHeight: 1.0, letterSpacing: -2 }}>
          Du willst
        </p>
        <p style={{ opacity: q2O, transform: `translateY(${q2Y}px)`, fontSize: 96, fontWeight: 900, color: WHITE, margin: "0 0 4px", lineHeight: 1.0, letterSpacing: -2 }}>
          Arabisch
        </p>
        {/* FIXED: "lernen?" now fully white, not pale */}
        <p style={{ opacity: q2O, transform: `translateY(${q2Y}px)`, fontSize: 96, fontWeight: 900, color: WHITE, margin: "0 0 52px", lineHeight: 1.0, letterSpacing: -2 }}>
          lernen?
        </p>
        <p style={{ opacity: q3O, transform: `translateY(${q3Y}px)`, fontSize: 44, color: "rgba(255,255,255,0.90)", margin: "0 0 48px", fontWeight: 400, lineHeight: 1.4 }}>
          Aber es fühlt sich<br />zu kompliziert an.
        </p>

        <div style={{
          opacity: lineO,
          width: interpolate(lineW, [0, 1], [0, 220]),
          height: 5,
          background: WHITE,
          borderRadius: 3,
        }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SCENE 2 – BRAND REVEAL
// ══════════════════════════════════════════════════════════════════════════════

const SceneBrandReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const logoS = spring({ frame: frame - 5, fps, config: { damping: 10, stiffness: 55 } });
  const logoO = useFade(5, 12);
  const divW = spring({ frame: frame - 55, fps, config: { damping: 20, stiffness: 60 } });
  const divO = useFade(55, 12);
  const tagO = useFade(70, 18);
  const tagY = useSlideUp(70, 50);
  const subO = useFade(88, 18);
  const subY = useSlideUp(88, 50);
  const badgeO = useFade(105, 18);
  const badgeS = spring({ frame: frame - 105, fps, config: { damping: 12, stiffness: 70 } });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(175deg, ${DARK_RED} 0%, ${RED} 50%, ${RED2} 100%)`, opacity: bgIn }}>
      <PatternBg opacity={0.07} />

      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0, padding: "0 60px" }}>

        {/* logo with glow ring */}
        <div style={{
          opacity: logoO,
          transform: `scale(${logoS})`,
          marginBottom: 52,
          display: "flex", flexDirection: "column", alignItems: "center",
        }}>
          <div style={{
            background: "rgba(255,255,255,0.12)",
            borderRadius: 32,
            padding: "28px 40px",
            boxShadow: "0 0 0 2px rgba(255,255,255,0.2), 0 30px 80px rgba(0,0,0,0.4)",
          }}>
            <ArabicRootsLogo width={420} dark={false} />
          </div>
        </div>

        {/* divider */}
        <div style={{
          opacity: divO,
          width: interpolate(divW, [0, 1], [0, 320]),
          height: 4,
          background: "rgba(255,255,255,0.45)",
          borderRadius: 2,
          margin: "0 0 40px",
        }} />

        <p style={{
          opacity: tagO,
          transform: `translateY(${tagY}px)`,
          fontSize: 50,
          color: WHITE,
          fontWeight: 300,
          textAlign: "center",
          margin: "0 0 6px",
          letterSpacing: 1,
        }}>
          Arabisch lernen
        </p>
        <p style={{
          opacity: subO,
          transform: `translateY(${subY}px)`,
          fontSize: 56,
          color: WHITE,
          fontWeight: 800,
          textAlign: "center",
          margin: "0 0 64px",
        }}>
          leicht gemacht.
        </p>

        <div style={{
          opacity: badgeO,
          transform: `scale(${badgeS})`,
          background: "rgba(255,255,255,0.15)",
          border: "2px solid rgba(255,255,255,0.35)",
          borderRadius: 60,
          padding: "18px 52px",
          fontSize: 30,
          color: WHITE,
          fontWeight: 600,
          letterSpacing: 2,
        }}>
          arabicroots.de
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// FEATURE PHONE SCENES – full screen phone
// ══════════════════════════════════════════════════════════════════════════════

const SceneCourses: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneY = spring({ frame: frame - 5, fps, config: { damping: 18, stiffness: 60 } });
  const labelO = useFade(20, 18);
  const labelY = useSlideUp(20, 40);

  return (
    <AbsoluteFill style={{ background: DARK_RED }}>
      <FullPhone translateY={interpolate(phoneY, [0, 1], [120, 0])}>
        <div style={{
          background: `linear-gradient(180deg, ${RED} 0%, #a51010 22%, #f2e8e8 22%)`,
          height: "100%",
          padding: "70px 40px 40px",
        }}>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 20, fontWeight: 700, letterSpacing: 3, margin: "0 0 6px", textTransform: "uppercase" }}>ArabicRoots</p>
          <p style={{ color: WHITE, fontSize: 40, fontWeight: 900, margin: "0 0 40px" }}>Meine Kurse</p>
          <CourseCard title="Arabisch Grundkurs" subtitle="Anfänger · 12 Lektionen" progress={75} emoji="📖" delay={18} />
          <CourseCard title="Arabische Schrift" subtitle="Grundlagen · 8 Lektionen" progress={45} emoji="✍️" delay={30} />
          <CourseCard title="Alltags-Arabisch" subtitle="Mittelstufe · 15 Lektionen" progress={22} emoji="🗣️" delay={42} />
        </div>
      </FullPhone>

      {/* floating feature label bottom */}
      <div style={{
        position: "absolute", bottom: 60, left: 0, right: 0,
        display: "flex", justifyContent: "center",
        opacity: labelO, transform: `translateY(${labelY}px)`,
        zIndex: 30,
      }}>
        <div style={{
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(12px)",
          border: "1.5px solid rgba(255,255,255,0.25)",
          borderRadius: 50,
          padding: "14px 40px",
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: WHITE }} />
          <span style={{ fontSize: 26, fontWeight: 700, color: WHITE, letterSpacing: 1 }}>Strukturierte Kurse</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Flashcard ─────────────────────────────────────────────────────────────────

const FlashCard: React.FC<{ arabic: string; transliteration: string; german: string; delay: number; accent?: boolean }> = ({
  arabic, transliteration, german, delay, accent = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 65 } });

  return (
    <div style={{
      transform: `translateY(${interpolate(s, [0, 1], [120, 0])}px)`,
      opacity: Math.min(s * 1.5, 1),
      background: accent ? `linear-gradient(135deg, ${RED}, ${RED2})` : WHITE,
      borderRadius: 28,
      padding: "26px 32px",
      marginBottom: 20,
      boxShadow: accent ? "0 14px 40px rgba(151,0,0,0.4)" : "0 8px 24px rgba(0,0,0,0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}>
      <div>
        <div style={{ fontSize: 18, color: accent ? "rgba(255,255,255,0.65)" : "#bbb", marginBottom: 6 }}>{transliteration}</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: accent ? WHITE : "#1a1a1a" }}>{german}</div>
      </div>
      <div style={{ fontSize: 52, color: accent ? WHITE : RED, fontWeight: 900, direction: "rtl" }}>{arabic}</div>
    </div>
  );
};

const SceneVocab: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneY = spring({ frame: frame - 5, fps, config: { damping: 18, stiffness: 60 } });
  const labelO = useFade(20, 18);
  const labelY = useSlideUp(20, 40);

  return (
    <AbsoluteFill style={{ background: DARK_RED }}>
      <FullPhone translateY={interpolate(phoneY, [0, 1], [120, 0])}>
        <div style={{ background: "#f4eded", height: "100%", padding: "70px 36px 36px" }}>
          <p style={{ color: RED, fontSize: 20, fontWeight: 800, letterSpacing: 2, margin: "0 0 6px", textTransform: "uppercase" }}>Lektion 4</p>
          <p style={{ color: "#1a1a1a", fontSize: 40, fontWeight: 900, margin: "0 0 36px" }}>Familie & Zuhause</p>
          <FlashCard arabic="أسرة" transliteration="usra" german="Familie" delay={16} accent />
          <FlashCard arabic="أب" transliteration="ab" german="Vater" delay={28} />
          <FlashCard arabic="أم" transliteration="umm" german="Mutter" delay={40} accent />
          <FlashCard arabic="بيت" transliteration="bayt" german="Haus" delay={52} />
        </div>
      </FullPhone>

      <div style={{
        position: "absolute", bottom: 60, left: 0, right: 0,
        display: "flex", justifyContent: "center",
        opacity: labelO, transform: `translateY(${labelY}px)`,
        zIndex: 30,
      }}>
        <div style={{
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(12px)",
          border: "1.5px solid rgba(255,255,255,0.25)",
          borderRadius: 50,
          padding: "14px 40px",
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: WHITE }} />
          <span style={{ fontSize: 26, fontWeight: 700, color: WHITE, letterSpacing: 1 }}>Vokabeln lernen</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneProgress: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneY = spring({ frame: frame - 5, fps, config: { damping: 18, stiffness: 60 } });
  const labelO = useFade(20, 18);
  const labelY = useSlideUp(20, 40);
  const circP = spring({ frame: frame - 28, fps, config: { damping: 18, stiffness: 40 } });

  const R = 110;
  const C = 2 * Math.PI * R;
  const offset = C * (1 - interpolate(circP, [0, 1], [0, 0.78]));
  const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  const heights = [70, 52, 84, 65, 54, 26, 10];

  return (
    <AbsoluteFill style={{ background: DARK_RED }}>
      <FullPhone translateY={interpolate(phoneY, [0, 1], [120, 0])}>
        <div style={{
          background: WHITE,
          height: "100%",
          padding: "70px 40px 40px",
          display: "flex", flexDirection: "column", alignItems: "center",
        }}>
          <p style={{ color: "#1a1a1a", fontSize: 38, fontWeight: 900, margin: "0 0 36px", alignSelf: "flex-start" }}>Diese Woche</p>

          <svg width={260} height={260} style={{ marginBottom: 36 }}>
            <circle cx={130} cy={130} r={R} fill="none" stroke="#f0e0e0" strokeWidth={20} />
            <circle cx={130} cy={130} r={R} fill="none" stroke={`url(#rg)`}
              strokeWidth={20} strokeDasharray={C} strokeDashoffset={offset}
              strokeLinecap="round" transform="rotate(-90 130 130)" />
            <defs>
              <linearGradient id="rg" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={DARK_RED} />
                <stop offset="100%" stopColor={RED2} />
              </linearGradient>
            </defs>
            <text x={130} y={118} textAnchor="middle" fontSize={50} fontWeight={900} fill={RED}>78%</text>
            <text x={130} y={154} textAnchor="middle" fontSize={18} fill="#bbb">Wochenziel</text>
          </svg>

          <div style={{ display: "flex", gap: 12, alignItems: "flex-end", width: "100%", marginBottom: 36 }}>
            {days.map((day, i) => {
              const bH = spring({ frame: frame - 32 - i * 7, fps, config: { damping: 14, stiffness: 55 } });
              return (
                <div key={day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: "100%",
                    height: interpolate(bH, [0, 1], [0, heights[i]]),
                    background: i < 5 ? `linear-gradient(180deg, ${RED}, ${RED2})` : "#f0e0e0",
                    borderRadius: 8,
                  }} />
                  <span style={{ fontSize: 15, color: i < 5 ? RED : "#ddd", fontWeight: i < 5 ? 700 : 400 }}>{day}</span>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: 20, width: "100%" }}>
            {[["🔥", "12", "Streak"], ["⭐", "240", "XP"], ["📚", "3", "Kurse"]].map(([icon, val, label]) => (
              <div key={label} style={{
                flex: 1, background: "#fdf3f3", borderRadius: 22, padding: "20px 0",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              }}>
                <span style={{ fontSize: 32 }}>{icon}</span>
                <span style={{ fontSize: 26, fontWeight: 900, color: RED }}>{val}</span>
                <span style={{ fontSize: 15, color: "#bbb" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </FullPhone>

      <div style={{
        position: "absolute", bottom: 60, left: 0, right: 0,
        display: "flex", justifyContent: "center",
        opacity: labelO, transform: `translateY(${labelY}px)`,
        zIndex: 30,
      }}>
        <div style={{
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(12px)",
          border: "1.5px solid rgba(255,255,255,0.25)",
          borderRadius: 50,
          padding: "14px 40px",
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: WHITE }} />
          <span style={{ fontSize: 26, fontWeight: 700, color: WHITE, letterSpacing: 1 }}>Dein Fortschritt</span>
        </div>
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
  const t1O = useFade(32, 18);
  const t1Y = useSlideUp(32);
  const t2O = useFade(52, 18);
  const t2Y = useSlideUp(52);
  const btnS = spring({ frame: frame - 72, fps, config: { damping: 10, stiffness: 75 } });
  const btnO = useFade(72, 18);
  const urlO = useFade(95, 18);

  return (
    <AbsoluteFill style={{ background: `linear-gradient(175deg, ${DARK_RED} 0%, ${RED} 50%, ${RED2} 100%)`, opacity: bgIn }}>
      <PatternBg opacity={0.07} />

      <div style={{
        position: "absolute", top: "38%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.09) 0%, transparent 70%)",
      }} />

      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 70px", gap: 0 }}>

        <div style={{ opacity: logoO, transform: `scale(${logoS})`, marginBottom: 56 }}>
          <div style={{
            background: "rgba(255,255,255,0.14)",
            borderRadius: 32,
            padding: "24px 36px",
            boxShadow: "0 0 0 2px rgba(255,255,255,0.2), 0 30px 70px rgba(0,0,0,0.4)",
          }}>
            <ArabicRootsLogo width={380} dark={false} />
          </div>
        </div>

        <p style={{ opacity: t1O, transform: `translateY(${t1Y}px)`, fontSize: 88, fontWeight: 900, color: WHITE, textAlign: "center", margin: "0 0 8px", lineHeight: 1.0, letterSpacing: -2 }}>
          Starte jetzt
        </p>
        <p style={{ opacity: t2O, transform: `translateY(${t2Y}px)`, fontSize: 88, fontWeight: 900, color: "rgba(255,255,255,0.42)", textAlign: "center", margin: "0 0 68px", lineHeight: 1.0, letterSpacing: -2 }}>
          kostenlos.
        </p>

        <div style={{
          opacity: btnO,
          transform: `scale(${btnS})`,
          background: WHITE,
          color: RED,
          fontSize: 36,
          fontWeight: 900,
          padding: "30px 88px",
          borderRadius: 80,
          boxShadow: "0 22px 55px rgba(0,0,0,0.32)",
          marginBottom: 44,
          letterSpacing: 0.5,
        }}>
          Jetzt starten →
        </div>

        <p style={{ opacity: urlO, fontSize: 28, color: "rgba(255,255,255,0.55)", margin: 0, letterSpacing: 3 }}>
          arabicroots.de
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Fade in from black ────────────────────────────────────────────────────────

const FadeIn: React.FC<{ children: React.ReactNode; duration?: number }> = ({ children, duration = 18 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, duration], [0, 1], { extrapolateRight: "clamp" });
  return <div style={{ position: "absolute", inset: 0, opacity }}>{children}</div>;
};

// ── "Stunkeln" – screen dims to dark between feature scenes ──────────────────
// Placed OVER the features at the transition cuts (relative to root frame)

const DimFlash: React.FC<{ atFrame: number; duration?: number }> = ({ atFrame, duration = 20 }) => {
  const frame = useCurrentFrame();
  const half = duration / 2;
  const opacity = interpolate(
    frame,
    [atFrame - half, atFrame, atFrame + half],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: "#000",
      opacity,
      zIndex: 100,
      pointerEvents: "none",
    }} />
  );
};

// ── Main composition ──────────────────────────────────────────────────────────
// 20s @ 30fps = 600 frames
// Scene 1 Hook:         0   – 110
// Scene 2 Brand:        110 – 230
// Scene 3 Courses:      230 – 365
// Scene 4 Vocab:        365 – 490  ← dim flash at 365
// Scene 5 Progress:     490 – 560  ← dim flash at 490
// Scene 6 CTA:          560 – 600

export const ArabicRootsVideo: React.FC = () => (
  <AbsoluteFill style={{ background: "#000", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
    <Sequence from={0} durationInFrames={110}>
      <FadeIn><SceneHook /></FadeIn>
    </Sequence>
    <Sequence from={110} durationInFrames={120}>
      <FadeIn><SceneBrandReveal /></FadeIn>
    </Sequence>
    <Sequence from={230} durationInFrames={135}>
      <FadeIn><SceneCourses /></FadeIn>
    </Sequence>
    <Sequence from={365} durationInFrames={125}>
      <FadeIn><SceneVocab /></FadeIn>
    </Sequence>
    <Sequence from={490} durationInFrames={70}>
      <FadeIn><SceneProgress /></FadeIn>
    </Sequence>
    <Sequence from={560} durationInFrames={40}>
      <FadeIn duration={10}><SceneCTA /></FadeIn>
    </Sequence>

    {/* dim flashes between feature scenes */}
    <DimFlash atFrame={365} duration={22} />
    <DimFlash atFrame={490} duration={22} />
    <DimFlash atFrame={560} duration={18} />
  </AbsoluteFill>
);
