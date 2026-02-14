(function () {
    const STYLE_LABELS = {
        all: '전체',
        history: '역사/문화',
        shopping: '쇼핑/트렌드',
        night: '야경/전망',
        nature: '자연/산책',
        family: '가족/테마',
        art: '예술/뮤지엄',
        local: '로컬/시장'
    };

    const CATEGORY_IMAGE = {
        '역사/문화': 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1400&q=80',
        '쇼핑/트렌드': 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1400&q=80',
        '야경/전망': 'https://images.unsplash.com/photo-1608403890612-8f00b6e9f54f?auto=format&fit=crop&w=1400&q=80',
        '자연/산책': 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1400&q=80',
        '가족/테마': 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1400&q=80',
        '예술/뮤지엄': 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1400&q=80',
        '로컬/시장': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=80'
    };

    const PLACE_SEEDS = [
        { name: '경복궁', district: '종로구', category: '역사/문화', bestTime: '09:00-13:00', styles: ['history', 'family'] },
        { name: '창덕궁', district: '종로구', category: '역사/문화', bestTime: '09:00-13:00', styles: ['history', 'nature'] },
        { name: '창경궁', district: '종로구', category: '역사/문화', bestTime: '10:00-15:00', styles: ['history', 'family'] },
        { name: '덕수궁', district: '중구', category: '역사/문화', bestTime: '10:00-14:00', styles: ['history', 'art'] },
        { name: '종묘', district: '종로구', category: '역사/문화', bestTime: '10:00-12:00', styles: ['history'] },
        { name: '북촌한옥마을', district: '종로구', category: '역사/문화', bestTime: '10:00-16:00', styles: ['history', 'nature'] },
        { name: '인사동', district: '종로구', category: '역사/문화', bestTime: '11:00-17:00', styles: ['history', 'shopping', 'local'] },
        { name: '익선동 한옥거리', district: '종로구', category: '쇼핑/트렌드', bestTime: '16:00-21:00', styles: ['shopping', 'local'] },
        { name: '삼청동길', district: '종로구', category: '자연/산책', bestTime: '11:00-17:00', styles: ['nature', 'shopping'] },
        { name: '서촌', district: '종로구', category: '로컬/시장', bestTime: '11:00-18:00', styles: ['local', 'history'] },

        { name: '광화문광장', district: '종로구', category: '역사/문화', bestTime: '17:00-21:00', styles: ['history', 'night'] },
        { name: '청계천', district: '종로구', category: '자연/산책', bestTime: '18:00-22:00', styles: ['nature', 'night'] },
        { name: 'N서울타워', district: '용산구', category: '야경/전망', bestTime: '18:00-22:00', styles: ['night', 'family'] },
        { name: '남산공원', district: '중구', category: '자연/산책', bestTime: '16:00-20:00', styles: ['nature', 'night'] },
        { name: '명동거리', district: '중구', category: '쇼핑/트렌드', bestTime: '17:00-22:00', styles: ['shopping', 'local'] },
        { name: '동대문디자인플라자(DDP)', district: '중구', category: '예술/뮤지엄', bestTime: '14:00-20:00', styles: ['art', 'night'] },
        { name: '동대문시장', district: '중구', category: '로컬/시장', bestTime: '19:00-24:00', styles: ['local', 'shopping'] },
        { name: '광장시장', district: '종로구', category: '로컬/시장', bestTime: '11:00-19:00', styles: ['local'] },
        { name: '남대문시장', district: '중구', category: '로컬/시장', bestTime: '10:00-18:00', styles: ['local', 'shopping'] },
        { name: '서울로7017', district: '중구', category: '자연/산책', bestTime: '17:00-21:00', styles: ['nature', 'night'] },

        { name: '이태원', district: '용산구', category: '쇼핑/트렌드', bestTime: '18:00-23:00', styles: ['shopping', 'night'] },
        { name: '한남동', district: '용산구', category: '쇼핑/트렌드', bestTime: '13:00-19:00', styles: ['shopping', 'art'] },
        { name: '리움미술관', district: '용산구', category: '예술/뮤지엄', bestTime: '11:00-17:00', styles: ['art'] },
        { name: '국립중앙박물관', district: '용산구', category: '예술/뮤지엄', bestTime: '10:00-16:00', styles: ['art', 'history', 'family'] },
        { name: '국립한글박물관', district: '용산구', category: '예술/뮤지엄', bestTime: '10:00-16:00', styles: ['art', 'history', 'family'] },
        { name: '전쟁기념관', district: '용산구', category: '역사/문화', bestTime: '10:00-16:00', styles: ['history', 'family'] },
        { name: '용산아이파크몰', district: '용산구', category: '쇼핑/트렌드', bestTime: '12:00-20:00', styles: ['shopping', 'family'] },
        { name: '노들섬', district: '용산구', category: '자연/산책', bestTime: '16:00-21:00', styles: ['nature', 'night', 'art'] },
        { name: '한강진 카페거리', district: '용산구', category: '쇼핑/트렌드', bestTime: '14:00-20:00', styles: ['shopping', 'local'] },
        { name: '남산골한옥마을', district: '중구', category: '역사/문화', bestTime: '11:00-16:00', styles: ['history', 'family'] },

        { name: '홍대거리', district: '마포구', category: '쇼핑/트렌드', bestTime: '17:00-23:00', styles: ['shopping', 'night'] },
        { name: '연남동', district: '마포구', category: '쇼핑/트렌드', bestTime: '13:00-20:00', styles: ['shopping', 'local'] },
        { name: '합정', district: '마포구', category: '쇼핑/트렌드', bestTime: '13:00-20:00', styles: ['shopping'] },
        { name: '망원시장', district: '마포구', category: '로컬/시장', bestTime: '11:00-19:00', styles: ['local'] },
        { name: '경의선숲길', district: '마포구', category: '자연/산책', bestTime: '16:00-21:00', styles: ['nature', 'night'] },
        { name: '월드컵공원', district: '마포구', category: '자연/산책', bestTime: '15:00-19:00', styles: ['nature', 'family'] },
        { name: '하늘공원', district: '마포구', category: '자연/산책', bestTime: '17:00-20:00', styles: ['nature', 'night'] },
        { name: '디지털미디어시티(DMC)', district: '마포구', category: '쇼핑/트렌드', bestTime: '13:00-18:00', styles: ['shopping', 'art'] },
        { name: '상암문화광장', district: '마포구', category: '자연/산책', bestTime: '16:00-20:00', styles: ['nature', 'family'] },
        { name: '문화비축기지', district: '마포구', category: '예술/뮤지엄', bestTime: '12:00-18:00', styles: ['art', 'nature'] },

        { name: '성수동 카페거리', district: '성동구', category: '쇼핑/트렌드', bestTime: '13:00-20:00', styles: ['shopping', 'local'] },
        { name: '서울숲', district: '성동구', category: '자연/산책', bestTime: '15:00-19:00', styles: ['nature', 'family'] },
        { name: '뚝섬한강공원', district: '광진구', category: '자연/산책', bestTime: '17:00-21:00', styles: ['nature', 'night', 'family'] },
        { name: '어린이대공원', district: '광진구', category: '가족/테마', bestTime: '10:00-17:00', styles: ['family', 'nature'] },
        { name: '아차산', district: '광진구', category: '자연/산책', bestTime: '07:00-11:00', styles: ['nature'] },
        { name: '건대 커먼그라운드', district: '광진구', category: '쇼핑/트렌드', bestTime: '12:00-20:00', styles: ['shopping'] },
        { name: '광진교 8번가', district: '강동구', category: '야경/전망', bestTime: '18:00-22:00', styles: ['night'] },
        { name: '성수연방', district: '성동구', category: '로컬/시장', bestTime: '13:00-19:00', styles: ['local', 'shopping'] },
        { name: '서울숲 갤러리아포레 산책로', district: '성동구', category: '자연/산책', bestTime: '16:00-19:00', styles: ['nature'] },
        { name: '성수동 수제화거리', district: '성동구', category: '쇼핑/트렌드', bestTime: '12:00-18:00', styles: ['shopping', 'history'] },

        { name: '코엑스', district: '강남구', category: '쇼핑/트렌드', bestTime: '12:00-20:00', styles: ['shopping', 'family'] },
        { name: '별마당도서관', district: '강남구', category: '예술/뮤지엄', bestTime: '11:00-19:00', styles: ['art', 'family'] },
        { name: '봉은사', district: '강남구', category: '역사/문화', bestTime: '10:00-16:00', styles: ['history', 'nature'] },
        { name: '가로수길', district: '강남구', category: '쇼핑/트렌드', bestTime: '13:00-20:00', styles: ['shopping'] },
        { name: '압구정로데오', district: '강남구', category: '쇼핑/트렌드', bestTime: '15:00-22:00', styles: ['shopping', 'night'] },
        { name: '청담동 명품거리', district: '강남구', category: '쇼핑/트렌드', bestTime: '14:00-20:00', styles: ['shopping'] },
        { name: '선릉과정릉', district: '강남구', category: '역사/문화', bestTime: '10:00-16:00', styles: ['history', 'nature'] },
        { name: '양재천', district: '서초구', category: '자연/산책', bestTime: '16:00-20:00', styles: ['nature'] },
        { name: '예술의전당', district: '서초구', category: '예술/뮤지엄', bestTime: '13:00-20:00', styles: ['art'] },
        { name: '강남역', district: '강남구', category: '쇼핑/트렌드', bestTime: '18:00-23:00', styles: ['shopping', 'night'] },

        { name: '롯데월드타워 서울스카이', district: '송파구', category: '야경/전망', bestTime: '18:00-22:00', styles: ['night', 'family'] },
        { name: '롯데월드 어드벤처', district: '송파구', category: '가족/테마', bestTime: '10:00-18:00', styles: ['family'] },
        { name: '석촌호수', district: '송파구', category: '자연/산책', bestTime: '16:00-20:00', styles: ['nature', 'family'] },
        { name: '올림픽공원', district: '송파구', category: '자연/산책', bestTime: '15:00-19:00', styles: ['nature', 'family'] },
        { name: '잠실한강공원', district: '송파구', category: '자연/산책', bestTime: '17:00-21:00', styles: ['nature', 'night'] },
        { name: '잠실종합운동장', district: '송파구', category: '가족/테마', bestTime: '14:00-19:00', styles: ['family', 'night'] },
        { name: '잠실새내 먹자골목', district: '송파구', category: '로컬/시장', bestTime: '18:00-23:00', styles: ['local', 'night'] },
        { name: '문정동 로데오거리', district: '송파구', category: '쇼핑/트렌드', bestTime: '13:00-20:00', styles: ['shopping'] },
        { name: '가든파이브', district: '송파구', category: '쇼핑/트렌드', bestTime: '12:00-20:00', styles: ['shopping', 'family'] },
        { name: '풍납토성', district: '송파구', category: '역사/문화', bestTime: '10:00-15:00', styles: ['history', 'nature'] },

        { name: '반포한강공원', district: '서초구', category: '야경/전망', bestTime: '18:00-22:00', styles: ['night', 'nature'] },
        { name: '세빛섬', district: '서초구', category: '야경/전망', bestTime: '19:00-22:00', styles: ['night'] },
        { name: '반포대교 달빛무지개분수', district: '서초구', category: '야경/전망', bestTime: '20:00-22:00', styles: ['night'] },
        { name: '잠수교', district: '서초구', category: '야경/전망', bestTime: '19:00-22:00', styles: ['night', 'nature'] },
        { name: '서래마을', district: '서초구', category: '로컬/시장', bestTime: '13:00-20:00', styles: ['local', 'shopping'] },
        { name: '양재시민의숲', district: '서초구', category: '자연/산책', bestTime: '15:00-19:00', styles: ['nature', 'family'] },
        { name: '예술의전당 한가람미술관', district: '서초구', category: '예술/뮤지엄', bestTime: '11:00-17:00', styles: ['art'] },
        { name: '국립국악원', district: '서초구', category: '예술/뮤지엄', bestTime: '13:00-20:00', styles: ['art', 'history'] },
        { name: '고속터미널 지하상가', district: '서초구', category: '쇼핑/트렌드', bestTime: '12:00-20:00', styles: ['shopping'] },
        { name: '한강대교 전망쉼터', district: '용산구', category: '야경/전망', bestTime: '19:00-22:00', styles: ['night'] },

        { name: '여의도한강공원', district: '영등포구', category: '자연/산책', bestTime: '17:00-21:00', styles: ['nature', 'night'] },
        { name: '여의도공원', district: '영등포구', category: '자연/산책', bestTime: '15:00-19:00', styles: ['nature', 'family'] },
        { name: '더현대서울', district: '영등포구', category: '쇼핑/트렌드', bestTime: '12:00-20:00', styles: ['shopping', 'family'] },
        { name: 'IFC몰', district: '영등포구', category: '쇼핑/트렌드', bestTime: '12:00-20:00', styles: ['shopping'] },
        { name: '63스퀘어', district: '영등포구', category: '야경/전망', bestTime: '18:00-22:00', styles: ['night', 'family'] },
        { name: '여의도 샛강생태공원', district: '영등포구', category: '자연/산책', bestTime: '16:00-19:00', styles: ['nature'] },
        { name: '문래창작촌', district: '영등포구', category: '예술/뮤지엄', bestTime: '13:00-19:00', styles: ['art', 'local'] },
        { name: '타임스퀘어 영등포', district: '영등포구', category: '쇼핑/트렌드', bestTime: '12:00-20:00', styles: ['shopping', 'family'] },
        { name: '노량진수산시장', district: '동작구', category: '로컬/시장', bestTime: '11:00-21:00', styles: ['local'] },
        { name: '보라매공원', district: '동작구', category: '자연/산책', bestTime: '15:00-19:00', styles: ['nature', 'family'] },

        { name: '서울식물원', district: '강서구', category: '자연/산책', bestTime: '11:00-17:00', styles: ['nature', 'family'] },
        { name: '선유도공원', district: '영등포구', category: '자연/산책', bestTime: '16:00-20:00', styles: ['nature', 'night'] },
        { name: '서울시립미술관', district: '중구', category: '예술/뮤지엄', bestTime: '11:00-17:00', styles: ['art'] },
        { name: '서울공예박물관', district: '종로구', category: '예술/뮤지엄', bestTime: '11:00-17:00', styles: ['art', 'history'] },
        { name: '국립현대미술관 서울관', district: '종로구', category: '예술/뮤지엄', bestTime: '11:00-17:00', styles: ['art'] },
        { name: '서울역사박물관', district: '종로구', category: '역사/문화', bestTime: '10:00-16:00', styles: ['history', 'family'] },
        { name: '서울도서관', district: '중구', category: '예술/뮤지엄', bestTime: '10:00-18:00', styles: ['art', 'history'] },
        { name: '서울광장', district: '중구', category: '역사/문화', bestTime: '17:00-21:00', styles: ['history', 'night'] },
        { name: '세종문화회관', district: '종로구', category: '예술/뮤지엄', bestTime: '13:00-21:00', styles: ['art', 'night'] },
        { name: '덕수궁 돌담길', district: '중구', category: '자연/산책', bestTime: '16:00-20:00', styles: ['nature', 'history'] },

        { name: '정동길', district: '중구', category: '자연/산책', bestTime: '16:00-19:00', styles: ['nature', 'history'] },
        { name: '청와대', district: '종로구', category: '역사/문화', bestTime: '10:00-15:00', styles: ['history', 'family'] },
        { name: '북악산 한양도성길', district: '종로구', category: '자연/산책', bestTime: '08:00-12:00', styles: ['nature', 'history'] },
        { name: '남산 한양도성길', district: '중구', category: '자연/산책', bestTime: '16:00-20:00', styles: ['nature', 'night'] },
        { name: '낙산공원', district: '종로구', category: '야경/전망', bestTime: '18:00-22:00', styles: ['night', 'nature'] },
        { name: '이화벽화마을', district: '종로구', category: '예술/뮤지엄', bestTime: '14:00-18:00', styles: ['art', 'history'] },
        { name: '대학로', district: '종로구', category: '예술/뮤지엄', bestTime: '18:00-22:00', styles: ['art', 'night'] },
        { name: '혜화', district: '종로구', category: '쇼핑/트렌드', bestTime: '17:00-22:00', styles: ['shopping', 'night'] },
        { name: '성균관 명륜당', district: '종로구', category: '역사/문화', bestTime: '10:00-14:00', styles: ['history'] },
        { name: '길상사', district: '성북구', category: '역사/문화', bestTime: '10:00-16:00', styles: ['history', 'nature'] }
    ];

    const places = PLACE_SEEDS.map((seed, index) => {
        const id = `place-${String(index + 1).padStart(3, '0')}`;
        const ratingBase = 4.3 + (index % 5) * 0.1;
        const reviewBase = 7800 + index * 920;
        const shortDescription = `${seed.name}은(는) ${seed.category} 여행자에게 특히 추천되는 서울 대표 스팟입니다.`;
        const description = `${seed.name}은(는) ${seed.district}에 위치한 ${seed.category} 명소입니다. 외국인 방문자가 동선에 넣기 쉬운 위치와 콘텐츠를 갖추고 있어, ${STYLE_LABELS[seed.styles[0]]} 중심 일정에 적합합니다.`;
        const reviews = [
            `${seed.name}은(는) 접근성이 좋아 초행 여행자도 방문하기 편하다는 평가가 많습니다.`,
            `${STYLE_LABELS[seed.styles[0]]} 중심 여행 코스에 넣기 좋고 체류 시간이 유연하다는 의견이 많습니다.`,
            `혼잡 시간대를 피하면 더 쾌적하게 즐길 수 있다는 후기가 있습니다.`
        ];

        return {
            id,
            name: seed.name,
            category: seed.category,
            district: seed.district,
            bestTime: seed.bestTime,
            rating: `${ratingBase.toFixed(1)} / 5`,
            reviewCount: `${reviewBase.toLocaleString()}+`,
            shortDescription,
            description,
            image: CATEGORY_IMAGE[seed.category] || CATEGORY_IMAGE['역사/문화'],
            mapQuery: `${seed.name} Seoul`,
            styles: seed.styles,
            reviews
        };
    });

    const placeMap = Object.fromEntries(places.map((p) => [p.id, p]));
    const placePhotoCache = new Map();

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

    function createPlaceCard(place) {
        const card = document.createElement('article');
        card.className = 'place-card';
        const styleLabel = place.styles.slice(0, 2).map((style) => STYLE_LABELS[style]).join(' · ');
        card.innerHTML = `
            <img src="${place.image}" alt="${place.name}" data-place-id="${place.id}">
            <div class="place-card-body">
                <h2>${place.name}</h2>
                <div class="place-meta">${place.category} · ${place.district} · ★ ${place.rating}</div>
                <div class="place-meta">${styleLabel}</div>
                <p class="place-desc">${place.shortDescription}</p>
                <a class="button-link" href="${getPlaceLink('place.html', place.id)}">상세 보기</a>
            </div>
        `;
        return card;
    }

    async function fetchPlacePhotoUrl(place) {
        if (placePhotoCache.has(place.id)) {
            return placePhotoCache.get(place.id);
        }
        const response = await fetch(`/api/place-photo?query=${encodeURIComponent(place.mapQuery)}`);
        if (!response.ok) {
            throw new Error(`Photo API request failed: ${response.status}`);
        }
        const json = await response.json();
        const photoUrl = json?.photoUrl;
        if (!photoUrl) {
            throw new Error('Photo URL missing');
        }
        placePhotoCache.set(place.id, photoUrl);
        return photoUrl;
    }

    function updateCardImagesWithPlacePhotos(renderedPlaces, token) {
        renderedPlaces.forEach((place) => {
            fetchPlacePhotoUrl(place).then((photoUrl) => {
                if (token !== window.__seoulExplorerRenderToken) return;
                const img = document.querySelector(`img[data-place-id="${place.id}"]`);
                if (img) img.src = photoUrl;
            }).catch(() => {
                // keep fallback image
            });
        });
    }

    function renderHome() {
        const grid = document.getElementById('place-grid');
        const styleSelect = document.getElementById('travel-style-select');
        const resultCount = document.getElementById('result-count');
        if (!grid || !styleSelect || !resultCount) return;

        function applyFilter() {
            const selectedStyle = styleSelect.value;
            const filtered = selectedStyle === 'all'
                ? places
                : places.filter((place) => place.styles.includes(selectedStyle));
            window.__seoulExplorerRenderToken = (window.__seoulExplorerRenderToken || 0) + 1;
            const renderToken = window.__seoulExplorerRenderToken;

            grid.innerHTML = '';
            if (!filtered.length) {
                const empty = document.createElement('p');
                empty.className = 'place-desc';
                empty.textContent = '선택한 여행 형식에 맞는 추천 장소가 없습니다.';
                grid.appendChild(empty);
                resultCount.textContent = '0개 추천';
                return;
            }

            const fragment = document.createDocumentFragment();
            filtered.forEach((place) => fragment.appendChild(createPlaceCard(place)));
            grid.appendChild(fragment);
            resultCount.textContent = `${filtered.length}개 추천`;
            updateCardImagesWithPlacePhotos(filtered, renderToken);
        }

        styleSelect.addEventListener('change', applyFilter);
        applyFilter();
    }

    function formatReviewCount(count) {
        if (typeof count !== 'number') return '-';
        return `${count.toLocaleString()}+`;
    }

    async function fetchLivePlaceDetails(place) {
        const response = await fetch(`/api/place-details?query=${encodeURIComponent(place.mapQuery)}`);
        if (!response.ok) throw new Error(`API request failed: ${response.status}`);
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
        dataSourceEl.textContent = '리뷰/평점: 기본 데이터 표시 중. 잠시 후 실시간 Google 데이터로 갱신됩니다.';

        try {
            const placePhotoUrl = await fetchPlacePhotoUrl(place);
            imageEl.src = placePhotoUrl;
        } catch (error) {
            // keep fallback place image
        }

        try {
            const details = await fetchLivePlaceDetails(place);
            if (details?.rating) ratingEl.textContent = `${details.rating.toFixed(1)} / 5`;
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
            if (details?.googleMapsUri) mapExternal.href = details.googleMapsUri;
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
        if (page === 'home') renderHome();
        else if (page === 'place') renderPlaceDetail();
        else if (page === 'partner') renderPartnerPage();
        else if (page === 'comments') renderCommentsPage();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
