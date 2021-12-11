export const challengeTitle = 'asdf';

const enemyClass = `class Enemy {
    constructor(x, y, enemy) {
        this.x = x;
        this.y = y;
        this.r = 30;

        this.horizontalSpeed = 1;
        this.toDelete = false;
        this.verticalSpeed = 6;
        this.enemy = enemy;
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

    shiftDown(ship) {
        this.horizontalSpeed *= -1;
        this.y += this.verticalSpeed;
        if(this.y - this.r > height && ship){
            this.toDelete = true
        }
    }

    move(ship) {
        this.x += 5*this.horizontalSpeed;
    }

    show() {
        image(this.enemy, this.x, this.y, this.r * 2, this.r * 2);
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
    constructor(player) {
        this.x = width / 2;
        this.horizontalSpeed = 0;

        this.toDelete = false;

        this.player = player;
    }

    show() {
        imageMode(CENTER);
        image(this.player, this.x, height - 20, 20, 60);
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

const sceneClass = (value: string) => `class Scene {
    constructor(player, enemy) {
        this.ship = new Ship(player);
        this.enemies = [];
        this.missiles = [];

        this.edge = false;

        this.enemy = enemy;

        this.stopped = false;

        this.createEnemies();
    }

    createEnemies() {
        for (var i = 0; i < 6; i++) {
            this.enemies[i] = new Enemy(i*90 + 40, 60, this.enemy);
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
        this.edge = false;
        if(this.enemies.length === 0 && !this.stopped){
            window.top.postMessage({type: 'gameResults', state: 'won'}, '*')
            this.stopped = true;
        }
        for (const [index, enemy] of this.enemies.entries()) {
            if (enemy.didHit(this.ship)) {
                this.ship.die();
            }
            enemy.move(this.ship);
            if (enemy.toDelete) {
                this.enemies.splice(index, 1);
                continue;
            }
            if (enemy.x + enemy.r > width || enemy.x - enemy.r < 0) {
                this.edge = true;
            }
            enemy.show();
        }

        if(this.edge){
            for(const enemy of this.enemies){
                enemy.shiftDown();
            }
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
let player;
let enemy

function setup() {
    createCanvas(600, 400);

    // loading images



    scene = new Scene(player, enemy);
    scene.updateMissiles
}

function draw() {
    scene.update();
}

function keyPressed() {
    // if (key === ' ') {
    //     const missile = new Missile(scene.ship.x, height);
    //     scene.missiles.push(missile);
    // }
    ${value}

    if (keyCode === RIGHT_ARROW) {
        if(!scene.ship) return;
        scene.ship.setDir(1);
    } else if (keyCode === LEFT_ARROW) {
        if(!scene.ship) return;
        scene.ship.setDir(-1);
    }
}

function keyReleased() {
    if (key != ' ') {
        if(!scene.ship) return;
        scene.ship.setDir(0);
    }
}

function preload() {
    const path = window.location.ancestorOrigins[0];
    player = loadImage(path + '/assets/player.png')
    enemy = loadImage(path + '/assets/enemy.png')
}
`;

export const codeTemplate = (value: string) => `

import * as p5 from 'p5';


${enemyClass}
${missileClass}
${shipClass}
${sceneClass(value)}

window.setup = setup
window.draw = draw
window.keyReleased = keyReleased
window.keyPressed = keyPressed
window.preload = preload;
`;
