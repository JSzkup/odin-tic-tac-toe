function Cell() {
    let value = 0;

    const addToken = (token) => {
        value = token;
    };

    const getValue = () => value;

    return {
        addToken,
        getValue
    };
}

// gameboard object
// *Board for the game - WIll be an IIFE
const gameBoard = (function () {
    // create a 3 x 3 array to be used as a game board
    let board = [
        [Cell(), Cell(), Cell()],
        [Cell(), Cell(), Cell()],
        [Cell(), Cell(), Cell()]
    ];

    const getBoard = () => board;

    const placeToken = (row, column, token) => {
        // Checks every spot on the board for its cell value to check if its available for player input
        const availableCells = board.filter((row) => row.filter((cell) => cell.getValue() === 0).length > 0);

        if (!availableCells) return;

        board[row][column].addToken(token)
    }

    const printBoard = () => {
        // Prints the board with the player token values
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))

        console.log(boardWithCellValues);
    }

    return {
        getBoard,
        placeToken,
        printBoard
    }
})();


// player object
// record player score, increase it - player name
function createPlayer(name, UniqueToken) {
    let score = 0;
    let uniqueToken = UniqueToken;

    const getPlayerName = () => name;

    const getPlayerToken = () => uniqueToken;

    const getScore = () => score;
    const increaseScore = () => score++;

    return {
        getPlayerName,
        getPlayerToken,
        getScore,
        increaseScore,
    }
}


// game object 
// *Game rules are defined and played out
function gameController(playerOne = createPlayer("Jon", "X"), playerTwo = createPlayer("CPU", "O")) {
    const board = gameBoard.getBoard();

    const players = [
        {
            name: playerOne.getPlayerName(),
            token: playerOne.getPlayerToken()
        },
        {
            name: playerTwo.getPlayerName(),
            token: playerTwo.getPlayerToken()
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        gameBoard.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    const playRound = (row, column) => {

        gameBoard.placeToken(row, column, getActivePlayer().token);

        switchPlayerTurn();
        printNewRound();
    }

    return {
        playRound,
        getActivePlayer,
        getBoard: gameBoard.getBoard,
    }

}
// if a space has already been filled in you cant overwrite
