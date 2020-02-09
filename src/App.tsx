import React from "react";
import Old from "./Old";
import NavBar from "./components/NavBar";

import {
  createBalancedTreeFromLeaves,
  getLeaves,
  Mosaic,
  MosaicNode,
  MosaicWindow,
  MosaicZeroState
} from "react-mosaic-component";

import { CloseAdditionalControlsButton } from "./CloseAdditionalControlsButton";

import "@blueprintjs/core/src/blueprint.scss";
// import "@blueprintjs/icons/src/blueprint-icons.scss";
import "react-mosaic-component/react-mosaic-component.css";
import DxfProvider from "./provider/Dxf";
// import "../styles/index.less";
// import "./example.less";

// tslint:disable no-console

// tslint:disable-next-line no-var-requires

let windowCount = 3;

export const THEMES = {
  Blueprint: "mosaic-blueprint-theme"
};

export type Theme = keyof typeof THEMES;

const additionalControls = React.Children.toArray([
  <CloseAdditionalControlsButton />
]);

const EMPTY_ARRAY: any[] = [];

export interface ExampleAppState {
  currentNode: MosaicNode<number> | null;
  currentTheme: Theme;
}

export default class ExampleApp extends React.PureComponent<
  {},
  ExampleAppState
> {
  state: ExampleAppState = {
    currentNode: {
      direction: "row",
      first: 1,
      second: {
        direction: "column",
        first: 2,
        second: 3
      },
      splitPercentage: 80
    },
    currentTheme: "Blueprint"
  };

  render() {
    return (
      <DxfProvider>
        <div className="react-mosaic-example-app">
          <NavBar />
          <Mosaic<number>
            renderTile={(count, path) => {
              console.log(count, path);
              return (
                <MosaicWindow<number>
                  additionalControls={
                    count === 3 ? additionalControls : EMPTY_ARRAY
                  }
                  title={`Window ${count}`}
                  createNode={this.createNode}
                  path={path}
                  onDragStart={() => console.log("MosaicWindow.onDragStart")}
                  onDragEnd={type =>
                    console.log("MosaicWindow.onDragEnd", type)
                  }
                  renderToolbar={
                    count === 2
                      ? () => (
                          <div className="toolbar-example">Custom Toolbar</div>
                        )
                      : null
                  }
                >
                  {count === 1 ? (
                    <Old />
                  ) : (
                    <div className="example-window">
                      <h1>{`Window ${count}`}</h1>
                    </div>
                  )}
                </MosaicWindow>
              );
            }}
            zeroStateView={<MosaicZeroState createNode={this.createNode} />}
            value={this.state.currentNode}
            onChange={this.onChange}
            onRelease={this.onRelease}
            className={THEMES[this.state.currentTheme]}
          />
        </div>
      </DxfProvider>
    );
  }

  private onChange = (currentNode: MosaicNode<number> | null) => {
    this.setState({ currentNode });
  };

  private onRelease = (currentNode: MosaicNode<number> | null) => {
    console.log("Mosaic.onRelease():", currentNode);
  };

  private createNode = () => ++windowCount;

  private autoArrange = () => {
    const leaves = getLeaves(this.state.currentNode);

    this.setState({
      currentNode: createBalancedTreeFromLeaves(leaves)
    });
  };

  private addToTopRight = () => {
    let { currentNode } = this.state;
    if (currentNode) {
      // const path = getPathToCorner(currentNode, Corner.TOP_RIGHT);
      // const parent = getNodeAtPath(
      //   currentNode,
      //   dropRight(path)
      // ) as MosaicParent<number>;
      // const destination = getNodeAtPath(currentNode, path) as MosaicNode<
      //   number
      // >;
      // const direction: MosaicDirection = parent
      //   ? getOtherDirection(parent.direction)
      //   : "row";
      // let first: MosaicNode<number>;
      // let second: MosaicNode<number>;
      // if (direction === "row") {
      //   first = destination;
      //   second = ++windowCount;
      // } else {
      //   first = ++windowCount;
      //   second = destination;
      // }
      //
      // currentNode = updateTree(currentNode, [
      //   {
      //     path,
      //     spec: {
      //       $set: {
      //         direction,
      //         first,
      //         second
      //       }
      //     }
      //   }
      // ]);
    } else {
      currentNode = ++windowCount;
    }

    this.setState({ currentNode });
  };
}
