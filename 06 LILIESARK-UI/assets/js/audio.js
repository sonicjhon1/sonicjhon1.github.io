// Init variables.
var MenuBGM, MenuBGMID = undefined;
var MenuMoveSE, MenuDecide01SE, MenuDecide02SE, MenuCancel01SE;
var TrailerAudio;

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

MenuCancel01SE = new Howl({
    src: ['./assets/audios/SE/system-cancel-01.mp3'],
    loop: false,
    volume: 1,
    html5: true
});

TrailerAudio = new Howl({
    src: ['./assets/video/Trailer.mp3'],
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
        if (localStorage.getItem('Music') == "false") return;
        // Clear listener after first call.
        MenuBGMID = MenuBGM.play();
    }
}

function audioMenuMoveSE() {
    if (localStorage.getItem('SFX') == "false") return;
    MenuMoveSE.play();
}

function audioMenuDecide01SE() {
    if (localStorage.getItem('SFX') == "false") return;
    MenuDecide01SE.play();
}

function audioMenuDecide02SE() {
    if (localStorage.getItem('SFX') == "false") return;
    MenuDecide02SE.play();
}

function audioMenuCancel01SE() {
    if (localStorage.getItem('SFX') == "false") return;
    MenuCancel01SE.play();
}

function audioTrailer() {
    if (localStorage.getItem('Music') == "false") return;
    TrailerAudio.play();
}