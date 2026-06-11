import { z } from 'zod';
import { LevelSchema, STATION_COUNT, type Level } from '../data/schema';

/**
 * Spielstand mit Versionierung. Bei künftigen Formatänderungen wird
 * `saveVersion` erhöht und in `migrate()` ein Migrationsschritt ergänzt.
 */
export const SAVE_VERSION = 1;
export const SAVE_KEY = 'sira-save';

const StationStatsSchema = z.object({
  answered: z.number().int().min(0),
  correct: z.number().int().min(0),
  attempts: z.number().int().min(0),
  bestScore: z.number().int().min(0).max(10),
});
export type StationStats = z.infer<typeof StationStatsSchema>;

const LevelProgressSchema = z.object({
  /** Nummern der bestandenen Stationen. */
  completed: z.array(z.number().int().min(1).max(STATION_COUNT)),
  /** Statistik je Station ("1".."12"). */
  stations: z.record(z.string(), StationStatsSchema),
});
export type LevelProgress = z.infer<typeof LevelProgressSchema>;

export const SaveDataSchema = z.object({
  saveVersion: z.literal(SAVE_VERSION),
  progress: z.record(LevelSchema, LevelProgressSchema),
  /** IDs gesammelter Perlen. */
  pearls: z.array(z.string()),
});
export type SaveData = z.infer<typeof SaveDataSchema>;

export function emptyLevelProgress(): LevelProgress {
  return { completed: [], stations: {} };
}

export function emptySave(): SaveData {
  return {
    saveVersion: SAVE_VERSION,
    progress: {
      kids: emptyLevelProgress(),
      youth: emptyLevelProgress(),
      adult: emptyLevelProgress(),
    },
    pearls: [],
  };
}

/**
 * Migrationspfad: hebt ältere Spielstände schrittweise auf die aktuelle
 * Version. Unbekannte/zukünftige Versionen führen zu einem frischen Stand
 * (kein Datenverlust-Risiko: wir überschreiben erst beim nächsten Speichern).
 */
export function migrate(raw: unknown): SaveData {
  if (typeof raw !== 'object' || raw === null) return emptySave();
  const version = (raw as { saveVersion?: unknown }).saveVersion;

  // Version 1 ist die erste veröffentlichte Version; ein hypothetischer
  // "Version 0"-Stand (Frühfassung ohne Versionsfeld) wird verworfen.
  if (version === SAVE_VERSION) {
    const parsed = SaveDataSchema.safeParse(raw);
    if (parsed.success) return parsed.data;
  }
  return emptySave();
}

export interface SaveStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export function loadSave(storage: SaveStorage): SaveData {
  try {
    const text = storage.getItem(SAVE_KEY);
    if (!text) return emptySave();
    return migrate(JSON.parse(text));
  } catch {
    return emptySave();
  }
}

export function persistSave(storage: SaveStorage, data: SaveData): void {
  storage.setItem(SAVE_KEY, JSON.stringify(data));
}

export function clearSave(storage: SaveStorage): void {
  storage.removeItem(SAVE_KEY);
}

/** Station n ist frei, wenn n = 1 oder Station n-1 auf dieser Stufe bestanden ist. */
export function isStationUnlocked(
  progress: LevelProgress,
  station: number,
): boolean {
  if (station < 1 || station > STATION_COUNT) return false;
  return station === 1 || progress.completed.includes(station - 1);
}

/** Nächste freigeschaltete, noch nicht bestandene Station (oder null, wenn alles geschafft). */
export function nextStation(progress: LevelProgress): number | null {
  for (let n = 1; n <= STATION_COUNT; n++) {
    if (!progress.completed.includes(n)) {
      return isStationUnlocked(progress, n) ? n : null;
    }
  }
  return null;
}

export function recordRound(
  save: SaveData,
  level: Level,
  station: number,
  correct: number,
  answered: number,
  passed: boolean,
  earnedPearlIds: string[],
): SaveData {
  const progress = save.progress[level] ?? emptyLevelProgress();
  const key = String(station);
  const prev = progress.stations[key] ?? {
    answered: 0,
    correct: 0,
    attempts: 0,
    bestScore: 0,
  };
  const stations = {
    ...progress.stations,
    [key]: {
      answered: prev.answered + answered,
      correct: prev.correct + correct,
      attempts: prev.attempts + 1,
      bestScore: Math.max(prev.bestScore, correct),
    },
  };
  const completed =
    passed && !progress.completed.includes(station)
      ? [...progress.completed, station].sort((a, b) => a - b)
      : progress.completed;
  const pearls = passed
    ? [...new Set([...save.pearls, ...earnedPearlIds])]
    : save.pearls;
  return {
    ...save,
    progress: { ...save.progress, [level]: { completed, stations } },
    pearls,
  };
}
