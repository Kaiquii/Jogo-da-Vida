const numRows = 10;
const numCols = 10;
let board = createEmptyBoard();
let intervalId = null;
let darkMode = false;

// Cria um tabuleiro vazio
function createEmptyBoard() {
  const board = [];
  for (let i = 0; i < numRows; i++) {
    board[i] = [];
    for (let j = 0; j < numCols; j++) {
      board[i][j] = false;
    }
  }
  return board;
}

// Alterna o estado de uma célula
function toggleCell(row, col) {
  board[row][col] = !board[row][col];
  renderBoard();
}

// Calcula a próxima geração do Jogo da Vida
function nextGeneration() {
  const newBoard = createEmptyBoard();

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const cell = board[i][j];
      const liveNeighbors = getLiveNeighbors(i, j);

      if (cell && (liveNeighbors === 2 || liveNeighbors === 3)) {
        newBoard[i][j] = true;
      } else if (!cell && liveNeighbors === 3) {
        newBoard[i][j] = true;
      }
    }
  }

  board = newBoard;
  renderBoard();
}

// Conta o número de vizinhos vivos de uma célula
function getLiveNeighbors(row, col) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const neighborRow = row + i;
      const neighborCol = col + j;
      if (
        neighborRow >= 0 &&
        neighborRow < numRows &&
        neighborCol >= 0 &&
        neighborCol < numCols
      ) {
        if (board[neighborRow][neighborCol]) {
          count++;
        }
      }
    }
  }
  return count;
}

// Renderiza o tabuleiro no HTML
function renderBoard() {
  const boardContainer = document.getElementById("board");
  boardContainer.innerHTML = "";

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      if (board[i][j]) {
        cell.classList.add("alive");
      }
      cell.addEventListener("click", () => toggleCell(i, j));
      boardContainer.appendChild(cell);
    }
  }
}

// Inicia o jogo
function startGame() {
  intervalId = setInterval(() => {
    nextGeneration();
  }, 1000);
}

// Para o jogo
function stopGame() {
  clearInterval(intervalId);
}

// Alterna entre o modo claro e o modo escuro
function toggleMode() {
  const body = document.body;
  darkMode = !darkMode;

  if (darkMode) {
    body.classList.add("dark-mode");
    document.getElementById("toggleModeBtn").textContent = "Modo Claro";
  } else {
    body.classList.remove("dark-mode");
    document.getElementById("toggleModeBtn").textContent = "Modo Escuro";
  }
}

// Event listeners dos botões
document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("stopBtn").addEventListener("click", stopGame);
document.getElementById("toggleModeBtn").addEventListener("click", toggleMode);

// Renderiza o tabuleiro inicial
renderBoard();