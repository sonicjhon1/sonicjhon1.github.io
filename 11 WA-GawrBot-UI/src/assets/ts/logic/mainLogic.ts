import { toggleChatsComponentMobile, hideChatsComponentMobile } from "./chatLogic";
import { toggleMainHeaderBackButtonComponentMobile } from "./headerLogic";
import { hideSideBarComponentMobile } from "./sideBarLogic";

export function toggleMainComponentMobile() {
	const divMain = document.getElementById("main");
	if (!divMain?.offsetParent || divMain?.classList.contains("forceFlex")) {
		toggleChatsComponentMobile();
		toggleMainHeaderBackButtonComponentMobile();
		hideSideBarComponentMobile();
		divMain?.classList.toggle("forceFlex");
	}
}

export function showMainComponentMobile() {
	const divMain = document.getElementById("main");
	if (!divMain?.offsetParent && !divMain?.classList.contains("forceFlex")) {
		hideChatsComponentMobile();
		toggleMainHeaderBackButtonComponentMobile();
		hideSideBarComponentMobile();
	}
	divMain?.classList.add("forceFlex");
}

export function hideMainComponentMobile() {
	const divMain = document.getElementById("main");
	if (!divMain?.offsetParent && divMain?.classList.contains("forceFlex")) {
		toggleChatsComponentMobile();
		toggleMainHeaderBackButtonComponentMobile();
		hideSideBarComponentMobile();
	}
	divMain?.classList.remove("forceFlex");
}