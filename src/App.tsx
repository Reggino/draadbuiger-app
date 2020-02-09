import { Classes, HTMLSelect } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import React from "react";
import Old from "./Old";

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
// import "../styles/index.less";
// import "./example.less";

// tslint:disable no-console

// tslint:disable-next-line no-var-requires
const { version } = require("../package.json");

function classNames(...args: string[]) {
  return args.join(" ");
}

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
      <React.StrictMode>
        <div className="react-mosaic-example-app">
          <div className={classNames(Classes.NAVBAR, Classes.DARK)}>
            <div className={Classes.NAVBAR_GROUP}>
              <div className={Classes.NAVBAR_HEADING}>
                <a href="https://bitbucket.org/Reggino/draadbuiger-app/">
                  Draadbuiger <span className="version">v{version}</span>
                </a>
              </div>
            </div>
            <div
              className={classNames(Classes.NAVBAR_GROUP, Classes.BUTTON_GROUP)}
            >
              <label
                className={classNames(
                  "theme-selection",
                  Classes.LABEL,
                  Classes.INLINE
                )}
              >
                Theme:
                <HTMLSelect
                  value={this.state.currentTheme}
                  onChange={e =>
                    this.setState({
                      currentTheme: e.currentTarget.value as Theme
                    })
                  }
                >
                  {React.Children.toArray(
                    Object.keys(THEMES).map(label => <option>{label}</option>)
                  )}
                </HTMLSelect>
              </label>
              <div className="navbar-separator" />
              <span className="actions-label">Example Actions:</span>
              <button
                className={classNames(
                  Classes.BUTTON,
                  Classes.iconClass(IconNames.GRID_VIEW)
                )}
                onClick={this.autoArrange}
              >
                Auto Arrange
              </button>
              <button
                className={classNames(
                  Classes.BUTTON,
                  Classes.iconClass(IconNames.ARROW_TOP_RIGHT)
                )}
                onClick={this.addToTopRight}
              >
                Add Window to Top Right
              </button>
            </div>
          </div>
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
      </React.StrictMode>
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
