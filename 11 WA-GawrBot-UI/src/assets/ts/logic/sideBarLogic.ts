import { useSocketio } from "../shared-clients";

const socket = useSocketio();

function attachSideBarLogic() {
	const sideBarComponentMobile = document.getElementById("sideBar");
	if (sideBarComponentMobile?.offsetParent === null) {
		sideBarComponentMobile?.classList.remove("max-sm:hidden");
		sideBarComponentMobile?.classList.add("hidden");
	}
	const buttonFullscreen = document.querySelectorAll<HTMLButtonElement>("#buttonFullscreen");
	for (let i = 0; i < buttonFullscreen.length; i++) {
		buttonFullscreen[i].addEventListener("click", toggleFullscreen);
	}
	const buttonReload = document.getElementById("buttonReload");
	buttonReload?.addEventListener("click", toggleReload);
}
attachSideBarLogic();

export function toggleSideBarComponentMobile() {
	const sideBarComponentMobile = document.getElementById("sideBar");
	sideBarComponentMobile?.classList.toggle("hidden");
}

export function hideSideBarComponentMobile() {
	const sideBarComponentMobile = document.getElementById("sideBar");
	sideBarComponentMobile?.classList.add("hidden");
}

function toggleFullscreen() {
	if (!document.fullscreenElement) {
		document.body.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
}

function toggleReload() {
	socket.emit("fetchInit")
}