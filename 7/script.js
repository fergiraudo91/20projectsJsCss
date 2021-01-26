const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureparts = document.querySelectorAll('.figure-part');
const words = ['floor', 'tarja', 'simone', 'epica', 'nightwish', 'ironmaiden'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

function displayWord(){
    wordEl.innerHTML = `
    ${selectedWord.split('').map(letter => 
        `<span class="letter">   
        ${correctLetters.includes(letter) ? letter : ''}
        </span>`
    ).join('')
    }
    `;
    const innerWord = wordEl.innerText.replace(/\n/g, '');
    if(innerWord === selectedWord){
        finalMessage.innerText ="Congratulations, you won!";
        popup.style.display = 'flex';
    }
}

//Update the wrong letters
function updateWrongLettersEl(){
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;
    //diplay parts
    figureparts.forEach((part, index) =>{
        const errors = wrongLetters.length;
        if(index < errors){
            part.style.display = 'block';
        }
        else{
            part.style.display = 'none';
        }
    });
    //Check if lost
    if(wrongLetters.length == figureparts.length){
        finalMessage.innerText = "Unfortunately you lost! :(";
        popup.style.display = 'flex';
    }
}

//Show notification
function showNotification(){
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}


//Keydown letter press

window.addEventListener('keydown', e =>{
    if(e.keyCode >= 65 && e.keyCode<= 90){
        const letter = e.key;
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            }
            else{
                showNotification();
            }

        }
        else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLettersEl();
            }
            else{
                showNotification();
            }
        }
    }
});

//Restart game and play again
playAgainBtn.addEventListener('click', () =>{
    location.reload();
});


displayWord();