// Init variables
var MenuBGM, MenuBGMID = undefined;

MenuBGM = new Howl({
    src: ['./assets/audios/Music-Pak-01/001_BGM_Title_01_Lilie.mp3'],
    autoplay: true,
    loop: true,
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