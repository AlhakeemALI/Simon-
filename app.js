window.onload = function () {
  let playerChoices = [];
  let computerChoices = [];
  let sequence = [];
  let canClick = false;
  let isGameRunning = false;
  let numLightToGuess = 0;
  let counter = 0;

  const sound = {
    blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
  };

  const startButton = document.querySelector(".startBtn");
  const divPanels = document.querySelectorAll(".panel");
  const resetButton = document.querySelector(".reset");
  const colorGreen = document.querySelector(".green");
  const colorRed = document.querySelector(".red");
  const colorYellow = document.querySelector(".yellow");
  const colorBlue = document.querySelector(".blue");
  const playerRound = document.querySelector("#round1");
  const score = document.querySelector("#score2");
  const resetText = document.querySelector("#resetText");
  resetText.style.display = "none";

  // Add  A function to start the game
  startButton.addEventListener("click", function (event) {
    if (isGameRunning) {
      return;
    }
    sequence = [];
    isGameRunning = true;
    playerRound.textContent = 1;
    resetText.style.display = "none";
    computerTurn();
  });

  // Add  A function to generate a random color
  const randomColor = [colorGreen, colorRed, colorYellow, colorBlue];
  const getRendamIndex = (randomColor) => {
    const randomIndex =
      randomColor[Math.floor(Math.random() * randomColor.length)];
    return randomIndex;
  };

  // add a Function to flash all the four panels
  const addClass = (circle) => {
    if (circle.classList !== "light") {
      return new Promise((resolve) => {
        circle.classList.add("light");
        computerChoices.push(circle.id);
        if (circle.id === colorBlue.id) {
          sound.blue.play();
        } else if (circle.id === colorRed.id) {
          sound.red.play();
        } else if (circle.id === colorYellow.id) {
          sound.yellow.play();
        } else if (circle.id === colorGreen.id) {
          sound.green.play();
        }
        console.log(`computerChoices  ===> ${[computerChoices]}`);
        setTimeout(() => {
          circle.classList.remove("light");
          setTimeout(() => {}, 250);
          resolve();
          counter++;
          numLightToGuess += 1;
          if (counter >= numLightToGuess && canClick == false) {
            canClick = true;
          }
        }, 1000);
      });
    }
  };

  // Add an EventListene on click
  const panelClick = divPanels.forEach((element) => {
    element.addEventListener("click", function (event) {
      if (canClick) {
        playerChoices.push(element.id);
        console.log(`playerChoices ====>  ${[playerChoices]}`);
        if (element.id === colorBlue.id) {
          sound.blue.play();
        } else if (element.id === colorRed.id) {
          sound.red.play();
        } else if (element.id === colorYellow.id) {
          sound.yellow.play();
        } else if (element.id === colorGreen.id) {
          sound.green.play();
        }
        play();
      }
    });
  });

  // Add  A function to play
  const play = () => {
    if (!canClick) return;
    if (arraysEqual(playerChoices, computerChoices)) {
      score.textContent++;
      playerRound.textContent++;
      computerTurn();
    } else if (playerChoices.length == computerChoices.length) {
      resetText.style.display = "block";
      startButton.classList.add("hide");
      canClick = false;
    }
  };
  // Add An EventListener to Reset the Game
  const reset = resetButton.addEventListener("click", function (e) {
    computerChoices = [];
    playerChoices = [];
    sequence = [];
    counter = 0;
    numLightToGuess = 0;
    score.textContent = 0;
    playerRound.textContent = 0;
    isGameRunning = false;
    startButton.classList.remove("hide");
    resetText.style.display = "none";
  });
  //  Add A function  to  make the computerTurn every round
  const computerTurn = () => {
    sequence.unshift(getRendamIndex(randomColor));
    computerChoices = [];
    playerChoices = [];
    counter = 0;
    numLightToGuess = 0;
    flashAdd();
  };
  // Add A flash to each panel every time the computerplay
  const flashAdd = async () => {
    for (const panel of sequence) {
      await addClass(panel);
    }
  };
  // Add a function to check both Arrays computerChoices && playerChoices
  const arraysEqual = (array1, array2) => {
    return (
      Array.isArray(array1) &&
      Array.isArray(array2) &&
      array1.length === array2.length &&
      array1.every((val, index) => val === array2[index])
    );
  };
};
