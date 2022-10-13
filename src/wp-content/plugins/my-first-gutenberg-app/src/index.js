import { render } from "@wordpress/element";

import { App } from "./components/App";

window.addEventListener(
	"load",
	function () {
		render(<App />, document.querySelector("#my-first-gutenberg-app"));
	},
	false
);
