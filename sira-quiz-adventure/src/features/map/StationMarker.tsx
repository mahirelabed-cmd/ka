import type { Station } from '../../data/schema';

export type StationState = 'locked' | 'next' | 'unlocked' | 'completed';

interface Props {
  station: Station;
  state: StationState;
  onSelect: (station: Station) => void;
}

/** Achtzackiger Stern als Kapitelmarker. */
function eightPointStar(cx: number, cy: number, r: number): string {
  const points: string[] = [];
  for (let i = 0; i < 16; i++) {
    const angle = (Math.PI / 8) * i - Math.PI / 2;
    const radius = i % 2 === 0 ? r : r * 0.45;
    points.push(
      `${(cx + radius * Math.cos(angle)).toFixed(1)},${(cy + radius * Math.sin(angle)).toFixed(1)}`,
    );
  }
  return points.join(' ');
}

export function StationMarker({ station, state, onSelect }: Props) {
  const interactive = state !== 'locked';
  const color =
    state === 'completed'
      ? 'var(--oasis)'
      : state === 'locked'
        ? 'var(--parchment-dim)'
        : 'var(--sand-gold)';

  const label =
    `Station ${station.id}: ${station.name}. ` +
    (state === 'locked'
      ? 'Noch gesperrt.'
      : state === 'completed'
        ? 'Abgeschlossen – Wiederholung festigt das Wissen.'
        : 'Bereit zum Spielen.');

  return (
    <g
      role={interactive ? 'button' : 'img'}
      aria-label={label}
      aria-disabled={!interactive}
      tabIndex={interactive ? 0 : -1}
      style={{ cursor: interactive ? 'pointer' : 'default' }}
      onClick={() => interactive && onSelect(station)}
      onKeyDown={(e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onSelect(station);
        }
      }}
    >
      {/* Unsichtbare größere Trefferfläche (Touch-Ziel ≥ 44px) */}
      <circle cx={station.x} cy={station.y} r={30} fill="transparent" />
      <polygon
        className={state === 'next' ? 'star-pulse' : undefined}
        points={eightPointStar(station.x, station.y, state === 'next' ? 17 : 13)}
        fill={color}
        opacity={state === 'locked' ? 0.4 : 1}
        stroke={state === 'next' ? 'var(--parchment)' : 'none'}
        strokeWidth={state === 'next' ? 1.5 : 0}
      />
      {state === 'completed' && (
        <circle cx={station.x} cy={station.y} r={4} fill="var(--parchment)" />
      )}
      <text
        x={station.x}
        y={station.y + 34}
        textAnchor="middle"
        fontSize="15"
        fontFamily="Amiri, serif"
        fill={state === 'locked' ? 'var(--parchment-dim)' : 'var(--text-main)'}
        opacity={state === 'locked' ? 0.6 : 1}
        aria-hidden="true"
      >
        {station.id}. {shortName(station.name)}
      </text>
    </g>
  );
}

function shortName(name: string): string {
  return name.length > 24 ? name.slice(0, 23).trimEnd() + '…' : name;
}
