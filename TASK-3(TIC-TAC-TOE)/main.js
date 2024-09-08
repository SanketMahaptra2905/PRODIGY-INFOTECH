window.onload = function() {
    const gameBoard = document.getElementById('gameBoard');
    const cells = document.querySelectorAll('.cell');
    const gameStatus = document.getElementById('gameStatus');
    const resetBtn = document.getElementById('resetBtn');
    const playerXNameInput = document.getElementById('playerXName');
    const playerONameInput = document.getElementById('playerOName');

    let currentPlayer = 'X';
    let playerXName = 'Player X';
    let playerOName = 'Player O';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

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

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedIndex] !== '' || !gameActive) {
            return;
        }

        gameState[clickedIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        checkResult();
    }

    function checkResult() {
        let roundWon = false;

        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                roundWon = true;
                highlightWinningCells([a, b, c]);
                break;
            }
        }

        if (roundWon) {
            if (currentPlayer === 'X') {
                playerXName = playerXNameInput.value || 'Player X';
                gameStatus.textContent = `${playerXName} wins!`;
            } else {
                playerOName = playerONameInput.value || 'Player O';
                gameStatus.textContent = `${playerOName} wins!`;
            }
            gameActive = false;
            return;
        }

        if (!gameState.includes('')) {
            gameStatus.textContent = 'Draw!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `${currentPlayer}'s turn`;
    }

    function highlightWinningCells(cellsIndices) {
        cellsIndices.forEach(index => {
            cells[index].classList.add('winner');
        });
    }

    function resetGame() {
        playerXName = playerXNameInput.value || 'Player X';
        playerOName = playerONameInput.value || 'Player O';
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        gameStatus.textContent = `${currentPlayer}'s turn`;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winner');
        });
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetBtn.addEventListener('click', resetGame);
}
