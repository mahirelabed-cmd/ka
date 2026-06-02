import { useEffect } from "react";
import { continueRender, delayRender, staticFile } from "remotion";

export const PLAYFAIR = "Playfair Display";
export const DM_SANS = "DM Sans";

let handle: number | null = null;

export const FontLoader: React.FC = () => {
  useEffect(() => {
    handle = delayRender("Loading local fonts");

    const faces = [
      new FontFace(PLAYFAIR, `url(${staticFile("fonts/playfair-display.woff2")}) format("woff2")`, {
        weight: "400 900",
        style: "normal",
      }),
      new FontFace(PLAYFAIR, `url(${staticFile("fonts/playfair-display-italic.woff2")}) format("woff2")`, {
        weight: "400 900",
        style: "italic",
      }),
      new FontFace(DM_SANS, `url(${staticFile("fonts/dm-sans.woff2")}) format("woff2")`, {
        weight: "100 500",
        style: "normal",
      }),
      new FontFace(DM_SANS, `url(${staticFile("fonts/dm-sans-bold.woff2")}) format("woff2")`, {
        weight: "600 900",
        style: "normal",
      }),
    ];

    Promise.all(
      faces.map((face) =>
        face.load().then((loaded) => {
          document.fonts.add(loaded);
        })
      )
    ).finally(() => {
      if (handle !== null) {
        continueRender(handle);
        handle = null;
      }
    });
  }, []);

  return null;
};
