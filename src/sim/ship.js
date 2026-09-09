export function createShip(x, y) {
  return {
    x,
    y,
    vx: 0,
    vy: 0,
    angle: 0,
    thrust: 0
  };
}

export function integrate(ship, input, dt) {
  const rotationSpeed = 3;
  const thrustPower = 200;
  const drag = 0.99;
  const maxSpeed = 400;

  if (input.isDown('ArrowLeft')) {
    ship.angle -= rotationSpeed * dt;
  }

  if (input.isDown('ArrowRight')) {
    ship.angle += rotationSpeed * dt;
  }

  ship.thrust = input.isDown('ArrowUp') ? 1 : 0;

  if (ship.thrust) {
    ship.vx += Math.cos(ship.angle) * thrustPower * dt;
    ship.vy += Math.sin(ship.angle) * thrustPower * dt;
  }

  ship.vx *= Math.pow(drag, dt * 60);
  ship.vy *= Math.pow(drag, dt * 60);

  const speed = Math.hypot(ship.vx, ship.vy);

  if (speed > maxSpeed) {
    ship.vx = (ship.vx / speed) * maxSpeed;
    ship.vy = (ship.vy / speed) * maxSpeed;
  }

  ship.x += ship.vx * dt;
  ship.y += ship.vy * dt;
}