import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Level = 'kids' | 'youth' | 'adult';
export type Theme = 'night' | 'day';
export type FontScale = 'small' | 'normal' | 'large';

export interface SettingsState {
  level: Level;
  theme: Theme;
  fontScale: FontScale;
  soundEnabled: boolean;
  /** „Karawanen-Modus": 30s-Timer pro Frage, nur Jugend/Erwachsene. */
  caravanMode: boolean;
  setLevel: (level: Level) => void;
  setTheme: (theme: Theme) => void;
  setFontScale: (scale: FontScale) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setCaravanMode: (enabled: boolean) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      level: 'youth',
      theme: 'night',
      fontScale: 'normal',
      soundEnabled: false,
      caravanMode: false,
      setLevel: (level) =>
        set((s) => ({
          level,
          // Karawanen-Modus ist für die Kinder-Stufe nicht verfügbar.
          caravanMode: level === 'kids' ? false : s.caravanMode,
        })),
      setTheme: (theme) => set({ theme }),
      setFontScale: (fontScale) => set({ fontScale }),
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
      setCaravanMode: (caravanMode) => set({ caravanMode }),
    }),
    { name: 'sira-settings-v1' },
  ),
);
