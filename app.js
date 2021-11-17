window.onload = function () {
  let playerChoices = [];
  let computerChoices = [];
  let sequence = [];
  let gameStart = false;
  let canClick = false;
  let isGameRunning = false;
  let isResetOn = false;
  let numLightToGuess = 0;
  let counter = 0;

  const startButton = document.querySelector(".but1");
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
    gameStart = true;
    isResetOn = true;
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
        console.log(`computerChoices  ===> ${[computerChoices]}`);
        setTimeout(() => {
          circle.classList.remove("light");
          setTimeout(() => {}, 500);
          resolve();
          counter++;
          //console.log(`counter log ===> ${counter}`);
          //console.log(`num light to guess ===> ${numLightToGuess}`);
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
        play();
      }
    });
  });
  // Add  a function to play
  const play = () => {
    if (!canClick) return;

    if (arraysEqual(playerChoices, computerChoices)) {
      score.textContent++;
      playerRound.textContent++;
      computerTurn();
    } else if (playerChoices.length == computerChoices.length) {
      resetText.style.display = "block";
      startButton.classList.add("hide");
      //alert("Incorrect choice, start again...");
      canClick = false;
      console.log(`if ===> it's working`);
    }
  };

  const reset = resetButton.addEventListener("click", function (e) {
    console.log(`it's working`);
    isResetOn = true;
    computerChoices = [];
    playerChoices = [];
    sequence = [];
    counter = 0;
    numLightToGuess = 0;
    score.textContent = 0;
    playerRound.textContent = 0;
    console.log(sequence);
    isGameRunning = false;
    startButton.classList.remove("hide");
    resetText.style.display = "none";
  });

  const computerTurn = () => {
    sequence.unshift(getRendamIndex(randomColor));
    //sequence.reverse();
    computerChoices = [];
    playerChoices = [];
    counter = 0;
    numLightToGuess = 0;
    flashAdd();
  };

  const flashAdd = async () => {
    for (const panel of sequence) {
      await addClass(panel);
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
};
