export const title = 'Wprowadzenie';

export const description =
  'W tej lekcji nauczysz się jak stworzyć swój pierwszy szkic w p5js. Zmienisz kolor tła i będziesz miał okazje zdobyć punkty za wykonanie ćwiczenia !';

export const correctValue = (value: string) =>
  value === 'background(200);' || value === 'background(200)';

export const codeTemplate = (value: string) => `
import * as p5 from 'p5';

function setup() {
  createCanvas(100, 100);
}

function draw() {
  ${value}
}

window.setup = setup
window.draw = draw
`;
