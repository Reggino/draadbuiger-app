import React, { useState } from "react";
import { MosaicWindow } from "react-mosaic-component";
import { ITileProps } from "../index";

export default (props: ITileProps) => {
  const [isStreaming, setIsStreaming] = useState(false);

  return (
    <MosaicWindow path={props.path} title="Cam feed">
      <img
        src={`http://draadbuigpi/image.${isStreaming ? "mjpeg" : "jpg"}`}
        alt=""
        onClick={() => {
          setIsStreaming(!isStreaming);
        }}
      />
    </MosaicWindow>
  );
};
