import { createGeometry } from "../../inc/wire";
import { MosaicWindow } from "react-mosaic-component";
import { Button } from "@blueprintjs/core";
import React, { useContext } from "react";
import { DxfContext } from "../../provider/Dxf";
import { ITileProps } from "../index";
import { InstructionGenerator } from "../../inc/instructionGenerator";

const instructionGenerator = new InstructionGenerator();

export default ({ path }: ITileProps) => {
  const {
    entityIndex,
    dxfData,
    instructionIndex,
    setInstructionIndex
  } = useContext(DxfContext);
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
      onDragEnd={type => console.log("MosaicWindow.onDragEnd", type)}
    >
      <header>
        {file ? (
          <Button
            intent={"primary"}
            text={"Downloaden"}
            style={{ display: "block", margin: "8px auto" }}
            onClick={() => {
              window.open(URL.createObjectURL(file));
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (!dxfData) {
                    return;
                  }
                  const instructionIndex = parseInt(e.currentTarget.value, 10);
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
};
