"""YouTube Shorts upload via YouTube Data API v3."""

import os
import json
from pathlib import Path

from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

SCOPES = ["https://www.googleapis.com/auth/youtube.upload"]


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
            # Opens browser for OAuth login (first time only)
            creds = flow.run_local_server(port=0)

        Path(token_file).write_text(creds.to_json())

    return creds


def upload_short(video_path: str, title: str, description: str, tags: list[str] = None) -> str:
    """Upload video as YouTube Short. Returns video URL."""
    print(f"[YouTube] Lade hoch: {title}")

    creds = _get_credentials()
    youtube = build("youtube", "v3", credentials=creds)

    body = {
        "snippet": {
            "title": title[:100],
            "description": description[:5000],
            "tags": tags or [],
            "categoryId": "22",  # People & Blogs
        },
        "status": {
            "privacyStatus": "public",
            "selfDeclaredMadeForKids": False,
        },
    }

    media = MediaFileUpload(video_path, chunksize=-1, resumable=True, mimetype="video/mp4")
    request = youtube.videos().insert(part="snippet,status", body=body, media_body=media)

    response = None
    while response is None:
        status, response = request.next_chunk()
        if status:
            print(f"[YouTube] Upload: {int(status.progress() * 100)}%")

    video_id = response["id"]
    url = f"https://youtube.com/shorts/{video_id}"
    print(f"[YouTube] Erfolgreich: {url}")
    return url
