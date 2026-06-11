/**
 * Stilisierte Karawanen-Silhouette: zwei Kamele mit Gepäck.
 * Bewusst OHNE erkennbare Personen (Respektregel §2.1).
 */
export function CaravanSilhouette() {
  return (
    <g aria-hidden="true">
      <Camel x={0} scale={1} />
      <Camel x={-34} scale={0.8} />
    </g>
  );
}

function Camel({ x, scale }: { x: number; scale: number }) {
  return (
    <g transform={`translate(${x} 0) scale(${scale})`} fill="var(--sand-gold)">
      {/* Körper mit zwei Höckern */}
      <path d="M -12 -10 Q -10 -18 -5 -16 Q -2 -22 2 -16 Q 7 -18 10 -10 Z" />
      <rect x="-12" y="-11" width="22" height="5" rx="2" />
      {/* Hals und Kopf */}
      <path d="M 9 -10 Q 14 -12 15 -20 L 18 -20 Q 18 -16 16 -12 Q 14 -8 11 -7 Z" />
      <circle cx="17.5" cy="-20.5" r="2.2" />
      {/* Beine */}
      <rect x="-11" y="-7" width="2" height="8" />
      <rect x="-5" y="-7" width="2" height="8" />
      <rect x="3" y="-7" width="2" height="8" />
      <rect x="8" y="-7" width="2" height="8" />
      {/* Gepäckbündel */}
      <rect x="-7" y="-21" width="6" height="4" rx="1" opacity="0.85" />
    </g>
  );
}
