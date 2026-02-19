const https = require('https');
const http = require('http');

const SITE_URL = (process.argv[2] || process.env.SITE_URL || 'https://product-builder-lecture-4ec.pages.dev').replace(/\/+$/, '');
const REQUIRED_HREFLANGS = ['ko', 'en', 'x-default'];

const URLS = [
  '/',
  '/explore',
  '/course',
  '/generation',
  '/kcontent',
  '/kcontent-result',
  '/comments',
  '/about',
  '/editorial',
  '/terms',
  '/privacy',
  '/partner',
  '/place?id=place-001'
];

function fetchText(url, depth = 0) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https://') ? https : http;
    const req = client.get(url, (res) => {
      const location = res.headers.location;
      if (location && [301, 302, 307, 308].includes(res.statusCode || 0) && depth < 5) {
        const nextUrl = new URL(location, url).toString();
        res.resume();
        fetchText(nextUrl, depth + 1).then(resolve).catch(reject);
        return;
      }
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve({ status: res.statusCode || 0, body: data, headers: res.headers }));
    });
    req.on('error', reject);
    req.setTimeout(12000, () => req.destroy(new Error(`timeout: ${url}`)));
  });
}

function hasCanonical(body) {
  return /<link[^>]+rel="canonical"[^>]*>/i.test(body);
}

function hasMetaDescription(body) {
  return /<meta[^>]+name="description"[^>]*content="[^"]+"/i.test(body);
}

function hasOgAndTwitter(body) {
  return /property="og:title"/i.test(body) && /name="twitter:title"/i.test(body);
}

function hasStructuredData(body) {
  return /type="application\/ld\+json"/i.test(body);
}

function missingHreflangs(body) {
  const missing = [];
  for (const lang of REQUIRED_HREFLANGS) {
    const pattern = new RegExp(`rel="alternate"[^>]+hreflang="${lang}"`, 'i');
    if (!pattern.test(body)) missing.push(lang);
  }
  return missing;
}

async function checkPage(pathname) {
  const url = `${SITE_URL}${pathname}`;
  const res = await fetchText(url);
  const issues = [];

  if (res.status !== 200) {
    issues.push(`status=${res.status}`);
    return { url, ok: false, issues };
  }
  if (!hasCanonical(res.body)) issues.push('missing canonical');
  if (!hasMetaDescription(res.body)) issues.push('missing meta description');
  if (!hasOgAndTwitter(res.body)) issues.push('missing og/twitter title');
  if (!hasStructuredData(res.body)) issues.push('missing JSON-LD');
  const missingLangs = missingHreflangs(res.body);
  if (missingLangs.length) issues.push(`missing hreflang: ${missingLangs.join(', ')}`);

  return { url, ok: issues.length === 0, issues };
}

async function run() {
  const checks = [];

  const [robots, sitemap, home] = await Promise.all([
    fetchText(`${SITE_URL}/robots.txt`),
    fetchText(`${SITE_URL}/sitemap.xml`),
    fetchText(`${SITE_URL}/`)
  ]);

  checks.push({
    name: 'robots.txt reachable',
    ok: robots.status === 200,
    detail: `status=${robots.status}`
  });
  checks.push({
    name: 'robots lists sitemap.xml',
    ok: /sitemap:\s*https?:\/\/.+\/sitemap\.xml/i.test(robots.body),
    detail: 'expects sitemap reference'
  });
  checks.push({
    name: 'sitemap.xml reachable',
    ok: sitemap.status === 200 && /<urlset/i.test(sitemap.body),
    detail: `status=${sitemap.status}`
  });
  checks.push({
    name: 'home has max-image-preview:large',
    ok: /name="robots"[^>]+max-image-preview:large/i.test(home.body),
    detail: 'image preview policy'
  });

  const pageResults = [];
  for (const path of URLS) {
    // eslint-disable-next-line no-await-in-loop
    const result = await checkPage(path);
    pageResults.push(result);
  }

  console.log(`=== SEO Recrawl Check: ${SITE_URL} ===`);
  checks.forEach((c) => {
    console.log(`${c.ok ? 'OK  ' : 'FAIL'} - ${c.name} (${c.detail})`);
  });

  console.log('\n--- Page-level checks ---');
  pageResults.forEach((row) => {
    if (row.ok) console.log(`OK   - ${row.url}`);
    else console.log(`FAIL - ${row.url} (${row.issues.join('; ')})`);
  });

  const failed = checks.filter((c) => !c.ok).length + pageResults.filter((r) => !r.ok).length;
  const passed = checks.length + pageResults.length - failed;
  console.log(`\nSummary: ${passed}/${checks.length + pageResults.length} passed`);

  console.log('\nSearch Console recrawl priority:');
  console.log(`${SITE_URL}/`);
  console.log(`${SITE_URL}/explore`);
  console.log(`${SITE_URL}/course`);
  console.log(`${SITE_URL}/place?id=place-001`);
  console.log(`${SITE_URL}/kcontent`);
  console.log(`${SITE_URL}/generation`);
  console.log(`${SITE_URL}/about`);
  console.log(`${SITE_URL}/editorial`);
  console.log(`${SITE_URL}/terms`);
  console.log(`${SITE_URL}/privacy`);

  process.exit(failed ? 1 : 0);
}

run().catch((err) => {
  console.error(`SEO recrawl check error: ${err.message}`);
  process.exit(1);
});
