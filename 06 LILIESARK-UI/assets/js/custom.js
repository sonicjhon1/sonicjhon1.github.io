// Init variables
var launcher;
var launch_button;

// Fill in variables
async function init() {
    launcher = document.querySelector('#launch');
    launch_button = document.querySelector('#launch-button');
}

// Event handlers
async function attach() {
    await init();

    launch_button.addEventListener('click', () => {
        toggleLauncher()
    });
}

// Toggle launcher
async function toggleLauncher() {
    launcher.classList.toggle('fadeOut');
    launcher.classList.toggle('fadeIn');
}

// On ready
docReady(init);
docReady(attach);