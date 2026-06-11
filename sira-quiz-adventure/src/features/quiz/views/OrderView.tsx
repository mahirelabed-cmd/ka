import { useState, type DragEvent } from 'react';
import type { Level, OrderQuestion } from '../../../data/schema';
import { renderHonorifics } from '../../../lib/honorific';

interface Props {
  question: OrderQuestion;
  /** Anfangsreihenfolge (gemischt), Indizes in question.items. */
  itemOrder: number[];
  level: Level;
  disabled: boolean;
  onSubmit: (arrangement: number[]) => void;
}

/**
 * Chronologie-Frage: Ordnen per Drag & Drop ODER per Tastatur –
 * Ziffer 1–4 setzt das fokussierte Ereignis an diese Position,
 * zusätzlich gibt es Hoch/Runter-Schaltflächen.
 */
export function OrderView({ question, itemOrder, level, disabled, onSubmit }: Props) {
  const [arrangement, setArrangement] = useState<number[]>(itemOrder);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const move = (fromPos: number, toPos: number) => {
    if (disabled || toPos < 0 || toPos >= arrangement.length) return;
    setArrangement((arr) => {
      const next = [...arr];
      const [item] = next.splice(fromPos, 1);
      next.splice(toPos, 0, item!);
      return next;
    });
  };

  const onDrop = (e: DragEvent, toPos: number) => {
    e.preventDefault();
    if (dragIndex !== null) move(dragIndex, toPos);
    setDragIndex(null);
  };

  return (
    <div>
      <p className="mb-2 font-ui text-ui-sm text-text-dim">
        Bringe die Ereignisse in die richtige Reihenfolge: Ziehe sie mit der
        Maus, nutze die Pfeil-Schaltflächen oder drücke bei fokussiertem
        Ereignis die Ziffer der Zielposition (1–{arrangement.length}).
      </p>
      <ol className="space-y-2" aria-label="Ereignisse zum Ordnen">
        {arrangement.map((itemIndex, pos) => (
          <li
            key={itemIndex}
            draggable={!disabled}
            onDragStart={() => setDragIndex(pos)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, pos)}
            tabIndex={disabled ? -1 : 0}
            aria-label={`Position ${pos + 1}: ${question.items[itemIndex]}. Ziffer drücken, um die Position zu ändern.`}
            onKeyDown={(e) => {
              const num = Number(e.key);
              if (num >= 1 && num <= arrangement.length) {
                e.preventDefault();
                move(pos, num - 1);
              }
            }}
            className="flex min-h-touch items-center gap-2 rounded-lg border border-line bg-surface-soft px-3 py-2"
          >
            <span
              aria-hidden="true"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-sand-gold font-ui text-ui-sm text-sand-gold"
            >
              {pos + 1}
            </span>
            <span className="flex-1 text-body-md">
              {renderHonorifics(question.items[itemIndex]!, level)}
            </span>
            <span className="flex shrink-0 gap-1">
              <button
                type="button"
                disabled={disabled || pos === 0}
                aria-label={`„${question.items[itemIndex]}" nach oben`}
                onClick={() => move(pos, pos - 1)}
                className="min-h-touch min-w-touch rounded border border-line px-2 font-ui disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                disabled={disabled || pos === arrangement.length - 1}
                aria-label={`„${question.items[itemIndex]}" nach unten`}
                onClick={() => move(pos, pos + 1)}
                className="min-h-touch min-w-touch rounded border border-line px-2 font-ui disabled:opacity-30"
              >
                ↓
              </button>
            </span>
          </li>
        ))}
      </ol>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onSubmit(arrangement)}
        className="mt-4 min-h-touch rounded-lg bg-sand-gold px-6 py-3 font-ui text-ui-md font-semibold text-night hover:brightness-110 disabled:opacity-50"
      >
        Reihenfolge bestätigen
      </button>
    </div>
  );
}
