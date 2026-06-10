"""Kling AI video generation via platform.klingai.com API."""

import os
import time
import json
import hmac
import hashlib
import base64
import urllib.request
import urllib.error
from pathlib import Path


API_BASE = "https://api.klingai.com"


def _make_jwt(access_key: str, secret_key: str) -> str:
    """Generate JWT token for Kling API authentication."""
    import time as t

    header = base64.urlsafe_b64encode(
        json.dumps({"alg": "HS256", "typ": "JWT"}).encode()
    ).rstrip(b"=").decode()

    now = int(t.time())
    payload = base64.urlsafe_b64encode(
        json.dumps({"iss": access_key, "exp": now + 1800, "nbf": now - 5}).encode()
    ).rstrip(b"=").decode()

    sig_input = f"{header}.{payload}".encode()
    signature = base64.urlsafe_b64encode(
        hmac.new(secret_key.encode(), sig_input, hashlib.sha256).digest()
    ).rstrip(b"=").decode()

    return f"{header}.{payload}.{signature}"


def _get_credentials() -> tuple[str, str]:
    access_key = os.getenv("KLING_ACCESS_KEY")
    secret_key = os.getenv("KLING_SECRET_KEY")
    if not access_key or not secret_key:
        raise ValueError(
            "KLING_ACCESS_KEY und KLING_SECRET_KEY fehlen in .env\n"
            "API Keys holen: https://platform.klingai.com → 'API Keys'"
        )
    return access_key, secret_key


def _request(method: str, path: str, body: dict = None) -> dict:
    access_key, secret_key = _get_credentials()
    token = _make_jwt(access_key, secret_key)

    url = f"{API_BASE}{path}"
    data = json.dumps(body).encode() if body else None
    req = urllib.request.Request(
        url,
        data=data,
        method=method,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        err = json.loads(e.read())
        raise RuntimeError(f"Kling API Fehler {e.code}: {err}")


def generate_video(prompt: str, output_path: str, duration: int = 5) -> str:
    """Generate a video with Kling AI. Returns path to saved video file."""
    print(f"[Kling] Starte Video-Generierung: '{prompt[:60]}...'")

    resp = _request("POST", "/v1/videos/text2video", {
        "model_name": "kling-v1",
        "prompt": prompt,
        "aspect_ratio": "9:16",
        "duration": str(min(duration, 10)),
        "cfg_scale": 0.5,
    })

    if resp.get("code") != 0:
        raise RuntimeError(f"Kling Fehler: {resp.get('message')}")

    task_id = resp["data"]["task_id"]
    print(f"[Kling] Job gestartet (ID: {task_id}). Warte auf Fertigstellung...")

    for attempt in range(60):
        time.sleep(10)
        status = _request("GET", f"/v1/videos/text2video/{task_id}")
        task = status["data"]
        state = task.get("task_status", "")

        if state == "succeed":
            video_url = task["task_result"]["videos"][0]["url"]
            break
        elif state == "failed":
            raise RuntimeError(f"Kling Video-Generierung fehlgeschlagen: {task.get('task_status_msg')}")
        else:
            print(f"[Kling] Status: {state} ({attempt + 1}/60)...")
    else:
        raise TimeoutError("Kling Timeout: Video wurde nicht fertig generiert.")

    # Video herunterladen
    output_file = Path(output_path)
    output_file.parent.mkdir(parents=True, exist_ok=True)

    print(f"[Kling] Lade Video herunter...")
    with urllib.request.urlopen(video_url) as r:
        output_file.write_bytes(r.read())

    print(f"[Kling] Video gespeichert: {output_file}")
    return str(output_file)
