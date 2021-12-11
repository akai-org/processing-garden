export const codeTemplate = (value: string) => `
import * as p5 from 'p5';

function setup() {
  createCanvas(400, 400);
}

function draw() {
  ${value}
  background(255,0,0);
}

window.setup = setup;
window.draw = draw;
`;

export const correctValue = () => false;
