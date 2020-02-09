// import { Geometry, Vector3 } from 'three';
// import { degreesToRadians, getNextWireBendAngleRadians, getNextWireRotationAngleRadians } from './wireMath';
//
// /*
//
// Test proper results when next point is a certain quadrant
//
//     |
//  q1 | q2
//  -------
//  q3 | q4
//     |
//
//  */
//
// test('getNextWireBendAngleRadians q1', () => {
//   const wireGeometry = new Geometry();
//   wireGeometry.vertices.push(
//     new Vector3(0, 0, 0),
//     new Vector3(-10, 10, 0),
//   );
//   expect(getNextWireBendAngleRadians(wireGeometry, 0)).toBeCloseTo(-degreesToRadians(135));
// });
//
// test('getNextWireBendAngleRadians q2', () => {
//   const wireGeometry = new Geometry();
//   wireGeometry.vertices.push(
//     new Vector3(0, 0, 0),
//     new Vector3(10, 10, 0),
//   );
//   expect(getNextWireBendAngleRadians(wireGeometry, 0)).toBeCloseTo(degreesToRadians(135));
// });
//
// test('getNextWireBendAngleRadians q3', () => {
//   const wireGeometry = new Geometry();
//   wireGeometry.vertices.push(
//     new Vector3(0, 0, 0),
//     new Vector3(-10, -10, 0),
//   );
//   expect(getNextWireBendAngleRadians(wireGeometry, 0)).toBeCloseTo(-degreesToRadians(45));
// });
//
// test('getNextWireBendAngleRadians q4', () => {
//   const wireGeometry = new Geometry();
//   wireGeometry.vertices.push(
//     new Vector3(0, 0, 0),
//     new Vector3(10, -10, 0),
//   );
//   expect(getNextWireBendAngleRadians(wireGeometry, 0)).toBeCloseTo(degreesToRadians(45));
// });
//
// test('getNextWireRotationAngleRadians q1', () => {
//   const wireGeometry = new Geometry();
//   wireGeometry.vertices.push(
//     new Vector3(0, 0, 0),
//     new Vector3(-10, 0, 10),
//   );
//   expect(getNextWireRotationAngleRadians(wireGeometry, 0)).toBeCloseTo(-degreesToRadians(45));
// });
//
// test('getNextWireRotationAngleRadians q2', () => {
//   const wireGeometry = new Geometry();
//   wireGeometry.vertices.push(
//     new Vector3(0, 0, 0),
//     new Vector3(10, 0, 10),
//   );
//   expect(getNextWireRotationAngleRadians(wireGeometry, 0)).toBeCloseTo(degreesToRadians(45));
// });
//
// test('getNextWireRotationAngleRadians q3', () => {
//   const wireGeometry = new Geometry();
//   wireGeometry.vertices.push(
//     new Vector3(0, 0, 0),
//     new Vector3(-10, 0, -10),
//   );
//   expect(getNextWireRotationAngleRadians(wireGeometry, 0)).toBeCloseTo(degreesToRadians(45));
// });
//
// test('getNextWireRotationAngleRadians q4', () => {
//   const wireGeometry = new Geometry();
//   wireGeometry.vertices.push(
//     new Vector3(0, 0, 0),
//     new Vector3(10, 0, -10),
//   );
//   expect(getNextWireRotationAngleRadians(wireGeometry, 0)).toBeCloseTo(-degreesToRadians(45));
// });
//
// test('getNextWireRotationAngleRadians 0', () => {
//   const wireGeometry = new Geometry();
//   wireGeometry.vertices.push(
//     new Vector3(0, 0, 0),
//     new Vector3(0, 10, 0),
//   );
//   expect(getNextWireRotationAngleRadians(wireGeometry, 0)).toBe(0);
// });
