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

export const correctValue = () => false;
