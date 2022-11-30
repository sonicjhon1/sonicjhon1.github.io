// Init variables.
var menu, login;
var startButton, settingsButton, quitButton, loginButton;
var nameInput, passwordInput;

// Fill in variables.
async function initMenu() {
    menu = document.querySelector('#menu');
    login = document.querySelector('#login');
    startButton = menu.querySelector('#button-1');
    settingsButton = menu.querySelector('#button-2');
    quitButton = menu.querySelector('#button-3');
    loginButton = login.querySelector('#l-login-button');
    nameInput = login.querySelector('#name');
    passwordInput = login.querySelector('#password');
}

// Event handlers.
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

        // Show login screen.
        await sleep(500);
        login.classList.toggle('hide');
        login.classList.toggle('fadeOut');
        login.classList.toggle('fadeIn');
    });

    settingsButton.addEventListener('click', async () => {
        audioMenuDecide01SE();

        // Hide menu.
        hideMenu();
        await sleep(500);
        menu.classList.add('hide');

        // Show setting screen.
        await sleep(1000);
        setting.classList.toggle('hide');
        toggleSetting();
    });

    quitButton.addEventListener('click', async () => {
        audioMenuDecide01SE();
        
        // Hide menu.
        hideMenu();
        await sleep(500);
        menu.classList.add('hide');

        // Stop audio and exit fullscreen.
        audioMenuBGM('stop');
        document.exitFullscreen()
        await sleep(1000);
        
        // Show the launcher.
        launcher.classList.toggle('hide');
        toggleLauncher();
    });

    loginButton.addEventListener('click', async () => {
        // TODO: Implement prevent default form.
        if ( localStorage.getItem('BlankLogin') == "true" || (nameInput.value != "" && passwordInput.value != "")) {
            audioMenuDecide02SE();
    
            // Hide menu and login screen.
            hideMenu();
            login.classList.toggle('fadeOut');
            login.classList.toggle('fadeIn');
            await sleep(500);
    
            // Hide menu and login screen.
            menu.classList.add('hide');
            login.classList.toggle('hide');
            await sleep(500);
    
            // Show the loading screen.
            showLoading();
        } else return;
    })

    // When the user clicks anywhere outside of the modal, close it.
    window.onclick = async function(event) {
        if (event.target == login) {
            audioMenuCancel01SE();

            // Hide the login screen.
            login.classList.toggle('fadeOut');
            login.classList.toggle('fadeIn');
            await sleep(500);

            // Hide the login screen.
            login.classList.toggle('hide');
        }
    }
}

// Show Main menu.
function showMenu() {
    audioMenuBGM("play");

    menu.classList.remove('hide');
    menu.classList.remove('fadeOut');
    menu.classList.add('fadeIn');
}

// Hide Main menu.
function hideMenu() {
    menu.classList.add('fadeOut');
    menu.classList.remove('fadeIn');
}

// On ready.
docReady(initMenu);
docReady(attachMenu);