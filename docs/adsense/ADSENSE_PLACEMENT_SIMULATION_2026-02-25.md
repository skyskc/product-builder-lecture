# AdSense Placement Simulation (2026-02-25)

Purpose: Define safe candidate zones for future AdSense insertion without degrading content quality or triggering layout/policy risk.

## Global Rules
- Keep core content first: intro/guide/checklist sections must appear before any ad unit on key pages.
- Do not place ads inside forms, filter controls, sticky nav bars, or immediate action clusters.
- Keep at least one clear editorial/content block between interactive controls and any ad unit.
- Avoid placing ads between heading and the first explanatory paragraph of a section.
- Avoid ad placements that look like navigation cards, quiz options, or result cards.
- Prefer responsive in-article units in long content sections and one low-priority unit near footer.

## Page-by-Page Candidate Zones

### `index.html` (Home)
- Candidate A (mid-content): after `home-route-panel`, before `home-practical-panel`
  - Reason: user has already consumed core route examples; ad will not interrupt hero or primary path selection.
- Candidate B (low priority): after `home-faq-panel`, before `#entry-fun-lab`
  - Reason: keeps fun/optional tools separated from planning content while preserving readability.
- Avoid
  - Header, hero CTA block (`open-landing`), showcase card (`korea-showcase`), and `open-plan-grid`
  - Inside `Fun Lab` cards and quiz/weather/budget controls

### `explore.html`
- Candidate A: after the new “How To Explore Better” panel and before dynamic `#place-grid`
  - Reason: content-first guidance remains first, then ad, then large result grid.
- Candidate B: after `#place-grid` and before “Explore More Seoul Routes” panel
  - Reason: less disruptive than inserting into result cards.
- Candidate C (low priority): after FAQ/trust panels, before footer
- Avoid
  - Sticky style filter panel
  - Sticky search/filter/tag panel
  - Inside `#place-grid` cards (avoid card/ad confusion)
  - Immediately adjacent to `traveler-tools-panel` calculator inputs

### `course.html` (Planner)
- Candidate A: after “How To Use Planner” panel, before `course-tools-panel`
  - Reason: users get context first, then optional ad before tool controls.
- Candidate B: after `course-section-food`, before Practical Checklist
  - Reason: long content break; less risk than placing near route/hotel control areas.
- Candidate C (low priority): after Quality/Policy panel, before Related Links/footer
- Avoid
  - Sticky quick navigation and style filter panels
  - `course-tools-panel` buttons and offline/save/share actions
  - `course-section-route` immediately above route link or stop list

### `place.html` (App Detail)
- Candidate A: after `place-review-title` section (review summary) and before `place-notes-title`
  - Reason: user already saw core map + reviews, ad appears before guidance content.
- Candidate B: after “Practical Checklist” panel and before “Quality & Sources” panel
  - Reason: maintains decision-support flow.
- Candidate C (low priority): before “Continue Planning” panel
- Avoid
  - Map section (`#place-map`) and share buttons
  - Meta summary cards near top hero
  - Inside review list items

### `generation.html`
- Candidate A: after “How To Use” panel, before generation scenario grid panel
- Candidate B: after scenario grid panel, before Practical Checklist
- Avoid
  - Inside `#generation-grid` cards
  - Header and hero

### `kcontent.html`
- Candidate A: after “How To Use” panel, before character grid/search topics
- Candidate B: after “K-Content Search Topics” panel, before Practical Checklist
- Avoid
  - Inside `#kcontent-character-grid`
  - Between character grid heading and grid itself
  - Near card tap interactions (selection confusion risk)

### `comments.html` (Saju)
- Candidate A: after “How To Use” panel, before result panel
- Candidate B: after recommendation panel (`#saju-reco-title`), before notes panel
- Avoid
  - Inside `#saju-form`
  - Between submit button and result panel top (conversion/confusion risk)
  - Inside result text blocks and recommendation list items

## Suggested Rollout Sequence
1. Start with one unit on `explore.html` Candidate B (least interaction-sensitive).
2. Add one unit on `course.html` Candidate B.
3. Add one unit on `index.html` Candidate A.
4. Monitor policy center + UX metrics before expanding to `place.html` and feature pages.

## QA Checklist Before Enabling Ads
- Check desktop and mobile for CLS/layout jumps.
- Verify ads are visually distinct from cards/buttons.
- Ensure no ad appears inside sticky panels or form controls.
- Confirm content remains usable with ad blockers and without ad fill.
- Recheck AdSense policy center after rollout.
