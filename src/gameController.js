// src/gameController.js
const gameBoard = require('./gameBoard');
const Player = require('./player');

const gameController = (() => {
    let playerOne;
    let playerTwo;
    let currentPlayer;

    const initializePlayers = (name1, name2) => {
        playerOne = new Player(name1, 'X');
        playerTwo = new Player(name2, 'O');
        currentPlayer = playerOne;
    };

    const playRound = (row, column) => {
        if (gameBoard.updateBoard(row, column, currentPlayer.marker)) {
            if (checkWin(row, column)) {
                return `Congrats ${currentPlayer.name}, you won the game!`;
            }
            if (isBoardFull()) {
                return 'It\'s a draw!';
            }
            currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
            return 'Next turn';
        } else {
            return "Invalid move, try again.";
        }
    };

    const checkWin = (row, column) => {
        const marker = currentPlayer.marker;
        const board = gameBoard.getBoard();

        const checkLine = (a, b, c) => (a === marker && b === marker && c === marker);

        // Check the row
        const rowWin = checkLine(board[row][0], board[row][1], board[row][2]);

        // Check the column
        const columnWin = checkLine(board[0][column], board[1][column], board[2][column]);

        // Check the main diagonal (top-left to bottom-right)
        const mainDiagonalWin = (row === column) && checkLine(board[0][0], board[1][1], board[2][2]);

        // Check the anti-diagonal (top-right to bottom-left)
        const antiDiagonalWin = (row + column === 2) && checkLine(board[0][2], board[1][1], board[2][0]);

        return rowWin || columnWin || mainDiagonalWin || antiDiagonalWin;
    };

    const isBoardFull = () => {
        return gameBoard.getBoard().every(row => row.every(cell => cell !== ''));
    };

    const startGame = (name1, name2) => {
        gameBoard.resetBoard();
        initializePlayers(name1, name2);
    };

    return {
        startGame,
        playRound,
    };
})();

module.exports = gameController;