// Init variables
var menu;

// Fill in variables
async function initMenu() {

}

// Event handlers
async function attachMenu() {
    await initMenu();
}


// Play main menu audio
function playMenuBGM() {
    var MenuBGM = new Howl({
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
    // Start audio
    playMenuBGM();
}

// On ready
docReady(initMenu);
docReady(attachMenu);