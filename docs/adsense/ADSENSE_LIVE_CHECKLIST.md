# AdSense 실서버 점검표

## 1) 필수 URL 확인
- `https://도메인/`
- `https://도메인/ads.txt`
- `https://도메인/.well-known/ads.txt`
- `https://도메인/robots.txt`

## 2) 자동 점검 실행
```bash
npm run adsense:live-check -- https://도메인
```

예시:
```bash
npm run adsense:live-check -- https://product-builder-lecture-4ec.pages.dev
```

## 3) 통과 기준
- 홈 HTML에 AdSense 스크립트 + `ca-pub-1001204090329044` 포함
- `/ads.txt`가 `200` 응답
- `/ads.txt`에 아래 한 줄 정확히 포함
  - `google.com, pub-1001204090329044, DIRECT, f08c47fec0942fa0`
- `robots.txt`에 `AdsBot-Google` 허용 규칙 포함

## 4) AdSense 콘솔에 "찾을 수 없음"이 계속 뜰 때
- AdSense 등록 도메인과 실제 배포 도메인이 같은지 확인
- Cloudflare/CDN 캐시가 있으면 `/ads.txt` 캐시 비우기
- 반영 후 24~72시간 재크롤링 대기
- `username.github.io/repo` 형태라면 루트 경로 불일치 가능성 점검
