import { stations } from '../../data/stations';

export const MAP_VIEWBOX = { width: 700, height: 1100 };

/** Sanft geschwungener Pfadabschnitt zwischen zwei Punkten. */
export function segmentPath(
  from: { x: number; y: number },
  to: { x: number; y: number },
): string {
  const midX = (from.x + to.x) / 2 + (from.y > to.y ? 28 : -28);
  const midY = (from.y + to.y) / 2;
  return `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
}

/** Gesamte Karawanenroute durch alle 12 Stationen. */
export function fullRoutePath(): string {
  let d = `M ${stations[0]!.x} ${stations[0]!.y}`;
  for (let i = 1; i < stations.length; i++) {
    const from = stations[i - 1]!;
    const to = stations[i]!;
    const midX = (from.x + to.x) / 2 + (i % 2 === 0 ? -28 : 28);
    const midY = (from.y + to.y) / 2;
    d += ` Q ${midX} ${midY} ${to.x} ${to.y}`;
  }
  return d;
}

/** Deterministisch verteilte Sterne für den Nachthimmel. */
export function starField(count: number): { x: number; y: number; r: number; delay: number }[] {
  const result = [];
  let seed = 7;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let i = 0; i < count; i++) {
    result.push({
      x: Math.round(rnd() * MAP_VIEWBOX.width),
      y: Math.round(rnd() * MAP_VIEWBOX.height),
      r: 0.8 + rnd() * 1.6,
      delay: rnd() * 4,
    });
  }
  return result;
}
