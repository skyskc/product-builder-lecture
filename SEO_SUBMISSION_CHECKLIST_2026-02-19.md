# GoSeoul SEO Submission Checklist (Google + Naver)

Date: 2026-02-19
Primary domain: https://product-builder-lecture-4ec.pages.dev/

## 1) Pre-submit Technical Checks
- [x] `robots.txt` reachable: `/robots.txt`
- [x] `sitemap.xml` reachable: `/sitemap.xml`
- [x] `rss.xml` reachable: `/rss.xml`
- [x] Canonical URLs use final route paths (no redirecting `.html` canonical)
- [x] `meta name="robots"` present on key pages
- [x] `hreflang` pairs (`ko`, `en`, `x-default`) present
- [x] Verification tags present in home:
  - [x] Google Search Console verification meta
  - [x] Naver Search Advisor verification meta

## 2) Google Search Console (Recommended Order)
1. Open: https://search.google.com/search-console/about
2. Add property (`URL prefix` or `Domain`) for `https://product-builder-lecture-4ec.pages.dev`
3. Verify ownership (meta tag already in place)
4. Submit sitemap:
   - `https://product-builder-lecture-4ec.pages.dev/sitemap.xml`
5. Use URL Inspection and request indexing for priority pages:
   - `/`
   - `/explore`
   - `/course`
   - `/kcontent`
   - `/kcontent-result`
6. Monitor `Pages` and `Enhancements` reports for 7-14 days

## 3) Naver Search Advisor (Recommended Order)
1. Open: https://searchadvisor.naver.com/guide/seo-basic-intro
2. Register site and verify ownership (meta tag already in place)
3. Submit sitemap:
   - `https://product-builder-lecture-4ec.pages.dev/sitemap.xml`
4. (Optional but recommended) submit feed:
   - `https://product-builder-lecture-4ec.pages.dev/rss.xml`
5. Request collection/re-crawl for key URLs:
   - `/`
   - `/explore`
   - `/course`
   - `/kcontent`

## 4) Weekly Ops Checklist
- [ ] Update `sitemap.xml` `lastmod` when meaningful content changes
- [ ] Check for crawl errors (404/redirect loops)
- [ ] Keep title/description unique per page
- [ ] Verify mobile usability after UI changes
- [ ] Re-submit priority URLs after major IA/content updates

## 5) Current Notes
- Site redirects `.html` paths to extensionless routes with HTTP 308.
- Canonical URLs were aligned to extensionless routes to reduce duplicate indexing signals.
- `User-agent: Yeti` allowance added for Naver crawler clarity.
