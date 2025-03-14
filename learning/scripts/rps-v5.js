// Object that keeps track of the player's score
let score = JSON.parse(localStorage.getItem('score'));

// Make sure score object exists
if(score === null) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}

updateScoreElement();

function pickComputerMove() {
  const randomNum = Math.random();

  if(randomNum >= 0 && randomNum < 1/3) {
    computerMove = 'Rock';
  }
  else if(randomNum >= 1/3 && randomNum < 2/3) {
    computerMove = 'Paper';
  }
  else {
    computerMove = 'Scissors';
  }

  return computerMove;
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  // The player chose rock
  if(playerMove === 'Rock') {
    if(computerMove === 'Rock') {
      result = 'It was a tie.';
    }
    else if(computerMove === 'Paper') {
      result = 'You lost.';
    }
    else {
      result = 'You won!';
    }
  }

  // The player chose paper
  else if(playerMove === 'Paper') {
    if(computerMove === 'Rock') {
      result = 'You won!';
    }
    else if(computerMove === 'Paper') {
      result = 'It was a tie.';
    }
    else {
      result = 'You lost.';
    }
  }

  // The player chose scissors
  else if(playerMove === 'Scissors') {
    if(computerMove === 'Rock') {
      result = 'You lost.';
    }
    else if(computerMove === 'Paper') {
      result = 'You won!';
    }
    else {
      result = 'It was a tie.';
    }
  }

  // The player won
  if(result === 'You won!') {
    score.wins++;
  }

  // The player lost
  else if(result === 'You lost.') {
    score.losses++;
  }

  // The player tied
  else if(result === 'It was a tie.'){
    score.ties++;
  }

  // Save scores to localStorage
  localStorage.setItem('score', JSON.stringify(score));

  // Update score and info on page
  document.querySelector('.js-result')
    .innerHTML = `${result}`;
  
  document.querySelector('.js-moves')
    .innerHTML = `<img src="images/${playerMove.toLowerCase()}-emoji.png" class="move-icon"> vs. <img src="images/${computerMove.toLowerCase()}-emoji.png" class="move-icon">`;

  updateScoreElement();
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
