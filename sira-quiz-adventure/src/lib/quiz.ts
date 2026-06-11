import {
  PASS_THRESHOLD,
  ROUND_SIZE,
  type MatchQuestion,
  type MultipleChoiceQuestion,
  type OrderQuestion,
  type Question,
  type TrueFalseQuestion,
} from '../data/schema';
import { createRng, draw, shuffle } from './rng';

/** Eine zur Anzeige vorbereitete Frage mit gemischter Darstellungsreihenfolge. */
export interface PreparedQuestion {
  question: Question;
  /** multiple_choice: Anzeigereihenfolge als Indizes in `options`. */
  optionOrder?: number[];
  /** order: Anzeigereihenfolge als Indizes in `items` (gemischt). */
  itemOrder?: number[];
  /** match: Anzeigereihenfolge der rechten Seiten als Indizes in `pairs`. */
  rightOrder?: number[];
}

/**
 * Stellt eine Quiz-Runde zusammen: zieht ROUND_SIZE Fragen aus dem Pool
 * (deterministisch über den Seed, damit Wiederholungen variieren) und
 * mischt die Darstellungsreihenfolgen.
 */
export function prepareRound(pool: Question[], seed: number): PreparedQuestion[] {
  const rng = createRng(seed);
  const chosen = draw(pool, Math.min(ROUND_SIZE, pool.length), rng);
  return chosen.map((question) => {
    const prepared: PreparedQuestion = { question };
    if (question.type === 'multiple_choice') {
      prepared.optionOrder = shuffle(
        question.options.map((_, i) => i),
        rng,
      );
    } else if (question.type === 'order') {
      const indices = question.items.map((_, i) => i);
      let order = shuffle(indices, rng);
      // Nie in bereits korrekter Reihenfolge präsentieren.
      while (order.every((v, i) => v === i)) order = shuffle(indices, rng);
      prepared.itemOrder = order;
    } else if (question.type === 'match') {
      const indices = question.pairs.map((_, i) => i);
      let order = shuffle(indices, rng);
      while (order.every((v, i) => v === i)) order = shuffle(indices, rng);
      prepared.rightOrder = order;
    }
    return prepared;
  });
}

export function checkMultipleChoice(
  q: MultipleChoiceQuestion,
  selectedIndex: number,
): boolean {
  return selectedIndex === q.answerIndex;
}

export function checkTrueFalse(q: TrueFalseQuestion, answer: boolean): boolean {
  return answer === q.answer;
}

/** `arrangement`: Indizes in `q.items`, in der vom Spieler gewählten Reihenfolge. */
export function checkOrder(q: OrderQuestion, arrangement: number[]): boolean {
  return (
    arrangement.length === q.items.length &&
    arrangement.every((itemIndex, position) => itemIndex === position)
  );
}

/** `assignment[leftIndex] = rightIndex` – Zuordnung des Spielers. */
export function checkMatch(q: MatchQuestion, assignment: number[]): boolean {
  return (
    assignment.length === q.pairs.length &&
    assignment.every((rightIndex, leftIndex) => rightIndex === leftIndex)
  );
}

export function isPassed(correctCount: number): boolean {
  return correctCount >= PASS_THRESHOLD;
}
