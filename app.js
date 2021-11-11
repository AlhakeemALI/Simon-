

let  gameStart = false;


const  colorGreen = document.querySelector('.green');
const colorRed = document.querySelector('.red');
const colorYellow = document.querySelector('.yellow');
const cloorBlue = document.querySelector(' .blue');


const sequance = [colorGreen, colorRed, colorYellow, cloorBlue];

// add a Function to flash all the for panals
const  addClass = circal => {
  //console.log(circal.className)
  if(circal.classList !== 'light' ) {
    return new Promise((resolve,reject)  => {
      circal.classList.add('light');
      setTimeout(() => {
        circal.classList.remove('light');
        resolve();
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

//




