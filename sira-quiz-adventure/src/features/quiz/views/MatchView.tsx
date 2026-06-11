import { useState } from 'react';
import type { Level, MatchQuestion } from '../../../data/schema';
import { renderHonorifics } from '../../../lib/honorific';

interface Props {
  question: MatchQuestion;
  /** Anzeigereihenfolge der rechten Seiten (gemischt), Indizes in question.pairs. */
  rightOrder: number[];
  level: Level;
  disabled: boolean;
  onSubmit: (assignment: number[]) => void;
}

/**
 * Zuordnungsfrage: Für jeden linken Begriff wird der passende rechte
 * Begriff aus einer Auswahlliste gewählt (vollständig tastaturbedienbar).
 */
export function MatchView({ question, rightOrder, level, disabled, onSubmit }: Props) {
  const [assignment, setAssignment] = useState<(number | null)[]>(
    question.pairs.map(() => null),
  );

  const complete =
    assignment.every((a) => a !== null) &&
    new Set(assignment).size === assignment.length;

  return (
    <div>
      <p className="mb-2 font-ui text-ui-sm text-text-dim">
        Ordne jedem Begriff links den passenden Begriff rechts zu. Jede
        Antwort darf nur einmal verwendet werden.
      </p>
      <ul className="space-y-3" aria-label="Zuordnungspaare">
        {question.pairs.map((pair, leftIndex) => (
          <li key={leftIndex} className="rounded-lg border border-line bg-surface-soft p-3">
            <label
              htmlFor={`match-${question.id}-${leftIndex}`}
              className="block text-body-md font-semibold"
            >
              {renderHonorifics(pair.left, level)}
            </label>
            <select
              id={`match-${question.id}-${leftIndex}`}
              disabled={disabled}
              value={assignment[leftIndex] ?? ''}
              onChange={(e) =>
                setAssignment((arr) => {
                  const next = [...arr];
                  next[leftIndex] = e.target.value === '' ? null : Number(e.target.value);
                  return next;
                })
              }
              className="mt-1 w-full min-h-touch rounded border border-line bg-surface px-2 py-2 text-body-md text-text-main"
            >
              <option value="">– bitte wählen –</option>
              {rightOrder.map((rightIndex) => (
                <option key={rightIndex} value={rightIndex}>
                  {renderHonorifics(question.pairs[rightIndex]!.right, level)}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>
      {!complete && !disabled && (
        <p className="mt-2 font-ui text-ui-sm text-text-dim">
          Wähle für jeden Begriff genau eine Antwort – jede darf nur einmal
          vorkommen.
        </p>
      )}
      <button
        type="button"
        disabled={disabled || !complete}
        onClick={() => onSubmit(assignment as number[])}
        className="mt-4 min-h-touch rounded-lg bg-sand-gold px-6 py-3 font-ui text-ui-md font-semibold text-night hover:brightness-110 disabled:opacity-50"
      >
        Zuordnung bestätigen
      </button>
    </div>
  );
}
