/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

// this class represents a phrase in the game and provides methods to manipulate and display it
class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    // adds the phrase to the display when the game starts
    addPhraseToDisplay() {
     const phraseDiv = document.querySelector('#phrase ul');

     // loop through each character in the phrase and create a list item for it
        for (let i = 0; i < this.phrase.length; i++) {
        const character = this.phrase[i];
        const li = document.createElement('li');
    // if the character is a space, add a space class and set the text content to a space
        if (character === ' ') {
            li.className = 'space';
            li.textContent = ' ';
        } else {
            li.className = `hide letter ${character}`;
            li.textContent = character;
        }

        phraseDiv.appendChild(li);
    }
}
    


// checks if the passed letter is in the phrase
 checkLetter(letter) {
    return this.phrase.includes(letter);
}
    // reveals the letter(s) on the board that matches the player's selection
 showMatchedLetter(letter) {
    const matchingLetters = document.querySelectorAll(`.letter.${letter}`);
    matchingLetters.forEach(letter => { 
        letter.classList.remove('hide');
        letter.classList.add('show');
    });
  }
}