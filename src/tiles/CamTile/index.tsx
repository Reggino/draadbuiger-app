import React, { useState } from "react";
import { MosaicWindow } from "react-mosaic-component";
import { MosaicBranch } from "react-mosaic-component/src/types";

interface ICamTileProps {
  path: MosaicBranch[];
}

export default (props: ICamTileProps) => {
  const [isStreaming, setIsStreaming] = useState(false);

  return (
    <MosaicWindow path={props.path} title="Cam feed">
      <img
        src={`http://draadbuigpi/image.${isStreaming ? "mjpeg" : "jpg"}`}
        onClick={() => {
          setIsStreaming(!isStreaming);
        }}
      />
    </MosaicWindow>
  );
};
