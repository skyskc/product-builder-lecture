(function () {
    const THEME_STORAGE_KEY = 'seoul-explorer-theme';
    const LANG_STORAGE_KEY = 'seoul-explorer-lang';
    const STYLE_LABELS_BY_LANG = {
        ko: {
            all: '전체',
            history: '역사/문화',
            shopping: '쇼핑/트렌드',
            night: '야경/전망',
            nature: '자연/산책',
            family: '가족/테마',
            art: '예술/뮤지엄',
            local: '로컬/시장'
        },
        en: {
            all: 'All',
            history: 'History/Culture',
            shopping: 'Shopping/Trends',
            night: 'Night View',
            nature: 'Nature/Walk',
            family: 'Family/Theme',
            art: 'Art/Museum',
            local: 'Local/Market'
        }
    };
    let CURRENT_LANG = 'ko';

    function styleLabels() {
        return STYLE_LABELS_BY_LANG[CURRENT_LANG] || STYLE_LABELS_BY_LANG.ko;
    }

    function getStyleLabel(styleKey) {
        return styleLabels()[styleKey] || styleKey;
    }

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
        const description = `${seed.name}은(는) ${seed.district}에 위치한 ${seed.category} 명소입니다. 외국인 방문자가 동선에 넣기 쉬운 위치와 콘텐츠를 갖추고 있어, ${STYLE_LABELS_BY_LANG.ko[seed.styles[0]]} 중심 일정에 적합합니다.`;
        const reviews = [
            `${seed.name}은(는) 접근성이 좋아 초행 여행자도 방문하기 편하다는 평가가 많습니다.`,
            `${STYLE_LABELS_BY_LANG.ko[seed.styles[0]]} 중심 여행 코스에 넣기 좋고 체류 시간이 유연하다는 의견이 많습니다.`,
            `혼잡 시간대를 피하면 더 쾌적하게 즐길 수 있다는 후기가 있습니다.`
        ];

        return {
            id,
            name: seed.name,
            category: seed.category,
            district: seed.district,
            bestTime: seed.bestTime,
            ratingValue: Number(ratingBase.toFixed(1)),
            reviewCountValue: reviewBase,
            rating: `${ratingBase.toFixed(1)} / 5`,
            reviewCount: `${reviewBase.toLocaleString()}+`,
            shortDescription,
            description,
            mapQuery: `${seed.name} Seoul`,
            styles: seed.styles,
            reviews
        };
    });

    // Popularity score: review volume has diminishing returns via sqrt, rating gets strong weight.
    places.forEach((place) => {
        place.popularityScore = (place.ratingValue * 120) + Math.sqrt(place.reviewCountValue);
    });
    places.sort((a, b) => b.popularityScore - a.popularityScore);
    places.forEach((place, idx) => {
        place.rank = idx + 1;
    });

    const placeMap = Object.fromEntries(places.map((p) => [p.id, p]));

    function getLanguageFromQueryOrStorage() {
        const params = new URLSearchParams(window.location.search);
        const langQuery = params.get('lang');
        if (langQuery === 'en' || langQuery === 'ko') return langQuery;
        const saved = localStorage.getItem(LANG_STORAGE_KEY);
        return saved === 'en' ? 'en' : 'ko';
    }

    function withCurrentLang(urlText) {
        const url = new URL(urlText, window.location.href);
        if (url.origin !== window.location.origin) return url.toString();
        if (CURRENT_LANG === 'en') {
            url.searchParams.set('lang', 'en');
        } else {
            url.searchParams.delete('lang');
        }
        return `${url.pathname}${url.search}${url.hash}`;
    }

    function updateLanguageButton() {
        const btn = document.getElementById('lang-toggle-btn');
        if (!btn) return;
        btn.textContent = CURRENT_LANG === 'en' ? 'KO' : 'EN';
    }

    function applyEnglishCopy() {
        const navLinks = document.querySelectorAll('.top-nav a');
        if (navLinks[0]) navLinks[0].textContent = 'Places';
        if (navLinks[1]) navLinks[1].textContent = 'Courses';
        if (navLinks[2]) navLinks[2].textContent = 'Partner';
        if (navLinks[3]) navLinks[3].textContent = 'Comments';

        const footerLinks = document.querySelectorAll('.footer-inner nav a');
        if (footerLinks[0]) footerLinks[0].textContent = 'About';
        if (footerLinks[1]) footerLinks[1].textContent = 'Editorial Policy';
        if (footerLinks[2]) footerLinks[2].textContent = 'Privacy Policy';

        const page = document.body.dataset.page;
        if (page === 'home') {
            const hero = document.querySelector('.hero');
            const eyebrow = hero?.querySelector('.eyebrow');
            const h1 = hero?.querySelector('h1');
            const p = hero?.querySelector('p:not(.eyebrow)');
            if (eyebrow) eyebrow.textContent = 'For International Visitors';
            if (h1) h1.textContent = 'Top Seoul Places for Travelers';
            if (p) p.textContent = 'Carefully selected spots for first-time visitors. Open each detail page for map links, ratings, and review summaries.';
            const tabTitle = document.querySelector('.style-tab-title');
            if (tabTitle) tabTitle.textContent = 'Choose Travel Style';
            document.querySelectorAll('#travel-style-tabs .style-tab-btn').forEach((btn) => {
                const styleKey = btn.dataset.style;
                if (styleKey) btn.textContent = getStyleLabel(styleKey);
            });
        }
        if (page === 'course') {
            const hero = document.querySelector('.hero');
            const eyebrow = hero?.querySelector('.eyebrow');
            const h1 = hero?.querySelector('h1');
            const p = hero?.querySelector('p:not(.eyebrow)');
            if (eyebrow) eyebrow.textContent = 'Walking Day Plan';
            if (h1) h1.textContent = 'One-Day Seoul Course by Travel Style';
            if (p) p.textContent = 'A compact walking plan with district restaurants and hotel recommendations based on Google ratings.';
            const tabTitle = document.querySelector('.style-tab-title');
            if (tabTitle) tabTitle.textContent = 'Choose Course Style';
            document.querySelectorAll('.style-tab-btn').forEach((btn) => {
                const styleKey = btn.dataset.style;
                if (styleKey) btn.textContent = getStyleLabel(styleKey);
            });
        }
        if (page === 'place') {
            const back = document.querySelector('.back-link');
            if (back) back.textContent = '← Back to list';
            const h2s = document.querySelectorAll('.panel h2');
            if (h2s[0]) h2s[0].textContent = 'Google Map';
            if (h2s[1]) h2s[1].textContent = 'Review Summary';
            if (h2s[2]) h2s[2].textContent = 'Traveler Notes';
        }
        if (page === 'partner') {
            const eyebrow = document.querySelector('.panel .eyebrow');
            const h1 = document.querySelector('.panel h1');
            if (eyebrow) eyebrow.textContent = 'Partnership';
            if (h1) h1.textContent = 'Partner Inquiry';
        }
        if (page === 'comments') {
            const eyebrow = document.querySelector('.panel .eyebrow');
            const h1 = document.querySelector('.panel h1');
            if (eyebrow) eyebrow.textContent = 'Community';
            if (h1) h1.textContent = 'Travel Comments';
        }
    }

    function syncInternalLinksWithLanguage() {
        document.querySelectorAll('a[href]').forEach((anchor) => {
            const href = anchor.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
            const target = new URL(href, window.location.href);
            if (target.origin !== window.location.origin) return;
            anchor.setAttribute('href', withCurrentLang(target.toString()));
        });
    }

    function initLanguage() {
        CURRENT_LANG = getLanguageFromQueryOrStorage();
        localStorage.setItem(LANG_STORAGE_KEY, CURRENT_LANG);
        document.documentElement.lang = CURRENT_LANG;
        updateLanguageButton();
        if (CURRENT_LANG === 'en') applyEnglishCopy();
        syncInternalLinksWithLanguage();

        const langBtn = document.getElementById('lang-toggle-btn');
        if (!langBtn) return;
        langBtn.addEventListener('click', () => {
            const nextLang = CURRENT_LANG === 'en' ? 'ko' : 'en';
            localStorage.setItem(LANG_STORAGE_KEY, nextLang);
            const nextUrl = new URL(window.location.href);
            if (nextLang === 'en') nextUrl.searchParams.set('lang', 'en');
            else nextUrl.searchParams.delete('lang');
            window.location.href = nextUrl.toString();
        });
    }

    function getPlaceIdFromQuery() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        if (id && placeMap[id]) return id;
        return places[0].id;
    }

    function getPlaceLink(page, id) {
        return withCurrentLang(`${page}?id=${encodeURIComponent(id)}`);
    }

    function updateTopNavLinks(id) {
        const courseLink = document.getElementById('course-link');
        const partnerLink = document.getElementById('partner-link');
        const commentsLink = document.getElementById('comments-link');
        const place = placeMap[id];
        if (courseLink && place) {
            courseLink.href = withCurrentLang(`course.html?style=${encodeURIComponent(place.styles[0])}`);
        }
        if (partnerLink) partnerLink.href = getPlaceLink('partner.html', id);
        if (commentsLink) commentsLink.href = getPlaceLink('comments.html', id);
    }

    function markActiveNav() {
        const page = document.body.dataset.page;
        const links = document.querySelectorAll('.top-nav a');
        links.forEach((link) => link.classList.remove('active'));
        if (page === 'home' || page === 'place') links[0]?.classList.add('active');
        if (page === 'course') links[1]?.classList.add('active');
        if (page === 'partner') links[2]?.classList.add('active');
        if (page === 'comments') links[3]?.classList.add('active');
    }

    function applyTheme(theme) {
        const isDark = theme === 'dark';
        document.body.classList.toggle('dark-mode', isDark);
        const btn = document.getElementById('theme-toggle-btn');
        if (btn) btn.textContent = isDark ? 'Light' : 'Dark';
    }

    function initThemeToggle() {
        const btn = document.getElementById('theme-toggle-btn');
        const saved = localStorage.getItem(THEME_STORAGE_KEY);
        applyTheme(saved === 'dark' || saved === 'light' ? saved : 'light');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const next = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(next);
            localStorage.setItem(THEME_STORAGE_KEY, next);
        });
    }

    function initPageTransition() {
        document.addEventListener('click', (event) => {
            const anchor = event.target.closest('a[href]');
            if (!anchor) return;
            if (anchor.target === '_blank' || anchor.hasAttribute('download')) return;
            const href = anchor.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
            const targetUrl = new URL(href, window.location.href);
            if (targetUrl.origin !== window.location.origin) return;

            event.preventDefault();
            document.body.classList.add('page-exit');
            setTimeout(() => {
                window.location.href = targetUrl.href;
            }, 180);
        });
    }

    function styleClass(styleKey) {
        return `style-badge style-${styleKey}`;
    }

    function createPlaceCard(place) {
        const card = document.createElement('article');
        card.className = 'place-card';
        const styleBadges = place.styles.slice(0, 3)
            .map((style) => `<span class=\"${styleClass(style)}\">${getStyleLabel(style)}</span>`)
            .join('');
        card.innerHTML = `
            <div class="place-card-body">
                <span class="place-rank">TOP ${place.rank}</span>
                <h2>${place.name}</h2>
                <div class="place-meta">${place.category} · ${place.district}</div>
                <div class="style-badges">${styleBadges}</div>
                <p class="place-desc">${place.shortDescription}</p>
                <a class="button-link" href="${getPlaceLink('place.html', place.id)}">${CURRENT_LANG === 'en' ? 'View Details' : '상세 보기'}</a>
            </div>
        `;
        return card;
    }

    function renderHome() {
        const grid = document.getElementById('place-grid');
        const styleTabs = document.getElementById('travel-style-tabs');
        const styleButtons = Array.from(document.querySelectorAll('#travel-style-tabs .style-tab-btn'));
        const resultCount = document.getElementById('result-count');
        if (!grid || !styleTabs || !styleButtons.length || !resultCount) return;

        let selectedStyle = 'all';

        function markActiveStyle(styleKey) {
            styleButtons.forEach((btn) => {
                const active = btn.dataset.style === styleKey;
                btn.classList.toggle('active', active);
                btn.setAttribute('aria-selected', active ? 'true' : 'false');
            });
        }

        function applyFilter() {
            const filtered = selectedStyle === 'all'
                ? places
                : places.filter((place) => place.styles.includes(selectedStyle));
            grid.innerHTML = '';
            if (!filtered.length) {
                const empty = document.createElement('p');
                empty.className = 'place-desc';
                empty.textContent = CURRENT_LANG === 'en'
                    ? 'No recommended places for this travel style.'
                    : '선택한 여행 형식에 맞는 추천 장소가 없습니다.';
                grid.appendChild(empty);
                resultCount.textContent = CURRENT_LANG === 'en' ? '0 results' : '0개 추천';
                return;
            }

            const fragment = document.createDocumentFragment();
            filtered.forEach((place) => fragment.appendChild(createPlaceCard(place)));
            grid.appendChild(fragment);
            resultCount.textContent = CURRENT_LANG === 'en'
                ? `${filtered.length} results`
                : `${filtered.length}개 추천`;
        }

        if (CURRENT_LANG === 'en') {
            styleButtons.forEach((button) => {
                const styleKey = button.dataset.style;
                if (!styleKey) return;
                button.textContent = getStyleLabel(styleKey);
            });
        }
        styleTabs.addEventListener('click', (event) => {
            const button = event.target.closest('.style-tab-btn');
            if (!button) return;
            const nextStyle = button.dataset.style;
            if (!nextStyle || nextStyle === selectedStyle) return;
            selectedStyle = nextStyle;
            markActiveStyle(selectedStyle);
            applyFilter();
        });
        markActiveStyle(selectedStyle);
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

    async function fetchTopHotels(queryText) {
        const response = await fetch(`/api/hotels-top?query=${encodeURIComponent(queryText)}`);
        if (!response.ok) throw new Error(`Hotels API request failed: ${response.status}`);
        const json = await response.json();
        return json.hotels || [];
    }

    async function fetchTopRestaurantsByMeal(district, meal) {
        const response = await fetch(`/api/restaurants-top?district=${encodeURIComponent(district)}&meal=${encodeURIComponent(meal)}&limit=3`);
        if (!response.ok) throw new Error(`Restaurants API request failed: ${response.status}`);
        const json = await response.json();
        return {
            restaurants: json.restaurants || [],
            broadcastPicks: json.broadcastPicks || []
        };
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
        const rankEl = document.getElementById('place-rank');
        const styleBadgesEl = document.getElementById('place-style-badges');
        const mapEl = document.getElementById('place-map');
        const mapExternal = document.getElementById('map-external-link');
        const reviewList = document.getElementById('review-list');
        const dataSourceEl = document.getElementById('place-data-source');

        document.title = `${place.name} | Seoul Explorer`;
        nameEl.textContent = place.name;
        categoryEl.textContent = place.category;
        descEl.textContent = place.description;
        rankEl.textContent = `TOP ${place.rank}`;
        districtEl.textContent = place.district;
        bestTimeEl.textContent = place.bestTime;
        ratingEl.textContent = `${place.rating} (기본 데이터)`;
        reviewCountEl.textContent = `${place.reviewCount} (기본 데이터)`;
        styleBadgesEl.innerHTML = place.styles
            .map((style) => `<span class=\"${styleClass(style)}\">${getStyleLabel(style)}</span>`)
            .join('');

        const mapQuery = encodeURIComponent(place.mapQuery);
        mapEl.src = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
        mapExternal.href = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
        mapExternal.textContent = CURRENT_LANG === 'en' ? 'Open in Google Maps' : 'Google 지도에서 열기';
        renderReviews(reviewList, place.reviews);
        dataSourceEl.textContent = CURRENT_LANG === 'en'
            ? 'Ratings/Reviews: Showing default data now. Updating to live Google data shortly.'
            : '리뷰/평점: 기본 데이터 표시 중. 잠시 후 실시간 Google 데이터로 갱신됩니다.';

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
            dataSourceEl.textContent = CURRENT_LANG === 'en'
                ? 'Ratings/Reviews: Live Google Places data applied'
                : '리뷰/평점: Google Places API 실시간 데이터 반영됨';
        } catch (error) {
            dataSourceEl.textContent = CURRENT_LANG === 'en'
                ? 'Ratings/Reviews: Google API unavailable, showing fallback data'
                : '리뷰/평점: Google API 연결 실패로 기본 데이터 표시 중';
        }
    }

    function getStyleFromQuery() {
        const params = new URLSearchParams(window.location.search);
        const style = params.get('style');
        if (!style || !styleLabels()[style] || style === 'all') return 'history';
        return style;
    }

    function makeWalkingMinutes(a, b, index) {
        const districtBoost = a.district === b.district ? 8 : 15;
        return districtBoost + (index % 3) * 4;
    }

    function getTimeSlot(bestTime) {
        const match = /(\d{1,2})/.exec(bestTime);
        const hour = match ? Number(match[1]) : 10;
        if (hour < 11) return '오전';
        if (hour < 14) return '점심';
        if (hour < 18) return '오후';
        return '저녁';
    }

    async function renderCoursePage() {
        const styleTabs = document.getElementById('course-style-tabs');
        const styleButtons = Array.from(document.querySelectorAll('.style-tab-btn'));
        const titleEl = document.getElementById('day-course-title');
        const summaryEl = document.getElementById('day-course-summary');
        const routeLinkEl = document.getElementById('course-route-link');
        const timeSlotsEl = document.getElementById('course-time-slots');
        const stopListEl = document.getElementById('course-stop-list');
        const hotelListEl = document.getElementById('hotel-list');
        const hotelSourceEl = document.getElementById('hotel-source-note');
        const restaurantSourceEl = document.getElementById('restaurant-source-note');
        const restaurantSectionsEl = document.getElementById('restaurant-sections');
        if (!styleTabs || !styleButtons.length || !titleEl || !summaryEl || !routeLinkEl || !timeSlotsEl || !stopListEl || !hotelListEl || !hotelSourceEl || !restaurantSourceEl || !restaurantSectionsEl) return;

        let currentStyle = getStyleFromQuery();

        function markActiveStyle(styleKey) {
            styleButtons.forEach((btn) => {
                const active = btn.dataset.style === styleKey;
                btn.classList.toggle('active', active);
                btn.setAttribute('aria-selected', active ? 'true' : 'false');
            });
        }

        async function drawCourse(selectedStyle) {
            const filtered = places.filter((place) => place.styles.includes(selectedStyle)).slice(0, 6);
            if (filtered.length < 2) return;

            titleEl.textContent = CURRENT_LANG === 'en'
                ? `${getStyleLabel(selectedStyle)} One-Day Walking Course`
                : `${getStyleLabel(selectedStyle)} 도보 1일 코스`;

            const totalWalking = filtered.slice(0, -1).reduce((sum, place, idx) => {
                return sum + makeWalkingMinutes(place, filtered[idx + 1], idx);
            }, 0);

            summaryEl.textContent = `총 ${filtered.length}개 스팟, 예상 도보 이동 ${totalWalking}분 기준 추천 코스입니다.`;
            if (CURRENT_LANG === 'en') {
                summaryEl.textContent = `${filtered.length} spots with about ${totalWalking} minutes of walking in total.`;
            }

            const grouped = {
                '오전': [],
                '점심': [],
                '오후': [],
                '저녁': []
            };
            filtered.forEach((place) => {
                grouped[getTimeSlot(place.bestTime)].push(place);
            });

            timeSlotsEl.innerHTML = '';
            ['오전', '점심', '오후', '저녁'].forEach((slot) => {
                const box = document.createElement('article');
                box.className = 'time-slot';
                const items = grouped[slot].length
                    ? grouped[slot].map((place) => `<li>${place.name} (${place.district})</li>`).join('')
                    : `<li>${CURRENT_LANG === 'en' ? 'No spots' : '추천 스팟 없음'}</li>`;
                const slotLabel = CURRENT_LANG === 'en'
                    ? ({ '오전': 'Morning', '점심': 'Lunch', '오후': 'Afternoon', '저녁': 'Evening' }[slot] || slot)
                    : slot;
                box.innerHTML = `<h3>${slotLabel}</h3><ul>${items}</ul>`;
                timeSlotsEl.appendChild(box);
            });

            stopListEl.innerHTML = '';
            filtered.forEach((place, idx) => {
                const li = document.createElement('li');
                const next = filtered[idx + 1];
                const walk = next
                    ? (CURRENT_LANG === 'en'
                        ? ` · about ${makeWalkingMinutes(place, next, idx)} min walk to next stop`
                        : ` · 다음 스팟까지 도보 약 ${makeWalkingMinutes(place, next, idx)}분`)
                    : '';
                li.innerHTML = `<span class=\"stop-title\">${idx + 1}. ${place.name}</span> (${place.district})${walk}`;
                stopListEl.appendChild(li);
            });

            const origin = filtered[0].mapQuery;
            const destination = filtered[filtered.length - 1].mapQuery;
            const waypoints = filtered.slice(1, -1).map((p) => p.mapQuery).join('|');
            routeLinkEl.href = `https://www.google.com/maps/dir/?api=1&travelmode=walking&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&waypoints=${encodeURIComponent(waypoints)}`;

            hotelListEl.innerHTML = '';
            try {
                const hotelQuery = `${filtered[0].district} Seoul hotels`;
                const hotels = await fetchTopHotels(hotelQuery);
                hotels.slice(0, 5).forEach((hotel, idx) => {
                    const li = document.createElement('li');
                    const mapAnchor = hotel.googleMapsUri
                        ? ` · <a class=\"text-link\" href=\"${hotel.googleMapsUri}\" target=\"_blank\" rel=\"noopener noreferrer\">지도</a>`
                        : '';
                    li.innerHTML = `
                        <span class=\"hotel-name\">${idx + 1}. ${hotel.name}</span><br>
                        <span class=\"hotel-meta\">평점 ${hotel.rating || '-'} / 리뷰 ${hotel.userRatingCount?.toLocaleString?.() || '-'} / 평균가격 ${hotel.averagePrice}</span><br>
                        <span class=\"hotel-meta\">${hotel.address || ''}${mapAnchor}</span>
                    `;
                    hotelListEl.appendChild(li);
                });
                hotelSourceEl.textContent = CURRENT_LANG === 'en'
                    ? 'Hotels: Top 5 based on Google Places rating'
                    : '숙소 데이터: Google Places 평점 기준 상위 5개';
            } catch (error) {
                const fallback = filtered.slice(0, 5).map((place, idx) => ({
                    name: `${place.district} 중심 호텔 추천 ${idx + 1}`,
                    rating: (4.3 + idx * 0.1).toFixed(1),
                    reviewCount: `${(1200 + idx * 330).toLocaleString()}+`,
                    averagePrice: `약 ₩${(110000 + idx * 25000).toLocaleString()}`,
                    address: `${place.district} 주요 관광 동선 인접`
                }));
                fallback.forEach((hotel, idx) => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <span class=\"hotel-name\">${idx + 1}. ${hotel.name}</span><br>
                        <span class=\"hotel-meta\">평점 ${hotel.rating} / 리뷰 ${hotel.reviewCount} / 평균가격 ${hotel.averagePrice}</span><br>
                        <span class=\"hotel-meta\">${hotel.address}</span>
                    `;
                    hotelListEl.appendChild(li);
                });
                hotelSourceEl.textContent = CURRENT_LANG === 'en'
                    ? 'Hotels: Google API unavailable, showing fallback list'
                    : '숙소 데이터: Google API 연결 실패로 기본 추천 표시 중';
            }

            const districts = [...new Set(filtered.map((place) => place.district))];
            const mealConfig = [
                { key: 'breakfast', label: CURRENT_LANG === 'en' ? 'Breakfast' : '아침' },
                { key: 'lunch', label: CURRENT_LANG === 'en' ? 'Lunch' : '점심' },
                { key: 'dinner', label: CURRENT_LANG === 'en' ? 'Dinner' : '저녁' },
                { key: 'drinks', label: CURRENT_LANG === 'en' ? 'Drinks' : '술자리' }
            ];

            restaurantSectionsEl.innerHTML = '';
            let restaurantApiOk = true;

            for (const district of districts) {
                const districtBlock = document.createElement('article');
                districtBlock.className = 'district-block';
                districtBlock.innerHTML = `<h3>${CURRENT_LANG === 'en' ? `${district} - Top 3 by meal` : `${district} 맛집 3곳씩 추천`}</h3><div class=\"meal-grid\"></div>`;
                const mealGrid = districtBlock.querySelector('.meal-grid');

                const mealResults = await Promise.all(mealConfig.map(async (meal) => {
                    try {
                        const data = await fetchTopRestaurantsByMeal(district, meal.key);
                        return { ...meal, ...data, isFallback: false };
                    } catch (_) {
                        restaurantApiOk = false;
                        return {
                            ...meal,
                            restaurants: [1, 2, 3].map((n) => ({
                                name: `${district} ${meal.label} 추천 ${n}`,
                                rating: (4.2 + n * 0.1).toFixed(1),
                                userRatingCount: 1000 + n * 300,
                                address: `${district} 인기 상권`,
                                averagePrice: `약 ₩${(9000 + n * 6000).toLocaleString()}`,
                                googleMapsUri: ''
                            })),
                            broadcastPicks: [],
                            isFallback: true
                        };
                    }
                }));

                mealResults.forEach((mealData) => {
                    const mealCard = document.createElement('section');
                    mealCard.className = 'meal-card';
                    const rows = mealData.restaurants.slice(0, 3).map((r, idx) => {
                        const matchedBroadcast = (mealData.broadcastPicks || []).find((pick) => r.name.includes(pick.name) || pick.name.includes(r.name));
                        const broadcastTag = matchedBroadcast ? ` <span class=\"broadcast-chip\">${matchedBroadcast.show}</span>` : '';
                        const mapLink = r.googleMapsUri
                            ? ` · <a class=\"text-link\" href=\"${r.googleMapsUri}\" target=\"_blank\" rel=\"noopener noreferrer\">${CURRENT_LANG === 'en' ? 'Map' : '지도'}</a>`
                            : '';
                        return `<li><span class=\"hotel-name\">${idx + 1}. ${r.name}</span>${broadcastTag}<br><span class=\"hotel-meta\">${CURRENT_LANG === 'en' ? 'Rating' : '평점'} ${r.rating || '-'} / ${CURRENT_LANG === 'en' ? 'Reviews' : '리뷰'} ${(r.userRatingCount || 0).toLocaleString()} / ${CURRENT_LANG === 'en' ? 'Avg price' : '평균가격'} ${r.averagePrice || '-'}</span><br><span class=\"hotel-meta\">${r.address || ''}${mapLink}</span></li>`;
                    }).join('');

                    const extraBroadcast = (mealData.broadcastPicks || []).filter((pick) => !mealData.restaurants.some((r) => r.name.includes(pick.name) || pick.name.includes(r.name)));
                    const curation = extraBroadcast.length
                        ? `<p class=\"data-source-note\">${CURRENT_LANG === 'en' ? 'Broadcast curation' : '방송 큐레이션'}: ${extraBroadcast.map((pick) => `${pick.name}(${pick.show})`).join(', ')}</p>`
                        : '';
                    mealCard.innerHTML = `<h4>${mealData.label}</h4><ul>${rows}</ul>${curation}`;
                    mealGrid.appendChild(mealCard);
                });

                restaurantSectionsEl.appendChild(districtBlock);
            }

            restaurantSourceEl.textContent = restaurantApiOk
                ? (CURRENT_LANG === 'en'
                    ? 'Restaurants: Google ratings/reviews prioritized with broadcast curation'
                    : '맛집 데이터: Google 평점/리뷰 우선 + 방송 큐레이션(또간집/맛있는 녀석들)')
                : (CURRENT_LANG === 'en'
                    ? 'Restaurants: Some Google API calls failed, fallback recommendations shown'
                    : '맛집 데이터: 일부 Google API 실패로 기본 추천을 함께 표시 중');
        }

        styleTabs.addEventListener('click', (event) => {
            const button = event.target.closest('.style-tab-btn');
            if (!button) return;
            const nextStyle = button.dataset.style;
            if (!nextStyle || nextStyle === currentStyle) return;
            currentStyle = nextStyle;
            markActiveStyle(currentStyle);
            const nextUrl = new URL(window.location.href);
            nextUrl.searchParams.set('style', currentStyle);
            window.history.replaceState({}, '', nextUrl.toString());
            drawCourse(currentStyle);
        });

        markActiveStyle(currentStyle);
        drawCourse(currentStyle);
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
        message.placeholder = CURRENT_LANG === 'en'
            ? `Leave your partnership inquiry for ${place.name}.`
            : `${place.name} 제휴 관련 문의를 남겨주세요.`;
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
        initLanguage();
        initThemeToggle();
        markActiveNav();
        initPageTransition();
        const page = document.body.dataset.page;
        if (page === 'home') renderHome();
        else if (page === 'place') renderPlaceDetail();
        else if (page === 'course') renderCoursePage();
        else if (page === 'partner') renderPartnerPage();
        else if (page === 'comments') renderCommentsPage();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
