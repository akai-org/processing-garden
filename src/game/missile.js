class Missile {
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
}