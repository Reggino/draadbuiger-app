import { Geometry, Vector3 } from "three";
import { DxfEntity } from "dxf-parser";

export function createGeometry(entity: DxfEntity): Geometry {
  const wireGeometry = new Geometry();
  entity.vertices.forEach((rawVertex: any) => {
    wireGeometry.vertices.push(
      new Vector3(rawVertex.x, rawVertex.y, rawVertex.z)
    );
  });
  return wireGeometry;
}
