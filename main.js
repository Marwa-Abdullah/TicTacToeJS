const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5], 
  [6, 7, 8], 
  [0, 3, 6], 
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8], 
  [2, 4, 6]  
];

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (!gameActive || cell.textContent !== '') return;

 
    cell.textContent = currentPlayer;

   
    if (checkWinner()) {
      statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
      gameActive = false;
      return;
    }

   
    if ([...cells].every(c => c.textContent !== '')) {
      statusText.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

 
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  });
});

function checkWinner() {
  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return (
      cells[a].textContent === currentPlayer &&
      cells[b].textContent === currentPlayer &&
      cells[c].textContent === currentPlayer
    );
  });
}


resetBtn.addEventListener('click', () => {
  cells.forEach(cell => (cell.textContent = ''));
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
});
