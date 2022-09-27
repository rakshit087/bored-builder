let cosmicEntities = [];
let simulate = false;
const G = 100;

class Cosmic {
  constructor(x, y, mass) {
    this.position = createVector(x, y);
    this.velocity = mass<50 ? createVector(random(-1, 1), random(-1, 1)) : createVector(0,0);
    this.acceleration = createVector(0, 0);
    this.mass = mass;
    this.radius = mass < 50 ? sqrt(this.mass) * 10 : sqrt(this.mass) / 5;
    this.color = color(random(255), random(255), random(255));
  }
  update() {
    if (simulate == true) {
      this.position.add(this.velocity);
      this.velocity.add(this.acceleration);
      this.acceleration.set(0, 0);
    }
  }
  show() {
    stroke(this.color);
    strokeWeight(4);
    ellipse(this.position.x, this.position.y, this.radius / 2, this.radius / 2);
  }
  applyForce(force) {
    this.acceleration.add(p5.Vector.div(force, this.mass));
  }
  attract() {
    if (simulate == true) {
      for (let i = 0; i < cosmicEntities.length; i++) {
        if (cosmicEntities[i] != this) {
          let force = p5.Vector.sub(cosmicEntities[i].position, this.position);
          let distance = force.mag();
          force.normalize();
          let strength =
            (G * this.mass * cosmicEntities[i].mass) / (distance * distance);
          strength = constrain(strength, -1, 1);
          force.mult(strength);
          this.applyForce(force);
        }
      }
    }
  }
}

function setup() {
  createCanvas(windowWidth - 100, windowHeight - 100);
  background(0);
}

function draw() {
  background(0, 40);
  //on click create new cosmic entity only once per click

  for (let i = 0; i < cosmicEntities.length; i++) {
    cosmicEntities[i].attract();
    cosmicEntities[i].update();
    cosmicEntities[i].show();
  }
}

function mousePressed(e) {
  if (e.metaKey) {
    cosmicEntities.push(new Cosmic(mouseX, mouseY, random(100000, 1000000)));
  } else {
    cosmicEntities.push(new Cosmic(mouseX, mouseY, random(10, 50)));
  }
}

function keyPressed() {
  if (keyCode == 32) {

    simulate = !simulate;
  }
}
