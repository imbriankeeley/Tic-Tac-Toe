// __tests__/gameController.test.js

const gameBoard = require('../src/gameBoard');
const gameController = require('../src/gameController');
const player = require('../src/player');

describe('Tic Tac Toe Game', () => {
    beforeEach(() => {
        gameController.startGame();
    });

    test('Player 1 should make a valid move', () => {
        const result = gameController.playRound(0, 0);
        expect(result).toBe('Next turn');
    });

    test('Player 1 should not make an invalid move', () => {
        gameController.playRound(0, 0); // Player 1 move
        const result = gameController.playRound(0, 0); // Player 2 tries same spot
        expect(result).toBe("Invalid move, try again.");
    });

    test('Game should detect a win', () => {
        gameController.playRound(0, 0); // Player 1
        gameController.playRound(1, 0); // Player 2
        gameController.playRound(0, 1); // Player 1
        gameController.playRound(1, 1); // Player 2
        const result = gameController.playRound(0, 2); // Player 1 wins
        expect(result).toBe('Congrats Player 1, you won the game!');
    });

    test('Game should detect a draw', () => {
        gameController.playRound(0, 0); // Player 1
        gameController.playRound(0, 1); // Player 2
        gameController.playRound(0, 2); // Player 1
        gameController.playRound(1, 1); // Player 2
        gameController.playRound(1, 0); // Player 1
        gameController.playRound(1, 2); // Player 2
        gameController.playRound(2, 1); // Player 1
        gameController.playRound(2, 0); // Player 2
        const result = gameController.playRound(2, 2); // Draw
        expect(result).toBe("It's a draw!");
    });
});