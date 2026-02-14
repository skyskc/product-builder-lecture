const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const REQUIRED_PAGES = [
  'index.html',
  'place.html',
  'course.html',
  'partner.html',
  'comments.html',
  'about.html',
  'editorial.html',
  'privacy.html'
];

const REQUIRED_FOOTER_LINKS = ['about.html', 'editorial.html', 'privacy.html'];
const ADSENSE_SNIPPET = 'pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
const MIN_VISIBLE_WORDS = 90;

function readText(filePath) {
  return fs.readFileSync(path.join(ROOT, filePath), 'utf8');
}

function exists(filePath) {
  return fs.existsSync(path.join(ROOT, filePath));
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function countWords(text) {
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

function testRegex(content, regex) {
  return regex.test(content);
}

function checkHtml(file, report) {
  const html = readText(file);
  const plainText = stripTags(html);
  const wordCount = countWords(plainText);

  if (!testRegex(html, /<title>[^<]{8,}<\/title>/i)) {
    report.fails.push(`${file}: <title> missing or too short`);
  }
  if (!testRegex(html, /<meta\s+name="description"\s+content="[^"]{40,}"/i)) {
    report.fails.push(`${file}: meta description missing or too short (>=40 chars recommended)`);
  }
  if (!testRegex(html, /<h1[^>]*>[\s\S]*?<\/h1>/i)) {
    report.fails.push(`${file}: missing <h1>`);
  }
  if (wordCount < MIN_VISIBLE_WORDS) {
    report.warnings.push(`${file}: low visible text volume (${wordCount} words, target >= ${MIN_VISIBLE_WORDS})`);
  }

  if (REQUIRED_PAGES.includes(file)) {
    REQUIRED_FOOTER_LINKS.forEach((link) => {
      if (!html.includes(`href="${link}"`)) {
        report.fails.push(`${file}: footer/policy link missing -> ${link}`);
      }
    });
  }

  if (file !== 'ads.txt' && !html.includes(ADSENSE_SNIPPET)) {
    report.warnings.push(`${file}: AdSense script not found in <head>`);
  }
}

function checkAdsTxt(report) {
  if (!exists('ads.txt')) {
    report.fails.push('ads.txt missing');
    return;
  }
  const ads = readText('ads.txt').trim();
  if (!/^google\.com,\s*pub-\d+,\s*DIRECT,\s*f08c47fec0942fa0$/i.test(ads)) {
    report.warnings.push('ads.txt format unexpected (verify publisher id and format)');
  }

  if (!exists('.well-known/ads.txt')) {
    report.warnings.push('.well-known/ads.txt missing (optional but recommended for crawler compatibility)');
  }
}

function checkRobots(report) {
  if (!exists('robots.txt')) {
    report.warnings.push('robots.txt missing');
    return;
  }
  const robots = readText('robots.txt');
  if (!/AdsBot-Google/i.test(robots) || !/Allow:\s*\/$/m.test(robots)) {
    report.warnings.push('robots.txt should explicitly allow AdsBot-Google');
  }
}

function checkServiceIntegrations(report) {
  const partner = exists('partner.html') ? readText('partner.html') : '';
  const comments = exists('comments.html') ? readText('comments.html') : '';
  const mainJs = exists('main.js') ? readText('main.js') : '';

  if (!partner.includes('formspree.io/f/xpqjdavl')) {
    report.warnings.push('partner.html: Formspree endpoint not found');
  }
  if (!mainJs.includes('product-builder-lecture-2.disqus.com/embed.js')) {
    report.warnings.push('main.js: Disqus embed script not found');
  }
  if (comments && !testRegex(comments, /id="disqus_thread"/i)) {
    report.warnings.push('comments.html: #disqus_thread container missing');
  }
}

function run() {
  const report = {
    fails: [],
    warnings: [],
    passed: []
  };

  REQUIRED_PAGES.forEach((page) => {
    if (!exists(page)) {
      report.fails.push(`${page}: file missing`);
    } else {
      report.passed.push(`${page}: exists`);
      checkHtml(page, report);
    }
  });

  checkAdsTxt(report);
  checkRobots(report);
  checkServiceIntegrations(report);

  console.log('=== AdSense Readiness Report ===');
  console.log(`Passed checks: ${report.passed.length}`);
  console.log(`Warnings: ${report.warnings.length}`);
  console.log(`Failures: ${report.fails.length}`);

  if (report.fails.length) {
    console.log('\n[FAIL]');
    report.fails.forEach((item) => console.log(`- ${item}`));
  }
  if (report.warnings.length) {
    console.log('\n[WARN]');
    report.warnings.forEach((item) => console.log(`- ${item}`));
  }
  if (!report.fails.length && !report.warnings.length) {
    console.log('\nAll checks passed.');
  }

  process.exit(report.fails.length ? 1 : 0);
}

run();
