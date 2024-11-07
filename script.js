'use strict';
// Selecting elements
const activePlayer0 = document.querySelector('.player--0');
const activePlayer1 = document.querySelector('.player--1');
const totalScorePlayer0 = document.querySelector('#score--0');
const totalScorePlayer1 = document.querySelector('#score--1');
const currentScorePlayer0 = document.querySelector('#current--0');
const currentScorePlayer1 = document.querySelector('#current--1');

const theDice = document.querySelector('.dice');
const btnNewGmae = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHoldScore = document.querySelector('.btn--hold');
const btnAcknowledge = document.querySelector('.btn--acknowledge');

// Acknowledge to start the game
btnAcknowledge.addEventListener('click', () => {
  document.querySelector('.rules__container').classList.add('hidden');
  document.querySelector('.overlay').classList.add('hidden');
});

// Strarting conditions
let scores, currentScore, activePlayer, gameOn;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gameOn = true;

  currentScorePlayer0.textContent = 0;
  currentScorePlayer1.textContent = 0;
  totalScorePlayer0.textContent = 0;
  totalScorePlayer1.textContent = 0;
  theDice.classList.add('hidden');
  activePlayer0.classList.remove('player--winner');
  activePlayer1.classList.remove('player--winner');
  activePlayer0.classList.add('player--active');
  activePlayer1.classList.remove('player--active');
};
init();

const initRule = function () {
  document.querySelector('.rules__container').classList.remove('hidden');
};
initRule();

// Switching players
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  activePlayer0.classList.toggle('player--active');
  activePlayer1.classList.toggle('player--active');
};

// Roll dice
btnRollDice.addEventListener('click', function () {
  if (gameOn) {
    const diceValue = Math.trunc(Math.random() * 6) + 1;
    theDice.classList.remove('hidden');
    theDice.src = `dice-${diceValue}.png`;

    if (diceValue !== 1) {
      currentScore += diceValue;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold score
btnHoldScore.addEventListener('click', function () {
  if (gameOn) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      gameOn = false;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      theDice.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

// New game
btnNewGmae.addEventListener('click', init);
