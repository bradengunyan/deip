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
var scaleFactor = 1;
var frictionC = 0.5;
var tangle;
var Upgrades;
var explosion = [];
var Tangle;
var Bullet;
var upgrades = [];
var gun = [];
var position;
var buttons = [];
var buttonLeft = 215;
var buttonTop = 810;
var buttonTopMod = 17.7;
var buttonPadding = '0px 7px';
var buttonBorder = '2px solid #474747';
var buttonFontSize = '8px';
var buttonTextShadow = '0 0 10px #000000';
var buttonScale = 'scale(1.3)';
document.addEventListener('DOMContentLoaded', function() {
  buttons.push(document.getElementById('maxHealthButton'));
  buttons.push(document.getElementById('regenSpeedButton'));
  buttons.push(document.getElementById('bodyDamageButton'));
  buttons.push(document.getElementById('bulletSpeedButton'));
  buttons.push(document.getElementById('bulletPenetrationButton'));
  buttons.push(document.getElementById('bulletDamageButton'));
  buttons.push(document.getElementById('reloadSpeedButton'));
  buttons.push(document.getElementById('movementSpeedButton'));
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.top = buttonTop + buttonTopMod*i + 'px';
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
    button.addEventListener('click', function() {
      handleButtonClick(button.id);
      console.log('Button clicked:', button.id);
    });
  });

});
function drawShape(x, y, r, sides) {
  translate(x, y);
  firstPoint = new createVector(0, r);
  secondPoint = new createVector(0, 0);
  for (let i = 0; i < sides; i++) {
    let a = (TWO_PI / sides) * i;
    secondPoint.x = sin();
    line(firstPoint.x, firstPoint.y, secondPoint.x, secondPoint.y);
    firstPoint = secondPoint;
  }
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

  if (keysPressed.w) y += upgrades[0].movementSpeed/20;
  if (keysPressed.s) y -= upgrades[0].movementSpeed/20;
  if (keysPressed.a) x += upgrades[0].movementSpeed/20;
  if (keysPressed.d) x -= upgrades[0].movementSpeed/20;

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
function setup() {
  createCanvas(windowWidth, windowHeight);
  Upgrades = function () {
    this.position = new createVector(-windowWidth/2 + 310, windowHeight - 725);
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
  };
  Upgrades.prototype.run = function () {
    this.update();
    this.display();
  };
  Upgrades.prototype.update = function () {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.left = ((buttonLeft + this.position.x + 580)*1.3) + 'px';
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
      if (this.position.x < -windowWidth/2+310) {
        this.velocity.x = 10;
      }
      if (this.position.x > -windowWidth/2+310) {
        this.position.x = -windowWidth/2+310;
        this.velocity.x = 0;
      }
    } else if (!this.animate()) {
      if (this.position.x > -windowWidth/2-100) {
        this.velocity.x = -10;
      }
      if (this.position.x < -windowWidth/2-100) {
        this.position.x = -windowWidth/2-100;
        this.velocity.x = 0;
      }
    } else {
      this.velocity.x = 0;
    }
  };
  Upgrades.prototype.display = function () {
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
    stroke(50);
    fill(60);
    scale(1.3);
    text("Upgrades (" + this.level + ")", this.position.x - 32, this.position.y - 10);
    fill(255, 120, 0);
    rect(this.position.x, this.position.y, 120, 10, 10);
    fill(255);
    text("Max Health  [ 1 ]", this.position.x - 50, this.position.y + 3);
    fill(255, 0, 170);
    rect(this.position.x, this.position.y + 14, 120, 10, 10);
    fill(255);
    text("Regen Speed  [ 2 ]", this.position.x - 50, this.position.y + 17);
    fill(106, 0, 255);
    rect(this.position.x, this.position.y + 27, 120, 10, 10);
    fill(255);
    text("Body Damage  [ 3 ]", this.position.x - 50, this.position.y + 30);
    fill(0, 89, 255);
    rect(this.position.x, this.position.y + 40, 120, 10, 10);
    fill(255);
    text("Bullet Speed  [ 4 ]", this.position.x - 50, this.position.y + 43);
    fill(255, 200, 0);
    rect(this.position.x, this.position.y + 54, 120, 10, 10);
    fill(255);
    text("Bullet Penetration  [ 5 ]", this.position.x - 50, this.position.y + 57);
    fill(255, 30, 0);
    rect(this.position.x, this.position.y + 68, 120, 10, 10);
    fill(255);
    text("Bullet Damage  [ 6 ]", this.position.x - 50, this.position.y + 71);
    fill(0, 255, 0);
    rect(this.position.x, this.position.y + 82, 120, 10, 10);
    fill(255);
    text("Reload Time [ 7 ]", this.position.x - 50, this.position.y + 85);
    fill(0, 255, 191);
    rect(this.position.x, this.position.y + 96, 120, 10, 10);
    fill(255);
    text("Movement Speed [ 8 ]", this.position.x - 50, this.position.y + 99);
    pop();
  };
  Upgrades.prototype.animate = function () {
    return (mouseX < windowWidth/4.5 && mouseY > windowHeight/1.4) || this.level > 0;
  };
  upgrades.push(new Upgrades());
  var BotUpgrade = function () {
    this.health = 100;
    this.regenSpeed = 0.01;
    this.bodyDamage = 14;
    this.bulletSpeed = 1.6;
    this.penetration = 0.6;
    this.bulletDamage = 10;
    this.reloadTime = 100;
    this.movementSpeed = 1.25;
    this.skill = 0;
    this.exp = 0;
    this.levelUp = 4;
    this.scaling = 5;
    this.level1 = 0;
    this.level2 = 0;
    this.level3 = 0;
    this.level4 = 0;
    this.level5 = 0;
    this.level6 = 0;
    this.level7 = 0;
    this.level8 = 0;
  };
  Explosion = function (p) {
    this.center = new createVector(width / 2, height / 2);
    this.m = new createVector(mouseX, mouseY);
    this.m.sub(this.center);
    this.m.normalize();
    this.m.mult(20);
    this.position = p;
    this.power = upgrades[0].bulletSpeed * 50000;
  };
  Explosion.prototype.calculateForce = function () {
    var dir = p5.Vector.sub(this.position, this.m);
    var distance = dir.mag();
    var force = (-1 * this.power) / (distance * distance);
    dir.normalize();
    dir.mult(force);
    return dir;
  };
  Tangle = function (p) {
    this.position = p;
    this.velocity = new createVector(0, 0);
    this.modVelocity = new createVector(0, 0);
    this.modAcc = new createVector(0, 0);
    this.acceleration = new createVector(0, 0);
    this.fC = frictionC;
    this.rotation = random(0, 90);
    this.health = 15;
    this.mass = upgrades[0].health/5;
    this.bodyDamage = 8;
    this.rotationSpeed = random(0.1, 0.2);
    this.radius = 9;
    this.exp = 10;
    this.type = 1;
  };
  Tangle.prototype.run = function () {
    this.update();
    this.display();
  };
  Tangle.prototype.applyForce = function(vector, force) {
    let f = force.copy();
    f.div(this.mass);
    vector.add(f);
  };
  Tangle.prototype.update = function () {
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
    modF.mult(this.fC/4);
    this.applyForce(this.acceleration, friction);
    this.applyForce(this.modAcc, modF);
    this.velocity.add(this.acceleration);
    this.modVelocity.add(this.modAcc);
    this.velocity.limit(upgrades[0].movementSpeed); 
    this.modVelocity.limit(upgrades[0].movementSpeed/3);
    this.position.add(this.velocity);
    this.position.add(this.modVelocity);
    this.acceleration.mult(0);
    this.modAcc.mult(0);
  };
  Tangle.prototype.display = function () {
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
  };
  Tangle.prototype.isDead = function () {
    return this.health <= 0;
  };
  var Triangle = function (p) {
    this.position = p;
    this.velocity = new createVector(0, 0);
    this.acceleration = new createVector(0, 0);
    this.modVelocity = new createVector(0, 0);
    this.modAcc = new createVector(0, 0);
    this.center = new createVector(1000, 1000);
    this.rotation = random(0, 90);
    this.health = 30;
    this.mass = upgrades[0].health/5;
    this.bodyDamage = 8;
    this.rotationSpeed = random(0.1, 0.2);
    this.radius = 11;
    this.exp = 25;
    this.type = 2;
    this.fC = frictionC;
  };
  Triangle.prototype.run = function () {
    this.update();
    this.display();
  };
  Triangle.prototype.applyForce = function(vector, force) {
    let f = force.copy();
    f.div(this.mass);
    vector.add(f);
  };
  Triangle.prototype.update = function () {
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
    modF.mult(this.fC/4);
    this.applyForce(this.acceleration, friction);
    this.applyForce(this.modAcc, modF);
    this.velocity.add(this.acceleration);
    this.modVelocity.add(this.modAcc);
    this.velocity.limit(upgrades[0].movementSpeed); 
    this.modVelocity.limit(upgrades[0].movementSpeed/3);
    this.position.add(this.velocity);
    this.position.add(this.modVelocity);
    this.acceleration.mult(0);
    this.modAcc.mult(0);
  };
  Triangle.prototype.display = function () {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.rotation);
    stroke(161, 43, 3);
    fill(255, 89, 0);
    triangle(0, -10, -11, 9, 11, 9);
    pop();
  };
  Triangle.prototype.isDead = function () {
    return this.health <= 0;
  };
  var Pentagon = function (p) {
    this.position = p;
    this.velocity = new createVector(0, 0);
    this.acceleration = new createVector(0, 0);
    this.modVelocity = new createVector(0, 0);
    this.modAcc = new createVector(0, 0);
    this.center = new createVector(1000, 1000);
    this.rotation = random(0, 90);
    this.health = 100;
    this.mass = upgrades[0].health/5;
    this.bodyDamage = 12;
    this.rotationSpeed = random(0.1, 0.2);
    this.radius = 30;
    this.exp = 130;
    this.type = 3;
    this.fC = frictionC;
  };
  Pentagon.prototype.run = function () {
    this.update();
    this.display();
  };
  Pentagon.prototype.applyForce = function(vector, force) {
    let f = force.copy();
    f.div(this.mass);
    vector.add(f);
  };
  Pentagon.prototype.update = function () {
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
    modF.mult(this.fC/4);
    this.applyForce(this.acceleration, friction);
    this.applyForce(this.modAcc, modF);
    this.velocity.add(this.acceleration);
    this.modVelocity.add(this.modAcc);
    this.velocity.limit(upgrades[0].movementSpeed); 
    this.modVelocity.limit(upgrades[0].movementSpeed/3);
    this.position.add(this.velocity);
    this.position.add(this.modVelocity);
    this.acceleration.mult(0);
    this.modAcc.mult(0);
  };
  Pentagon.prototype.display = function () {
    push();
    translate(this.position.x, this.position.y);
    scale(0.7);
    rotate(this.rotation);
    stroke(4, 0, 255);
    strokeWeight(3);
    line(-20, -27.5, 20, -27.5);
    line(20, -27.5, 32, 10.5);
    line(-20, -27.5, -32, 10.5);
    line(0, 34, -32, 10.5);
    line(0, 34, 32, 10.5);
    stroke(0, 106, 255);
    strokeWeight(1);
    fill(0, 106, 255);
    triangle(0, 34, -32, 10.5, 32, 10.5);
    quad(-32, 10.5, 32, 10.5, 20, -27.5, -20, -27.5);
    pop();
  };
  Pentagon.prototype.isDead = function () {
    return this.health <= 0;
  };
  var smallDefender = function (p) {
    this.position = p;
    this.velocity = new createVector(0, 0);
    this.acceleration = new createVector(0, 0);
    this.modVelocity = new createVector(0, 0);
    this.modAcc = new createVector(0, 0);
    this.rotation = random(0, 90);
    this.health = 15;
    this.mass = upgrades[0].health/5;
    this.bodyDamage = 8;
    this.rotationSpeed = 0.2;
    this.radius = 6;
    this.exp = 10;
    this.target = new createVector(0, 0);
    this.type = 4;
    this.fC = frictionC;
  };
  smallDefender.prototype.run = function () {
    this.update();
    this.display();
  };
  smallDefender.prototype.applyForce = function(vector, force) {
    let f = force.copy();
    f.div(this.mass);
    vector.add(f);
  };
  smallDefender.prototype.update = function () {
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
    modF.mult(this.fC/4);
    this.applyForce(this.acceleration, friction);
    this.applyForce(this.modAcc, modF);
    this.velocity.add(this.acceleration);
    this.modVelocity.add(this.modAcc);
    this.velocity.limit(upgrades[0].movementSpeed); 
    this.modVelocity.limit(upgrades[0].movementSpeed/3);
    this.position.add(this.velocity);
    this.position.add(this.modVelocity);
    this.acceleration.mult(0);
    this.modAcc.mult(0);
  };
  smallDefender.prototype.display = function () {
    push();
    translate(this.position.x, this.position.y);
    scale(0.6);
    rotate(this.rotation);
    stroke(255, 0, 251);
    fill(252, 92, 255);
    triangle(0, -10, -11, 9, 11, 9);
    pop();
  };
  smallDefender.prototype.isDead = function () {
    return this.health <= 0;
  };
  smallDefender.prototype.spots = function () {
    var dir = p5.Vector.sub(this.position, new createVector(0, 0));
    var distance = dir.mag();
    return distance < 450;
  };
  var bigDefender = function (p) {
    this.position = p;
    this.velocity = new createVector(0, 0);
    this.acceleration = new createVector(0, 0);
    this.modVelocity = new createVector(0, 0);
    this.modAcc = new createVector(0, 0);
    this.rotation = random(0, 90);
    this.health = 30;
    this.mass = upgrades[0].health/5;
    this.bodyDamage = 8;
    this.rotationSpeed = 0.2;
    this.radius = 11;
    this.exp = 25;
    this.target = new createVector(0, 0);
    this.type = 5;
    this.fC = frictionC;
  };
  bigDefender.prototype.run = function () {
    this.update();
    this.display();
  };
  bigDefender.prototype.applyForce = function(vector, force) {
    let f = force.copy();
    f.div(this.mass);
    vector.add(f);
  };
  bigDefender.prototype.update = function () {
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
    modF.mult(this.fC/4);
    this.applyForce(this.acceleration, friction);
    this.applyForce(this.modAcc, modF);
    this.velocity.add(this.acceleration);
    this.modVelocity.add(this.modAcc);
    this.velocity.limit(upgrades[0].movementSpeed); 
    this.modVelocity.limit(upgrades[0].movementSpeed/3);
    this.position.add(this.velocity);
    this.position.add(this.modVelocity);
    this.acceleration.mult(0);
    this.modAcc.mult(0);
  };
  bigDefender.prototype.display = function () {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.rotation);
    stroke(255, 0, 251);
    fill(252, 92, 255);
    triangle(0, -10, -11, 9, 11, 9);
    pop();
  };
  bigDefender.prototype.isDead = function () {
    return this.health <= 0;
  };
  bigDefender.prototype.spots = function () {
    var dir = p5.Vector.sub(this.position, new createVector(0, 0));
    var distance = dir.mag();
    return distance < 450;
  };
  var cPentagon = function (p) {
    this.position = p;
    this.velocity = new createVector(0, 0);
    this.acceleration = new createVector(0, 0);
    this.modVelocity = new createVector(0, 0);
    this.modAcc = new createVector(0, 0);
    this.center = new createVector(1000, 1000);
    this.rotation = random(0, 90);
    this.health = 100;
    this.mass = upgrades[0].health/5;
    this.bodyDamage = 12;
    this.rotationSpeed = random(0.1, 0.2);
    this.radius = 30;
    this.exp = 130;
    this.type = 6;
    this.fC = frictionC;
  };
  cPentagon.prototype.run = function () {
    this.update();
    this.display();
  };
  cPentagon.prototype.applyForce = function(vector, force) {
    let f = force.copy();
    f.div(this.mass);
    vector.add(f);
  };
  cPentagon.prototype.update = function () {
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
    modF.mult(this.fC/4);
    this.applyForce(this.acceleration, friction);
    this.applyForce(this.modAcc, modF);
    this.velocity.add(this.acceleration);
    this.modVelocity.add(this.modAcc);
    this.velocity.limit(upgrades[0].movementSpeed); 
    this.modVelocity.limit(upgrades[0].movementSpeed/3);
    this.position.add(this.velocity);
    this.position.add(this.modVelocity);
    this.acceleration.mult(0);
    this.modAcc.mult(0);
  };
  cPentagon.prototype.display = function () {
    push();
    translate(this.position.x, this.position.y);
    scale(0.7);
    rotate(this.rotation);
    stroke(4, 0, 255);
    strokeWeight(3);
    line(-20, -27.5, 20, -27.5);
    line(20, -27.5, 32, 10.5);
    line(-20, -27.5, -32, 10.5);
    line(0, 34, -32, 10.5);
    line(0, 34, 32, 10.5);
    stroke(0, 106, 255);
    strokeWeight(1);
    fill(0, 106, 255);
    triangle(0, 34, -32, 10.5, 32, 10.5);
    quad(-32, 10.5, 32, 10.5, 20, -27.5, -20, -27.5);
    pop();
  };
  cPentagon.prototype.isDead = function () {
    return this.health <= 0;
  };
  var alphaPentagon = function (p) {
    this.position = p;
    this.velocity = new createVector(0, 0);
    this.acceleration = new createVector(0, 0);
    this.modVelocity = new createVector(0, 0);
    this.modAcc = new createVector(0, 0);
    this.center = new createVector(1000, 1000);
    this.rotation = random(0, 90);
    this.health = 3000;
    this.mass = upgrades[0].health/5;
    this.bodyDamage = 20;
    this.rotationSpeed = random(0.02, 0.04);
    this.radius = 60;
    this.exp = 3000;
    this.type = 7;
    this.fC = frictionC;
  };
  alphaPentagon.prototype.run = function () {
    this.update();
    this.display();
  };
  alphaPentagon.prototype.applyForce = function(vector, force) {
    let f = force.copy();
    f.div(this.mass);
    vector.add(f);
  };
  alphaPentagon.prototype.update = function () {
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
    modF.mult(this.fC/4);
    this.applyForce(this.acceleration, friction);
    this.applyForce(this.modAcc, modF);
    this.velocity.add(this.acceleration);
    this.modVelocity.add(this.modAcc);
    this.velocity.limit(upgrades[0].movementSpeed); 
    this.modVelocity.limit(upgrades[0].movementSpeed/3);
    this.position.add(this.velocity);
    this.position.add(this.modVelocity);
    this.acceleration.mult(0);
    this.modAcc.mult(0);
  };
  alphaPentagon.prototype.display = function () {
    push();
    translate(this.position.x, this.position.y);
    scale(2);
    rotate(this.rotation);
    stroke(4, 0, 255);
    strokeWeight(3);
    line(-20, -27.5, 20, -27.5);
    line(20, -27.5, 32, 10.5);
    line(-20, -27.5, -32, 10.5);
    line(0, 34, -32, 10.5);
    line(0, 34, 32, 10.5);
    stroke(0, 106, 255);
    strokeWeight(1);
    fill(0, 106, 255);
    triangle(0, 34, -32, 10.5, 32, 10.5);
    quad(-32, 10.5, 32, 10.5, 20, -27.5, -20, -27.5);
    pop();
  }; 
  alphaPentagon.prototype.isDead = function () {
    return this.health <= 0;
  };
  Bullet = function (p) {
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
    this.mass = upgrades[0].health/5;
    this.modM = this.health/5 + this.penetration;
    this.dyingSpeed = 4;
    this.size = 17;
    this.fC = frictionC;
    this.modMass = upgrades[0].health/5;
  };
  Bullet.prototype.run = function () {
    this.update();
    this.calculateCollision();
    this.display();
  };
  Bullet.prototype.applyForce = function(vector, force) {
    let f = force;
    f.div(this.mass);
    vector.add(f);
  };
  Bullet.prototype.update = function () {
    this.dying -= this.dyingSpeed;
    let friction = this.velocity.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(this.fC);
    let modF = this.modVelocity.copy();
    modF.mult(-1);
    modF.normalize();
    modF.mult(this.fC/4);
    this.applyForce(this.acceleration, friction);
    this.applyForce(this.modAcc, modF);
    this.velocity.add(this.acceleration);
    this.modVelocity.add(this.modAcc);
    this.modV.add(this.modA);
    this.velocity.limit(upgrades[0].movementSpeed);
    this.modVelocity.limit(upgrades[0].movementSpeed/3);
    this.modV.limit(upgrades[0].bulletSpeed);
    this.acceleration.mult(0);
    this.modAcc.mult(0);
    this.modA.mult(0);
    this.position.add(this.velocity);
    this.position.add(this.modVelocity);
    this.position.add(this.modV);
    this.size = 17 + 0.1 * upgrades[0].skill;
  };
Bullet.prototype.calculateCollision = function () {
    for (var i = 0; i < shapes.length; i++) {
        var dir = p5.Vector.sub(shapes[i].position, this.position);
        var distance = dir.mag();
        var dis = shapes[i].radius + 9;
        if (distance < dis && this.isAlive()) {
            var shapesHealth = shapes[i].health;
            shapes[i].health -= this.health;
            this.health -= shapesHealth;
            let forceMagnitude = (shapes[i].mass * this.mass) / distance**2;
            var collisionForce = dir.copy().setMag(forceMagnitude);
            applyCollisionForceToObject(this.modA, collisionForce.mult(-0.1));
            applyCollisionForceToObject(shapes[i].modAcc, collisionForce.copy().mult(-1));
        }
        if (this.health <= 0) {
            this.dyingSpeed = 35;
        }
    }
};
  Bullet.prototype.display = function () {
    stroke(0, 149, 255, this.dying);
    strokeWeight(2);
    fill(0, 179, 255, this.dying);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  };
  Bullet.prototype.isAlive = function () {
    return this.health > 0;
  };
  Bullet.prototype.isDead = function () {
    return this.dying <= 0;
  };
  var Canvas = function () {
    this.center = new createVector(width / 2, height / 2);
    this.position = new createVector(random(-50, -350), random(-3000, -1000));
    this.velocity = new createVector(0, 0);
    this.modVelocity = new createVector(0, 0);
    this.acceleration = new createVector(0, 0);
    this.modAcc = new createVector(0, 0);
    this.reloadTime = 100;
    this.mass = upgrades[0].health/5;
    this.fC = frictionC;
    this.delay = 1;
  };
  Canvas.prototype.run = function () {
    this.update();
    this.display();
  };
  Canvas.prototype.applyForce = function(vector, force) {
    let f = force;
    f.div(this.mass);
    vector.add(f);
  };
  Canvas.prototype.update = function () {
    let friction = this.velocity.copy();
    let modF = this.modVelocity.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(this.fC);
    modF.mult(-1);
    modF.normalize();
    modF.mult(this.fC/4);
    this.applyForce(this.acceleration, friction);
    this.applyForce(this.modAcc, modF);
    this.velocity.add(this.acceleration);
    this.modVelocity.add(this.modAcc);
    this.velocity.limit(upgrades[0].movementSpeed); 
    this.modVelocity.limit(upgrades[0].movementSpeed/3);
    this.position.add(this.velocity);
    this.position.add(this.modVelocity);
    this.acceleration.mult(0);
    this.modAcc.mult(0);
    this.reloadTime -= 1;
    this.delay -= 1;
    this.yes = 0;
  };
    Canvas.prototype.calculateCollision = function () {
    for (var i = 0; i < shapes.length; i++) {
        var dir = p5.Vector.sub(shapes[i].position, gun[0].position);
        var distance = dir.mag();
        var dis = shapes[i].radius + gun[0].size;
        if (distance < dis && this.delay < 0) {
            this.yes = 1;
            shapes[i].health -= upgrades[0].bodyDamage;
            gun[0].health -= shapes[i].bodyDamage;
            let forceMagnitude = (shapes[i].mass * this.mass) / distance**2;
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
  };
  Canvas.prototype.display = function () {
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
  };
  Canvas.prototype.reload = function () {
    return this.reloadTime < 0;
  };
  canvas = new Canvas();
  var Shapes = function () {
    this.position = new createVector(
      random(canvas.position.x, canvas.position.x + 4000),
      random(canvas.position.y, canvas.position.y + 4000)
    );
  };
  Shapes.prototype.countShapes = function (t) {
    var sum = 0;
    for (var i = 0; i < shapes.length; i++) {
      if (t === shapes[i].type) {
        sum++;
      }
    }
    return sum;
  };
  Shapes.prototype.run = function () {
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
  };
  addShapes = new Shapes();
  var degmod = function () {
    if (mouseY < windowHeight/2) {
      return 180;
    } else {
      return 0;
    }
  };
  var DefaultGun = function () {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.mass = upgrades[0].health/5;
    this.size = 34;
  };
  DefaultGun.prototype.display = function () {
    stroke(140, 140, 140, gun[0].transparent);
    strokeWeight(1.5);
    rectMode(CENTER);
    fill(180, 180, 180, gun[0].transparent);
    rect(0, 22, 17, 16);
    strokeWeight(1.5);
    stroke(5, 141, 232, gun[0].transparent);
    fill(0, 179, 255, gun[0].transparent);
    ellipse(0, 0, this.size, this.size);
  };
  defaultGun = new DefaultGun();
  var Twin = function () {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = new createVector(0, 0);
    this.size = 37;
    this.mass = upgrades[0].health/5;
  };
  Twin.prototype.display = function () {
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
  };
  twin = new Twin();
  var Sniper = function () {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = new createVector(0, 0);
    this.size = 36;
    this.mass = upgrades[0].health/5;
  };
  Sniper.prototype.display = function () {
    stroke(140, 140, 140, gun[0].transparent);
    strokeWeight(1.5);
    rectMode(CENTER);
    fill(180, 180, 180, gun[0].transparent);
    rect(0, 17, 17, 37);
    strokeWeight(1.5);
    stroke(5, 141, 232, gun[0].transparent);
    fill(0, 179, 255, gun[0].transparent);
    ellipse(0, 0, this.size, this.size);
  };
  sniper = new Sniper();
  var MachineGun = function () {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = new createVector(0, 0);
    this.size = 35.5;
    this.mass = upgrades[0].health/5;
  };
  MachineGun.prototype.display = function () {
    stroke(140, 140, 140, gun[0].transparent);
    strokeWeight(1.5);
    fill(180, 180, 180, gun[0].transparent);
    triangle(0, -17, 13, 31, -13, 31);
    strokeWeight(1.5);
    stroke(5, 141, 232, gun[0].transparent);
    fill(0, 179, 255, gun[0].transparent);
    ellipse(0, 0, this.size, this.size);
  };
  machineGun = new MachineGun();
  var FlankGuard = function () {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = new createVector(0, 0);
    this.size = 36;
    this.mass = upgrades[0].health/5;
  };
  FlankGuard.prototype.display = function () {
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
  };
  flankGuard = new FlankGuard();
  var Assassin = function () {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = new createVector(0, 0);
    this.size = 37;
    this.mass = upgrades[0].health/5;
  };
  Assassin.prototype.display = function () {
    stroke(140, 140, 140, gun[0].transparent);
    strokeWeight(1.5);
    rectMode(CENTER);
    fill(180, 180, 180, gun[0].transparent);
    rect(0, 17, 16, 48);
    strokeWeight(1.5);
    stroke(5, 141, 232, gun[0].transparent);
    fill(0, 179, 255, gun[0].transparent);
    ellipse(0, 0, this.size, this.size);
  };
  assassin = new Assassin();
  var Overseer = function () {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = new createVector(0, 0);
    this.size = 37;
    this.mass = upgrades[0].health/5;
  };
  Overseer.prototype.display = function () {
    stroke(140, 140, 140, gun[0].transparent);
    strokeWeight(1.5);
    fill(180, 180, 180, gun[0].transparent);
    triangle(0, -17, 13, 25, -13, 25);
    triangle(0, 17, -13, -25, 13, -25);
    strokeWeight(1.5);
    stroke(5, 141, 232, gun[0].transparent);
    fill(0, 179, 255, gun[0].transparent);
    ellipse(0, 0, this.size, this.size);
  };
  overseer = new Overseer();
  var Destroyer = function () {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = new createVector(0, 0);
    this.size = 37;
    this.mass = upgrades[0].health/5;
  };
  Destroyer.prototype.display = function () {
    stroke(140, 140, 140, gun[0].transparent);
    strokeWeight(1.5);
    rectMode(CENTER);
    fill(180, 180, 180, gun[0].transparent);
    rect(0, 17, 28, 36);
    strokeWeight(1.5);
    stroke(5, 141, 232, gun[0].transparent);
    fill(0, 179, 255, gun[0].transparent);
    ellipse(0, 0, this.size, this.size);
  };
  destroyer = new Destroyer();
  var Gunner = function () {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = new createVector(0, 0);
    this.size = 37;
    this.mass = upgrades[0].health/5;
  };
  Gunner.prototype.display = function () {
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
  };
  gunner = new Gunner();
  var TriTank = function () {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = new createVector(0, 0);
    this.size = 37;
    this.mass = upgrades[0].health/5;
  };
  TriTank.prototype.display = function () {
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
  };
  triTank = new TriTank();
  var QuadTank = function () {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = new createVector(0, 0);
    this.size = 37;
    this.mass = upgrades[0].health/5;
  };
  QuadTank.prototype.display = function () {
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
  };
  quadTank = new QuadTank();
  var TwinFlank = function () {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = new createVector(0, 0);
    this.size = 37;
    this.mass = upgrades[0].health/5;
  };
  TwinFlank.prototype.display = function () {
    stroke(140, 140, 140, gun[0].transparent);
    strokeWeight(1.5);
    rectMode(CENTER);
    angleMode(DEGREES);
    fill(180, 180, 180, gun[0].transparent);
    rect(10, 17, 16, 38);
    rect(-10, 17, 16, 38);
    rotate(180);
    rect(10, 17, 16, 38);
    rect(-10  , 17, 16, 38);
    strokeWeight(1.5);
    stroke(5, 141, 232, gun[0].transparent);
    fill(0, 179, 255, gun[0].transparent);
    ellipse(0, 0, this.size, this.size);
  };
  twinFlank = new TwinFlank();
  var Smasher = function () {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = new createVector(0, 0);
    this.size = 35;
    this.mass = upgrades[0].health/5;
  };
  Smasher.prototype.display = function () {
    stroke(140, 140, 140, gun[0].transparent);
    strokeWeight(1.5);
    fill(180, 180, 180, gun[0].transparent);
    strokeWeight(1.5);
    stroke(5, 141, 232, gun[0].transparent);
    fill(0, 179, 255, gun[0].transparent);
    ellipse(0, 0, this.size, this.size);
  };
  smasher = new Smasher();
  var Triplet = function () {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = new createVector(0, 0);
    this.size = 35;
    this.mass = upgrades[0].health/5;
  };
  var SpreadShot = function () {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = new createVector(0, 0);
    this.size = 35;
    this.mass = upgrades[0].health/5;
  };
  var OctoTank = function () {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = new createVector(0, 0);
    this.size = 35;
    this.mass = upgrades[0].health/5;
  };
  var TripleTwin = function () {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = new createVector(0, 0);
    this.size = 35;
    this.mass = upgrades[0].health/5;
  };
  var Ranger = function () {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = new createVector(0, 0);
    this.size = 35;
    this.mass = upgrades[0].health/5;
  };
  var Stalker = function () {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = new createVector(0, 0);
    this.size = 35;
    this.mass = upgrades[0].health/5;
  };
  var Overlord = function () {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = new createVector(0, 0);
    this.size = 35;
    this.mass = upgrades[0].health/5;
  };
  var Streamliner = function () {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = new createVector(0, 0);
    this.size = 35;
    this.mass = upgrades[0].health/5;
  };
  var Annihilator = function () {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = new createVector(0, 0);
    this.size = 35;
    this.mass = upgrades[0].health/5;
  };
  var Booster = function () {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = new createVector(0, 0);
    this.size = 35;
    this.mass = upgrades[0].health/5;
  };
  var Spike = function () {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = new createVector(0, 0);
    this.size = 35;
    this.mass = upgrades[0].health/5;
  };
  var Landmine = function () {
    this.maxHealth = upgrades[0].maxHealth;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenMult = upgrades[0].regenMult;
    this.bulletSpeed = upgrades[0].bulletSpeed;
    this.bulletDamage = upgrades[0].bulletDamage;
    this.reloadSpeed = upgrades[0].reloadSpeed;
    this.movementSpeed = upgrades[0].movementSpeed;
    this.position = new createVector(0, 0);
    this.size = 35;
    this.mass = upgrades[0].health/5;
  };
  var Gun = function () {
    this.center = new createVector(width / 2, height / 2);
    this.m = new createVector(mouseX, mouseY);
    this.m.sub(this.center);
    this.m.normalize();
    this.m.mult(20);
    this.degrees = atan2(this.m.x / this.m.y) + degmod();
    this.bodyDamage = upgrades[0].bodyDamage;
    this.regenSpeed = upgrades[0].regenSpeed;
    this.regenMult = upgrades[0].regenMult;
    this.health = upgrades[0].health;
    this.position = new createVector(0, 0);
    this.size = 35;
    this.trans = 255;
    this.transparent = 255;
    this.mass = upgrades[0].health/5;
  };
  Gun.prototype.run = function () {
    this.update();
    this.display();
  };
  Gun.prototype.update = function () {
    this.center = new createVector(width / 2, height / 2);
    this.m = new createVector(mouseX, mouseY);
    this.m.sub(this.center);
    this.m.normalize();
    this.m.mult(20);
    this.degrees = -atan(this.m.x / this.m.y) + degmod();
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
  };
  Gun.prototype.display = function () {
    push();
    translate(this.center.x, this.center.y);
    rotate(this.degrees);
    triTank.display();
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
  };
  gun.push(new Gun());
  var Minimap = function () {
    this.position = new createVector(windowWidth - 120, windowHeight - 120);
    this.velocity = new createVector(0, 0);
    this.modVelocity = new createVector(0, 0);
    this.modAcc = new createVector(0, 0);
    this.acceleration = new createVector(0, 0);
    this.player = new createVector(-canvas.position.x/40, -canvas.position.y/40);
  };
  Minimap.prototype.run = function () {
    this.update();
    this.display();
  };
  Minimap.prototype.update = function () {
    this.player.add(this.velocity);
  };
  Minimap.prototype.display = function () {
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
  };
  minimap = new Minimap();
keyTyped = function () {
    var center = new createVector(width / 2, height / 2);
    var m = new createVector(mouseX, mouseY);
    m.sub(center);
    m.normalize();
    m.mult(20);

    switch (key.toString()) {
        case "e":
            autoFire += 1;
            if (canvas.reload()) {
                bullets.push(new Bullet(new createVector(m.x, m.y)));
                canvas.reloadTime = upgrades[0].reloadTime;
            }
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
  if (mouseIsPressed) {
    if (canvas.reload() && !(mouseX < windowWidth/4.5 && mouseY > windowHeight/1.4)) {
      bullets.push(new Bullet(new createVector(m.x, m.y)));
      explosion.push(new Explosion(new createVector(m.x/2, m.y/2)));
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