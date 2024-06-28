const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer; // 0 or * zero or kata
let gameGrid;

const winningPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// let create a function to initialise the game
function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  newGameBtn.classList.remove("active");
  // Ui par update karna padega
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    // initializing box with css properties agian kyo jitne par green color ja nhi rha hai
    box.classList = `box box${index + 1}`;
  });
  newGameBtn.classList.remove("active");

  gameInfo.innerText = `Current Player 👩‍🦱- ${currentPlayer}`;
}

initGame();

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

function swapTurn() {
  if (currentPlayer == "X") {
    currentPlayer = "0";
  } else {
    currentPlayer = "X";
  }
  //Ui update
  gameInfo.innerText = `Current Player 🧒-${currentPlayer}`;
}

function checkGameOver() {
  // ToDo
  let answer = "";
  winningPosition.forEach((position) => {
    //all 3 boxes should be non-empty and exaxtly same value
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      //check if winner is X
      if (gameGrid[position[0]] === "X") answer = "X";
      else answer = "0";

      // disable pointer events
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      // now we know X/0 is winner
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  // if means we have a winner
  if (answer !== "") {
    gameInfo.innerText = `winner Player🎉🎉🎊 - ${answer}`;
    newGameBtn.classList.add("active");
    return;
  }

  // when there is no winner tie
  let fillcount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") fillcount++;
  });

  if (fillcount === 9) {
    gameInfo.innerText = "Game Tied 😒 ! ";
    newGameBtn.classList.add("active");
  }
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    // jab empty hoga tab click hoga
    boxes[index].innerText = currentPlayer; // ye Ui par update karega
    gameGrid[index] = currentPlayer; // ye line jo hamne gameGrid banaya hai waha change karegi   status check kar rhe hai

    boxes[index].style.pointerEvents = "none"; // jo ckick ho gya hai o arrow banjayega usme cursor pointer nhi show hoga
    //swap karo turn ko
    swapTurn();

    // check koe jeet to nhi gya
    checkGameOver();
  }
}

newGameBtn.addEventListener("click", initGame);
