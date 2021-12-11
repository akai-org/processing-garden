export const codeTemplate = () => `
import * as p5 from 'p5';

function setup() {
  createCanvas(100, 100);
}

function draw() {
  background(0, 255, 0);
  ellipse(50, 50, 80, 80);
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
}

window.setup = setup;
window.draw = draw;
`;
