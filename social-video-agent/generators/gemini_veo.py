"""Gemini Veo video generation."""

import os
import time
from pathlib import Path

from google import genai
from google.genai import types


def generate_video(prompt: str, output_path: str, duration_seconds: int = 8) -> str:
    """Generate a video from a text prompt using Gemini Veo.

    Returns the path to the generated video file.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY nicht gesetzt. Bitte .env Datei prüfen.")

    client = genai.Client(api_key=api_key)

    print(f"[Veo] Generiere Video: '{prompt[:60]}...'")

    # Veo 2 supports 5-8 second videos, aspect ratio 9:16 for Shorts/Reels/TikTok
    operation = client.models.generate_video(
        model="veo-3.1-generate-preview",
        prompt=prompt,
        config=types.GenerateVideoConfig(
            aspect_ratio="9:16",
            duration_seconds=min(duration_seconds, 8),
            number_of_videos=1,
        ),
    )

    print("[Veo] Video wird generiert (kann 2-5 Minuten dauern)...")
    while not operation.done:
        time.sleep(10)
        operation = operation.refresh()
        print("[Veo] Warte auf Fertigstellung...")

    if operation.response and operation.response.generated_videos:
        video = operation.response.generated_videos[0]
        output_file = Path(output_path)
        output_file.parent.mkdir(parents=True, exist_ok=True)

        video_bytes = client.models.get_video(video.video.uri)
        output_file.write_bytes(video_bytes)

        print(f"[Veo] Video gespeichert: {output_file}")
        return str(output_file)

    raise RuntimeError("Veo hat kein Video zurückgegeben. Prüfe API-Zugang und Kontingent.")
