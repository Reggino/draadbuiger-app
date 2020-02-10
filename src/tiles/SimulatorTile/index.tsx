// import { InstructionVisualizer } from "../../inc/instructionVisualizer";
import { ITileProps } from "../index";
import { MosaicWindow } from "react-mosaic-component";
import React from "react";

import * as THREE from "three";
import { Material } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// const instructionVisualizer = new InstructionVisualizer();

export default class SimulatorTile extends React.Component<ITileProps> {
  private mount?: HTMLDivElement | null;

  componentDidMount() {
    if (!this.mount) {
      throw new Error("SimulatorTile missing mount point?");
    }
    const width = (this.mount.parentNode as HTMLDivElement).clientWidth;
    const height = (this.mount.parentNode as HTMLDivElement).clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xeeeeee, 1);
    renderer.setSize(width, height);
    this.mount.appendChild(renderer.domElement);
    new OrbitControls(camera, this.mount);
    // the grid

    // grid
    // will get mm or inches for grid
    const widthHeightOfGrid = 200; // 200 mm grid should be reasonable
    const subSectionsOfGrid = 10; // 10mm (1 cm) is good for mm work

    // see if user wants to size up grid. default is size 1
    // so this won't modify size based on default

    // draw grid
    const grid = new THREE.GridHelper(
      widthHeightOfGrid,
      subSectionsOfGrid,
      0x0000ff,
      0x808080
    );
    grid.position.y = 0;
    grid.position.x = 0;
    grid.position.z = 0;
    grid.rotation.x = (90 * Math.PI) / 180;
    let material = grid.material as Material;
    material.opacity = 0.15;
    material.transparent = true;
    grid.receiveShadow = false;
    // scene.position.x = -150;
    scene.add(grid);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;
    const animate = function() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    const axisHelper = new THREE.AxesHelper(5);
    scene.add(axisHelper);
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
