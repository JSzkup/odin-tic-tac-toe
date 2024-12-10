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

    // TODO function to find available spots in the board
    // TODO players will be an object of name & X/O
    // TODO check if there isnt a 0(Cell.getValue != 0), if there is place the players token (filter & map)

    const printBoard = () => {
        console.log(board);
    }

    return {
        getBoard,
        printBoard
    }
})();

function Cell() {
    let value = 0;

    // TODO needs to work with new player object getPlayerToken
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

    //  TODO should I pass "column" into this?
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
