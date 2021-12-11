export const codeTemplate = () => `
import * as p5 from 'p5';

function setup() {
  createCanvas(100, 100);
}

function draw() {
  background(0, 255, 0);
}

window.setup = setup
window.draw = draw
`;
