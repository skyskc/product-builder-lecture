(function () {
    const places = [
        {
            id: 'gyeongbokgung',
            name: '경복궁 (Gyeongbokgung Palace)',
            category: '역사/문화',
            district: '종로구',
            bestTime: '오전 9시 - 오후 1시',
            rating: '4.6 / 5',
            reviewCount: '57,000+',
            shortDescription: '조선 왕조의 대표 궁궐로, 서울 여행의 첫 코스로 인기 높은 장소입니다.',
            description: '근정전, 경회루 등 주요 전각과 넓은 궁궐 정원을 함께 둘러볼 수 있습니다. 한복 체험과 함께 방문하는 외국인 여행자가 많습니다.',
            image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1400&q=80',
            mapQuery: 'Gyeongbokgung Palace Seoul',
            reviews: [
                '궁궐 건축미가 뛰어나고 사진 포인트가 많다는 평가가 많습니다.',
                '광화문과 북촌, 인사동 동선과 연결하기 좋아 일정 구성에 유리합니다.',
                '영어 안내 표지와 가이드 프로그램 접근성이 좋다는 의견이 있습니다.'
            ]
        },
        {
            id: 'myeongdong',
            name: '명동 거리 (Myeong-dong)',
            category: '쇼핑/스트리트',
            district: '중구',
            bestTime: '오후 5시 - 밤 9시',
            rating: '4.4 / 5',
            reviewCount: '89,000+',
            shortDescription: '쇼핑, 길거리 음식, 환전 인프라가 밀집된 대표 관광 상권입니다.',
            description: 'K-뷰티 매장과 패션 스토어, 스트리트 푸드를 한 번에 즐길 수 있어 첫 서울 방문자에게 익숙하고 접근하기 쉬운 지역입니다.',
            image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1400&q=80',
            mapQuery: 'Myeongdong Shopping Street Seoul',
            reviews: [
                '교통 접근성이 좋아 호텔-관광지 이동이 편하다는 평가가 많습니다.',
                '저녁 시간대 분위기와 먹거리 선택지가 다양하다는 반응이 많습니다.',
                '피크타임에는 혼잡하므로 시간대를 나눠 방문하면 좋다는 후기가 있습니다.'
            ]
        },
        {
            id: 'nseoultower',
            name: 'N서울타워 (N Seoul Tower)',
            category: '전망/야경',
            district: '용산구',
            bestTime: '오후 6시 - 밤 10시',
            rating: '4.5 / 5',
            reviewCount: '76,000+',
            shortDescription: '서울 전경을 한눈에 볼 수 있는 야경 명소입니다.',
            description: '남산 케이블카 또는 도보로 접근 가능하며, 전망대에서 한강과 도심 스카이라인을 조망할 수 있어 커플 및 가족 여행자에게 인기가 높습니다.',
            image: 'https://images.unsplash.com/photo-1608403890612-8f00b6e9f54f?auto=format&fit=crop&w=1400&q=80',
            mapQuery: 'N Seoul Tower',
            reviews: [
                '야간 조명과 서울 전경이 인상적이라는 후기가 많습니다.',
                '케이블카 대기 시간을 고려해 사전 시간 계획이 필요하다는 의견이 있습니다.',
                '남산 산책과 연계하면 만족도가 높다는 반응이 많습니다.'
            ]
        },
        {
            id: 'bukchon',
            name: '북촌한옥마을 (Bukchon Hanok Village)',
            category: '전통/산책',
            district: '종로구',
            bestTime: '오전 10시 - 오후 4시',
            rating: '4.4 / 5',
            reviewCount: '31,000+',
            shortDescription: '전통 한옥 골목 풍경을 경험할 수 있는 도심 속 문화 공간입니다.',
            description: '한옥 골목과 공방, 전통 카페가 어우러져 있어 걷기 여행에 적합합니다. 경복궁, 창덕궁과 함께 묶어 방문하기 좋습니다.',
            image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1400&q=80',
            mapQuery: 'Bukchon Hanok Village Seoul',
            reviews: [
                '한국 전통 건축 분위기를 가까이서 볼 수 있다는 점이 강점으로 꼽힙니다.',
                '골목 경사가 있어 편한 신발이 필요하다는 조언이 많습니다.',
                '예절 안내를 지키며 조용히 관람하면 더 좋은 경험이 된다는 후기가 있습니다.'
            ]
        },
        {
            id: 'hongdae',
            name: '홍대 거리 (Hongdae)',
            category: '트렌드/야간',
            district: '마포구',
            bestTime: '오후 4시 - 밤 11시',
            rating: '4.5 / 5',
            reviewCount: '42,000+',
            shortDescription: '공연, 카페, 쇼핑이 결합된 젊은 분위기의 대표 상권입니다.',
            description: '버스킹, 컨셉 카페, 스트리트 브랜드 매장을 한 번에 즐길 수 있어 친구 단위 여행객이 많이 방문합니다.',
            image: 'https://images.unsplash.com/photo-1523906630133-f6934a1ab2b9?auto=format&fit=crop&w=1400&q=80',
            mapQuery: 'Hongdae Street Seoul',
            reviews: [
                '밤 시간대 활기찬 분위기를 좋아하는 여행자 만족도가 높습니다.',
                '개성 있는 카페와 편집숍 탐방에 적합하다는 평가가 많습니다.',
                '주말에는 유동인구가 많아 동선 계획이 중요하다는 의견이 있습니다.'
            ]
        }
    ];

    const placeMap = Object.fromEntries(places.map((p) => [p.id, p]));

    function getPlaceIdFromQuery() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        if (id && placeMap[id]) return id;
        return places[0].id;
    }

    function getPlaceLink(page, id) {
        return `${page}?id=${encodeURIComponent(id)}`;
    }

    function updateTopNavLinks(id) {
        const partnerLink = document.getElementById('partner-link');
        const commentsLink = document.getElementById('comments-link');
        if (partnerLink) partnerLink.href = getPlaceLink('partner.html', id);
        if (commentsLink) commentsLink.href = getPlaceLink('comments.html', id);
    }

    function initPageTransition() {
        requestAnimationFrame(() => document.body.classList.add('page-ready'));
        document.addEventListener('click', (event) => {
            const anchor = event.target.closest('a[href]');
            if (!anchor) return;
            if (anchor.target === '_blank' || anchor.hasAttribute('download')) return;
            const href = anchor.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
            const targetUrl = new URL(href, window.location.href);
            if (targetUrl.origin !== window.location.origin) return;

            event.preventDefault();
            document.body.classList.remove('page-ready');
            document.body.classList.add('page-exit');
            setTimeout(() => {
                window.location.href = targetUrl.href;
            }, 180);
        });
    }

    function renderHome() {
        const grid = document.getElementById('place-grid');
        if (!grid) return;

        const fragment = document.createDocumentFragment();
        places.forEach((place) => {
            const card = document.createElement('article');
            card.className = 'place-card';
            card.innerHTML = `
                <img src="${place.image}" alt="${place.name}">
                <div class="place-card-body">
                    <h2>${place.name}</h2>
                    <div class="place-meta">${place.category} · ${place.district} · ★ ${place.rating}</div>
                    <p class="place-desc">${place.shortDescription}</p>
                    <a class="button-link" href="${getPlaceLink('place.html', place.id)}">상세 보기</a>
                </div>
            `;
            fragment.appendChild(card);
        });
        grid.appendChild(fragment);
    }

    function formatReviewCount(count) {
        if (typeof count !== 'number') return '-';
        return `${count.toLocaleString()}+`;
    }

    async function fetchLivePlaceDetails(placeId) {
        const response = await fetch(`/api/place-details?id=${encodeURIComponent(placeId)}`);
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        const json = await response.json();
        return json.details;
    }

    function renderReviews(reviewList, reviews) {
        reviewList.innerHTML = '';
        reviews.forEach((review) => {
            const li = document.createElement('li');
            li.textContent = review;
            reviewList.appendChild(li);
        });
    }

    async function renderPlaceDetail() {
        const place = placeMap[getPlaceIdFromQuery()];
        if (!place) return;

        updateTopNavLinks(place.id);

        const nameEl = document.getElementById('place-name');
        const categoryEl = document.getElementById('place-category');
        const descEl = document.getElementById('place-description');
        const districtEl = document.getElementById('place-district');
        const bestTimeEl = document.getElementById('place-best-time');
        const ratingEl = document.getElementById('place-rating');
        const reviewCountEl = document.getElementById('place-review-count');
        const imageEl = document.getElementById('place-image');
        const mapEl = document.getElementById('place-map');
        const mapExternal = document.getElementById('map-external-link');
        const reviewList = document.getElementById('review-list');
        const dataSourceEl = document.getElementById('place-data-source');

        document.title = `${place.name} | Seoul Explorer`;
        nameEl.textContent = place.name;
        categoryEl.textContent = place.category;
        descEl.textContent = place.description;
        districtEl.textContent = place.district;
        bestTimeEl.textContent = place.bestTime;
        ratingEl.textContent = `${place.rating} (기본 데이터)`;
        reviewCountEl.textContent = `${place.reviewCount} (기본 데이터)`;
        imageEl.src = place.image;
        imageEl.alt = `${place.name} 이미지`;

        const mapQuery = encodeURIComponent(place.mapQuery);
        mapEl.src = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
        mapExternal.href = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
        renderReviews(reviewList, place.reviews);
        dataSourceEl.textContent = '리뷰/평점: 로컬 기본 데이터 표시 중. 잠시 후 실시간 Google 데이터로 갱신됩니다.';

        try {
            const details = await fetchLivePlaceDetails(place.id);
            if (details?.rating) {
                ratingEl.textContent = `${details.rating.toFixed(1)} / 5`;
            }
            if (details?.userRatingCount !== null && details?.userRatingCount !== undefined) {
                reviewCountEl.textContent = formatReviewCount(details.userRatingCount);
            }
            if (Array.isArray(details?.reviews) && details.reviews.length > 0) {
                const liveReviews = details.reviews.map((review) => {
                    const author = review.author || 'Google User';
                    const score = review.rating ? `(${review.rating}/5)` : '';
                    return `${author} ${score} - ${review.text}`.trim();
                });
                renderReviews(reviewList, liveReviews);
            }
            if (details?.googleMapsUri) {
                mapExternal.href = details.googleMapsUri;
            }
            dataSourceEl.textContent = '리뷰/평점: Google Places API 실시간 데이터 반영됨';
        } catch (error) {
            dataSourceEl.textContent = '리뷰/평점: Google API 연결 실패로 기본 데이터 표시 중';
        }
    }

    function renderPartnerPage() {
        const place = placeMap[getPlaceIdFromQuery()];
        if (!place) return;

        updateTopNavLinks(place.id);

        const selectedName = document.getElementById('selected-place-name');
        const selectedId = document.getElementById('selected-place-id');
        const message = document.getElementById('message');

        selectedName.textContent = place.name;
        selectedId.value = place.id;
        message.placeholder = `${place.name} 제휴 관련 문의를 남겨주세요.`;
    }

    function renderCommentsPage() {
        const place = placeMap[getPlaceIdFromQuery()];
        if (!place) return;

        updateTopNavLinks(place.id);

        const selectedName = document.getElementById('selected-place-name');
        selectedName.textContent = place.name;

        window.disqus_config = function () {
            this.page.url = `${window.location.origin}${window.location.pathname}?id=${place.id}`;
            this.page.identifier = `seoul-explorer-${place.id}`;
        };

        const d = document;
        const s = d.createElement('script');
        s.src = 'https://product-builder-lecture-2.disqus.com/embed.js';
        s.setAttribute('data-timestamp', String(+new Date()));
        (d.head || d.body).appendChild(s);
    }

    function init() {
        initPageTransition();

        const page = document.body.dataset.page;
        if (page === 'home') {
            renderHome();
        } else if (page === 'place') {
            renderPlaceDetail();
        } else if (page === 'partner') {
            renderPartnerPage();
        } else if (page === 'comments') {
            renderCommentsPage();
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
