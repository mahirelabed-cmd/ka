import { QuestionSchema, type Level, type Question } from '../schema';

/**
 * Je Station eine JSON-Datei (st01.json … st12.json) mit 42 Fragen
 * (14 je Schwierigkeitsstufe). Beim Laden wird mit zod validiert.
 */
const modules = import.meta.glob('./st*.json', {
  eager: true,
}) as Record<string, { default: unknown[] }>;

const cache = new Map<string, Question[]>();

function allForStation(station: number): Question[] {
  const key = `./st${String(station).padStart(2, '0')}.json`;
  const mod = modules[key];
  if (!mod) return [];
  return mod.default.map((raw) => QuestionSchema.parse(raw));
}

export function getQuestionPool(station: number, level: Level): Question[] {
  const cacheKey = `${station}-${level}`;
  const hit = cache.get(cacheKey);
  if (hit) return hit;
  const pool = allForStation(station).filter((q) => q.level === level);
  cache.set(cacheKey, pool);
  return pool;
}
