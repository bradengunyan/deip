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
var scaleFactor = 1.5;
var frictionC = 0.5;
var explosion = [];
var upgrades = [];
var gun = [];
var position;
var buttons = [];
var message = "";
var spinMessage = "";
var timeout;
var tankUpgradeButtons = [];
var ignoreButton;
document.addEventListener('DOMContentLoaded', function () {
  buttons.push(document.getElementById('maxHealthButton'));
  buttons.push(document.getElementById('regenSpeedButton'));
  buttons.push(document.getElementById('bodyDamageButton'));
  buttons.push(document.getElementById('bulletSpeedButton'));
  buttons.push(document.getElementById('bulletPenetrationButton'));
  buttons.push(document.getElementById('bulletDamageButton'));
  buttons.push(document.getElementById('reloadSpeedButton'));
  buttons.push(document.getElementById('movementSpeedButton'));
  tankUpgradeButtons.push(document.getElementById('tankUpgradeOneButton'));
  tankUpgradeButtons.push(document.getElementById('tankUpgradeTwoButton'));
  tankUpgradeButtons.push(document.getElementById('tankUpgradeThreeButton'));
  tankUpgradeButtons.push(document.getElementById('tankUpgradeFourButton'));
  tankUpgradeButtons.push(document.getElementById('ignoreTankUpgradeButton'));
  for (let i = 0; i < tankUpgradeButtons.length - 1; i++) {
    tankUpgradeButtons[i].style.padding = '25px 25px';
    tankUpgradeButtons[i].style.border = '2px solid rgb(40, 40, 40)';
    tankUpgradeButtons[i].style.fontSize = '8px';
    tankUpgradeButtons[i].style.textShadow = '0 0 10px #000000';
    tankUpgradeButtons[i].style.transform = 'scale(1.6)';
    tankUpgradeButtons[i].style.borderRadius = '4px';
  }
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.top = 766 + 22 * i + 'px';
    buttons[i].style.padding = '0px 7px';
    buttons[i].style.left = 215 + 'px';
    buttons[i].style.border = '2px solid rgb(20, 20, 20)';
    buttons[i].style.fontSize = '8px';
    buttons[i].style.textShadow = '0 0 10px #000000';
    buttons[i].style.transform = 'scale(1.6)';
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
  switch (key.toString().toLowerCase()) {
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
  gun.push(new Gun(new Booster()));
  tankUpgrade = new TankUpgrade();
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
      bullets.push(new Bullet(m));
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
      explosion.push(new Explosion(new createVector(a.x / 2, a.y / 2), a));
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
  tankUpgrade.run();
  gun[0].run();
  minimap.run();
};