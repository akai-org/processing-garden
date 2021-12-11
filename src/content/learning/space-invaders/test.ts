export const challengeTitle = 'asdf';

export const codeTemplate = (value: string) => `
import * as p5 from 'p5';

function setup() {
  createCanvas(400, 400);
}

function draw() {
  ${value}
}

window.setup = setup
window.draw = draw
`;

export const correctValue = (value: string) =>
  value === 'background(200);' || value === 'background(200)';
