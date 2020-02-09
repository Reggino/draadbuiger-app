import axios from "axios";
import DxfParser, { DxfData } from "dxf-parser";
import * as React from "react";
import { InstructionGenerator } from "./inc/instructionGenerator";
import { InstructionVisualizer } from "./inc/instructionVisualizer";
import { createGeometry } from "./inc/wire";

import "./App.css";

// @ts-ignore
const parser = new DxfParser();
const instructionGenerator = new InstructionGenerator();
const instructionVisualizer = new InstructionVisualizer();

interface AppState {
  dxfData: DxfData;
  entityIndex: number;
  instructionIndex: number;
}

export default class App extends React.Component<{}, AppState> {
  state: AppState = {
    dxfData: { entities: [{ vertices: [], handle: "-" }] },
    instructionIndex: 0,
    entityIndex: 0
  };

  componentWillMount() {
    instructionVisualizer.start();
    axios.get("/resources/18_veel lijnen.dxf").then((res) => {
      this.loadData(res.data);
    });
  }

  private loadData = (data: string) => {
    const dxfData: DxfData = parser.parseSync(data);
    if (
      !dxfData ||
      !dxfData.entities ||
      !dxfData.entities.find(
        entity => entity.vertices && entity.vertices.length > 0
      )
    ) {
      window.alert("DXF niet leesbaar");
      return;
    }
    const entityIndex = 0;
    instructionVisualizer.setDxfData(dxfData);
    instructionVisualizer.processInstruction("S");
    this.setState({
      dxfData,
      entityIndex,
      instructionIndex: 0
    });
  };

  private onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || !files.length) {
      alert("Please select a file!");
      return;
    }
    // eslint-disable-next-line prefer-destructuring
    const file = files[0];
    const start = 0;
    const stop = file.size - 1;
    const reader = new FileReader();

    // If we use onloadend, we need to check the readyState.
    reader.onloadend = (evt: any) => {
      if (!evt.target || !evt.target.readyState) {
        return;
      }
      if (evt.target.readyState === FileReader.DONE) {
        // DONE == 2
        this.loadData(evt.target.result);
      }
    };

    const blob = file.slice(start, stop + 1);
    reader.readAsBinaryString(blob);
  };

  private onInstructionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { dxfData } = this.state;
    if (!dxfData) {
      return;
    }
    const instructionIndex = parseInt(e.currentTarget.value, 10);
    instructionGenerator
      .getInstructions(createGeometry(dxfData.entities[this.state.entityIndex]))
      .slice(0, instructionIndex + 1)
      .map(instructionVisualizer.processInstruction);
    this.setState({
      instructionIndex
    });
  };

  private onWireChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const entityIndex = parseInt(e.target.value, 10);
    instructionVisualizer.setEntityIndex(entityIndex);
    this.setState({
      entityIndex,
      instructionIndex: 0
    });
  };

  public render() {
    const { dxfData } = this.state;
    const instructions: string[] = dxfData
      ? instructionGenerator.getInstructions(
          createGeometry(dxfData.entities[this.state.entityIndex])
        )
      : [];
    const file = instructions
      ? new Blob([instructions.join("\n")], { type: "text/plain" })
      : null;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Draadbuiger</h1>
          <form>
            <div>
              <input type="file" onChange={this.onFileChange} />
            </div>
            {dxfData && dxfData.entities && dxfData.entities.length ? (
              <div>
                <select onChange={this.onWireChange}>
                  {dxfData.entities.map((entity, key) => (
                    <option value={key} key={key}>
                      Draad {key} ({entity.handle})
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
          </form>
        </header>
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
              {JSON.stringify(this.state.dxfData, null, "\t")}
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
                      checked={this.state.instructionIndex === key}
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
