import * as THREE from 'three';
import { Material } from "three";

// const cadCanvas = new ThreeDxf.Viewer(dxf, document.getElementById('cad-view'), 400, 400);
const scene = new THREE.Scene();

// grid
// will get mm or inches for grid
const widthHeightOfGrid = 200; // 200 mm grid should be reasonable
const subSectionsOfGrid = 10; // 10mm (1 cm) is good for mm work

// see if user wants to size up grid. default is size 1
// so this won't modify size based on default

// draw grid
const grid = new THREE.GridHelper(widthHeightOfGrid, subSectionsOfGrid, 0x0000ff, 0x808080);
grid.position.y = 0;
grid.position.x = 0;
grid.position.z = 0;
grid.rotation.x = 90 * Math.PI / 180;
const material = grid.material as Material;
material.opacity = 0.15;
material.transparent = true;
grid.receiveShadow = false;
scene.position.x = -150;
scene.add(grid);

export default scene;
