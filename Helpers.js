function* polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  let n = 0;
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    if (npoints >= ++n) {
      let vec = createVector(sx, sy);
      // vec.setHeading(0);
      yield vec;
    }
  }
}

function polyception(x, y, nlevels, ops) {
  let points = [];
  let pmap = [];

  for (let i = 0; i < nlevels; i++) {
    pmap.push([]);
  }

  for (let i = 0; i < nlevels; i++) {
    let radius = ops.radius[i] || ops.radius;
    let npoints = ops.npoints[i] || ops.npoints;
    let pradius = ops.pradius[i] || ops.pradius;
    let mass = ops.mass[i] || ops.mass;
    let limit = ops.limit[i] || ops.limit;
    let pcolor = ops.color[i] || ops.color;
    let lineDist = ops.lineDist[i] || ops.lineDist;
    let forceDist = ops.forceDist[i] || ops.forceDist;
    let gravity = ops.gravity[i] || ops.gravity;

    let _p = pmap[i - 1];
    let npmax = i > 0 ? _p.length : 1;
    for (let np = 0; np < npmax; np++) {
      let _x = i > 0 ? _p[np].x : x;
      let _y = i > 0 ? _p[np].y : y;
      for (let poly of polygon(_x, _y, radius, npoints)) {
        let p = new Point(
          poly.x,
          poly.y,
          pradius,
          mass,
          limit,
          pcolor,
          lineDist,
          forceDist,
          gravity
        );
        pmap[i].push(p.pos.copy());
        points.push(p);
      }
    }
  }

  console.log(points, points.length);
  return points;
}

function* pairs(points) {
  for (let i = 0; i < points.length; i++) {
    for (let j = i; j < points.length; j++) {
      if (i !== j) {
        yield [points[i], points[j]];
      }
    }
  }
}
