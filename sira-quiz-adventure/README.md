# Nur as-Sira – Das Quiz-Adventure ۞

Eine interaktive, vollständig offline lauffähige Lernreise durch die Sira
(Lebensgeschichte) des Propheten Muhammad ﷺ – für Familien,
Moschee-/Religionsunterricht und Selbstlerner.

Der Spieler reist auf einer stilisierten Karte des Hidschaz von Station zu
Station (Mekka → Höhle Hira → … → Medina) und schaltet den Weg frei, indem er
Quizfragen beantwortet. Richtige Antworten füllen die Perlenkette; bestandene
Stationen schenken „Perlen des Wissens" mit kurzen Sira-Lektionen im „Buch der
Perlen".

## Merkmale

- **12 Stationen** mit eigenem Fragenpool, linear freischaltbar, jederzeit wiederholbar
- **3 Schwierigkeitsstufen** – Kinder (8–12), Jugendliche (13–17), Erwachsene – mit getrenntem Fortschritt
- **504 Fragen** (14 je Station und Stufe, 10 werden pro Runde gezogen) in 4 Fragetypen:
  Multiple Choice, Wahr/Falsch, Chronologie-Ordnen (Drag & Drop + Tastatur), Zuordnen
- **36 Perlen des Wissens** mit Lektionstexten und Quellenangaben
- **Joker**: „Rat des Gefährten" (entfernt 2 falsche Optionen) und „Moment der
  Besinnung" (zeigt die Perlen-Lektion als Hinweis) – je 2× pro Runde
- **Optionaler Karawanen-Modus** (30 s/Frage) für Jugend/Erwachsene
- **PWA**: offline nutzbar, keine API-Keys, alle Inhalte lokal
- **Barrierefrei**: vollständige Tastaturbedienung, ARIA-Live-Feedback,
  Stationsliste als gleichwertige Karten-Alternative, skalierbare Schrift,
  `prefers-reduced-motion` wird respektiert
- **Design** „Nachtkarawane auf Pergament": eigenes Token-Set, SVG-Karte,
  achtzackiger Stern ۞ als Kapitelmarker, Perlenketten-Fortschritt

## Entwicklung

```bash
npm install
npm run dev       # Entwicklungsserver
npm test          # Vitest (Spiellogik + Inhaltsvalidierung mit zod)
npm run build     # Produktionsbuild inkl. PWA/Service Worker
npm run preview   # Build lokal testen
```

## Inhaltliche Leitlinien

Die unverhandelbaren Respekt- und Inhaltsregeln (keine bildlichen
Darstellungen, Ehrtitel ﷺ, nur sinngemäße Wiedergabe von Aussagen,
Quellenrahmen, keine trivialisierende Gamification u.a.) sind in
[`CONTENT_GUIDELINES.md`](./CONTENT_GUIDELINES.md) dokumentiert und werden
durch automatisierte Tests (`tests/content.test.ts`) abgesichert.
