class Tangle {
    constructor(p) {
      this.position = p;
      this.velocity = new createVector(0, 0);
      this.modVelocity = new createVector(0, 0);
      this.modAcc = new createVector(0, 0);
      this.acceleration = new createVector(0, 0);
      this.fC = frictionC;
      this.rotation = random(0, 90);
      this.health = 15;
      this.mass = upgrades[0].health / 5;
      this.bodyDamage = 8;
      this.rotationSpeed = random(0.1, 0.2);
      this.radius = 9;
      this.exp = 10;
      this.type = 1;
    }
    run() {
      this.update();
      this.display();
    }
    applyForce(vector, force) {
      let f = force.copy();
      f.div(this.mass);
      vector.add(f);
    }
    update() {
      this.rotation += this.rotationSpeed;
      if (this.rotation > 360) {
        this.rotation -= 360;
      }
      let friction = this.velocity.copy();
      let modF = this.modVelocity.copy();
      friction.mult(-1);
      friction.normalize();
      friction.mult(this.fC);
      modF.mult(-1);
      modF.normalize();
      modF.mult(this.fC / 4);
      this.applyForce(this.acceleration, friction);
      this.applyForce(this.modAcc, modF);
      this.velocity.add(this.acceleration);
      this.modVelocity.add(this.modAcc);
      this.velocity.limit(upgrades[0].movementSpeed);
      this.modVelocity.limit(upgrades[0].movementSpeed / 3);
      this.position.add(this.velocity);
      this.position.add(this.modVelocity);
      this.acceleration.mult(0);
      this.modAcc.mult(0);
    }
    display() {
      push();
      translate(this.position.x, this.position.y);
      fill(0);
      rotate(this.rotation);
      stroke(220, 160, 0);
      strokeWeight(1.6);
      fill(255, 208, 0);
      rectMode(CENTER);
      rect(0, 0, 17, 17);
      pop();
    }
    isDead() {
      return this.health <= 0;
    }
  }
  class Triangle {
    constructor(p) {
      this.position = p;
      this.velocity = new createVector(0, 0);
      this.acceleration = new createVector(0, 0);
      this.modVelocity = new createVector(0, 0);
      this.modAcc = new createVector(0, 0);
      this.center = new createVector(1000, 1000);
      this.rotation = random(0, 90);
      this.health = 30;
      this.mass = upgrades[0].health / 5;
      this.bodyDamage = 8;
      this.rotationSpeed = random(0.1, 0.2);
      this.radius = 11;
      this.exp = 25;
      this.type = 2;
      this.fC = frictionC;
    }
    run() {
      this.update();
      this.display();
    }
    applyForce(vector, force) {
      let f = force.copy();
      f.div(this.mass);
      vector.add(f);
    }
    update() {
      this.rotation += this.rotationSpeed;
      if (this.rotation > 360) {
        this.rotation -= 360;
      }
      let friction = this.velocity.copy();
      let modF = this.modVelocity.copy();
      friction.mult(-1);
      friction.normalize();
      friction.mult(this.fC);
      modF.mult(-1);
      modF.normalize();
      modF.mult(this.fC / 4);
      this.applyForce(this.acceleration, friction);
      this.applyForce(this.modAcc, modF);
      this.velocity.add(this.acceleration);
      this.modVelocity.add(this.modAcc);
      this.velocity.limit(upgrades[0].movementSpeed);
      this.modVelocity.limit(upgrades[0].movementSpeed / 3);
      this.position.add(this.velocity);
      this.position.add(this.modVelocity);
      this.acceleration.mult(0);
      this.modAcc.mult(0);
    }
    display() {
      push();
      translate(this.position.x, this.position.y);
      rotate(this.rotation);
      fill(255, 89, 0);
      drawShape(0, 0, 12, 3, 2, [161, 43, 3]);
      pop();
    }
    isDead() {
      return this.health <= 0;
    }
  }
  class Pentagon {
    constructor(p) {
      this.position = p;
      this.velocity = new createVector(0, 0);
      this.acceleration = new createVector(0, 0);
      this.modVelocity = new createVector(0, 0);
      this.modAcc = new createVector(0, 0);
      this.center = new createVector(1000, 1000);
      this.rotation = random(0, 90);
      this.health = 100;
      this.mass = upgrades[0].health / 5;
      this.bodyDamage = 12;
      this.rotationSpeed = random(0.1, 0.2);
      this.radius = 30;
      this.exp = 130;
      this.type = 3;
      this.fC = frictionC;
    }
    run() {
      this.update();
      this.display();
    }
    applyForce(vector, force) {
      let f = force.copy();
      f.div(this.mass);
      vector.add(f);
    }
    update() {
      this.rotation += this.rotationSpeed;
      if (this.rotation > 360) {
        this.rotation -= 360;
      }
      let friction = this.velocity.copy();
      let modF = this.modVelocity.copy();
      friction.mult(-1);
      friction.normalize();
      friction.mult(this.fC);
      modF.mult(-1);
      modF.normalize();
      modF.mult(this.fC / 4);
      this.applyForce(this.acceleration, friction);
      this.applyForce(this.modAcc, modF);
      this.velocity.add(this.acceleration);
      this.modVelocity.add(this.modAcc);
      this.velocity.limit(upgrades[0].movementSpeed);
      this.modVelocity.limit(upgrades[0].movementSpeed / 3);
      this.position.add(this.velocity);
      this.position.add(this.modVelocity);
      this.acceleration.mult(0);
      this.modAcc.mult(0);
    }
    display() {
      push();
      translate(this.position.x, this.position.y);
      rotate(this.rotation);
      fill(0, 106, 255);
      drawShape(0, 0, 25, 5, 1.5, [0, 70, 210]);
      pop();
    }
    isDead() {
      return this.health <= 0;
    }
  }
  class smallDefender {
    constructor(p) {
      this.position = p;
      this.velocity = new createVector(0, 0);
      this.acceleration = new createVector(0, 0);
      this.modVelocity = new createVector(0, 0);
      this.modAcc = new createVector(0, 0);
      this.rotation = random(0, 90);
      this.health = 15;
      this.mass = upgrades[0].health / 5;
      this.bodyDamage = 8;
      this.rotationSpeed = 0.2;
      this.radius = 6;
      this.exp = 10;
      this.target = new createVector(0, 0);
      this.type = 4;
      this.fC = frictionC;
    }
    run() {
      this.update();
      this.display();
    }
    applyForce(vector, force) {
      let f = force.copy();
      f.div(this.mass);
      vector.add(f);
    }
    update() {
      this.rotation += this.rotationSpeed;
      if (this.rotation > 360) {
        this.rotation -= 360;
      }
      if (this.spots()) {
        this.rotationSpeed = 0;
        this.target = new createVector(0, 0);
      } else {
        this.rotationSpeed = 0.2;
        this.target = this.position;
      }
      let friction = this.velocity.copy();
      let modF = this.modVelocity.copy();
      friction.mult(-1);
      friction.normalize();
      friction.mult(this.fC);
      modF.mult(-1);
      modF.normalize();
      modF.mult(this.fC / 4);
      this.applyForce(this.acceleration, friction);
      this.applyForce(this.modAcc, modF);
      this.velocity.add(this.acceleration);
      this.modVelocity.add(this.modAcc);
      this.velocity.limit(upgrades[0].movementSpeed);
      this.modVelocity.limit(upgrades[0].movementSpeed / 3);
      this.position.add(this.velocity);
      this.position.add(this.modVelocity);
      this.acceleration.mult(0);
      this.modAcc.mult(0);
    }
    display() {
      push();
      translate(this.position.x, this.position.y);
      scale(0.6);
      rotate(this.rotation);
      stroke(255, 0, 251);
      fill(252, 92, 255);
      triangle(0, -10, -11, 9, 11, 9);
      pop();
    }
    isDead() {
      return this.health <= 0;
    }
    spots() {
      var dir = p5.Vector.sub(this.position, new createVector(0, 0));
      var distance = dir.mag();
      return distance < 450;
    }
  }
  class bigDefender {
    constructor(p) {
      this.position = p;
      this.velocity = new createVector(0, 0);
      this.acceleration = new createVector(0, 0);
      this.modVelocity = new createVector(0, 0);
      this.modAcc = new createVector(0, 0);
      this.rotation = random(0, 90);
      this.health = 30;
      this.mass = upgrades[0].health / 5;
      this.bodyDamage = 8;
      this.rotationSpeed = 0.2;
      this.radius = 11;
      this.exp = 25;
      this.target = new createVector(0, 0);
      this.type = 5;
      this.fC = frictionC;
    }
    run() {
      this.update();
      this.display();
    }
    applyForce(vector, force) {
      let f = force.copy();
      f.div(this.mass);
      vector.add(f);
    }
    update() {
      this.rotation += this.rotationSpeed;
      if (this.rotation > 360) {
        this.rotation -= 360;
      }
      if (this.spots()) {
        this.rotationSpeed = 0;
        this.target = new createVector(0, 0);
      } else {
        this.rotationSpeed = 0.2;
        this.target = this.position;
      }
      let friction = this.velocity.copy();
      let modF = this.modVelocity.copy();
      friction.mult(-1);
      friction.normalize();
      friction.mult(this.fC);
      modF.mult(-1);
      modF.normalize();
      modF.mult(this.fC / 4);
      this.applyForce(this.acceleration, friction);
      this.applyForce(this.modAcc, modF);
      this.velocity.add(this.acceleration);
      this.modVelocity.add(this.modAcc);
      this.velocity.limit(upgrades[0].movementSpeed);
      this.modVelocity.limit(upgrades[0].movementSpeed / 3);
      this.position.add(this.velocity);
      this.position.add(this.modVelocity);
      this.acceleration.mult(0);
      this.modAcc.mult(0);
    }
    display() {
      push();
      translate(this.position.x, this.position.y);
      rotate(this.rotation);
      stroke(255, 0, 251);
      fill(252, 92, 255);
      triangle(0, -10, -11, 9, 11, 9);
      pop();
    }
    isDead() {
      return this.health <= 0;
    }
    spots() {
      var dir = p5.Vector.sub(this.position, new createVector(0, 0));
      var distance = dir.mag();
      return distance < 450;
    }
  }
  class cPentagon {
    constructor(p) {
      this.position = p;
      this.velocity = new createVector(0, 0);
      this.acceleration = new createVector(0, 0);
      this.modVelocity = new createVector(0, 0);
      this.modAcc = new createVector(0, 0);
      this.center = new createVector(1000, 1000);
      this.rotation = random(0, 90);
      this.health = 100;
      this.mass = upgrades[0].health / 5;
      this.bodyDamage = 12;
      this.rotationSpeed = random(0.1, 0.2);
      this.radius = 30;
      this.exp = 130;
      this.type = 6;
      this.fC = frictionC;
    }
    run() {
      this.update();
      this.display();
    }
    applyForce(vector, force) {
      let f = force.copy();
      f.div(this.mass);
      vector.add(f);
    }
    update() {
      this.rotation += this.rotationSpeed;
      if (this.rotation > 360) {
        this.rotation -= 360;
      }
      let friction = this.velocity.copy();
      let modF = this.modVelocity.copy();
      friction.mult(-1);
      friction.normalize();
      friction.mult(this.fC);
      modF.mult(-1);
      modF.normalize();
      modF.mult(this.fC / 4);
      this.applyForce(this.acceleration, friction);
      this.applyForce(this.modAcc, modF);
      this.velocity.add(this.acceleration);
      this.modVelocity.add(this.modAcc);
      this.velocity.limit(upgrades[0].movementSpeed);
      this.modVelocity.limit(upgrades[0].movementSpeed / 3);
      this.position.add(this.velocity);
      this.position.add(this.modVelocity);
      this.acceleration.mult(0);
      this.modAcc.mult(0);
    }
    display() {
      push();
      translate(this.position.x, this.position.y);
      rotate(this.rotation);
      stroke(0, 106, 255);
      strokeWeight(1);
      fill(0, 106, 255);
      drawShape(0, 0, 25, 5, 1.5, [0, 70, 210]);
      pop();
    }
    isDead() {
      return this.health <= 0;
    }
  }
  class alphaPentagon {
    constructor(p) {
      this.position = p;
      this.velocity = new createVector(0, 0);
      this.acceleration = new createVector(0, 0);
      this.modVelocity = new createVector(0, 0);
      this.modAcc = new createVector(0, 0);
      this.center = new createVector(1000, 1000);
      this.rotation = random(0, 90);
      this.health = 3000;
      this.mass = upgrades[0].health / 5;
      this.bodyDamage = 20;
      this.rotationSpeed = random(0.02, 0.04);
      this.radius = 60;
      this.exp = 3000;
      this.type = 7;
      this.fC = frictionC;
    }
    run() {
      this.update();
      this.display();
    }
    applyForce(vector, force) {
      let f = force.copy();
      f.div(this.mass);
      vector.add(f);
    }
    update() {
      this.rotation += this.rotationSpeed;
      if (this.rotation > 360) {
        this.rotation -= 360;
      }
      let friction = this.velocity.copy();
      let modF = this.modVelocity.copy();
      friction.mult(-1);
      friction.normalize();
      friction.mult(this.fC);
      modF.mult(-1);
      modF.normalize();
      modF.mult(this.fC / 4);
      this.applyForce(this.acceleration, friction);
      this.applyForce(this.modAcc, modF);
      this.velocity.add(this.acceleration);
      this.modVelocity.add(this.modAcc);
      this.velocity.limit(upgrades[0].movementSpeed);
      this.modVelocity.limit(upgrades[0].movementSpeed / 3);
      this.position.add(this.velocity);
      this.position.add(this.modVelocity);
      this.acceleration.mult(0);
      this.modAcc.mult(0);
    }
    display() {
      push();
      translate(this.position.x, this.position.y);
      scale(2);
      rotate(this.rotation);
      stroke(0, 50, 200);
      strokeWeight(2);
      fill(0, 106, 255);
      drawShape(0, 0, 25, 5, 0.8, [0, 70, 210]);
      pop();
    }
    isDead() {
      return this.health <= 0;
    }
  }
  class Bullet {
    constructor(p) {
      this.position = p;
      this.velocity = new createVector(0, 0);
      this.acceleration = new createVector(0, 0);
      this.center = new createVector(width / 2, height / 2);
      this.dying = 700;
      this.modV = new createVector(0, 0);
      this.modA = new createVector(0, 0);
      this.modVelocity = new createVector(0, 0);
      this.acceleration = new createVector(0, 0);
      this.modAcc = new createVector(0, 0);
      this.health = upgrades[0].bulletDamage;
      this.penetration = upgrades[0].penetration;
      this.mass = upgrades[0].health / 5;
      this.modM = this.health / 5 + this.penetration;
      this.dyingSpeed = 4;
      this.size = 17;
      this.fC = frictionC;
      this.modMass = upgrades[0].health / 5;
    }
    run() {
      this.update();
      this.calculateCollision();
      this.display();
    }
    applyForce(vector, force) {
      let f = force;
      f.div(this.mass);
      vector.add(f);
    }
    update() {
      this.dying -= this.dyingSpeed;
      let friction = this.velocity.copy();
      friction.mult(-1);
      friction.normalize();
      friction.mult(this.fC);
      let modF = this.modVelocity.copy();
      modF.mult(-1);
      modF.normalize();
      modF.mult(this.fC / 4);
      this.applyForce(this.acceleration, friction);
      this.applyForce(this.modAcc, modF);
      this.velocity.add(this.acceleration);
      this.modVelocity.add(this.modAcc);
      this.modV.add(this.modA);
      this.velocity.limit(upgrades[0].movementSpeed);
      this.modVelocity.limit(upgrades[0].movementSpeed / 3);
      this.modV.limit(upgrades[0].bulletSpeed);
      this.acceleration.mult(0);
      this.modAcc.mult(0);
      this.modA.mult(0);
      this.position.add(this.velocity);
      this.position.add(this.modVelocity);
      this.position.add(this.modV);
      this.size = 17 + 0.1 * upgrades[0].skill;
    }
    calculateCollision() {
      for (var i = 0; i < shapes.length; i++) {
        var dir = p5.Vector.sub(shapes[i].position, this.position);
        var distance = dir.mag();
        var dis = shapes[i].radius + 9;
        if (distance < dis && this.isAlive()) {
          var shapesHealth = shapes[i].health;
          shapes[i].health -= this.health;
          this.health -= shapesHealth;
          let forceMagnitude = (shapes[i].mass * this.mass) / distance ** 2;
          var collisionForce = dir.copy().setMag(forceMagnitude);
          applyCollisionForceToObject(this.modA, collisionForce.mult(-0.1));
          applyCollisionForceToObject(shapes[i].modAcc, collisionForce.copy().mult(-1));
        }
        if (this.health <= 0) {
          this.dyingSpeed = 35;
        }
      }
    }
    display() {
      stroke(0, 149, 255, this.dying);
      strokeWeight(2);
      fill(0, 179, 255, this.dying);
      ellipse(this.position.x, this.position.y, this.size, this.size);
    }
    isAlive() {
      return this.health > 0;
    }
    isDead() {
      return this.dying <= 0;
    }
  }