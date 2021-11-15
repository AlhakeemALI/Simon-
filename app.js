let playerChoices = [];
let computerChoices = [];
let gameStart = false;
let win = false;
let round = 10;
let canClick = false;
let numLightToGuess = 0;
let counter = 0;

const startButton = document.querySelector(".but1");
const divPanals = document.querySelectorAll(".panal");
const resetButton = document.querySelector(".reset");
const colorGreen = document.querySelector(".green");
const colorRed = document.querySelector(".red");
const colorYellow = document.querySelector(".yellow");
const colorBlue = document.querySelector(".blue");
const playerRound = document.querySelector("#round1");
const score = document.querySelector("#score2");

startButton.addEventListener("click", (e) => {
  gameStart = true;
  canClick = true;
  //computerTurn();
  playerRound.textContent = 1;
  playerChoices = [];
  computerChoices = [];
  counter = 0;
  numLightToGuess = 0;
  flashAdd();

  //console.log(e.target)
});

const randomColor = [colorGreen, colorRed, colorYellow, colorBlue];

const getRendamIndex = (randomColor) => {
  const randomIndex =
    randomColor[Math.floor(Math.random() * randomColor.length)];
  return randomIndex;
};

const sequance = [getRendamIndex(randomColor)];

//console.log(sequance)

// add a Function to flash all the for panals
const addClass = (circle) => {
  //console.log(circal.className)
  if (circle.classList !== "light") {
    return new Promise((resolve, reject) => {
      circle.classList.add("light");
      computerChoices.push(parseInt(circle.id));
      console.log(`computerChoices  ===> ${[computerChoices]}`);

      setTimeout(() => {
        circle.classList.remove("light");
        setTimeout(() => {
          //computerChoices.shift(parseInt(circle.id));
        }, 250);
        resolve();
        counter++;
        console.log(`counter log ===> ${counter}`);
        console.log(`num light to guess ===> ${numLightToGuess}`);
        numLightToGuess += 1;
        if (counter >= numLightToGuess && canClick == false) {
          canClick = true;
          //console.log(playerChoices);
        }
      }, 1000);
    });
  }
};

const panalClick = divPanals.forEach((element) => {
  element.addEventListener("click", function (event) {
    //console.log(`click`);
    if (canClick) {
      playerChoices.push(parseInt(element.id));
      //console.log(playerChoices);

      play();
    }
  });
});

const play = () => {
  if (!canClick) return;
  //console.log("computerChoices  ===>" + [computerChoices]);
  console.log(`playerChoices ${[playerChoices]}`);

  if (arraysEqual(playerChoices, computerChoices)) {
    //canClick = false;

    score.textContent++;
    playerRound.textContent++;
    computerTurn();
  } else if (!playerChoices.every((val) => computerChoices.includes(val))) {
    canClick = false;
    //computerChoices = [];
    //playerChoices = [];

    //counter = 0;
    //numLightToGuess = 0;
    console.log(`Else if it's working`);
    resetButton.addEventListener("click", (e) => {
      score.textContent = 0;
      playerRound.textContent = 0;
    });
  }
};

const computerTurn = () => {
  // computerChoices[i].push(getRendamIndex(randomColor))

  sequance.push(getRendamIndex(randomColor));
  computerChoices = [];
  playerChoices = [];
  counter = 0;
  numLightToGuess = 0;
  //playerRound.textContent++;
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
//arraysEqual()

const checkWinner = () => {
  arraysEqual(computerChoices, playerChoices);
  currenIndex = 0;
  playerChoices.length = 0;
  computerChoices.length = 0;
  round = 10;
};
//checkWinner()

//
