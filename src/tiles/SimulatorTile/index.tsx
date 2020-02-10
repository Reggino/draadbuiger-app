// import { InstructionVisualizer } from "../../inc/instructionVisualizer";
import { ITileProps } from "../index";
import { MosaicWindow } from "react-mosaic-component";
import React from "react";

import * as THREE from "three";

// const instructionVisualizer = new InstructionVisualizer();

export default class SimulatorTile extends React.Component<ITileProps> {
  private mount?: HTMLDivElement | null;

  componentDidMount() {
    if (!this.mount) {
      throw new Error("SimulatorTile missing mount point?");
    }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    this.mount.appendChild(renderer.domElement);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;
    const animate = function() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  }
  render() {
    return (
      <MosaicWindow title={`Simulator`} path={this.props.path}>
        <div ref={ref => (this.mount = ref)} />
      </MosaicWindow>
    );
  }
}
