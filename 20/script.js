const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log(randomNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition;

recognition.start();

function getRandomNumber(){
    return Math.floor(Math.random() * 100) + 1;
}


function checkNumber(message){
    const num = +message;
    if(Number.isNaN(num)){
        msgEl.innerHTML = '<div>That is not a valid number</div>';
        return;
    }
    if(num > 100 || num < 1){
        msgEl.innerHTML += '<div>number must be between 1 and 100</div>';
        return;
    }
    if(num == randomNum){
        document.body.innerHTML += `<h2>Congrats you've guest the number <br><br>
        It was ${num}
        <button class="play-again" id="play-again">Play again</button></h2>
        `
    }
    else if(num > randomNum){
        msgEl.innerHTML += '<div>Go lower</div>';
    }
    ele{
        msgEl.innerHTML += '<div>Go Higher</div>';
    }
}

function onSpeak(e){
    const message = e.result[0][0].transcript;
    writeMessage(message);
    checkNumber(message);
}

function writeMessage(message){
    msgEl.innerHTML = `
    <div>You said</div>
    <span class="box">${message}</span>
    `;
}

recognition.addEventListener('result', onSpeak);

recognition.addEventListener('end', () =>{
    recognition.start();
});

document.body.addEventListener('click', (e) =>{
    if(e.target.id == 'play-again'){
        window.location.reload();
    }
});