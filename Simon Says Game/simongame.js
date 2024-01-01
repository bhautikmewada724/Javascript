//Step:1 KeyPress => Game Start
//Step:2 Button Flash => Level 1
//Step:3 Button Press => Check User Pressed Is Align With Game.
//Step:4 Check == Same then Level Up.
//       Else GameOver

let gameSequence = [];
let userSequence = [];
let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game Started");
    started = true;
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
    userSequence = [];
  level++;
  h2.innerText = `Level ${level}`;

  //Random Button Choose.
  let randomIndex = Math.floor(Math.random() * 3);
  let randomColor = btns[randomIndex];
  let randomButtom = document.querySelector(`.${randomColor}`);
  //   console.log(randomIndex);
  //   console.log(randomColor);
  //   console.log(randomButtom);
  gameSequence.push(randomColor);
  console.log(gameSequence);

  gameFlash(randomButtom);
  
}

function btnPressed() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  //   console.log(userColor);
  userSequence.push(userColor);

  checkAnswer(userSequence.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPressed);
}

function checkAnswer(index) {
  //   console.log("Current Level : ", level);

  if(userSequence[index] === gameSequence[index]){
    if(userSequence.length == gameSequence.length){
       setTimeout( levelUp(),1000);
    }
  }else{
    h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br/>Press Any Key To Start.`
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function(){
        document.querySelector("body").style.backgroundColor = "white";
    },150)
    reset();
  }
}

function reset(){
    started = false;
    gameSequence = [];
    userSequence = [];
    level = 0;
}