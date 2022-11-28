// Init variables
var app;
var launcher;
var launch_button;
var logo1, logo2, logo3;

// Fill in variables
async function init() {
    app = document.querySelector('#app');
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

// Play main menu audio
function playAudio(path) {
    var sound = new Howl({
        src: [path],
        autoplay: true,
        loop: true,
        volume: 1,
        html5: true,
        onend: function() {
            console.log('Finished!');
        }
    });
    
    // Clear listener after first call.
    sound.once('load', function(){
        sound.play();
    });
}

// Show splash screens
async function showSplashScreen() {
    toggleLauncher();
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
    
    // Todo: menu screen
    launcher.classList.toggle('hide');
    toggleLauncher();

    // Start audio
    playAudio('./assets/audios/Music-Pak-01/001_BGM_Title_01_Lilie.wav')
}

// On ready
docReady(init);
docReady(attach);