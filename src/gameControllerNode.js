// src/gameController.js
const readline = require('readline');
const gameBoard = require('./gameBoard');
const Player = require('./player');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const gameController = (() => {
    let playerOne;
    let playerTwo;
    let currentPlayer;

    const askQuestion = (question) => {
        return new Promise((resolve) => rl.question(question, resolve));
    };

    const initializePlayers = async () => {
        const player1 = await askQuestion('What is your name player 1? ');
        const player2 = await askQuestion('What is your name player 2? ');

        playerOne = new Player(player1, 'X');
        playerTwo = new Player(player2, 'O');
        currentPlayer = playerOne;
    };

    const playRound = async () => {
        gameBoard.printBoard();
        const move = await askQuestion(`${currentPlayer.name}, enter your move (row and column) separated by a space: `);
        const [row, column] = move.split(' ').map(Number);

        if (gameBoard.updateBoard(row, column, currentPlayer.marker)) {
            if (checkWin(row, column)) {
                gameBoard.printBoard();
                console.log(`Congrats ${currentPlayer.name}, you won the game!`);
                rl.close();
                return;
            }
            if (isBoardFull()) {
                gameBoard.printBoard();
                console.log('It\'s a draw!');
                rl.close();
                return;
            }
            currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
            await playRound();
        } else {
            console.log("Invalid move, try again.");
            await playRound();
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

    const startGame = async () => {
        gameBoard.resetBoard();
        await initializePlayers();
        await playRound();
    };

    return { startGame };

})();

module.exports = gameController;
