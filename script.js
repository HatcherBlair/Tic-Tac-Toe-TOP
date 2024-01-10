// Contains the logic and scores for the game
const game = (function () {
    // Private vars
    let playerXScore = 0;
    let playerOScore = 0;
    let gameArray = [[], [], []];
    let playerXTurn = true;

    // Getters
    const getPlayerScore = (player) => player == 'X' ? playerXScore: playerOScore;
    const getGameArray = () => gameArray;

    // Setters
    const setPlayerScore = (player) => player == 'X' ? playerXScore++: playerOScore++;
    const resetScores = () => {
        playerXScore = 0;
        playerOScore = 0;
    }
    const setPlayerTurn = (player) => playerXTurn = player;
    const setGameArray = (array) => gameArray = array;
    const setGameTile = (i, j) => {
        gameArray[i][j] = playerXTurn ? 'X' : 'O';
        playerXTurn = !playerXTurn;
        const isOver = gameOver();
        if (isOver == 'X') setPlayerScore('X');
        else if (isOver == 'O') setPlayerScore('O');
        if (isOver) gameBoard.displayGameOver(isOver);
    }
    
    // Prints the gameboard in the console (No longer used)
    const printGame = () => console.log(gameArray);

    // Check to see if game is over
    const gameOver = () => {
        // Player X
        // Checking for Top row and Left Column
        if (gameArray[0][0] == 'X') {
            if (gameArray[0][1] == 'X' && gameArray[0][2] == 'X') return 'X'; // Top row win
            if (gameArray[1][0] == 'X' && gameArray[2][0] == 'X') return 'X'; // Left Column win
        }
        // Checking for Bottom row and Right column
        if (gameArray[2][2] == 'X') {
            if (gameArray[2][1] == 'X' && gameArray[2][0] == 'X') return 'X'; // Bottom row win
            if (gameArray[1][2] == 'X' && gameArray[0][2] == 'X') return 'X'; // Right column win
        }
        // Checking for diagnols and middle row/column
        if (gameArray[1][1] == 'X' ) {
            if (gameArray[1][0] == 'X' && gameArray[1][2] == 'X')       return 'X'; // Middle row win
             else if (gameArray[0][1] == 'X' && gameArray[2][1] == 'X') return 'X'; // Middle column win
             else if (gameArray[0][0] == 'X' && gameArray[2][2] == 'X') return 'X'; // Left diagnol win
             else if (gameArray[2][0] == 'X' && gameArray[0][2] == 'X') return 'X'; // Right diagnol win
        }

        // Player O
        // Checking for Top row and Left Column
        if (gameArray[0][0] == 'O') {
            if (gameArray[0][1] == 'O' && gameArray[0][2] == 'O') return 'O'; // Top row win
            if (gameArray[1][0] == 'O' && gameArray[2][0] == 'O') return 'O'; // Left Column win
        } 
        // Checking for Bottom row and Right column
        if (gameArray[2][2] == 'O') {
            if (gameArray[2][1] == 'O' && gameArray[2][0] == 'O') return 'O'; // Bottom row win
            if (gameArray[1][2] == 'O' && gameArray[0][2] == 'O') return 'O'; // Right column win
        }
        // Checking for diagnols and middle row/column
        if (gameArray[1][1] == 'O' ) {
            if (gameArray[1][0] == 'O' && gameArray[1][2] == 'O')       return 'O'; // Middle row win
             else if (gameArray[0][1] == 'O' && gameArray[2][1] == 'O') return 'O'; // Middle column win
             else if (gameArray[0][0] == 'O' && gameArray[2][2] == 'O') return 'O'; // Left diagnol win
             else if (gameArray[2][0] == 'O' && gameArray[0][2] == 'O') return 'O'; // Right diagnol win
        }

        // Check for draw
        // I'm sure there is a better way to do this
        let drawTest = 0;
        for (let i=0; i < 3; i++) {
            for (let j=0; j < 3; j++) {
                if (gameArray[i][j]) drawTest++;
            }
        }
        if (drawTest == 9) return 'draw';

        // Game not over
        return false;
    };

    return { getPlayerScore, getGameArray, setPlayerScore, gameOver, 
            setGameArray, setGameTile, setPlayerTurn, resetScores};
})();

// Manages the visuals for the game
const gameBoard = (function ()  {

    // Text Color for X and O
    const oColor = '#f66';
    const xColor = '#69c';

    // Score display DOM elements
    const playerXScoreDOM = document.getElementById("player-x");
    const playerOScoreDOM = document.getElementById("player-o");
    const scoreDOMLength = 16;

    // Reset game eventListener
    const resetGameBtn = document.querySelector('.reset-game-btn');
    resetGameBtn.addEventListener('click', () => {
        newBoard();
        // True for X, false for O
        // Always setting X as first player
        game.setPlayerTurn(true);
    });

    // Reset session eventListener
    const resetSessionBtn = document.querySelector('.reset-session-btn');
    resetSessionBtn.addEventListener('click', () => {
        newBoard();
        game.resetScores();
        game.setPlayerTurn(true);
        playerXScoreDOM.textContent = 'Player X Score: 0';
        playerOScoreDOM.textContent = 'Player O Score: 0';
    })

    // Creates the board visual
    const newBoard = () => {
        game.setGameArray([[], [], []]);
        const boardContainer = document.querySelector('.game-board');
        boardContainer.innerHTML = "";
        for (let i=0; i < 9; i++) {
            const boardSquare = document.createElement('div');
            boardSquare.classList.add('game-tile');
            boardSquare.addEventListener('click', () => {
                if (!boardSquare.textContent) {
                    const column = i % 3;
                    const row = Math.floor(i/3);
                    game.setGameTile(row, column);
                    updateBoard();
                }
            });

            boardContainer.appendChild(boardSquare);
        };
    };

    // Updates the board Visual
    const updateBoard = () => {
        const boardTiles = document.querySelectorAll('.game-tile');
        const gameArray = game.getGameArray();
        boardTiles.forEach((tile, i) => {
            const column = i % 3;
            const row = Math.floor(i/3);
            if (gameArray[row][column] == 'X') {
                tile.textContent = 'X';
                tile.style.color = xColor;
            } else if (gameArray[row][column] == 'O') {
                tile.textContent = 'O';
                tile.style.color = oColor;
            }
        })
    }

    // Displays the game over screen
    const displayGameOver = (winner) => {
        // Create the modal container and add it to the body
        const docBody = document.querySelector('body');
        const gameOverContainer = document.createElement('div');
        gameOverContainer.classList.add('modal-ctnr');
        docBody.appendChild(gameOverContainer);

        // Modal body
        const gameOverBody = document.createElement('div');
        gameOverBody.classList.add('modal-body');
        gameOverContainer.appendChild(gameOverBody);

        // Modal text
        const modalTextBox = document.createElement('p');
        modalTextBox.classList.add('modal-text');   
        modalTextBox.textContent = 'The winner is ';
        if (winner == 'draw') {
            modalTextBox.textContent = 'Draw! Nobody wins :(';
        } else if (winner == 'X') {
             modalTextBox.textContent += 'X!';
             // Update scoreboard visual here so we don't need to check winner twice
             playerXScoreDOM.textContent = playerXScoreDOM.textContent.slice(0, scoreDOMLength) 
                                            + game.getPlayerScore('X');
        } else {
            modalTextBox.textContent += 'O!';
            // Update scoreboard visual here so we don't need to check winner twice
            playerOScoreDOM.textContent = playerOScoreDOM.textContent.slice(0, scoreDOMLength)
                                            + game.getPlayerScore('O');
        }        
        gameOverBody.appendChild(modalTextBox);

        // Modal close btn
        const modalCloseBtn = document.createElement('button');
        modalCloseBtn.classList.add('close-btn');
        modalCloseBtn.textContent = 'X';
        gameOverBody.appendChild(modalCloseBtn);
        modalCloseBtn.addEventListener('click', () => gameOverContainer.remove());

        // Modal reset btn
        const modalResetBtn = document.createElement('button');
        modalResetBtn.classList.add('reset-btn');
        modalResetBtn.textContent = 'New Game?';
        gameOverBody.appendChild(modalResetBtn);
        modalResetBtn.addEventListener('click', () => {
            newBoard();
            gameOverContainer.remove();
        });

        
    }

    return {newBoard, displayGameOver};
})();

gameBoard.newBoard();