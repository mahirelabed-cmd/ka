import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Station } from '../../data/schema';
import { stations } from '../../data/stations';
import { renderHonorifics } from '../../lib/honorific';
import {
  isStationUnlocked,
  nextStation,
  useLevelProgress,
} from '../progress/progressStore';
import { useSettings } from '../settings/settingsStore';
import { SiraMap } from './SiraMap';
import type { StationState } from './StationMarker';

const levelNames = {
  kids: 'Kinder (8–12)',
  youth: 'Jugendliche (13–17)',
  adult: 'Erwachsene & Fortgeschrittene',
} as const;

export function MapPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const level = useSettings((s) => s.level);
  const progress = useLevelProgress(level);
  const next = nextStation(progress);

  const travelFrom = (location.state as { travelFrom?: number } | null)?.travelFrom;

  const stationState = useCallback(
    (station: Station): StationState => {
      if (progress.completed.includes(station.id)) return 'completed';
      if (!isStationUnlocked(progress, station.id)) return 'locked';
      return station.id === next ? 'next' : 'unlocked';
    },
    [progress, next],
  );

  const openStation = (station: Station) => {
    navigate(`/station/${station.id}`);
  };

  const endTravel = () => {
    navigate('.', { replace: true, state: null });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-4">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-display-md">Die Reise</h2>
        <p className="font-ui text-ui-sm text-text-dim">
          Stufe: {levelNames[level]}
        </p>
      </div>

      {next === null && progress.completed.length === 12 && (
        <p className="mb-3 rounded-lg border border-line bg-surface-soft p-3 text-body-md">
          Du hast alle 12 Stationen dieser Stufe abgeschlossen! Wiederholung
          festigt das Wissen: Jede Station bleibt offen.
        </p>
      )}

      <SiraMap
        stationState={stationState}
        onSelect={openStation}
        travelFrom={travelFrom}
        onTravelEnd={endTravel}
      />

      {/* Gleichwertige Listen-Navigation (Barrierefreiheit) */}
      <nav aria-label="Stationsliste" className="mt-6">
        <h3 className="font-display text-display-md text-sand-gold">
          Stationsliste
        </h3>
        <ol className="mt-2 space-y-2">
          {stations.map((station) => {
            const state = stationState(station);
            const locked = state === 'locked';
            return (
              <li key={station.id}>
                <button
                  type="button"
                  disabled={locked}
                  onClick={() => openStation(station)}
                  className={`flex w-full min-h-touch items-center gap-3 rounded-lg border border-line px-3 py-2 text-left ${
                    locked
                      ? 'cursor-not-allowed opacity-50'
                      : 'bg-surface-soft hover:border-sand-gold'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`text-lg ${
                      state === 'completed'
                        ? 'text-oasis'
                        : state === 'next'
                          ? 'text-sand-gold'
                          : 'text-text-dim'
                    }`}
                  >
                    {state === 'completed' ? '۞' : state === 'next' ? '✦' : '○'}
                  </span>
                  <span className="flex-1">
                    <span className="block font-ui text-ui-md">
                      {station.id}. {station.name}
                    </span>
                    <span className="block text-ui-sm text-text-dim">
                      {renderHonorifics(station.theme, level)} · {station.period}
                    </span>
                  </span>
                  <span className="font-ui text-ui-sm text-text-dim">
                    {state === 'completed'
                      ? 'Abgeschlossen'
                      : state === 'next'
                        ? 'Nächste Station'
                        : locked
                          ? 'Gesperrt'
                          : 'Offen'}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
