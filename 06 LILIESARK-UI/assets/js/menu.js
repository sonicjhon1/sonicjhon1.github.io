// Init variables
var menu, login;
var startButton, settingsButton, quitButton;

// Fill in variables
async function initMenu() {
    menu = document.querySelector('#menu');
    startButton = menu.querySelector('#button-1');
    settingsButton = menu.querySelector('#button-2');
    quitButton = menu.querySelector('#button-3');
    login = document.querySelector('#login');
}

// Event handlers
async function attachMenu() {
    await initMenu();

    startButton.addEventListener('mouseover', () => {
        audioMenuMoveSE();
    });

    settingsButton.addEventListener('mouseover', () => {
        audioMenuMoveSE();
    });

    quitButton.addEventListener('mouseover', () => {
        audioMenuMoveSE();
    });

    startButton.addEventListener('click', async () => {
        audioMenuDecide01SE();

        // Show login screen
        await sleep(500);
        login.classList.toggle('hide');
        login.classList.toggle('fadeOut');
        login.classList.toggle('fadeIn');
    });

    settingsButton.addEventListener('click', async () => {
        audioMenuDecide01SE();

        // Hide menu
        hideMenu();
        await sleep(500);
        menu.classList.add('hide');
    });

    quitButton.addEventListener('click', async () => {
        audioMenuDecide01SE();
        
        // Hide menu
        hideMenu();
        await sleep(500);
        menu.classList.add('hide');

        // Stop audio and exit fullscreen
        audioMenuBGM('stop');
        document.exitFullscreen()
        await sleep(1000);
        
        // Show the launcher
        launcher.classList.toggle('hide');
        toggleLauncher();
    });
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
    menu.classList.add('fadeOut');
    menu.classList.remove('fadeIn');
}

// On ready
docReady(initMenu);
docReady(attachMenu);