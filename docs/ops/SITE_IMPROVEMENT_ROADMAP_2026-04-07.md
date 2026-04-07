# Site Improvement Roadmap

Date: 2026-04-07
Project: GoSeoul

## Goal

This roadmap turns the current site audit into an execution order.

The site already looks materially better than before, but the next gains are no longer about surface polish alone. The highest-value work now sits in:

- route quality
- SEO / URL consistency
- accessibility
- runtime stability
- maintainability

## Current Assessment

### What is already strong

- The homepage is clearer about entry points and next actions.
- Explore and Planner now help users decide instead of only browse.
- Place detail pages are more actionable and less passive.
- Supporting pages like Generations, Screen Picks, and Saju now explain purpose and next move more clearly.
- Static place pages and share pages are now aligned better with the product direction.

### What is still limiting product quality

- User-facing place navigation still leans on the dynamic `place.html?id=...` route while search-facing assets live in `places/*.html`.
- The Planner behaves more like a curated list renderer than a true route planner.
- `main.js` is too large and couples page rendering, translation, state, and feature logic in one file.
- The service worker ignores query strings, which is risky in a site that uses `lang`, `style`, and `char` heavily.
- Keyboard accessibility is incomplete for tabs, result updates, and some interactive controls.
- Runtime fallbacks exist, but they are mostly defensive, not product-grade.

## Priority 1: Do Next

These are the changes with the best ratio of impact to effort.

### 1. Unify internal place links around static detail pages

Why:

- Today, cards open `place.html?id=...` from [main.js](/Volumes/Extreme SSD/코딩/projects/product-builder-lecture/main.js#L1355).
- The dynamic detail page is marked `noindex` in [place.html](/Volumes/Extreme SSD/코딩/projects/product-builder-lecture/place.html#L9).
- Search-ready pages exist separately in [places/place-001.html](/Volumes/Extreme SSD/코딩/projects/product-builder-lecture/places/place-001.html).
- This splits authority between UX URLs and SEO URLs.

What to change:

- Change all public/internal detail links to `/places/{id}.html`.
- Keep `place.html` only as a preview or legacy fallback if needed.
- Add a soft redirect or canonical migration path from `place.html?id=...` to `/places/{id}.html`.
- Ensure share actions also prefer static pages.

Success check:

- Every internal place CTA resolves to a static place page.
- `place.html` is no longer the main user journey path.

### 2. Turn Planner into a real route engine

Why:

- The core route is currently generated from the first six matching places in [main.js](/Volumes/Extreme SSD/코딩/projects/product-builder-lecture/main.js#L3503).
- That is presentable, but not trustworthy as a planner.

What to change:

- Introduce a route scoring step that considers:
- district clustering
- estimated transit cost
- walking continuity
- best time compatibility
- anchor-stop quality
- stop count by trip energy
- Build a ranked shortlist, then generate the final route from the top-scoring combination.
- Distinguish anchor stops from filler stops explicitly.

Success check:

- Route order changes when geography or time windows conflict.
- The Planner can explain why a stop was included or excluded.

### 3. Fix service worker query-string behavior

Why:

- [sw.js](/Volumes/Extreme SSD/코딩/projects/product-builder-lecture/sw.js#L57) and [sw.js](/Volumes/Extreme SSD/코딩/projects/product-builder-lecture/sw.js#L66) use `ignoreSearch: true`.
- This can serve the wrong language or wrong stateful page.

What to change:

- Stop ignoring search params for HTML navigations.
- Only use query-insensitive matching for stable static assets when safe.
- Add a versioned cache strategy that separates:
- HTML
- CSS/JS
- images
- API fallback responses

Success check:

- `?lang=ko` and `?lang=en` do not cross-cache.
- `kcontent-result.html?char=...` loads the correct result when revisited offline or after back/forward navigation.

### 4. Add proper keyboard semantics to tabs and live-result areas

Why:

- Explore and Planner use `role="tab"` but only click behavior is wired in [main.js](/Volumes/Extreme SSD/코딩/projects/product-builder-lecture/main.js#L1614) and [main.js](/Volumes/Extreme SSD/코딩/projects/product-builder-lecture/main.js#L3705).
- Result count in [explore.html](/Volumes/Extreme SSD/코딩/projects/product-builder-lecture/explore.html#L159) is not announced.

What to change:

- Add left/right/home/end keyboard support for all tablists.
- Add `aria-live="polite"` to dynamic result count and status text.
- Add visible focus states to shortcut cards and decision cards.

Success check:

- A keyboard-only user can fully operate Explore and Planner.
- Filter changes announce updated result counts.

## Priority 2: This Week

These are important and should follow immediately after Priority 1.

### 5. Split `main.js` by page responsibility

Why:

- [main.js](/Volumes/Extreme SSD/코딩/projects/product-builder-lecture/main.js) is nearly 5,000 lines and currently owns:
- global language
- theme
- service worker
- homepage
- Explore
- Planner
- Place
- Saju
- K-content
- ad logic

What to change:

- Extract into modules such as:
- `app-shell.js`
- `page-home.js`
- `page-explore.js`
- `page-course.js`
- `page-place.js`
- `page-kcontent.js`
- `page-saju.js`
- Keep shared helpers in a small utility module.

Success check:

- A change to one page does not require opening the entire app file.
- Each page bootstraps only what it needs.

### 6. Replace innerHTML-heavy rendering in high-risk areas

Why:

- There are many `innerHTML` writes in [main.js](/Volumes/Extreme SSD/코딩/projects/product-builder-lecture/main.js).
- Some are safe today, but the pattern makes future regression easier.

What to change:

- Prioritize safer DOM creation for:
- place cards
- Planner hotel / restaurant cards
- K-content grid
- offline plan list
- Keep templated strings only where data is fully internal and escaped.

Success check:

- User-controlled or API-derived content does not pass through mixed template HTML unless escaped by design.

### 7. Introduce shortlist flow between Explore and Planner

Why:

- The current flow still asks the user to remember places mentally.
- This makes Explore feel good, but not complete.

What to change:

- Add a “save to shortlist” action on place cards.
- Show shortlist count in header or sticky summary.
- Allow Planner to start from saved shortlist, not only from style.

Success check:

- A user can move from Explore to Planner with chosen candidates intact.

### 8. Normalize URL taxonomy for feature pages

Why:

- `comments.html` is actually the Saju tool.
- Some URLs reflect old implementation names rather than user meaning.

What to change:

- Rename or alias:
- `comments.html` -> `saju.html`
- keep old URL as redirect or compatibility alias
- Review whether `generation.html` and `kcontent.html` should gain clearer path naming later.

Success check:

- URLs match what users and search engines think the page is.

### 9. Improve media density on Explore cards

Why:

- Explore cards are informative but still visually flat.
- The page would benefit from faster visual scanning.

What to change:

- Add representative images to cards where available.
- Add small decision labels such as:
- anchor stop
- short stop
- good at sunset
- indoor backup
- Add district chips with stronger contrast.

Success check:

- Users can shortlist faster without opening every detail page.

## Priority 3: Next

These are not blockers, but they would lift the product from strong MVP to stronger destination product.

### 10. Strengthen dynamic-to-static SEO consistency

Why:

- The dynamic place page updates meta and JSON-LD in [main.js](/Volumes/Extreme SSD/코딩/projects/product-builder-lecture/main.js#L2765), but bots are better served by clean static output.

What to change:

- Move more page-specific SEO to generated static detail pages.
- Keep dynamic page metadata only for runtime fallback mode.
- Align canonical, alternate, OG, and schema fields across static and dynamic variants.

### 11. Upgrade Planner fallbacks from “graceful” to “useful”

Why:

- Hotel and restaurant fallbacks currently preserve continuity, but not much confidence.
- They read as safe placeholders rather than local recommendations.

What to change:

- Replace generic fallback lists with seeded editorial recommendations by district and meal.
- Label fallback mode clearly but still use high-quality data.

### 12. Add route comparison mode

Why:

- The product currently produces a route, but does not help users compare route types.

What to change:

- Show two or three route variants:
- shortest walking
- best first-time route
- best scenic route

### 13. Reduce third-party noise on first load

Why:

- Homepage loads analytics, clarity, and feedback tools early in [index.html](/Volumes/Extreme SSD/코딩/projects/product-builder-lecture/index.html#L97).

What to change:

- Delay or consent-gate non-essential third-party scripts.
- Keep only what is required for critical business measurement.

### 14. Replace Tailwind CDN on `place.html`

Why:

- [place.html](/Volumes/Extreme SSD/코딩/projects/product-builder-lecture/place.html#L32) still depends on Tailwind CDN.
- This is acceptable for fast iteration, but not ideal for production consistency.

What to change:

- Move the page onto the same compiled/shared CSS strategy as the rest of the site.

### 15. Make language handling more structural

Why:

- Current translation is heavily JS-driven.
- It works, but it is hard to scale and test.

What to change:

- Move page copy into page-scoped dictionaries.
- Reduce scattered `if (CURRENT_LANG === 'en')` blocks.
- Eventually pre-render language variants where worth it.

## Recommended Execution Order

### Sprint A

- Unify place links to static pages
- Fix service worker query behavior
- Add tab keyboard support and live regions

### Sprint B

- Refactor Planner route generation
- Add shortlist flow
- Improve Planner fallbacks

### Sprint C

- Split `main.js`
- Normalize URL taxonomy
- Improve Explore card media density

### Sprint D

- Strengthen static SEO consistency
- Reduce third-party startup cost
- Replace Tailwind CDN on `place.html`

## What To Ignore For Now

These may look tempting, but they are lower leverage than the items above.

- minor color tweaks
- adding more decorative motion
- more homepage copy expansion
- adding extra categories before route logic improves
- polishing footer or legal pages first

## Best Next Build

If only one implementation pass is possible, do this:

1. Switch all place CTAs to static place pages.
2. Fix service worker search-param caching.
3. Add shortlist from Explore to Planner.
4. Replace the current Planner “top 6” logic with route scoring.

That would give the biggest improvement in trust, SEO coherence, and actual planning quality.
