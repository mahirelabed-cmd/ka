"""TikTok video upload via Content Posting API."""

import os
import requests


TIKTOK_API_BASE = "https://open.tiktokapis.com/v2"


def _get_token() -> str:
    token = os.getenv("TIKTOK_ACCESS_TOKEN")
    if not token:
        raise ValueError(
            "TIKTOK_ACCESS_TOKEN muss in .env gesetzt sein.\n"
            "Anleitung: https://developers.tiktok.com/doc/content-posting-api-get-started"
        )
    return token


def upload_video(video_path: str, title: str) -> str:
    """Upload video to TikTok. Returns post ID."""
    token = _get_token()

    print("[TikTok] Initialisiere Upload...")

    video_size = os.path.getsize(video_path)

    # Step 1: Initialize upload
    init_resp = requests.post(
        f"{TIKTOK_API_BASE}/post/publish/video/init/",
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json; charset=UTF-8",
        },
        json={
            "post_info": {
                "title": title[:2200],
                "privacy_level": "PUBLIC_TO_EVERYONE",
                "disable_duet": False,
                "disable_comment": False,
                "disable_stitch": False,
            },
            "source_info": {
                "source": "FILE_UPLOAD",
                "video_size": video_size,
                "chunk_size": video_size,
                "total_chunk_count": 1,
            },
        },
    )
    init_resp.raise_for_status()
    data = init_resp.json()["data"]
    publish_id = data["publish_id"]
    upload_url = data["upload_url"]

    # Step 2: Upload video file
    print("[TikTok] Lade Video hoch...")
    with open(video_path, "rb") as f:
        upload_resp = requests.put(
            upload_url,
            headers={
                "Content-Type": "video/mp4",
                "Content-Range": f"bytes 0-{video_size - 1}/{video_size}",
            },
            data=f,
        )
    upload_resp.raise_for_status()

    print(f"[TikTok] Erfolgreich hochgeladen. Publish ID: {publish_id}")
    return publish_id
