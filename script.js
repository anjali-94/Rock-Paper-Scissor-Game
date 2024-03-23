let music = new Audio("music/music.mp3");
music.volume = 0.5;
let click_music = new Audio("music/ting.mp3 ");
let lose_audio = new Audio("music/lose.mp3");
let won_audio = new Audio("music/won.mp3");
let tie_audio = new Audio("music/tie.mp3");

let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};


updateScoreElement();

/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
*/

let isAutoPlaying = false;
let intervalvalid;

function autoPlay() {
  if(!isAutoPlaying) {
     intervalvalid = setInterval(function() {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1500);
    isAutoPlaying = true;
  } else{
    clearInterval(intervalvalid);
    isAutoPlaying = false;
  }
  
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r') {
    playGame('rock');
  } else if(event.key === 'p') {
    playGame('paper');
  } else if(event.key === 's') {
    playGame('scissors');
  }
});




function playGame(playerMove) {
  click_music.play();
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }

  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  // if (result === 'You win.') {
  //   won_audio.play();
  // } else if (result === 'You lose.') {
  //   lose_audio.play();
  // } else if (result === 'Tie.') {
  //   tie_audio.play();
  // }

  if (result === 'You win.') {
    score.wins += 1;
    won_audio.play();
  } else if (result === 'You lose.') {
    score.losses += 1;
    lose_audio.play();
  } else if (result === 'Tie.') {
    score.ties += 1;
    tie_audio.play();
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = `${result}`;
  document.querySelector('.js-moves').innerHTML = `You
  <img src="images/${playerMove}-emoji.png" class="move-icon">
  <img src="images/${computerMove}-emoji.png" class="move-icon">
  Computer`
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}