
const gameBoard = (() => {
    const rows = 3;
    const columns = 3;
    const board = Array.from(Array(rows), () => Array(columns).fill(''));

    const printBoard = () => {
        console.log(board.map(row => row.join(' | ')).join('\n---------\n'));
    };

    const updateBoard = (row, column, marker) => {
        if (board[row][column] === '') {
            board[row][column] = marker;
            return true;
        }
        return false;
    };

    const resetBoard = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                board[i][j] = '';
            }
        }
    };

    return {
        printBoard,
        updateBoard,
        resetBoard,
        board
    };
})();



function Player(name, marker) {
    this.name = name;
    this.marker = marker;
};

const gameController = (() => {
    const player1 = prompt('What is your name player1');
    const player2 = prompt('What is your name player2');

    const playerOne = new Player(player1, 'X');
    const playerTwo = new Player(player2, 'O');
    let currentPlayer = playerOne;
    
    const playRound = () => {
        gameBoard.printBoard();
        const move = prompt(`${currentPlayer.name}, enter your move (row and column) seperately by a space:`).split(' ');
        const row = parseInt(move[0], 10);
        const column = parseInt(move[1], [10]);

        if(gameBoard.updateBoard(row, column, currentPlayer.marker)) {
            if(checkWin(row, column)) {
                gameBoard.printBoard();
                alert(`Congrats ${currentPlayer.name}, you won the game!`);
                return;
            }
            if (isBoardFull()) {
                gameBoard.printBoard();
                alert.apply('It\'s a draw!');
                return;
            }
            currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
            playRound();
        } else {
            alert("Invalid move, try again.");
            playRound();
        };

        gameCheck();
    };

    const checkWin = (row, column) => {
        const marker = currentPlayer.marker;
        const board = gameBoard.board;

        const checkLine = (a, b, c) => (a === marker && b == marker && c === marker);

        return (
            checkLine(board[row][0], board[row][1], board[row][2]) ||
            checkLine(board[0][column], board[1][column], board[2][column]) ||
            (row === column && checkLine(board[0][0], board[1][1], board[2][2])) ||
            (row + column === 2 && checkLine(board[0][2], board[1][1], board[2][0]))
        );
    };

    const isBoardFull = () => {
        return gameBoard.board.every(row => row.every(cell => cell !== ''));
    }

    const startGame = () => {
        gameBoard.resetBoard();
        currentPlayer = playerOne;
        playRound();
    };

    return { startGame };

});



gameController.startGame();







