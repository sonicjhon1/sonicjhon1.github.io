// Init variables
var loader;

// Fill in variables
async function initLoader() {
    loader = document.querySelector('#loading');
}

// Event handlers
async function attachLoader() {
    await initLoader();
}

function showLoading() {
    audioMenuBGM('stop');
    
    loader.classList.toggle('hide');
    loader.classList.toggle('fadeOut');
    loader.classList.toggle('fadeIn');
}

// On ready
docReady(initLoader);
docReady(attachLoader);