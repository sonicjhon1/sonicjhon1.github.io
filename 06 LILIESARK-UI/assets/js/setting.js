// Init variables.
var setting;
var settingCheckboxes, applyButton;

// Fill in variables.
async function initSetting() {
    setting = document.querySelector("#setting");
    settingCheckboxes = document.querySelectorAll(".s-checkbox");
    applyButton = document.querySelector("#s-apply-button");
}

// Event handlers.
async function attachSetting() {
    await initSetting();

    settingCheckboxes.forEach((settingCheckbox) => {
        settingCheckbox.addEventListener('mouseover', () => {
            audioMenuMoveSE();
        });

        settingCheckbox.addEventListener('click', (e) => {
            audioMenuDecide01SE();
            switch(e.currentTarget.id) {
                case "Fullscreen":
                    FullscreenTMP = !FullscreenTMP;
                    break;
                case "BlankLogin":
                    BlankLoginTMP = !BlankLoginTMP;
                    break;
                case "Music":
                    MusicTMP = !MusicTMP;
                    break;
                case "SFX":
                    SFXTMP = !SFXTMP;
                    break;
            }
        });
    });

    applyButton.addEventListener('mouseover', () => {
        audioMenuMoveSE();
    });

    applyButton.addEventListener('click', async () => {
        audioMenuDecide02SE();
        // TODO: Save the settings to local storage.
        localStorage.setItem('Fullscreen', FullscreenTMP);
        localStorage.setItem('BlankLogin', BlankLoginTMP);
        localStorage.setItem('Music', MusicTMP);
        localStorage.setItem('SFX', SFXTMP);
        
        // Hide setting.
        toggleSetting();
        await sleep(500);
        setting.classList.add('hide');

        // Stop audio and exit fullscreen.
        audioMenuBGM('stop');
        await sleep(1000);
        
        // Show the launcher.
        launcher.classList.toggle('hide');
        toggleLauncher();
        await sleep(500);

        // Click on the Launch button
        launch_button.click();
    });
}

// Toggle setting.
function toggleSetting() {
    setting.classList.toggle("fadeOut");
    setting.classList.toggle("fadeIn");
}

// On ready.
docReady(initSetting);
docReady(attachSetting);