import { Link } from 'react-router-dom';
import { stations } from '../../data/stations';
import { useProgress } from './progressStore';
import { useSettings } from '../settings/settingsStore';

const levelNames = {
  kids: 'Kinder (8–12)',
  youth: 'Jugendliche (13–17)',
  adult: 'Erwachsene & Fortgeschrittene',
} as const;

export function StatsPage() {
  const level = useSettings((s) => s.level);
  const save = useProgress((s) => s.save);
  const progress = save.progress[level]!;

  const totals = Object.values(progress.stations).reduce(
    (acc, s) => ({
      answered: acc.answered + s.answered,
      correct: acc.correct + s.correct,
    }),
    { answered: 0, correct: 0 },
  );

  const quote = (correct: number, answered: number) =>
    answered === 0 ? null : Math.round((correct / answered) * 100);

  // Schwächstes Kapitel: niedrigste Quote unter den gespielten Stationen.
  const played = stations
    .map((st) => ({ station: st, stats: progress.stations[String(st.id)] }))
    .filter((e) => e.stats && e.stats.answered > 0);
  const weakest =
    played.length > 0
      ? played.reduce((min, e) =>
          e.stats!.correct / e.stats!.answered < min.stats!.correct / min.stats!.answered
            ? e
            : min,
        )
      : null;

  return (
    <section className="mx-auto max-w-xl px-4 py-6">
      <h2 className="font-display text-display-lg text-sand-gold">
        <span aria-hidden="true">✦</span> Statistik
      </h2>
      <p className="mt-1 font-ui text-ui-sm text-text-dim">
        Stufe: {levelNames[level]}
      </p>

      <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Fragen beantwortet" value={String(totals.answered)} />
        <StatCard
          label="Richtig beantwortet"
          value={
            totals.answered === 0
              ? '–'
              : `${totals.correct} (${quote(totals.correct, totals.answered)} %)`
          }
        />
        <StatCard
          label="Stationen bestanden"
          value={`${progress.completed.length} / 12`}
        />
        <StatCard label="Perlen gesammelt" value={`${save.pearls.length} / 36`} />
      </dl>

      {weakest && (
        <div className="mt-5 rounded-lg border border-line bg-surface-soft p-4">
          <h3 className="font-display text-display-md text-sand-gold">
            Empfehlung
          </h3>
          <p className="mt-1 text-body-md">
            Dein schwächstes Kapitel ist{' '}
            <strong>
              Station {weakest.station.id}: {weakest.station.name}
            </strong>{' '}
            mit einer Quote von{' '}
            {quote(weakest.stats!.correct, weakest.stats!.answered)} %.
            Wiederholung festigt das Wissen – schau dir auch die
            Perlen-Lektionen dieser Station an.
          </p>
          <Link
            to={`/station/${weakest.station.id}`}
            className="mt-3 inline-flex min-h-touch items-center rounded-lg border border-sand-gold px-4 py-2 font-ui text-ui-md text-sand-gold hover:bg-surface"
          >
            Station {weakest.station.id} wiederholen
          </Link>
        </div>
      )}

      <h3 className="mt-6 font-display text-display-md">Quote je Station</h3>
      <ul className="mt-2 space-y-2">
        {stations.map((st) => {
          const stats = progress.stations[String(st.id)];
          const q = stats ? quote(stats.correct, stats.answered) : null;
          return (
            <li
              key={st.id}
              className="flex items-center gap-3 rounded-lg border border-line bg-surface-soft px-3 py-2"
            >
              <span className="w-6 text-right font-ui text-ui-sm text-text-dim">
                {st.id}.
              </span>
              <span className="flex-1 font-ui text-ui-md">{st.name}</span>
              {q === null ? (
                <span className="font-ui text-ui-sm text-text-dim">
                  Noch nicht gespielt
                </span>
              ) : (
                <>
                  <span
                    aria-hidden="true"
                    className="h-2 w-24 overflow-hidden rounded-full border border-line"
                  >
                    <span
                      className="block h-full bg-sand-gold"
                      style={{ width: `${q}%` }}
                    />
                  </span>
                  <span className="w-12 text-right font-ui text-ui-sm">
                    {q} %
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-surface-soft p-3">
      <dt className="font-ui text-ui-sm text-text-dim">{label}</dt>
      <dd className="mt-1 font-display text-display-md text-sand-gold">
        {value}
      </dd>
    </div>
  );
}
