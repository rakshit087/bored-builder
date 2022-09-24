class World {
  constructor(gravity) {
    this.gravity = createVector(0,gravity);
  }
}

class Ball {
  constructor(x, y, mass, world) {
    this.mass = mass;
    this.weight = p5.Vector.mult(world.gravity, this.mass);
    this.radius = 15;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.position = createVector(x, y);
  }
  update() {
    if (this.position.x > width - this.radius || this.position.x < this.radius) {
      this.velocity.x *= -1;
    }
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    if(this.position.y > height - this.radius) {
      this.position.y = height - this.radius;
      this.velocity.y *= -1;
    }
  }

  applyForce(force) {
    this.acceleration.add(
      p5.Vector.div(force, this.mass)
    );
  }

  show() {
    stroke(0, 255, 0);
    strokeWeight(1);
    ellipse(this.position.x, this.position.y, this.radius*2, this.radius*2);
    fill(0, 255, 0);
  }
}

function setup() {
  createCanvas(400, 400);
  world = new World(0.01);
  t1 = new Ball(100, 0, 100, world);
  t2 = new Ball(300, 0, 1000, world);
}

function draw() {
  background(0);
  t1.applyForce(t1.weight);
  t1.update();
  t1.show();
  t2.applyForce(t2.weight);
  t2.update();
  t2.show();
}