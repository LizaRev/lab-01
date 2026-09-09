import { createLoop } from './loop.js';
import { createInput } from './input.js';
import { createShip, integrate } from './sim/ship.js';
import { wrapShip } from './sim/arena.js';
import { createCanvas } from './render/canvas.js';
import { drawScene } from './render/draw.js';

const input = createInput(window);
const canvas = createCanvas();

let current = createShip(canvas.width / 2, canvas.height / 2);
let previous = { ...current };

function lerp(a, b, alpha) {
  return a + (b - a) * alpha;
}

function lerpAngle(a, b, alpha) {
  const twoPi = Math.PI * 2;
  let difference = (b - a) % twoPi;

  if (difference > Math.PI) {
    difference -= twoPi;
  }

  if (difference < -Math.PI) {
    difference += twoPi;
  }

  return a + difference * alpha;
}

function render(alpha) {
  const ship = {
    x: lerp(previous.x, current.x, alpha),
    y: lerp(previous.y, current.y, alpha),
    angle: lerpAngle(previous.angle, current.angle, alpha),
    thrust: current.thrust
  };

  drawScene(
    canvas.ctx,
    canvas.width,
    canvas.height,
    ship
  );

  const stats = loop.getStats();

  hud.textContent =
    `Steps/s: ${stats.stepsPerSecond}\n` +
    `FPS: ${stats.framesPerSecond}\n` +
    `Frame time: ${stats.lastFrameDuration.toFixed(4)} ms`;
}

const hud = document.createElement('div');

hud.style.position = 'fixed';
hud.style.top = '10px';
hud.style.left = '10px';
hud.style.padding = '10px';
hud.style.background = 'rgba(0, 0, 0, 0.7)';
hud.style.color = 'white';
hud.style.fontFamily = 'monospace';
hud.style.whiteSpace = 'pre';

document.body.appendChild(hud);

const loop = createLoop({
  step: 1 / 60,

  simulate(dt) {
    previous = { ...current };

    integrate(current, input, dt);
    wrapShip(current, canvas.width, canvas.height);

    input.endFrame();
  },

  render
});

loop.start();