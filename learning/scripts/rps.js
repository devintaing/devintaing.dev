let playerMove = 'unknown';
let computerMove = 'unknown';
let result = 'unknown';

function bounce(element) {
  return new Promise((resolve) => {
    element.classList.add('bounce');
    element.addEventListener('animationend', function() {
      element.classList.remove('bounce');
      resolve();
    }, { once: true });
  });
}

function fadeOutOthers(element) {
  return new Promise((resolve) => {
    const elements = document.querySelectorAll('.js-move-button');
    for(const anElement of elements) {
      if(anElement != element) {
        anElement.classList.add('fadeOut');
        anElement.addEventListener('transitionend', function() {
          anElement.classList.remove('fadeOut');
          resolve();
        }, { once: true });
      }
    }
  });
}

async function rps(element) {
  await bounce(element);
  decidePlayerMove(element);
  await fadeOutOthers(element);
  decideComputerMove();
  hideButtons();
  addClassHTML('js-vsText', 'vs.');
  showClass('js-vsText', 'vsText');
  decideWinner();
  showClass('js-resultText');
  showClass('js-playAgainButton');
}

function decidePlayerMove(element) {
  if(element.classList.contains("js-rock-button")) {
    playerMove = 'rock';
  }
  else if(element.classList.contains("js-paper-button")) {
    playerMove = 'paper';
  }
  else {
    playerMove = 'scissors'
  }
  console.log(`playerMove: ${playerMove}`);
}

function decideComputerMove() {
  const randNum = Math.floor(Math.random() * 3);
  if(randNum === 0) {
    document.querySelector('.js-computerMove')
      .innerHTML = `<img src="images/rock.png" class="move-icon">`;
    computerMove = 'rock';
  }
  else if(randNum === 1) {
    document.querySelector('.js-computerMove')
      .innerHTML = `<img src="images/paper.png" class="move-icon">`;
    computerMove = 'paper';
  }
  else {
    document.querySelector('.js-computerMove')
      .innerHTML = `<img src="images/scissors.png" class="move-icon">`;
    computerMove = 'scissors';
  }
  console.log(`computerMove: ${computerMove}`);
}

function hideButtons() {
  hideClass('js-move-button');
  document.querySelector('.js-playerMove')
      .innerHTML = `<img src="images/${playerMove}.png" class="move-icon">`;
}

function addClassHTML(className, HTML) {
  document.querySelector(`.${className}`).innerHTML = `${HTML}`;
}

function deleteClassHTML(className) {
  document.querySelector(`.${className}`).innerHTML = ``;
}

function hideClass(className, classToDelete) {
  const elements = document.querySelectorAll(`.${className}`);
  for(const element of elements) {
    element.classList.add('hidden');
  }

  if(typeof classToDelete != 'undefined') {
    for(const element of elements) {
      element.classList.remove(`${classToDelete}`);
    }
  }
}

function showClass(className, classToAdd) {
  const elements = document.querySelectorAll(`.${className}`);
  for(const element of elements) {
    element.classList.remove('hidden');
  }

  if(typeof classToAdd != 'undefined') {
    for(const element of elements) {
      element.classList.add(`${classToAdd}`);
    }
  }
}

function playAgain() {
  showClass('js-move-button');
  hideClass('js-vsText', 'vsText');
  deleteClassHTML('js-computerMove');
  deleteClassHTML('js-playerMove');
  hideClass('js-playAgainButton');
  hideClass('js-resultText');
  console.clear();
}

function decideWinner() {
  if(playerMove === 'rock') {
    if(computerMove === 'rock') {
      result = 'tie';
    }
    else if(computerMove === 'paper') {
      result = 'loss';
    }
    else if(computerMove === 'scissors') {
      result = 'win';
    }
  }
  else if(playerMove === 'paper') {
    if(computerMove === 'rock') {
      result = 'win';
    }
    else if(computerMove === 'paper') {
      result = 'tie';
    }
    else if(computerMove === 'scissors') {
      result = 'loss';
    }
  }
  else if(playerMove === 'scissors') {
    if(computerMove === 'rock') {
      result = 'loss';
    }
    else if(computerMove === 'paper') {
      result = 'win';
    }
    else if(computerMove === 'scissors') {
      result = 'tie';
    }
  }

  if(result === 'win') {
    addClassHTML('js-resultText', `You won!`);
  }
  else if(result === 'tie') {
    addClassHTML('js-resultText', `You tied.`);
  }
  else if(result === 'loss') {
    addClassHTML('js-resultText', `You lost.`);
  }

  console.log(`result: ${result}`);
}