function Gravity(p, p2) {
  let target = p2.pos.copy().sub(p.pos);
  let dist = target.mag();

  if (dist <= (p.forceDist + p2.forceDist) / 2 && dist > (p.radius + p2.radius / 4)) {
    target.normalize();
    let gravity = (p.gravity + p2.gravity) / 2;
    let force = (gravity * p.mass * p2.mass) / (dist * dist);
    target.mult(force);
    p.force(target);
    target.mult(-1);
    p2.force(target);
  }
}

function PointLine(p, p2) {
  let dist = p5.Vector.dist(p.pos, p2.pos);

  if (dist <= (p.lineDist + p2.lineDist) / 2) {
    push();
    translate(width / 2, height / 2);
    stroke(98)
    line(
      p.pos.x + p.vel.x,
      p.pos.y + p.vel.y,
      p2.pos.x + p2.vel.x,
      p2.pos.y + p2.vel.y
    );
    pop();
  }
}
