import { extend, useFrame, useThree } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import React, { useRef } from "react";

extend({ OrbitControls });

export default function Controls() {
  const controls = useRef<any>();
  const { camera, gl } = useThree();
  useFrame(() => {
    if (!controls.current) {
      return;
    }
    controls.current.update();
  });

  return (
    // @ts-ignore
    <orbitControls
      ref={controls}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.1}
      rotateSpeed={0.5}
    />
  );
}
