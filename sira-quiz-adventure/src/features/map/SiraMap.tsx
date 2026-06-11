import { useEffect, useMemo, useRef, useState } from 'react';
import type { Station } from '../../data/schema';
import { stations } from '../../data/stations';
import { CaravanSilhouette } from './Caravan';
import { fullRoutePath, MAP_VIEWBOX, segmentPath, starField } from './mapGeometry';
import { StationMarker, type StationState } from './StationMarker';

interface Props {
  stationState: (station: Station) => StationState;
  onSelect: (station: Station) => void;
  /** Reise-Animation von Station n nach n+1 (nach bestandener Runde). */
  travelFrom?: number;
  onTravelEnd?: () => void;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function SiraMap({ stationState, onSelect, travelFrom, onTravelEnd }: Props) {
  const stars = useMemo(() => starField(70), []);
  const [travelling, setTravelling] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const from = travelFrom ? stations.find((s) => s.id === travelFrom) : undefined;
  const to = travelFrom ? stations.find((s) => s.id === travelFrom + 1) : undefined;

  useEffect(() => {
    if (!from || !to) return;
    // Bei reduzierter Bewegung: Schnitt statt Fahrt.
    if (prefersReducedMotion()) {
      onTravelEnd?.();
      return;
    }
    setTravelling(true);
    timerRef.current = setTimeout(() => {
      setTravelling(false);
      onTravelEnd?.();
    }, 3200);
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [travelFrom]);

  const skipTravel = () => {
    clearTimeout(timerRef.current);
    setTravelling(false);
    onTravelEnd?.();
  };

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
        className="w-full"
        aria-label="Stilisierte Karte des Hidschaz mit der Reiseroute von Mekka nach Medina. Eine gleichwertige Stationsliste folgt unterhalb der Karte."
      >
        <rect width={MAP_VIEWBOX.width} height={MAP_VIEWBOX.height} fill="var(--night)" rx="12" />

        {/* Sternenhimmel */}
        <g aria-hidden="true">
          {stars.map((s, i) => (
            <circle
              key={i}
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill="var(--parchment)"
              className="twinkle"
              style={{ animationDelay: `${s.delay}s` }}
              opacity={0.5}
            />
          ))}
        </g>

        {/* Stilisiertes Meer (Richtung Abessinien) */}
        <g aria-hidden="true" opacity={0.5}>
          <path
            d="M 0 560 Q 30 580 18 620 Q 6 660 30 700 Q 50 740 28 790 L 0 790 Z"
            fill="var(--night-soft)"
            stroke="var(--line)"
          />
          <path d="M 8 620 q 10 6 20 0" stroke="var(--line)" fill="none" />
          <path d="M 12 680 q 10 6 20 0" stroke="var(--line)" fill="none" />
          <path d="M 6 740 q 10 6 20 0" stroke="var(--line)" fill="none" />
        </g>

        {/* Stilisierte Berge */}
        <g aria-hidden="true" stroke="var(--line)" fill="var(--night-soft)" opacity={0.8}>
          <path d="M 520 940 l 40 -52 l 40 52 Z" />
          <path d="M 575 950 l 30 -38 l 30 38 Z" />
          <path d="M 540 470 l 36 -46 l 36 46 Z" />
          <path d="M 120 320 l 34 -44 l 34 44 Z" />
          <path d="M 80 900 l 36 -46 l 36 46 Z" />
        </g>

        {/* Geometrisches Achteck-Ornament am Rand */}
        <OctagonBorder />

        {/* Karawanenroute */}
        <path
          d={fullRoutePath()}
          fill="none"
          stroke="var(--sand-gold)"
          strokeWidth={2.5}
          strokeDasharray="4 10"
          strokeLinecap="round"
          opacity={0.8}
          aria-hidden="true"
        />

        {/* Stationen */}
        {stations.map((station) => (
          <StationMarker
            key={station.id}
            station={station}
            state={stationState(station)}
            onSelect={onSelect}
          />
        ))}

        {/* Reise-Animation: Karawane wandert zur nächsten Station */}
        {travelling && from && to && (
          <g aria-hidden="true">
            <g>
              <CaravanSilhouette />
              <animateMotion dur="3s" fill="freeze" path={segmentPath(from, to)} />
            </g>
          </g>
        )}
      </svg>

      {travelling && (
        <button
          type="button"
          onClick={skipTravel}
          className="absolute bottom-4 right-4 min-h-touch rounded-lg border border-line bg-surface-soft px-4 py-2 font-ui text-ui-md text-text-main shadow"
        >
          Reise überspringen
        </button>
      )}
    </div>
  );
}

/** Dezentes achteckbasiertes Ornamentband oben und unten. */
function OctagonBorder() {
  const octagon = (cx: number, cy: number, r: number) => {
    const pts: string[] = [];
    for (let i = 0; i < 8; i++) {
      const a = (Math.PI / 4) * i + Math.PI / 8;
      pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
    }
    return pts.join(' ');
  };
  const xs = Array.from({ length: 9 }, (_, i) => 60 + i * 72);
  return (
    <g aria-hidden="true" stroke="var(--sand-gold)" fill="none" opacity={0.35}>
      {xs.map((x) => (
        <g key={x}>
          <polygon points={octagon(x, 24, 12)} />
          <circle cx={x} cy={24} r={3} />
          <polygon points={octagon(x, MAP_VIEWBOX.height - 24, 12)} />
          <circle cx={x} cy={MAP_VIEWBOX.height - 24} r={3} />
        </g>
      ))}
    </g>
  );
}
