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
                    if (Fullscreen == "false") {
                        Fullscreen = "true";
                    } else {
                        Fullscreen = "false";
                    }
                    break;
                case "BlankLogin":
                    if (BlankLogin == "false") {
                        BlankLogin = "true";
                    } else {
                        BlankLogin = "false";
                    }
                    break;
                case "Music":
                    if (Music == "false") {
                        Music = "true";
                    } else {
                        Music = "false";
                    }
                    break;
                case "SFX":
                    if (SFX == "false") {
                        SFX = "true";
                    } else {
                        SFX = "false";
                    }
                    break;
            }
        });
    });

    applyButton.addEventListener('mouseover', () => {
        audioMenuMoveSE();
    });

    applyButton.addEventListener('click', async () => {
        audioMenuDecide02SE();
        // Save the settings to local storage.
        localStorage.setItem('Fullscreen', Fullscreen);
        localStorage.setItem('BlankLogin', BlankLogin);
        localStorage.setItem('Music', Music);
        localStorage.setItem('SFX', SFX);
        
        // Hide setting.
        toggleSetting();
        await sleep(500);
        setting.classList.add('hide');

        // Stop audio and exit fullscreen if needed.
        audioMenuBGM('stop');
        await sleep(1000);
        document.exitFullscreen()
        .catch(err=> console.log("ERROR OCCURRED"));
        
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

// Sync setting.
function syncSetting() {
    if (localStorage.getItem("Fullscreen") ==  "true") {
        document.querySelector("#Fullscreen").checked = true;
    } else {
        document.querySelector("#Fullscreen").checked = false;
    }
    if (localStorage.getItem("BlankLogin") ==  "true") {
        document.querySelector("#BlankLogin").checked = true;
    } else {
        document.querySelector("#BlankLogin").checked = false;
    }
    if (localStorage.getItem("Music") ==  "true") {
        document.querySelector("#Music").checked = true;
    } else {
        document.querySelector("#Music").checked = false;
    }
    if (localStorage.getItem("SFX") ==  "true") {
        document.querySelector("#SFX").checked = true;
    } else {
        document.querySelector("#SFX").checked = false;
    }
}

// On ready.
docReady(initSetting);
docReady(attachSetting);