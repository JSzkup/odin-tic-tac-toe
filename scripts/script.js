// gameboard object
// *Board for the game - WIll be an IIFE

(function gameBoard() {
    // create a 3 x 3 array to be used as a game board
    let board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    const getBoard = () => board;

    return {
        getBoard
    }
})();


// game object 
// *Game rules are defined and played out

// player object
// #record player score, increase it - player name
function createPlayer(name) {
    let score = 0;

    const getScore = () => score;
    const increaseScore = () => score++;

    return {
        name,
        getScore,
        increaseScore
    }
}