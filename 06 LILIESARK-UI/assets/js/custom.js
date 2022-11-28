// Init variables
var launcher;
var launch_button;
var logo1, logo2, logo3;

// Fill in variables
async function init() {
    launcher = document.querySelector('#launch');
    launch_button = document.querySelector('#launch-button');
    logo1 = document.querySelector('#logo-1');
    logo2 = document.querySelector('#logo-2');
    logo3 = document.querySelector('#logo-3');
}

// Event handlers
async function attach() {
    await init();

    launch_button.addEventListener('click', () => {
        showSplashScreen();
    });
}

// Toggle launcher
function toggleLauncher() {
    launcher.classList.toggle('fadeOut');
    launcher.classList.toggle('fadeIn');
}

// Toggle logo 1
function toggleLogo1() {
    logo1.classList.toggle('fadeOut');
    logo1.classList.toggle('fadeIn');
}

// Toggle logo 2
function toggleLogo2() {
    logo2.classList.toggle('fadeOut');
    logo2.classList.toggle('fadeIn');
}

// Toggle logo 3
function toggleLogo3() {
    logo3.classList.toggle('fadeOut');
    logo3.classList.toggle('fadeIn');
}

// Show splash screens
async function showSplashScreen() {
    console.log("a")
    toggleLauncher();
    await sleep(2000);
    logo1.classList.toggle('hide');
    toggleLogo1();
    await sleep(1000);
    toggleLogo1();
    await sleep(1000);
    logo1.classList.toggle('hide');
    logo2.classList.toggle('hide');
    toggleLogo2();
    await sleep(1000);
    toggleLogo2();
    await sleep(1000);
    logo2.classList.toggle('hide');
    logo3.classList.toggle('hide');
    toggleLogo3();
    await sleep(1000);
    toggleLogo3();
    await sleep(1000);
    logo3.classList.toggle('hide');
    toggleLauncher();
}

// On ready
docReady(init);
docReady(attach);