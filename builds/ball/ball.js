const gravity = 0.1;
const friction = 0.01;
const wind = 0.02;

class Ball {
  constructor(x, y, mass) {
    this.mass = mass;
    this.radius = sqrt(this.mass) * 10;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.position = createVector(x, y);
  }

  applyConstrains() {
    if (this.position.x >= width - this.radius) {
      this.position.x = width - this.radius;
      this.velocity.x *= -1;
    }
    if (this.position.x <= this.radius) {
      this.position.x = this.radius;
      this.velocity.x *= -1;
    }
    if (this.position.y >= height - this.radius) {
      this.position.y = height - this.radius;
      this.velocity.y *= -1;
    }
  }

  applyForce(force) {
    this.acceleration.add(p5.Vector.div(force, this.mass));
  }

  applyGravity() {
    const gravityForce = createVector(0, gravity * this.mass);
    const weight = p5.Vector.mult(gravityForce, this.mass);
    this.applyForce(weight);
  }

  applyWind() {
    if (mouseIsPressed) {
      const dir = mouseX < this.position.x ? 1 : -1;
      const windForce = createVector(dir * wind * this.mass, 0);
      this.applyForce(windForce);
    }
  }

  applyFriction() {
    if (this.position.y + this.radius >= height) {
      const dir = this.velocity.x < 0 ? 1 : -1;
      const frictionForce = createVector(dir * friction * this.mass, 0);
      this.applyForce(frictionForce);
    }
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.set(0, 0);
  }

  show() {
    stroke(0, 255, 0);
    strokeWeight(1);
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
    fill(0, 255, 0);
  }
}

function setup() {
  createCanvas(400, 400);
  ball = new Ball(100, 200, 2);
}

function draw() {
  background(0);
  ball.applyGravity();
  ball.applyWind();
  ball.applyFriction();
  ball.applyConstrains();
  ball.update();
  ball.show();
}
