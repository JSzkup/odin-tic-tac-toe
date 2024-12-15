// gameboard object
// *Board for the game - WIll be an IIFE
(function gameBoard() {
    // create a 3 x 3 array to be used as a game board
    let board = [
        [Cell(), Cell(), Cell()],
        [Cell(), Cell(), Cell()],
        [Cell(), Cell(), Cell()]
    ];

    const getBoard = () => board;

    const placeToken = () => {
        // Checks every spot on the board for its cell value to check if its available for player input
        const availableCells = board.filter((row) => row.filter((cell) => cell.getValue() === 0).length > 0)

        if (!availableCells) return;
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

function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addToken,
        getValue
    };
}
// player object
// record player score, increase it - player name
function createPlayer(name, token) {
    let score = 0;
    let token = token;

    const getPlayerName = () => name;

    const getPlayerToken = () => token;

    const getScore = () => score;
    const increaseScore = () => score++;

    return {
        getPlayerName,
        getScore,
        increaseScore,
        getPlayerToken
    }
}


// game object 
// *Game rules are defined and played out
function gameController(playerOne = createPlayer("Jon", "X"), playerTwo = createPlayer("CPU", "O")) {
    const board = gameBoard();

    const players = [
        {
            name: playerOne.getPlayerName,
            token: playerOne.getPlayerToken
        },
        {
            name: playerTwo.getPlayerName,
            token: playerTwo.getPlayerToken
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().getPlayerName}'s turn.`);
    }

    const playRound = () => {
        // TODO print the current players turn to console
        // TODO place X/O in an available space

        switchPlayerTurn();
        printNewRound();
    }

    return {
        getActivePlayer,
        getBoard: board.getBoard,
        // playRound
    }

}
// if a space has already been filled in you cant overwrite
