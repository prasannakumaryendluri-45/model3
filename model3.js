const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetBtn');

let currentPlayer = 'X'; // Player X starts
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Array to track the board state

// Check for a winner
const winningCombinations = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal 1
    [2, 4, 6], // Diagonal 2
];

// Handle cell clicks
function handleClick(index) {
    if (gameBoard[index] !== '' || checkWinner()) return; // Ignore if the cell is already filled or the game is over

    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    // Add class to cell to change color
    cells[index].classList.add(currentPlayer);

    if (checkWinner()) {
        statusText.textContent = `${currentPlayer} Wins!`;
    } else if (gameBoard.every(cell => cell !== '')) {
        statusText.textContent = 'It\'s a Draw!';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

// Check if there's a winner
function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Reset the game
resetButton.addEventListener('click', () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O'); // Remove X or O class when resetting
    });
    currentPlayer = 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
});

// Attach click event listeners to each cell
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(index));
});
