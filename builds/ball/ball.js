class Ball {
  constructor(x, y, mass) {
    this.mass = mass;
    this.radius = 15;
    this.velocity = createVector(1, 0);
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
  t = new Ball(200, 0, 1000);
}

function draw() {
  background(0);
  const gravity = createVector(0,10);
  t.applyForce(gravity);
  t.update();
  t.show();
}