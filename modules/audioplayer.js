const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');
const currentTimeDisplay = document.getElementById('currentTime');

function addEventListeners() {
    console.log("Adding event listeners");
    playBtn.addEventListener('click', (event) =>
        playMedia(event)
    );
    pauseBtn.addEventListener('click', (event) =>
        pauseMedia(event)
    );
    stopBtn.addEventListener('click', (event) =>
        stopMedia(event)
    );
    audioPlayer.addEventListener('timeupdate', () => {
        currentTimeDisplay.textContent = `${audioPlayer.currentTime.toFixed(0)} / ${(audioPlayer.duration/60).toFixed(0)}:${(audioPlayer.duration%60).toFixed(0)}`;
    });

}

async function playMedia(){
    try {
        console.log("Attempting to play media");
        await audioPlayer.play();
    } catch (error) {
        console.error("Error playing media:", error);
    }
    console.log("Media is playing");
}

function pauseMedia(){
    console.log("Pausing media");
    audioPlayer.pause();
}

function stopMedia(){
    console.log("Stopping media");
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
}

function main(){
    console.log("Audio Player Module Loaded");
    addEventListeners();
}

main();