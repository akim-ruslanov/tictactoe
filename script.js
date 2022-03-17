var Board = (function() {
    var board = [];

    (function() {
        for (let i = 0; i < 3; i++) {
            let row = []
            for (let j = 0; j < 3; j++) {
                row.push(null)
            }
            board.push(row);
        }
    })()

    const printBoard = () => {
        console.log(JSON.stringify(board));
    }

    const editBoard = (row, col, sign) => {
        board[row][col] = sign;
        // can check for winner here for efficiancy
    }

    const allowedMove = (row, col) => {
        return board[row][col] === null;
    }

    const checkWinner = () => {
        // check every row
        for (let i = 0; i < 3; i++) {
            const firstSign = board[i][0];
            if (!firstSign) continue;
            var won = true;
            for (let j = 0; j < 3; j++) {
                if (firstSign !== board[i][j]) {
                    won = false;
                    break;
                }
            }
            if (won) {
                return {
                    winner: firstSign
                }
            }
        }
        // check every col
        for (let j = 0; j < 3; j++) {
            const firstSign = board[0][j];
            if (!firstSign) continue;
            var won = true;
            for (let i = 0; i < 3; i++) {
                if (firstSign !== board[i][j]) {
                    won = false;
                    break;
                }
            }
            if (won) {
                return {
                    winner: firstSign
                }
            }
        }
        // check diagonals 1
        let firstSign = board[0][0];
        if (firstSign) {
            var won = true;
            for (let i = 0; i < 3; i++) {
                if (firstSign !== board[i][i]) {
                    won = false;
                    break;
                }
            }
            if (won) {
                return {
                    winner: firstSign
                }
            }
        }
        // check diagonals 2
        firstSign = board[0][2];
        if (firstSign) {
            var won = true;
            for (let i = 0; i < 3; i++) {
                if (firstSign !== board[i][2-i]) {
                    won = false;
                    break;
                }
            }
            if (won) {
                return {
                    winner: firstSign
                }
            }
        }

        return {
            winner: null
        }
    }

    const resetBoard = () => {
        board = []
        for (let i = 0; i < 3; i++) {
            let row = []
            for (let j = 0; j < 3; j++) {
                row.push(null)
            }
            board.push(row);
        }
    }

    

    return {
        printBoard, editBoard, checkWinner, resetBoard, allowedMove
    }
})();

var Player = (sign) => {
    var sign = sign;
    var score = 0;

    const printSign = () => console.log(sign)
    
    const move = (event) => {
        // do something with event
        // use board
        console.log("Player is doing a move")
    }

    const upScore = () => {
        score += 1
    }

    const getScore = () => {
        return score;
    }



    return {
        printSign, upScore, getScore
    }
};


var Game = (function() {
    const player1 = Player("X");
    const player2 = Player("O");

    let player1Turn = true;
    let game = true;

    const updateScore = () => {
        $("#player1Score").text(`Player 1: ${player1.getScore()}`)
        $("#player2Score").text(`Player 2: ${player2.getScore()}`)
    }

    const changeTurnIndicator = () => {
        $("#turnIndicator").text(`Player ${player1Turn ? "1" : "2"} turn`)
    }

    const move = (event) => {
        if (game) {
            let element = event.srcElement;
            let {col, row} = JSON.parse(element.id);
            if (Board.allowedMove(row, col)) {
                $(element).text(player1Turn ? "X" : "O")
                Board.editBoard(row, col, player1Turn ? "X" : "O");
                player1Turn = !player1Turn;
                changeTurnIndicator();
                let {winner} = Board.checkWinner();
                if (winner) {
                    alert(`Player: ${winner} won`);
                    if (winner === "X") {
                        player1.upScore()
                    } else {
                        player2.upScore()
                    }
                    updateScore();
                    game=false;
                }
            } else {
                alert("Cannot move there");
            }
        } else {
            alert("Game is over. Reset board to continue")
        }
    }

    const resetBoard = (event) => {
        Board.resetBoard();
        var cells = document.getElementsByTagName("td");
        for (let i = 0; i<9; i++) {
            $(cells[i]).text("")
        }
        changeTurnIndicator();
        player1Turn = true;
        game = true;
    }


    window.onload = function() {
        var cells = document.getElementsByTagName("td");
        var counter = 0;
        for (let i = 0; i<3; i++) {
            for (let j = 0; j<3; j++) {
                let id = `{"row":${i}, "col":${j}}`
                cells[counter].id = id;
                cells[counter].addEventListener("click", move)
                counter += 1
            }
        }

        var button = $("button")[0]
        button.addEventListener("click", resetBoard)
    }

})();



// Board.printBoard()
// Board.editBoard(0,2, "X")
// Board.editBoard(1,1, "X")
// Board.editBoard(2,0, "X")
// const result = Board.checkWinner()
// console.log(result)
// Board.printBoard()
// const player1 = Player("O");
// player1.printSign()