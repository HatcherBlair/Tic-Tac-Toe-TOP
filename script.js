const gameBoard = (function () {
    // Private vars
    let playerXScore = 0;
    let playerOScore = 0;
    let gameArray = [[], [], []];
    let playerOneTurn = true;

    // Getters
    const getPlayerScore = (player) => player == 'X' ? playerXScore: playerOScore;
    const getGameArray = () => gameArray;

    // Setters
    const setPlayerScore = (player) => player == 'X' ? playerXScore++: playerOScore++;
    const setGameArray = (array) => gameArray = array;
    
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
                return true;
            }
            if (gameArray[1][0] == 'X' && gameArray[2][0] == 'X') {
                // Left Column win
                setPlayerScore('X');
                return true;
            }
        }
        // Checking for Bottom row and Right column
        if (gameArray[2][2] == 'X') {
            if (gameArray[2][1] == 'X' && gameArray[2][0] == 'X') {
                // Bottom row win
                setPlayerScore('X');
                return true;
            }
            if (gameArray[1][2] == 'X' && gameArray[0][2] == 'X') {
                // Right column win
                setPlayerScore('X');
                return true;
            }
        }
        // Checking for diagnols and middle row/column
        if (gameArray[1][1] == 'X' ) {
            if (gameArray[1][0] == 'X' && gameArray[1][2] == 'X') {
                // Middle row win
                setPlayerScore('X');
                return true;
            } else if (gameArray[0][1] == 'X' && gameArray[2][1] == 'X') {
                // Middle column win
                setPlayerScore('X');
                return true;
            } else if (gameArray[0][0] == 'X' && gameArray[2][2] == 'X') {
                // Left diagnol win
                setPlayerScore('X');
                return true;
            } else if (gameArray[2][0] == 'X' && gameArray[0][2] == 'X') {
                // Right diagnol win
                setPlayerScore('X');
                return true;
            }
        }

        // Player O
        // Checking for Top row and Left Column
        if (gameArray[0][0] == 'O') {
            if (gameArray[0][1] == 'O' && gameArray[0][2] == 'O') {
                // Top row win
                setPlayerScore('O');
                return true;
            }
            if (gameArray[1][0] == 'O' && gameArray[2][0] == 'O') {
                // Left Column win
                setPlayerScore('O');
                return true;
            }
        } 
        // Checking for Bottom row and Right column
        if (gameArray[2][2] == 'O') {
            if (gameArray[2][1] == 'O' && gameArray[2][0] == 'O') {
                // Bottom row win
                setPlayerScore('O');
                return true;
            }
            if (gameArray[1][2] == 'O' && gameArray[0][2] == 'O') {
                // Right column win
                setPlayerScore('O');
                return true;
            }
        }
        // Checking for diagnols and middle row/column
        if (gameArray[1][1] == 'O' ) {
            if (gameArray[1][0] == 'O' && gameArray[1][2] == 'O') {
                // Middle row win
                setPlayerScore('O');
                return true;
            } else if (gameArray[0][1] == 'O' && gameArray[2][1] == 'O') {
                // Middle column win
                setPlayerScore('O');
                return true;
            } else if (gameArray[0][0] == 'O' && gameArray[2][2] == 'O') {
                // Left diagnol win
                setPlayerScore('O');
                return true;
            } else if (gameArray[2][0] == 'O' && gameArray[0][2] == 'O') {
                // Right diagnol win
                setPlayerScore('O');
                return true;
            }
        }

        // Game not over
        return false;
    };

    return { getPlayerScore, getGameArray, setPlayerScore, printGame, gameOver, setGameArray};
})();