class Ship {
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
}