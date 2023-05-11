import { toggleChatsComponentMobile } from "./chatLogic";
import { toggleMainHeaderBackButtonComponentMobile } from "./headerLogic"
import { toggleSideBarComponentMobile } from "./sideBarLogic"

export function toggleMainComponentMobile() {
	const divMain = document.getElementById("main");
	if (!divMain?.offsetParent || divMain?.classList.contains("forceFlex")) {
		toggleChatsComponentMobile();
        toggleMainHeaderBackButtonComponentMobile();
		toggleSideBarComponentMobile();
		divMain?.classList.toggle("forceFlex");
	}
}
