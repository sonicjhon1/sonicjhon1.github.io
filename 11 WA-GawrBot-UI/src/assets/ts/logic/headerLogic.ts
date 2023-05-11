import { toggleMainComponentMobile } from "./mainLogic";

function attachHeaderLogic() {
	const buttonMainHeaderBack = document.getElementById("mainHeaderBack");
	buttonMainHeaderBack?.addEventListener("click", toggleMainComponentMobile);
}
attachHeaderLogic();

export function toggleMainHeaderBackButtonComponentMobile() {
	const buttonMainHeaderBack = document.getElementById("mainHeaderBack");
	buttonMainHeaderBack?.classList.toggle("forceFlex");
}
