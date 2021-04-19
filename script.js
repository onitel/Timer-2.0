// Get buttons
const btnstart = document.getElementById("start");
const btnstop = document.getElementById("stop");
const btnrestart = document.getElementById("restart");

// Get progres circle from SVG 
const circle = document.querySelector('.progress-ring__circle');
// variable for circumference value of the progres circle from SVG
const radius = circle.r.baseVal.value;
let circumference = radius * 2 * Math.PI;

// Get volume controls
const slider = document.getElementById("myRange");
const vBtn = document.getElementById("vIcon");

// Get audio files 
const music1 = new Audio('./sounds/beep.wav');
const music2 = new Audio('./sounds/paper.wav');
const music3 = new Audio('./sounds/alarm.wav');

// Get minutes and seconds
const minut = document.getElementById("min");
const second = document.getElementById("sec");

// Variables that get to change in the functions
let n = 1;
let m = 0;
let z = 3;
let zl = 0;
let h = 0;
let v = 0;
let pv = 0;

// constant ZERO
const zero = 0;

// variable for toggle effect
let rev = true;

// Seconds function
const bee = () => {
 if (z == 4){return};
    const muu = () => {       
        if (zl > 9){return};
        if (z == 4){return};
        h++;
        m++;
        sound();
        move();
        if (m > 59){min()};
//         console.log(`sec`,m);
        second.innerHTML = second.innerHTML.replace(m-1,m);
    }
    setTimeout( () => { muu()},1000 );
    setTimeout( () => { bee()},1000 );
}

// Minutes function
const min = () => {
zl++;
// console.log(`min`,zl);
minut.innerHTML = minut.innerHTML.replace(zl-1,zl);
second.innerHTML = second.innerHTML.replace("59","0");
n = 1;
}

// Changing the SVG circle progress barr 
circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

const setProgress = (h) => {
  const offset = circumference - h / 600 * circumference;
  circle.style.strokeDashoffset = offset;
}

// Circle color on progres function
function move() {
  let id = setInterval(frame, 1);
  function frame() {
      if(m == 60){m = 0};
      h = m + (zl * 60);
      switch(true){                        
      case h < 60:
        circle.style.stroke = (`#1d59ff`);  // 1
        break;
      case h < 120:
        circle.style.stroke = (`#68c4fa`);  // 2
        break;
      case h < 180:
        circle.style.stroke = (`#68faf0`);  // 3
        break;
      case h < 240:
        circle.style.stroke = (`#68fab7`);  // 4
        break
      case h < 300:
        circle.style.stroke = (`#4CAF50`);  // 5
        break;
      case h < 360:
        circle.style.stroke = (`#a5fa68`);  // 6
        break;
      case h < 420:
        circle.style.stroke = (`#900080`);  // 7
        break;
      case h < 480:
        circle.style.stroke = (`#e9fa68`);  // 8
        break
      case h < 540:
        circle.style.stroke = (`#faa668`);  // 9 
        break;
      case h <= 599:
        circle.style.stroke = (`#ff6969`);  // 10
        break;
      case h < 601:
        circle.style.stroke = (`#d10101`);  // fin
        break;
      }
  }
  setProgress(h);
//   console.log('h',h);
}

// Sound function
const sound = () => {
      if(h == 600){
        music3.play();
      } else if(h == 60 || h == 120 || h == 180 || h == 240 || h == 300 || h == 360 || h == 420 || h == 480 || h == 540){ //ver
        music2.play();
      } else {music1.play();}
}

// Stop function
const stop = () => {
z = 4;
}

// Start function
const start = () => {
if (z == 3 && m > 0){
  return;
} else {
  z = 3;
  bee();
  volume();
}
}

// Restart functions
const restart = () => {  
stop();
setTimeout( () => { rest()},0 ); 
n = 1;
}

const rest = () => {
  resta();
  if(m > 0){
   second.innerHTML = second.innerHTML.replace(m, zero);
  }
  m = 0;
}  

const resta= () => {  
  if(zl >= 0){
   minut.innerHTML = minut.innerHTML.replace(zl, zero);
  }
  zl = 0;
  h = 0;
  move();  
  // because everything is reset, this will reset progress as well
}

// Volume functions
// Setting the volume value
const volume = () => {
  v = slider.value;
  music1.volume = v;
  music2.volume = v;
  music3.volume = v;
  volumeIcon();
  if (v > 0 && rev == false){ rev = true; }
  else if (v == 0 && rev == true){ rev = false; }
}

// Changing volume icons
const volumeIcon = () => {
  switch(true){
    case v > 0.8 : 
      document.getElementById('vIcon').src='./svg/bx-volume-full.svg';
      break;
    case v > 0.2 :
      document.getElementById('vIcon').src='./svg/bx-volume-low.svg';
      break;
    case v > 0 :
      document.getElementById('vIcon').src='./svg/bx-volume.svg';
      break;
    case v == 0 :
      document.getElementById('vIcon').src='./svg/bx-volume-mute.svg';
      break;
  }
}

const changeIconA = () => {
   if (slider.value > 0) {
    pv = slider.value;
    slider.value = 0;
    volume();
    rev = false;
   }   
}

const changeIconB = () => {
   if (slider.value == 0) {
      slider.value = pv;
      volume();
      rev = true;
   }   
}

vBtnChange = () => {
   rev ? changeIconA() : changeIconB() ;
}

// Buttons Event Listener
btnstart.addEventListener("click", start)
btnstop.addEventListener("click", stop)
btnrestart.addEventListener("click", restart)

// Volume Event Listener
slider.addEventListener("input", volume)
vBtn.addEventListener("click", vBtnChange)
