// import { InstructionVisualizer } from "../../inc/instructionVisualizer";
import { ITileProps } from "../index";
import { MosaicWindow } from "react-mosaic-component";
import React, { useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";

function Box(props: any) {
  const ref = useRef<THREE.Mesh>();
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.005;
      ref.current.rotation.y += 0.0075;
    }
  });
  return (
    <mesh ref={ref}>
      <boxGeometry attach="geometry" args={[1, 1]} />
      <meshStandardMaterial attach="material" color={0xfe9966} />
    </mesh>
  );
}

export default ({ path }: ITileProps) => (
  <MosaicWindow title={`Simulator`} path={path}>
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 0, 10]} intensity={1} />
      <Box />
    </Canvas>
  </MosaicWindow>
);
