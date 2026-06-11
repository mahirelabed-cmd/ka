import { describe, expect, it } from 'vitest';
import type {
  MatchQuestion,
  MultipleChoiceQuestion,
  OrderQuestion,
  Question,
  TrueFalseQuestion,
} from '../src/data/schema';
import {
  checkMatch,
  checkMultipleChoice,
  checkOrder,
  checkTrueFalse,
  isPassed,
  prepareRound,
} from '../src/lib/quiz';
import { createRng, draw, shuffle } from '../src/lib/rng';

function mc(id: number): MultipleChoiceQuestion {
  return {
    id: `st01-kids-${String(id).padStart(3, '0')}`,
    station: 1,
    level: 'kids',
    type: 'multiple_choice',
    question: 'Testfrage?',
    options: ['A', 'B', 'C', 'D'],
    answerIndex: 1,
    explanation: 'Eine Erklärung zur Antwort.',
    source: 'Testquelle',
    pearlId: 'pearl-test',
  };
}

describe('Punkteberechnung je Fragetyp', () => {
  it('multiple_choice', () => {
    const q = mc(1);
    expect(checkMultipleChoice(q, 1)).toBe(true);
    expect(checkMultipleChoice(q, 0)).toBe(false);
  });

  it('true_false', () => {
    const q: TrueFalseQuestion = { ...mc(2), type: 'true_false', answer: false } as TrueFalseQuestion;
    expect(checkTrueFalse(q, false)).toBe(true);
    expect(checkTrueFalse(q, true)).toBe(false);
  });

  it('order: nur die exakte Chronologie zählt', () => {
    const q: OrderQuestion = {
      ...mc(3),
      type: 'order',
      items: ['Erstes', 'Zweites', 'Drittes'],
    } as OrderQuestion;
    expect(checkOrder(q, [0, 1, 2])).toBe(true);
    expect(checkOrder(q, [1, 0, 2])).toBe(false);
    expect(checkOrder(q, [0, 1])).toBe(false);
  });

  it('match: alle Paare müssen stimmen', () => {
    const q: MatchQuestion = {
      ...mc(4),
      type: 'match',
      pairs: [
        { left: 'L1', right: 'R1' },
        { left: 'L2', right: 'R2' },
        { left: 'L3', right: 'R3' },
      ],
    } as MatchQuestion;
    expect(checkMatch(q, [0, 1, 2])).toBe(true);
    expect(checkMatch(q, [1, 0, 2])).toBe(false);
  });

  it('bestanden ab 7 von 10', () => {
    expect(isPassed(6)).toBe(false);
    expect(isPassed(7)).toBe(true);
    expect(isPassed(10)).toBe(true);
  });
});

describe('Fragenziehung', () => {
  const pool: Question[] = Array.from({ length: 14 }, (_, i) => mc(i + 1));

  it('zieht 10 verschiedene Fragen aus dem 14er-Pool', () => {
    const round = prepareRound(pool, 42);
    expect(round).toHaveLength(10);
    const ids = new Set(round.map((p) => p.question.id));
    expect(ids.size).toBe(10);
  });

  it('ist deterministisch je Seed und variiert zwischen Seeds', () => {
    const a = prepareRound(pool, 7).map((p) => p.question.id);
    const b = prepareRound(pool, 7).map((p) => p.question.id);
    expect(a).toEqual(b);

    const variants = new Set(
      [1, 2, 3, 4, 5, 6, 7, 8].map((seed) =>
        prepareRound(pool, seed)
          .map((p) => p.question.id)
          .join(','),
      ),
    );
    expect(variants.size).toBeGreaterThan(1);
  });

  it('mischt Antwortoptionen, behält aber alle 4 Indizes', () => {
    const round = prepareRound(pool, 99);
    for (const p of round) {
      expect([...p.optionOrder!].sort()).toEqual([0, 1, 2, 3]);
    }
  });

  it('präsentiert order-Fragen nie in bereits korrekter Reihenfolge', () => {
    const orderQ: OrderQuestion = {
      ...mc(1),
      type: 'order',
      items: ['a', 'b', 'c'],
    } as OrderQuestion;
    for (let seed = 0; seed < 50; seed++) {
      const [p] = prepareRound([orderQ], seed);
      expect(p!.itemOrder!.every((v, i) => v === i)).toBe(false);
    }
  });
});

describe('Seed-Zufall', () => {
  it('shuffle mutiert das Original nicht', () => {
    const original = [1, 2, 3, 4, 5];
    shuffle(original, createRng(1));
    expect(original).toEqual([1, 2, 3, 4, 5]);
  });

  it('draw liefert die gewünschte Anzahl ohne Duplikate', () => {
    const result = draw([1, 2, 3, 4, 5, 6], 3, createRng(5));
    expect(result).toHaveLength(3);
    expect(new Set(result).size).toBe(3);
  });
});
