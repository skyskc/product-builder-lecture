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
