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
      this.size = 37;
      this.mass = upgrades[0].health / 5;
    }
    display() {
      stroke(140, 140, 140, gun[0].transparent);
      strokeWeight(1.5);
      rectMode(CENTER);
      fill(180, 180, 180, gun[0].transparent);
      rect(10, 13, 15, 32);
      rect(-10, 13, 15, 32);
      rect(0, 15, 15, 37);
      strokeWeight(1.5);
      stroke(5, 141, 232, gun[0].transparent);
      fill(0, 179, 255, gun[0].transparent);
      ellipse(0, 0, this.size, this.size);
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
      this.size = 37;
      this.mass = upgrades[0].health / 5;
    }
    display() {
      stroke(140, 140, 140, gun[0].transparent);
      strokeWeight(1.5);
      rectMode(CENTER);
      angleMode(DEGREES);
      push();
      fill(180, 180, 180, gun[0].transparent);
      rotate(50);
      rect(0, 13, 15, 29);
      rotate(350);
      rect(0, 13, 15, 31);
      rotate(350);
      rect(0, 13, 15, 32);
      rotate(350);
      rect(0, 13, 15, 34);
      rotate(350);
      rect(0, 13, 15, 36);
      rotate(300);
      rect(0, 13, 15, 29);
      rotate(10);
      rect(0, 13, 15, 31);
      rotate(10);
      rect(0, 13, 15, 32);
      rotate(10);
      rect(0, 13, 15, 34);
      rotate(10);
      rect(0, 13, 15, 36);
      rotate(10);
      rect(0, 15, 15, 37);
      strokeWeight(1.5);
      stroke(5, 141, 232, gun[0].transparent);
      fill(0, 179, 255, gun[0].transparent);
      ellipse(0, 0, this.size, this.size);
      pop();
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
      this.size = 37;
      this.mass = upgrades[0].health / 5;
    }
    display() {
      stroke(140, 140, 140, gun[0].transparent);
      strokeWeight(1.5);
      rectMode(CENTER);
      angleMode(DEGREES);
      fill(180, 180, 180, gun[0].transparent);
      rect(0, 17, 15, 35);
      rotate(90);
      rect(0, 17, 15, 35);
      rotate(90);
      rect(0, 17, 15, 35);
      rotate(90);
      rect(0, 17, 15, 35);
      rotate(45);
      rect(0, 17, 15, 35);
      rotate(90);
      rect(0, 17, 15, 35);
      rotate(90);
      rect(0, 17, 15, 35);
      rotate(90);
      rect(0, 17, 15, 35);
      strokeWeight(1.5);
      stroke(5, 141, 232, gun[0].transparent);
      fill(0, 179, 255, gun[0].transparent);
      ellipse(0, 0, this.size, this.size);
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
      this.size = 37;
      this.mass = upgrades[0].health / 5;
    }
    display() {
      push();
      angleMode(DEGREES);
      stroke(140, 140, 140, gun[0].transparent);
      strokeWeight(1.5);
      rectMode(CENTER);
      fill(180, 180, 180, gun[0].transparent);
      rect(-8.5, 17, 14, 32);
      rect(8.5, 17, 14, 32);
      rotate(120);
      rect(-8.5, 17, 14, 32);
      rect(8.5, 17, 14, 32);
      rotate(120);
      rect(-8.5, 17, 14, 32);
      rect(8.5, 17, 14, 32);
      strokeWeight(1.5);
      stroke(5, 141, 232, gun[0].transparent);
      fill(0, 179, 255, gun[0].transparent);
      ellipse(0, 0, this.size, this.size);
      pop();
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
      this.size = 37;
      this.mass = upgrades[0].health / 5;
    }
    display() {
      stroke(140, 140, 140, gun[0].transparent);
      strokeWeight(1.5);
      rectMode(CENTER);
      fill(180, 180, 180, gun[0].transparent);
      rect(0, 18, 16, 48);
      quad(-8, 22, 8, 22, 15, 2, -15, 2);
      strokeWeight(1.5);
      stroke(5, 141, 232, gun[0].transparent);
      fill(0, 179, 255, gun[0].transparent);
      ellipse(0, 0, this.size, this.size);
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
      this.size = 37;
      this.mass = upgrades[0].health / 5;
    }
    display() {
      stroke(140, 140, 140, gun[0].transparent);
      strokeWeight(1.5);
      rectMode(CENTER);
      fill(180, 180, 180, gun[0].transparent);
      quad(-8, 45, 8, 45, 15, 2, -15, 2);
      strokeWeight(1.5);
      stroke(5, 141, 232, gun[0].transparent);
      fill(0, 179, 255, gun[0].transparent);
      ellipse(0, 0, this.size, this.size);
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
      this.size = 37;
      this.mass = upgrades[0].health / 5;
    }
    display() {
      push();
      angleMode(DEGREES);
      stroke(140, 140, 140, gun[0].transparent);
      strokeWeight(1.5);
      fill(180, 180, 180, gun[0].transparent);
      triangle(0, -17, 13, 25, -13, 25);
      rotate(90);
      triangle(0, -17, 13, 25, -13, 25);
      rotate(90);
      triangle(0, -17, 13, 25, -13, 25);
      rotate(90);
      triangle(0, -17, 13, 25, -13, 25);
      strokeWeight(1.5);
      stroke(5, 141, 232, gun[0].transparent);
      fill(0, 179, 255, gun[0].transparent);
      ellipse(0, 0, this.size, this.size);
      pop();
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
      this.size = 37;
      this.mass = upgrades[0].health / 5;
    }
    display() {
      stroke(140, 140, 140, gun[0].transparent);
      strokeWeight(1.5);
      rectMode(CENTER);
      fill(180, 180, 180, gun[0].transparent);
      rect(0, 18, 15, 45);
      rect(0, 18, 15, 39);
      rect(0, 18, 15, 33);
      rect(0, 18, 15, 27);
      rect(0, 18, 15, 21);
      strokeWeight(1.5);
      stroke(5, 141, 232, gun[0].transparent);
      fill(0, 179, 255, gun[0].transparent);
      ellipse(0, 0, this.size, this.size);
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
      this.size = 37;
      this.mass = upgrades[0].health / 5;
    }
    display() {
      stroke(140, 140, 140, gun[0].transparent);
      strokeWeight(1.5);
      rectMode(CENTER);
      fill(180, 180, 180, gun[0].transparent);
      rect(0, 17, 35, 36);
      strokeWeight(1.5);
      stroke(5, 141, 232, gun[0].transparent);
      fill(0, 179, 255, gun[0].transparent);
      ellipse(0, 0, this.size, this.size);
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
      rotate(130);
      rect(0, 15, 15, 28);
      rotate(20);
      rect(0, 17, 15, 28);
      rotate(80);
      rect(0, 15, 15, 28);
      rotate(340);
      rect(0, 17, 15, 28);
      strokeWeight(1.5);
      stroke(5, 141, 232, gun[0].transparent);
      fill(0, 179, 255, gun[0].transparent);
      ellipse(0, 0, this.size, this.size);
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
      this.size = 37;
      this.mass = upgrades[0].health / 5;
    }
    display() {
      push();
      stroke(70, 70, 70, gun[0].transparent);
      strokeWeight(1.5);
      fill(100, 100, 100, gun[0].transparent);
      triangle(0, 24, 4, 18, -4, 18);
      rotate(30);
      triangle(0, 24, 4, 18, -4, 18);
      rotate(30);
      triangle(0, 24, 4, 18, -4, 18);
      rotate(30);
      triangle(0, 24, 4, 18, -4, 18);
      rotate(30);
      triangle(0, 24, 4, 18, -4, 18);
      rotate(30);
      triangle(0, 24, 4, 18, -4, 18);
      rotate(30);
      triangle(0, 24, 4, 18, -4, 18);
      rotate(30);
      triangle(0, 24, 4, 18, -4, 18);
      rotate(30);
      triangle(0, 24, 4, 18, -4, 18);
      rotate(30);
      triangle(0, 24, 4, 18, -4, 18);
      rotate(30);
      triangle(0, 24, 4, 18, -4, 18);
      rotate(30);
      triangle(0, 24, 4, 18, -4, 18);
      strokeWeight(1.5);
      stroke(5, 141, 232, gun[0].transparent);
      fill(0, 179, 255, gun[0].transparent);
      ellipse(0, 0, this.size, this.size);
      pop();
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
      this.size = 37;
      this.mass = upgrades[0].health / 5;
    }
    display() {
      push();
      stroke(70, 70, 70, gun[0].transparent);
      strokeWeight(1.5);
      fill(100, 100, 100, gun[0].transparent);
      triangle(0, 21, 4, 18, -4, 18);
      rotate(30);
      triangle(0, 21, 4, 18, -4, 18);
      rotate(30);
      triangle(0, 21, 4, 18, -4, 18);
      rotate(30);
      triangle(0, 21, 4, 18, -4, 18);
      rotate(30);
      triangle(0, 21, 4, 18, -4, 18);
      rotate(30);
      triangle(0, 21, 4, 18, -4, 18);
      rotate(30);
      triangle(0, 21, 4, 18, -4, 18);
      rotate(30);
      triangle(0, 21, 4, 18, -4, 18);
      rotate(30);
      triangle(0, 21, 4, 18, -4, 18);
      rotate(30);
      triangle(0, 21, 4, 18, -4, 18);
      rotate(30);
      triangle(0, 21, 4, 18, -4, 18);
      rotate(30);
      triangle(0, 21, 4, 18, -4, 18);
      strokeWeight(1.5);
      stroke(5, 141, 232, gun[0].transparent);
      fill(0, 179, 255, gun[0].transparent);
      ellipse(0, 0, this.size, this.size);
      pop();
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
      scale(scaleFactor-0.25);
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
  