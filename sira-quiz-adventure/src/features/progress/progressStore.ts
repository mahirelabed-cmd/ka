import { create } from 'zustand';
import type { Level } from '../../data/schema';
import {
  clearSave,
  emptySave,
  isStationUnlocked,
  loadSave,
  nextStation,
  persistSave,
  recordRound,
  type SaveData,
} from '../../lib/save';

interface ProgressState {
  save: SaveData;
  finishRound: (
    level: Level,
    station: number,
    correct: number,
    answered: number,
    passed: boolean,
    earnedPearlIds: string[],
  ) => void;
  resetAll: () => void;
}

export const useProgress = create<ProgressState>((set) => ({
  save: loadSave(localStorage),
  finishRound: (level, station, correct, answered, passed, earnedPearlIds) =>
    set((state) => {
      const save = recordRound(
        state.save,
        level,
        station,
        correct,
        answered,
        passed,
        earnedPearlIds,
      );
      persistSave(localStorage, save);
      return { save };
    }),
  resetAll: () =>
    set(() => {
      clearSave(localStorage);
      return { save: emptySave() };
    }),
}));

export function useLevelProgress(level: Level) {
  return useProgress((s) => s.save.progress[level]!);
}

export { isStationUnlocked, nextStation };
