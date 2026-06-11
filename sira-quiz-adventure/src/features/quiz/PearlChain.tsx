interface Props {
  /** true = richtig (golden), false = matt; undefined = noch offen. */
  results: (boolean | undefined)[];
  current: number;
}

/** Fortschrittsleiste als Perlenkette – keine roten Kreuze. */
export function PearlChain({ results, current }: Props) {
  const answered = results.filter((r) => r !== undefined).length;
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={results.length}
      aria-valuenow={answered}
      aria-label={`Frage ${Math.min(current + 1, results.length)} von ${results.length}`}
      className="flex items-center justify-center gap-2 py-2"
    >
      {results.map((r, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`inline-block h-4 w-4 rounded-full border ${
            r === true
              ? 'pearl-won border-sand-gold bg-sand-gold shadow-[0_0_8px_var(--sand-gold)]'
              : r === false
                ? 'border-line bg-surface-soft opacity-70'
                : i === current
                  ? 'border-sand-gold bg-transparent'
                  : 'border-line bg-transparent opacity-50'
          }`}
        />
      ))}
    </div>
  );
}
