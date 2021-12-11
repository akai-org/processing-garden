export const challengeTitle = 'asdf';

const enemyClass = `class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 30;

        this.horizontalSpeed = 1;
        this.toDelete = false;
    }

    grow() {
        this.r += 2;
    }

    shiftDown() {
        this.horizontalSpeed *= -1;
        this.y += this.r;
    }

    move() {
        this.x += this.horizontalSpeed;
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
        for (var i = 0; i < 6; i++) {
            this.enemies[i] = new Enemy(i * 60 + 60, 60);
        }
    }

    update() {
        // handle background
        background(51);

        // handle ship

        this.ship.move();
        this.ship.show();

        // handle enemies

        this.updateEnemies();


        // handle missiles

        this.updateMissiles();

    }

    updateEnemies() {
        for (const [index, enemy] of this.enemies.entries()) {
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

        if (this.edge) {
            for (const enemy of this.enemies) {
                enemy.shiftDown();
            }
            this.edge = false;
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
let img;

function setup() {
    createCanvas(600, 400);
    scene = new Scene();
    scene.updateMissiles 
}

function draw() {
    scene.update();
    image(img, 0, 0, 200, 200);
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
}

function preload() {
    const path = window.location;
    img = loadImage(path.ancestorOrigins[0] + '/mrBean.jpg');
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
window.preload = preload
`;
