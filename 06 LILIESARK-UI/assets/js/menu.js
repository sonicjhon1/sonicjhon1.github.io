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