var upgrades;
var shapes = [];
var botUpgrades = [];
var explosion;
var bullets = [];
var canvas;
var addShapes;
var gun;
var bots = [];
var minimap;
var autoFire = 2;
var autoSpin = 1;
var scaleFactor = 1;
var frictionC = 0.5;
var explosion = [];
var upgrades = [];
var gun = [];
var position;
var buttons = [];
var buttonLeft = 215;
var buttonTop = 810;
var buttonTopMod = 17.7;
var buttonPadding = '0px 7px';
var buttonBorder = '2px solid rgb(20, 20, 20)';
var buttonFontSize = '8px';
var buttonTextShadow = '0 0 10px #000000';
var buttonScale = 'scale(1.3)';
var message = "";
var spinMessage = "";
var timeout;
class Upgrades {
  constructor() {
    this.position = new createVector(-windowWidth / 2 + 310, windowHeight - 725);
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
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.left = ((buttonLeft + this.position.x + 580) * 1.3) + 'px';
    }
    this.position.add(this.velocity);
    if (this.exp > this.levelUp) {
      this.exp -= this.levelUp;
      this.levelUp += this.scaling;
      this.skill += 1;
      this.scaling += 1;
      this.level += 1;
    }
    if (this.animate()) {
      if (this.position.x < -windowWidth / 2 + 310) {
        this.velocity.x = 10;
      }
      if (this.position.x > -windowWidth / 2 + 310) {
        this.position.x = -windowWidth / 2 + 310;
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
    scale(1.3);
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
    text("Max Health  [ 1 ]", this.position.x - 50, this.position.y + 3);
    text("Regen Speed  [ 2 ]", this.position.x - 50, this.position.y + 17);
    text("Body Damage  [ 3 ]", this.position.x - 50, this.position.y + 30);
    text("Bullet Speed  [ 4 ]", this.position.x - 50, this.position.y + 43);
    text("Bullet Penetration  [ 5 ]", this.position.x - 50, this.position.y + 57);
    text("Bullet Damage  [ 6 ]", this.position.x - 50, this.position.y + 71);
    text("Reload Time [ 7 ]", this.position.x - 50, this.position.y + 85);
    text("Movement Speed [ 8 ]", this.position.x - 50, this.position.y + 99);
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
class DefaultGun {
  constructor() {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.mass = upgrades[0].health / 5;
    this.size = 34;
  }
  display() {
    stroke(140, 140, 140, gun[0].transparent);
    strokeWeight(1.5);
    rectMode(CENTER);
    fill(180, 180, 180, gun[0].transparent);
    rect(0, 22, 17, 16);
    strokeWeight(1.5);
    stroke(5, 141, 232, gun[0].transparent);
    fill(0, 179, 255, gun[0].transparent);
    ellipse(0, 0, this.size, this.size);
  }
}
class Twin {
  constructor() {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = createVector(0, 0);
    this.size = 37;
    this.mass = upgrades[0].health / 5;
  }

  display() {
    stroke(140, 140, 140, gun[0].transparent);
    strokeWeight(1.5);
    rectMode(CENTER);
    fill(180, 180, 180, gun[0].transparent);
    rect(-8.5, 17, 14, 28);
    rect(8.5, 17, 14, 28);
    strokeWeight(1.5);
    stroke(5, 141, 232, gun[0].transparent);
    fill(0, 179, 255, gun[0].transparent);
    ellipse(0, 0, this.size, this.size);
  }
}

class Sniper {
  constructor() {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = createVector(0, 0);
    this.size = 36;
    this.mass = upgrades[0].health / 5;
  }

  display() {
    stroke(140, 140, 140, gun[0].transparent);
    strokeWeight(1.5);
    rectMode(CENTER);
    fill(180, 180, 180, gun[0].transparent);
    rect(0, 17, 17, 37);
    strokeWeight(1.5);
    stroke(5, 141, 232, gun[0].transparent);
    fill(0, 179, 255, gun[0].transparent);
    ellipse(0, 0, this.size, this.size);
  }
}
class MachineGun {
  constructor() {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = createVector(0, 0);
    this.size = 35.5;
    this.mass = upgrades[0].health / 5;
  }

  display() {
    stroke(140, 140, 140, gun[0].transparent);
    strokeWeight(1.5);
    fill(180, 180, 180, gun[0].transparent);
    triangle(0, -17, 13, 31, -13, 31);
    strokeWeight(1.5);
    stroke(5, 141, 232, gun[0].transparent);
    fill(0, 179, 255, gun[0].transparent);
    ellipse(0, 0, this.size, this.size);
  }
}

class FlankGuard {
  constructor() {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = createVector(0, 0);
    this.size = 36;
    this.mass = upgrades[0].health / 5;
  }

  display() {
    stroke(140, 140, 140, gun[0].transparent);
    strokeWeight(1.5);
    rectMode(CENTER);
    fill(180, 180, 180, gun[0].transparent);
    rect(0, 22, 17, 20);
    rect(0, -22, -17, -14);
    strokeWeight(1.5);
    stroke(5, 141, 232, gun[0].transparent);
    fill(0, 179, 255, gun[0].transparent);
    ellipse(0, 0, this.size, this.size);
  }
}
class Assassin {
  constructor() {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = createVector(0, 0);
    this.size = 37;
    this.mass = upgrades[0].health / 5;
  }

  display() {
    stroke(140, 140, 140, gun[0].transparent);
    strokeWeight(1.5);
    rectMode(CENTER);
    fill(180, 180, 180, gun[0].transparent);
    rect(0, 17, 16, 48);
    strokeWeight(1.5);
    stroke(5, 141, 232, gun[0].transparent);
    fill(0, 179, 255, gun[0].transparent);
    ellipse(0, 0, this.size, this.size);
  }
}

class Overseer {
  constructor() {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = createVector(0, 0);
    this.size = 37;
    this.mass = upgrades[0].health / 5;
  }

  display() {
    stroke(140, 140, 140, gun[0].transparent);
    strokeWeight(1.5);
    fill(180, 180, 180, gun[0].transparent);
    triangle(0, -17, 13, 25, -13, 25);
    triangle(0, 17, -13, -25, 13, -25);
    strokeWeight(1.5);
    stroke(5, 141, 232, gun[0].transparent);
    fill(0, 179, 255, gun[0].transparent);
    ellipse(0, 0, this.size, this.size);
  }
}

class Destroyer {
  constructor() {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = createVector(0, 0);
    this.size = 37;
    this.mass = upgrades[0].health / 5;
  }

  display() {
    stroke(140, 140, 140, gun[0].transparent);
    strokeWeight(1.5);
    rectMode(CENTER);
    fill(180, 180, 180, gun[0].transparent);
    rect(0, 17, 28, 36);
    strokeWeight(1.5);
    stroke(5, 141, 232, gun[0].transparent);
    fill(0, 179, 255, gun[0].transparent);
    ellipse(0, 0, this.size, this.size);
  }
}

class Gunner {
  constructor() {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = createVector(0, 0);
    this.size = 37;
    this.mass = upgrades[0].health / 5;
  }

  display() {
    stroke(140, 140, 140, gun[0].transparent);
    strokeWeight(1.5);
    rectMode(CENTER);
    fill(180, 180, 180, gun[0].transparent);
    rect(-6, 17, 9, 25);
    rect(6, 17, 9, 25);
    rect(-14, 15, 6, 20);
    rect(14, 15, 6, 20);
    strokeWeight(1.5);
    stroke(5, 141, 232, gun[0].transparent);
    fill(0, 179, 255, gun[0].transparent);
    ellipse(0, 0, this.size, this.size);
  }
}

class TriTank {
  constructor() {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = createVector(0, 0);
    this.size = 37;
    this.mass = upgrades[0].health / 5;
  }

  display() {
    stroke(140, 140, 140, gun[0].transparent);
    strokeWeight(1.5);
    rectMode(CENTER);
    angleMode(DEGREES);
    fill(180, 180, 180, gun[0].transparent);
    rect(0, 17, 16, 38);
    rotate(150);
    rect(0, 17, 16, 28);
    rotate(60);
    rect(0, 17, 16, 28);
    strokeWeight(1.5);
    stroke(5, 141, 232, gun[0].transparent);
    fill(0, 179, 255, gun[0].transparent);
    ellipse(0, 0, this.size, this.size);
  }
}

class QuadTank {
  constructor() {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = createVector(0, 0);
    this.size = 37;
    this.mass = upgrades[0].health / 5;
  }

  display() {
    stroke(140, 140, 140, gun[0].transparent);
    strokeWeight(1.5);
    rectMode(CENTER);
    angleMode(DEGREES);
    fill(180, 180, 180, gun[0].transparent);
    rect(0, 17, 16, 38);
    rotate(90);
    rect(0, 17, 16, 38);
    rotate(90);
    rect(0, 17, 16, 38);
    rotate(90);
    rect(0, 17, 16, 38);
    strokeWeight(1.5);
    stroke(5, 141, 232, gun[0].transparent);
    fill(0, 179, 255, gun[0].transparent);
    ellipse(0, 0, this.size, this.size);
  }
}

class TwinFlank {
  constructor() {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = createVector(0, 0);
    this.size = 37;
    this.mass = upgrades[0].health / 5;
  }

  display() {
    stroke(140, 140, 140, gun[0].transparent);
    strokeWeight(1.5);
    rectMode(CENTER);
    angleMode(DEGREES);
    fill(180, 180, 180, gun[0].transparent);
    rect(10, 17, 16, 38);
    rect(-10, 17, 16, 38);
    rotate(180);
    rect(10, 17, 16, 38);
    rect(-10, 17, 16, 38);
    strokeWeight(1.5);
    stroke(5, 141, 232, gun[0].transparent);
    fill(0, 179, 255, gun[0].transparent);
    ellipse(0, 0, this.size, this.size);
  }
}

class Smasher {
  constructor() {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = createVector(0, 0);
    this.size = 37;
    this.mass = upgrades[0].health / 5;
  }

  display() {
    stroke(140, 140, 140, gun[0].transparent);
    strokeWeight(1.5);
    fill(100, 100, 100, gun[0].transparent);
    drawShape(0, 0, 22, 6, 1.5, [70, 70, 70]);
    strokeWeight(1.5);
    stroke(5, 141, 232, gun[0].transparent);
    fill(0, 179, 255, gun[0].transparent);
    ellipse(0, 0, this.size, this.size);
  }
}
class Triplet {
  constructor() {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = createVector(0, 0);
    this.size = 35;
    this.mass = upgrades[0].health / 5;
  }
}

class SpreadShot {
  constructor() {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = createVector(0, 0);
    this.size = 35;
    this.mass = upgrades[0].health / 5;
  }
}

class OctoTank {
  constructor() {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = createVector(0, 0);
    this.size = 35;
    this.mass = upgrades[0].health / 5;
  }
}

class TripleTwin {
  constructor() {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = createVector(0, 0);
    this.size = 35;
    this.mass = upgrades[0].health / 5;
  }
}

class Ranger {
  constructor() {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = createVector(0, 0);
    this.size = 35;
    this.mass = upgrades[0].health / 5;
  }
}

class Stalker {
  constructor() {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = createVector(0, 0);
    this.size = 35;
    this.mass = upgrades[0].health / 5;
  }
}

class Overlord {
  constructor() {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = createVector(0, 0);
    this.size = 35;
    this.mass = upgrades[0].health / 5;
  }
}

class Streamliner {
  constructor() {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = createVector(0, 0);
    this.size = 35;
    this.mass = upgrades[0].health / 5;
  }
}

class Annihilator {
  constructor() {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = createVector(0, 0);
    this.size = 35;
    this.mass = upgrades[0].health / 5;
  }
}

class Booster {
  constructor() {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = createVector(0, 0);
    this.size = 35;
    this.mass = upgrades[0].health / 5;
  }
}

class Spike {
  constructor() {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = createVector(0, 0);
    this.size = 35;
    this.mass = upgrades[0].health / 5;
  }
}

class Landmine {
  constructor() {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = createVector(0, 0);
    this.size = 35;
    this.mass = upgrades[0].health / 5;
  }
}
class Gun {
  constructor(tank) {
    this.center = createVector(width / 2, height / 2);
    this.m = createVector(mouseX, mouseY);
    this.m.sub(this.center);
    this.m.normalize();
    this.m.mult(20);
    this.degrees = atan2(this.m.x / this.m.y) + degmod();
    this.autoDegrees = this.degrees;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.regenMult = upgrades[0].regenMult;
    this.health = upgrades[0].health;
    this.position = createVector(0, 0);
    this.size = 35;
    this.trans = 255;
    this.transparent = 255;
    this.mass = upgrades[0].health / 5;
    this.tank = tank;
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.center = createVector(width / 2, height / 2);
    this.m = createVector(mouseX, mouseY);
    this.m.sub(this.center);
    this.m.normalize();
    this.m.mult(20);
    this.degrees = -atan(this.m.x / this.m.y) + degmod();
    this.autoDegrees += 0.7;
    if (this.autoDegrees > 360) {
      this.autoDegrees -= 360;
    }
    if (this.health < upgrades[0].health) {
      this.regenSpeed += this.regenMult;
      this.health += this.regenSpeed;
      this.trans = 255;
    } else {
      this.trans -= 3;
    }
    if (this.health < 0) {
      this.trans = 0;
      this.transparent -= 7;
      if (this.transparent > 0) {
        upgrades.splice(0, 1);
        upgrades.push(new Upgrades());
        gun.splice(0, 1);
        gun.push(new Gun());
      }
    }
    this.size = 32 + 0.01 * upgrades[0].skill;
  }

  display() {
    push();
    translate(this.center.x, this.center.y);
    if (autoSpin % 2 == 1) {
      spinMessage = "Auto-Spin is enabled.";
      rotate(this.degrees);
    } else {
      spinMessage = "Auto-Spin is disabled.";
      rotate(this.autoDegrees);
    }
    this.tank.display();
    push();
    translate(this.center.x, this.center.y);
    rectMode(CORNER);
    stroke(100, 100, 100, this.trans);
    strokeWeight(1);
    fill(150, 150, 150, this.trans);
    rect(-30, 39, 60, 5, 40);
    fill(55, 255, 0, this.trans);
    rect(-30, 40, (this.health / upgrades[0].health) * 60, 2.5, 40);
    pop();
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
document.addEventListener('DOMContentLoaded', function () {
  buttons.push(document.getElementById('maxHealthButton'));
  buttons.push(document.getElementById('regenSpeedButton'));
  buttons.push(document.getElementById('bodyDamageButton'));
  buttons.push(document.getElementById('bulletSpeedButton'));
  buttons.push(document.getElementById('bulletPenetrationButton'));
  buttons.push(document.getElementById('bulletDamageButton'));
  buttons.push(document.getElementById('reloadSpeedButton'));
  buttons.push(document.getElementById('movementSpeedButton'));
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.top = buttonTop + buttonTopMod * i + 'px';
    buttons[i].style.padding = buttonPadding;
    buttons[i].style.left = buttonLeft + 'px';
    buttons[i].style.border = buttonBorder;
    buttons[i].style.fontSize = buttonFontSize;
    buttons[i].style.textShadow = buttonTextShadow;
    buttons[i].style.transform = buttonScale;
  }
  function handleButtonClick(buttonId) {
    switch (buttonId) {
      case "maxHealthButton":
        upgradeSkill(1, 20, "level1", "health");
        break;

      case "regenSpeedButton":
        upgradeSkill(2, 0.000005, "level2", "regenSpeed");
        break;

      case "bodyDamageButton":
        upgradeSkill(3, 7, "level3", "bodyDamage");
        break;

      case "bulletSpeedButton":
        upgradeSkill(4, 0.15, "level4", "bulletSpeed");
        break;

      case "bulletPenetrationButton":
        upgradeSkill(5, 0.05, "level5", "penetration");
        break;

      case "bulletDamageButton":
        upgradeSkill(6, 4, "level6", "bulletDamage");
        break;

      case "reloadSpeedButton":
        upgradeSkill(7, -upgrades[0].reloadTime / 10, "level7", "reloadTime");
        break;

      case "movementSpeedButton":
        upgradeSkill(8, 0.05, "level8", "movementSpeed");
        break;

      default:
        console.log('Unknown button clicked.');
    }
  }
  buttons.forEach(button => {
    button.addEventListener('click', function () {
      handleButtonClick(button.id);
      console.log('Button clicked:', button.id);
    });
  });

});
function drawShape(x, y, r, sides, w, s) {
  translate(x, y);
  push();
  stroke(s[0], s[1], s[2]);
  strokeWeight(w);
  let angleIncrement = TWO_PI / sides;
  beginShape();
  angleMode(RADIANS);
  for (let i = 0; i < sides; i++) {
    let angle = angleIncrement * i;
    let xNext = cos(angle) * r;
    let yNext = sin(angle) * r;
    vertex(xNext, yNext);
  }
  endShape(CLOSE);
  angleMode(DEGREES);
  pop();
}
function showMessage(message) {
  clearTimeout(timeout);
  document.getElementById('message').innerText = message;
  document.getElementById('message').classList.remove('hidden');
  timeout = setTimeout(function () {
    document.getElementById('message').classList.add('hidden');
  }, 2200);
}
function move(x, y) {
  canvas.acceleration.add(new createVector(x, y));
  //  minimap.acceleration.add(canvas.acceleration/40);
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].acceleration.add(canvas.acceleration);
  }
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].acceleration.add(canvas.acceleration);
  }
}
function moveStill() {
  canvas.acceleration = new createVector(0, 0);
  minimap.acceleration = new createVector(0, 0);
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].acceleration = new createVector(0, 0);
  }
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].acceleration = new createVector(0, 0);
  }
}
let keysPressed = {
  w: false,
  a: false,
  s: false,
  d: false
};
function keyPressed() {
  keysPressed[key] = true;
}
function keyReleased() {
  keysPressed[key] = false;
}
function getCombinedMovement() {
  let x = 0;
  let y = 0;

  if (keysPressed.w) y += upgrades[0].movementSpeed / 20;
  if (keysPressed.s) y -= upgrades[0].movementSpeed / 20;
  if (keysPressed.a) x += upgrades[0].movementSpeed / 20;
  if (keysPressed.d) x -= upgrades[0].movementSpeed / 20;

  return { x, y };
}
function upgradeSkill(key, value, level, property) {
  if (upgrades[0].skill < 46 && upgrades[0].level > 0 && upgrades[0][level] < 8) {
    upgrades[0][property] += value;
    upgrades[0].level -= 1;
    upgrades[0][level] += 1;
  }
}
function applyCollisionForceToObject(object, vector) {
  object.add(vector);
}
function degmod() {
  if (mouseY < windowHeight / 2) {
    return 180;
  } else {
    return 0;
  }
}
keyTyped = function () {
  switch (key.toString()) {
    case "e":
      autoFire += 1;
      showMessage(message);
      break;

    case "c":
      gun[0].autoDegrees = gun[0].degrees;
      autoSpin += 1;
      showMessage(spinMessage);
      break;

    case "1":
      upgradeSkill(1, 20, "level1", "health");
      break;

    case "2":
      upgradeSkill(2, 0.000005, "level2", "regenSpeed");
      break;

    case "3":
      upgradeSkill(3, 7, "level3", "bodyDamage");
      break;

    case "4":
      upgradeSkill(4, 0.15, "level4", "bulletSpeed");
      break;

    case "5":
      upgradeSkill(5, 0.05, "level5", "penetration");
      break;

    case "6":
      upgradeSkill(6, 4, "level6", "bulletDamage");
      break;

    case "7":
      upgradeSkill(7, -upgrades[0].reloadTime / 10, "level7", "reloadTime");
      break;

    case "8":
      upgradeSkill(8, 0.05, "level8", "movementSpeed");
      break;
  }
};
function setup() {
  createCanvas(windowWidth, windowHeight);
  document.getElementById('message').style.left = (windowWidth / 2) + 'px';
  upgrades.push(new Upgrades());
  canvas = new Canvas();
  addShapes = new Shapes();
  defaultGun = new DefaultGun();
  twin = new Twin();
  sniper = new Sniper();
  machineGun = new MachineGun();
  flankGuard = new FlankGuard();
  assassin = new Assassin();
  overseer = new Overseer();
  destroyer = new Destroyer();
  gunner = new Gunner();
  triTank = new TriTank();
  quadTank = new QuadTank();
  twinFlank = new TwinFlank();
  smasher = new Smasher();
  gun.push(new Gun(defaultGun));
  minimap = new Minimap();
}
draw = function () {
  background(200);
  var factor = 1 - upgrades[0].skill / 100;
  var center = new createVector(width / 2, height / 2);
  var m = new createVector(mouseX, mouseY);
  m.sub(center);
  m.normalize();
  m.mult(20);
  push();
  angleMode(DEGREES);
  translate(center.x, center.y);
  if (scaleFactor > factor) {
    scaleFactor -= 0.0001;
  }
  scale(scaleFactor);
  rectMode(CORNER);
  canvas.run();
  addShapes.run();
  if (keyIsPressed) {
    let movementDirection = getCombinedMovement();
    move(movementDirection.x, movementDirection.y);
  }
  if (mouseIsPressed || autoFire % 2 == 1) {
    message = "Auto-Fire is disabled.";
    if ((canvas.reload() && autoSpin % 2 == 1) && !(mouseX < windowWidth / 4.5 && mouseY > windowHeight / 1.4)) {
      bullets.push(new Bullet(new createVector(m.x, m.y)));
      explosion.push(new Explosion(new createVector(m.x / 2, m.y / 2), m));
      let ind = bullets.length - 1;
      bullets[ind].modA = explosion[0].calculateForce();
      canvas.applyForce(canvas.modAcc, explosion[0].calculateForce());
      for (let i = 0; i < shapes.length; i++) {
        shapes[i].applyForce(shapes[i].modAcc, explosion[0].calculateForce());
      }
      for (let i = 0; i < bullets.length - 1; i++) {
        bullets[i].applyForce(bullets[i].modAcc, explosion[0].calculateForce());
      }
      explosion.splice(0, 1);
      canvas.reloadTime = upgrades[0].reloadTime;
    }
    else if (canvas.reload() && autoSpin % 2 != 1) {
      let a = new createVector(0, 0);
      a.x = cos(gun[0].autoDegrees + 90);
      a.y = sin(gun[0].autoDegrees + 90);
      a.mult(20);
      bullets.push(new Bullet(a));
      explosion.push(new Explosion(a.mult(0.5), a));
      let ind = bullets.length - 1;
      bullets[ind].modA = explosion[0].calculateForce();
      canvas.applyForce(canvas.modAcc, explosion[0].calculateForce());
      for (let i = 0; i < shapes.length; i++) {
        shapes[i].applyForce(shapes[i].modAcc, explosion[0].calculateForce());
      }
      for (let i = 0; i < bullets.length - 1; i++) {
        bullets[i].applyForce(bullets[i].modAcc, explosion[0].calculateForce());
      }
      explosion.splice(0, 1);
      canvas.reloadTime = upgrades[0].reloadTime;
    }
  }
  else {
    message = "Auto-Fire is enabled.";
  }
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].run();
    if (shapes[i].isDead()) {
      upgrades[0].exp += shapes[i].exp;
      shapes.splice(i, 1);
    }
  }
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].run();
    if (bullets[i].isDead()) {
      bullets.splice(i, 1);
    }
  }
  if (canvas.reload()) {
    if (autoFire % 2 > 0) {
      bullets.push(new Bullet(new createVector(m.x, m.y)));
      canvas.reloadTime = upgrades[0].reloadTime;
    }
  }
  pop();
  upgrades[0].run();
  gun[0].run();
  minimap.run();
};