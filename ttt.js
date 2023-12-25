
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
    const player1 = prompt('What is your name player1');
    const player2 = prompt('What is your name player2');

    const playerOne = new Player(player1, 'X');
    const playerTwo = new Player(player2, 'O')

    console.log(playerOne.name, playerOne.marker, playerTwo.name, playerTwo.marker)
})

gameController()





