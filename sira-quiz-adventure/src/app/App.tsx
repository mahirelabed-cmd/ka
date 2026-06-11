import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { MapPage } from '../features/map/MapPage';
import { StationIntroPage } from '../features/quiz/StationIntroPage';
import { QuizPage } from '../features/quiz/QuizPage';
import { PearlsPage } from '../features/pearls/PearlsPage';
import { StatsPage } from '../features/progress/StatsPage';
import { SettingsPage } from '../features/settings/SettingsPage';
import { useSettings } from '../features/settings/settingsStore';

export function App() {
  const theme = useSettings((s) => s.theme);
  const fontScale = useSettings((s) => s.fontScale);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.fontScale = fontScale;
  }, [theme, fontScale]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<MapPage />} />
        <Route path="station/:stationId" element={<StationIntroPage />} />
        <Route path="station/:stationId/quiz" element={<QuizPage />} />
        <Route path="perlen" element={<PearlsPage />} />
        <Route path="statistik" element={<StatsPage />} />
        <Route path="einstellungen" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
