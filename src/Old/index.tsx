import * as React from "react";
import { InstructionGenerator } from "../inc/instructionGenerator";
import { InstructionVisualizer } from "../inc/instructionVisualizer";
import { createGeometry } from "../inc/wire";

import "./index.scss";
import { DxfContext } from "../provider/Dxf";

const instructionGenerator = new InstructionGenerator();
const instructionVisualizer = new InstructionVisualizer();

export default class App extends React.Component<{}> {
  static contextType = DxfContext;

  componentWillMount() {
    instructionVisualizer.start();
  }

  private onInstructionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { dxfData, entityIndex } = this.context;
    if (!dxfData) {
      return;
    }
    const instructionIndex = parseInt(e.currentTarget.value, 10);
    instructionGenerator
      .getInstructions(createGeometry(dxfData.entities[entityIndex]))
      .slice(0, instructionIndex + 1)
      .map(instructionVisualizer.processInstruction);
    this.setState({
      instructionIndex
    });
  };

  public render() {
    const { dxfData, entityIndex, instructionIndex } = this.context;
    const instructions: string[] = dxfData
      ? instructionGenerator.getInstructions(
          createGeometry(dxfData.entities[entityIndex])
        )
      : [];
    const file = instructions
      ? new Blob([instructions.join("\n")], { type: "text/plain" })
      : null;
    return (
      <div className="App">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="App-column">
            <header>
              <h2 style={{ marginBottom: 18 }}>DXF data</h2>
            </header>
            <pre
              style={{
                display: "flex",
                flex: 1,
                textAlign: "left",
                border: "1px solid",
                overflow: "auto"
              }}
            >
              {JSON.stringify(dxfData, null, "\t")}
            </pre>
          </div>
          <div className="App-column">
            <header>
              {file ? (
                <a href={URL.createObjectURL(file)} download="draadbuiger.txt">
                  Downloaden
                </a>
              ) : null}
              <h2 style={{ padding: 0, marginBottom: 0 }}>Buiginstructies</h2>
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
                  style={{ listStyle: "none", display: "block", marginLeft: 8 }}
                >
                  (S)tart
                </li>
                <li
                  style={{ listStyle: "none", display: "block", marginLeft: 8 }}
                >
                  (V)oeren
                </li>
                <li
                  style={{ listStyle: "none", display: "block", marginLeft: 8 }}
                >
                  (B)uigen
                </li>
                <li
                  style={{ listStyle: "none", display: "block", marginLeft: 8 }}
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
                      onChange={this.onInstructionChange}
                    />
                    {instruction}
                  </label>
                </div>
              ))}
            </pre>
          </div>
        </div>
      </div>
    );
  }
}
