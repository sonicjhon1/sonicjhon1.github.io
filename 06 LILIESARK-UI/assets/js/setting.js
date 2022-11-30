// Init variables.
var setting;

// Fill in variables.
async function initSetting() {
    setting = document.querySelector("#setting");
}

// Event handlers.
async function attachSetting() {
    await initSetting();
}

// Toggle setting.
function toggleSetting() {
    setting.classList.toggle("fadeOut");
    setting.classList.toggle("fadeIn");
}

// On ready.
docReady(initSetting);
docReady(attachSetting);