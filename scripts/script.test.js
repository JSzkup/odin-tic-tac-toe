const { gameBoard, createPlayer, gameLogic } = require('./script');

describe('GameBoard Basic Operations', () => {
    beforeEach(() => {
        // Reset the game board before each test
        gameBoard.getBoard().forEach(row => row.forEach(cell => cell.addToken(0)));
        console.log('Board reset for new test');
    });

    test('should place token correctly', () => {
        const result = gameBoard.placeToken(0, 0, 'X');
        const cellValue = gameBoard.getBoard()[0][0].getValue();
        console.log(`Placed token result: ${result}, Cell value: ${cellValue}`);
        expect(result).toBe(true);
        expect(cellValue).toBe('X');
    });

    test('should not place token in an occupied cell', () => {
        gameBoard.placeToken(0, 0, 'X');
        const result = gameBoard.placeToken(0, 0, 'O');
        const cellValue = gameBoard.getBoard()[0][0].getValue();
        console.log(`Second placement result: ${result}, Cell value: ${cellValue}`);
        expect(result).toBe(false);
        expect(cellValue).toBe('X');
    });
});

describe('Win Conditions', () => {
    beforeEach(() => {
        gameBoard.getBoard().forEach(row => row.forEach(cell => cell.addToken(0)));
    });

    test('should detect a winner in a row', () => {
        gameBoard.placeToken(0, 0, 'X');
        gameBoard.placeToken(0, 1, 'X');
        gameBoard.placeToken(0, 2, 'X');
        const winner = gameLogic.checkWinner();
        console.log(`Row winner check: ${winner}`);
        expect(winner).toBe('X');
    });

    test('should detect a winner in a column', () => {
        gameBoard.placeToken(0, 0, 'O');
        gameBoard.placeToken(1, 0, 'O');
        gameBoard.placeToken(2, 0, 'O');
        const winner = gameLogic.checkWinner();
        console.log(`Column winner check: ${winner}`);
        expect(winner).toBe('O');
    });

    test('should detect a winner in a forward diagonal', () => {
        gameBoard.placeToken(0, 0, 'X');
        gameBoard.placeToken(1, 1, 'X');
        gameBoard.placeToken(2, 2, 'X');
        const winner = gameLogic.checkWinner();
        console.log(`Forward diagonal winner check: ${winner}`);
        expect(winner).toBe('X');
    });

    test('should detect a winner in a backward diagonal', () => {
        gameBoard.placeToken(0, 2, 'O');
        gameBoard.placeToken(1, 1, 'O');
        gameBoard.placeToken(2, 0, 'O');
        const winner = gameLogic.checkWinner();
        console.log(`Backward diagonal winner check: ${winner}`);
        expect(winner).toBe('O');
    });
});

describe('Game State', () => {
    beforeEach(() => {
        gameBoard.getBoard().forEach(row => row.forEach(cell => cell.addToken(0)));
    });

    test('should detect a tie', () => {
        const moves = [
            [0, 0, 'X'], [0, 1, 'O'], [0, 2, 'X'],
            [1, 0, 'X'], [1, 1, 'O'], [1, 2, 'X'],
            [2, 0, 'O'], [2, 1, 'X'], [2, 2, 'O']
        ];
        moves.forEach(([row, col, token]) => {
            gameBoard.placeToken(row, col, token);
        });
        const winner = gameLogic.checkWinner();
        console.log(`Tie game check: ${winner}`);
        expect(winner).toBe(null);
    });
});
