class Scene {
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
}