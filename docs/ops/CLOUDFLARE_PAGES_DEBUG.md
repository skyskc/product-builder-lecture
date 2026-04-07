# Cloudflare Pages 배포 디버그 가이드

기준일: 2026-02-19

현재 상태 요약:
- GitHub `main` 최신 커밋은 반영됨
- 라이브 `https://goseoul.space`는 최신 마크업 일부가 미반영
- 즉, 코드 푸시는 성공했지만 Pages 배포가 뒤처졌거나 설정 불일치 가능성이 높음

## 1) 먼저 로컬에서 상태 확인

```bash
npm run deploy:live-check
```

모든 항목이 `OK`가 아니면 Cloudflare Pages 대시보드 확인이 필요합니다.

## 2) Cloudflare Pages 대시보드 확인 순서

1. `Workers & Pages > 해당 프로젝트 > Deployments`
2. 최신 배포가 `main` 브랜치에서 생성됐는지 확인
3. 최신 커밋 SHA가 GitHub `main` HEAD와 같은지 확인
4. 실패 배포가 있으면 로그에서 에러 확인

## 3) 설정 불일치 체크

`Settings > Builds & deployments`에서 아래 확인:

- Production branch: `main`
- Build command: 정적 사이트면 비워두거나 실제 명령과 일치
- Build output directory: 정적 루트면 `/` 또는 설정값이 프로젝트 구조와 일치
- Root directory: 저장소 루트(`/home/user/productphoto` 기준)와 일치

## 4) 캐시/재배포

1. `Deployments`에서 `Retry deployment` 실행
2. 필요 시 `Clear build cache` 후 재배포
3. 1~3분 후 다시 확인:

```bash
npm run deploy:live-check
```

## 5) GitHub 연동 체크

- Cloudflare Pages에 연결된 GitHub 저장소가 `skyskc/product-builder-lecture`인지
- 브랜치 필터가 `main`인지
- GitHub 앱 권한이 revoke 되지 않았는지

## 6) Search Console 재크롤링 전 확인

```bash
npm run seo:recrawl-check
```

`OK` 기준 충족 후 아래 URL을 Search Console `URL 검사`로 재요청:
- `/`
- `/explore`
- `/course`
- `/place?id=place-001`
- `/kcontent`
- `/generation`
- `/about`
- `/editorial`
- `/terms`
- `/privacy`
