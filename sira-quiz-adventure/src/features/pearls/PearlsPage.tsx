import { getPearlsForStation } from '../../data/pearls';
import { stations } from '../../data/stations';
import { renderHonorifics } from '../../lib/honorific';
import { useProgress } from '../progress/progressStore';
import { useSettings } from '../settings/settingsStore';

export function PearlsPage() {
  const level = useSettings((s) => s.level);
  const collected = useProgress((s) => s.save.pearls);

  const total = stations.reduce(
    (sum, st) => sum + getPearlsForStation(st.id).length,
    0,
  );

  return (
    <section className="mx-auto max-w-xl px-4 py-6">
      <h2 className="font-display text-display-lg text-sand-gold">
        <span aria-hidden="true">◉</span> Buch der Perlen
      </h2>
      <p className="mt-1 font-ui text-ui-md text-text-dim">
        {collected.length} von {total} Perlen des Wissens gesammelt.
      </p>

      <div className="mt-4 space-y-8">
        {stations.map((station) => {
          const stationPearls = getPearlsForStation(station.id);
          if (stationPearls.length === 0) return null;
          return (
            <div key={station.id}>
              <h3 className="font-display text-display-md">
                <span aria-hidden="true" className="text-sand-gold">۞</span>{' '}
                Station {station.id}: {station.name}
              </h3>
              <ul className="mt-2 space-y-3">
                {stationPearls.map((pearl) => {
                  const owned = collected.includes(pearl.id);
                  return (
                    <li
                      key={pearl.id}
                      className={`rounded-lg border p-4 ${
                        owned
                          ? 'border-sand-gold bg-surface-soft'
                          : 'border-line bg-surface-soft opacity-70'
                      }`}
                    >
                      <p className="flex items-center gap-2 font-ui text-ui-md font-semibold">
                        <span
                          aria-hidden="true"
                          className={`inline-block h-3 w-3 rounded-full ${
                            owned ? 'bg-sand-gold' : 'border border-line'
                          }`}
                        />
                        {pearl.title}
                      </p>
                      {owned ? (
                        <>
                          <p className="mt-2 text-body-md leading-relaxed">
                            {renderHonorifics(pearl.lesson, level)}
                          </p>
                          <p className="mt-2 font-ui text-ui-sm text-text-dim">
                            Quelle: {pearl.source}
                          </p>
                        </>
                      ) : (
                        <p className="mt-2 text-body-md text-text-dim">
                          Noch nicht gesammelt – bestehe Station {station.id},
                          um diese Perle zu erhalten.
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
