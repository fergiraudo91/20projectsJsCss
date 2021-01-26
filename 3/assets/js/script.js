const video = document.getElementById('video');
const controls = document.querySelector('.controls');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const barProgress = document.getElementById('progress');
const timeStamp = document.getElementById('timestamp');

//play and pause video
function toggleVideoStatus(){
    if(video.paused){
        video.play();
    }
    else{
        video.pause();
    }
    updatePlayIcon();
}

//update the play/pause icon
function updatePlayIcon(){
    if(video.paused){
        playBtn.innerHTML = '<i class="fa fa-play fa-2x"></i>'
    }
    else{
        playBtn.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
    }
}

//update progress
function updateProgress(){
    barProgress.value = video.currentTime / video.duration * 100;
    //Get the minutes
    let mins = Math.floor(video.currentTime / 60);
    if(mins < 10){
        mins = '0' + String(mins);
    }

    //Get seconds
    let secs = Math.floor(video.currentTime % 60);
    if(secs < 10){
        secs = '0' + String(secs);
    }

    timeStamp.textContent = `${mins}:${secs}`;
}

//Set video time to progress
function setVideoProgress(){
    video.currentTime = barProgress.value * video.duration / 100;
}

//stop video
function stopVideo(){
    video.currentTime = 0;
    video.pause();

}




//Event Listeners

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

playBtn.addEventListener('click', toggleVideoStatus);

stopBtn.addEventListener('click', stopVideo);

barProgress.addEventListener('change', setVideoProgress);



