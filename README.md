# Seoul Explorer

서울 여행 추천 사이트 + Google Places 실시간 평점/리뷰 연동 예제입니다.

## 1) 환경변수 설정

`.env.example`를 참고해 `.env` 파일을 만드세요.

```env
GOOGLE_PLACES_API_KEY=your_server_side_google_places_api_key
PORT=3000
```

- `GOOGLE_PLACES_API_KEY`는 서버 전용 키로 사용하세요.
- Google Cloud에서 `Places API (New)`를 활성화해야 합니다.

## 2) 실행

```bash
npm start
```

브라우저에서 `http://localhost:3000` 접속.

## 3) 실시간 데이터 동작

- 장소 상세 페이지(`place.html?id=...`)에서 `/api/place-details?query=...` 호출
- 장소 이미지는 `/api/place-photo?query=...`로 Google Places 실제 장소 사진 조회
- 서버가 Google Places Text Search + Place Details를 호출
- 평점, 리뷰 수, 리뷰 요약을 실시간 데이터로 갱신
- 장소 사진은 Google Places Photo API 결과를 우선 사용하고 실패 시 로컬 폴백 이미지 표시
- 실패 시 페이지 기본 데이터로 자동 폴백

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
   - 이 경우 커스텀 도메인 루트(예: `https://www.skyskc.com/ads.txt`)로 배포하는 방식이 안전합니다.
