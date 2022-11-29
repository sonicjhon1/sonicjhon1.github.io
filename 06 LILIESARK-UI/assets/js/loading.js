// Init variables.
var loader;

// Fill in variables.
async function initLoader() {
    loader = document.querySelector('#loading');
}

async function showLoading() {
    audioMenuBGM('stop');

    loader.classList.toggle('hide');
    loader.classList.toggle('fadeOut');
    loader.classList.toggle('fadeIn');

    await sleep(6000)
    hideLoading();
    await sleep(1000)
    loader.classList.toggle('hide');

    startTrailer();
}

function hideLoading() {
    loader.classList.toggle('fadeOut');
    loader.classList.toggle('fadeIn');
}

// On ready.
docReady(initLoader);