// Init variables
var menu;
var startButton, settingsButton, quitButton;

// Fill in variables
async function initMenu() {
    menu = document.querySelector('#menu');
    startButton = menu.querySelector('#button-1');
    settingsButton = menu.querySelector('#button-2');
    quitButton = menu.querySelector('#button-3');
}

// Event handlers
async function attachMenu() {
    await initMenu();
}

// Show Main menu
function showMenu() {
    audioMenuBGM("play");

    menu.classList.remove('hide');
    menu.classList.remove('fadeOut');
    menu.classList.add('fadeIn');
}

// Hide Main menu
function hideMenu() {
    menu.classList.add('hide');
    menu.classList.add('fadeOut');
    menu.classList.remove('fadeIn');
}

// On ready
docReady(initMenu);
docReady(attachMenu);