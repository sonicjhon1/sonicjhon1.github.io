// Init variables.
var trailer;
var trailerVideo;

// Fill in variables.
async function initTrailer() {
    trailer = document.querySelector('#trailer');
    trailerVideo = document.querySelector('#trailer-video');
}

// Event handlers.
async function attachTrailer() {
    await initTrailer();

    trailerVideo.onended = async function() {
        await sleep(1000)
        toggleTrailer();
        await sleep(1000)
        trailer.classList.toggle('hide');
        document.exitFullscreen()

        // Show the launcher.
        launcher.classList.toggle('hide');
        toggleLauncher();
    }
}

// Start trailer.
function startTrailer() {
    trailer.classList.toggle('hide');
    trailerVideo.src = './assets/video/Trailer.mp4';
    audioTrailer();

    toggleTrailer();
    requestFullscreen(trailerVideo);
}

// toggle trailer.
function toggleTrailer() {
    trailer.classList.toggle('fadeOut');
    trailer.classList.toggle('fadeIn');
}

// On ready.
docReady(initTrailer);
docReady(attachTrailer);