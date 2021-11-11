
let  arrayPlayer = []
let  arrayOrder = []
let  gameStart = false;
let win = false


const startButton = document.querySelector('.but1')
const  divPanals= document.querySelectorAll('.panal')
const resetButton = document.querySelector('.reset')
const  colorGreen = document.querySelector('.green');
const colorRed = document.querySelector('.red');
const colorYellow = document.querySelector('.yellow');
const colorBlue = document.querySelector('.blue');


startButton.addEventListener('click',(e) => {
  gameStart = true
  console.log(e.target)
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


const sequance = [getRendamIndex(randomColor), 
  getRendamIndex(randomColor),
  getRendamIndex(randomColor), 
  getRendamIndex(randomColor)
];

console.log(sequance)



// add a Function to flash all the for panals
const  addClass = circal => {
  //console.log(circal.className)
  if(circal.classList !== 'light' ) {
    return new Promise((resolve,reject)  => {
      circal.classList.add('light');
      setTimeout(() => {
        circal.classList.remove('light');
        setTimeout(() => {
          resolve();
        },250);
        
      },1000);
    });
  }
  }
  
  const flashAdd = async () => {
    for (const panal of sequance) {
       await addClass(panal);
    }
  }
  flashAdd();

     divPanals.forEach((element) => {
      element.addEventListener('click',(e) => {
        console.log(e.target)
      })
     })
      
      
  
     
  
   
//

