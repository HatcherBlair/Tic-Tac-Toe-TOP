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
    const setGameArray = (array) => gameArray = array;
    const setGameTile = (i, j) => {
        gameArray[i][j] = playerXTurn ? 'X' : 'O';
        playerXTurn = !playerXTurn;
        const isOver = gameOver();
        if (isOver) gameBoard.displayGameOver(isOver);
    }
    
    // Prints the gameboard in the console
    const printGame = () => console.log(gameArray);

    // Check to see if game is over
    const gameOver = () => {
        // Player X
        // Checking for Top row and Left Column
        if (gameArray[0][0] == 'X') {
            if (gameArray[0][1] == 'X' && gameArray[0][2] == 'X') {
                // Top row win
                setPlayerScore('X');
                return 'X';
            }
            if (gameArray[1][0] == 'X' && gameArray[2][0] == 'X') {
                // Left Column win
                setPlayerScore('X');
                return 'X';
            }
        }
        // Checking for Bottom row and Right column
        if (gameArray[2][2] == 'X') {
            if (gameArray[2][1] == 'X' && gameArray[2][0] == 'X') {
                // Bottom row win
                setPlayerScore('X');
                return 'X';
            }
            if (gameArray[1][2] == 'X' && gameArray[0][2] == 'X') {
                // Right column win
                setPlayerScore('X');
                return 'X';
            }
        }
        // Checking for diagnols and middle row/column
        if (gameArray[1][1] == 'X' ) {
            if (gameArray[1][0] == 'X' && gameArray[1][2] == 'X') {
                // Middle row win
                setPlayerScore('X');
                return 'X';
            } else if (gameArray[0][1] == 'X' && gameArray[2][1] == 'X') {
                // Middle column win
                setPlayerScore('X');
                return 'X';
            } else if (gameArray[0][0] == 'X' && gameArray[2][2] == 'X') {
                // Left diagnol win
                setPlayerScore('X');
                return 'X';
            } else if (gameArray[2][0] == 'X' && gameArray[0][2] == 'X') {
                // Right diagnol win
                setPlayerScore('X');
                return 'X';
            }
        }

        // Player O
        // Checking for Top row and Left Column
        if (gameArray[0][0] == 'O') {
            if (gameArray[0][1] == 'O' && gameArray[0][2] == 'O') {
                // Top row win
                setPlayerScore('O');
                return 'O';
            }
            if (gameArray[1][0] == 'O' && gameArray[2][0] == 'O') {
                // Left Column win
                setPlayerScore('O');
                return 'O';
            }
        } 
        // Checking for Bottom row and Right column
        if (gameArray[2][2] == 'O') {
            if (gameArray[2][1] == 'O' && gameArray[2][0] == 'O') {
                // Bottom row win
                setPlayerScore('O');
                return 'O';
            }
            if (gameArray[1][2] == 'O' && gameArray[0][2] == 'O') {
                // Right column win
                setPlayerScore('O');
                return 'O';
            }
        }
        // Checking for diagnols and middle row/column
        if (gameArray[1][1] == 'O' ) {
            if (gameArray[1][0] == 'O' && gameArray[1][2] == 'O') {
                // Middle row win
                setPlayerScore('O');
                return 'O';
            } else if (gameArray[0][1] == 'O' && gameArray[2][1] == 'O') {
                // Middle column win
                setPlayerScore('O');
                return 'O';
            } else if (gameArray[0][0] == 'O' && gameArray[2][2] == 'O') {
                // Left diagnol win
                setPlayerScore('O');
                return 'O';
            } else if (gameArray[2][0] == 'O' && gameArray[0][2] == 'O') {
                // Right diagnol win
                setPlayerScore('O');
                return 'O';
            }
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

    return { getPlayerScore, getGameArray, setPlayerScore, printGame, gameOver, setGameArray, setGameTile};
})();

// Manages the visuals for the game
const gameBoard = (function ()  {
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
            } else if (gameArray[row][column] == 'O') {
                tile.textContent = 'O';
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
        } else {
            modalTextBox.textContent += 'O!';
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