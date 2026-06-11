import { getPearl } from '../../data/pearls';
import type { Level, Question } from '../../data/schema';
import { renderHonorifics } from '../../lib/honorific';

interface Props {
  question: Question;
  level: Level;
  adviceLeft: number;
  reflectionLeft: number;
  adviceUsedHere: boolean;
  disabled: boolean;
  onUseAdvice: () => void;
  onUseReflection: () => void;
  reflectionText: string | null;
  onCloseReflection: () => void;
}

/** Joker-Leiste: „Rat des Gefährten" und „Moment der Besinnung". */
export function JokerBar({
  question,
  level,
  adviceLeft,
  reflectionLeft,
  adviceUsedHere,
  disabled,
  onUseAdvice,
  onUseReflection,
  reflectionText,
  onCloseReflection,
}: Props) {
  const adviceUsable =
    question.type === 'multiple_choice' && adviceLeft > 0 && !adviceUsedHere && !disabled;
  const pearl = getPearl(question.pearlId);
  const reflectionUsable = reflectionLeft > 0 && !disabled && !!pearl;

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Joker">
        <button
          type="button"
          disabled={!adviceUsable}
          onClick={onUseAdvice}
          title={
            question.type !== 'multiple_choice'
              ? 'Nur bei Auswahlfragen einsetzbar'
              : undefined
          }
          className="min-h-touch rounded-lg border border-line bg-surface-soft px-4 py-2 font-ui text-ui-sm hover:border-sand-gold disabled:opacity-40"
        >
          <span aria-hidden="true">🤝</span> Rat des Gefährten ({adviceLeft})
        </button>
        <button
          type="button"
          disabled={!reflectionUsable}
          onClick={onUseReflection}
          className="min-h-touch rounded-lg border border-line bg-surface-soft px-4 py-2 font-ui text-ui-sm hover:border-sand-gold disabled:opacity-40"
        >
          <span aria-hidden="true">🌙</span> Moment der Besinnung ({reflectionLeft})
        </button>
      </div>

      {reflectionText && (
        <div
          role="note"
          aria-label="Moment der Besinnung"
          className="mt-3 rounded-lg border border-sand-gold bg-surface-soft p-3"
        >
          <p className="font-ui text-ui-sm font-semibold text-sand-gold">
            Moment der Besinnung
          </p>
          <p className="mt-1 text-body-md">{renderHonorifics(reflectionText, level)}</p>
          <button
            type="button"
            onClick={onCloseReflection}
            className="mt-2 min-h-touch rounded border border-line px-3 py-1 font-ui text-ui-sm"
          >
            Schließen
          </button>
        </div>
      )}
    </div>
  );
}
