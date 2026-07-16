(function installTwitchFlagsIntegration(global) {
	"use strict";

	async function RenderFlag(container, userId, enabled) {
		const getFlagImageElement = global.TwitchFlagsJS?.GetFlagImageElement;
		if (!enabled || typeof getFlagImageElement !== "function")
			return;

		const image = await getFlagImageElement(userId);
		if (!image)
			return;

		image.classList.add("flag");
		container.appendChild(image);
	}

	global.TwitchFlagsIntegration = { RenderFlag };
})(globalThis);
