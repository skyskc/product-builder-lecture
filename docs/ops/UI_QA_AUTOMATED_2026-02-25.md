# UI QA Automated Report (2026-02-25)

## Scope
- `index.html`
- `explore.html`
- `course.html`
- `place.html?id=place-001`
- `generation.html`
- `kcontent.html`
- `comments.html`
- `kcontent-result.html`

## What Was Executed
- Local server run via `npm start`
- HTTP response checks via `curl`
- Headless screenshot generation attempts with system `chromium-browser`
- HTML language-mix scans (`rg` for Hangul) on English-default pages
- JS syntax checks (`node --check main.js`)

## Environment Limitation
- Headless Chromium in this environment cannot load the expected web fonts reliably.
- Resulting screenshots render with missing-font/fallback issues and are not trustworthy for pixel-level spacing/typography QA.
- Therefore this report validates structure, content order, and insertion points rather than final visual polish.

## Automated Checks Passed
- English-default pages updated and no unintended Hangul remains in:
  - `generation.html`
  - `kcontent.html`
  - `comments.html`
  - `kcontent-result.html`
- Placeholder ad blocks exist at planned rollout positions:
  - Home Candidate A
  - Explore Candidate B
  - Course Candidate B
  - K-content Result Candidate A
- `main.js` syntax check passed after page/translation changes.

## Manual Follow-up Recommended (GUI Environment)
- Verify card spacing and line wraps on mobile for `home-steps-grid` / `home-practical-grid`
- Confirm placeholder ad panels do not dominate visual hierarchy
- Check sticky filter panels on `explore.html` and `course.html` while scrolling on mobile Safari/Chrome
- Validate `kcontent-character-grid` and `kcontent-result` list readability with loaded fonts
