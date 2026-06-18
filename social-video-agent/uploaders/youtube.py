"""YouTube Shorts upload via YouTube Data API v3 (direct HTTP, no googleapiclient)."""

import os
import json
import requests
from pathlib import Path

from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

SCOPES = ["https://www.googleapis.com/auth/youtube.upload"]
UPLOAD_URL = "https://www.googleapis.com/upload/youtube/v3/videos"


def _get_credentials() -> Credentials:
    token_file = os.getenv("YOUTUBE_TOKEN_FILE", "youtube_token.json")
    secrets_file = os.getenv("YOUTUBE_CLIENT_SECRETS_FILE", "client_secret.json")

    creds = None
    if Path(token_file).exists():
        creds = Credentials.from_authorized_user_file(token_file, SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not Path(secrets_file).exists():
                raise FileNotFoundError(
                    f"YouTube client_secret.json nicht gefunden. "
                    f"Lade es von https://console.cloud.google.com herunter."
                )
            flow = InstalledAppFlow.from_client_secrets_file(secrets_file, SCOPES)
            creds = flow.run_local_server(port=0)

        Path(token_file).write_text(creds.to_json())

    return creds


def upload_short(video_path: str, title: str, description: str, tags: list[str] = None) -> str:
    """Upload video as YouTube Short. Returns video URL."""
    print(f"[YouTube] Lade hoch: {title}")

    creds = _get_credentials()

    metadata = {
        "snippet": {
            "title": title[:100],
            "description": description[:5000],
            "tags": tags or [],
            "categoryId": "22",
        },
        "status": {
            "privacyStatus": "public",
            "selfDeclaredMadeForKids": False,
        },
    }

    video_size = os.path.getsize(video_path)

    # Step 1: Initiate resumable upload session
    init_resp = requests.post(
        UPLOAD_URL,
        params={"uploadType": "resumable", "part": "snippet,status"},
        headers={
            "Authorization": f"Bearer {creds.token}",
            "Content-Type": "application/json; charset=UTF-8",
            "X-Upload-Content-Type": "video/mp4",
            "X-Upload-Content-Length": str(video_size),
        },
        data=json.dumps(metadata),
    )
    init_resp.raise_for_status()
    upload_session_url = init_resp.headers["Location"]

    # Step 2: Upload the video bytes
    with open(video_path, "rb") as f:
        video_bytes = f.read()

    upload_resp = requests.put(
        upload_session_url,
        headers={
            "Content-Type": "video/mp4",
            "Content-Length": str(video_size),
        },
        data=video_bytes,
    )
    upload_resp.raise_for_status()

    video_id = upload_resp.json()["id"]
    url = f"https://youtube.com/shorts/{video_id}"
    print(f"[YouTube] Erfolgreich: {url}")
    return url
