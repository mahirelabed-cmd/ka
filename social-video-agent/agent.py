#!/usr/bin/env python3
"""Social Video Agent — Gemini Veo → YouTube Shorts / Instagram Reels / TikTok"""

import argparse
import os
import sys
from datetime import datetime
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()


def build_video_path(prompt: str) -> str:
    output_dir = Path(os.getenv("VIDEO_OUTPUT_DIR", "./output"))
    output_dir.mkdir(parents=True, exist_ok=True)
    slug = prompt[:30].lower().replace(" ", "_").replace("/", "-")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    return str(output_dir / f"{timestamp}_{slug}.mp4")


def run(
    prompt: str,
    title: str,
    description: str,
    tags: list[str],
    platforms: list[str],
    video_file: str | None = None,
):
    video_path = video_file

    # 1. Video generieren (falls kein fertiges Video angegeben)
    if not video_path:
        duration = int(os.getenv("VIDEO_DURATION_SECONDS", "8"))
        output_path = build_video_path(prompt)

        runway_key = os.getenv("RUNWAY_API_KEY", "")
        kling_key = os.getenv("KLING_ACCESS_KEY", "")

        if runway_key and runway_key != "DEIN_RUNWAY_API_KEY":
            from generators.runway import generate_video
            video_path = generate_video(prompt, output_path, duration=duration)
        elif kling_key and kling_key != "DEIN_KLING_ACCESS_KEY":
            from generators.kling import generate_video
            video_path = generate_video(prompt, output_path, duration=duration)
        else:
            from generators.gemini_veo import generate_video
            video_path = generate_video(prompt, output_path, duration_seconds=duration)
    else:
        print(f"[Agent] Bestehendes Video wird verwendet: {video_path}")

    results = {}

    # 2. Auf ausgewählte Plattformen hochladen
    if "youtube" in platforms:
        try:
            from uploaders.youtube import upload_short

            url = upload_short(video_path, title, description, tags)
            results["youtube"] = url
        except Exception as e:
            results["youtube"] = f"FEHLER: {e}"
            print(f"[YouTube] Fehler: {e}")

    if "instagram" in platforms:
        try:
            from uploaders.instagram import upload_reel

            caption = f"{title}\n\n{description}\n\n{' '.join('#' + t for t in tags)}"
            url = upload_reel(video_path, caption)
            results["instagram"] = url
        except Exception as e:
            results["instagram"] = f"FEHLER: {e}"
            print(f"[Instagram] Fehler: {e}")

    if "tiktok" in platforms:
        try:
            from uploaders.tiktok import upload_video

            post_id = upload_video(video_path, title)
            results["tiktok"] = post_id
        except Exception as e:
            results["tiktok"] = f"FEHLER: {e}"
            print(f"[TikTok] Fehler: {e}")

    # 3. Ergebnis ausgeben
    print("\n" + "=" * 50)
    print("ERGEBNIS")
    print("=" * 50)
    print(f"Video: {video_path}")
    for platform, result in results.items():
        status = "✓" if not str(result).startswith("FEHLER") else "✗"
        print(f"{status} {platform.capitalize()}: {result}")

    return results


def main():
    parser = argparse.ArgumentParser(
        description="KI-Video Agent: Erstellt und lädt Videos auf Social Media hoch"
    )
    parser.add_argument("--prompt", required=True, help="Prompt für die Video-Generierung")
    parser.add_argument("--title", required=True, help="Titel des Videos")
    parser.add_argument(
        "--description", default="", help="Beschreibung / Caption"
    )
    parser.add_argument(
        "--tags", nargs="*", default=[], help="Tags/Hashtags (ohne #)"
    )
    parser.add_argument(
        "--platforms",
        nargs="+",
        choices=["youtube", "instagram", "tiktok"],
        default=["youtube", "instagram", "tiktok"],
        help="Ziel-Plattformen (Standard: alle)",
    )
    parser.add_argument(
        "--video-file",
        default=None,
        help="Fertiges Video verwenden statt zu generieren (optional)",
    )

    args = parser.parse_args()

    run(
        prompt=args.prompt,
        title=args.title,
        description=args.description,
        tags=args.tags,
        platforms=args.platforms,
        video_file=args.video_file,
    )


if __name__ == "__main__":
    main()
