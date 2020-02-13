import { ITileProps } from "../index";
import { MosaicWindow } from "react-mosaic-component";
import React, { useContext } from "react";
import { Canvas } from "react-three-fiber";
import Controls from "./Controls";
import Wire from "./Wire";
import { DxfContext } from "../../provider/Dxf";

export default ({ path }: ITileProps) => {
  const { dxfData, entityIndex } = useContext(DxfContext);

  if (!dxfData) {
    return null;
  }

  return (
    <MosaicWindow title={`Simulator`} path={path}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 0, 10]} intensity={1} />
        <gridHelper
          args={[200, 10]}
          position={[0, 0, 0]}
          rotation={[(90 * Math.PI) / 180, 0, 0]}
        />
        <axesHelper args={[5]} />
        {dxfData.entities.map((entity, thisEntityIndex) => (
          <Wire
            entity={entity}
            color={entityIndex === thisEntityIndex ? 0xff0000 : 0x00ff00}
            key={thisEntityIndex}
          />
        ))}
        <Controls />
      </Canvas>
    </MosaicWindow>
  );
};
