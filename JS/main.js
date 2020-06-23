let backClass = document.querySelectorAll(".back");
let frontClass = document.querySelectorAll(".front");
let backCardArr = Array.from(backClass);
let frontCardArr = Array.from(frontClass);
let count = 0;
let cardOneSrc = "";
let cardOneIndex = 0;
let cardTwoSrc = "";
let cardTwoIndex = 0;
let message = document.getElementById("message");
let timer = document.getElementById("timer");
let bestScoreButton = document.getElementById("bestScoreButton");
let bestScore = document.getElementById("bestScore");
var best;
// music defined
function music(type) {
  var flip = new Audio("./sounds/NFF-click-switch.wav");
  var worng = new Audio("./sounds/NFF-toggle.wav");
  var correct = new Audio("./sounds/NFF-got-mail-a.wav");
  var win = new Audio("./sounds/NFF-complete.wav");
  var disabled = new Audio("./sounds/NFF-toggle.wav");

  switch (type) {
    case "flip":
      flip.play();
      break;

    case "worng":
      worng.play();
      break;

    case "correct":
      correct.play();
      break;

    case "win":
      win.play();
      break;

    case "disabled":
      disabled.play();
      break;
  }
}

// shuffle Array function.
function shuffleArr(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

let imageArr = ["img/bear.jpg", "img/lion.jpg", "img/fox.jpg"];
// imageArr = shuffleArr(imageArr);
let cardsNumArr = [0, 1, 2, 3, 4, 5];
cardsNumArr = shuffleArr(cardsNumArr);

// game time:
let start = new Date();
let gameTime = setInterval(function () {
  timer.innerHTML = Math.floor((new Date() - start) / 1000);
}, 1000);

//injecting images from imageArr[] to <img> elments.

cardsNumArr.forEach(function (location, index) {
  frontCardArr[location].src = imageArr[Math.floor(index / 2)];
});
// flip the card.
backCardArr.forEach(function (backCard, index) {
  backCard.addEventListener("click", function () {
    //if the selected card is the first flip.
    if (cardTwoSrc === "") {
      music("flip");
      backCard.style.visibility = "hidden";
      if (cardOneSrc === "") {
        cardOneSrc = frontCardArr[index].src;
        cardOneIndex = index;
        console.log(
          `1 cardOneSrc: ${cardOneSrc}, cardOneIndex: ${cardOneIndex}`
        );
      } else {
        cardTwoSrc = frontCardArr[index].src;
        cardTwoIndex = index;
        console.log(
          `2 cardTwoSrc: ${cardTwoSrc}, cardTwoIndex: ${cardTwoIndex}`
        );
      }

      // check if the two fliped cards are equal.
      // if not equal.
      if (cardOneSrc !== cardTwoSrc && cardTwoSrc !== "") {
        music("wrong");
        setTimeout(function () {
          backCardArr[cardTwoIndex].style.visibility = "visible";
          backCardArr[cardOneIndex].style.visibility = "visible";
          cardOneSrc = "";
          cardTwoSrc = "";
        }, 800);
        //if equal.
      } else if (cardTwoSrc !== "") {
        music("correct");
        cardOneSrc = "";
        cardTwoSrc = "";
        count++;
        console.log("count: " + count);
        //chek if the game end.
        if (count === backCardArr.length / 2) {
          clearInterval(gameTime);

          //storaging best score.
          best = localStorage.getItem("bestScore");
          if (+timer.innerHTML < +best) {
            console.log(`timer: ${timer.innerHTML} best: ${best}`);
            localStorage.setItem("bestScore", timer.innerHTML);
            message.innerHTML = `Wow!!! 
            You finished the game at the highest speed so far`;
          } else if (+timer.innerHTML >= +best) {
            console.log(`timer: ${timer.innerHTML} best: ${best}`);
            message.innerHTML = "Exellent!!!";
          }

          setTimeout(function () {
            music("win");
            bestScore.innerHTML = best;
          }, 800);
        }
      }
    }
  });
});

bestScoreButton.addEventListener("click", function () {
  console.log(localStorage.getItem("bestScore"));

  bestScore.innerHTML = localStorage.getItem("bestScore");
});
// localStorage.setItem("bestScore", "100");
