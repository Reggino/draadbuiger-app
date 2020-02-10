import { MosaicWindow } from "react-mosaic-component";
import { DxfContext } from "../../provider/Dxf";
import React, { useContext } from "react";
import { ITileProps } from "../index";

export default ({ path }: ITileProps) => {
  const { dxfData } = useContext(DxfContext);
  return (
    <MosaicWindow title={`DXF data`} path={path}>
      <pre style={{ maxHeight: "100%", overflow: "auto" }}>
        {JSON.stringify(dxfData, null, "\t")}
      </pre>
    </MosaicWindow>
  );
};
