
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

module.exports = gameBoard;