import { Geometry, Line, LineBasicMaterial } from "three";
import viewport, { init as viewportInit, render } from "./viewport";
import {
  degreesToRadians,
  getNextWireBendAngleRadians,
  getNextWireRotationAngleRadians
} from "../wireMath";
import { createGeometry } from "../wire";
import { DxfData } from "dxf-parser";

export class InstructionVisualizer {
  private dxfData?: DxfData;
  private entityIndex: number = 0;
  private geometries: Geometry[] = [];
  private wires: Line[] = [];

  public start() {
    viewportInit();
    function renderEngine() {
      requestAnimationFrame(renderEngine);
      render();
    }
    renderEngine();
  }

  public setDxfData(dxfData: DxfData) {
    this.dxfData = dxfData;
    this.entityIndex = 0;
  }

  public setEntityIndex(entityIndex: number) {
    this.entityIndex = entityIndex;
    this.processInstruction("S");
  }

  public processInstruction = (instruction: string) => {
    const instructionParts = instruction.split(" ");
    const [instructionType] = instructionParts;
    if (this.dxfData && instructionType === "S") {
      this.geometries = this.dxfData.entities.map(entity =>
        createGeometry(entity)
      );
      this.wires.forEach(wire => viewport.remove(wire));
      // @ts-ignore
      this.wires = this.geometries.map((geometry, entityIndex) => {
        const wire = new Line(
          geometry,
          new LineBasicMaterial({
            color: entityIndex === this.entityIndex ? 0xff0000 : 0x00ff00
          })
        );
        viewport.add(wire);
        return wire;
      });
    } else {
      if (this.wires) {
        this.wires.forEach((wire, entityIndex) => {
          wire.visible = entityIndex === this.entityIndex;
        });
      }
    }

    const geometry = this.geometries[this.entityIndex];
    if (!geometry) {
      return;
    }

    const instructionValue = instructionParts[1]
      ? parseFloat(instructionParts[1])
      : 0;
    switch (instructionType) {
      case "S": // Start
        const transX = -geometry.vertices[0].x;
        const transY = -geometry.vertices[0].y;
        const transZ = -geometry.vertices[0].z;
        geometry.translate(transX, transY, transZ);
        const rotateX = -Math.atan(
          geometry.vertices[1].z / geometry.vertices[1].y
        );
        if (!isNaN(rotateX)) {
          geometry.rotateX(rotateX);
        }
        const rotateY = -getNextWireRotationAngleRadians(geometry, 0);
        geometry.rotateY(rotateY);
        const rotateZ = -getNextWireBendAngleRadians(geometry, 0);
        geometry.rotateZ(rotateZ);

        this.geometries.forEach((geometry, entityIndex) => {
          if (entityIndex === this.entityIndex) {
            return;
          }
          geometry.translate(transX, transY, transZ);
          if (!isNaN(rotateX)) {
            geometry.rotateX(rotateX);
          }
          geometry.rotateY(rotateY);
          geometry.rotateZ(rotateZ);
        });
        break;

      case "V": // Voeren
        geometry.translate(0, instructionValue, 0);
        break;
      case "B": // Buigen
        geometry.rotateZ(-degreesToRadians(instructionValue));
        break;
      case "D": // Draaien
        geometry.rotateY(degreesToRadians(instructionValue));
    }
  };
}
