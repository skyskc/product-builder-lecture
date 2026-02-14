const https = require('https');
const http = require('http');

const SITE_URL = (process.argv[2] || process.env.SITE_URL || '').replace(/\/+$/, '');
const PUB_ID = 'pub-1001204090329044';

if (!SITE_URL) {
  console.error('Usage: node tools/adsense-live-check.js https://your-domain.com');
  process.exit(1);
}

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
    req.setTimeout(10000, () => req.destroy(new Error(`timeout: ${url}`)));
  });
}

async function run() {
  const checks = [];
  const home = await fetchText(`${SITE_URL}/`);
  const terms = await fetchText(`${SITE_URL}/terms.html`);
  const ads = await fetchText(`${SITE_URL}/ads.txt`);
  const adsWellKnown = await fetchText(`${SITE_URL}/.well-known/ads.txt`);
  const robots = await fetchText(`${SITE_URL}/robots.txt`);
  const sitemap = await fetchText(`${SITE_URL}/sitemap.xml`);

  checks.push({
    name: 'Home reachable',
    ok: home.status >= 200 && home.status < 400,
    detail: `status=${home.status}`
  });
  checks.push({
    name: '/terms.html reachable',
    ok: terms.status === 200,
    detail: `status=${terms.status}`
  });
  checks.push({
    name: 'AdSense script present in home',
    ok: home.body.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js') && home.body.includes(PUB_ID),
    detail: 'home HTML includes script + publisher id'
  });
  checks.push({
    name: 'Home links to policy pages',
    ok: home.body.includes('href=\"about.html\"')
      && home.body.includes('href=\"editorial.html\"')
      && home.body.includes('href=\"terms.html\"')
      && home.body.includes('href=\"privacy.html\"'),
    detail: 'about/editorial/terms/privacy links exist'
  });
  checks.push({
    name: '/ads.txt reachable',
    ok: ads.status === 200,
    detail: `status=${ads.status}`
  });
  checks.push({
    name: '/ads.txt contains publisher',
    ok: ads.body.includes(`google.com, ${PUB_ID}, DIRECT, f08c47fec0942fa0`),
    detail: 'publisher line exists'
  });
  checks.push({
    name: '/.well-known/ads.txt reachable',
    ok: adsWellKnown.status === 200,
    detail: `status=${adsWellKnown.status}`
  });
  checks.push({
    name: '/robots.txt reachable',
    ok: robots.status === 200,
    detail: `status=${robots.status}`
  });
  checks.push({
    name: '/sitemap.xml reachable',
    ok: sitemap.status === 200 && /<urlset/i.test(sitemap.body),
    detail: `status=${sitemap.status}`
  });
  checks.push({
    name: 'robots allows AdsBot-Google',
    ok: /AdsBot-Google/i.test(robots.body) && /Allow:\s*\//i.test(robots.body),
    detail: 'AdsBot-Google allow rule'
  });

  const failed = checks.filter((c) => !c.ok);
  console.log(`=== AdSense Live Check: ${SITE_URL} ===`);
  checks.forEach((c) => {
    console.log(`${c.ok ? 'OK ' : 'FAIL'} - ${c.name} (${c.detail})`);
  });
  console.log(`\nSummary: ${checks.length - failed.length}/${checks.length} passed`);
  process.exit(failed.length ? 1 : 0);
}

run().catch((err) => {
  console.error(`Live check error: ${err.message}`);
  process.exit(1);
});
