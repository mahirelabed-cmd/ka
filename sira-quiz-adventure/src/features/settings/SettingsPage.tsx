import { useState } from 'react';
import { startAmbient, stopAmbient } from '../../lib/ambient';
import { useProgress } from '../progress/progressStore';
import {
  useSettings,
  type FontScale,
  type Level,
  type Theme,
} from './settingsStore';

export function SettingsPage() {
  const settings = useSettings();
  const resetAll = useProgress((s) => s.resetAll);
  const [confirmReset, setConfirmReset] = useState(false);

  const toggleSound = (enabled: boolean) => {
    settings.setSoundEnabled(enabled);
    if (enabled) startAmbient();
    else stopAmbient();
  };

  return (
    <section className="mx-auto max-w-xl px-4 py-6">
      <h2 className="font-display text-display-lg text-sand-gold">
        <span aria-hidden="true">⚙</span> Einstellungen
      </h2>

      <fieldset className="mt-5">
        <legend className="font-display text-display-md">
          Schwierigkeitsstufe
        </legend>
        <div className="mt-2 flex flex-col gap-2" role="radiogroup">
          {(
            [
              ['kids', 'Kinder (8–12)', 'Einfache Sprache, Geschichten und Werte'],
              ['youth', 'Jugendliche (13–17)', 'Zusammenhänge, Personen, Chronologie'],
              ['adult', 'Erwachsene & Fortgeschrittene', 'Präzise Chronologie, Begriffe, Quellen'],
            ] as [Level, string, string][]
          ).map(([value, label, hint]) => (
            <label
              key={value}
              className={`flex min-h-touch cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 ${
                settings.level === value
                  ? 'border-sand-gold bg-surface-soft'
                  : 'border-line bg-surface-soft'
              }`}
            >
              <input
                type="radio"
                name="level"
                value={value}
                checked={settings.level === value}
                onChange={() => settings.setLevel(value)}
                className="accent-[var(--sand-gold)]"
              />
              <span>
                <span className="block font-ui text-ui-md">{label}</span>
                <span className="block font-ui text-ui-sm text-text-dim">
                  {hint}
                </span>
              </span>
            </label>
          ))}
        </div>
        <p className="mt-2 font-ui text-ui-sm text-text-dim">
          Jede Stufe hat ihren eigenen Reisefortschritt.
        </p>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="font-display text-display-md">Anzeige</legend>
        <div className="mt-2 space-y-3">
          <label className="flex min-h-touch items-center justify-between gap-3">
            <span className="font-ui text-ui-md">Farbmodus</span>
            <select
              value={settings.theme}
              onChange={(e) => settings.setTheme(e.target.value as Theme)}
              className="min-h-touch rounded border border-line bg-surface-soft px-2 py-2 font-ui text-ui-md text-text-main"
            >
              <option value="night">Nacht (Karawane unter Sternen)</option>
              <option value="day">Tag (Pergament)</option>
            </select>
          </label>
          <label className="flex min-h-touch items-center justify-between gap-3">
            <span className="font-ui text-ui-md">Schriftgröße</span>
            <select
              value={settings.fontScale}
              onChange={(e) => settings.setFontScale(e.target.value as FontScale)}
              className="min-h-touch rounded border border-line bg-surface-soft px-2 py-2 font-ui text-ui-md text-text-main"
            >
              <option value="small">Klein</option>
              <option value="normal">Normal</option>
              <option value="large">Groß</option>
            </select>
          </label>
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="font-display text-display-md">Klang & Tempo</legend>
        <div className="mt-2 space-y-3">
          <label className="flex min-h-touch items-center justify-between gap-3">
            <span>
              <span className="block font-ui text-ui-md">Ambient-Klang</span>
              <span className="block font-ui text-ui-sm text-text-dim">
                Leiser Wüstenwind und Karawanenglöckchen (selbst erzeugt, keine
                Rezitationen)
              </span>
            </span>
            <input
              type="checkbox"
              checked={settings.soundEnabled}
              onChange={(e) => toggleSound(e.target.checked)}
              className="h-6 w-6 accent-[var(--sand-gold)]"
            />
          </label>
          <label
            className={`flex min-h-touch items-center justify-between gap-3 ${
              settings.level === 'kids' ? 'opacity-50' : ''
            }`}
          >
            <span>
              <span className="block font-ui text-ui-md">Karawanen-Modus</span>
              <span className="block font-ui text-ui-sm text-text-dim">
                30 Sekunden pro Frage – nur für Jugendliche und Erwachsene
              </span>
            </span>
            <input
              type="checkbox"
              checked={settings.caravanMode}
              disabled={settings.level === 'kids'}
              onChange={(e) => settings.setCaravanMode(e.target.checked)}
              className="h-6 w-6 accent-[var(--sand-gold)]"
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="font-display text-display-md">Spielstand</legend>
        {confirmReset ? (
          <div className="mt-2 rounded-lg border border-sand-gold bg-surface-soft p-4">
            <p className="text-body-md">
              Möchtest du wirklich den gesamten Spielstand löschen? Alle
              Stationen, Perlen und Statistiken (für alle Stufen) gehen
              verloren.
            </p>
            <div className="mt-3 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  resetAll();
                  setConfirmReset(false);
                }}
                className="min-h-touch rounded-lg border border-sand-gold px-4 py-2 font-ui text-ui-md text-sand-gold"
              >
                Ja, alles zurücksetzen
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="min-h-touch rounded-lg border border-line px-4 py-2 font-ui text-ui-md"
              >
                Abbrechen
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="mt-2 min-h-touch rounded-lg border border-line px-4 py-2 font-ui text-ui-md hover:border-sand-gold"
          >
            Spielstand zurücksetzen …
          </button>
        )}
      </fieldset>
    </section>
  );
}
