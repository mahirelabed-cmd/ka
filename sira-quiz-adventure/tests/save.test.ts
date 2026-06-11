import { describe, expect, it } from 'vitest';
import {
  SAVE_KEY,
  SAVE_VERSION,
  emptySave,
  isStationUnlocked,
  loadSave,
  migrate,
  nextStation,
  persistSave,
  recordRound,
  type SaveStorage,
} from '../src/lib/save';

function memoryStorage(): SaveStorage & { data: Map<string, string> } {
  const data = new Map<string, string>();
  return {
    data,
    getItem: (k) => data.get(k) ?? null,
    setItem: (k, v) => void data.set(k, v),
    removeItem: (k) => void data.delete(k),
  };
}

describe('Save/Load', () => {
  it('liefert einen leeren Spielstand, wenn nichts gespeichert ist', () => {
    const save = loadSave(memoryStorage());
    expect(save.saveVersion).toBe(SAVE_VERSION);
    expect(save.pearls).toEqual([]);
    expect(save.progress.kids?.completed).toEqual([]);
  });

  it('speichert und lädt einen Spielstand verlustfrei', () => {
    const storage = memoryStorage();
    const save = recordRound(emptySave(), 'youth', 1, 8, 10, true, [
      'pearl-a',
      'pearl-b',
    ]);
    persistSave(storage, save);
    expect(loadSave(storage)).toEqual(save);
  });

  it('verwirft kaputtes JSON und startet frisch', () => {
    const storage = memoryStorage();
    storage.setItem(SAVE_KEY, '{nicht json');
    expect(loadSave(storage)).toEqual(emptySave());
  });

  it('migriert unbekannte/alte Versionen auf einen frischen Stand', () => {
    expect(migrate({ saveVersion: 0, foo: 1 })).toEqual(emptySave());
    expect(migrate({ saveVersion: 99 })).toEqual(emptySave());
    expect(migrate(null)).toEqual(emptySave());
  });

  it('akzeptiert einen gültigen Version-1-Stand unverändert', () => {
    const save = recordRound(emptySave(), 'adult', 1, 9, 10, true, ['pearl-x']);
    expect(migrate(JSON.parse(JSON.stringify(save)))).toEqual(save);
  });
});

describe('Freischaltlogik', () => {
  it('Station 1 ist immer frei, Station 2 erst nach Bestehen von 1', () => {
    const empty = emptySave().progress.youth!;
    expect(isStationUnlocked(empty, 1)).toBe(true);
    expect(isStationUnlocked(empty, 2)).toBe(false);

    const after = recordRound(emptySave(), 'youth', 1, 7, 10, true, [])
      .progress.youth!;
    expect(isStationUnlocked(after, 2)).toBe(true);
    expect(isStationUnlocked(after, 3)).toBe(false);
  });

  it('Stationen außerhalb 1–12 sind nie frei', () => {
    const empty = emptySave().progress.youth!;
    expect(isStationUnlocked(empty, 0)).toBe(false);
    expect(isStationUnlocked(empty, 13)).toBe(false);
  });

  it('nextStation zeigt auf die erste unbestandene Station', () => {
    let save = emptySave();
    expect(nextStation(save.progress.kids!)).toBe(1);
    save = recordRound(save, 'kids', 1, 8, 10, true, []);
    expect(nextStation(save.progress.kids!)).toBe(2);
  });

  it('nextStation ist null, wenn alle 12 Stationen bestanden sind', () => {
    let save = emptySave();
    for (let n = 1; n <= 12; n++) {
      save = recordRound(save, 'adult', n, 10, 10, true, []);
    }
    expect(nextStation(save.progress.adult!)).toBeNull();
  });

  it('Fortschritt ist je Stufe getrennt', () => {
    const save = recordRound(emptySave(), 'kids', 1, 8, 10, true, []);
    expect(isStationUnlocked(save.progress.kids!, 2)).toBe(true);
    expect(isStationUnlocked(save.progress.youth!, 2)).toBe(false);
  });
});

describe('recordRound', () => {
  it('zählt Statistik und merkt sich die Bestleistung', () => {
    let save = recordRound(emptySave(), 'youth', 3, 5, 10, false, []);
    save = recordRound(save, 'youth', 3, 8, 10, true, ['pearl-1']);
    save = recordRound(save, 'youth', 3, 6, 10, false, []);
    const stats = save.progress.youth!.stations['3']!;
    expect(stats.attempts).toBe(3);
    expect(stats.answered).toBe(30);
    expect(stats.correct).toBe(19);
    expect(stats.bestScore).toBe(8);
    expect(save.progress.youth!.completed).toEqual([3]);
  });

  it('vergibt Perlen nur bei Bestehen und ohne Duplikate', () => {
    let save = recordRound(emptySave(), 'kids', 1, 5, 10, false, ['pearl-a']);
    expect(save.pearls).toEqual([]);
    save = recordRound(save, 'kids', 1, 8, 10, true, ['pearl-a', 'pearl-b']);
    save = recordRound(save, 'kids', 1, 9, 10, true, ['pearl-a', 'pearl-b']);
    expect(save.pearls).toEqual(['pearl-a', 'pearl-b']);
  });
});
