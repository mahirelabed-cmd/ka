# CONTENT_GUIDELINES – Respekt- & Inhaltsregeln

Dieses Dokument hält die unverhandelbaren Regeln aus dem Projektauftrag (§2)
fest und dokumentiert für jede Regel, **wie sie in der App umgesetzt und
abgesichert** ist. Das Abschluss-Review wurde Punkt für Punkt durchgeführt.

## Regel 1 – Keine bildliche Darstellung von Personen

> Keine bildliche Darstellung des Propheten Muhammad ﷺ, anderer Propheten
> oder der Sahaba. Keine Silhouetten, keine verhüllten Figuren, keine Avatare.

**Umsetzung & Review:**
- Die App enthält ausschließlich abstrakte Grafiken: SVG-Karte (Sterne,
  Berge, Meer, Route), achtzackiger Stern ۞ als Kapitelmarker, geometrische
  Achteck-Ornamente, Perlen.
- Die Reise-Animation zeigt **nur Kamel-Silhouetten mit Gepäckbündeln**
  (`src/features/map/Caravan.tsx`) – ausdrücklich ohne Reiter oder erkennbare
  Personen; das ist im Quellcode kommentiert.
- App-Icons: achtzackiger Stern auf Nachtblau, keine figürlichen Motive.
- Personen kommen ausschließlich als **Text und Namen** vor.
- Review-Ergebnis: ✅ eingehalten (alle Assets gesichtet: `public/icons/`,
  alle SVG-Komponenten unter `src/features/map/`).

## Regel 2 – Ehrtitel nach „Muhammad" / „der Prophet"

> Nach jedem Vorkommen steht ﷺ (U+FDFA) bzw. ausgeschrieben
> „(Friede sei mit ihm)" in der Kinder-Stufe.

**Umsetzung & Review:**
- Alle Inhalte (Stationen, Perlen, 504 Fragen) schreiben durchgehend
  „Muhammad ﷺ" / „der Prophet ﷺ".
- In der **Kinder-Stufe** ersetzt `src/lib/honorific.ts` das Zeichen bei der
  Anzeige automatisch durch „(Friede sei mit ihm)" – an jeder Textstelle
  (Fragen, Optionen, Erklärungen, Intros, Perlen).
- **Automatisierter Test** (`tests/content.test.ts`): die Regexe
  `\bMuhammads?\b(?! ﷺ)` und `\bProphet(en|s)?\b(?! ﷺ)` dürfen in keinem
  Inhaltsfeld treffen (Fragen, Optionen, Items, Paare, Erklärungen,
  Perlen-Lektionen). Andere Gesandte werden beim Namen mit
  „(Friede sei mit ihm/ihr)" genannt.
- Die Display-Schrift „Amiri" rendert das Zeichen ﷺ sauber.
- Review-Ergebnis: ✅ eingehalten (Test grün über alle 504 Fragen + 36 Perlen
  + 12 Stationstexte).

## Regel 3 – Keine erfundenen wörtlichen Dialoge

> Aussagen des Propheten ﷺ nur sinngemäß und mit Quellenrahmen.

**Umsetzung & Review:**
- Aussagen werden mit Rahmenformeln wiedergegeben: „Es wird überliefert,
  dass …", „sinngemäß". Beispiele: Höhle Thaur („Sei nicht traurig …" als
  Koranzitat 9:40), Taʾif, Tag der Amnestie, Abschiedspredigt.
- Wörtlich zitiert werden nur **Koranverse** (in deutscher Übersetzung, mit
  Sure:Vers) und kurze, in den Sahih-Werken bezeugte Formeln („Ahad, Ahad")
  mit Quellenangabe.
- Review-Ergebnis: ✅ eingehalten (Stichproben über alle 12 Stationen; jede
  Frage trägt ein `source`-Feld).

## Regel 4 – Quellenbasis und Kennzeichnung von Umstrittenem

> Basis: Ibn Ishaq/Ibn Hisham + anerkannte Sahih-Berichte. Keine erfundenen
> Ereignisse. Umstrittenes weglassen oder kennzeichnen.

**Umsetzung & Review:**
- Jede Frage und jede Perle nennt ihre Quelle (`source`): Ibn Hisham,
  Sahih al-Buchari, Sahih Muslim, Musnad Ahmad, Koranstellen u.a.
- Umstrittene/nicht-sahih-bezeugte Details sind ausdrücklich gekennzeichnet:
  - Spinnennetz an der Höhle Thaur → „Nach verbreiteter Überlieferung …",
    mit Hinweis, dass der gesicherte Kern Allahs Schutz ist (Koran 9:40).
  - Termiten am Boykott-Dokument → „Nach verbreiteter Überlieferung …".
  - Reihenfolge der Todesfälle im Trauerjahr → als offen gekennzeichnet.
  - Genaue Jahreszahlen → „nach verbreiteter Datierung/Überlieferung".
  - Isra & Miʿradsch → nur gesicherte Kernelemente; eine Erwachsenen-Frage
    thematisiert ausdrücklich die Abgrenzung zu späteren Ausschmückungen.
- Review-Ergebnis: ✅ eingehalten.

## Regel 5 – Schlachten ohne Gewaltverherrlichung

> Badr, Uhud, Graben als historische Stationen, Fokus auf Kontext, Geduld,
> Verträge, Versöhnung; Eroberung Mekkas als Tag der Amnestie.

**Umsetzung & Review:**
- Schlachten kommen nur in Station 12 (Jugend/Erwachsene) als **Wegmarken**
  vor – ohne Kampfdetails, mit Fokus auf Geduld und Zusammenhalt.
- Die **Kinder-Stufe enthält keine Schlachtfragen** und keine
  Jahreszahlen-Abfragen (automatisch getestet).
- Die Eroberung Mekkas wird durchgehend als **Tag der Amnestie** erzählt
  (Perle „Tag der Vergebung", mehrere Fragen zur Generalamnestie, demütiger
  Einzug statt Triumph).
- Review-Ergebnis: ✅ eingehalten.

## Regel 6 – Würdevoller Ton, keine trivialisierende Gamification

> Keine „Streak verloren!"-Mechanik, keine Lootboxen, kein Glücksspiel.

**Umsetzung & Review:**
- Es gibt **keine Streaks, keine Lootboxen, keine Zufallsbelohnungen, keine
  Käufe, keinen Zeitdruck als Default**.
- Belohnungen sind ausschließlich **Lerninhalte**: „Perlen des Wissens" mit
  Lektion und Quellenangabe.
- Der optionale Timer heißt ruhig „Karawanen-Modus", ist abschaltbar und für
  die Kinder-Stufe gesperrt.
- Sprache durchgehend warm und lehrreich („Wiederholung festigt das Wissen").
- Review-Ergebnis: ✅ eingehalten.

## Regel 7 – Kein Spott bei falschen Antworten

> Jede falsche Antwort führt zu einer freundlichen Erklärung mit Quellhinweis.

**Umsetzung & Review:**
- Feedback bei falscher Antwort: „Noch nicht ganz – aber jetzt kennst du es:"
  + Erklärung + Quelle. Bei Zeitablauf: „… kein Grund zur Sorge."
- Die Perlenkette zeigt falsche Antworten als **matte Perlen, keine roten X**.
- Die Auswertung bei < 7 Punkten ermutigt, verweist auf die Perlen-Lektionen
  und bietet den sofortigen Neuversuch mit neu gemischter Ziehung an.
- Alle 504 `explanation`-Texte sind erklärend formuliert, nie abwertend.
- Review-Ergebnis: ✅ eingehalten.

## Regel 8 – Keine Audio-Rezitationen

> Nur dezente, optionale Ambient-Sounds, per Web Audio API generiert.

**Umsetzung & Review:**
- Es gibt **keinerlei Audioaufnahmen** im Projekt (keine Audiodateien im
  Repository oder Build).
- Der optionale Ambient-Klang (`src/lib/ambient.ts`) wird vollständig zur
  Laufzeit per **Web Audio API synthetisiert**: gefiltertes Rauschen als
  Wüstenwind, Sinus-Anschläge als Karawanenglöckchen. Default: **aus**.
- Review-Ergebnis: ✅ eingehalten.

---

## Redaktionelle Konventionen

- Schreibweisen: „Khadidscha (r.a.)", „Abu Bakr (r.a.)", „Hidschra",
  „Kaaba", „Quraisch", „Taʾif", „Daʿwa", „Bayʿa", „Muhadschirun/Ansar".
- Gefährtinnen und Gefährten tragen beim Nennen „(r.a.)".
- Kinder-Stufe: kurze Sätze, Geschichten- und Wertefokus, keine Jahreszahlen,
  keine Gewaltdetails (Verfolgung wird behutsam als „schlecht behandelt"
  erzählt).
- Distraktoren sind plausibel, aber eindeutig falsch – nie verletzend oder
  albern auf Kosten des Themas.

## Absicherung

- `npm test` validiert bei jedem Lauf: zod-Schema aller 504 Fragen und 36
  Perlen, 14 Fragen je Station/Stufe, eindeutige IDs, gültige
  Perlen-Referenzen, Ehrtitel-Regel, Jahreszahl-Verbot der Kinder-Stufe,
  gemischte Wahr/Falsch-Antworten und Vorkommen aller vier Fragetypen.
- Die Fragenauswahl lädt jede Datei zur Laufzeit erneut durch das
  zod-Schema (`src/data/questions/index.ts`).
