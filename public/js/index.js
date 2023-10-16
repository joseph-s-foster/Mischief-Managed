const audio = document.getElementById('myAudio');

function pauseAndPlay() {
    audio.pause();
    setTimeout(function() {
        audio.play();
    }, 1000);
}

window.addEventListener("load", pauseAndPlay);


const singleAudio = document.getElementById('singleAudio');
window.addEventListener('load', () => {
    singleAudio.play();
});