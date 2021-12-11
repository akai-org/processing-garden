export const challengeTitle = 'asdf';

export const codeTemplate = () => `
import * as p5 from 'p5';

function setup() {
  createCanvas(100, 100);
}

function draw() {
  background(0, 255, 0);
  ellipse(50,50,80,80);
}

window.setup = setup
window.draw = draw
`;
