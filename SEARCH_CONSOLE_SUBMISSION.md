# Google Search Console Submission Pack

## 0) 소유권 검증 토큰 입력 (필수)
- `index.html`의 아래 메타 태그 값을 각 콘솔에서 발급받은 실제 토큰으로 교체:
  - `google-site-verification`
  - `naver-site-verification`
- 토큰 반영 후 배포해야 검증이 완료됩니다.

## 1) Sitemap 제출
- Search Console 속성: `https://goseoul.space`
- 제출 URL:
  - `https://goseoul.space/sitemap.xml`

## 2) 우선 인덱싱 요청 (URL 검사)
아래 우선 URL부터 URL 검사 후 `색인 생성 요청`을 진행하세요.
- 홈: `https://goseoul.space/`
- 한글 홈: `https://goseoul.space/?lang=ko`
- 코스: `https://goseoul.space/course.html`
- 한글 코스: `https://goseoul.space/course.html?lang=ko`
- 정책 페이지:
  - `https://goseoul.space/about.html`
  - `https://goseoul.space/editorial.html`
  - `https://goseoul.space/privacy.html`
- 상세 페이지 우선 목록: `search-console-priority-urls.txt` 참고

## 3) 2~7일 모니터링 체크
- 성능 > 검색결과:
  - 쿼리 증가 여부 (`seoul`, `korea travel`, `seoul itinerary` 등)
  - 노출수/평균순위/CTR 변화
- 색인 > 페이지:
  - 크롤링됨 - 현재 색인 안 됨 비율
  - 중복/리디렉션/robots 차단 여부
- 개선 필요 시:
  - 제목/설명 개선
  - 내부링크 강화 (홈/코스에서 상세로 연결)
  - 신규 장소 상세 페이지 재요청

## 4) Naver Search Advisor 제출
- 웹마스터도구에서 사이트 추가: `https://goseoul.space`
- 소유확인: `index.html` 메타 태그 방식
- 사이트맵 제출: `https://goseoul.space/sitemap.xml`
- robots 제출: `https://goseoul.space/robots.txt`
