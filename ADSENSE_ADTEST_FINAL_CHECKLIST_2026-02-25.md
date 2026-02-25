# AdSense `adtest=1` Final Checklist (2026-02-25)

Use this checklist before enabling live AdSense slots (`adtest=off`) on production pages.

## 1. Runtime Config Injection (`.env` -> HTML)

- Confirm `.env` contains the intended slot IDs (`ADSENSE_SLOT_*`) and not placeholder values.
- Start local server and verify injected config appears before `main.js`:
  - `curl -s http://localhost:3000/explore.html | rg "GOSEOUL_ADSENSE_SLOTS|GOSEOUL_ADSENSE_SETTINGS"`
- Confirm rollout settings are present in injected HTML (`ADSENSE_ROLLOUT_*`).

## 2. `adtest=1` Rendering Check

- Open target pages with `?adtest=1`:
  - `/`
  - `/explore.html?adtest=1`
  - `/course.html?adtest=1`
  - `/kcontent-result.html?char=lee-jung-jae&adtest=1`
- Verify ad shell container is visible and reserved height is stable (no major layout jump).
- Verify placeholder disappears only when slot ID exists and slot is eligible by rollout.

## 3. A/B Rollout Behavior Check

- Control case:
  - `/explore.html?ads_variant=control&adtest=1`
  - Expected: rollout slot remains hidden/disabled (`is-disabled`, placeholder shown).
- Test case:
  - `/explore.html?ads_variant=test&adtest=1`
  - Expected: rollout slot initializes (`is-live`) when slot ID exists.
- Force overrides:
  - `?ads_force=off&adtest=1` should disable all slots
  - `?ads_force=on&adtest=1` should enable eligible slots regardless of page A/B assignment

## 4. Analytics (`gtag`) Event Check

- In browser devtools network/analytics debug, confirm events fire:
  - `adsense_ab_assignment`
  - `adsense_slot_state`
- Confirm key params look correct:
  - `page`
  - `slot_key`
  - `variant`
  - `state`
  - `ad_test_enabled`
  - `ads_force_mode`

## 5. Policy / UX Safety Check (AdSense-Friendly)

- Ads are not above-the-fold in a misleading way (content intent is clear first).
- Ads do not overlap buttons, tabs, result cards, or navigation controls.
- No click-driving copy near ads (e.g. "Click here", "Best choice" pointing at ad area).
- Mobile view keeps ad spacing separated from primary CTA buttons.

## 6. Live Rollout Cutover (`adtest=off`)

- Set `ADSENSE_ADTEST=false` in `.env` (or remove override).
- Keep only one rollout slot active first (`ADSENSE_ROLLOUT_*` unchanged).
- Monitor first 24-72 hours:
  - AdSense Policy Center warnings
  - Coverage / impressions / CTR anomalies
  - CLS / layout complaints on mobile

## 7. Rollback Plan

- Fast rollback (no deploy changes):
  - `ADSENSE_SLOT_*=` empty for target slot, or
  - `ADSENSE_ROLLOUT_RATIO=0` (forces control when no query override), or
  - `?ads_force=off` for temporary verification
- Confirm fallback state shows placeholder / reserved area without broken layout.
