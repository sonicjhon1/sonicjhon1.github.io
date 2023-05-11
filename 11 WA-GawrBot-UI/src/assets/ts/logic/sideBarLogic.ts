function attachSideBarLogic() {
	const buttonFullscreen = document.querySelectorAll<HTMLButtonElement>("#buttonFullscreen");
	for (let i = 0; i < buttonFullscreen.length; i++) {
		buttonFullscreen[i].addEventListener("click", toggleFullscreen);
	}
}
attachSideBarLogic();

export function toggleSideBarComponentMobile() {
	const sideBarComponentMobile = document.getElementById("sideBar");
	sideBarComponentMobile?.classList.toggle("hidden");
}

function toggleFullscreen() {
	if (!document.fullscreenElement) {
		document.body.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
}
