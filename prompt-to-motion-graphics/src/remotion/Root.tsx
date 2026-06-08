import React from "react";
import { Composition } from "remotion";
import { DynamicComp } from "./DynamicComp";
import { ArabicRootsVideo } from "./ArabicRootsVideo";
import { MadoWebdesignReel } from "./MadoWebdesignReel";

const defaultCode = `import { AbsoluteFill } from "remotion";
export const MyAnimation = () => <AbsoluteFill style={{ backgroundColor: "#000" }} />;`;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DynamicComp"
        component={DynamicComp}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ code: defaultCode }}
        calculateMetadata={({ props }) => ({
          durationInFrames: props.durationInFrames as number,
          fps: props.fps as number,
        })}
      />
      <Composition
        id="ArabicRootsVideo"
        component={ArabicRootsVideo}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="MadoWebdesignReel"
        component={MadoWebdesignReel}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
