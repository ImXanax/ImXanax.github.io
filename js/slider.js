let sliders;
let angleOffset = 0;
let unitAngle;
let lastMousePosition;
let curMousePosition;
let deltaMouse;
let clock;
let lastFrameTime = NaN;
let velocity = 0;
let meanPosition = 0;
let position = 0;
const springConstant = 80;
const sliderMass = 1;
const dampingForce = 10;
const acceleration = -60;
const mouseSensitivity = 0.2;
const touchSensitivity = 0.25;
const MAX_VELOCITY = 1000;

window.onload = () => {
  sliders = document.querySelectorAll(".circular-slider");
  for (const slider of sliders) {
    let cards = slider.querySelectorAll(".circular-slider > .card");
    distribute(cards, slider);
  }
}

function distribute(cards, slider) {
  if (cards.length == 0) return;
  let angle = (Math.PI * 2) / cards.length;
  let unitAngle = 360 / cards.length;
  let radius = cards[0].offsetWidth / (2 * Math.tan(angle / 2)) + 16;
  slider.style.transformOrigin = `center center ${-radius}px`;
  cards.forEach((card, index) => {
    let tiltAngle = index * angle;
    let deltaZ = radius * (1 - Math.cos(tiltAngle));
    let deltaY = radius * Math.sin(tiltAngle);
    card.style.transform = `
            translate3d(${deltaY}px,0px,${-deltaZ}px)
            rotateY(${(tiltAngle * 180) / Math.PI}deg)
        `;
  });
}
