import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { DxfEntity } from "dxf-parser";
import { Vector3 } from "three";

/**
 *
 *         const wire = new Line(
 geometry,
 new LineBasicMaterial({
            color: entityIndex === this.entityIndex ? 0xff0000 : 0x00ff00
          })
 );
 viewport.add(wire);
 return wire;
 */

interface IWireProps {
  entity: DxfEntity;
  color: 0xff0000 | 0x00ff00;
}

export default function Wire({ entity, color }: IWireProps) {
  const vertices: Vector3[] = [];
  entity.vertices.forEach((rawVertex: any) => {
    vertices.push(new Vector3(rawVertex.x, rawVertex.y, rawVertex.z));
  });
  return (
    <line>
      <geometry attach="geometry" vertices={vertices} />
      <lineBasicMaterial attach="material" color={color} />
    </line>
  );
}
