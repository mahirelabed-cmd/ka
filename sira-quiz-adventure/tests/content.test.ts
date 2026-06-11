import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { pearls } from '../src/data/pearls';
import {
  PearlSchema,
  QuestionSchema,
  StationSchema,
  type Question,
} from '../src/data/schema';
import { stations } from '../src/data/stations';

const questionsDir = join(__dirname, '../src/data/questions');

function loadAllQuestions(): Question[] {
  const files = readdirSync(questionsDir).filter((f) => /^st\d{2}\.json$/.test(f));
  return files.flatMap((f) => {
    const raw = JSON.parse(readFileSync(join(questionsDir, f), 'utf8')) as unknown[];
    return raw.map((q) => QuestionSchema.parse(q));
  });
}

/** Regel §2.2: Nach „Muhammad"/„der Prophet" steht immer ﷺ. */
const MUHAMMAD_VIOLATION = /\bMuhammads?\b(?! ﷺ)/u;
const PROPHET_VIOLATION = /\bProphet(?:en|s)?\b(?! ﷺ)/u;

function textsOf(q: Question): string[] {
  const texts = [q.question, q.explanation];
  if (q.type === 'multiple_choice') texts.push(...q.options);
  if (q.type === 'order') texts.push(...q.items);
  if (q.type === 'match') texts.push(...q.pairs.flatMap((p) => [p.left, p.right]));
  return texts;
}

describe('Inhalte: Stationen & Perlen', () => {
  it('12 Stationen, alle schema-gültig', () => {
    expect(stations).toHaveLength(12);
    for (const s of stations) StationSchema.parse(s);
    expect(stations.map((s) => s.id)).toEqual(
      Array.from({ length: 12 }, (_, i) => i + 1),
    );
  });

  it('36 Perlen (3 je Station), alle schema-gültig und referenziert', () => {
    expect(pearls).toHaveLength(36);
    for (const p of pearls) PearlSchema.parse(p);
    for (const s of stations) {
      const stationPearls = pearls.filter((p) => p.station === s.id);
      expect(stationPearls.map((p) => p.id).sort()).toEqual([...s.pearlIds].sort());
    }
  });

  it('Perlen-Lektionen respektieren die Ehrtitel-Regel', () => {
    for (const p of pearls) {
      expect(p.lesson).not.toMatch(MUHAMMAD_VIOLATION);
      expect(p.lesson).not.toMatch(PROPHET_VIOLATION);
    }
  });
});

describe('Inhalte: Fragen (504 gesamt)', () => {
  const questions = loadAllQuestions();

  it('genau 14 Fragen je Station und Stufe (= 504 gesamt)', () => {
    expect(questions.length).toBe(504);
    for (let station = 1; station <= 12; station++) {
      for (const level of ['kids', 'youth', 'adult'] as const) {
        const pool = questions.filter(
          (q) => q.station === station && q.level === level,
        );
        expect(pool, `Station ${station}, Stufe ${level}`).toHaveLength(14);
      }
    }
  });

  it('alle IDs eindeutig und konsistent mit station/level', () => {
    const ids = new Set<string>();
    for (const q of questions) {
      expect(ids.has(q.id), `Doppelte ID ${q.id}`).toBe(false);
      ids.add(q.id);
      expect(q.id.startsWith(`st${String(q.station).padStart(2, '0')}-${q.level}-`)).toBe(
        true,
      );
    }
  });

  it('jede pearlId gehört zu den 3 Perlen der jeweiligen Station', () => {
    for (const q of questions) {
      const station = stations.find((s) => s.id === q.station)!;
      expect(station.pearlIds, `${q.id}: ${q.pearlId}`).toContain(q.pearlId);
    }
  });

  it('alle 4 Fragetypen kommen in jeder Stufe jeder Station vor', () => {
    for (let station = 1; station <= 12; station++) {
      for (const level of ['kids', 'youth', 'adult'] as const) {
        const types = new Set(
          questions
            .filter((q) => q.station === station && q.level === level)
            .map((q) => q.type),
        );
        expect(types, `Station ${station}, Stufe ${level}`).toEqual(
          new Set(['multiple_choice', 'true_false', 'order', 'match']),
        );
      }
    }
  });

  it('Ehrtitel-Regel (§2.2) in allen Fragetexten eingehalten', () => {
    for (const q of questions) {
      for (const text of textsOf(q)) {
        expect(text, `${q.id}: „${text}"`).not.toMatch(MUHAMMAD_VIOLATION);
        expect(text, `${q.id}: „${text}"`).not.toMatch(PROPHET_VIOLATION);
      }
    }
  });

  it('Kinder-Stufe: keine Jahreszahlen-Abfragen', () => {
    const yearPattern = /\b(5[7-9]\d|6[0-3]\d)\b/;
    for (const q of questions.filter((q) => q.level === 'kids')) {
      expect(q.question, q.id).not.toMatch(yearPattern);
      if (q.type === 'multiple_choice') {
        for (const o of q.options) expect(o, q.id).not.toMatch(yearPattern);
      }
    }
  });

  it('true_false-Antworten sind gemischt (nicht alle gleich)', () => {
    for (let station = 1; station <= 12; station++) {
      const tf = questions.filter(
        (q) => q.station === station && q.type === 'true_false',
      );
      const answers = new Set(tf.map((q) => (q as { answer: boolean }).answer));
      expect(answers.size, `Station ${station}`).toBe(2);
    }
  });
});
