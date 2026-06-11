import type { MultipleChoiceQuestion } from '../../../data/schema';
import type { Level } from '../../../data/schema';
import { renderHonorifics } from '../../../lib/honorific';

interface Props {
  question: MultipleChoiceQuestion;
  optionOrder: number[];
  level: Level;
  disabled: boolean;
  /** Durch den Joker „Rat des Gefährten" entfernte Options-Indizes. */
  removedOptions: number[];
  selectedIndex: number | null;
  onSelect: (optionIndex: number) => void;
}

export function MultipleChoiceView({
  question,
  optionOrder,
  level,
  disabled,
  removedOptions,
  selectedIndex,
  onSelect,
}: Props) {
  return (
    <div role="group" aria-label="Antwortmöglichkeiten" className="space-y-2">
      {optionOrder.map((optionIndex) => {
        const removed = removedOptions.includes(optionIndex);
        const isSelected = selectedIndex === optionIndex;
        const isCorrect = optionIndex === question.answerIndex;
        const showState = disabled && (isSelected || isCorrect);
        return (
          <button
            key={optionIndex}
            type="button"
            disabled={disabled || removed}
            aria-pressed={isSelected}
            onClick={() => onSelect(optionIndex)}
            className={`block w-full min-h-touch rounded-lg border px-4 py-3 text-left text-body-md transition-colors ${
              removed
                ? 'border-line opacity-30 line-through'
                : showState && isCorrect
                  ? 'border-oasis bg-surface-soft font-semibold'
                  : showState && isSelected
                    ? 'border-parchment-dim bg-surface-soft'
                    : 'border-line bg-surface-soft hover:border-sand-gold'
            }`}
          >
            {renderHonorifics(question.options[optionIndex]!, level)}
            {showState && isCorrect && (
              <span className="ml-2 text-oasis" aria-hidden="true">
                ✦
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
