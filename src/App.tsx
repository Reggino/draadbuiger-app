import React from "react";
import NavBar from "./components/NavBar";
import { Mosaic, MosaicNode } from "react-mosaic-component";
import DxfProvider from "./provider/Dxf";
import { MosaicBranch } from "react-mosaic-component/src/types";
import CamTile from "./tiles/CamTile";
import DxfDataTile from "./tiles/DxfDataTile";
import InstructionsTile from "./tiles/InstructionsTile";
import SimulatorTile from "./tiles/SimulatorTile";
import ControlsTile from "./tiles/ControlsTile";

export interface IAppState {
  currentNode: MosaicNode<TDraadbuigerMosaicKey> | null;
}

const tileComponents = {
  dxfData: DxfDataTile,
  instructions: InstructionsTile,
  cam: CamTile,
  simulator: SimulatorTile,
  controls: ControlsTile
};

type TDraadbuigerMosaicKey = keyof typeof tileComponents;

export default class ExampleApp extends React.PureComponent<{}, IAppState> {
  state: IAppState = {
    currentNode: {
      direction: "row",
      first: "simulator",
      second: {
        direction: "row",
        first: {
          direction: "column",
          first: "dxfData",
          second: "instructions"
        },
        second: {
          direction: "column",
          first: "cam",
          second: "controls",
          splitPercentage: 40
        }
      },
      splitPercentage: 60
    }
  };

  private renderTile = (
    tileId: TDraadbuigerMosaicKey,
    path: MosaicBranch[]
  ) => {
    const Component = tileComponents[tileId];
    return <Component path={path} />;
  };

  render() {
    return (
      <DxfProvider>
        <div className="react-mosaic-example-app">
          <NavBar />
          <Mosaic
            renderTile={this.renderTile}
            value={this.state.currentNode}
            onChange={this.onChange}
            className={"mosaic-blueprint-theme"}
          />
        </div>
      </DxfProvider>
    );
  }

  private onChange = (
    currentNode: MosaicNode<TDraadbuigerMosaicKey> | null
  ) => {
    this.setState({ currentNode });
  };
}
