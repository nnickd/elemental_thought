let points = [];
let enterToggle = true;
let shiftToggle = false;
let upToggle = true;
let leftToggle = false;
let rightToggle = true;
let downToggle = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(180);
}

function draw() {
  background(180);

  for (let pair of pairs(points)) {
    let p = pair[0];
    let p2 = pair[1];
    Gravity(p, p2, leftToggle);
    PointLine(p, p2);

    if (downToggle && !p.kill && !p2.kill) {
      let dist = p5.Vector.dist(p.pos, p2.pos);
      if (dist < (p.radius + p2.radius) / 4) {
        p2.kill = true;
        p.mass += p2.mass;
        p.color = (p.mass / 100) % 255;
      }
    }
  }

  if (downToggle) {
    points = points.filter((x) => !x.kill);

    if (frameCount % 100 == 0) {
      console.log(points.length);
    }
  }

  for (let point of points) {
    point.tick(shiftToggle);
    point.draw();
  }
}

function keyPressed() {
  if (keyCode == ENTER) {
    enterToggle = !enterToggle;
    enterToggle ? loop() : noLoop();
  }
  if (keyCode == DELETE) {
    points = [];
  }
  if (keyCode == SHIFT) {
    shiftToggle = !shiftToggle;
  }
  if (keyCode == UP_ARROW) {
    upToggle = !upToggle;
  }
  if (keyCode == RIGHT_ARROW) {
    rightToggle = !rightToggle;
  }
  if (keyCode == LEFT_ARROW) {
    leftToggle = !leftToggle;
  }
  if (keyCode == DOWN_ARROW) {
    downToggle = !downToggle;
  }
}

function mousePressed() {
  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;

  let _npoints = 4;
  let _radius = 190;
  let _angle = TWO_PI / _npoints / 3;
  let minDist = p5.Vector.dist(
    createVector(cos(_angle) * _radius, sin(_angle) * _radius),
    createVector(cos(_angle * 2) * _radius, sin(_angle * 2) * _radius)
  );
  let _levels = 2;
  let _colors = [];
  let _radiuses = [];
  let __npoints = [];
  for (let i = 0; i < _levels; i++) {
    _colors.push(((66 * i) % 255) + 66);
    _radiuses.push(_radiuses[i - 1] ? _radiuses[i - 1] / 3 : _radius);
    __npoints.push(
      Math.ceil(__npoints[i - 1] ? (__npoints[i - 1] / 2) % 6 : _npoints)
    );
  }
  __npoints = null;

  console.log(_colors, _radiuses, __npoints);

  let six = new PolyOps(
    (npoints = __npoints || _npoints),
    (radius = _radiuses || _radius),
    (pradius = 7),
    (mass = 66666),
    (limit = 40),
    (_color = _colors),
    (lineDist = minDist + 3),
    (forceDist = minDist + 3),
    (gravity = 0.01)
  );

  let _points = polyception(upToggle ? mx : 0, upToggle ? my : 0, _levels, six);

  for (let pair of pairs(_points)) {
    let p = pair[0];
    let p2 = pair[1];
    if (!p.kill && !p2.kill) {
      let dist = p5.Vector.dist(p.pos, p2.pos);
      if (dist < (p.radius + p2.radius) / 4) {
        p2.kill = true;
      }
    }
  }

  points = points.concat(_points);
  console.log(points.length);

  points = points.filter((x) => !x.kill);
  console.log(points.length);

  if (!enterToggle) {
    for (let point of points) {
      point.draw();
    }
  }
}

// function mouseDragged() {
//   mousePressed();
// }
