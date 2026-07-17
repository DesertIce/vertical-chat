# Vertical Chat

Vertical Chat is a customizable browser-source chat overlay for livestreams. It connects to [Streamer.bot](https://streamer.bot/) and combines Twitch, YouTube, and supported donation events into a single vertical feed for software such as OBS Studio.

## Features

- Twitch chat, cheers, announcements, subscriptions, channel point redemptions, raids, and shared chat
- YouTube chat, Super Chats, Super Stickers, and memberships
- Streamlabs, StreamElements, Patreon, Ko-fi, TipeeeStream, and Fourthwall events
- Avatars, badges, pronouns, Twitch flags, timestamps, replies, and first-time chatter highlights
- Configurable fonts, sizing, spacing, background opacity, message lifetime, scroll direction, and event visibility
- Optional command filtering, ignored-user lists, consecutive-message grouping, and permission-based image embeds

## Setup

1. Install and run [Streamer.bot](https://streamer.bot/), then connect the streaming platforms and integrations you want to use.
2. Enable Streamer.bot's WebSocket server. Vertical Chat uses `127.0.0.1:8080` by default; the address and port can be changed in the advanced settings.
3. Open the [Vertical Chat settings page](https://desertice.github.io/vertical-chat/settings/) and choose your overlay options.
4. Copy the generated widget URL into a browser source in OBS Studio or your preferred broadcast software.
5. Keep Streamer.bot running while the overlay is in use.

If the overlay cannot connect, confirm that Streamer.bot's WebSocket server is running and that the address and port in the widget URL match its configuration.

## Local development

The project is a static HTML, CSS, and JavaScript application with no build step. Serve the repository with any local web server, for example:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000/>. By default, the overlay will try to connect to Streamer.bot at `127.0.0.1:8080`.

Run the test suite with a version of Node.js that includes the built-in test runner:

```bash
node --test
```

## Project structure

- `index.html`, `style.css`, and `script.js` implement the overlay.
- `settings/` defines the hosted settings page and available options.
- `flags.js` integrates Twitch flag rendering.
- `icons/` contains platform and badge artwork.
- `tests/` contains the Node.js tests.

## Credits

Vertical Chat is a fork of [Nutty's MultiChat Overlay](https://github.com/nuttylmao/multichat-overlay). It also uses the [Streamer.bot client](https://github.com/Streamerbot/client), [BetterPronounsJS](https://github.com/DesertIce/BetterPronounsJS), and [TwitchFlagsJS](https://github.com/DesertIce/TwitchFlagsJS). Third-party code and artwork remain subject to their respective licenses.

## License

Vertical Chat is distributed under the [GNU General Public License version 3](LICENSE).
