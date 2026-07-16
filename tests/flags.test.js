const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const flagsScript = fs.readFileSync(path.join(__dirname, "..", "flags.js"), "utf8");

function loadIntegration(getFlagImageElement) {
	const context = {};
	if (getFlagImageElement)
		context.TwitchFlagsJS = { GetFlagImageElement: getFlagImageElement };
	context.globalThis = context;
	vm.runInNewContext(flagsScript, context);
	return context.TwitchFlagsIntegration;
}

test("renders the user's Twitch flag when flags are enabled", async () => {
	const classes = [];
	const children = [];
	const image = {
		classList: {
			add(className) {
				classes.push(className);
			},
		},
	};
	const container = {
		appendChild(child) {
			children.push(child);
		},
	};
	let requestedUserId;
	const integration = loadIntegration(async (userId) => {
		requestedUserId = userId;
		return image;
	});

	await integration.RenderFlag(container, "18063875", true);

	assert.equal(requestedUserId, "18063875");
	assert.deepEqual(classes, ["flag"]);
	assert.deepEqual(children, [image]);
});

test("does not look up a Twitch flag when flags are disabled", async () => {
	let lookupCount = 0;
	const integration = loadIntegration(async () => {
		lookupCount += 1;
		return {};
	});

	await integration.RenderFlag({ appendChild() {} }, "18063875", false);

	assert.equal(lookupCount, 0);
});

test("does not append an image when the user has no Twitch flag", async () => {
	let appendCount = 0;
	const integration = loadIntegration(async () => null);

	await integration.RenderFlag(
		{
			appendChild() {
				appendCount += 1;
			},
		},
		"18063875",
		true,
	);

	assert.equal(appendCount, 0);
});

test("does not interrupt chat rendering when TwitchFlagsJS is unavailable", async () => {
	const integration = loadIntegration();

	await assert.doesNotReject(
		integration.RenderFlag({ appendChild() {} }, "18063875", true),
	);
});
