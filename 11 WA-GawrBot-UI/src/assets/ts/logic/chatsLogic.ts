import { toggleSideBarComponentMobile } from "./sideBarLogic"

export function attachChatsLogic() {
	const listIcon = document.getElementById("listIcon");
	listIcon?.addEventListener("click", toggleSideBarComponentMobile);
}
attachChatsLogic();