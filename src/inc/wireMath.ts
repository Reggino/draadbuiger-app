import { Geometry } from 'three';

export const degreesToRadians = (degrees:number) => degrees * (Math.PI / 180);

export const radiansToDegress = (radians:number) => radians * (180 / Math.PI);

export function getNextWireBendAngleRadians(geometry:Geometry, pointer:number) {
  let xLength = geometry.vertices[pointer + 1].x - geometry.vertices[pointer].x;
  let yLength = geometry.vertices[pointer + 1].y - geometry.vertices[pointer].y;
  let tmp;
  let result = 0;

  // bend more then 90 degrees?
  if (yLength > 0) {
    tmp = xLength;
    if (xLength > 0) {
      result += degreesToRadians(90);
      xLength = yLength;
    } else {
      result -= degreesToRadians(90);
      xLength = -yLength;
    }
    yLength = -tmp;
  }

  // bend the rest of the degrees...
  return result + Math.atan(xLength / Math.abs(yLength));
}

export function getNextWireRotationAngleRadians(geometry:Geometry, pointer:number) {
  const nextX = geometry.vertices[pointer + 1].x;
  const nextZ = geometry.vertices[pointer + 1].z;
  const result = Math.atan(nextZ / nextX);
  return (isNaN(result) ? 0 : result);
}
