import { WebGLRenderer } from "three";
import camera from "./camera";

export function getRenderer() {
  const canvas = document.querySelector(
    "#instructionsVisualizer"
  ) as HTMLCanvasElement;
  console.log(canvas);
  if (!canvas) {
    throw new Error("Missing canvas");
  }
  const renderer: WebGLRenderer = new WebGLRenderer({
    antialias: false,
    canvas
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xeeeeee, 1);
  // document.body.appendChild(renderer.domElement);
  // renderer.domElement.style.position = "fixed";
  // renderer.domElement.style.top = "0";
  // renderer.domElement.style.left = "0";
  // renderer.domElement.style.zIndex = "-1";

  window.onresize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };

  return renderer;
}
