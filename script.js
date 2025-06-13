const board = document.getElementById('board');
const statusText = document.getElementById('status');
const winLine = document.getElementById('win-line');

let currentPlayer = 'X';
let gameActive = true;
let cells = Array(9).fill('');

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const cellPositions = [
  { x: 50, y: 50 },   // 0
  { x: 155, y: 50 },  // 1
  { x: 260, y: 50 },  // 2
  { x: 50, y: 155 },  // 3
  { x: 155, y: 155 }, // 4
  { x: 260, y: 155 }, // 5
  { x: 50, y: 260 },  // 6
  { x: 155, y: 260 }, // 7
  { x: 260, y: 260 }, // 8
];

function checkWinner() {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      gameActive = false;
      statusText.textContent = `Player ${cells[a]} wins!`;
      showWinLine(combo);
      return;
    }
  }
  if (!cells.includes('')) {
    gameActive = false;
    statusText.textContent = "It's a draw!";
  }
}

function showWinLine(combo) {
  const start = cellPositions[combo[0]];
  const end = cellPositions[combo[2]];

  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.sqrt(dx * dx + dy * dy);

  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  const centerX = (start.x + end.x) / 2;
  const centerY = (start.y + end.y) / 2;

  winLine.style.width = `${length}px`;
  winLine.style.top = `${centerY}px`;
  winLine.style.left = `${centerX}px`;
  winLine.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scaleX(1)`;
}

function handleClick(index) {
  if (!gameActive || cells[index]) return;

  cells[index] = currentPlayer;
  renderBoard();
  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function renderBoard() {
  board.innerHTML = '';
  cells.forEach((value, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = value;
    cell.addEventListener('click', () => handleClick(index));
    board.appendChild(cell);
  });
}

function resetGame() {
  cells = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  winLine.style.transform = 'scaleX(0)';
  winLine.style.width = '0';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  renderBoard();
}

renderBoard();
