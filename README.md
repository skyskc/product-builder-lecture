# GoSeoul

서울 여행 추천 사이트 정적 운영 버전입니다.

## 1) 환경변수 설정 (선택)

`.env.example`를 참고해 `.env` 파일을 만드세요.

```env
GOOGLE_PLACES_API_KEY=your_server_side_google_places_api_key
PORT=3000
```

- 정적 모드만 운영하면 API 키 없이도 페이지는 정상 동작합니다.
- 실시간 API를 다시 켤 때만 `GOOGLE_PLACES_API_KEY`가 필요합니다.

## 2) 실행

```bash
npm start
```

브라우저에서 `http://localhost:3000` 접속.

## 3) 정적 데이터 동작 (기본)

- 장소 상세 페이지는 코드에 포함된 정적 평점/리뷰/설명 데이터를 사용합니다.
- 홈 추천 카드 이미지는 프로젝트에 포함된 기본 이미지를 사용합니다.
- 외부 Places API 호출 없이 동일한 UI 흐름으로 동작합니다.

## 4) 현재 페이지 구성

- `index.html`: 서울 추천 장소 목록
- `place.html`: 장소 상세(지도/평점/리뷰)
- `partner.html`: Formspree 제휴문의
- `comments.html`: Disqus 댓글
- `server.js`: 정적 파일 + Google Places API 백엔드

## 5) AdSense `ads.txt` 점검 체크

애드센스에서 `ads.txt 파일을 찾을 수 없음`이 뜨면 아래를 확인하세요.

1. 실제 심사 도메인 루트에서 열리는지 확인  
   - `https://심사도메인/ads.txt`
2. 동일 내용이 `.well-known` 경로에서도 열리는지 확인  
   - `https://심사도메인/.well-known/ads.txt`
3. 캐시 반영 대기  
   - 파일 반영 후 AdSense 크롤러 갱신까지 보통 24~72시간 소요될 수 있습니다.
4. GitHub Pages 프로젝트 경로 사용 시 주의  
   - `https://username.github.io/repo` 형태면 `ads.txt`가 `/repo/ads.txt`에만 생겨, AdSense가 요구하는 루트(`/ads.txt`)와 다를 수 있습니다.
   - 이 경우 커스텀 도메인 루트(예: `https://product-builder-lecture-4ec.pages.dev/ads.txt`)로 배포하는 방식이 안전합니다.

## 6) Budget 결과 저장

홈의 Budget Game은 실행 결과를 브라우저 로컬 저장소에 최대 10개까지 저장합니다.

### 동작 확인

1. 홈에서 Budget Game 실행
2. `Save Result` 클릭
3. 카드 하단 저장 목록에서 저장된 결과 확인

## 7) 배포/SEO 자동 점검

```bash
npm run deploy:live-check
npm run seo:recrawl-check
```

- `deploy:live-check`: 라이브 사이트가 최신 배포(스크립트 defer, GEO/FAQ 섹션, 구조화데이터)까지 반영됐는지 확인
- `seo:recrawl-check`: 주요 URL의 canonical/hreflang/OG/Twitter/JSON-LD/robots/sitemap 상태 점검

Cloudflare Pages 반영이 늦거나 실패할 때는 `CLOUDFLARE_PAGES_DEBUG.md`를 확인하세요.

SEO 재크롤링 이후 24~48시간 운영 모니터링은 `SEO_MONITORING_PLAYBOOK_24_48H_2026-02-19.md`를 사용하세요.
