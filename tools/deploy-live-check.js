const https = require('https');
const http = require('http');

const SITE_URL = (process.argv[2] || process.env.SITE_URL || 'https://goseoul.space').replace(/\/+$/, '');

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

async function run() {
  const checks = [];
  const home = await fetchText(`${SITE_URL}/`);
  const explore = await fetchText(`${SITE_URL}/explore`);
  const mainJs = await fetchText(`${SITE_URL}/main.js`);

  checks.push({
    name: 'Home reachable',
    ok: home.status === 200,
    detail: `status=${home.status}`
  });
  checks.push({
    name: 'Explore reachable',
    ok: explore.status === 200,
    detail: `status=${explore.status}`
  });
  checks.push({
    name: 'main.js reachable',
    ok: mainJs.status === 200,
    detail: `status=${mainJs.status}`
  });

  checks.push({
    name: 'Home uses deferred main.js',
    ok: /<script src="main\.js" defer><\/script>/i.test(home.body),
    detail: 'expects non-blocking script tag'
  });
  checks.push({
    name: 'Home has LCP preload',
    ok: /rel="preload"[^>]*assets\/home\/gyeongbokgung\.jpg/i.test(home.body),
    detail: 'expects preload for hero image'
  });
  checks.push({
    name: 'Explore has GEO panel markup',
    ok: /id="geo-panel-title"/i.test(explore.body),
    detail: 'expects geo coverage section'
  });
  checks.push({
    name: 'Explore has FAQ panel markup',
    ok: /id="faq-panel-title"/i.test(explore.body),
    detail: 'expects FAQ section'
  });
  checks.push({
    name: 'Explore has TouristDestination schema',
    ok: /"@type":\s*"TouristDestination"/i.test(explore.body),
    detail: 'expects GEO schema'
  });
  checks.push({
    name: 'Explore has FAQPage schema',
    ok: /"@type":\s*"FAQPage"/i.test(explore.body),
    detail: 'expects FAQ schema'
  });
  checks.push({
    name: 'main.js contains district geo map',
    ok: /const DISTRICT_GEO_COORDS\s*=\s*\{/i.test(mainJs.body),
    detail: 'expects geo coordinate map'
  });

  const failed = checks.filter((c) => !c.ok);
  console.log(`=== Deploy Live Check: ${SITE_URL} ===`);
  checks.forEach((c) => {
    console.log(`${c.ok ? 'OK  ' : 'FAIL'} - ${c.name} (${c.detail})`);
  });
  console.log(`\nSummary: ${checks.length - failed.length}/${checks.length} passed`);

  if (failed.length) {
    console.log('\nInference: live deployment is likely behind the latest GitHub commit or build settings are mismatched.');
    console.log('Check Cloudflare Pages project settings: repository, branch(main), build command, output directory, and latest deployment logs.');
    process.exit(1);
  }
}

run().catch((err) => {
  console.error(`Live check error: ${err.message}`);
  process.exit(1);
});
