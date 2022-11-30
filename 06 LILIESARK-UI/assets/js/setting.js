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

        settingCheckbox.addEventListener('click', () => {
            audioMenuDecide01SE();
        });
    });

    applyButton.addEventListener('mouseover', () => {
        audioMenuMoveSE();
    });

    applyButton.addEventListener('click', async () => {
        audioMenuDecide02SE();
        // TODO: Save the settings to local storage.
        
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