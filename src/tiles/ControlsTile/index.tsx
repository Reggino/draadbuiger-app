import { ITileProps } from "../index";
import { MosaicWindow } from "react-mosaic-component";
import React from "react";
import { Button } from "@blueprintjs/core";

import "./index.scss";

export default ({ path }: ITileProps) => (
  <MosaicWindow title={`Manuele besturing`} path={path}>
    <table className="tiles__controls-tile__table">
      <tr>
        <td>
          <Button
            large={true}
            icon="refresh"
            className="tiles__controls-tile__rotate-left"
            style={{ transform: "rotate(180deg)" }}
          />
        </td>
        <td>
          <Button icon="arrow-up" large={true} />
        </td>
        <td>
          <Button icon="refresh"  large={true} />
        </td>
      </tr>
      <tr>
        <td>
          <Button icon="arrow-left" large={true} />
        </td>
        <td>
          <Button icon="home" large={true} />
        </td>
        <td>
          <Button icon="arrow-right" large={true} />
        </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>
          <Button icon="arrow-down" large={true} />
        </td>
      </tr>
    </table>
  </MosaicWindow>
);
