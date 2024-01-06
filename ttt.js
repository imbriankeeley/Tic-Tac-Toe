
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

    let playerOneScore = 1;
    let playerTwoScore = 0;
    let gameState = 1;

    function playRound() {
        
        
        gameCheck();
    };

    function gameEnd() {
        let winningPlayer = '';
        playerOneScore > playerTwoScore ? winningPlayer = player1 : winningPlayer = player2;
        
        alert(`Congrats ${winningPlayer}, you won the game!`);
    };

    function gameCheck() {
        gameState === 0 ? playRound() : gameEnd();
    };

    gameCheck();

});

gameController()







