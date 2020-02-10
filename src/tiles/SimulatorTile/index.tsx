// import { InstructionVisualizer } from "../../inc/instructionVisualizer";
import { ITileProps } from "../index";
import { MosaicWindow } from "react-mosaic-component";
import React from "react";

// const instructionVisualizer = new InstructionVisualizer();

export default ({ path }: ITileProps) => (
  <MosaicWindow title={`Simulator`} path={path}>
    hier komt simulator
  </MosaicWindow>
);
