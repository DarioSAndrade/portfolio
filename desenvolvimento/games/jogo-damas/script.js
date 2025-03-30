
let board = document.getElementById("board");
let blackCount = 12;
let whiteCount = 12;
let selectedPiece = null;

function createBoard() {
    board.innerHTML = "";
    for (let i = 0; i < 64; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        let row = Math.floor(i / 8);
        let col = i % 8;
        cell.dataset.row = row;
        cell.dataset.col = col;
        if ((row + col) % 2 === 0) {
            cell.classList.add("white");
        } else {
            cell.classList.add("black");
            if (row < 3) {
                let piece = document.createElement("div");
                piece.classList.add("piece", "black");
                piece.draggable = true;
                piece.addEventListener("dragstart", dragStart);
                cell.appendChild(piece);
            } else if (row > 4) {
                let piece = document.createElement("div");
                piece.classList.add("piece", "white");
                piece.draggable = true;
                piece.addEventListener("dragstart", dragStart);
                cell.appendChild(piece);
            }
        }
        cell.addEventListener("dragover", dragOver);
        cell.addEventListener("drop", drop);
        board.appendChild(cell);
    }
    updateCount();
}

function dragStart(e) {
    selectedPiece = e.target;
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    if (!selectedPiece) return;
    const fromCell = selectedPiece.parentElement;
    const toCell = e.target.classList.contains("cell") ? e.target : e.target.parentElement;

    if (!toCell.classList.contains("black") || toCell.children.length > 0) return;

    const fromRow = parseInt(fromCell.dataset.row);
    const fromCol = parseInt(fromCell.dataset.col);
    const toRow = parseInt(toCell.dataset.row);
    const toCol = parseInt(toCell.dataset.col);

    const dx = toCol - fromCol;
    const dy = toRow - fromRow;

    if (Math.abs(dx) === 2 && Math.abs(dy) === 2) {
        const midRow = (fromRow + toRow) / 2;
        const midCol = (fromCol + toCol) / 2;
        const middleCell = getCell(midRow, midCol);
        const capturedPiece = middleCell?.querySelector(".piece");

        if (capturedPiece && capturedPiece.classList.contains(getOppositeColor(selectedPiece))) {
            middleCell.innerHTML = "";
            updateScore(getOppositeColor(selectedPiece));
        } else {
            return;
        }
    } else if (Math.abs(dx) !== 1 || Math.abs(dy) !== 1) {
        return;
    }

    toCell.appendChild(selectedPiece);
    checkWin();
}

function getOppositeColor(piece) {
    return piece.classList.contains("white") ? "black" : "white";
}

function updateScore(color) {
    if (color === "white") {
        whiteCount--;
    } else {
        blackCount--;
    }
    updateCount();
}

function updateCount() {
    document.getElementById("black-count").textContent = blackCount;
    document.getElementById("white-count").textContent = whiteCount;
}

function getCell(row, col) {
    return board.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
}

function checkWin() {
    if (blackCount === 0) {
        document.getElementById("winner-message").textContent = "Vitória das Peças Brancas!";
    } else if (whiteCount === 0) {
        document.getElementById("winner-message").textContent = "Vitória das Peças Pretas!";
    }
}

function startNewGame() {
    blackCount = 12;
    whiteCount = 12;
    document.getElementById("winner-message").textContent = "";
    createBoard();
}

createBoard();
