import { render } from '../viewport';
var TWEEN = require('tween.js');

function renderEngine() {
  requestAnimationFrame(renderEngine);
  render();
}
renderEngine();

export default function animate(subject, properties) {
  return new Promise((resolve, reject) => {
    var tween = new TWEEN.Tween(subject).to(properties, 2000);
    var done = false;
    tween.start();
    tween.onComplete(function(){
      resolve();
      done = true;
    });

    requestAnimationFrame(animate);

    function animate(time) {
      if (!done) {
        requestAnimationFrame(animate);
      }
      TWEEN.update(time);
    }
  });
}
