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

// gameboard object as an IIFE
const gameBoard = (function () {
    // create a 3 x 3 array to be used as a game board
    let board = [
        [Cell(), Cell(), Cell()],
        [Cell(), Cell(), Cell()],
        [Cell(), Cell(), Cell()]
    ];

    const getBoard = () => board;

    const placeToken = (row, column, token) => {
        // Check if the cell is already occupied
        if (board[row][column].getValue() !== 0) {
            console.log("This cell is already occupied. Choose another cell.");
            domController.displayMessage("This cell is already occupied. Choose another cell.");

            // placement failed
            return false;
        }

        // If the cell is empty, place the token
        board[row][column].addToken(token);
        return true;
    }

    const resetBoard = () => {
        board = [
            [Cell(), Cell(), Cell()],
            [Cell(), Cell(), Cell()],
            [Cell(), Cell(), Cell()]
        ];
    };

    const printBoard = () => {
        // Prints the board with the player token values
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))

        console.log(boardWithCellValues);
    }

    return {
        getBoard,
        placeToken,
        printBoard,
        resetBoard,
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
const gameLogic = (function gameController(playerOne = createPlayer("defPlayer1", "X"), playerTwo = createPlayer("CPU", "O")) {

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
    let isGameActive = true;

    const updatePlayerNames = (player1Name, player2Name) => {
        players[0].name = player1Name;
        players[1].name = player2Name;
    };

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const resetGame = () => {
        isGameActive = true;
        activePlayer = players[0];
        gameBoard.resetBoard();
    }

    const printNewRound = () => {
        gameBoard.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }


    const playRound = (row, column) => {

        const board = gameBoard.getBoard();

        // check if the game is over
        if (!isGameActive) {
            console.log("Game is over. Please start a new game.");
            domController.displayMessage("Game is over. Please start a new game.");
            return;
        }

        const validPlacement = gameBoard.placeToken(row, column, getActivePlayer().token);

        const outcome = checkWinner();

        if (outcome === getActivePlayer().token) {
            console.log(`${getActivePlayer().name} wins!`);
            domController.displayMessage(`${getActivePlayer().name} wins!`);
            isGameActive = false;

            return;
        } else if (outcome === null) {
            console.log("It's a tie!");
            domController.displayMessage("It's a tie!");
            isGameActive = false;
        }

        // switch players if a token was able to be placed
        if (validPlacement) {
            switchPlayerTurn();
        }
        else {
            return;
        }

        printNewRound();
    }

    const checkWinner = () => {

        const board = gameBoard.getBoard();

        // if all cells are filled and no winner, return null
        if (board.every(row => row.every(cell => cell.getValue() !== 0))) {
            return null;
        }

        // checks rows
        for (let i = 0; i < 3; i++) {
            const row = board[i];  // gets entire row at index i
            if (row[0].getValue() !== 0 && row.every(cell => cell.getValue() === row[0].getValue())) {
                return row[0].getValue(); // return the winning symbol
            }
        }

        // checks columns
        for (let i = 0; i < 3; i++) {
            const column = board.map(row => row[i]);  // creates array of cells in column i
            if (column[0].getValue() !== 0 && column.every(cell => cell.getValue() === column[0].getValue())) {
                return column[0].getValue();
            }
        }

        // checks forward diagonal (\)
        const forwardDiag = [board[0][0].getValue(), board[1][1].getValue(), board[2][2].getValue()];
        if (forwardDiag[0] !== 0 && forwardDiag.every(value => value === forwardDiag[0])) {
            return forwardDiag[0];
        }

        // checks backward diagonal (/)
        const backwardDiag = [board[0][2].getValue(), board[1][1].getValue(), board[2][0].getValue()];
        if (backwardDiag[0] !== 0 && backwardDiag.every(value => value === backwardDiag[0])) {
            return backwardDiag[0];
        }

    }

    return {
        playRound,
        getActivePlayer,
        getBoard: gameBoard.getBoard,
        checkWinner,
        resetGame,
        updatePlayerNames
    }

})();

function DOMController() {
    // renders contents of the gameboard to the DOM

    const gameContainer = document.querySelector('.game-container');

    const messageContainer = document.querySelector('.message-container');

    // displays messages in the UI
    const displayMessage = (message) => {
        messageContainer.textContent = message;
    };

    const renderBoard = () => {
        // clears the game board
        gameContainer.innerHTML = '';

        const boardElement = document.createElement('div');
        boardElement.classList.add('game-board');

        // initializes the game board from gameBoard function
        const board = gameLogic.getBoard();

        // create a 3x3 grid of cells
        board.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');

                // Render blank space if cell value is 0
                cellElement.textContent = cell.getValue() === 0 ? ' ' : cell.getValue();

                cellElement.addEventListener('click', () => {
                    gameLogic.playRound(rowIndex, columnIndex);
                    renderBoard();
                });
                boardElement.appendChild(cellElement);
            });
        });
        gameContainer.appendChild(boardElement);

    };

    return {
        renderBoard,
        displayMessage,
    }
}

function gameInputs() {
    const startButton = document.querySelector('.start-game');
    const resetButton = document.querySelector('.restart-game');
    let player1Name = '';
    let player2Name = '';

    // Starts the game with Player names on button click
    startButton.addEventListener('click', () => {
        // Get player names from input fields
        const player1Input = document.querySelector('.player1-name');
        const player2Input = document.querySelector('.player2-name');

        player1Name = player1Input.value || 'Player 1'; // Default if empty
        player2Name = player2Input.value || 'Player 2'; // Default if empty

        gameLogic.updatePlayerNames(player1Name, player2Name);

        // Replace input fields with player names
        replaceInputWithName('.player1-container', '.player1-name', player1Name);
        replaceInputWithName('.player2-container', '.player2-name', player2Name);

        // Reset and render the game board
        gameLogic.resetGame();
        DOMController().renderBoard();
    });

    resetButton.addEventListener('click', () => {
        gameLogic.resetGame();
        domController.displayMessage("Game Reset");
        DOMController().renderBoard();
    });

    function replaceInputWithName(containerSelector, inputSelector, playerName) {
        const container = document.querySelector(containerSelector);
        const input = document.querySelector(inputSelector);

        // Create a name display element
        const nameElement = document.createElement('div');
        nameElement.textContent = playerName;
        nameElement.classList.add('player-name-display');

        // Replace the input with the name display
        container.removeChild(input);
        container.appendChild(nameElement);
    }

}

gameInputs();

// used to immediately run the DOMController
const domController = DOMController();
domController.renderBoard();

// necessary for jest testing
module.exports = {
    gameBoard,
    createPlayer,
    gameLogic
};
