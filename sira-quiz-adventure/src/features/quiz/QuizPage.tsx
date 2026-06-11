import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { getPearl } from '../../data/pearls';
import { getQuestionPool } from '../../data/questions';
import { PASS_THRESHOLD, ROUND_SIZE } from '../../data/schema';
import { getStation } from '../../data/stations';
import { renderHonorifics } from '../../lib/honorific';
import { freshSeed } from '../../lib/rng';
import {
  checkMatch,
  checkMultipleChoice,
  checkOrder,
  checkTrueFalse,
  isPassed,
  prepareRound,
} from '../../lib/quiz';
import {
  isStationUnlocked,
  useLevelProgress,
  useProgress,
} from '../progress/progressStore';
import { useSettings } from '../settings/settingsStore';
import { JokerBar } from './JokerBar';
import { PearlChain } from './PearlChain';
import { MatchView } from './views/MatchView';
import { MultipleChoiceView } from './views/MultipleChoiceView';
import { OrderView } from './views/OrderView';
import { TrueFalseView } from './views/TrueFalseView';

const QUESTION_SECONDS = 30;

type Phase = 'question' | 'feedback' | 'result';

export function QuizPage() {
  const { stationId } = useParams();
  const navigate = useNavigate();
  const level = useSettings((s) => s.level);
  const caravanMode = useSettings((s) => s.caravanMode);
  const progress = useLevelProgress(level);
  const finishRound = useProgress((s) => s.finishRound);

  const station = getStation(Number(stationId));
  const pool = useMemo(
    () => (station ? getQuestionPool(station.id, level) : []),
    [station, level],
  );

  const [seed, setSeed] = useState(freshSeed);
  const round = useMemo(() => prepareRound(pool, seed), [pool, seed]);

  const [phase, setPhase] = useState<Phase>('question');
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<(boolean | undefined)[]>(() =>
    Array(ROUND_SIZE).fill(undefined),
  );
  const [selectedMC, setSelectedMC] = useState<number | null>(null);
  const [selectedTF, setSelectedTF] = useState<boolean | null>(null);
  const [timedOut, setTimedOut] = useState(false);

  // Joker (je 2× pro Runde)
  const [adviceLeft, setAdviceLeft] = useState(2);
  const [reflectionLeft, setReflectionLeft] = useState(2);
  const [removedOptions, setRemovedOptions] = useState<Record<string, number[]>>({});
  const [reflectionText, setReflectionText] = useState<string | null>(null);

  // Karawanen-Modus (Timer) – nicht für die Kinder-Stufe
  const timerActive = caravanMode && level !== 'kids' && phase === 'question';
  const [secondsLeft, setSecondsLeft] = useState(QUESTION_SECONDS);

  const recordedRef = useRef(false);
  const correctCount = results.filter((r) => r === true).length;

  useEffect(() => {
    if (!timerActive) return;
    setSecondsLeft(QUESTION_SECONDS);
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          setResults((r) => {
            const next = [...r];
            next[index] = false;
            return next;
          });
          setTimedOut(true);
          setPhase('feedback');
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [index, timerActive, seed]);

  useEffect(() => {
    if (phase !== 'result' || recordedRef.current || !station) return;
    recordedRef.current = true;
    finishRound(
      level,
      station.id,
      correctCount,
      round.length,
      isPassed(correctCount),
      station.pearlIds,
    );
  }, [phase, station, correctCount, finishRound, level, round.length]);

  if (!station) return <Navigate to="/" replace />;
  if (!isStationUnlocked(progress, station.id)) return <Navigate to="/" replace />;

  if (pool.length === 0) {
    return (
      <section className="mx-auto max-w-xl px-4 py-6">
        <h2 className="font-display text-display-md text-sand-gold">{station.name}</h2>
        <p className="mt-3 text-body-md">
          Für diese Station sind noch keine Fragen hinterlegt.
        </p>
        <Link
          to="/"
          className="mt-4 inline-block font-ui text-ui-md text-sand-gold underline"
        >
          Zurück zur Karte
        </Link>
      </section>
    );
  }

  const prepared = round[index];
  const question = prepared?.question;

  function answer(correct: boolean) {
    setResults((r) => {
      const next = [...r];
      next[index] = correct;
      return next;
    });
    setTimedOut(false);
    setPhase('feedback');
  }

  const nextQuestion = () => {
    setSelectedMC(null);
    setSelectedTF(null);
    setReflectionText(null);
    setTimedOut(false);
    if (index + 1 >= round.length) {
      setPhase('result');
    } else {
      setIndex((i) => i + 1);
      setPhase('question');
    }
  };

  const retry = () => {
    setSeed(freshSeed());
    setIndex(0);
    setResults(Array(ROUND_SIZE).fill(undefined));
    setPhase('question');
    setSelectedMC(null);
    setSelectedTF(null);
    setAdviceLeft(2);
    setReflectionLeft(2);
    setRemovedOptions({});
    setReflectionText(null);
    setTimedOut(false);
    recordedRef.current = false;
  };

  const useAdvice = () => {
    if (!question || question.type !== 'multiple_choice') return;
    const wrong = question.options
      .map((_, i) => i)
      .filter((i) => i !== question.answerIndex);
    const toRemove = [...wrong].sort(() => Math.random() - 0.5).slice(0, 2);
    setRemovedOptions((m) => ({ ...m, [question.id]: toRemove }));
    setAdviceLeft((n) => n - 1);
  };

  const useReflection = () => {
    if (!question) return;
    const pearl = getPearl(question.pearlId);
    if (!pearl) return;
    setReflectionText(pearl.lesson);
    setReflectionLeft((n) => n - 1);
  };

  // ── Ergebnisansicht ──────────────────────────────────────────────
  if (phase === 'result') {
    const passed = isPassed(correctCount);
    const stationPearls = station.pearlIds
      .map((id) => getPearl(id))
      .filter((p) => p !== undefined);
    return (
      <section className="mx-auto max-w-xl px-4 py-6" aria-label="Auswertung">
        <h2 className="font-display text-display-lg text-sand-gold">
          {passed ? 'Station bestanden!' : 'Fast geschafft'}
        </h2>
        <PearlChain results={results} current={round.length} />
        <p className="mt-2 text-body-lg">
          Du hast {correctCount} von {round.length} Perlen des Wissens gesammelt
          {passed
            ? ' – der Weg zur nächsten Station ist frei.'
            : `. Zum Bestehen brauchst du ${PASS_THRESHOLD} – das schaffst du!`}
        </p>

        {passed ? (
          <>
            {stationPearls.length > 0 && (
              <div className="mt-4 rounded-lg border border-line bg-surface-soft p-4">
                <h3 className="font-display text-display-md text-sand-gold">
                  Neue Einträge im Buch der Perlen
                </h3>
                <ul className="mt-2 list-inside list-disc text-body-md">
                  {stationPearls.map((p) => (
                    <li key={p.id}>{p.title}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  station.id < 12
                    ? navigate('/', { state: { travelFrom: station.id } })
                    : navigate('/')
                }
                className="min-h-touch rounded-lg bg-sand-gold px-6 py-3 font-ui text-ui-md font-semibold text-night hover:brightness-110"
              >
                {station.id < 12 ? 'Weiterreisen' : 'Zurück zur Karte'}
              </button>
              <button
                type="button"
                onClick={retry}
                className="min-h-touch rounded-lg border border-line px-6 py-3 font-ui text-ui-md hover:border-sand-gold"
              >
                Station wiederholen
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="mt-4 rounded-lg border border-line bg-surface-soft p-4 text-body-md">
              Wiederholung festigt das Wissen: Schau dir die Perlen-Lektionen
              dieser Station im Buch der Perlen an – dort findest du die
              Antworten in Ruhe erklärt. Danach gelingt es dir bestimmt.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={retry}
                className="min-h-touch rounded-lg bg-sand-gold px-6 py-3 font-ui text-ui-md font-semibold text-night hover:brightness-110"
              >
                Gleich noch einmal versuchen
              </button>
              <Link
                to="/perlen"
                className="inline-flex min-h-touch items-center rounded-lg border border-line px-6 py-3 font-ui text-ui-md hover:border-sand-gold"
              >
                Zum Buch der Perlen
              </Link>
            </div>
          </>
        )}
      </section>
    );
  }

  if (!prepared || !question) return null;

  const answeredCorrect = results[index];

  return (
    <section className="mx-auto max-w-xl px-4 py-4">
      <header className="flex items-baseline justify-between gap-2">
        <h2 className="font-display text-display-md text-sand-gold">{station.name}</h2>
        {timerActive && (
          <p
            className={`font-ui text-ui-md ${
              secondsLeft <= 10 ? 'text-sand-gold' : 'text-text-dim'
            }`}
            aria-label={`Noch ${secondsLeft} Sekunden`}
          >
            <span aria-hidden="true">⏳</span> {secondsLeft}s
          </p>
        )}
      </header>

      <PearlChain results={results} current={index} />

      <p className="mt-2 text-body-lg font-semibold">
        {renderHonorifics(question.question, level)}
      </p>

      <div className="mt-4">
        {question.type === 'multiple_choice' && (
          <MultipleChoiceView
            question={question}
            optionOrder={prepared.optionOrder!}
            level={level}
            disabled={phase === 'feedback'}
            removedOptions={removedOptions[question.id] ?? []}
            selectedIndex={selectedMC}
            onSelect={(i) => {
              setSelectedMC(i);
              answer(checkMultipleChoice(question, i));
            }}
          />
        )}
        {question.type === 'true_false' && (
          <TrueFalseView
            question={question}
            disabled={phase === 'feedback'}
            selected={selectedTF}
            onSelect={(v) => {
              setSelectedTF(v);
              answer(checkTrueFalse(question, v));
            }}
          />
        )}
        {question.type === 'order' && (
          <OrderView
            key={question.id}
            question={question}
            itemOrder={prepared.itemOrder!}
            level={level}
            disabled={phase === 'feedback'}
            onSubmit={(arr) => answer(checkOrder(question, arr))}
          />
        )}
        {question.type === 'match' && (
          <MatchView
            key={question.id}
            question={question}
            rightOrder={prepared.rightOrder!}
            level={level}
            disabled={phase === 'feedback'}
            onSubmit={(a) => answer(checkMatch(question, a))}
          />
        )}
      </div>

      {phase === 'question' && (
        <JokerBar
          question={question}
          level={level}
          adviceLeft={adviceLeft}
          reflectionLeft={reflectionLeft}
          adviceUsedHere={!!removedOptions[question.id]}
          disabled={false}
          onUseAdvice={useAdvice}
          onUseReflection={useReflection}
          reflectionText={reflectionText}
          onCloseReflection={() => setReflectionText(null)}
        />
      )}

      {/* Antwort-Feedback (Live-Region) */}
      <div aria-live="polite">
        {phase === 'feedback' && (
          <div
            className={`mt-4 rounded-lg border p-4 ${
              answeredCorrect ? 'border-oasis' : 'border-sand-gold'
            } bg-surface-soft`}
          >
            <p className="font-ui text-ui-md font-semibold">
              {answeredCorrect
                ? 'Richtig – eine Perle des Wissens für dich! ✦'
                : timedOut
                  ? 'Die Zeit ist abgelaufen – kein Grund zur Sorge. Hier ist die Antwort in Ruhe erklärt:'
                  : 'Noch nicht ganz – aber jetzt kennst du es:'}
            </p>
            <p className="mt-2 text-body-md">
              {renderHonorifics(question.explanation, level)}
            </p>
            <p className="mt-2 font-ui text-ui-sm text-text-dim">
              Quelle: {question.source}
            </p>
            <button
              type="button"
              onClick={nextQuestion}
              className="mt-3 min-h-touch rounded-lg bg-sand-gold px-6 py-2 font-ui text-ui-md font-semibold text-night hover:brightness-110"
            >
              {index + 1 >= round.length ? 'Zur Auswertung' : 'Weiter'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
