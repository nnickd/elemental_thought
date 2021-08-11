





let points = [];
let groups = [];
let loopy = true;
let toroidial = false;
let upToggle = true;
let leftToggle = true;
let rightToggle = true;
let downToggle = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(180)
}

function draw() {
  background(180);

    
    for (let pair of pairs(points)) {
      let p = pair[0];
      let p2 = pair[1];
      if (p.idx != p2.idx) {
          Gravity(p, p2);
          PointLine(p, p2);
          
          if (downToggle && !p.kill && !p2.kill) {
            let dist = p5.Vector.dist(p.pos, p2.pos);
            if (dist < (p.radius + p2.radius) / 4) {
              p2.kill = true;
            }
          }
        }
    }
    
    if (downToggle) {
      points = points.filter(x => !x.kill);
    }
    
  // }
  // for (let points of groups) {
    for (let point of points) {
      point.tick(toroidial);
      point.draw();
    }
  // }
}

function keyPressed() {
  if (keyCode == ENTER) {
    loopy = !loopy;
    loopy ? loop() : noLoop();
  }
  if (keyCode == DELETE) {
    points = [];
    groups = [];
  }
  if (keyCode == SHIFT) {
    toroidial = !toroidial;
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

  let six = new PolyOps(
    (npoints = [6, 6]),
    (radius =  [160, 80]),
    (pradius = 10),  
    (mass = [1000, 10]),
    (limit = 100),
    (_color = 66),
    (lineDist = 90),
    (forceDist = 90),
    (gravity = .01)
  );
  
  let _points = polyception(upToggle ? mx : 0, upToggle ? my : 0, 2, six);
  
  //let three = new PolyOps(
  //  (npoints = 6),
  //  (radius =  90),
  //  (pradius = 10),  
  //  (mass = 10000),
  //  (limit = 5),
  //  (_color = [66, 127, 166]),
  //  (lineDist = 100),
  //  (forceDist = 100),
  //  (gravity = .01)
  //);

  //let _points = polyception(upToggle ? mx : 0, upToggle ? my : 0, 3, three);
  
  //let four = new PolyOps(
  //  (npoints = 3),
  //  (radius =  80),
  //  (pradius = 30  ),  
  //  (mass = 1000),
  //  (limit = 300),
  //  (_color = 66),
  //  (lineDist = 90),
  //  (forceDist = 90),
  //  (gravity = .01)
  //);

  //let _points = polyception(upToggle ? mx : 0, upToggle ? my : 0,9, four);
  
  
  
  
  for (let i = 0; i < _points.length; i++) {
      for (let j = i; j < _points.length; j++) {
        if (i != j) {
          let p = _points[i];
          let p2 = _points[j];
          if (!p.kill && !p2.kill) {
            
            let dist = p5.Vector.dist(p.pos, p2.pos);
            if (dist < (p.radius + p2.radius) / 4) {
              p2.kill = true;
            }
        }

      }
    }
  }
  
  points = points.concat(_points);
  console.log(points.length);
  
  points = points.filter(x => !x.kill);
  console.log(points.length);
  
  if (!loopy) {
    for (let point of points) {
      point.draw();
    }
  }
  // groups.push(_points);
}

// function mouseDragged() {
//   mousePressed();
// }
