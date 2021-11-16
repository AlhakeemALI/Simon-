let playerChoices = [];
let computerChoices = [];
let sequance = [];
let gameStart = false;
let win = false;
let canClick = false;
let isGameRunning = false;
let isResetOn = false;
let numLightToGuess = 0;
let counter = 0;
let round = 10;

const startButton = document.querySelector(".but1");
const divPanals = document.querySelectorAll(".panal");
const resetButton = document.querySelector(".reset");
const colorGreen = document.querySelector(".green");
const colorRed = document.querySelector(".red");
const colorYellow = document.querySelector(".yellow");
const colorBlue = document.querySelector(".blue");
const playerRound = document.querySelector("#round1");
const score = document.querySelector("#score2");
const resetText = document.querySelector("#resetText");

startButton.addEventListener("click", function (event) {
  if (isGameRunning) {
    return;
  }
  sequance = [];
  isGameRunning = true;
  gameStart = true;
  isResetOn = true;
  playerRound.textContent = 1;
  computerTurn();
});
const randomColor = [colorGreen, colorRed, colorYellow, colorBlue];
const getRendamIndex = (randomColor) => {
  const randomIndex =
    randomColor[Math.floor(Math.random() * randomColor.length)];
  return randomIndex;
};

// add a Function to flash all the for panals
const addClass = (circle) => {
  if (circle.classList !== "light") {
    return new Promise((resolve, reject) => {
      circle.classList.add("light");
      computerChoices.push(circle.id);
      computerChoices.forEach((val) =>
        console.log(`computerChoices===> ${typeof val}`)
      );
      console.log(`computerChoices  ===> ${[computerChoices]}`);
      setTimeout(() => {
        circle.classList.remove("light");
        setTimeout(() => {}, 250);
        resolve();
        counter++;
        console.log(`counter log ===> ${counter}`);
        console.log(`num light to guess ===> ${numLightToGuess}`);
        numLightToGuess += 1;
        if (counter >= numLightToGuess && canClick == false) {
          canClick = true;
        }
      }, 1000);
    });
  }
};

const panalClick = divPanals.forEach((element) => {
  element.addEventListener("click", function (event) {
    if (canClick) {
      playerChoices.push(element.id);
      playerChoices.forEach((val) =>
        console.log(`playerChoices===> ${typeof val}`)
      );
      console.log(`playerChoices ====>  ${[playerChoices]}`);
      play();
    }
  });
});

const play = () => {
  if (!canClick) return;

  if (arraysEqual(playerChoices, computerChoices)) {
    score.textContent++;
    playerRound.textContent++;
    computerTurn();
  } else if (playerChoices.length == computerChoices.length) {
    console.log(computerChoices);
    console.log(playerChoices);
    alert("Incorrect choice, start again...");
    canClick = false;
    console.log(`if ===> it's working`);
  }
};

const reset = resetButton.addEventListener("click", function (e) {
  console.log(`it's working`);
  isResetOn = true;
  computerChoices = [];
  playerChoices = [];
  sequance = [];
  counter = 0;
  numLightToGuess = 0;
  score.textContent = 0;
  playerRound.textContent = 0;
  console.log(sequance);
  isGameRunning = false;
});

const computerTurn = () => {
  sequance.push(getRendamIndex(randomColor));
  computerChoices = [];
  playerChoices = [];
  //sequance = [];
  counter = 0;
  numLightToGuess = 0;

  flashAdd();
};

const flashAdd = async () => {
  for (const panal of sequance) {
    await addClass(panal);
  }
};

const arraysEqual = (array1, array2) => {
  return (
    Array.isArray(array1) &&
    Array.isArray(array2) &&
    array1.length === array2.length &&
    array1.every((val, index) => val === array2[index])
  );
};
const checkWinner = () => {
  arraysEqual(computerChoices, playerChoices);
  playerChoices.length = 0;
  computerChoices.length = 0;
  round = 10;
};
