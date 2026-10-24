let boxes = document.querySelectorAll(".box");
let resetBtn = document.getElementById("reset-btn");

let turn0 = true;
let board = Array(9).fill("");
let gameOver = false;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function resetBoard() {
    boxes.forEach((box) => {
        box.textContent = "";
        box.disabled = false;
        box.classList.remove("winner");
    });
    board = Array(9).fill("");
    turn0 = true;
    gameOver = false;
}

function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

function endGame(winner) {
    gameOver = true;
    alert(`${winner} jeet gaya!`);

    boxes.forEach((box, index) => {
        if (board[index] === winner) {
            box.classList.add("winner");
        }
    });
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (gameOver || board[index] !== "") return;

        const currentMark = turn0 ? "X" : "O";
        board[index] = currentMark;
        box.textContent = currentMark;
        box.disabled = true;

        const winner = checkWinner();
        if (winner) {
            endGame(winner);
            return;
        }

        if (board.every((cell) => cell !== "")) {
            gameOver = true;
            alert("Draw ho gaya!");
            return;
        }

        turn0 = !turn0;
    });
});

resetBtn.addEventListener("click", resetBoard);