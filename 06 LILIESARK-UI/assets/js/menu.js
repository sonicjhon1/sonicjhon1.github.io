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



// Play main menu audio
function playMenuBGM() {
    MenuBGM = new Howl({
        src: ['./assets/audios/Music-Pak-01/001_BGM_Title_01_Lilie.mp3'],
        autoplay: true,
        loop: true,
        volume: 1,
        html5: true,
        onend: function() {
            console.log('Finished!');
        }
    });
    
    // Clear listener after first call.
    MenuBGMID = MenuBGM.play();
    console.log(MenuBGMID);
}

// Toggle Main menu
function toggleMenu() {
    // Start audio if MenuBGMID is not undefined.
    if (MenuBGMID !== undefined) {
        MenuBGM.stop();
        MenuBGMID = undefined;
    } else {
        playMenuBGM();
    }

    menu.classList.toggle('hide');
    menu.classList.toggle('fadeOut');
    menu.classList.toggle('fadeIn');
}

// On ready
docReady(initMenu);
docReady(attachMenu);