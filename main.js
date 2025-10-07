const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;

// كل التوليفات الممكنة للفوز
const winningCombos = [
  [0, 1, 2], // صف أول
  [3, 4, 5], // صف ثاني
  [6, 7, 8], // صف ثالث
  [0, 3, 6], // عمود أول
  [1, 4, 7], // عمود ثاني
  [2, 5, 8], // عمود ثالث
  [0, 4, 8], // قطر \
  [2, 4, 6]  // قطر /
];

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (!gameActive || cell.textContent !== '') return;

    // حط العلامة
    cell.textContent = currentPlayer;

    // تحقق من الفوز
    if (checkWinner()) {
      statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
      gameActive = false;
      return;
    }

    // تحقق من التعادل
    if ([...cells].every(c => c.textContent !== '')) {
      statusText.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    // بدّل الدور
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

// زر إعادة التشغيل
resetBtn.addEventListener('click', () => {
  cells.forEach(cell => (cell.textContent = ''));
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
});
