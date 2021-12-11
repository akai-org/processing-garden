export const challengeTitle = 'asdf';

export const codeTemplate = (inputVal: any) => `
import * as p5 from 'p5';

function setup() {
  createCanvas(100, 100);
}

function draw() {
  ${inputVal}
}

window.setup = setup;
window.draw = draw;
`;
