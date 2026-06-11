import type { Level } from '../data/schema';

const SALAWAT = 'ﷺ'; // ﷺ

/**
 * In der Kinder-Stufe wird das Zeichen ﷺ ausgeschrieben als
 * „(Friede sei mit ihm)", in den anderen Stufen bleibt es als Zeichen stehen.
 */
export function renderHonorifics(text: string, level: Level): string {
  if (level === 'kids') {
    return text.replaceAll(SALAWAT, '(Friede sei mit ihm)');
  }
  return text;
}
