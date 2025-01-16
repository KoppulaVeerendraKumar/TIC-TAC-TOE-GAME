const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetButton = document.querySelector('.reset');
const winnerBanner = document.querySelector('.winner-banner');
const winnerText = document.querySelector('.winner-text');

let currentPlayer = 'Player 1';
let currentSymbol = 'X';
let boardState = Array(9).fill(null);
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (boardState[index] || !gameActive) return;

    boardState[index] = currentSymbol;
    cell.textContent = currentSymbol;
    cell.classList.add('taken');

    if (checkWin()) {
        highlightWinningCells();
        showWinner();
        return;
    }


    if (boardState.every(cell => cell !== null)) {
        showDraw();
        return;
    }


    currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
    currentSymbol = currentSymbol === 'X' ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s Turn`;
}

function checkWin() {
    return winningCombinations.some(combination => 
        combination.every(index => boardState[index] === currentSymbol)
    );
}

function highlightWinningCells() {
    winningCombinations.forEach(combination => {
        if (combination.every(index => boardState[index] === currentSymbol)) {
            combination.forEach(index => cells[index].classList.add('win'));
        }
    });
}

function showWinner() {
    gameActive = false;
    winnerText.textContent = `${currentPlayer} Wins! 🎉`;
    winnerBanner.style.display = 'block';
}

function showDraw() {
    gameActive = false;
    winnerText.textContent = "It's a Draw! 🤝";
    winnerBanner.style.display = 'block';
}

function resetGame() {
    currentPlayer = 'Player 1';
    currentSymbol = 'X';
    boardState.fill(null);
    gameActive = true;
    statusText.textContent = `${currentPlayer}'s Turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell'; 
    });
    winnerBanner.style.display = 'none';
}


cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);