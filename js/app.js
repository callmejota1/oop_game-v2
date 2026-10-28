/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

//hello, cool game

let game;

/// Event listener for the start button
 
document.getElementById('btn__reset').addEventListener('click', () => { 
    game = new Game(); 
    game.startGame();
});
// Event listener for the on-screen keyboard
document.getElementById('qwerty').addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.classList.contains('key')) {
        if (game) {
            game.handleInteraction(e.target);
        }
    }
});    


