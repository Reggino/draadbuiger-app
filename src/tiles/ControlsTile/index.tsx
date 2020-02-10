import { ITileProps } from "../index";
import { MosaicWindow } from "react-mosaic-component";
import React from "react";

export default ({ path }: ITileProps) => (
  <MosaicWindow title={`Manuele besturing`} path={path}>
    hier komen de knoppen
  </MosaicWindow>
);
