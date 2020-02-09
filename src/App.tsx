import React from "react";
import NavBar from "./components/NavBar";
import { Mosaic, MosaicNode, MosaicWindow } from "react-mosaic-component";
import "@blueprintjs/core/src/blueprint.scss";
// import "@blueprintjs/icons/src/blueprint-icons.scss";
import "react-mosaic-component/react-mosaic-component.css";
import DxfProvider, { DxfContext } from "./provider/Dxf";
import { MosaicBranch } from "react-mosaic-component/src/types";
import { createGeometry } from "./inc/wire";
import { InstructionGenerator } from "./inc/instructionGenerator";
import { InstructionVisualizer } from "./inc/instructionVisualizer";
import { Button } from "@blueprintjs/core";
const instructionGenerator = new InstructionGenerator();
const instructionVisualizer = new InstructionVisualizer();

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
        first: "cam",
        second: "instructionsVisualizer"
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
            path={path}
            onDragStart={() => console.log("MosaicWindow.onDragStart")}
            onDragEnd={type => console.log("MosaicWindow.onDragEnd", type)}
          >
            <DxfContext.Consumer>
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
          <DxfContext.Consumer>
            {context => {
              const {
                dxfData,
                entityIndex,
                instructionIndex,
                setInstructionIndex
              } = context;
              const instructions: string[] = dxfData
                ? instructionGenerator.getInstructions(
                    createGeometry(dxfData.entities[entityIndex])
                  )
                : [];
              const file = instructions
                ? new Blob([instructions.join("\n")], { type: "text/plain" })
                : null;

              return (
                <MosaicWindow
                  title={`Buiginstructies`}
                  path={path}
                  onDragStart={() => console.log("MosaicWindow.onDragStart")}
                  onDragEnd={type =>
                    console.log("MosaicWindow.onDragEnd", type)
                  }
                >
                  <header>
                    {file ? (
                      <Button
                        intent={"primary"}
                        text={"Downloaden"}
                        style={{ display: "block", margin: "8px auto" }}
                        onClick={() => {
                          window.location.href = URL.createObjectURL(file);
                        }}
                      />
                    ) : null}
                    <ol
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        padding: 0,
                        margin: 0
                      }}
                    >
                      <li
                        style={{
                          listStyle: "none",
                          display: "block",
                          marginLeft: 8
                        }}
                      >
                        (S)tart
                      </li>
                      <li
                        style={{
                          listStyle: "none",
                          display: "block",
                          marginLeft: 8
                        }}
                      >
                        (V)oeren
                      </li>
                      <li
                        style={{
                          listStyle: "none",
                          display: "block",
                          marginLeft: 8
                        }}
                      >
                        (B)uigen
                      </li>
                      <li
                        style={{
                          listStyle: "none",
                          display: "block",
                          marginLeft: 8
                        }}
                      >
                        (D)raaien
                      </li>
                    </ol>
                  </header>
                  <pre
                    style={{
                      flex: 1,
                      textAlign: "left",
                      border: "1px solid",
                      overflow: "auto"
                    }}
                  >
                    {instructions.map((instruction, key) => (
                      <div key={key}>
                        <label>
                          <input
                            type="radio"
                            name="instruction"
                            value={key}
                            checked={instructionIndex === key}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const { dxfData, entityIndex } = this.context;
                              if (!dxfData) {
                                return;
                              }
                              const instructionIndex = parseInt(
                                e.currentTarget.value,
                                10
                              );
                              instructionGenerator
                                .getInstructions(
                                  createGeometry(dxfData.entities[entityIndex])
                                )
                                .slice(0, instructionIndex + 1);
                              // .map(instructionVisualizer.processInstruction);
                              setInstructionIndex(instructionIndex);
                            }}
                          />
                          {instruction}
                        </label>
                      </div>
                    ))}
                  </pre>
                  )}
                </MosaicWindow>
              );
            }}
          </DxfContext.Consumer>
        );
        break;

      case "cam":
        return (
          <div>
            <img src="http://draadbuigpi/image.mjpeg" />
          </div>
        );

      case "instructionsVisualizer":
        return (
          <div>
            <canvas id="instructionsVisualizer"></canvas>
          </div>
        );

      default:
        return <div>Not yet implemented</div>;
    }
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
}
