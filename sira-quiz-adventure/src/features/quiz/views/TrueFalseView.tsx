import type { TrueFalseQuestion } from '../../../data/schema';

interface Props {
  question: TrueFalseQuestion;
  disabled: boolean;
  selected: boolean | null;
  onSelect: (answer: boolean) => void;
}

export function TrueFalseView({ question, disabled, selected, onSelect }: Props) {
  const option = (value: boolean, label: string) => {
    const isSelected = selected === value;
    const isCorrect = question.answer === value;
    const showState = disabled && (isSelected || isCorrect);
    return (
      <button
        type="button"
        disabled={disabled}
        aria-pressed={isSelected}
        onClick={() => onSelect(value)}
        className={`flex-1 min-h-touch rounded-lg border px-4 py-3 text-body-md font-semibold transition-colors ${
          showState && isCorrect
            ? 'border-oasis bg-surface-soft'
            : showState && isSelected
              ? 'border-parchment-dim bg-surface-soft'
              : 'border-line bg-surface-soft hover:border-sand-gold'
        }`}
      >
        {label}
        {showState && isCorrect && (
          <span className="ml-2 text-oasis" aria-hidden="true">
            ✦
          </span>
        )}
      </button>
    );
  };

  return (
    <div role="group" aria-label="Stimmt die Aussage?" className="flex gap-3">
      {option(true, 'Stimmt')}
      {option(false, 'Stimmt nicht')}
    </div>
  );
}
