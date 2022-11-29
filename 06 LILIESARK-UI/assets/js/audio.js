// Init variables
var MenuBGM, MenuBGMID = undefined;
var MenuMoveSE, MenuDecide01SE, MenuDecide02SE;

MenuBGM = new Howl({
    src: ['./assets/audios/Music-Pak-01/001_BGM_Title_01_Lilie.mp3'],
    loop: true,
    volume: 0.8,
    html5: true
});

MenuMoveSE = new Howl({
    src: ['./assets/audios/SE/system-move-01.mp3'],
    loop: false,
    volume: 0.9,
    html5: true
});

MenuDecide01SE = new Howl({
    src: ['./assets/audios/SE/system-decide-01.mp3'],
    loop: false,
    volume: 1,
    html5: true
});

MenuDecide02SE = new Howl({
    src: ['./assets/audios/SE/system-decide-02.mp3'],
    loop: false,
    volume: 1,
    html5: true
});

// Main menu audio
function audioMenuBGM(e) {
    // Stop audio if MenuBGMID is undefined and e == "stop".
    if (MenuBGMID !== undefined && e == "stop") {
        MenuBGM.stop();
        MenuBGMID = undefined;
    // else, play audio if MenuBGMID is not undefined and e == "play".
    } else if (MenuBGMID == undefined && e == "play") {
        // Clear listener after first call.
        MenuBGMID = MenuBGM.play();
        console.log(MenuBGMID);
    }
}

function audioMenuMoveSE() {
    MenuMoveSE.play();
}

function audioMenuDecide01SE() {
    MenuDecide01SE.play();
}

function audioMenuDecide02SE() {
    MenuDecide02SE.play();
}