// Init variables.
var app;
var launcher;
var launch_button;
var splash, logo1, logo2, logo3;
var MenuBGMID;
var Fullscreen = "true", FullscreenTMP, BlankLogin = "false", BlankLoginTMP, Music = "true", MusicTMP, SFX = "true", SFXTMP;

// Fill in variables.
async function init() {
    app = document.querySelector('#app');
    launcher = document.querySelector('#launch');
    launch_button = document.querySelector('#launch-button');
    splash = document.querySelector('#splash');
    logo1 = document.querySelector('#logo-1');
    logo2 = document.querySelector('#logo-2');
    logo3 = document.querySelector('#logo-3');
}

// Event handlers.
async function attach() {
    await init();

    launch_button.addEventListener('click', () => {
        // Show splash screen.
        showSplashScreen();
    });
}

// Toggle launcher.
function toggleLauncher() {
    launcher.classList.toggle('fadeOut');
    launcher.classList.toggle('fadeIn');
}

// Toggle Splash.
function toggleSplash() {
    splash.classList.toggle('hide')
}

// Toggle logo 1.
function toggleLogo1() {
    logo1.classList.toggle('fadeOut');
    logo1.classList.toggle('fadeIn');
}

// Toggle logo 2.
function toggleLogo2() {
    logo2.classList.toggle('fadeOut');
    logo2.classList.toggle('fadeIn');
}

// Toggle logo 3.
function toggleLogo3() {
    logo3.classList.toggle('fadeOut');
    logo3.classList.toggle('fadeIn');
}

// Show splash screens.
async function showSplashScreen() {
    loadSavedData();
    syncSetting();
    toggleLauncher();
    toggleSplash();
    requestFullscreen(app);
    await sleep(1000);
    launcher.classList.toggle('hide');
    await sleep(1000);
    logo1.classList.toggle('hide');
    toggleLogo1();
    await sleep(2000);
    toggleLogo1();
    await sleep(1000);
    logo1.classList.toggle('hide');
    logo2.classList.toggle('hide');
    toggleLogo2();
    await sleep(2000);
    toggleLogo2();
    await sleep(1000);
    logo2.classList.toggle('hide');
    logo3.classList.toggle('hide');
    toggleLogo3();
    await sleep(4000);
    toggleLogo3();
    await sleep(3000);
    logo3.classList.toggle('hide');
    toggleSplash();
    
    showMenu();
}

// On ready.
docReady(init);
docReady(attach);
docReady(loadSavedData);

// Load saved data or create new.
function loadSavedData() {
    try {
        Fullscreen = localStorage.getItem('Fullscreen');
        BlankLogin = localStorage.getItem('BlankLogin');
        Music = localStorage.getItem('Music');
        SFX = localStorage.getItem('SFX');
    } catch (e) {
        console.log(e);
        Fullscreen = "true";
        BlankLogin = "false";
        Music = "true";
        SFX = "true";
    } finally {
        if (Fullscreen == null) {
            Fullscreen = "true";
            localStorage.setItem("Fullscreen", "true")
        }
        if (BlankLogin == null) {
            BlankLogin = "false";
            localStorage.setItem("BlankLogin", "false")
        }
        if (Music == null) {
            Music = "true";
            localStorage.setItem("Music", "true")
        }
        if (SFX == null) {
            SFX = "true";
            localStorage.setItem("SFX", "true")
        }
        FullscreenTMP = Fullscreen;
        BlankLoginTMP = BlankLogin;
        MusicTMP = Music;
        SFXTMP = SFX;
    }
}