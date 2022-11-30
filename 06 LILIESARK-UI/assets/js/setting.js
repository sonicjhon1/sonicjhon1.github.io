// Init variables.
var setting;
var settingContainers, settingCheckboxes, applyButton;

// Fill in variables.
async function initSetting() {
    setting = document.querySelector("#setting");
    settingContainers = document.querySelectorAll(".s-container");
    settingCheckboxes = document.querySelectorAll(".s-checkbox");
    applyButton = document.querySelector("#s-apply-button");
}

// Event handlers.
async function attachSetting() {
    await initSetting();

    settingContainers.forEach((settingContainer) => {
        settingContainer.addEventListener('mouseover', () => {
            audioMenuMoveSE();
        });
    });

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
        
        // Hide setting.
        toggleSetting();
        await sleep(500);
        setting.classList.add('hide');

        // Stop audio and exit fullscreen.
        audioMenuBGM('stop');
        document.exitFullscreen()
        await sleep(1000);
        
        // Show the launcher.
        launcher.classList.toggle('hide');
        toggleLauncher();
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