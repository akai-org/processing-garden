export const title = 'Komunikacja z użytkownikiem';

export const description =
  'W tej lekcji nauczysz się obsługiwać akcje które może wykonać użytkownik takie jak klik myszą czy wciśnięcie klawisza. To czego się nauczysz będzie szczególne przydatne w tworzeniu gier.';

export const correctValue = (value: string) => value === 'case UP_ARROW:';

export const codeTemplate = (value: string) => `
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
    ${value}
    fill('red');
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
