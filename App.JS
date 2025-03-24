let boxes = document.querySelectorAll(".box")
let resetbtn = document.querySelector("#reset-btn")
let msg = document.querySelector("#msg")
let newGameBtn = document.querySelector("#new-Btn")
let msgContainer = document.querySelector(".msgContainer")

let turnO = true   // Player X,Y

const winning_patterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]

// 
const resetGame = () => {
    turnO = true
    count=0           //Reset count to 0
    enableBoxes()    // Calling enable boxes
    msgContainer.classList.add("hide")  // hide the container value like("o","x";) when game is reset
}


let count=0
boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (turnO) {
        //playerO
        box.innerText = "O";
        turnO = false;
      } else {
        //playerX
        box.innerText = "X";
        turnO = true;
      }
      box.disabled = true;
      count++;
  
      let isWinner = check_winner();
  
      if (count === 9 && !isWinner) {
        gameDraw();
      }
    });
  });
  
  const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
  };


// Creatind Function to disable the button
const disabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true
    }
}

// Creating Enable Boxes

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;  //   `box.enable = false;`
        box.innerText = "";
    }
}

// Creating Function
let showWinner = (winner) => {
    
    msg.innerText = `Congratulations, Winner is ${winner}`
    msgContainer.classList.remove("hide")
    disabledBoxes() // Calling Function and disable of button
}




const check_winner = () => {
    for (pattern of winning_patterns) {

        let position1 = boxes[pattern[0]].innerText
        let position2 = boxes[pattern[1]].innerText
        let position3 = boxes[pattern[2]].innerText

        if (position1 != "" && position2 != "" && position3 != "") {
            if (position1 === position2 && position2 === position3) {

                showWinner(position1)   // Function call by passing position 1 value
                return true
            }
        }
    }
    return false     //Return false if no winner is found

}


newGameBtn.addEventListener("click", resetGame)
resetbtn.addEventListener("click", resetGame)

