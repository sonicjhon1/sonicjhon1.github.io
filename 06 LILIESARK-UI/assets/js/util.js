// On document ready, callbacks are called.
async function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

// Sleep for a certain amount of time
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Request fullscreen
async function requestFullscreen(element) {
    if (localStorage.getItem('Fullscreen') == "false") return;
    if (element.requestFullscreen) {
        element.requestFullscreen({ navigationUI: "hide" });
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen({ navigationUI: "hide" });
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen({ navigationUI: "hide" });
    }
}