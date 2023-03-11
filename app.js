var scores,
  roundScore,
  activePlayer,
  inPlay,
  playTill,
  dice = 6,
  winningScore;
newGame();

document.querySelector(".btn#gp").addEventListener("click", function () {
  document.getElementById("instructions").style.height = "100%";
});

document.querySelector(".closebtn").addEventListener("click", function () {
  document.getElementById("instructions").style.height = "0%";
});

//roll dice button
document.getElementById("roll").addEventListener("click", function () {
  if (inPlay) {
    dice = generateRandom();
    document.getElementById("di1").style.display = "none";
    document.getElementById("di2").style.display = "none";
    document.getElementById("di3").style.display = "none";
    document.getElementById("di4").style.display = "none";
    document.getElementById("di5").style.display = "none";
    document.getElementById("di6").style.display = "none";
    document.getElementById("di" + dice).style.display = "block";
    if (dice === 1) {
      //Lose Score
      scores[activePlayer] = 0;
      // document.getElementById("ts" + dice).textContent = "00";
      document.querySelector(".curr-score>#cs" + 1).textContent = "00";
      nextPlayer();
    } else {
      roundScore += dice;
      document.querySelector(
        ".curr-score>#cs" + (activePlayer + 1)
      ).textContent = roundScore < 10 ? `0${roundScore}` : roundScore;

      if (scores[activePlayer] + roundScore >= getWinningScore()) {
        scores[activePlayer] += roundScore;
        updateTotalScore(activePlayer);
        checkWinner(activePlayer);
      }
    }
  }
});

//hold && next player button
function updateTotalScore(activePlayer) {
  document.getElementById("ts" + (activePlayer + 1)).textContent =
    scores[activePlayer] > 9
      ? scores[activePlayer]
      : "0" + scores[activePlayer];
}
document.getElementById("hold").addEventListener("click", function () {
  if (inPlay) {
    //add current score to players global score
    scores[activePlayer] += roundScore;
    updateTotalScore(activePlayer);
    checkWinner(activePlayer);
    inPlay && nextPlayer();
  }
});

function checkWinner(activePlayer) {
  winningScore = getWinningScore();
  if (scores[activePlayer] >= winningScore) {
    document.querySelector(".p" + (activePlayer + 1) + ">h2").textContent =
      "Winner!";
    document.querySelector(
      ".p" + (activePlayer + 1 == 2 ? 1 : 2) + ">h2"
    ).textContent = "Loser!!";
    document.getElementById("di" + dice).style.display = "none";
    document.querySelector(".p" + (activePlayer + 1) + " .img>img").src =
      "https://media2.giphy.com/media/9xt1MUZqkneFiWrAAD/giphy.gif";
    document.querySelector(`.p${activePlayer + 1 == 2 ? 1 : 2} .img>img`).src =
      "https://media.tenor.com/eTqdoJ96YP4AAAAM/failure-fail.gif";
    document.querySelector(".p" + (activePlayer + 1)).classList.add("winner");
    document
      .querySelector(".p" + (activePlayer + 1))
      .classList.remove("active");
    document.getElementById("cs1").textContent = "00";
    document.getElementById("cs2").textContent = "00";
    inPlay = false;
  }
  return inPlay;
}
function getWinningScore() {
  var input = document.getElementById("max-score").value;
  if (input) {
    winningScore = input;
  } else {
    winningScore = 30;
  }
  return winningScore;
}

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("cs1").textContent = "00";
  document.getElementById("cs2").textContent = "00";
  document.querySelector(".p1").classList.toggle("active");
  document.querySelector(".p2").classList.toggle("active");
}

//new game button
document.getElementById("new").addEventListener("click", newGame);

function newGame() {
  if (activePlayer >= 0) {
    document.getElementById("di6").style.display = "block";
    document.querySelector(".p" + (activePlayer + 1) + ">h2").textContent =
      "Player 1";
    document.querySelector(
      ".p" + (activePlayer + 1 == 2 ? 1 : 2) + ">h2"
    ).textContent = "Player 2";
    document.querySelector(".p" + (activePlayer + 1) + " .img>img").src =
      "https://cdn.icon-icons.com/icons2/2127/PNG/512/red_hair_man_boy_avatar_people_hat_beard_icon_131356.png";
    document.querySelector(`.p${activePlayer + 1 == 2 ? 1 : 2} .img>img`).src =
      "https://cdn.icon-icons.com/icons2/2127/PNG/512/boy_person_avatar_child_man_people_icon_131350.png";
    document
      .querySelector(".p" + (activePlayer + 1))
      .classList.remove("winner");
  }
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  inPlay = true;
  document.getElementById("ts1").textContent = "00";
  document.getElementById("ts2").textContent = "00";
  document.getElementById("cs1").textContent = "00";
  document.getElementById("cs2").textContent = "00";
  document.getElementById("p1").classList.remove("winner");
  document.getElementById("p2").classList.remove("winner");
  document.getElementById("p1").classList.remove("active");
  document.getElementById("p2").classList.remove("active");
  document.getElementById("p1").classList.add("active");
}

function generateRandom() {
  return Math.floor(Math.random() * 6) + 1;
}
