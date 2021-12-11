export const challengeTitle = 'asdf';

const enemyClass = `class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 30;

        this.horizontalSpeed = 0;
        this.toDelete = false;
        this.verticalSpeed = 1;
    }

    didHit(ship) {
        if (!ship) return;
        const d = dist(this.x, this.y, ship.x, height - 40);
        // 30 = half of the ship width
        if (d < this.r + 30) {

            ship.die();
            return true;
        } else {
            return false;
        }
    }

    grow() {
        this.r += 2;
    }

    shiftDown() {
        this.horizontalSpeed *= -1;
        this.y += this.verticalSpeed;
    }

    move() {
        this.x += 5*this.horizontalSpeed;
        this.shiftDown();
    }

    show() {
        noStroke();
        fill(255, 0, 200, 150);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    die() {
        this.toDelete = true;
    }

    update() {}
}`;

const missileClass = `class Missile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 8;
        this.toDelete = false;
    }

    show() {
        noStroke();
        fill(150, 0, 255);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    evaporate() {
        this.toDelete = true;
    }

    didHit(enemy) {
        const d = dist(this.x, this.y, enemy.x, enemy.y);
        if (d < this.r + enemy.r) {
            enemy.die();
            return true;
        } else {
            return false;
        }
    }

    move() {
        this.y -= 5;
    }
}`;

const shipClass = `class Ship {
    constructor() {
        this.x = width / 2;
        this.horizontalSpeed = 0;

        this.toDelete = false;
    }

    show() {
        fill(255);
        rectMode(CENTER);
        rect(this.x, height - 20, 20, 60);
    }

    setDir(dir) {
        this.horizontalSpeed = dir;
    }

    move() {
        if (this.horizontalSpeed > 0 && this.x + 10 < width) {
            this.x += this.horizontalSpeed * 5;
        }
        if (this.horizontalSpeed < 0 && this.x - 10 > 0) {
            this.x += this.horizontalSpeed * 5;
        }
    }

    die() {
        this.toDelete = true;
    }
}`;

const sceneClass = `class Scene {
    constructor() {
        this.ship = new Ship();
        this.enemies = [];
        this.missiles = [];

        this.edge = false;

        this.createEnemies();
    }

    createEnemies() {
        for (var i = 0; i < 1; i++) {
            this.enemies[i] = new Enemy(width/2, 60);
        }
    }

    update() {
        // handle background
        background(51);

        // handle ship

        if (this.ship && this.ship.toDelete) {
            window.top.postMessage({type: 'gameResults', state: 'lost'}, '*')
            this.ship = null;
        }
        if (this.ship) {
            this.ship.move();
            this.ship.show();
        }

        // handle enemies

        this.updateEnemies();


        // handle missiles

        this.updateMissiles();

    }

    updateEnemies() {
        for (const [index, enemy] of this.enemies.entries()) {
            if (enemy.didHit(this.ship)) {
                this.ship.die();
            }
            if (enemy.toDelete) {
                this.enemies.splice(index, 1);
                continue;
            }
            enemy.move();
            if (enemy.x + enemy.r > width || enemy.x - enemy.r < 0) {
                this.edge = true;
            }
            enemy.show();
        }

    }

    updateMissiles() {
        for (const [index, missile] of this.missiles.entries()) {
            if (missile.toDelete) {
                this.missiles.splice(index, 1);
            }
        }


        for (const missile of this.missiles) {
            missile.move();
            for (const enemy of this.enemies) {
                if (missile.didHit(enemy)) {
                    enemy.grow();
                    missile.evaporate();
                }
            }
            missile.show();
        }
    }
}

let scene;

function setup() {
    createCanvas(600, 400);
    scene = new Scene();
    scene.updateMissiles 
}

function draw() {
    scene.update();
}

function keyPressed() {
    if (key === ' ') {
        const missile = new Missile(scene.ship.x, height);
        scene.missiles.push(missile);
    }

    if (keyCode === RIGHT_ARROW) {
        scene.ship.setDir(1);
    } else if (keyCode === LEFT_ARROW) {
        scene.ship.setDir(-1);
    }
}

function keyReleased() {
    if (key != ' ') {
        scene.ship.setDir(0);
    }
}`;

export const codeTemplate = () => `

import * as p5 from 'p5';

${enemyClass}
${missileClass}
${shipClass}
${sceneClass}

window.setup = setup
window.draw = draw
window.keyReleased = keyReleased
window.keyPressed = keyPressed
`;
