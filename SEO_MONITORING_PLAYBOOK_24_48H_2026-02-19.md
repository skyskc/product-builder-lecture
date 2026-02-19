# GoSeoul SEO Monitoring Playbook (24h / 48h)

Date: 2026-02-19  
Site: https://goseoul.space

## 0) Start Baseline (T+0)

Run:

```bash
npm run deploy:live-check -- https://goseoul.space
npm run seo:recrawl-check -- https://goseoul.space
```

- 기록: `deploy:live-check` 결과 `10/10`
- 기록: `seo:recrawl-check` 결과 `17/17`
- Search Console에서 우선 URL `색인 생성 요청` 실행

## 1) Priority URL Set

- `https://goseoul.space/`
- `https://goseoul.space/explore`
- `https://goseoul.space/course`
- `https://goseoul.space/place?id=place-001`
- `https://goseoul.space/kcontent`
- `https://goseoul.space/generation`
- `https://goseoul.space/about`
- `https://goseoul.space/editorial`
- `https://goseoul.space/terms`
- `https://goseoul.space/privacy`

## 2) Monitoring Log Template

아래 표를 T+24h, T+48h에 각각 기록:

| Checkpoint | Coverage (Indexed / Submitted) | Crawled - currently not indexed | 404/5xx | Avg Position | Impressions | Clicks | CTR |
|---|---:|---:|---:|---:|---:|---:|---:|
| T+24h |  |  |  |  |  |  |  |
| T+48h |  |  |  |  |  |  |  |

권장 기록 소스:
- Google Search Console > Indexing > Pages
- Google Search Console > Performance > Search results

## 3) URL Inspection Log (Priority URLs)

| URL | Requested at (KST) | Last crawl | Indexing status | Canonical selected by Google | Action |
|---|---|---|---|---|---|
| / |  |  |  |  |  |
| /explore |  |  |  |  |  |
| /course |  |  |  |  |  |
| /place?id=place-001 |  |  |  |  |  |
| /kcontent |  |  |  |  |  |
| /generation |  |  |  |  |  |
| /about |  |  |  |  |  |
| /editorial |  |  |  |  |  |
| /terms |  |  |  |  |  |
| /privacy |  |  |  |  |  |

## 4) Alert Rules (24h/48h)

### A. 즉시 대응(High)
- `deploy:live-check`에서 `FAIL` 1개 이상
- `robots.txt` 또는 `sitemap.xml` 접근 실패
- 중요한 페이지가 `noindex`로 노출

대응:
1. 배포 재확인(Cloudflare Pages latest deployment SHA)
2. 재배포 후 `deploy:live-check` 재실행
3. URL Inspection 재요청

### B. 주의(Medium)
- `Crawled - currently not indexed` 비중이 48시간 내 증가
- Priority URL이 여전히 미색인

대응:
1. 해당 URL 내부 링크 강화(홈/관련 허브에서 링크)
2. 동일 주제 중복 페이지 메타/타이틀 차별화
3. 변경 후 해당 URL만 재요청

### C. 관찰(Low)
- 노출/클릭/CTR 변동이 작음(초기 48h는 흔함)

대응:
1. 7일 누적으로 추세 판단
2. 쿼리 데이터 확보 후 제목/설명 A/B 개선

## 5) 48h 종료 판단

아래 조건 충족 시 정상 진행으로 판단:
- 기술 점검 유지: `deploy:live-check 10/10`, `seo:recrawl-check 17/17`
- Priority URL 중 다수가 `Indexed` 상태로 전환 시작
- 심각 오류(robots/sitemap/noindex/5xx) 없음

## 6) 7일 확장 운영(권장)

48h 이후 7일 동안:
- 하루 1회 `seo:recrawl-check` 실행
- Search Console에서 쿼리 상위 20개 기록
- `/explore`, `/course`, `/place` CTR 개선 문구 테스트(제목/설명)
