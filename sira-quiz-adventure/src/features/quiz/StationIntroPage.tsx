import { Link, Navigate, useParams } from 'react-router-dom';
import { getStation } from '../../data/stations';
import { renderHonorifics } from '../../lib/honorific';
import { isStationUnlocked, useLevelProgress } from '../progress/progressStore';
import { useSettings } from '../settings/settingsStore';

export function StationIntroPage() {
  const { stationId } = useParams();
  const level = useSettings((s) => s.level);
  const progress = useLevelProgress(level);

  const station = getStation(Number(stationId));
  if (!station || !isStationUnlocked(progress, station.id)) {
    return <Navigate to="/" replace />;
  }

  const completed = progress.completed.includes(station.id);

  return (
    <article className="mx-auto max-w-xl px-4 py-6">
      <p className="font-ui text-ui-sm uppercase tracking-wide text-text-dim">
        Station {station.id} · {station.period}
      </p>
      <h2 className="mt-1 font-display text-display-lg text-sand-gold">
        <span aria-hidden="true">۞</span> {station.name}
      </h2>

      <p className="mt-4 text-body-lg leading-relaxed">
        {renderHonorifics(station.intro, level)}
      </p>

      <p className="mt-4 rounded-lg border border-line bg-surface-soft p-3 text-body-md">
        {renderHonorifics(station.goal, level)}
      </p>

      {completed && (
        <p className="mt-3 text-ui-md font-ui text-oasis">
          Du hast diese Station bereits bestanden – Wiederholung festigt das
          Wissen.
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to={`/station/${station.id}/quiz`}
          className="inline-flex min-h-touch items-center rounded-lg bg-sand-gold px-6 py-3 font-ui text-ui-md font-semibold text-night hover:brightness-110"
        >
          Quiz beginnen
        </Link>
        <Link
          to="/"
          className="inline-flex min-h-touch items-center rounded-lg border border-line px-6 py-3 font-ui text-ui-md text-text-main hover:border-sand-gold"
        >
          Zurück zur Karte
        </Link>
      </div>
    </article>
  );
}
