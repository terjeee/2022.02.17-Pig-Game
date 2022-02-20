`use strict`;

let totalScore0 = 0;
let totalScore1 = 0;
let currentScore0 = 0;
let currentScore1 = 0;

const imgArray = []; // ???

const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const player0Title = document.querySelector(`#name--0`);
const player1Title = document.querySelector(`#name--1`);

const btnNewGame = document.querySelector(`.btn--new`);
const btnRollDice = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

const diceEl = document.querySelector(`.dice`);

function showTotalScore0(value) {
  document.getElementById(`score--0`).textContent = value;
}
function showTotalScore1(value) {
  document.getElementById(`score--1`).textContent = value;
}
function showCurrentScore0(value) {
  document.getElementById(`current--0`).textContent = value;
}
function showCurrentScore1(value) {
  document.getElementById(`current--1`).textContent = value;
}

function switchActivePlayer() {
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
}

function resetCurrentScores() {
  currentScore0 = 0;
  currentScore1 = 0;
}

function btnsDisabled(value) {
  btnRollDice.disabled = value;
  btnHold.disabled = value;
}

// ---- // ---- // ---- // ---- // ---- // ---- // ---- // ---- // ---- // ---- //

// pageLoad --
showTotalScore0(totalScore0);
showTotalScore1(totalScore1);
showCurrentScore0(currentScore0);
showCurrentScore1(currentScore1);
diceEl.classList.add(`hidden`);

// rollDice --
btnRollDice.addEventListener(`click`, function () {
  let diceNumber = 0;
  diceNumber = Math.floor(Math.random() * 6) + 1;

  diceEl.setAttribute(`src`, `dice-${diceNumber}.png`);
  diceEl.classList.remove(`hidden`);

  if (player0El.classList.contains(`player--active`)) {
    if (diceNumber === 1) {
      currentScore0 = 0;
      showCurrentScore0(currentScore0);
      switchActivePlayer();
    } else {
      currentScore0 += diceNumber;
      showCurrentScore0(currentScore0);
    }
  } else {
    if (diceNumber === 1) {
      currentScore1 = 0;
      showCurrentScore1(currentScore1);
      switchActivePlayer();
    } else {
      currentScore1 += diceNumber;
      showCurrentScore1(currentScore1);
    }
  }
});

// hold-btn --
btnHold.addEventListener(`click`, function () {
  totalScore0 += currentScore0;
  totalScore1 += currentScore1;
  showTotalScore0(totalScore0);
  showTotalScore1(totalScore1);

  if (totalScore0 >= 20 || totalScore1 >= 20) {
    totalScore0 >= 20
      ? (player0Title.textContent = `WINNER!`)
      : (player1Title.textContent = `WINNER!`);
    btnsDisabled(true);
    resetCurrentScores();
    showCurrentScore0(currentScore0);
    showCurrentScore1(currentScore1);
  } else {
    resetCurrentScores();
    showCurrentScore0(currentScore0);
    showCurrentScore1(currentScore1);
    switchActivePlayer();
  }
});

// newGame-btn --
btnNewGame.addEventListener(`click`, function () {
  totalScore0 = 0;
  totalScore1 = 0;
  resetCurrentScores();

  showTotalScore0(totalScore0);
  showTotalScore1(totalScore1);
  showCurrentScore0(currentScore1);
  showCurrentScore1(currentScore1);
  diceEl.classList.add(`hidden`);
  btnsDisabled(false);

  player0Title.textContent = `PLAYER 1`;
  player1Title.textContent = `PLAYER 2`;

  if (!player0El.classList.contains(`player--active`)) {
    switchActivePlayer();
  }
});
