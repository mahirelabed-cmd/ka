"""Instagram Reels upload via Meta Graph API."""

import os
import time
import requests


GRAPH_API_BASE = "https://graph.facebook.com/v21.0"


def _get_credentials() -> tuple[str, str]:
    token = os.getenv("INSTAGRAM_ACCESS_TOKEN")
    account_id = os.getenv("INSTAGRAM_ACCOUNT_ID")
    if not token or not account_id:
        raise ValueError(
            "INSTAGRAM_ACCESS_TOKEN und INSTAGRAM_ACCOUNT_ID müssen in .env gesetzt sein.\n"
            "Anleitung: https://developers.facebook.com/docs/instagram-api/getting-started"
        )
    return token, account_id


def upload_reel(video_path: str, caption: str) -> str:
    """Upload video as Instagram Reel. Returns post URL."""
    token, account_id = _get_credentials()

    print("[Instagram] Starte Reel-Upload (2-Schritt-Prozess)...")

    # Step 1: Upload video to Meta servers and create container
    with open(video_path, "rb") as f:
        video_bytes = f.read()

    init_resp = requests.post(
        f"{GRAPH_API_BASE}/{account_id}/media",
        data={
            "media_type": "REELS",
            "caption": caption[:2200],
            "access_token": token,
        },
    )
    init_resp.raise_for_status()
    container_id = init_resp.json()["id"]

    # Upload video bytes
    upload_resp = requests.post(
        f"https://rupload.facebook.com/video-upload/v21.0/{container_id}",
        headers={
            "Authorization": f"OAuth {token}",
            "offset": "0",
            "file_size": str(len(video_bytes)),
        },
        data=video_bytes,
    )
    upload_resp.raise_for_status()

    # Step 2: Wait for video to finish processing then publish
    print("[Instagram] Warte auf Video-Verarbeitung...")
    for _ in range(12):
        status_resp = requests.get(
            f"{GRAPH_API_BASE}/{container_id}",
            params={"fields": "status_code", "access_token": token},
        )
        status = status_resp.json().get("status_code", "")
        if status == "FINISHED":
            break
        if status == "ERROR":
            raise RuntimeError("Instagram Video-Verarbeitung fehlgeschlagen.")
        time.sleep(10)

    publish_resp = requests.post(
        f"{GRAPH_API_BASE}/{account_id}/media_publish",
        data={"creation_id": container_id, "access_token": token},
    )
    publish_resp.raise_for_status()
    media_id = publish_resp.json()["id"]

    # Get permalink
    link_resp = requests.get(
        f"{GRAPH_API_BASE}/{media_id}",
        params={"fields": "permalink", "access_token": token},
    )
    permalink = link_resp.json().get("permalink", f"https://instagram.com/p/{media_id}")
    print(f"[Instagram] Erfolgreich: {permalink}")
    return permalink
