"""Runway ML video generation via Runway Gen-3 API."""

import os
import time
import json
import urllib.request
import urllib.error
from pathlib import Path


API_BASE = "https://api.dev.runwayml.com/v1"


def _get_key() -> str:
    key = os.getenv("RUNWAY_API_KEY")
    if not key or key == "DEIN_RUNWAY_API_KEY":
        raise ValueError(
            "RUNWAY_API_KEY fehlt in .env\n"
            "API Key holen: https://app.runwayml.com/account/api-keys"
        )
    return key


def _request(method: str, path: str, body: dict = None) -> dict:
    key = _get_key()
    url = f"{API_BASE}{path}"
    data = json.dumps(body).encode() if body else None
    req = urllib.request.Request(
        url,
        data=data,
        method=method,
        headers={
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            "X-Runway-Version": "2024-11-06",
        },
    )
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        raw = e.read()
        try:
            err = json.loads(raw)
        except Exception:
            err = raw.decode(errors="replace")
        raise RuntimeError(f"Runway API Fehler {e.code}: {err}")


def generate_video(prompt: str, output_path: str, duration: int = 5) -> str:
    """Generate a video with Runway Gen-3. Returns path to saved video file."""
    print(f"[Runway] Starte Video-Generierung: '{prompt[:60]}...'")

    # Duration must be 5 or 10 seconds for Runway
    duration = 10 if duration >= 8 else 5

    resp = _request("POST", "/text_to_video", {
        "model": "gen4_turbo",
        "promptText": prompt,
        "ratio": "720:1280",  # 9:16 vertical for Shorts/Reels/TikTok
        "duration": duration,
    })

    task_id = resp.get("id")
    if not task_id:
        raise RuntimeError(f"Runway gab keine Task ID zurück: {resp}")

    print(f"[Runway] Job gestartet (ID: {task_id}). Warte auf Fertigstellung...")

    for attempt in range(60):
        time.sleep(10)
        status = _request("GET", f"/tasks/{task_id}")
        state = status.get("status", "")

        if state == "SUCCEEDED":
            video_url = status["output"][0]
            break
        elif state == "FAILED":
            raise RuntimeError(f"Runway Video-Generierung fehlgeschlagen: {status.get('failure','')}")
        else:
            print(f"[Runway] Status: {state} ({attempt + 1}/60)...")
    else:
        raise TimeoutError("Runway Timeout: Video wurde nicht fertig generiert.")

    # Video herunterladen
    output_file = Path(output_path)
    output_file.parent.mkdir(parents=True, exist_ok=True)

    print("[Runway] Lade Video herunter...")
    req = urllib.request.Request(video_url, headers={"Authorization": f"Bearer {_get_key()}"})
    with urllib.request.urlopen(req) as r:
        output_file.write_bytes(r.read())

    print(f"[Runway] Video gespeichert: {output_file}")
    return str(output_file)
