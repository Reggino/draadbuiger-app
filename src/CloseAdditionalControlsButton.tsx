import { Classes } from "@blueprintjs/core";
import React from "react";

import { MosaicWindowContext } from "react-mosaic-component";

export class CloseAdditionalControlsButton extends React.PureComponent {
  static contextType = MosaicWindowContext;
  context!: MosaicWindowContext;

  render() {
    return (
      <div className={[Classes.BUTTON_GROUP, Classes.MINIMAL].join(", ")}>
        <button
          onClick={() =>
            this.context.mosaicWindowActions.setAdditionalControlsOpen(false)
          }
          className={Classes.BUTTON}
        >
          Proof of Concept Button!
        </button>
      </div>
    );
  }
}
