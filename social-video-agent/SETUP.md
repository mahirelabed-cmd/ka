# Social Video Agent — Setup Anleitung

## Installation

```bash
cd social-video-agent
pip install -r requirements.txt
cp .env.example .env
```

Dann `.env` Datei öffnen und API Keys eintragen.

## API Keys beschaffen

### 1. Gemini API Key (für Video-Generierung)
1. Gehe zu https://aistudio.google.com/app/apikey
2. "Create API key" klicken
3. Key kopieren → in `.env` als `GEMINI_API_KEY=AIzaSy...` eintragen

> **Hinweis:** Veo (Video-Generierung) braucht aktuell Zugang über Google AI Studio oder Vertex AI.
> Prüfe ob dein Account Veo-Zugang hat: https://aistudio.google.com

### 2. YouTube Upload (Google OAuth)
1. Gehe zu https://console.cloud.google.com
2. Neues Projekt erstellen → "YouTube Data API v3" aktivieren
3. "OAuth 2.0 Client-ID" erstellen (Anwendungstyp: Desktop)
4. JSON herunterladen → als `client_secret.json` in diesem Ordner speichern
5. Beim ersten Ausführen öffnet sich ein Browser-Fenster → einloggen und erlauben

### 3. Instagram Reels (Meta Graph API)
1. https://developers.facebook.com → App erstellen (Typ: Business)
2. "Instagram Graph API" hinzufügen
3. Instagram Business/Creator Account verknüpfen
4. Long-lived Access Token generieren (gültig 60 Tage)
5. Account ID aus API abrufen: `GET /me/accounts`
6. In `.env` eintragen: `INSTAGRAM_ACCESS_TOKEN` und `INSTAGRAM_ACCOUNT_ID`

### 4. TikTok (Content Posting API)
1. https://developers.tiktok.com → Developer Account erstellen
2. App erstellen → "Content Posting API" beantragen
3. Nach Genehmigung: OAuth Flow durchführen
4. Access Token in `.env` eintragen

> **Hinweis:** TikTok-API-Genehmigung dauert 1-2 Wochen.

## Benutzung

### Video generieren + auf alle Plattformen hochladen:
```bash
python agent.py \
  --prompt "Ein atemberaubender Sonnenaufgang über den Bergen, cinematisch, 4K" \
  --title "Magical Sunrise 🌄" \
  --description "Nature is beautiful. Subscribe for daily content!" \
  --tags nature sunrise mountains cinematic \
  --platforms youtube instagram tiktok
```

### Nur YouTube:
```bash
python agent.py \
  --prompt "Motivierende Zitate mit animiertem Text, schwarzer Hintergrund" \
  --title "Daily Motivation" \
  --platforms youtube
```

### Bestehendes Video hochladen (ohne Generierung):
```bash
python agent.py \
  --prompt "" \
  --title "Mein Video" \
  --platforms youtube instagram \
  --video-file ./mein_video.mp4
```

## Automatisierung (Cron Job)

Täglich um 09:00 Uhr posten:
```cron
0 9 * * * cd /pfad/zum/agent && python agent.py --prompt "..." --title "..." --platforms youtube instagram tiktok
```
