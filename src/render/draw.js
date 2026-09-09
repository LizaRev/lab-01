export function drawScene(ctx, width, height, ship) {
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = '#050816';
  ctx.fillRect(0, 0, width, height);

  drawGrid(ctx, width, height);
  drawShip(ctx, ship);
}

function drawGrid(ctx, width, height) {
  const size = 50;

  ctx.strokeStyle = '#172033';
  ctx.lineWidth = 1;

  for (let x = 0; x <= width; x += size) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y <= height; y += size) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function drawShip(ctx, ship) {
  ctx.save();

  ctx.translate(ship.x, ship.y);
  ctx.rotate(ship.angle);

  ctx.beginPath();
  ctx.moveTo(22, 0);
  ctx.lineTo(-15, -12);
  ctx.lineTo(-10, 0);
  ctx.lineTo(-15, 12);
  ctx.closePath();

  ctx.fillStyle = 'white';
  ctx.fill();

  if (ship.thrust) {
    ctx.beginPath();
    ctx.moveTo(-10, -6);
    ctx.lineTo(-28, 0);
    ctx.lineTo(-10, 6);
    ctx.closePath();

    ctx.fillStyle = 'orange';
    ctx.fill();
  }

  ctx.restore();
}