import type { Pearl } from './schema';

/**
 * Das „Buch der Perlen": 36 Lektionstexte (3 je Station).
 * Die Texte werden in Schritt 5 (Inhalte) vollständig ausgeschrieben.
 */
export const pearls: Pearl[] = [];

export function getPearl(id: string): Pearl | undefined {
  return pearls.find((p) => p.id === id);
}

export function getPearlsForStation(station: number): Pearl[] {
  return pearls.filter((p) => p.station === station);
}
