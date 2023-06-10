let cells = Array.from(document.getElementsByClassName('cell'));
let currentPlayer = 'X';

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

function checkWin(player) {
    return winningCombinations.some(combination =>
        combination.every(index => cells[index].textContent === player)
    );
}

function checkDraw() {
    return [...cells].every(cell => cell.textContent !== '');
}

function endGame(message) {
    setTimeout(() => {
        alert(message);
        location.reload();
    }, 100);
}

function computerPlay() {
    let emptyCells = cells.filter(cell => cell.textContent === '');
    if(emptyCells.length > 0) {
        let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        randomCell.textContent = 'O';
        if (checkWin('O')) {
            endGame('Computer wins!');
        } else if (checkDraw()) {
            endGame('It\'s a draw!');
        } else {
            currentPlayer = 'X';
        }
    }
}

cells.forEach(cell => {
    cell.addEventListener('click', e => {
        if(e.target.textContent === '' && currentPlayer === 'X'){
            e.target.textContent = currentPlayer;
            if (checkWin('X')) {
                endGame('Player wins!');
            } else if (checkDraw()) {
                endGame('It\'s a draw!');
            } else {
                currentPlayer = 'O';
                setTimeout(computerPlay, 500);
            }
        }
    });
});
