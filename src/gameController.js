// src/gameControllerOriginal.js
const gameController = (() => {
    let playerOne;
    let playerTwo;
    let currentPlayer;

    const initializePlayers = () => {
        const player1 = prompt('What is your name player 1?');
        const player2 = prompt('What is your name player 2?');

        playerOne = new Player(player1, 'X');
        playerTwo = new Player(player2, 'O');
        currentPlayer = playerOne;
    };

    const playRound = () => {
        gameBoard.printBoard();
        const move = prompt(`${currentPlayer.name}, enter your move (row and column) separated by a space:`).split(' ');
        const [row, column] = move.map(Number);

        if (gameBoard.updateBoard(row, column, currentPlayer.marker)) {
            if (checkWin(row, column)) {
                gameBoard.printBoard();
                alert(`Congrats ${currentPlayer.name}, you won the game!`);
                return;
            }
            if (isBoardFull()) {
                gameBoard.printBoard();
                alert('It\'s a draw!');
                return;
            }
            currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
            playRound();
        } else {
            alert("Invalid move, try again.");
            playRound();
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

    const startGame = () => {
        gameBoard.resetBoard();
        initializePlayers();
        playRound();
    };

    return { startGame };

})();

