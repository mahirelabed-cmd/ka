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
const BG_DARK = "#050810";
const BLUE_PRIMARY = "#3B82F6";
const BLUE_LIGHT = "#60A5FA";
const BLUE_GLOW = "#1D4ED8";
const WHITE = "#FFFFFF";
const WHITE_DIM = "rgba(255,255,255,0.65)";
const FONT = "'Inter', 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif";

// ─── Utility Hooks ────────────────────────────────────────────────────────────
function useSpring(frame: number, delay = 0, damping = 14, mass = 0.8) {
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, mass, stiffness: 100 } });
}

// ─── Shared Background ────────────────────────────────────────────────────────
const GridBg: React.FC = () => (
  <svg
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
  >
    <defs>
      <pattern id="mgrid" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#mgrid)" />
  </svg>
);

const AmbientGlow: React.FC<{ x?: string; y?: string; color?: string; opacity?: number }> = ({
  x = "50%",
  y = "30%",
  color = BLUE_GLOW,
  opacity = 0.35,
}) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: `radial-gradient(ellipse 60% 40% at ${x} ${y}, ${color}${Math.round(opacity * 255).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
    }}
  />
);

// ─── Scene 1: Hook ─────────────────────────────────────────────────────────────
const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1Spring = useSpring(frame, 0, 18, 0.7);
  const line2Spring = useSpring(frame, 20, 16, 0.75);
  const line3Spring = useSpring(frame, 48, 20, 0.8);

  const line1Y = interpolate(line1Spring, [0, 1], [60, 0]);
  const line2Y = interpolate(line2Spring, [0, 1], [50, 0]);
  const line3Y = interpolate(line3Spring, [0, 1], [40, 0]);

  const line1Opacity = interpolate(line1Spring, [0, 0.4, 1], [0, 0, 1]);
  const line2Opacity = interpolate(line2Spring, [0, 0.4, 1], [0, 0, 1]);
  const line3Opacity = interpolate(line3Spring, [0, 0.4, 1], [0, 0, 1]);

  const line1Scale = interpolate(line1Spring, [0, 1], [0.85, 1]);
  const line2Scale = interpolate(line2Spring, [0, 1], [0.9, 1]);

  // Pulsing glow on "verlierst du Kunden"
  const glowPulse = interpolate(
    Math.sin((frame / fps) * Math.PI * 2),
    [-1, 1],
    [0.7, 1]
  );

  // Background UI elements (blurred mock screens)
  const bgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: BG_DARK, fontFamily: FONT, overflow: "hidden" }}>
      <GridBg />
      <AmbientGlow x="30%" y="20%" color={BLUE_GLOW} opacity={0.25} />
      <AmbientGlow x="70%" y="70%" color="#1E40AF" opacity={0.2} />

      {/* Background mock browser UI */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: bgOpacity * 0.12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MockBrowser blur={20} style={{ width: 800, height: 520, transform: "rotate(-3deg) scale(1.2)" }} />
      </div>

      {/* Main Text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 60px",
          gap: 0,
        }}
      >
        {/* Eyebrow label */}
        <div
          style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              background: "rgba(59,130,246,0.15)",
              border: "1px solid rgba(59,130,246,0.4)",
              borderRadius: 999,
              padding: "10px 28px",
              color: BLUE_LIGHT,
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Achtung!
          </div>
        </div>

        {/* Line 1 */}
        <div
          style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px) scale(${line1Scale})`,
            textAlign: "center",
            marginBottom: 28,
          }}
        >
          <span
            style={{
              fontSize: 88,
              fontWeight: 800,
              color: WHITE,
              lineHeight: 1.05,
              letterSpacing: -2,
              display: "block",
            }}
          >
            Noch keine
          </span>
          <span
            style={{
              fontSize: 88,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              display: "block",
              background: `linear-gradient(135deg, ${BLUE_LIGHT} 0%, #818CF8 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            professionelle
          </span>
          <span
            style={{
              fontSize: 88,
              fontWeight: 800,
              color: WHITE,
              lineHeight: 1.05,
              letterSpacing: -2,
              display: "block",
            }}
          >
            Website?
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
            width: 80,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${BLUE_PRIMARY}, transparent)`,
            borderRadius: 2,
            marginBottom: 36,
          }}
        />

        {/* Line 2 – Impact */}
        <div
          style={{
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px) scale(${line2Scale})`,
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: 62,
              fontWeight: 700,
              color: WHITE_DIM,
              lineHeight: 1.2,
              display: "block",
            }}
          >
            Dann{" "}
            <span
              style={{
                color: "#EF4444",
                textShadow: `0 0 ${30 * glowPulse}px rgba(239,68,68,0.7)`,
              }}
            >
              verlierst du
            </span>
          </span>
          <span
            style={{
              fontSize: 62,
              fontWeight: 700,
              color: WHITE_DIM,
              lineHeight: 1.2,
              display: "block",
            }}
          >
            täglich{" "}
            <span
              style={{
                color: "#EF4444",
                textShadow: `0 0 ${30 * glowPulse}px rgba(239,68,68,0.7)`,
              }}
            >
              Kunden.
            </span>
          </span>
        </div>
      </div>

      {/* Bottom blur gradient */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background: `linear-gradient(to bottom, transparent, ${BG_DARK})`,
        }}
      />
    </AbsoluteFill>
  );
};

// ─── Mock Browser Component ───────────────────────────────────────────────────
const MockBrowser: React.FC<{
  blur?: number;
  style?: React.CSSProperties;
  modern?: boolean;
}> = ({ blur = 0, style, modern = false }) => (
  <div
    style={{
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: modern
        ? `0 40px 120px rgba(59,130,246,0.3), 0 0 0 1px rgba(59,130,246,0.2)`
        : `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)`,
      filter: blur ? `blur(${blur}px)` : undefined,
      ...style,
    }}
  >
    {/* Browser chrome */}
    <div
      style={{
        background: modern ? "#0F172A" : "#1C1C1E",
        padding: "14px 20px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        borderBottom: modern
          ? "1px solid rgba(59,130,246,0.2)"
          : "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
        <div
          key={i}
          style={{ width: 13, height: 13, borderRadius: "50%", background: c }}
        />
      ))}
      <div
        style={{
          flex: 1,
          marginLeft: 12,
          background: modern ? "rgba(59,130,246,0.1)" : "rgba(255,255,255,0.06)",
          borderRadius: 6,
          height: 26,
          border: modern ? "1px solid rgba(59,130,246,0.2)" : "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          paddingLeft: 12,
        }}
      >
        <span style={{ fontSize: 13, color: modern ? BLUE_LIGHT : WHITE_DIM }}>
          {modern ? "https://mado-webdesign.de" : "http://meine-website.de"}
        </span>
      </div>
    </div>
    {/* Browser content */}
    <div
      style={{
        background: modern ? "#060B18" : "#2A2A2F",
        height: "calc(100% - 54px)",
        padding: modern ? 24 : 16,
        display: "flex",
        flexDirection: "column",
        gap: modern ? 16 : 10,
      }}
    >
      {modern ? <ModernWebContent /> : <OldWebContent />}
    </div>
  </div>
);

const OldWebContent: React.FC = () => (
  <>
    {/* Old ugly nav */}
    <div style={{ display: "flex", gap: 8 }}>
      {["#555", "#666", "#555", "#666"].map((c, i) => (
        <div
          key={i}
          style={{ height: 22, width: [60, 80, 70, 90][i], background: c, borderRadius: 2 }}
        />
      ))}
    </div>
    {/* Header banner - ugly */}
    <div
      style={{
        height: 140,
        background: "linear-gradient(135deg, #3a7bd5, #00d2ff)",
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: 160, height: 28, background: "rgba(255,255,255,0.3)", borderRadius: 2 }} />
    </div>
    {/* Content blocks */}
    {[120, 80, 100].map((w, i) => (
      <div key={i} style={{ height: 14, width: `${w}%`, background: "#555", borderRadius: 2, maxWidth: "100%" }} />
    ))}
    <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ flex: 1, height: 80, background: "#444", borderRadius: 4 }} />
      ))}
    </div>
  </>
);

const ModernWebContent: React.FC = () => (
  <>
    {/* Clean nav */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ width: 100, height: 20, background: BLUE_PRIMARY, borderRadius: 4 }} />
      <div style={{ display: "flex", gap: 20 }}>
        {[60, 70, 50].map((w, i) => (
          <div key={i} style={{ width: w, height: 14, background: "rgba(255,255,255,0.2)", borderRadius: 3 }} />
        ))}
      </div>
    </div>
    {/* Hero */}
    <div
      style={{
        flex: 1,
        background: `linear-gradient(135deg, rgba(59,130,246,0.3) 0%, rgba(30,64,175,0.2) 100%)`,
        borderRadius: 12,
        border: "1px solid rgba(59,130,246,0.3)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: 20,
      }}
    >
      <div style={{ width: 200, height: 28, background: WHITE, borderRadius: 6, opacity: 0.9 }} />
      <div style={{ width: 160, height: 16, background: "rgba(255,255,255,0.4)", borderRadius: 4 }} />
      <div
        style={{
          width: 120,
          height: 36,
          background: BLUE_PRIMARY,
          borderRadius: 8,
          marginTop: 8,
          boxShadow: `0 0 20px rgba(59,130,246,0.5)`,
        }}
      />
    </div>
    {/* Cards */}
    <div style={{ display: "flex", gap: 12 }}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: 64,
            background: "rgba(59,130,246,0.1)",
            borderRadius: 10,
            border: "1px solid rgba(59,130,246,0.2)",
          }}
        />
      ))}
    </div>
  </>
);

// ─── Scene 2: Features ─────────────────────────────────────────────────────────
const features = [
  { icon: "✓", text: "Modernes Design", delay: 0 },
  { icon: "✓", text: "Mobile Optimiert", delay: 10 },
  { icon: "✓", text: "Schnelle Ladezeiten", delay: 20 },
  { icon: "✓", text: "Mehr Kundenanfragen", delay: 30 },
];

const FeatureItem: React.FC<{ icon: string; text: string; delay: number; frame: number }> = ({
  icon,
  text,
  delay,
  frame,
}) => {
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, mass: 0.7, stiffness: 120 },
  });
  const x = interpolate(progress, [0, 1], [-80, 0]);
  const opacity = interpolate(progress, [0, 0.3, 1], [0, 0, 1]);
  const scale = interpolate(progress, [0, 1], [0.85, 1]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
        opacity,
        transform: `translateX(${x}px) scale(${scale})`,
        padding: "20px 32px",
        background: "rgba(59,130,246,0.08)",
        borderRadius: 20,
        border: "1px solid rgba(59,130,246,0.25)",
        backdropFilter: "blur(10px)",
        boxShadow: `0 0 30px rgba(59,130,246,0.1), inset 0 1px 0 rgba(255,255,255,0.06)`,
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${BLUE_PRIMARY}, #6366F1)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 26,
          fontWeight: 700,
          color: WHITE,
          flexShrink: 0,
          boxShadow: `0 0 20px rgba(59,130,246,0.4)`,
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontSize: 52,
          fontWeight: 700,
          color: WHITE,
          letterSpacing: -1,
          fontFamily: FONT,
        }}
      >
        {text}
      </span>
    </div>
  );
};

const Scene2Features: React.FC = () => {
  const frame = useCurrentFrame();

  const titleSpring = useSpring(frame, 0, 16, 0.75);
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 0.4, 1], [0, 0, 1]);

  return (
    <AbsoluteFill style={{ background: BG_DARK, fontFamily: FONT, overflow: "hidden" }}>
      <GridBg />
      <AmbientGlow x="80%" y="10%" color={BLUE_GLOW} opacity={0.3} />
      <AmbientGlow x="20%" y="90%" color="#312E81" opacity={0.25} />

      {/* Floating browser mockup */}
      <div
        style={{
          position: "absolute",
          right: -120,
          top: "50%",
          transform: "translateY(-50%) rotate(8deg)",
          opacity: 0.18,
          width: 500,
          height: 380,
        }}
      >
        <MockBrowser modern style={{ width: "100%", height: "100%" }} />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 72px",
          gap: 28,
        }}
      >
        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              color: BLUE_LIGHT,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Was du bekommst
          </div>
          <div style={{ width: 60, height: 3, background: BLUE_PRIMARY, borderRadius: 2 }} />
        </div>

        {/* Feature list */}
        {features.map((f) => (
          <FeatureItem
            key={f.text}
            icon={f.icon}
            text={f.text}
            delay={f.delay + 8}
            frame={frame}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 3: Transformation ────────────────────────────────────────────────────
const Scene3Transform: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // morph progress 0→1 over frames 20-80
  const morphProgress = interpolate(frame, [15, 75], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const eased = morphProgress < 0.5
    ? 4 * morphProgress * morphProgress * morphProgress
    : 1 - Math.pow(-2 * morphProgress + 2, 3) / 2;

  const titleProgress = spring({ frame: frame - 85, fps, config: { damping: 14, mass: 0.7 } });
  const subtitle1Progress = spring({ frame: frame - 105, fps, config: { damping: 16, mass: 0.75 } });
  const subtitle2Progress = spring({ frame: frame - 125, fps, config: { damping: 16, mass: 0.75 } });

  const glowOpacity = interpolate(eased, [0.3, 0.7, 1], [0, 0.8, 0.3]);

  const scanlineY = interpolate(eased, [0, 1], [-50, 110]);

  const badgeOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: BG_DARK, fontFamily: FONT, overflow: "hidden" }}>
      <GridBg />
      <AmbientGlow x="50%" y="40%" color={BLUE_GLOW} opacity={0.2 + eased * 0.15} />

      {/* Label before/after */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          opacity: badgeOpacity,
        }}
      >
        <div
          style={{
            padding: "10px 32px",
            background: "rgba(239,68,68,0.15)",
            border: "1px solid rgba(239,68,68,0.35)",
            borderRadius: 999,
            color: "#EF4444",
            fontSize: 26,
            fontWeight: 700,
            opacity: interpolate(eased, [0, 0.4], [1, 0.3], { extrapolateRight: "clamp" }),
          }}
        >
          Vorher
        </div>
        <div
          style={{
            padding: "10px 32px",
            background: "rgba(59,130,246,0.15)",
            border: "1px solid rgba(59,130,246,0.4)",
            borderRadius: 999,
            color: BLUE_LIGHT,
            fontSize: 26,
            fontWeight: 700,
            opacity: interpolate(eased, [0.6, 1], [0.3, 1], { extrapolateLeft: "clamp" }),
          }}
        >
          Nachher
        </div>
      </div>

      {/* Browser morphing */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "42%",
          transform: "translate(-50%, -50%)",
          width: 840,
          height: 560,
        }}
      >
        {/* Old browser fades out */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: interpolate(eased, [0, 0.5], [1, 0], { extrapolateRight: "clamp" }),
          }}
        >
          <MockBrowser style={{ width: "100%", height: "100%" }} />
        </div>

        {/* Scanline sweep effect */}
        {eased > 0.05 && eased < 0.98 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              borderRadius: 16,
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: `${scanlineY}%`,
                height: "12%",
                background: `linear-gradient(to bottom,
                  transparent,
                  rgba(59,130,246,${glowOpacity * 0.6}) 30%,
                  rgba(96,165,250,${glowOpacity}) 50%,
                  rgba(59,130,246,${glowOpacity * 0.6}) 70%,
                  transparent
                )`,
                filter: "blur(6px)",
                transform: "scaleX(1.05)",
              }}
            />
          </div>
        )}

        {/* New browser fades in */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: interpolate(eased, [0.5, 1], [0, 1], { extrapolateLeft: "clamp" }),
            transform: `scale(${interpolate(eased, [0.5, 1], [0.96, 1], { extrapolateLeft: "clamp" })})`,
          }}
        >
          <MockBrowser modern style={{ width: "100%", height: "100%" }} />
        </div>
      </div>

      {/* Text below */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            opacity: interpolate(titleProgress, [0, 0.4, 1], [0, 0, 1]),
            transform: `translateY(${interpolate(titleProgress, [0, 1], [30, 0])}px)`,
            fontSize: 64,
            fontWeight: 800,
            color: WHITE,
            letterSpacing: -1.5,
            textAlign: "center",
          }}
        >
          Von veraltet zu{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${BLUE_LIGHT}, #818CF8)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            professionell.
          </span>
        </div>
        <div
          style={{
            opacity: interpolate(subtitle1Progress, [0, 0.4, 1], [0, 0, 1]),
            transform: `translateY(${interpolate(subtitle1Progress, [0, 1], [20, 0])}px)`,
            fontSize: 46,
            fontWeight: 600,
            color: WHITE_DIM,
            textAlign: "center",
          }}
        >
          In wenigen Tagen online.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 4: Value Props ──────────────────────────────────────────────────────
const valueProps = [
  { word: "Günstig", color: "#34D399", glow: "#059669" },
  { word: "Schnell", color: BLUE_LIGHT, glow: BLUE_GLOW },
  { word: "Professionell", color: "#A78BFA", glow: "#7C3AED" },
];

const Scene4ValueProps: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const taglineProgress = spring({ frame: frame - 60, fps, config: { damping: 14, mass: 0.8 } });

  return (
    <AbsoluteFill style={{ background: BG_DARK, fontFamily: FONT, overflow: "hidden" }}>
      <GridBg />
      <AmbientGlow x="50%" y="50%" color={BLUE_GLOW} opacity={0.2} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
          padding: "0 60px",
        }}
      >
        {valueProps.map(({ word, color, glow }, i) => {
          const progress = spring({
            frame: frame - i * 14,
            fps,
            config: { damping: 12, mass: 0.6, stiffness: 130 },
          });
          const y = interpolate(progress, [0, 1], [50, 0]);
          const opacity = interpolate(progress, [0, 0.3, 1], [0, 0, 1]);
          const scale = interpolate(progress, [0, 1], [0.8, 1]);

          // Highlight timing
          const highlightStart = i * 14 + 10;
          const highlightProgress = interpolate(
            frame,
            [highlightStart, highlightStart + 20],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={word}
              style={{
                opacity,
                transform: `translateY(${y}px) scale(${scale})`,
                textAlign: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  fontSize: 104,
                  fontWeight: 900,
                  letterSpacing: -3,
                  color: interpolate(highlightProgress, [0, 1], [0, 1]) > 0.5 ? color : "rgba(255,255,255,0.25)",
                  textShadow:
                    highlightProgress > 0.5
                      ? `0 0 60px ${glow}80, 0 0 120px ${glow}40`
                      : "none",
                  transition: "color 0.3s, text-shadow 0.3s",
                  lineHeight: 1,
                }}
              >
                {word}
              </div>
              {highlightProgress > 0.5 && (
                <div
                  style={{
                    position: "absolute",
                    bottom: -6,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: `${highlightProgress * 80}%`,
                    height: 4,
                    background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                    borderRadius: 2,
                    boxShadow: `0 0 12px ${glow}`,
                  }}
                />
              )}
            </div>
          );
        })}

        {/* Tagline */}
        <div
          style={{
            opacity: interpolate(taglineProgress, [0, 0.4, 1], [0, 0, 1]),
            transform: `translateY(${interpolate(taglineProgress, [0, 1], [30, 0])}px)`,
            marginTop: 24,
            textAlign: "center",
            padding: "20px 40px",
            background: "rgba(59,130,246,0.08)",
            borderRadius: 20,
            border: "1px solid rgba(59,130,246,0.2)",
          }}
        >
          <div
            style={{
              fontSize: 46,
              fontWeight: 700,
              color: WHITE,
              letterSpacing: -0.5,
              lineHeight: 1.3,
            }}
          >
            Websites für Unternehmen,
          </div>
          <div
            style={{
              fontSize: 46,
              fontWeight: 700,
              background: `linear-gradient(135deg, ${BLUE_LIGHT}, #A78BFA)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: -0.5,
            }}
          >
            die wachsen wollen.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 5: CTA ─────────────────────────────────────────────────────────────
const Scene5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoProgress = spring({ frame, fps, config: { damping: 14, mass: 0.8, stiffness: 100 } });
  const subProgress = spring({ frame: frame - 20, fps, config: { damping: 16, mass: 0.8 } });
  const tagProgress = spring({ frame: frame - 38, fps, config: { damping: 16, mass: 0.8 } });
  const ctaProgress = spring({ frame: frame - 58, fps, config: { damping: 14, mass: 0.7 } });
  const btnProgress = spring({ frame: frame - 78, fps, config: { damping: 12, mass: 0.6, stiffness: 130 } });

  // Button pulse
  const btnPulse = interpolate(
    Math.sin((frame / fps) * Math.PI * 2.5),
    [-1, 1],
    [0.96, 1.04]
  );

  // Particle dots
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: 10 + ((i * 73) % 80),
    y: 5 + ((i * 57) % 90),
    size: 2 + (i % 3),
    opacity: 0.15 + (i % 4) * 0.06,
    animOffset: i * 0.4,
  }));

  return (
    <AbsoluteFill style={{ background: BG_DARK, fontFamily: FONT, overflow: "hidden" }}>
      <GridBg />

      {/* Atmospheric glow layers */}
      <AmbientGlow x="50%" y="30%" color={BLUE_GLOW} opacity={0.35} />
      <AmbientGlow x="20%" y="80%" color="#312E81" opacity={0.25} />
      <AmbientGlow x="80%" y="80%" color={BLUE_GLOW} opacity={0.2} />

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: BLUE_LIGHT,
            opacity:
              p.opacity *
              interpolate(
                Math.sin((frame / fps + p.animOffset) * Math.PI * 1.5),
                [-1, 1],
                [0.3, 1]
              ),
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          padding: "0 60px",
        }}
      >
        {/* Logo */}
        <div
          style={{
            opacity: interpolate(logoProgress, [0, 0.4, 1], [0, 0, 1]),
            transform: `scale(${interpolate(logoProgress, [0, 1], [0.7, 1])})`,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: BLUE_LIGHT,
              letterSpacing: 6,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            MADO
          </div>
          <div
            style={{
              fontSize: 104,
              fontWeight: 900,
              letterSpacing: -3,
              background: `linear-gradient(135deg, ${WHITE} 0%, ${BLUE_LIGHT} 60%, #818CF8 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 0.95,
              textAlign: "center",
            }}
          >
            WEBDESIGN
          </div>
          {/* Logo underline */}
          <div
            style={{
              marginTop: 12,
              height: 3,
              background: `linear-gradient(90deg, transparent, ${BLUE_PRIMARY}, #818CF8, transparent)`,
              borderRadius: 2,
              boxShadow: `0 0 20px ${BLUE_GLOW}80`,
            }}
          />
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: interpolate(subProgress, [0, 0.4, 1], [0, 0, 1]),
            transform: `translateY(${interpolate(subProgress, [0, 1], [20, 0])}px)`,
            fontSize: 42,
            fontWeight: 600,
            color: WHITE_DIM,
            textAlign: "center",
            letterSpacing: -0.5,
            marginBottom: 16,
          }}
        >
          Professionelle Websites
        </div>
        <div
          style={{
            opacity: interpolate(tagProgress, [0, 0.4, 1], [0, 0, 1]),
            transform: `translateY(${interpolate(tagProgress, [0, 1], [20, 0])}px)`,
            fontSize: 42,
            fontWeight: 600,
            color: WHITE_DIM,
            textAlign: "center",
            letterSpacing: -0.5,
            marginBottom: 52,
          }}
        >
          zum{" "}
          <span
            style={{
              color: BLUE_LIGHT,
              fontWeight: 700,
            }}
          >
            fairen Preis.
          </span>
        </div>

        {/* CTA text */}
        <div
          style={{
            opacity: interpolate(ctaProgress, [0, 0.4, 1], [0, 0, 1]),
            transform: `translateY(${interpolate(ctaProgress, [0, 1], [20, 0])}px)`,
            fontSize: 36,
            fontWeight: 600,
            color: WHITE_DIM,
            textAlign: "center",
            marginBottom: 28,
          }}
        >
          Jetzt unverbindlich anfragen
        </div>

        {/* Button */}
        <div
          style={{
            opacity: interpolate(btnProgress, [0, 0.4, 1], [0, 0, 1]),
            transform: `scale(${interpolate(btnProgress, [0, 1], [0.8, 1]) * btnPulse})`,
          }}
        >
          <div
            style={{
              padding: "28px 80px",
              background: `linear-gradient(135deg, ${BLUE_PRIMARY} 0%, #6366F1 100%)`,
              borderRadius: 100,
              display: "flex",
              alignItems: "center",
              gap: 16,
              boxShadow: `0 0 60px rgba(59,130,246,0.5), 0 0 120px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.2)`,
            }}
          >
            <span
              style={{
                fontSize: 52,
                fontWeight: 800,
                color: WHITE,
                letterSpacing: -0.5,
              }}
            >
              DM senden
            </span>
            <span style={{ fontSize: 44 }}>→</span>
          </div>
        </div>

        {/* Instagram handle hint */}
        <div
          style={{
            opacity: interpolate(btnProgress, [0, 1], [0, 0.6]),
            marginTop: 28,
            fontSize: 30,
            color: WHITE_DIM,
            fontWeight: 500,
          }}
        >
          @mado.webdesign
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Transition Overlay ────────────────────────────────────────────────────────
const FlashTransition: React.FC<{ startFrame: number; endFrame: number }> = ({
  startFrame,
  endFrame,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 4, endFrame - 4, endFrame],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(135deg, rgba(59,130,246,0.8), rgba(30,64,175,0.9))`,
        opacity,
        pointerEvents: "none",
        zIndex: 100,
      }}
    />
  );
};

// ─── Root Composition ─────────────────────────────────────────────────────────
export const MadoWebdesignReel: React.FC = () => {
  const { fps } = useVideoConfig();

  // Scene timing (in frames at 30fps)
  // Scene 1: 0-3s   = frames 0-90
  // Scene 2: 3-7s   = frames 90-210
  // Scene 3: 7-12s  = frames 210-360
  // Scene 4: 12-17s = frames 360-510
  // Scene 5: 17-20s = frames 510-600

  const s1Start = 0;
  const s2Start = 88;
  const s3Start = 208;
  const s4Start = 358;
  const s5Start = 508;
  const totalFrames = 600;

  return (
    <AbsoluteFill style={{ background: BG_DARK, fontFamily: FONT }}>
      <Sequence from={s1Start} durationInFrames={s2Start - s1Start + 8}>
        <Scene1Hook />
      </Sequence>

      <Sequence from={s2Start} durationInFrames={s3Start - s2Start + 8}>
        <Scene2Features />
      </Sequence>

      <Sequence from={s3Start} durationInFrames={s4Start - s3Start + 8}>
        <Scene3Transform />
      </Sequence>

      <Sequence from={s4Start} durationInFrames={s5Start - s4Start + 8}>
        <Scene4ValueProps />
      </Sequence>

      <Sequence from={s5Start} durationInFrames={totalFrames - s5Start}>
        <Scene5CTA />
      </Sequence>

      {/* Flash transitions between scenes */}
      <FlashTransition startFrame={s2Start - 4} endFrame={s2Start + 4} />
      <FlashTransition startFrame={s3Start - 4} endFrame={s3Start + 4} />
      <FlashTransition startFrame={s4Start - 4} endFrame={s4Start + 4} />
      <FlashTransition startFrame={s5Start - 4} endFrame={s5Start + 4} />
    </AbsoluteFill>
  );
};
