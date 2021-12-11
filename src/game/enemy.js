class Enemy {
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
}