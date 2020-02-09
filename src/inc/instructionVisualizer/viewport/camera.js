const THREE = require('three');
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 10000 );
camera.position.z = 300;

export default camera;
