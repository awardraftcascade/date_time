# date_time

Text-only dating sim game for browser, designed to be hosted on GitHub Pages.

## Play locally

Open `index.html` directly in a browser.

## Features

- Single-file web game (`index.html`) with embedded CSS + JavaScript
- Choose-your-own-adventure branching dialogue
- Sarcastic/mild-cursing PG tone
- Randomized female date name each run
- Mobile + desktop responsive interface
- Fresh run each time (no persistence)

## Automated tests

This repo includes a lightweight jsdom test runner.

1. Install dependencies:
   - `npm install`
2. Run tests:
   - `npm test`

You can also run in-page self-tests by opening:

- `index.html?autotest=1`

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. In GitHub repo settings, enable **Pages** and set source to `main` branch (root).
3. Your game will be available at:
- `https://awardraftcascade.github.io/date_time/`
