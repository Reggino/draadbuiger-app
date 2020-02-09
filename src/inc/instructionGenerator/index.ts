import { Geometry } from "three";
import {
  getNextWireBendAngleRadians,
  getNextWireRotationAngleRadians,
  radiansToDegress
} from "../wireMath";

export class InstructionGenerator {
  private vertexIndex: number = 0;
  private geometry: Geometry = new Geometry();
  private instructions: string[] = [];

  private twist = () => {
    const nextRotationAngle = getNextWireRotationAngleRadians(
      this.geometry,
      this.vertexIndex
    );
    if (Math.abs(nextRotationAngle) < 0.00000001) {
      return;
    }

    this.instructions.push(`D ${radiansToDegress(nextRotationAngle)}`);
    this.geometry.rotateY(nextRotationAngle);
  };

  private bend = () => {
    const wireRotation = getNextWireBendAngleRadians(
      this.geometry,
      this.vertexIndex
    );
    this.instructions.push(`B ${radiansToDegress(wireRotation)}`);
    this.geometry.rotateZ(-wireRotation);
  };

  private travelToNextNibble = () => {
    // measure line length between current point and next point
    // a2 + b2 = c2
    const instructionValue = -this.geometry.vertices[this.vertexIndex + 1].y;
    this.instructions.push(`V ${instructionValue}`);
    this.geometry.translate(0, instructionValue, 0);
    this.vertexIndex += 1;
  };

  public getInstructions = (geometry: Geometry) => {
    this.geometry = geometry;
    this.instructions = ["S"];
    this.vertexIndex = 0;
    if (!this.geometry.vertices[this.vertexIndex]) {
      return this.instructions;
    }

    this.geometry.translate(
      -this.geometry.vertices[this.vertexIndex].x,
      -this.geometry.vertices[this.vertexIndex].y,
      -this.geometry.vertices[this.vertexIndex].z
    );
    const rotateX = -Math.atan(
      this.geometry.vertices[1].z / this.geometry.vertices[1].y
    );
    if (!isNaN(rotateX)) {
      this.geometry.rotateX(rotateX);
    }
    this.geometry.rotateY(
      -getNextWireRotationAngleRadians(this.geometry, this.vertexIndex)
    );
    this.geometry.rotateZ(
      -getNextWireBendAngleRadians(this.geometry, this.vertexIndex)
    );

    this.travelToNextNibble();
    while (this.geometry.vertices[this.vertexIndex + 1]) {
      this.twist();
      this.bend();
      this.travelToNextNibble();
    }
    return this.instructions;
  };
}
