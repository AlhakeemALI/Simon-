
let  playerChoices = [];
let  computerChoices = [];
let  gameStart = false;
let win = false;
let playerScore = 0;
let round = 0;
let winningScore = 20



const startButton = document.querySelector('.but1')
const  divPanals= document.querySelectorAll('.panal')
const resetButton = document.querySelector('.reset')
const  colorGreen = document.querySelector('.green');
const colorRed = document.querySelector('.red');
const colorYellow = document.querySelector('.yellow');
const colorBlue = document.querySelector('.blue');
const  playerRound = document.querySelector('#round1')


startButton.addEventListener('click',(e) => {
  gameStart = true
  playerRound.textContent = 1
  playerChoices = [];
  computerChoices = [];
  flashAdd()

  //console.log(e.target)
})

const randomColor = [
  colorGreen, 
  colorRed, 
  colorYellow, 
  colorBlue
];

const getRendamIndex  = (randomColor) => {

  const randomIndex =  randomColor[Math.floor(Math.random() * randomColor.length)]
  return randomIndex
}


const sequance = [
  getRendamIndex(randomColor),
  getRendamIndex(randomColor),
  getRendamIndex(randomColor),
  getRendamIndex(randomColor)
  
];

//console.log(sequance)

let canClick = false
let numLightToGuess = 4
let  counter = 0
// add a Function to flash all the for panals
const  addClass = circal => {
  //console.log(circal.className)
  if(circal.classList !== 'light' ) {
    return new Promise((resolve,reject)  => {
      computerChoices.push(parseInt(circal.id))
      console.log(computerChoices)
      circal.classList.add('light');
      setTimeout(() => {
        circal.classList.remove('light');
        setTimeout(() => {
          resolve();
        },250);
        counter++
        if(counter >= numLightToGuess) {
           canClick = true
           console.log(playerChoices)
            

        }
      },1000);
    });
  }
  }
 
     const panalClick = divPanals.forEach((element) => {
      element.addEventListener('click',function(event)  {
          
        if (canClick) {
          playerChoices.push(parseInt(element.id))
          console.log(playerChoices)
          currentIndex = 0;
         
        }
        
      })
       
      })
     

  const paly = () => {
  //console.log(event)
      if (!canClick) return 
       if (event.target.classList == 'panal') {
         const currentPanal = e.target.id;
         
         if (currentPanal === computerChoices[currentIndex]) {
          playerChoices.push(parseInt())
          currentIndex++
          console.log(playerChoices)
         }
       } else {
        currentIndex = 0
       }
        
        
      }
      //paly()
      //console.log(arrayOrder)
       //sequance.push(getRendamIndex(randomColor))
     //flashAdd();
    

   

 const flashAdd = async () => {
  for (const panal of sequance) {
     await addClass(panal);
  }
  
}

     
      
  
     const arraysEqual = ((array1, array2) => {
      return Array.isArray(array1) && Array.isArray(array2) && array1.length === array2.length && array1.every((val, index) => val === array2[index])
     })
     //arraysEqual()

     const checkWinner = () => {
      arraysEqual(computerChoices,playerChoices )
      currenIndex = 0;
      playerChoices.length = 0;
      computerChoices.length = 0;
      round = 10
    }
    //checkWinner()

//

