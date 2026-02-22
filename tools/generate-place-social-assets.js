const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const mainJsPath = path.join(ROOT, "main.js");
const mainJs = fs.readFileSync(mainJsPath, "utf8");

function extractArrayLiteral(source, varName) {
  const marker = `const ${varName} = [`;
  const start = source.indexOf(marker);
  if (start < 0) throw new Error(`Could not find ${varName}`);
  const arrayStart = source.indexOf("[", start);
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let prev = "";
  for (let i = arrayStart; i < source.length; i++) {
    const ch = source[i];
    if (!inSingle && !inDouble && !inTemplate) {
      if (ch === "[") depth++;
      if (ch === "]") {
        depth--;
        if (depth === 0) {
          return source.slice(arrayStart, i + 1);
        }
      }
      if (ch === "'") inSingle = true;
      else if (ch === '"') inDouble = true;
      else if (ch === "`") inTemplate = true;
    } else {
      if (inSingle && ch === "'" && prev !== "\\") inSingle = false;
      if (inDouble && ch === '"' && prev !== "\\") inDouble = false;
      if (inTemplate && ch === "`" && prev !== "\\") inTemplate = false;
    }
    prev = ch;
  }
  throw new Error(`Unterminated array literal for ${varName}`);
}

const placeSeedsLiteral = extractArrayLiteral(mainJs, "PLACE_SEEDS");
const PLACE_SEEDS = Function(`return (${placeSeedsLiteral});`)();

const styleVisual = {
  history: { bg1: "#1a1f36", bg2: "#6f4e37", accent: "#f59e0b", motif: "PALACE" },
  shopping: { bg1: "#0f172a", bg2: "#831843", accent: "#f472b6", motif: "TREND" },
  night: { bg1: "#020617", bg2: "#1d4ed8", accent: "#38bdf8", motif: "NIGHT" },
  nature: { bg1: "#052e16", bg2: "#14532d", accent: "#4ade80", motif: "PARK" },
  family: { bg1: "#172554", bg2: "#0f766e", accent: "#22d3ee", motif: "FAMILY" },
  art: { bg1: "#111827", bg2: "#7c2d12", accent: "#fb923c", motif: "ART" },
  local: { bg1: "#1f2937", bg2: "#7c2d12", accent: "#f97316", motif: "LOCAL" }
};

const fallbackVisual = { bg1: "#0f172a", bg2: "#7c2d12", accent: "#ff5833", motif: "SEOUL" };

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;");
}

function wrapText(text, maxChars) {
  const out = [];
  let line = "";
  for (const ch of text) {
    const next = line + ch;
    if (next.length > maxChars) {
      out.push(line);
      line = ch;
    } else {
      line = next;
    }
  }
  if (line) out.push(line);
  return out.slice(0, 2);
}

const ogDir = path.join(ROOT, "assets", "og", "places");
const shareDir = path.join(ROOT, "share", "places");
fs.mkdirSync(ogDir, { recursive: true });
fs.mkdirSync(shareDir, { recursive: true });

for (let index = 0; index < PLACE_SEEDS.length; index++) {
  const seed = PLACE_SEEDS[index];
  const id = `place-${String(index + 1).padStart(3, "0")}`;
  const style = Array.isArray(seed.styles) && seed.styles[0] ? seed.styles[0] : "";
  const visual = styleVisual[style] || fallbackVisual;
  const titleLines = wrapText(seed.name, 12);
  const subtitle = `${seed.district} · ${seed.category}`;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(seed.name)} social card">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${visual.bg1}"/>
      <stop offset="100%" stop-color="${visual.bg2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.8" cy="0.15" r="0.8">
      <stop offset="0%" stop-color="${visual.accent}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${visual.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <circle cx="1090" cy="110" r="160" fill="${visual.accent}" fill-opacity="0.12"/>
  <circle cx="170" cy="560" r="180" fill="#ffffff" fill-opacity="0.05"/>
  <rect x="52" y="52" width="1096" height="526" rx="28" fill="#ffffff" fill-opacity="0.04" stroke="#ffffff" stroke-opacity="0.12"/>
  <text x="86" y="122" fill="#ffffff" fill-opacity="0.85" font-family="Noto Sans KR, Arial, sans-serif" font-size="28" font-weight="700">GoSeoul · Place Detail</text>
  <text x="86" y="176" fill="${visual.accent}" font-family="Space Grotesk, Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="2">${esc(visual.motif)}</text>
  ${titleLines.map((line, i) => `<text x="86" y="${270 + i * 86}" fill="#ffffff" font-family="Noto Sans KR, Arial, sans-serif" font-size="72" font-weight="800">${esc(line)}</text>`).join("\n  ")}
  <text x="86" y="430" fill="#dbeafe" font-family="Noto Sans KR, Arial, sans-serif" font-size="34" font-weight="600">${esc(subtitle)}</text>
  <text x="86" y="490" fill="#cbd5e1" font-family="Space Grotesk, Arial, sans-serif" font-size="24">Seoul travel route · map-ready · itinerary support</text>
  <text x="86" y="548" fill="#ffffff" fill-opacity="0.78" font-family="Space Grotesk, Arial, sans-serif" font-size="22">https://goseoul.space/place?id=${id}</text>
  <text x="1060" y="548" text-anchor="end" fill="#ffffff" fill-opacity="0.8" font-family="Space Grotesk, Arial, sans-serif" font-size="22">${id.toUpperCase()}</text>
</svg>`;

  fs.writeFileSync(path.join(ogDir, `${id}.svg`), svg);

  const title = `${seed.name} | 서울 ${seed.category} | GoSeoul`;
  const desc = `${seed.district}의 ${seed.category} 여행지 ${seed.name}. 지도 링크, 방문 팁, 동선 계획용 정보를 GoSeoul에서 확인하세요.`;
  const canonical = `https://goseoul.space/place?id=${id}`;
  const shareUrl = `https://goseoul.space/share/places/${id}.html`;
  const ogImage = `https://goseoul.space/assets/og/places/${id}.svg`;

  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="robots" content="noindex,follow,max-image-preview:large">
  <meta name="description" content="${esc(desc)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="GoSeoul">
  <meta property="og:locale" content="ko_KR">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${shareUrl}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:type" content="image/svg+xml">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(desc)}">
  <meta name="twitter:image" content="${ogImage}">
  <meta http-equiv="refresh" content="0; url=${canonical}">
  <script>location.replace(${JSON.stringify(canonical)});</script>
</head>
<body>
  <p><a href="${canonical}">Go to place detail</a></p>
</body>
</html>`;

  fs.writeFileSync(path.join(shareDir, `${id}.html`), html);
}

console.log(`Generated ${PLACE_SEEDS.length} OG SVGs and share pages.`);
