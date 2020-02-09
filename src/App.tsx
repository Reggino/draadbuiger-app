import React from "react";
import NavBar from "./components/NavBar";

import {
  createBalancedTreeFromLeaves,
  getLeaves,
  Mosaic,
  MosaicNode,
  MosaicWindow,
  MosaicZeroState
} from "react-mosaic-component";

import "@blueprintjs/core/src/blueprint.scss";
// import "@blueprintjs/icons/src/blueprint-icons.scss";
import "react-mosaic-component/react-mosaic-component.css";
import DxfProvider, { DxfContext } from "./provider/Dxf";
import { MosaicBranch } from "react-mosaic-component/src/types";

let windowCount = 3;

export interface ExampleAppState {
  currentNode: MosaicNode<string> | null;
}

export default class ExampleApp extends React.PureComponent<
  {},
  ExampleAppState
> {
  state: ExampleAppState = {
    currentNode: {
      direction: "row",
      first: {
        direction: "row",
        first: "dxfData",
        second: "instructions"
      },
      second: {
        direction: "column",
        first: "test1",
        second: "test2"
      },
      splitPercentage: 80
    }
  };

  private renderTile = (count: string, path: MosaicBranch[]) => {
    switch (count) {
      case "dxfData":
        return (
          <MosaicWindow
            title={`DXF data`}
            createNode={this.createNode}
            path={path}
            onDragStart={() => console.log("MosaicWindow.onDragStart")}
            onDragEnd={type => console.log("MosaicWindow.onDragEnd", type)}
          >
            <DxfContext.Consumer key={count}>
              {context => (
                <pre style={{ maxHeight: "100%", overflow: "auto" }}>
                  {JSON.stringify(context.dxfData, null, "\t")}
                </pre>
              )}
            </DxfContext.Consumer>
          </MosaicWindow>
        );
        break;
      case "instructions":
        return (
          <MosaicWindow
            title={`Window ${count}`}
            createNode={this.createNode}
            path={path}
            onDragStart={() => console.log("MosaicWindow.onDragStart")}
            onDragEnd={type => console.log("MosaicWindow.onDragEnd", type)}
          >
            <div className="example-window">
              <h1>{`Window ${count}`}</h1>
            </div>
            )}
          </MosaicWindow>
        );
        break;

      default:
        return (
          <MosaicWindow
            title={`Window ${count}`}
            createNode={this.createNode}
            path={path}
            onDragStart={() => console.log("MosaicWindow.onDragStart")}
            onDragEnd={type => console.log("MosaicWindow.onDragEnd", type)}
          >
            <div className="example-window">
              <h1>{`Window ${count}`}</h1>
            </div>
            )}
          </MosaicWindow>
        );
    }
  };

  render() {
    return (
      <DxfProvider>
        <div className="react-mosaic-example-app">
          <NavBar />
          <Mosaic
            renderTile={this.renderTile}
            zeroStateView={<MosaicZeroState createNode={this.createNode} />}
            value={this.state.currentNode}
            onChange={this.onChange}
            onRelease={this.onRelease}
            className={"mosaic-blueprint-theme"}
          />
        </div>
      </DxfProvider>
    );
  }

  private onChange = (currentNode: MosaicNode<string> | null) => {
    this.setState({ currentNode });
  };

  private onRelease = (currentNode: MosaicNode<string> | null) => {
    console.log("Mosaic.onRelease():", currentNode);
  };

  private createNode = () => ++windowCount;

  private autoArrange = () => {
    const leaves = getLeaves(this.state.currentNode);

    this.setState({
      currentNode: createBalancedTreeFromLeaves(leaves)
    });
  };
}
