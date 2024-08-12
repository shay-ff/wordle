
//const wordList = ["apple", "brave", "crate", "dwell", "eagle", "flame", "grape", "hound", "inlet", "jumbo"];
// const word = wordList[Math.floor(Math.random() * wordList.length)];
let word;
let attempts = 0;
const baseUrl = "http://localhost:3000"; 
async function loadWords(){
    try {
        const response = await fetch(`${baseUrl}/random-word`);
        res = await response.json();
        word = res?.word;
        // word = wordList[Math.floor(Math.random() * wordList.length)];
    } catch (error) {
        console.error("Error fetching words:", error);
    }
}

function createGrid() {
    const grid = document.getElementById("grid");
    for (let i = 0; i < 5 * 5; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = `cell-${i}`;
        grid.appendChild(cell);
    }
}

const checkWordInList = async (guess) => {
    try {
        const response = await fetch(`${baseUrl}/check-word?input=${guess}`);
        res = await response.json();
        return res.isValid;
    } catch (error) {
        console.log("Check word err: ",error);
    }
}

async function makeGuess() {
    const guessInput = document.getElementById("guessInput");
    const guess = guessInput.value.toLowerCase();

    if (guess.length !== 5) {
        document.getElementById("message").textContent = "Please enter a 5-letter word.";
        return;
    }

    if(!(await checkWordInList(guess))){
        document.getElementById("message").textContent = "Word not in the list. Please try again.";
        return;
    }

    document.getElementById("message").textContent = "";
    guessInput.value = "";

    for (let i = 0; i < 5; i++) {
        const cell = document.getElementById(`cell-${attempts * 5 + i}`);
        cell.textContent = guess[i];

        if (guess[i] === word[i]) {
            cell.classList.add("correct");
        } else if (word.includes(guess[i])) {
            cell.classList.add("present");
        } else {
            cell.classList.add("absent");
        }
    }

    attempts++;
    if (guess === word) {
        document.getElementById("message").textContent = `Congratulations! You guessed the word: ${word}`;
        document.getElementById("guessInput").disabled = true;
    } else if (attempts === 6) {
        document.getElementById("message").textContent = `Sorry, you've run out of attempts. The word was: ${word}`;
        document.getElementById("guessInput").disabled = true;
    }
}
document.getElementById("guessInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        makeGuess();
    }
});
createGrid();
loadWords();