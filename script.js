const loginForm = document.querySelector('.login-form');
const loginScreen = document.getElementById('login-screen');
const gameScreen = document.getElementById('game-screen');
const portfolioScreen = document.getElementById('portfolio-screen');

const cards = document.querySelectorAll('.card');
let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;
let matchCount = 0;
const totalPairs = cards.length / 2;

// Transição: Login → Jogo
loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  loginScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
});

// Jogo da memória
function flipCard() {
  if (lockBoard || this === firstCard) return;
  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.name === secondCard.dataset.name;

  if (isMatch) {
    disableCards();
    matchCount++;
    if (matchCount === totalPairs) {
      setTimeout(() => {
        gameScreen.classList.add('hidden');
        portfolioScreen.classList.remove('hidden');
      }, 1000);
    }
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
