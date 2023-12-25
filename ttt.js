
const gameBoard = (() => {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < columns; j++) {
            board[i][j] = j;
        }
    }

})


function Player(name, marker) {
    this.name = name;
    this.marker = marker;
};

const gameController = (() => {
    
})





