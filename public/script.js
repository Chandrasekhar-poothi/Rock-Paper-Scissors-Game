const options = ['rock', 'paper', 'scissors'];
let userScore = 0;
let computerScore = 0;
let rounds = 0;

const userScoreDisplay = document.getElementById('user-score');
const computerScoreDisplay = document.getElementById('computer-score');
const finalResultDisplay = document.getElementById('final-result');
const userChoiceDisplay = document.getElementById('selected-user');
const computerChoiceDisplay = document.getElementById('selected-computer');
const restartButton = document.getElementById('restart-btn');

// Create round display elements
const roundDisplay = document.createElement('h2');
roundDisplay.setAttribute('id', 'round-display');
finalResultDisplay.before(roundDisplay);

const roundWinnerDisplay = document.createElement('h3');
roundWinnerDisplay.setAttribute('id', 'round-winner-display');
finalResultDisplay.before(roundWinnerDisplay);

// Handle user's choice
document.querySelectorAll('.player.user .choice').forEach(choice => {
  choice.addEventListener('click', (e) => {
    if (rounds >= 3) return;

    const userChoice = e.target.dataset.choice;
    const computerChoice = options[Math.floor(Math.random() * options.length)];
    
    updateChoices(userChoice, computerChoice);
    const roundResult = getResult(userChoice, computerChoice);

    if (roundResult === 'user') userScore++;
    if (roundResult === 'computer') computerScore++;

    updateScore();
    rounds++;

    displayRound(rounds, roundResult);
    if (rounds === 3) {
      declareWinner();
    }
  });
});

// Update the middle display choices
function updateChoices(userChoice, computerChoice) {
  userChoiceDisplay.innerHTML = `<img src="images/${userChoice}.png" alt="${userChoice}" />`;
  computerChoiceDisplay.innerHTML = `<img src="images/${computerChoice}.png" alt="${computerChoice}" />`;
}

// Determine winner of the round
function getResult(user, computer) {
  if (user === computer) return 'draw';
  if (
    (user === 'rock' && computer === 'scissors') ||
    (user === 'paper' && computer === 'rock') ||
    (user === 'scissors' && computer === 'paper')
  ) {
    return 'user';
  }
  return 'computer';
}

// Update the score display
function updateScore() {
  userScoreDisplay.textContent = `Score: ${userScore}`;
  computerScoreDisplay.textContent = `Score: ${computerScore}`;
}

// Display the round number and round winner
function displayRound(currentRound, roundResult) {
  roundDisplay.textContent = `Round ${currentRound}`;
  
  if (roundResult === 'user') {
    roundWinnerDisplay.textContent = 'Round Winner: User';
  } else if (roundResult === 'computer') {
    roundWinnerDisplay.textContent = 'Round Winner: Computer';
  } else {
    roundWinnerDisplay.textContent = 'Round Winner: Draw';
  }
}

// Declare the final winner
function declareWinner() {
  if (userScore > computerScore) {
    finalResultDisplay.textContent = 'Congratulations! You win!';
  } else if (computerScore > userScore) {
    finalResultDisplay.textContent = 'You lose! Better luck next time!';
  } else {
    finalResultDisplay.textContent = "It's a draw!";
  }
}

// Restart the game
restartButton.addEventListener('click', () => {
  userScore = 0;
  computerScore = 0;
  rounds = 0;
  updateScore();
  finalResultDisplay.textContent = '';
  roundDisplay.textContent = '';
  roundWinnerDisplay.textContent = '';
  userChoiceDisplay.innerHTML = `<img src="images/rock.png" alt="User Choice" />`;
  computerChoiceDisplay.innerHTML = `<img src="images/rock.png" alt="Computer Choice" />`;
});
