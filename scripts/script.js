// gameboard object
// *Board for the game - WIll be an IIFE
(function gameBoard() {
    // create a 3 x 3 array to be used as a game board
    // TODO should i fill these with objects so that I can assign a player to each move
    let board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    const getBoard = () => board;

    // TODO function to find available spots in the board

    const printBoard = () => {
        console.log(board);
    }

    return {
        getBoard,
        printBoard
    }
})();


// game object 
// *Game rules are defined and played out
function gameController(playerOneName = "Jon", playerTwoName = "CPU") {
    const board = gameBoard();

    const players = [
        createPlayer(playerOneName),
        createPlayer(playerTwoName)
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

}
// if a space has already been filled in you cant overwrite

// player object
// #record player score, increase it - player name
function createPlayer(name) {
    let score = 0;

    const getPlayerName = () => name;

    // TODO instead of tracking just score I need to track if a player is an X or an O
    const getScore = () => score;
    const increaseScore = () => score++;

    return {
        getPlayerName,
        getScore,
        increaseScore
    }
}