const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.join(__dirname, "..");
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const settings = JSON.parse(fs.readFileSync(path.join(root, "settings", "settings.json"), "utf8"));
const styles = fs.readFileSync(path.join(root, "style.css"), "utf8");

test("loads TwitchFlagsJS and places its flag container after the username", () => {
	const pinnedLibrary = '<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/DesertIce/TwitchFlagsJS@9155c6394ae63de39bac349c9fdd981711188ba1/twitchflags.js" integrity="sha384-FOPARJMnXkPPvb8oawPqz71sOGfyqzDNB1nw1XeJ41e2oShBd3sTix2mtOBFw7EB" crossorigin="anonymous"></script>';
	const libraryIndex = indexHtml.indexOf(pinnedLibrary);
	const integrationIndex = indexHtml.indexOf('src="./flags.js"');
	const overlayIndex = indexHtml.indexOf('src="./script.js"');
	const usernameIndex = indexHtml.indexOf('id="username"');
	const flagIndex = indexHtml.indexOf('id="flag"');

	assert.ok(libraryIndex >= 0);
	assert.ok(libraryIndex < integrationIndex);
	assert.ok(integrationIndex < overlayIndex);
	assert.ok(usernameIndex < flagIndex);
});

test("exposes a default-on Show Flags appearance setting", () => {
	const showFlags = settings.settings.find((setting) => setting.id === "showFlags");

	assert.deepEqual(showFlags, {
		id: "showFlags",
		label: "Show Flags",
		description: "",
		type: "checkbox",
		defaultValue: true,
		group: "Appearance",
	});
	assert.match(script, /const showFlags = GetBooleanParam\("showFlags", true\);/);
});

test("renders flags for Twitch messages and announcements using the numeric user ID", () => {
	const calls = script.match(/TwitchFlagsIntegration\.RenderFlag\([^;]+data\.user\.id, showFlags\)/g) || [];

	assert.equal(calls.length, 2);
	assert.match(styles, /\.flag\s*\{/);
});
