class Upgrades {
    constructor() {
      this.position = new createVector(-windowWidth / 2 + 510, windowHeight - 800);
      this.velocity = new createVector(0, 0);
      this.show = 1;
      this.trans = 255;
      this.health = 100;
      this.regenSpeed = 0.01;
      this.regenMult = 0.00001;
      this.bodyDamage = 14;
      this.bulletSpeed = 1.6;
      this.penetration = 0.6;
      this.bulletDamage = 10;
      this.reloadTime = 50;
      this.movementSpeed = 1.5;
      this.skill = 0;
      this.exp = 0;
      this.levelUp = 4;
      this.scaling = 5;
      this.level = 0;
      this.level1 = 0;
      this.level2 = 0;
      this.level3 = 0;
      this.level4 = 0;
      this.level5 = 0;
      this.level6 = 0;
      this.level7 = 0;
      this.level8 = 0;
    }
    run() {
      this.update();
      this.display();
    }
    update() {
      this.position.add(this.velocity);
      if (this.exp > this.levelUp) {
        this.exp -= this.levelUp;
        this.levelUp += this.scaling;
        this.skill += 1;
        this.scaling += 1;
        this.level += 1;
      }
      if (this.animate()) {
        if (this.position.x < -windowWidth / 2 + 450) {
          this.velocity.x = 10;
        }
        if (this.position.x > -windowWidth / 2 + 450) {
          this.position.x = -windowWidth / 2 + 450;
          this.velocity.x = 0;
        }
      } else if (!this.animate()) {
        if (this.position.x > -windowWidth / 2 - 100) {
          this.velocity.x = -10;
        }
        if (this.position.x < -windowWidth / 2 - 100) {
          this.position.x = -windowWidth / 2 - 100;
          this.velocity.x = 0;
        }
      } else {
        this.velocity.x = 0;
      }
    }
    display() {
      var center = new createVector(width / 2, height / 2);
      var m = new createVector(mouseX, mouseY);
      m.sub(center);
      m.normalize();
      m.mult(20);
      push();
      translate(center.x, center.y);
      rectMode(CENTER);
      fill(0);
      textSize(14);
      stroke(50);
      strokeWeight(1.7);
      text("Level: " + this.skill, -35, windowHeight / 15 - 10 - windowHeight / 2);
      stroke(100);
      strokeWeight(1);
      fill(150);
      rect(0, windowHeight / 15 - windowHeight / 2, 350, 5, 20);
      rectMode(CORNER);
      fill(55, 255, 0);
      rect(-174, windowHeight / 15 - 2 - windowHeight / 2, (this.exp / this.levelUp) * 349, 3, 20);
      textSize(8);
      rectMode(CENTER);
      strokeWeight(1.7);
      stroke(10);
      fill(60);
      scale(1.6);
      text("Upgrades (" + this.level + ")", this.position.x - 25, this.position.y - 10);
      fill(70);
      rect(this.position.x, this.position.y, 120, 10, 10);
      rect(this.position.x, this.position.y + 14, 120, 10, 10);
      rect(this.position.x, this.position.y + 27, 120, 10, 10);
      rect(this.position.x, this.position.y + 40, 120, 10, 10);
      rect(this.position.x, this.position.y + 54, 120, 10, 10);
      rect(this.position.x, this.position.y + 68, 120, 10, 10);
      rect(this.position.x, this.position.y + 82, 120, 10, 10);
      rect(this.position.x, this.position.y + 96, 120, 10, 10);
      rectMode(CORNER);
      noStroke();
      fill(255, 120, 0);
      rect(this.position.x - 59.5, this.position.y - 4.25, (this.level1 / 7) * 120, 8.5, 5);
      fill(255, 0, 170);
      rect(this.position.x - 59.5, this.position.y + 9.75, (this.level2 / 7) * 120, 8.5, 5);
      fill(106, 0, 255);
      rect(this.position.x - 59.5, this.position.y + 22.75, (this.level3 / 7) * 120, 8.5, 5);
      fill(0, 89, 255);
      rect(this.position.x - 59.5, this.position.y + 35.75, (this.level4 / 7) * 120, 8.5, 5);
      fill(255, 200, 0);
      rect(this.position.x - 59.5, this.position.y + 49.75, (this.level5 / 7) * 120, 8.5, 5);
      fill(255, 30, 0);
      rect(this.position.x - 59.5, this.position.y + 63.75, (this.level6 / 7) * 120, 8.5, 5);
      fill(0, 255, 0);
      rect(this.position.x - 59.5, this.position.y + 77.75, (this.level7 / 7) * 120, 8.5, 5);
      fill(0, 255, 191);
      rect(this.position.x - 59.5, this.position.y + 91.75, (this.level8 / 7) * 120, 8.5, 5);
      strokeWeight(1.7);
      rectMode(CENTER);
      fill(255);
      stroke(10);
      textStyle(BOLD);
      text("Max Health  [ 1 ]", this.position.x - 50, this.position.y + 3);
      text("Regen Speed  [ 2 ]", this.position.x - 50, this.position.y + 17);
      text("Body Damage  [ 3 ]", this.position.x - 50, this.position.y + 30);
      text("Bullet Speed  [ 4 ]", this.position.x - 50, this.position.y + 43);
      text("Bullet Penetration  [ 5 ]", this.position.x - 50, this.position.y + 57);
      text("Bullet Damage  [ 6 ]", this.position.x - 50, this.position.y + 71);
      text("Reload Time [ 7 ]", this.position.x - 50, this.position.y + 85);
      text("Movement Speed [ 8 ]", this.position.x - 50, this.position.y + 99);
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.left = ((215 + this.position.x + 445) * 1.6) + 'px';
      }
      pop();
    }
    animate() {
      return (mouseX < windowWidth / 4.5 && mouseY > windowHeight / 1.4) || this.level > 0;
    }
  }
  class Explosion {
    constructor(p, vector) {
      this.position = p;
      this.vector = vector;
      this.power = upgrades[0].bulletSpeed * 50000;
    }
    calculateForce() {
      console.log(this.vector);
      var dir = p5.Vector.sub(this.position, this.vector);
      var distance = dir.mag();
      var force = (-1 * this.power) / (distance * distance);
      dir.normalize();
      dir.mult(force);
      return dir;
    }
  }
  class TankUpgrade {
    constructor() {
      this.position = new createVector(windowWidth / 20 + 10, windowHeight / 20 - 10);
      this.velocity = new createVector(0, 0);
    }
    run() {
      this.update();
      this.display();
    }
    update() {
      this.position.add(this.velocity);
    }
    display() {
      var center = new createVector(width / 2, height / 2);
      var m = new createVector(mouseX, mouseY);
      m.sub(center);
      m.normalize();
      m.mult(20);
      push();
      rectMode(CENTER);
      angleMode(DEGREES);
      stroke(70);
      strokeWeight(3);
      fill(140);
      textSize(16);
      text("Upgrades", this.position.x, this.position.y);
      tankUpgradeButtons[0].style.left = this.position.x - (windowWidth / 20 + 10) + 60 + 'px';
      tankUpgradeButtons[1].style.left = this.position.x - (windowWidth / 20 + 10) + 160 + 'px';
      tankUpgradeButtons[2].style.left = this.position.x - (windowWidth / 20 + 10) + 60 + 'px';
      tankUpgradeButtons[3].style.left = this.position.x - (windowWidth / 20 + 10) + 160 + 'px';
      tankUpgradeButtons[4].style.left = this.position.x - (windowWidth / 20 + 10) + 105 + 'px';
      pop();
    }
    animate() {
      return (mouseX < windowWidth / 4.5 && mouseY > windowHeight / 1.4) || this.level > 0;
    }
  }
  class Canvas {
    constructor() {
      this.center = new createVector(width / 2, height / 2);
      this.position = new createVector(random(-50, -350), random(-3000, -1000));
      this.velocity = new createVector(0, 0);
      this.modVelocity = new createVector(0, 0);
      this.acceleration = new createVector(0, 0);
      this.modAcc = new createVector(0, 0);
      this.reloadTime = 100;
      this.mass = upgrades[0].health / 5;
      this.fC = frictionC;
      this.delay = 1;
    }
    run() {
      this.update();
      this.display();
    }
    applyForce(vector, force) {
      let f = force;
      f.div(this.mass);
      vector.add(f);
    }
    update() {
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
      this.reloadTime -= 1;
      this.delay -= 1;
      this.yes = 0;
    }
    calculateCollision() {
      for (var i = 0; i < shapes.length; i++) {
        var dir = p5.Vector.sub(shapes[i].position, gun[0].position);
        var distance = dir.mag();
        var dis = shapes[i].radius + gun[0].size;
        if (distance < dis && this.delay < 0) {
          this.yes = 1;
          shapes[i].health -= upgrades[0].bodyDamage;
          gun[0].health -= shapes[i].bodyDamage;
          let forceMagnitude = (shapes[i].mass * this.mass) / distance ** 2;
          var cForce = dir.copy().setMag(forceMagnitude);
          applyCollisionForceToObject(this.modAcc, cForce.mult(-1));
          applyCollisionForceToObject(shapes[i].modAcc, cForce.copy().mult(-1));
          this.delay = 50;
        }
        else {
          this.yes = 0;
        }
        if (this.health <= 0) {
          this.dyingSpeed = 35;
        }
      }
    }
    display() {
      stroke(200);
      fill(230);
      rect(this.position.x, this.position.y, 4000, 4000);
      strokeWeight(0.5);
      for (let i = this.position.x; i < this.position.x + 4000; i++) {
        line(i, -2000, i, 2000);
        i += 19;
      }
      for (let i = this.position.y; i < this.position.y + 4000; i++) {
        line(-2000, i, 2000, i);
        i += 19;
      }
      strokeWeight(2);
      stroke(95, 167, 250);
      fill(95, 167, 250, 170);
      rect(this.position.x, this.position.y, 400, 4000);
      stroke(247, 99, 114);
      fill(247, 99, 114, 170);
      rect(this.position.x + 3600, this.position.y, 400, 4000);
    }
    reload() {
      return this.reloadTime < 0;
    }
  }
  class Shapes {
    constructor() {
      this.position = new createVector(
        random(canvas.position.x, canvas.position.x + 4000),
        random(canvas.position.y, canvas.position.y + 4000)
      );
    }
    countShapes(t) {
      var sum = 0;
      for (var i = 0; i < shapes.length; i++) {
        if (t === shapes[i].type) {
          sum++;
        }
      }
      return sum;
    }
    run() {
      if (this.countShapes(1) < 50) {
        this.position = new createVector(
          random(canvas.position.x, canvas.position.x + 4000),
          random(canvas.position.y, canvas.position.y + 4000)
        );
        shapes.push(new Tangle(this.position));
      }
      if (this.countShapes(3) < 10) {
        this.position = new createVector(
          random(canvas.position.x, canvas.position.x + 4000),
          random(canvas.position.y, canvas.position.y + 4000)
        );
        shapes.push(new Pentagon(this.position));
      }
      if (this.countShapes(2) < 20) {
        this.position = new createVector(
          random(canvas.position.x, canvas.position.x + 4000),
          random(canvas.position.y, canvas.position.y + 4000)
        );
        shapes.push(new Triangle(this.position));
      }
      if (this.countShapes(4) < 10) {
        this.position = new createVector(
          random(canvas.position.x + 1500, canvas.position.x + 2500),
          random(canvas.position.y + 1500, canvas.position.y + 2500)
        );
        shapes.push(new smallDefender(this.position));
      }
      if (this.countShapes(5) < 5) {
        this.position = new createVector(
          random(canvas.position.x + 1500, canvas.position.x + 2500),
          random(canvas.position.y + 1500, canvas.position.y + 2500)
        );
        shapes.push(new bigDefender(this.position));
      }
      if (this.countShapes(6) < 10) {
        this.position = new createVector(
          random(canvas.position.x + 1500, canvas.position.x + 2500),
          random(canvas.position.y + 1500, canvas.position.y + 2500)
        );
        shapes.push(new cPentagon(this.position));
      }
      if (this.countShapes(7) < 2) {
        this.position = new createVector(
          random(canvas.position.x + 1800, canvas.position.x + 2200),
          random(canvas.position.y + 1800, canvas.position.y + 2200)
        );
        shapes.push(new alphaPentagon(this.position));
      }
    }
  }
  class Minimap {
    constructor() {
      this.position = createVector(windowWidth - 120, windowHeight - 120);
      this.velocity = createVector(0, 0);
      this.modVelocity = createVector(0, 0);
      this.modAcc = createVector(0, 0);
      this.acceleration = createVector(0, 0);
      this.player = createVector(-canvas.position.x / 40, -canvas.position.y / 40);
    }
  
    run() {
      this.update();
      this.display();
    }
  
    update() {
      this.player.add(this.velocity);
    }
  
    display() {
      push();
      translate(this.position.x, this.position.y);
      stroke(120);
      strokeWeight(1.5);
      fill(220);
      rectMode(CORNER);
      rect(0, 0, 100, 100);
      noStroke();
      fill(95, 167, 250, 190);
      rect(0, 1, 10.5, 98);
      fill(247, 99, 114, 190);
      rect(89.5, 1, 10.5, 98);
      fill(66, 66, 66);
      ellipse(this.player.x, this.player.y, 3, 3);
      stroke(200);
      strokeWeight(1);
      fill(0, 0, 0, 0);
      pop();
    }
  }