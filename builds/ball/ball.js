class World {
  constructor(gravity, wind) {
    this.gravity = createVector(0,gravity);
    this.wind = createVector(wind,0);
  }
}

class Ball {
  constructor(x, y, mass, world) {
    this.mass = mass;
    this.weight = p5.Vector.mult(world.gravity, this.mass);
    this.radius = sqrt(this.mass) * 10;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.position = createVector(x, y);
  }
  update() {
    // Reverse velocity if ball hits the wall
    if (this.position.x > width - this.radius || this.position.x < this.radius) {
      this.position.x = constrain(this.position.x, this.radius, width - this.radius);
      this.velocity.x *= -1;
    }
    // Reverse velocity if ball hits the floor / ceiling
    if(this.position.y > height - this.radius) {
      this.position.y = constrain(this.position.y, this.radius, height - this.radius);
      this.velocity.y *= -1;
    }
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
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
  world = new World(0.01, 0.05);
  t1 = new Ball(100, 0, 1, world);
  t2 = new Ball(300, 0, 5, world);
}

function draw() {
  background(0);
  t1.applyForce(t1.weight);
  t2.applyForce(t2.weight);
  if(mouseIsPressed) {
    t1.applyForce(world.wind);
    t2.applyForce(world.wind);
  }
  t1.update();
  t1.show();
  t2.update();
  t2.show();
}