const boxes = document.querySelectorAll(".box");
const bonkThee = document.querySelector(".mole");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const timesUpDisplay = document.getElementById(`times-up`);
const difficultyOption = document.querySelectorAll(
  'input[name="difficulty-level"]'
);
let clickedBox;
let score = 0;
let currentTime = 60;
let timer = null;
let tId = null;
let timesUp = false;

function getRandomBox() {
  boxes.forEach((box) => {
    box.classList.remove("mole");
  });

  let randomBox = boxes[Math.floor(Math.random() * 9)];
  randomBox.classList.add("mole");
  clickedBox = randomBox.id;
  //console.log(boxes)
}
function start() {
  let choice = 300;
  for (option of difficultyOption) {
    if (option.checked) {
      choice = option.value;
      break;
    }
  }
  console.log(choice)
  timer = setInterval(getRandomBox, choice);
  tId = setInterval(timeCal, 1000);
}

function timeCal() {
  currentTime--;
  timeDisplay.textContent = currentTime;
  if (currentTime === 0) {
    clearInterval(tId);
    clearInterval(timer);
    alert(`TIMES UP!\nYour Score: ${score}`);
    timesUp = true;
    timesUpDisplay.textContent = `REFRESH THE PAGE TO PLAY AGAIN`;
  }
}

boxes.forEach((box) => {
  box.addEventListener("mousedown", () => {
    if (box.id === clickedBox) {
      score += 1;
      clickedBox = null;
      if (!timesUp) {
        scoreDisplay.textContent = score;
      }
    }
  });
});
