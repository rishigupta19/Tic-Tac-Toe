let currentPlayer;
  let gameStarted = false;

  function startGame() {
    const playerChoice = document.getElementById('player-choice').value;
    currentPlayer = playerChoice;
    gameStarted = true;
    document.querySelector('.choice').style.display = 'none';
    document.querySelector('.start-btn').style.display = 'none';
    document.querySelector('.restart-btn').style.display = 'none';
    document.querySelectorAll('.board td').forEach(cell => cell.style.cursor = 'pointer');
    displayMessage(`You are playing as ${currentPlayer}`);
  }

  function cellClicked(index) {
    if (!gameStarted) {
      displayMessage('Please start the game first.');
      return;
    }
    if (!document.getElementById(`cell-${index}`).classList.contains('clicked')) {
      document.getElementById(`cell-${index}`).setAttribute('data-symbol', currentPlayer);
      document.getElementById(`cell-${index}`).classList.add('clicked');

      if (checkWinner()) {
        displayMessage(`${currentPlayer} wins!`);
        gameStarted = false;
        document.querySelector('.restart-btn').style.display = 'inline-block';
      } else if (checkDraw()) {
        displayMessage("It's a draw!");
        gameStarted = false;
        document.querySelector('.restart-btn').style.display = 'inline-block';
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  function checkWinner() {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    return winConditions.some(condition => {
      const [a, b, c] = condition;
      return document.getElementById(`cell-${a}`).getAttribute('data-symbol') === currentPlayer &&
             document.getElementById(`cell-${b}`).getAttribute('data-symbol') === currentPlayer &&
             document.getElementById(`cell-${c}`).getAttribute('data-symbol') === currentPlayer;
    });
  }

  function checkDraw() {
    return Array.from({ length: 9 }, (_, i) => document.getElementById(`cell-${i}`).classList.contains('clicked')).every(clicked => clicked);
  }

  function displayMessage(message) {
    document.getElementById('message').innerText = message;
  }

  function restartGame() {
    gameStarted = false;
    document.querySelector('.choice').style.display = 'flex';
    document.querySelector('.start-btn').style.display = 'inline-block';
    document.querySelector('.restart-btn').style.display = 'none';
    document.querySelectorAll('.board td').forEach(cell => {
      cell.removeAttribute('data-symbol');
      cell.classList.remove('clicked');
      cell.style.cursor = 'not-allowed';
    });
    displayMessage('');
  }