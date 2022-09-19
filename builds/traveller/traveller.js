class Traveller {
  constructor(width, height) {
    this.velocity = createVector(random(-1, 1)*4, random(-1, 1)*4);
    this.position = createVector(width / 2, height / 2);
  }
  update() {
    //if wall is hit, reverse velocity
    if (this.position.x > width || this.position.x < 0) {
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.position.y > height || this.position.y < 0) {
      this.velocity.y = this.velocity.y * -1;
    }
    this.position.add(this.velocity);
  }
  show() {
    stroke(255);
    strokeWeight(2);
    ellipse(this.position.x, this.position.y, 5, 5);
  }
}

function setup() {
  createCanvas(400, 400);
  t = new Traveller(width, height);
}

function draw() {
  background(0);
  t.update();
  t.show();
}