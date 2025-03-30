
let solution = [];

function generateSudoku() {
  const board = document.getElementById("sudoku-board");
  board.innerHTML = "";
  solution = generateRandomSudoku();

  for (let i = 0; i < 9; i++) {
    const row = board.insertRow();
    for (let j = 0; j < 9; j++) {
      const cell = row.insertCell();
      const input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("maxlength", 1);

      const value = solution.puzzle[i][j];
      if (value !== 0) {
        input.value = value;
        input.disabled = true;
      } else {
        input.addEventListener("input", () => validateInput(input, i, j));
      }

      cell.appendChild(input);
    }
  }
}

function validateInput(input, row, col) {
  input.classList.remove("error");
  const val = parseInt(input.value);
  if (isNaN(val) || val < 1 || val > 9 || val !== solution.solution[row][col]) {
    input.classList.add("error");
  }
}

function checkSudoku() {
  const board = document.querySelectorAll("table input");
  board.forEach(input => {
    if (!input.disabled) input.dispatchEvent(new Event('input'));
  });
}

function revealSolution() {
  const board = document.querySelectorAll("table input");
  board.forEach((input, idx) => {
    const row = Math.floor(idx / 9);
    const col = idx % 9;
    input.value = solution.solution[row][col];
    input.classList.remove("error");
    input.disabled = true;
  });
}

function generateRandomSudoku() {
  const base = [1,2,3,4,5,6,7,8,9];
  const shuffle = (array) => array.sort(() => Math.random() - 0.5);
  const rowBase = shuffle([...base]);
  const solution = Array.from({length: 9}, (_, i) =>
    rowBase.map((_, j) => rowBase[(j + i * 3 + Math.floor(i/3)) % 9])
  );
  const puzzle = solution.map(row =>
    row.map(cell => (Math.random() < 0.5 ? cell : 0))
  );
  return { puzzle, solution };
}

window.onload = generateSudoku;
