export const challengeTitle = 'asdf';

export const codeTemplate = () => `
import * as p5 from 'p5';

function setup() {
  createCanvas(100, 100);
}

function draw() {
  background(0, 255, 0);
  ellipse(50, 50, 80, 80);
}

function keyPressed() {
    switch (keyCode) {
      case LEFT_ARROW:
        fill(0);
        break;
      case RIGHT_ARROW:
        fill(100);
        break;
      case UP_ARROW:
        fill(180);
        break;
      case DOWN_ARROW:
        fill(250);
        break;
    }
}

window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
`;
