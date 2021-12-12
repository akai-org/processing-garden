export const title = 'Twój pierwszy rysunek';

export const description =
  'W tej lekcji nauczysz się jak stworzyć koło. Będziesz miał okazje zdobyć punkty za wykonanie ćwiczenia w którym odtworzysz pokazany tutorial.';

export const correctValue = (value: string) =>
  value === 'ellipse(50, 50, 60, 60);' || value === 'ellipse(50, 50, 60, 60)';

export const codeTemplate = (value: string) => `
import * as p5 from 'p5';

function setup() {
  createCanvas(100, 100);
}

function draw() {
background(0, 255, 0);
  ${value}
}

window.setup = setup
window.draw = draw
`;
