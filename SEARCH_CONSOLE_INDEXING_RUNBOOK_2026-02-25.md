# Search Console Indexing Runbook (2026-02-25)

목표: `place.html?id=...` 중심 색인 신호를 `https://goseoul.space/places/place-XXX.html` 정적 상세 페이지로 전환

## 배포 전 확인
- `places/` 디렉터리 생성됨 (`place-001.html` ~ `place-130.html`)
- `sitemap.xml`에 `https://goseoul.space/places/place-001.html` 형식 URL 포함
- `place.html`이 `noindex,follow` 상태
- 내부 링크가 `/places/*.html`로 이동

## Search Console 제출 순서 (수동)
1. `sitemap.xml` 재제출
2. URL 검사에서 아래 우선 URL 제출
3. 색인 생성 상태(크롤링됨/색인 생성됨)를 3~7일 관찰
4. `place?id=` URL이 색인되면 제거/대체 신호 모니터링

## 우선 제출 URL (Top priority)
참고 파일: `search-console-priority-urls.txt`

특히 먼저 넣을 것:
- `https://goseoul.space/`
- `https://goseoul.space/explore`
- `https://goseoul.space/places/place-001.html`
- `https://goseoul.space/places/place-014.html`
- `https://goseoul.space/places/place-058.html`
- `https://goseoul.space/editorial`
- `https://goseoul.space/about`
- `https://goseoul.space/privacy`

## 확인 포인트
- URL 검사 결과에서 "사용자 선언 canonical"이 `/places/*.html`로 잡히는지 확인
- 페이지 HTML 소스에서 본문이 초기 응답에 포함되는지 확인
- `place.html` 템플릿 페이지는 `noindex` 유지
- `share/places/*.html`는 공유용 메타 페이지(`noindex`)로 유지

## 문제 발생 시 체크
- `/places/*.html` 경로가 200 응답인지
- robots 차단 여부 (`robots.txt`, meta robots)
- sitemap 재배포 누락 여부
- 배포 캐시로 이전 HTML이 남아 있는지
