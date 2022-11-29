// Init variables
var menu;
var MenuBGM, MenuBGMID;

// Fill in variables
async function initMenu() {
    menu = document.querySelector('#menu');
}

// Event handlers
async function attachMenu() {
    await initMenu();
}

// Toggle Main menu
function toggleMenu() {
    audioMenuBGM("play");

    menu.classList.toggle('hide');
    menu.classList.toggle('fadeOut');
    menu.classList.toggle('fadeIn');
}

// On ready
docReady(initMenu);
docReady(attachMenu);