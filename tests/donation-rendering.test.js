const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const script = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");

const donationHandlers = [
	"PatreonPledgeCreated",
	"KofiDonation",
	"KofiSubscription",
	"KofiResubscription",
	"KofiShopOrder",
	"TipeeeStreamDonation",
	"FourthwallOrderPlaced",
	"FourthwallDonation",
	"FourthwallSubscriptionPurchased",
	"FourthwallGiftPurchase",
	"FourthwallGiftDrawStarted",
	"FourthwallGiftDrawEnded",
];

function GetFunctionBody(name) {
	const start = script.search(new RegExp(`^(?:async )?function ${name}\\(`, "m"));
	assert.ok(start >= 0, `${name} not found`);
	const end = script.slice(start + 1).search(/^(?:async )?function /m);
	return end < 0 ? script.slice(start) : script.slice(start, start + 1 + end);
}

for (const name of donationHandlers) {
	test(`${name} does not render event data as HTML`, () => {
		assert.doesNotMatch(GetFunctionBody(name), /innerHTML|outerHTML|insertAdjacentHTML/);
	});
}
