let PointIDX = 0;

class Point {
 
  constructor(
  x,
  y,
  radius,
  mass,
  limit,
  _color,
  lineDist,
  forceDist,
  gravity
) {
  this.idx = PointIDX++;
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);

  this.limit = limit || 6;
  this.radius = radius || 30;
  this.mass = mass || 10;
  this.color = _color || 69;
  this.lineDist = lineDist || 100;
  this.forceDist = forceDist || 100;
  this.gravity = gravity || 0.01;
  this.kill = false;
}

tick (toroidial = false) {
  this.vel.add(this.acc);
  this.vel.limit(this.limit);
  this.pos.add(this.vel);
  this.acc.mult(0);

  if (toroidial) {
    if (this.pos.x < -width / 2 + this.radius) {
      this.pos.x = width / 2 - this.radius;
    }
    if (this.pos.x > width / 2 - this.radius) {
      this.pos.x = -width / 2 + this.radius;
    }
    if (this.pos.y < -height / 2 + this.radius) {
      this.pos.y = height / 2 - this.radius;
    }
    if (this.pos.y > height / 2 - this.radius) {
      this.pos.y = -height / 2 + this.radius;
    }
  } else {
    if (this.pos.x < -width / 2 + this.radius) {
      this.vel.x *= -1;
      this.pos.x = -width / 2 + this.radius;
    }
    if (this.pos.x > width / 2 - this.radius) {
      this.vel.x *= -1;
      this.pos.x = width / 2 - this.radius;
    }
    if (this.pos.y < -height / 2 + this.radius) {
      this.vel.y *= -1;
      this.pos.y = -height / 2 + this.radius;
    }
    if (this.pos.y > height / 2 - this.radius) {
      this.vel.y *= -1;
      this.pos.y = height / 2 - this.radius;
    }
  }
}

draw  () {
  push();
  translate(width / 2, height / 2);
  fill(this.color);
  ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
  pop();
}

force (force) {
  this.acc.add(force.copy().div(this.mass));
}
  
}
