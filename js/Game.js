/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

// this class represents the game and provides methods to manage the game state and user interactions
class Game {
    constructor() {
        this.missed = 0;

        // phrases only contain letters and spaces
        this.phrases = [
            new Phrase('Knowledge is power'),
            new Phrase('You only live once'),
            new Phrase('Time is money'),
            new Phrase('Break the ice'),
            new Phrase('Piece of cake')
        ];

        this.activePhrase = null;
    }

    // starts the game by hiding the overlay, selecting a random phrase, and displaying it on the screen
    startGame() {
        const overlay = document.getElementById('overlay');
        const phraseDiv = document.querySelector('#phrase ul');
        const keys = document.querySelectorAll('#qwerty .key');
        const hearts = document.querySelectorAll('#scoreboard img');
        const message = document.getElementById('game-over-message');

        // clear the previous phrase from the board
        phraseDiv.innerHTML = '';

        // re-enable the keyboard and remove the chosen/wrong styles
        keys.forEach(key => {
            key.disabled = false;
            key.classList.remove('chosen', 'wrong');
        });

        // reset the hearts to full
        hearts.forEach(heart => {
            heart.src = 'images/liveHeart.png';
        });

        // reset the game state
        this.missed = 0;
        message.textContent = '';
        overlay.classList.remove('start', 'win', 'lose');

        // hide the overlay so the board is visible
        overlay.style.display = 'none';

        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    // selects a random phrase from the phrases array
    getRandomPhrase() {
        const randomIndex = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randomIndex];
    }

    // handles the player's interaction with the on-screen keyboard
    handleInteraction(button) {
        if (button.disabled || this.activePhrase === null) {
            return;
        }

        // get the letter from the button and convert it to lowercase
        const letter = button.textContent.toLowerCase();

        button.disabled = true;

        // check if the letter is in the active phrase
        if (this.activePhrase.checkLetter(letter)) {
            button.classList.add('chosen');
            this.activePhrase.showMatchedLetter(letter);

            if (this.checkForWin()) {
                this.gameOver(true);
            }
        } else {
            button.classList.add('wrong');
            this.removeLife();
        }
    }

    // removes a life from the scoreboard and checks if the game is over
    removeLife() {
        const hearts = document.querySelectorAll('#scoreboard img');

        // change the next heart to a lost heart and increment the missed counter
        if (this.missed < hearts.length) {
            hearts[this.missed].src = 'images/lostHeart.png';
            this.missed++;
        }

        // if the player has missed 5 times, end the game with a loss
        if (this.missed === 5) {
            this.gameOver(false);
        }
    }

    // checks if the player has won the game by checking if there are any hidden letters left
    checkForWin() {
        const hiddenLetters = document.querySelectorAll('#phrase .hide');
        return hiddenLetters.length === 0;
    }

    // ends the game and displays the game over message
    gameOver(gameWon) {
        const overlay = document.getElementById('overlay');
        const message = document.getElementById('game-over-message');
        const keys = document.querySelectorAll('#qwerty .key');

        // show the overlay again with the win or lose message
        if (gameWon) {
            overlay.className = 'win';
            message.textContent = 'Well Done! You won THE GAME!';
        } else {
            overlay.className = 'lose';
            message.textContent = 'Such a shame, you failed... Try Again!';
        }

        overlay.style.display = 'flex';

        // disable all the keys on the keyboard
        for (let i = 0; i < keys.length; i++) {
            keys[i].disabled = true;
        }
    }
}