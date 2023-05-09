
    const buttonFullscreen = document.querySelectorAll<HTMLButtonElement>("#buttonFullscreen");
    for (let i = 0; i < buttonFullscreen.length; i++) {
        buttonFullscreen[i].addEventListener("click", toggleFullscreen);
    }
    
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.body.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }