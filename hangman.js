let wordList = [
    "Web Technology", 
    "Computer Hardware Fundamentals", 
    "Programming Logic and Designs", 
    "Calculus", 
    "Chemistry for Engineers"
];

let selectedWord = "";
let displayedWord = [];
let lives = 11;  
let guessedLetters = [];
let hangmanImages = [
    "images/hangman0.jpg", 
    "images/hangman1.jpg", 
    "images/hangman2.jpg",
    "images/hangman3.jpg", 
    "images/hangman4.jpg", 
    "images/hangman5.jpg", 
    "images/hangman6.jpg",
    "images/hangman7.jpg", 
    "images/hangman8.jpg", 
    "images/hangman9.jpg", 
    "images/hangman10.jpg" 
];

const wordDisplay = document.getElementById("word-display");
const livesDisplay = document.getElementById("lives-display");
const letterInput = document.getElementById("letter-input");
const hangmanImage = document.getElementById("hangman-img");

function startNewGame() {
    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
    displayedWord = Array(selectedWord.length).fill("_"); 
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === " ") {
            displayedWord[i] = " "; 
        }
    }
    lives = 11; 
    guessedLetters = []; 
    updateDisplay();  
    hangmanImage.src = hangmanImages[0]; 

    
    document.getElementById("win-modal").style.display = "none";
    document.getElementById("lose-modal").style.display = "none";
}

function updateDisplay() {
    wordDisplay.textContent = displayedWord.join(" "); 
    livesDisplay.textContent = "Lives: " + lives;  
}

function showWinModal() {
    const winModal = document.getElementById("win-modal");
    winModal.style.display = "flex"; 
}

function showLoseModal() {
    const loseModal = document.getElementById("lose-modal");
    const loseWordDisplay = document.getElementById("lose-word");
    loseWordDisplay.textContent = selectedWord; 
    loseModal.style.display = "flex";
}

function guessLetter() {
    const guessedLetter = letterInput.value.toLowerCase();  
    letterInput.value = "";

    if (!guessedLetter || guessedLetters.includes(guessedLetter) || guessedLetter === " ") {
        return; 
    }

    guessedLetters.push(guessedLetter);  

    let correctGuess = false;

    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i].toLowerCase() === guessedLetter && displayedWord[i] === "_") {
            displayedWord[i] = selectedWord[i]; 
            correctGuess = true;
        }
    }

    if (!correctGuess) {
        lives--;
        hangmanImage.src = hangmanImages[11 - lives];  

        if (lives === 0) {
            showLoseModal(); 
            return;
        }
    }

    updateDisplay();  

    if (!displayedWord.includes("_")) {
        showWinModal(); 
    }
}

window.onclick = function(event) {
    const winModal = document.getElementById("win-modal");
    const loseModal = document.getElementById("lose-modal");
    if (event.target === winModal || event.target === loseModal) {
        winModal.style.display = "none";
        loseModal.style.display = "none";
    }
}

startNewGame();
