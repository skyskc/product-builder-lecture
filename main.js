(function () {
    const STATIC_SITE_MODE = true;
    const THEME_STORAGE_KEY = 'seoul-explorer-theme';
    const LANG_STORAGE_KEY = 'seoul-explorer-lang';
    const ENTRY_CTA_VARIANT_KEY = 'seoul-entry-cta-variant-v1';
    const ENTRY_OVERLAY_LAST_SEEN_KEY = 'seoul-entry-first-overlay-last-seen-v1';
    const ENTRY_OVERLAY_COPY_VARIANT_KEY = 'seoul-entry-overlay-copy-variant-v1';
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
    const TAG_LABELS_BY_LANG = {
        ko: {
            all: '전체',
            palace: '궁궐',
            'night-view': '야경',
            shopping: '쇼핑',
            museum: '박물관',
            nature: '공원/산책',
            'local-market': '시장/로컬',
            'family-trip': '가족여행'
        },
        en: {
            all: 'All',
            palace: 'Palaces',
            'night-view': 'Night View',
            shopping: 'Shopping',
            museum: 'Museums',
            nature: 'Nature Walks',
            'local-market': 'Local Markets',
            'family-trip': 'Family Trip'
        }
    };
    const ESSENTIAL_PHRASES = [
        {
            ko: '이 주소로 가 주세요.',
            roman: 'I juso-ro ga juseyo.',
            en: 'Please take me to this address.'
        },
        {
            ko: '카드 결제 가능한가요?',
            roman: 'Kadeu gyeolje ganeunghangayo?',
            en: 'Can I pay by card?'
        },
        {
            ko: '매운 음식은 빼 주세요.',
            roman: 'Maeun eumsigeun ppae juseyo.',
            en: 'Please make it not spicy.'
        },
        {
            ko: '지하철역이 어디예요?',
            roman: 'Jihacheol-yeogi eodiyeyo?',
            en: 'Where is the subway station?'
        },
        {
            ko: '화장실이 어디예요?',
            roman: 'Hwajangsil-i eodiyeyo?',
            en: 'Where is the restroom?'
        },
        {
            ko: '도와주세요.',
            roman: 'Dowajuseyo.',
            en: 'Please help me.'
        }
    ];
    const GENERATION_COURSES = [
        {
            title: { ko: '20대 트렌드 코스', en: '20s Trend Course' },
            desc: {
                ko: '쇼핑, 야경, 로컬 맛집 위주로 늦은 시간까지 즐기는 일정.',
                en: 'Late-day itinerary focused on shopping, night views, and local food.'
            },
            bullets: {
                ko: ['낮: 성수/홍대 트렌드 스팟', '저녁: 한강/전망 포인트', '밤: 로컬바/야시장 감성'],
                en: ['Day: Seongsu/Hongdae trend spots', 'Evening: Han River viewpoints', 'Night: local bars and market vibe']
            },
            cta: { ko: '쇼핑/트렌드 코스 보기', en: 'Open Shopping/Trends Course' },
            style: 'shopping',
            budget: 'mid',
            walk: 'high'
        },
        {
            title: { ko: '30대 밸런스 코스', en: '30s Balanced Course' },
            desc: {
                ko: '핵심 명소 + 감도 높은 카페/미식으로 균형 잡힌 하루.',
                en: 'Balanced day with key landmarks plus refined cafe and food stops.'
            },
            bullets: {
                ko: ['오전: 역사/뮤지엄 1~2곳', '오후: 카페/산책/쇼핑', '저녁: 평점 높은 식당'],
                en: ['Morning: 1-2 history/museum spots', 'Afternoon: cafe, walk, shopping', 'Evening: top-rated restaurants']
            },
            cta: { ko: '예술/뮤지엄 코스 보기', en: 'Open Art/Museum Course' },
            style: 'art',
            budget: 'mid',
            walk: 'mid'
        },
        {
            title: { ko: '40대 가족 동행 코스', en: '40s Family Course' },
            desc: {
                ko: '무리 없는 동선과 휴식 가능한 공간 중심 일정.',
                en: 'Family-friendly plan with easy movement and comfortable rest points.'
            },
            bullets: {
                ko: ['이동 시간 짧은 구간 우선', '공원/테마형 스팟 포함', '아이/부모 동반 식사 동선'],
                en: ['Prioritize short transfers', 'Include parks and theme spots', 'Meal flow for kids and parents']
            },
            cta: { ko: '가족/테마 코스 보기', en: 'Open Family/Theme Course' },
            style: 'family',
            budget: 'high',
            walk: 'low'
        },
        {
            title: { ko: '50대+ 편안한 코스', en: '50+ Comfort Course' },
            desc: {
                ko: '역사/문화 중심으로 걷기 난이도를 낮춘 안정형 일정.',
                en: 'Stable history-focused route with reduced walking intensity.'
            },
            bullets: {
                ko: ['오전: 궁궐/박물관 집중', '오후: 전통 거리 가벼운 산책', '저녁: 조용한 식사 스팟'],
                en: ['Morning: palaces and museums', 'Afternoon: light walk in traditional streets', 'Evening: quiet dining spots']
            },
            cta: { ko: '역사/문화 코스 보기', en: 'Open History/Culture Course' },
            style: 'history',
            budget: 'mid',
            walk: 'low'
        },
        {
            title: { ko: '시니어/힐링 코스', en: 'Senior Healing Course' },
            desc: {
                ko: '자연, 강변, 공원 중심으로 체력 부담이 적은 일정.',
                en: 'Low-intensity healing route focused on parks, river views, and nature.'
            },
            bullets: {
                ko: ['오전: 공원/산책로', '오후: 카페 휴식 + 전망', '저녁: 조기 귀가형 동선'],
                en: ['Morning: parks and walking trails', 'Afternoon: cafe rest and viewpoints', 'Evening: early-return flow']
            },
            cta: { ko: '자연/산책 코스 보기', en: 'Open Nature/Walk Course' },
            style: 'nature',
            budget: 'low',
            walk: 'low'
        }
    ];
    const KCONTENT_IMAGE_FALLBACK = 'assets/kcontent/placeholder.svg';
    const KCONTENT_CHARACTERS = (window.GOSEOUL_SITE_DATA && Array.isArray(window.GOSEOUL_SITE_DATA.KCONTENT_CHARACTERS))
        ? window.GOSEOUL_SITE_DATA.KCONTENT_CHARACTERS
        : [];

    const KCONTENT_LOCAL_IMAGE_MAP = {
        'gi-hun': 'assets/kcontent/gi-hun.jpg',
        'sae-byeok': 'assets/kcontent/sae-byeok.jpg',
        'front-man': 'assets/kcontent/front-man.jpg',
        'yoon-se-ri': 'assets/kcontent/yoon-se-ri.png',
        'ri-jeong-hyeok': 'assets/kcontent/ri-jeong-hyeok.jpg',
        'kim-shin': 'assets/kcontent/kim-shin.png',
        'woo-young-woo': 'assets/kcontent/woo-young-woo.png',
        'moon-dong-eun': 'assets/kcontent/moon-dong-eun.jpg',
        'park-sae-ro-yi': 'assets/kcontent/park-sae-ro-yi.jpg',
        'vincenzo': 'assets/kcontent/vincenzo.jpg',
        'yoon-ji-woo': 'assets/kcontent/yoon-ji-woo.jpg',
        'cha-hyun-su': 'assets/kcontent/cha-hyun-su.png',
        'lee-chang': 'assets/kcontent/lee-chang.png',
        'jang-tae-sang': 'assets/kcontent/jang-tae-sang.jpg',
        'seok-woo': 'assets/kcontent/seok-woo.png',
        'kim-ki-taek': 'assets/kcontent/kim-ki-taek.jpg',
        'kim-bong-seok': 'assets/kcontent/kim-bong-seok.jpg',
        'jang-hui-soo': 'assets/kcontent/jang-hui-soo.png',
        'rumi': 'assets/kcontent/rumi.jpg',
        'mira': 'assets/kcontent/mira.jpg',
        'zoey': 'assets/kcontent/zoey.jpg',
        'jinu': 'assets/kcontent/jinu.jpg',
        'glenn-rhee': 'assets/kcontent/glenn-rhee.jpg',
        'jungkook': 'assets/kcontent/jungkook.png',
        'rm': 'assets/kcontent/rm.jpg',
        'jennie': 'assets/kcontent/jennie.jpg',
        'jisoo': 'assets/kcontent/jisoo.png',
        'karina': 'assets/kcontent/karina.jpg',
        'ma-dong-seok': 'assets/kcontent/ma-dong-seok.jpg',
        'kim-tae-ri': 'assets/kcontent/kim-tae-ri.png',
        'bae-doona': 'assets/kcontent/bae-doona.png',
        'choi-min-sik': 'assets/kcontent/choi-min-sik.jpg',
        'g-dragon': 'assets/kcontent/g-dragon.png',
        'taeyeon': 'assets/kcontent/taeyeon.jpg',
        'iu': 'assets/kcontent/iu.png',
        'suga': 'assets/kcontent/suga.png',
        'jimin': 'assets/kcontent/jimin.jpg',
        'v-bts': 'assets/kcontent/v-bts.jpg',
        'cha-eun-woo': 'assets/kcontent/cha-eun-woo.png',
        'wonyoung': 'assets/kcontent/wonyoung.png',
        'nayeon': 'assets/kcontent/nayeon.jpg',
        'taemin': 'assets/kcontent/taemin.jpg',
        'seulgi': 'assets/kcontent/seulgi.jpg',
        'hanni': 'assets/kcontent/hanni.jpg',
        'psy': 'assets/kcontent/psy.jpg',
        'boa': 'assets/kcontent/boa.png',
        'rain': 'assets/kcontent/rain.jpg',
        'lee-min-ho': 'assets/kcontent/lee-min-ho.png',
        'kim-soo-hyun': 'assets/kcontent/kim-soo-hyun.png',
        'lee-dong-wook': 'assets/kcontent/lee-dong-wook.jpg',
        'bae-suzy': 'assets/kcontent/bae-suzy.jpg',
        'park-bo-gum': 'assets/kcontent/park-bo-gum.png',
        'hyuna': 'assets/kcontent/hyuna.png',
        'wonho': 'assets/kcontent/wonho.png',
        'taeyang': 'assets/kcontent/taeyang.jpg',
        'gong-hyo-jin': 'assets/kcontent/gong-hyo-jin.png',
        'jun-ji-hyun': 'assets/kcontent/jun-ji-hyun.png',
        'lee-jong-suk': 'assets/kcontent/lee-jong-suk.png',
        'song-hye-kyo': 'assets/kcontent/song-hye-kyo.jpg',
        'song-kang': 'assets/kcontent/song-kang.png',
        'kim-yoo-jung': 'assets/kcontent/kim-yoo-jung.png',
        'kim-seon-ho': 'assets/kcontent/kim-seon-ho.png',
        'han-so-hee': 'assets/kcontent/han-so-hee.jpg',
        'rowoon': 'assets/kcontent/rowoon.png',
        'kwon-eun-bi': 'assets/kcontent/kwon-eun-bi.jpg',
        'ahn-yu-jin': 'assets/kcontent/ahn-yu-jin.png',
        'winter-aespa': 'assets/kcontent/winter-aespa.jpg',
        'doyoung-nct': 'assets/kcontent/doyoung-nct.jpg',
        'ji-chang-wook': 'assets/kcontent/ji-chang-wook.png',
        'park-shin-hye': 'assets/kcontent/park-shin-hye.jpg',
        'kim-go-eun': 'assets/kcontent/kim-go-eun.jpg',
        'shin-min-a': 'assets/kcontent/shin-min-a.jpg',
        'kim-ji-won': 'assets/kcontent/kim-ji-won.jpg',
        'byeon-woo-seok': 'assets/kcontent/byeon-woo-seok.jpg',
        'kim-hye-yoon': 'assets/kcontent/kim-hye-yoon.jpg',
        'ahn-hyo-seop': 'assets/kcontent/ahn-hyo-seop.jpg',
        'lee-jae-wook': 'assets/kcontent/lee-jae-wook.jpg',
        'go-min-si': 'assets/kcontent/go-min-si.jpg',
        'rose-blackpink': 'assets/kcontent/rose-blackpink.jpg',
        'lisa-blackpink': 'assets/kcontent/lisa-blackpink.jpg',
        'jin-bts': 'assets/kcontent/jin-bts.jpg',
        'sana-twice': 'assets/kcontent/sana-twice.jpg',
        'hyunjin-skz': 'assets/kcontent/hyunjin-skz.jpg',
        'kai-exo': 'assets/kcontent/kai-exo.jpg',
        'bong-joon-ho': 'assets/kcontent/bong-joon-ho.jpg',
        'park-chan-wook': 'assets/kcontent/park-chan-wook.jpg',
        'youn-yuh-jung': 'assets/kcontent/youn-yuh-jung.jpg',
        'lee-young-ae': 'assets/kcontent/lee-young-ae.jpg',
        'cho-yong-pil': 'assets/kcontent/cho-yong-pil.jpg',
        'nam-june-paik': 'assets/kcontent/nam-june-paik.jpg',
        'han-kang': 'assets/kcontent/han-kang.jpg',
        'hwang-dong-hyuk': 'assets/kcontent/hwang-dong-hyuk.jpg',
        'lee-jung-jae': 'assets/kcontent/lee-jung-jae.jpg',
        'gong-yoo': 'assets/kcontent/gong-yoo.jpg',
        'park-seo-joon': 'assets/kcontent/park-seo-joon.jpg'
    };
    const KCONTENT_TRAIT_BY_STYLE = {
        ko: {
            history: '서사 밀도',
            shopping: '트렌드 감각',
            night: '야간 무드',
            nature: '회복 리듬',
            family: '안정 동선',
            art: '전시 감도',
            local: '로컬 밀착'
        },
        en: {
            history: 'Narrative Depth',
            shopping: 'Trend Sense',
            night: 'Night Mood',
            nature: 'Recovery Rhythm',
            family: 'Stable Pace',
            art: 'Gallery Vibe',
            local: 'Local Texture'
        }
    };
    const KCONTENT_TREND_RANK = [
        'jungkook', 'jennie', 'jisoo', 'wonyoung', 'karina', 'hanni', 'v-bts', 'jimin', 'rm', 'suga',
        'cha-eun-woo', 'iu', 'g-dragon', 'taeyeon', 'song-kang', 'han-so-hee', 'kim-soo-hyun', 'lee-min-ho', 'jun-ji-hyun', 'park-bo-gum',
        'song-hye-kyo', 'ji-chang-wook', 'kim-yoo-jung', 'kim-seon-ho', 'ahn-yu-jin', 'winter-aespa', 'doyoung-nct', 'kwon-eun-bi',
        'lee-jung-jae', 'gong-yoo', 'park-seo-joon',
        'rose-blackpink', 'lisa-blackpink', 'jin-bts', 'sana-twice', 'hyunjin-skz', 'kai-exo',
        'park-shin-hye', 'kim-go-eun', 'kim-ji-won', 'byeon-woo-seok', 'kim-hye-yoon', 'ahn-hyo-seop', 'lee-jae-wook', 'go-min-si', 'shin-min-a',
        'bong-joon-ho', 'park-chan-wook', 'youn-yuh-jung', 'lee-young-ae', 'cho-yong-pil', 'nam-june-paik', 'han-kang', 'hwang-dong-hyuk'
    ];
    const KCONTENT_FOOD_SPOTS = [
        { name: '광장시장 빈대떡 골목', district: '종로구', styles: ['local', 'night'], desc: { ko: '현장감 있는 로컬 에너지', en: 'High-energy local street food vibe' } },
        { name: '익선동 한옥 다이닝', district: '종로구', styles: ['art', 'history'], desc: { ko: '한옥 감성과 현대 플레이팅 조합', en: 'Hanok ambiance with modern plating' } },
        { name: '망원동 미식 골목', district: '마포구', styles: ['local', 'shopping'], desc: { ko: '가성비와 트렌드가 공존', en: 'Budget-friendly yet trend-forward choices' } },
        { name: '연남동 디저트 바', district: '마포구', styles: ['art', 'shopping'], desc: { ko: '비주얼 디저트와 감성 카페', en: 'Visual desserts and mood cafes' } },
        { name: '성수 수제버거 라인', district: '성동구', styles: ['shopping', 'night'], desc: { ko: '힙한 공간과 강한 개성 메뉴', en: 'Hip venues with bold signature menus' } },
        { name: '한남동 파인다이닝 스트리트', district: '용산구', styles: ['art', 'night'], desc: { ko: '디자인 감도 높은 저녁 코스', en: 'Design-forward evening dining routes' } },
        { name: '이태원 글로벌 푸드존', district: '용산구', styles: ['night', 'local'], desc: { ko: '다국적 메뉴와 늦은 영업', en: 'Global menu options with late-night hours' } },
        { name: '강남 모던 한식 코스', district: '강남구', styles: ['shopping', 'family'], desc: { ko: '접근성 좋은 고급 한식', en: 'Accessible premium Korean dining' } },
        { name: '압구정 브런치 라운지', district: '강남구', styles: ['shopping', 'art'], desc: { ko: '스타일 중심 브런치 동선', en: 'Style-driven brunch itinerary stop' } },
        { name: '서촌 전통주 바', district: '종로구', styles: ['history', 'night'], desc: { ko: '역사 거리와 어울리는 전통주 페어링', en: 'Traditional drink pairing in historic streets' } },
        { name: '여의도 한강 야식 포인트', district: '영등포구', styles: ['night', 'family'], desc: { ko: '강변 산책 후 가벼운 야식', en: 'Light late bite after riverside walk' } },
        { name: '송리단길 캐주얼 다이닝', district: '송파구', styles: ['nature', 'shopping'], desc: { ko: '석촌호수 인근 감성 식사', en: 'Mood dining near Seokchon Lake' } },
        { name: '을지로 포차 루프', district: '중구', styles: ['night', 'local'], desc: { ko: '레트로 골목과 야간 활기가 강한 코스', en: 'Retro alleys with strong late-night energy' } },
        { name: '서래마을 브런치 스트리트', district: '서초구', styles: ['nature', 'art'], desc: { ko: '여유로운 오전 동선에 어울리는 브런치', en: 'Brunch street suited for relaxed morning pace' } },
        { name: '성북동 한정식 라인', district: '성북구', styles: ['history', 'family'], desc: { ko: '정갈한 분위기의 전통식 추천', en: 'Traditional dining in a calm and refined setting' } },
        { name: '문래 창작촌 펍 라인', district: '영등포구', styles: ['art', 'night'], desc: { ko: '아트 무드와 야간 분위기를 동시에', en: 'Art-forward mood blended with nightlife' } },
        { name: '익선동 디저트 한옥길', district: '종로구', styles: ['history', 'art'], desc: { ko: '고즈넉한 한옥과 디저트 포인트 결합', en: 'Quiet hanok texture paired with dessert spots' } },
        { name: '성수 베이커리 투어', district: '성동구', styles: ['shopping', 'local'], desc: { ko: '트렌디한 공간에서 즐기는 로컬 베이커리', en: 'Local bakery trail inside trend-setting neighborhoods' } },
        { name: '신사 가로수길 비스트로', district: '강남구', styles: ['shopping', 'night'], desc: { ko: '쇼핑 후 이어지는 저녁 다이닝 루트', en: 'Evening bistro flow after trend shopping' } },
        { name: '청담 시그니처 다이닝', district: '강남구', styles: ['shopping', 'art'], desc: { ko: '고감도 인테리어와 프리미엄 코스', en: 'Premium course with high-design interiors' } },
        { name: '노량진 수산 야식', district: '동작구', styles: ['local', 'night'], desc: { ko: '현장감 강한 로컬 해산물 체험', en: 'Lively local seafood experience after dark' } },
        { name: '혜화 소극장 골목 식당', district: '종로구', styles: ['art', 'local'], desc: { ko: '공연 전후 즐기기 좋은 로컬 식당', en: 'Local dining ideal before or after theater shows' } }
    ];
    let CURRENT_LANG = 'ko';
    const FX_RATE_STORAGE_KEY = 'seoul-explorer-fx-rate';
    const FX_RATE_UPDATED_AT_STORAGE_KEY = 'seoul-explorer-fx-rate-updated-at';
    const FX_RATE_DEFAULT = 1400;
    const FX_RATE_API_URL = 'https://api.frankfurter.app/latest?from=USD&to=KRW';
    const FX_RATE_REFRESH_MS = 30 * 60 * 1000;
    const COURSE_BUDGET_STORAGE_KEY = 'seoul-explorer-course-budget';
    const OFFLINE_COURSE_PLAN_STORAGE_KEY = 'seoul-explorer-offline-course-plan-v1';
    let CURRENT_FX_RATE = FX_RATE_DEFAULT;
    let CURRENT_FX_UPDATED_AT = null;
    const DISTRICT_LABELS_EN = (window.GOSEOUL_LOOKUPS && window.GOSEOUL_LOOKUPS.DISTRICT_LABELS_EN)
        ? window.GOSEOUL_LOOKUPS.DISTRICT_LABELS_EN
        : {};

    const DISTRICT_GEO_COORDS = (window.GOSEOUL_LOOKUPS && window.GOSEOUL_LOOKUPS.DISTRICT_GEO_COORDS)
        ? window.GOSEOUL_LOOKUPS.DISTRICT_GEO_COORDS
        : {};

    const CATEGORY_LABELS_EN = (window.GOSEOUL_LOOKUPS && window.GOSEOUL_LOOKUPS.CATEGORY_LABELS_EN)
        ? window.GOSEOUL_LOOKUPS.CATEGORY_LABELS_EN
        : {};

    const PLACE_NAME_EN = (window.GOSEOUL_LOOKUPS && window.GOSEOUL_LOOKUPS.PLACE_NAME_EN)
        ? window.GOSEOUL_LOOKUPS.PLACE_NAME_EN
        : {};


    function styleLabels() {
        return STYLE_LABELS_BY_LANG[CURRENT_LANG] || STYLE_LABELS_BY_LANG.ko;
    }

    function getStyleLabel(styleKey) {
        return styleLabels()[styleKey] || styleKey;
    }

    function getDistrictLabel(district) {
        if (CURRENT_LANG !== 'en') return district;
        return DISTRICT_LABELS_EN[district] || district;
    }

    function getCategoryLabel(category) {
        if (CURRENT_LANG !== 'en') return category;
        return CATEGORY_LABELS_EN[category] || category;
    }

    function getPlaceName(placeOrName) {
        const name = typeof placeOrName === 'string' ? placeOrName : placeOrName?.name;
        if (!name) return '';
        if (CURRENT_LANG !== 'en') return name;
        return PLACE_NAME_EN[name] || name;
    }

    const PLACE_SEEDS = (window.GOSEOUL_SITE_DATA && Array.isArray(window.GOSEOUL_SITE_DATA.PLACE_SEEDS))
        ? window.GOSEOUL_SITE_DATA.PLACE_SEEDS
        : [];


    const places = PLACE_SEEDS.map((seed, index) => {
        const id = `place-${String(index + 1).padStart(3, '0')}`;
        const ratingBase = 4.3 + (index % 5) * 0.1;
        const reviewBase = 7800 + index * 920;
        const shortDescription = `${seed.name}은(는) ${seed.category} 여행자에게 특히 추천되는 서울 대표 스팟입니다.`;
        const description = `${seed.name}은(는) ${seed.district}에 위치한 ${seed.category} 명소입니다. 외국인 방문자가 동선에 넣기 쉬운 위치와 콘텐츠를 갖추고 있어, ${STYLE_LABELS_BY_LANG.ko[seed.styles[0]]} 중심 일정에 적합합니다.`;
        const nameEn = PLACE_NAME_EN[seed.name] || seed.name;
        const districtEn = DISTRICT_LABELS_EN[seed.district] || seed.district;
        const categoryEn = CATEGORY_LABELS_EN[seed.category] || seed.category;
        const shortDescriptionEn = `${nameEn} is a representative Seoul spot recommended for ${categoryEn.toLowerCase()} travelers.`;
        const descriptionEn = `${nameEn} is located in ${districtEn} and is a major ${categoryEn.toLowerCase()} destination. It is easy to include in a first-time Seoul itinerary and works well for a ${STYLE_LABELS_BY_LANG.en[seed.styles[0]].toLowerCase()} focused plan.`;
        const reviews = [
            `${seed.name}은(는) 접근성이 좋아 초행 여행자도 방문하기 편하다는 평가가 많습니다.`,
            `${STYLE_LABELS_BY_LANG.ko[seed.styles[0]]} 중심 여행 코스에 넣기 좋고 체류 시간이 유연하다는 의견이 많습니다.`,
            `혼잡 시간대를 피하면 더 쾌적하게 즐길 수 있다는 후기가 있습니다.`
        ];

        return {
            id,
            name: seed.name,
            nameEn,
            category: seed.category,
            district: seed.district,
            geo: DISTRICT_GEO_COORDS[seed.district] || null,
            bestTime: seed.bestTime,
            ratingValue: Number(ratingBase.toFixed(1)),
            reviewCountValue: reviewBase,
            rating: `${ratingBase.toFixed(1)} / 5`,
            reviewCount: `${reviewBase.toLocaleString()}+`,
            shortDescription,
            description,
            shortDescriptionEn,
            descriptionEn,
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
        return 'en';
    }

    function withCurrentLang(urlText) {
        const url = new URL(urlText, window.location.href);
        if (url.origin !== window.location.origin) return url.toString();
        if (CURRENT_LANG === 'ko') {
            url.searchParams.set('lang', 'ko');
        } else {
            url.searchParams.delete('lang');
        }
        return `${url.pathname}${url.search}${url.hash}`;
    }

    function updateLanguageButton() {
        const btn = document.getElementById('lang-toggle-btn');
        if (!btn) return;
        btn.textContent = CURRENT_LANG === 'en' ? 'KO' : 'EN';
        btn.setAttribute('aria-label', CURRENT_LANG === 'en' ? 'Switch language' : '언어 전환');
    }

    function getEntryCtaVariant() {
        const saved = localStorage.getItem(ENTRY_CTA_VARIANT_KEY);
        if (saved === 'A' || saved === 'B') return saved;
        const assigned = Math.random() < 0.5 ? 'A' : 'B';
        localStorage.setItem(ENTRY_CTA_VARIANT_KEY, assigned);
        return assigned;
    }

    function getEntryOverlayCopyVariant() {
        const saved = localStorage.getItem(ENTRY_OVERLAY_COPY_VARIANT_KEY);
        if (saved === 'A' || saved === 'B') return saved;
        const assigned = Math.random() < 0.5 ? 'A' : 'B';
        localStorage.setItem(ENTRY_OVERLAY_COPY_VARIANT_KEY, assigned);
        return assigned;
    }

    function applyEnglishCopy() {
        const navLinks = document.querySelectorAll('.top-nav a');
        if (navLinks[0]) navLinks[0].textContent = 'Explore';
        if (navLinks[1]) navLinks[1].textContent = 'Planner';
        if (navLinks[2]) navLinks[2].textContent = 'Generations';
        if (navLinks[3]) navLinks[3].textContent = 'Screen Picks';
        if (navLinks[4]) navLinks[4].textContent = 'Saju';

        const footerLinks = document.querySelectorAll('.footer-inner nav a');
        if (footerLinks[0]) footerLinks[0].textContent = 'About';
        if (footerLinks[1]) footerLinks[1].textContent = 'Contact';
        if (footerLinks[2]) footerLinks[2].textContent = 'Editorial Policy';
        if (footerLinks[3]) footerLinks[3].textContent = 'Terms of Use';
        if (footerLinks[4]) footerLinks[4].textContent = 'Privacy Policy';

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
            const searchInput = document.getElementById('place-search-input');
            if (searchInput) searchInput.placeholder = 'Search by place, district, or category';
            const sortSelect = document.getElementById('sort-select');
            if (sortSelect) {
                const popularOption = sortSelect.querySelector('option[value="popular"]');
                const ratingOption = sortSelect.querySelector('option[value="rating"]');
                const reviewsOption = sortSelect.querySelector('option[value="reviews"]');
                if (popularOption) popularOption.textContent = 'Most Popular';
                if (ratingOption) ratingOption.textContent = 'Top Rated';
                if (reviewsOption) reviewsOption.textContent = 'Most Reviewed';
            }
            document.querySelectorAll('#quick-tag-list .tag-chip').forEach((btn) => {
                const tagKey = btn.dataset.tag;
                if (!tagKey) return;
                btn.textContent = TAG_LABELS_BY_LANG.en[tagKey] || btn.textContent;
            });
            const geoPanelTitle = document.getElementById('geo-panel-title');
            const geoPanelDesc = document.getElementById('geo-panel-desc');
            const geoCoreTitle = document.getElementById('geo-core-title');
            const geoCoreDesc = document.getElementById('geo-core-desc');
            const geoTrendTitle = document.getElementById('geo-trend-title');
            const geoTrendDesc = document.getElementById('geo-trend-desc');
            const geoFamilyTitle = document.getElementById('geo-family-title');
            const geoFamilyDesc = document.getElementById('geo-family-desc');
            const faqPanelTitle = document.getElementById('faq-panel-title');
            const faqQ1 = document.getElementById('faq-q1');
            const faqA1 = document.getElementById('faq-a1');
            const faqQ2 = document.getElementById('faq-q2');
            const faqA2 = document.getElementById('faq-a2');
            const faqQ3 = document.getElementById('faq-q3');
            const faqA3 = document.getElementById('faq-a3');
            if (geoPanelTitle) geoPanelTitle.textContent = 'Seoul Area Coverage';
            if (geoPanelDesc) geoPanelDesc.textContent = 'We prioritize high-demand visitor zones and provide direct map-ready movement links.';
            if (geoCoreTitle) geoCoreTitle.textContent = 'Core City Zone';
            if (geoCoreDesc) geoCoreDesc.textContent = 'Fast start around Jongno, Jung, and Yongsan for history/culture and night routes.';
            if (geoTrendTitle) geoTrendTitle.textContent = 'Trend Zone';
            if (geoTrendDesc) geoTrendDesc.textContent = 'Explore shopping, cafes, and K-content hubs in Mapo, Seongdong, and Gangnam.';
            if (geoFamilyTitle) geoFamilyTitle.textContent = 'Family & Nature Zone';
            if (geoFamilyDesc) geoFamilyDesc.textContent = 'Parks, Han River, and theme-friendly spots across Songpa, Seocho, and Yeongdeungpo.';
            if (faqPanelTitle) faqPanelTitle.textContent = 'Frequently Asked Questions';
            if (faqQ1) faqQ1.textContent = 'Where should first-time Seoul visitors start?';
            if (faqA1) faqA1.textContent = 'Choose a style in Explore first, then connect your top 3 spots to the course page for the most stable itinerary.';
            if (faqQ2) faqQ2.textContent = 'How often do map and rating data change?';
            if (faqA2) faqA2.textContent = 'Map and rating data can change with external providers, so check the detail-page map link again before visiting.';
            if (faqQ3) faqQ3.textContent = 'Can I use this site fully in English?';
            if (faqA3) faqA3.textContent = 'Use the top language toggle to switch key UI and guide text between English and Korean.';
        }
        if (page === 'course') {
            const hero = document.querySelector('.hero');
            const eyebrow = hero?.querySelector('.eyebrow');
            const h1 = hero?.querySelector('h1');
            const p = hero?.querySelector('p:not(.eyebrow)');
            if (eyebrow) eyebrow.textContent = 'Walking Day Plan';
            if (h1) h1.textContent = 'One-Day Seoul Course by Travel Style';
            if (p) p.textContent = 'A compact walking plan with district restaurants and hotel recommendations based on Google ratings.';
            const journeyTitle = document.getElementById('journey-nav-title');
            if (journeyTitle) journeyTitle.textContent = 'Quick Navigation';
            const styleTitle = document.getElementById('course-style-title');
            if (styleTitle) styleTitle.textContent = 'Choose a Course Style';
            const budgetTitle = document.getElementById('budget-mode-title');
            const budgetDesc = document.getElementById('budget-mode-desc');
            const insightTitle = document.getElementById('course-insight-title');
            const saveBtn = document.getElementById('course-save-offline-btn');
            const shareBtn = document.getElementById('course-share-card-btn');
            const offlinePlanTitle = document.getElementById('offline-plan-title');
            const offlinePlanSearchInput = document.getElementById('offline-plan-search-input');
            const toolsNote = document.getElementById('course-tools-note');
            if (budgetTitle) budgetTitle.textContent = 'Travel Budget Mode';
            if (budgetDesc) budgetDesc.textContent = 'Automatically adjusts price level and transport cost estimate by budget.';
            if (insightTitle) insightTitle.textContent = 'Time and Cost Summary';
            if (saveBtn) saveBtn.textContent = 'Save Offline';
            if (shareBtn) shareBtn.textContent = 'Create Share Card';
            if (offlinePlanTitle) offlinePlanTitle.textContent = 'Saved Offline Plans';
            if (offlinePlanSearchInput) offlinePlanSearchInput.placeholder = 'Search saved plans';
            if (toolsNote) toolsNote.textContent = 'Saved plans are stored in your browser on this device.';
            document.querySelectorAll('.style-tab-btn').forEach((btn) => {
                const styleKey = btn.dataset.style;
                if (styleKey) btn.textContent = getStyleLabel(styleKey);
            });
            const budgetTabs = document.querySelectorAll('#course-budget-tabs .budget-tab-btn');
            if (budgetTabs[0]) budgetTabs[0].textContent = 'Budget';
            if (budgetTabs[1]) budgetTabs[1].textContent = 'Standard';
            if (budgetTabs[2]) budgetTabs[2].textContent = 'Premium';
            const hotelHeading = document.querySelector('#course-section-hotel h2');
            const foodHeading = document.querySelector('#course-section-food h2');
            const guideHeading = document.querySelector('#course-section-guide h2');
            if (hotelHeading) hotelHeading.textContent = 'Top 5 Hotels (Google Rating)';
            if (foodHeading) foodHeading.textContent = 'District Restaurant Picks (Breakfast/Lunch/Dinner/Drinks)';
            if (guideHeading) guideHeading.textContent = 'How to Use This Course';
            const routeLink = document.getElementById('course-route-link');
            if (routeLink) routeLink.textContent = 'Open Walking Route in Google Maps';
            const journeyLinks = document.querySelectorAll('.journey-step-link');
            if (journeyLinks[0]) journeyLinks[0].textContent = '1. View Route';
            if (journeyLinks[1]) journeyLinks[1].textContent = '2. Choose Hotel';
            if (journeyLinks[2]) journeyLinks[2].textContent = '3. Choose Restaurants';
            const guideParagraphs = document.querySelectorAll('#course-section-guide p');
            if (guideParagraphs[0]) {
                guideParagraphs[0].textContent = 'This route is optimized for walkable movement with optional short subway transfers. A typical flow is history/culture in the morning, cafe or shopping in the afternoon, and night views or local dining in the evening.';
            }
            if (guideParagraphs[1]) {
                guideParagraphs[1].textContent = 'Hotel and restaurant recommendations are prioritized by Google ratings and review counts, with broadcast curation shown as a secondary reference. Check map links for latest opening hours and reservations.';
            }
        }
        if (page === 'place') {
            const back = document.querySelector('.back-link');
            if (back) back.textContent = '← Back to list';
            const placeMapTitle = document.getElementById('place-map-title');
            const placeReviewTitle = document.getElementById('place-review-title');
            const placeNotesTitle = document.getElementById('place-notes-title');
            if (placeMapTitle) placeMapTitle.textContent = 'Google Map';
            if (placeReviewTitle) placeReviewTitle.textContent = 'Review Summary';
            if (placeNotesTitle) placeNotesTitle.textContent = 'Traveler Notes';
            const metaLabels = document.querySelectorAll('.label-value span');
            if (metaLabels[0]) metaLabels[0].textContent = 'Rank';
            if (metaLabels[1]) metaLabels[1].textContent = 'District';
            if (metaLabels[2]) metaLabels[2].textContent = 'Best Time';
            if (metaLabels[3]) metaLabels[3].textContent = 'Rating';
            if (metaLabels[4]) metaLabels[4].textContent = 'Review Count';
            const mapExternalLink = document.getElementById('map-external-link');
            if (mapExternalLink) mapExternalLink.textContent = 'Open in Google Maps';
            const shareCopyBtn = document.getElementById('place-share-copy-btn');
            if (shareCopyBtn) shareCopyBtn.textContent = 'Copy Share Link';
            const guidePanel = document.querySelectorAll('.panel')[2];
            const guideParagraphs = guidePanel ? guidePanel.querySelectorAll('p') : [];
            if (guideParagraphs[0]) {
                guideParagraphs[0].textContent = 'This page helps international visitors quickly understand each spot with core facts, best-time guidance, and direct map links. Opening hours, closures, and ticket prices can change by season and operator policy, so confirm on official channels before visiting.';
            }
            if (guideParagraphs[1]) {
                guideParagraphs[1].textContent = 'Ratings and review counts are reference indicators. Your experience may vary by preference and visit time. Compare both strengths and weaknesses in reviews, and plan around off-peak windows when possible.';
            }
        }
        if (page === 'partner') {
            const eyebrow = document.querySelector('.panel .eyebrow');
            const h1 = document.querySelector('.panel h1');
            if (eyebrow) eyebrow.textContent = 'Contact';
            if (h1) h1.textContent = 'Inquiry';
            document.title = 'GoSeoul | Contact';
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute('content', 'Contact page for GoSeoul. Submit partnership proposals and general inquiries via Formspree.');
            const section = document.querySelector('.container.narrow .panel');
            if (section) {
                const p = section.querySelector('p');
                if (p) p.textContent = 'Submit partnership or general inquiries based on the selected place.';
                const selectedPlace = section.querySelector('.selected-place');
                if (selectedPlace) {
                    const strong = selectedPlace.querySelector('strong');
                    selectedPlace.textContent = 'Selected place: ';
                    if (strong) selectedPlace.appendChild(strong);
                }
                const labels = section.querySelectorAll('label');
                if (labels[0]) labels[0].textContent = 'Name';
                if (labels[1]) labels[1].textContent = 'Email';
                if (labels[2]) labels[2].textContent = 'Company/Brand';
                if (labels[3]) labels[3].textContent = 'Message';
                const submitBtn = section.querySelector('button[type="submit"]');
                if (submitBtn) submitBtn.textContent = 'Send Inquiry';
            }
            const guideTitle = document.querySelectorAll('.panel h2')[0];
            if (guideTitle) guideTitle.textContent = 'Contact Guide';
            const guidePanel = document.querySelectorAll('.container.narrow .panel')[1];
            const guideParagraphs = guidePanel ? guidePanel.querySelectorAll('p') : [];
            if (guideParagraphs[0]) {
                guideParagraphs[0].textContent = 'GoSeoul reviews requests based on user value, information reliability, and operational fit.';
            }
            if (guideParagraphs[1]) {
                guideParagraphs[1].textContent = 'Specific goals and expected outcomes help us review faster than generic ad-only requests. Submitted details are used only for inquiry response.';
            }
        }
        if (page === 'terms') {
            const eyebrow = document.querySelector('.panel .eyebrow');
            const h1 = document.querySelector('.panel h1');
            if (eyebrow) eyebrow.textContent = 'Terms';
            if (h1) h1.textContent = 'Terms of Use';
            document.title = 'GoSeoul | Terms of Use';
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute('content', 'Terms of Use for GoSeoul, including service scope, user responsibilities, content use rules, disclaimers, and contact process.');
            const section = document.querySelector('.container.narrow .panel');
            if (section) {
                const paragraphs = section.querySelectorAll('p');
                const headings = section.querySelectorAll('h2');
                if (paragraphs[0]) paragraphs[0].textContent = 'GoSeoul is an informational guide service for planning and exploring Seoul travel. Please review the terms below before using the service.';
                if (headings[0]) headings[0].textContent = '1. Service Scope';
                if (paragraphs[1]) paragraphs[1].textContent = 'The service provides place information, course recommendations, price estimates, and content-based suggestions. Displayed details are references and may change by third-party services or on-site conditions.';
                if (headings[1]) headings[1].textContent = '2. User Responsibility';
                if (paragraphs[2]) paragraphs[2].textContent = 'Users should treat this service as reference material, not final decision authority. Final responsibility for payment, reservation, and movement checks remains with the user.';
                if (headings[2]) headings[2].textContent = '3. Content Use';
                if (paragraphs[3]) paragraphs[3].textContent = 'Text, editorial structure, and design on this site are owned by the operator. External API and third-party data follow each provider\'s policy.';
                if (headings[3]) headings[3].textContent = '4. Ads and Partnerships';
                if (paragraphs[4]) paragraphs[4].textContent = 'The site may include ads or partnership links. Ads are operated separately from editorial content, and editorial standards follow the policy page.';
                if (headings[4]) headings[4].textContent = '5. Disclaimer';
                if (paragraphs[5]) paragraphs[5].textContent = 'The operator may limit liability within applicable law for losses caused by force majeure, network failures, or third-party data issues beyond operational control.';
                if (headings[5]) headings[5].textContent = '6. Contact';
                if (paragraphs[6]) paragraphs[6].textContent = 'For terms-related inquiries, use the contact page.';
            }
        }
        if (page === 'privacy') {
            const eyebrow = document.querySelector('.panel .eyebrow');
            const h1 = document.querySelector('.panel h1');
            if (eyebrow) eyebrow.textContent = 'Privacy';
            if (h1) h1.textContent = 'Privacy Policy';
            document.title = 'GoSeoul | Privacy Policy';
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute('content', 'Learn what data GoSeoul handles, which external services are connected, and how user requests and data retention are managed.');
            const section = document.querySelector('.container.narrow .panel');
            if (section) {
                const paragraphs = section.querySelectorAll('p');
                const headings = section.querySelectorAll('h2');
                const listBlocks = section.querySelectorAll('ul.review-list');
                const collectedItems = listBlocks[0]?.querySelectorAll('li') || [];
                const externalItems = listBlocks[1]?.querySelectorAll('li') || [];
                if (paragraphs[0]) paragraphs[0].textContent = 'This site processes only the minimum information required to operate the service.';
                if (headings[0]) headings[0].textContent = 'Collected Data';
                if (collectedItems[0]) collectedItems[0].textContent = 'Partnership inquiry form (Formspree): name, email, and inquiry message';
                if (collectedItems[1]) collectedItems[1].textContent = 'Saju travel recommender: birth date and calendar type input (calculated in browser, not stored on server)';
                if (headings[1]) headings[1].textContent = 'External Services';
                if (externalItems[0]) externalItems[0].textContent = 'Google Maps/Places: maps and place data display';
                if (externalItems[1]) externalItems[1].textContent = 'Google AdSense: ad delivery and performance measurement';
                if (externalItems[2]) externalItems[2].textContent = 'Formspree: inquiry form submission';
                if (paragraphs[1]) paragraphs[1].textContent = 'For external services, each provider\'s privacy policy applies first.';
                if (paragraphs[2]) paragraphs[2].textContent = 'Users may request information-handling support through contact channels, and the operator responds within a reasonable scope. Avoid entering unnecessary sensitive data; data unrelated to operations is not collected.';
                if (paragraphs[3]) paragraphs[3].textContent = 'Effective date: 2026-02-14';
            }
        }
        if (page === 'about') {
            const eyebrow = document.querySelector('.panel .eyebrow');
            const h1 = document.querySelector('.panel h1');
            if (eyebrow) eyebrow.textContent = 'About';
            if (h1) h1.textContent = 'About This Site';
            document.title = 'GoSeoul | About';
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute('content', 'Official guide to GoSeoul mission, content scope, data sources, and update principles.');
            const section = document.querySelector('.container.narrow .panel');
            if (section) {
                const paragraphs = section.querySelectorAll('p');
                const heading = section.querySelector('h2');
                const li = section.querySelectorAll('ul.review-list li');
                if (paragraphs[0]) paragraphs[0].textContent = 'GoSeoul is an information-first website for international visitors, designed to make Seoul easier to understand and navigate with practical place data, route suggestions, and map links.';
                if (heading) heading.textContent = 'What We Provide';
                if (li[0]) li[0].textContent = 'Ranked Seoul highlights with style-based exploration';
                if (li[1]) li[1].textContent = 'Walk-focused one-day course suggestions';
                if (li[2]) li[2].textContent = 'District restaurant picks (breakfast/lunch/dinner/drinks)';
                if (li[3]) li[3].textContent = 'Google Maps links and rating/review-based reference data';
                if (paragraphs[1]) paragraphs[1].textContent = 'We prioritize navigability and useful information density over heavy ad placement. Recommendations are organized by travel intent and include route and timing guidance for direct schedule use. We reflect error reports and disclose data sources clearly to maintain site quality.';
                if (paragraphs[2]) paragraphs[2].textContent = 'Last updated: 2026-02-14';
            }
        }
        if (page === 'editorial') {
            const eyebrow = document.querySelector('.panel .eyebrow');
            const h1 = document.querySelector('.panel h1');
            const h2 = document.querySelector('.panel h2');
            if (eyebrow) eyebrow.textContent = 'Editorial Policy';
            if (h1) h1.textContent = 'Editorial Standards';
            if (h2) h2.textContent = 'Food Recommendation Criteria';
            document.title = 'GoSeoul | Editorial Policy';
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute('content', 'How GoSeoul writes travel content, manages data sources, and separates ads from editorial information.');
            const section = document.querySelector('.container.narrow .panel');
            if (section) {
                const lists = section.querySelectorAll('ul.review-list');
                const policyItems = lists[0]?.querySelectorAll('li') || [];
                const foodItems = lists[1]?.querySelectorAll('li') || [];
                const paragraphs = section.querySelectorAll('p');
                if (policyItems[0]) policyItems[0].textContent = 'We publish only travel information with practical user value.';
                if (policyItems[1]) policyItems[1].textContent = 'Place descriptions are rewritten around travel intent (history/shopping/night view, etc.).';
                if (policyItems[2]) policyItems[2].textContent = 'Quantitative signals like rating/review counts are based on Google API, and fallback data is labeled when outages occur.';
                if (policyItems[3]) policyItems[3].textContent = 'Ads are separated from editorial blocks and placed without harming navigation.';
                if (policyItems[4]) policyItems[4].textContent = 'When error reports arrive, we verify, update, and refresh recommendation lists when needed.';
                if (foodItems[0]) foodItems[0].textContent = 'Primary priority: Google rating and review volume';
                if (foodItems[1]) foodItems[1].textContent = 'Broadcast curation is treated as secondary reference';
                if (foodItems[2]) foodItems[2].textContent = 'Meal categories: breakfast, lunch, dinner, and drinks';
                if (paragraphs[0]) paragraphs[0].textContent = 'Our content is written for real traveler decisions, not just search snippets. We avoid repetitive duplication and show update timing and data state transparently to reduce user confusion.';
                if (paragraphs[1]) paragraphs[1].textContent = 'Policy effective date: 2026-02-14';
            }
        }
        if (page === 'saju') {
            const eyebrow = document.querySelector('.panel .eyebrow');
            const h1 = document.querySelector('.panel h1');
            if (eyebrow) eyebrow.textContent = 'Saju Travel Guide';
            if (h1) h1.textContent = 'Saju-Based Travel Recommender';
        }
        if (page === 'generation') {
            const heroTitle = document.getElementById('generation-hero-title');
            const heroDesc = document.getElementById('generation-hero-desc');
            const panelTitle = document.getElementById('generation-panel-title');
            if (heroTitle) heroTitle.textContent = 'Seoul Courses by Age Group';
            if (heroDesc) heroDesc.textContent = 'Choose by travel pace and group profile, then jump directly to the matching course.';
            if (panelTitle) panelTitle.textContent = 'Recommended Scenarios by Generation';
        }
        if (page === 'kcontent') {
            const titleEl = document.getElementById('kcontent-title');
            const descEl = document.getElementById('kcontent-desc');
            const noteEl = document.getElementById('kcontent-selected-note');
            if (titleEl) titleEl.textContent = 'K-Content Character Travel Recommender';
            if (descEl) descEl.textContent = 'Choose globally popular Korean content characters by photo and open a full recommendation screen.';
            if (noteEl) noteEl.textContent = 'Tap a character card to move to the full recommendation page.';
        }
        if (page === 'kcontent-result') {
            const backEl = document.getElementById('kcontent-back-link');
            const titleEl = document.getElementById('kcontent-result-page-title');
            const descEl = document.getElementById('kcontent-result-page-desc');
            const whyTitle = document.getElementById('kcontent-why-title');
            const spotsTitle = document.getElementById('kcontent-spots-title');
            const foodTitle = document.getElementById('kcontent-food-title');
            if (backEl) backEl.textContent = '← Choose Another Character';
            if (titleEl) titleEl.textContent = 'Character-Based Seoul Recommendation';
            if (descEl) descEl.textContent = 'A long-form interpretation and route recommendation based on your selected character.';
            if (whyTitle) whyTitle.textContent = 'Interpretation and Route Strategy';
            if (spotsTitle) spotsTitle.textContent = 'Recommended Places';
            if (foodTitle) foodTitle.textContent = 'Recommended Food Spots';
        }
        if (page === 'entry') {
            const eyebrow = document.getElementById('entry-eyebrow');
            const title = document.getElementById('entry-title');
            const desc = document.getElementById('entry-desc');
            const showcaseTitle = document.getElementById('entry-showcase-title');
            const showcaseDesc = document.getElementById('entry-showcase-desc');
            const sparkTitle = document.getElementById('entry-spark-title');
            const sparkBtn = document.getElementById('entry-spark-btn');
            const quickChips = document.querySelectorAll('.entry-quick-ui .ui-chip');
            const cta = document.getElementById('entry-primary-cta');
            const ctaNote = document.getElementById('entry-primary-note');
            const secondaryTitle = document.getElementById('entry-secondary-title');
            const explore = document.getElementById('entry-card-explore');
            const course = document.getElementById('entry-card-course');
            const ctaVariant = getEntryCtaVariant();
            if (eyebrow) eyebrow.textContent = 'GoSeoul';
            if (title) title.textContent = 'Start Your Seoul Plan in 10 Seconds';
            if (desc) desc.textContent = 'Pick one path and get map-ready recommendations right away.';
            if (showcaseTitle) showcaseTitle.textContent = 'Today\'s Featured Pick';
            if (showcaseDesc) showcaseDesc.textContent = 'Start here first.';
            if (sparkTitle) sparkTitle.textContent = 'Entrance Mood Check';
            if (sparkBtn) sparkBtn.textContent = 'Draw Today\'s Seoul Mood';
            if (quickChips[0]) quickChips[0].textContent = 'Top Pick';
            if (quickChips[1]) quickChips[1].textContent = 'Route';
            if (quickChips[2]) quickChips[2].textContent = 'Map';
            if (cta) cta.textContent = ctaVariant === 'A' ? 'Get My Seoul Route Now' : 'Start 1-Day Seoul Plan';
            if (ctaNote) ctaNote.textContent = ctaVariant === 'A'
                ? 'Fastest start: build a one-day route first, then expand with spot details.'
                : 'One tap is enough to generate your route, hotel, and food flow.';
            if (secondaryTitle) secondaryTitle.textContent = 'Or start with another path';
            if (explore) explore.innerHTML = '<strong>Explore Top Spots</strong><span>See must-visit places with map-ready links</span>';
            if (course) course.innerHTML = '<strong>Build 1-Day Plan</strong><span>Route, hotel, and food picks in one flow</span>';
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
            if (nextLang === 'ko') nextUrl.searchParams.set('lang', 'ko');
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
        if ((page === 'place.html' || page === 'place') && id) {
            return withCurrentLang(`/places/${encodeURIComponent(id)}`);
        }
        return withCurrentLang(`${page}?id=${encodeURIComponent(id)}`);
    }

    function updateTopNavLinks(id) {
        const courseLink = document.getElementById('course-link');
        const generationLink = document.getElementById('generation-link');
        const kcontentLink = document.getElementById('kcontent-link');
        const commentsLink = document.getElementById('comments-link');
        const place = placeMap[id];
        if (courseLink && place) {
            courseLink.href = withCurrentLang(`course.html?style=${encodeURIComponent(place.styles[0])}`);
        }
        if (generationLink) generationLink.href = withCurrentLang('generation.html');
        if (kcontentLink) kcontentLink.href = withCurrentLang('kcontent.html');
        if (commentsLink) commentsLink.href = withCurrentLang('comments.html');
    }

    function markActiveNav() {
        const page = document.body.dataset.page;
        const links = document.querySelectorAll('.top-nav a');
        links.forEach((link) => link.classList.remove('active'));
        if (page === 'home' || page === 'place') links[0]?.classList.add('active');
        if (page === 'course') links[1]?.classList.add('active');
        if (page === 'generation') links[2]?.classList.add('active');
        if (page === 'kcontent' || page === 'kcontent-result') links[3]?.classList.add('active');
        if (page === 'saju') links[4]?.classList.add('active');
    }

    function applyTheme(theme) {
        const isDark = theme === 'dark';
        document.body.classList.toggle('dark-mode', isDark);
        const btn = document.getElementById('theme-toggle-btn');
        if (btn) {
            btn.textContent = isDark ? 'Light' : 'Dark';
            btn.setAttribute('aria-label', CURRENT_LANG === 'en' ? 'Toggle dark mode' : '다크 모드 전환');
        }
    }

    function initThemeToggle() {
        const btn = document.getElementById('theme-toggle-btn');
        const saved = localStorage.getItem(THEME_STORAGE_KEY);
        applyTheme(saved === 'dark' || saved === 'light' ? saved : 'dark');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const next = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(next);
            localStorage.setItem(THEME_STORAGE_KEY, next);
        });
    }

    function initGlobalMobileDock() {
        if (document.querySelector('.mobile-bottom-dock')) return;
        const page = document.body.dataset.page;
        const labels = CURRENT_LANG === 'en'
            ? { explore: 'Explore', planner: 'Planner', labs: 'Labs', profile: 'Contact' }
            : { explore: '탐색', planner: '플래너', labs: '랩', profile: '문의' };

        const links = [
            { key: 'explore', href: withCurrentLang('explore.html'), pages: ['home', 'place', 'entry'] },
            { key: 'planner', href: withCurrentLang('course.html'), pages: ['course'] },
            { key: 'labs', href: withCurrentLang('kcontent.html'), pages: ['kcontent', 'kcontent-result', 'generation', 'saju'] },
            { key: 'profile', href: withCurrentLang('partner.html'), pages: ['partner', 'about'] }
        ];

        const dock = document.createElement('div');
        dock.className = 'mobile-bottom-dock';
        dock.innerHTML = `
            <nav class="mobile-bottom-dock-inner" aria-label="Mobile">
                ${links.map((item) => {
                    const active = item.pages.includes(page) ? 'active' : '';
                    return `<a class="${active}" href="${item.href}"><span>${labels[item.key]}</span></a>`;
                }).join('')}
            </nav>
        `;
        document.body.appendChild(dock);
    }

    function initPageTransition() {
        const resetPageExitState = () => {
            document.body.classList.remove('page-exit');
        };

        // BFCache/뒤로가기 복원 시 page-exit가 남아 흰 화면이 되는 현상 방지.
        resetPageExitState();
        window.addEventListener('pageshow', resetPageExitState);
        window.addEventListener('popstate', resetPageExitState);
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                resetPageExitState();
            }
        });

        document.addEventListener('click', (event) => {
            const anchor = event.target.closest('a[href]');
            if (!anchor) return;
            if (anchor.target === '_blank' || anchor.hasAttribute('download')) return;
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
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

    function initStickyOffsets() {
        const header = document.querySelector('.site-header');
        const primary = document.querySelector('.sticky-primary');
        if (!header) return;

        const updateStickyVars = () => {
            const headerH = Math.ceil(header.getBoundingClientRect().height);
            const primaryH = primary ? Math.ceil(primary.getBoundingClientRect().height) : 0;
            document.documentElement.style.setProperty('--sticky-header-h', `${headerH}px`);
            document.documentElement.style.setProperty('--sticky-primary-h', `${primaryH}px`);
        };

        updateStickyVars();
        window.addEventListener('resize', updateStickyVars);
        window.addEventListener('orientationchange', updateStickyVars);
        setTimeout(updateStickyVars, 0);
    }

    function initServiceWorker() {
        if (!('serviceWorker' in navigator)) return;
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').catch(() => {
                // Ignore service worker registration failures.
            });
        });
    }

    function styleClass(styleKey) {
        return `style-badge style-${styleKey}`;
    }

    function escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function safeExternalUrl(urlText, fallbackUrl) {
        try {
            const parsed = new URL(String(urlText || ''), window.location.href);
            if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
                return parsed.toString();
            }
        } catch (_) {
            // Fall through to fallback URL.
        }
        return fallbackUrl;
    }

    function parseNumber(value) {
        const numeric = Number(String(value || '').replace(/,/g, '').trim());
        if (!Number.isFinite(numeric)) return null;
        return numeric;
    }

    function formatNumber(value, maxFractionDigits = 0) {
        const locale = CURRENT_LANG === 'en' ? 'en-US' : 'ko-KR';
        return new Intl.NumberFormat(locale, { maximumFractionDigits: maxFractionDigits }).format(value);
    }

    function getCurrentFxRate() {
        return CURRENT_FX_RATE;
    }

    function formatFxUpdatedAt(isoText) {
        const parsed = new Date(String(isoText || ''));
        if (Number.isNaN(parsed.getTime())) {
            return CURRENT_LANG === 'en' ? 'unavailable' : '정보 없음';
        }
        const locale = CURRENT_LANG === 'en' ? 'en-US' : 'ko-KR';
        return new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).format(parsed);
    }

    function getFxRateNoteText() {
        const updatedLabel = formatFxUpdatedAt(CURRENT_FX_UPDATED_AT);
        if (CURRENT_LANG === 'en') {
            return `Auto-updated from international market reference (USD/KRW). Last update: ${updatedLabel}. Final card/cash amount may differ due to fees.`;
        }
        return `국제 환율 기준(USD/KRW)으로 자동 갱신됩니다. 마지막 갱신: ${updatedLabel}. 결제 수수료/시점에 따라 최종 금액은 달라질 수 있습니다.`;
    }

    function refreshFxRateUi() {
        const rateInputEl = document.getElementById('fx-rate-input');
        if (rateInputEl) {
            rateInputEl.value = formatNumber(CURRENT_FX_RATE, 2);
            rateInputEl.readOnly = true;
            rateInputEl.setAttribute('aria-readonly', 'true');
        }
        const rateNoteEl = document.getElementById('fx-rate-note');
        if (rateNoteEl) rateNoteEl.textContent = getFxRateNoteText();
    }

    function applyFxRate(rateValue, updatedAtText) {
        const numericRate = Number(rateValue);
        if (!Number.isFinite(numericRate) || numericRate <= 0) return;
        const nextRate = Math.round(numericRate * 100) / 100;
        const nextUpdatedAt = updatedAtText || new Date().toISOString();
        const changed = Math.abs(nextRate - CURRENT_FX_RATE) > 0.0001 || nextUpdatedAt !== CURRENT_FX_UPDATED_AT;

        CURRENT_FX_RATE = nextRate;
        CURRENT_FX_UPDATED_AT = nextUpdatedAt;
        try {
            localStorage.setItem(FX_RATE_STORAGE_KEY, String(CURRENT_FX_RATE));
            localStorage.setItem(FX_RATE_UPDATED_AT_STORAGE_KEY, CURRENT_FX_UPDATED_AT);
        } catch (_) {
            // Ignore storage failures.
        }
        refreshFxRateUi();
        if (changed) {
            window.dispatchEvent(new CustomEvent('fx-rate-updated', {
                detail: { rate: CURRENT_FX_RATE, updatedAt: CURRENT_FX_UPDATED_AT }
            }));
        }
    }

    function loadFxRateFromStorage() {
        try {
            const storedRate = Number(localStorage.getItem(FX_RATE_STORAGE_KEY) || '');
            const storedUpdatedAt = localStorage.getItem(FX_RATE_UPDATED_AT_STORAGE_KEY);
            if (Number.isFinite(storedRate) && storedRate > 0) {
                CURRENT_FX_RATE = storedRate;
            }
            if (storedUpdatedAt) CURRENT_FX_UPDATED_AT = storedUpdatedAt;
        } catch (_) {
            // Ignore storage access failures.
        }
    }

    async function fetchLatestFxRate() {
        try {
            const response = await fetch(FX_RATE_API_URL, { cache: 'no-store' });
            if (!response.ok) return false;
            const data = await response.json();
            const krwRate = Number(data?.rates?.KRW);
            if (!Number.isFinite(krwRate) || krwRate <= 0) return false;
            const updatedAt = data?.date ? `${data.date}T00:00:00Z` : new Date().toISOString();
            applyFxRate(krwRate, updatedAt);
            return true;
        } catch (_) {
            return false;
        }
    }

    function initFxRateAutoSync() {
        loadFxRateFromStorage();
        refreshFxRateUi();
        fetchLatestFxRate().finally(refreshFxRateUi);
        window.setInterval(() => {
            fetchLatestFxRate().finally(refreshFxRateUi);
        }, FX_RATE_REFRESH_MS);
    }

    async function copyToClipboard(text) {
        const plain = String(text || '');
        if (!plain) return false;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(plain);
            return true;
        }
        const temp = document.createElement('textarea');
        temp.value = plain;
        temp.setAttribute('readonly', 'readonly');
        temp.style.position = 'fixed';
        temp.style.left = '-9999px';
        document.body.appendChild(temp);
        temp.select();
        const copied = document.execCommand('copy');
        document.body.removeChild(temp);
        return copied;
    }

    function renderTravelerTools() {
        const titleEl = document.getElementById('travel-kit-title');
        const introEl = document.getElementById('travel-kit-intro');
        const phraseTitleEl = document.getElementById('phrase-tool-title');
        const phraseGridEl = document.getElementById('phrase-grid');
        const phraseStatusEl = document.getElementById('phrase-copy-status');
        const fxTitleEl = document.getElementById('fx-tool-title');
        const fxIntroEl = document.getElementById('fx-tool-intro');
        const krwLabelEl = document.getElementById('krw-input-label');
        const usdLabelEl = document.getElementById('usd-input-label');
        const rateLabelEl = document.getElementById('fx-rate-label');
        const rateNoteEl = document.getElementById('fx-rate-note');
        const krwInput = document.getElementById('krw-input');
        const usdInput = document.getElementById('usd-input');
        const rateInput = document.getElementById('fx-rate-input');
        if (!titleEl || !introEl || !phraseTitleEl || !phraseGridEl || !phraseStatusEl || !fxTitleEl || !fxIntroEl || !krwLabelEl || !usdLabelEl || !rateLabelEl || !rateNoteEl || !krwInput || !usdInput || !rateInput) return;

        const isEn = CURRENT_LANG === 'en';
        titleEl.textContent = isEn ? 'Practical Tools for First-Time Visitors' : '외국인 여행자 실전 도구';
        introEl.textContent = isEn
            ? 'Use ready-to-show Korean phrases and a quick exchange converter on the go.'
            : '현장에서 바로 쓸 수 있는 한국어 표현과 환율 계산기를 제공합니다.';
        phraseTitleEl.textContent = isEn ? 'Essential Korean Phrases (Tap to Copy)' : '필수 한국어 표현 (터치 복사)';
        fxTitleEl.textContent = isEn ? 'USD ↔ KRW Quick Converter' : 'USD ↔ KRW 빠른 계산기';
        fxIntroEl.textContent = isEn
            ? 'Convert travel budget, food, transportation, and shopping costs instantly.'
            : '예산을 원화/달러로 빠르게 변환해 식비, 교통비, 쇼핑비를 가늠하세요.';
        krwLabelEl.textContent = isEn ? 'Korean Won (KRW)' : '원화 (KRW)';
        usdLabelEl.textContent = isEn ? 'US Dollar (USD)' : '달러 (USD)';
        rateLabelEl.textContent = isEn ? 'Exchange Rate (1 USD = KRW)' : '환율 (1 USD = KRW)';
        krwInput.placeholder = isEn ? 'e.g. 50,000' : '예: 50000';
        usdInput.placeholder = isEn ? 'e.g. 36' : '예: 36';
        rateInput.placeholder = isEn ? 'Auto' : '자동';
        rateInput.readOnly = true;
        rateInput.setAttribute('aria-readonly', 'true');
        rateInput.value = formatNumber(getCurrentFxRate(), 2);
        rateNoteEl.textContent = getFxRateNoteText();

        phraseGridEl.innerHTML = ESSENTIAL_PHRASES.map((phrase) => `
            <article class="phrase-item">
                <p class="phrase-kr">${escapeHtml(phrase.ko)}</p>
                <p class="phrase-sub">${escapeHtml(phrase.roman)}</p>
                <p class="phrase-sub">${escapeHtml(phrase.en)}</p>
                <button class="phrase-copy-btn" type="button" data-copy="${escapeHtml(phrase.ko)}">
                    ${isEn ? 'Copy Korean Sentence' : '한국어 문장 복사'}
                </button>
            </article>
        `).join('');

        phraseGridEl.onclick = async (event) => {
            const button = event.target.closest('.phrase-copy-btn');
            if (!button) return;
            const text = button.getAttribute('data-copy') || '';
            try {
                const copied = await copyToClipboard(text);
                phraseStatusEl.textContent = copied
                    ? (isEn ? 'Copied to clipboard.' : '클립보드에 복사되었습니다.')
                    : (isEn ? 'Copy failed. Please copy manually.' : '복사에 실패했습니다. 직접 복사해주세요.');
            } catch (_) {
                phraseStatusEl.textContent = isEn ? 'Copy failed. Please copy manually.' : '복사에 실패했습니다. 직접 복사해주세요.';
            }
        };

        let syncing = false;
        const syncFromKrw = () => {
            if (syncing) return;
            const rate = getCurrentFxRate();
            const krw = parseNumber(krwInput.value);
            if (!rate || rate <= 0 || krw === null) {
                usdInput.value = '';
                return;
            }
            syncing = true;
            usdInput.value = formatNumber(krw / rate, 2);
            syncing = false;
        };
        const syncFromUsd = () => {
            if (syncing) return;
            const rate = getCurrentFxRate();
            const usd = parseNumber(usdInput.value);
            if (!rate || rate <= 0 || usd === null) {
                krwInput.value = '';
                return;
            }
            syncing = true;
            krwInput.value = formatNumber(usd * rate, 0);
            syncing = false;
        };
        const normalizeField = (inputEl, fractionDigits) => {
            const numeric = parseNumber(inputEl.value);
            if (numeric === null) return;
            inputEl.value = formatNumber(numeric, fractionDigits);
        };

        krwInput.oninput = syncFromKrw;
        usdInput.oninput = syncFromUsd;
        krwInput.onblur = () => normalizeField(krwInput, 0);
        usdInput.onblur = () => normalizeField(usdInput, 2);
        window.addEventListener('fx-rate-updated', () => {
            rateInput.value = formatNumber(getCurrentFxRate(), 2);
            if (document.activeElement === usdInput) syncFromUsd();
            else syncFromKrw();
            rateNoteEl.textContent = getFxRateNoteText();
        });

        if (!krwInput.value.trim() && !usdInput.value.trim()) {
            krwInput.value = '50000';
        }
        syncFromKrw();
        normalizeField(krwInput, 0);
        rateInput.value = formatNumber(getCurrentFxRate(), 2);
        rateNoteEl.textContent = getFxRateNoteText();
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
                <h2>${getPlaceName(place)}</h2>
                <div class="place-meta">${getCategoryLabel(place.category)} · ${getDistrictLabel(place.district)}</div>
                <div class="style-badges">${styleBadges}</div>
                <p class="place-desc">${CURRENT_LANG === 'en' ? place.shortDescriptionEn : place.shortDescription}</p>
                <a class="button-link" href="${getPlaceLink('place.html', place.id)}">${CURRENT_LANG === 'en' ? 'View Details' : '상세 보기'}</a>
            </div>
        `;
        return card;
    }

    function renderHome() {
        const openEyebrow = document.getElementById('open-eyebrow');
        const openTitle = document.getElementById('open-title');
        const openDesc = document.getElementById('open-desc');
        const openExplore = document.getElementById('open-card-explore');
        const openCourse = document.getElementById('open-card-course');
        const openGeneration = document.getElementById('open-card-generation');
        const openKcontent = document.getElementById('open-card-kcontent');
        const openSaju = document.getElementById('open-card-saju');
        const grid = document.getElementById('place-grid');
        const styleTabs = document.getElementById('travel-style-tabs');
        const styleButtons = Array.from(document.querySelectorAll('#travel-style-tabs .style-tab-btn'));
        const searchInput = document.getElementById('place-search-input');
        const sortSelect = document.getElementById('sort-select');
        const tagButtons = Array.from(document.querySelectorAll('#quick-tag-list .tag-chip'));
        const resultCount = document.getElementById('result-count');
        if (!grid || !styleTabs || !styleButtons.length || !searchInput || !sortSelect || !tagButtons.length || !resultCount) return;

        const params = new URLSearchParams(window.location.search);
        let selectedStyle = params.get('style') && styleLabels()[params.get('style')] ? params.get('style') : 'all';
        let selectedTag = params.get('tag') || 'all';
        let searchQuery = (params.get('q') || '').trim();
        let selectedSort = ['popular', 'rating', 'reviews'].includes(params.get('sort')) ? params.get('sort') : 'popular';

        function matchesTag(place, tagKey) {
            if (tagKey === 'all') return true;
            if (tagKey === 'palace') return /(궁|Palace|Shrine|Temple|Hanok)/i.test(`${place.name} ${place.nameEn}`);
            if (tagKey === 'night-view') return place.styles.includes('night');
            if (tagKey === 'shopping') return place.styles.includes('shopping');
            if (tagKey === 'museum') return place.styles.includes('art') || /Museum|미술관|박물관/.test(place.name);
            if (tagKey === 'nature') return place.styles.includes('nature');
            if (tagKey === 'local-market') return place.styles.includes('local') || /Market|시장/.test(place.name);
            if (tagKey === 'family-trip') return place.styles.includes('family');
            return true;
        }

        function matchesQuery(place, query) {
            if (!query) return true;
            const haystack = [
                place.name,
                place.nameEn,
                place.district,
                getDistrictLabel(place.district),
                place.category,
                getCategoryLabel(place.category),
                place.shortDescription,
                place.shortDescriptionEn
            ].join(' ').toLowerCase();
            return haystack.includes(query.toLowerCase());
        }

        function sortPlaces(list) {
            if (selectedSort === 'rating') {
                return [...list].sort((a, b) => {
                    if (b.ratingValue !== a.ratingValue) return b.ratingValue - a.ratingValue;
                    return b.reviewCountValue - a.reviewCountValue;
                });
            }
            if (selectedSort === 'reviews') {
                return [...list].sort((a, b) => b.reviewCountValue - a.reviewCountValue);
            }
            return [...list].sort((a, b) => b.popularityScore - a.popularityScore);
        }

        function markActiveStyle(styleKey) {
            styleButtons.forEach((btn) => {
                const active = btn.dataset.style === styleKey;
                btn.classList.toggle('active', active);
                btn.setAttribute('aria-selected', active ? 'true' : 'false');
            });
        }

        function markActiveTag(tagKey) {
            tagButtons.forEach((btn) => {
                const active = btn.dataset.tag === tagKey;
                btn.classList.toggle('active', active);
                btn.setAttribute('aria-pressed', active ? 'true' : 'false');
            });
        }

        function syncHomeUrlState() {
            const url = new URL(window.location.href);
            if (selectedStyle && selectedStyle !== 'all') url.searchParams.set('style', selectedStyle);
            else url.searchParams.delete('style');
            if (selectedTag && selectedTag !== 'all') url.searchParams.set('tag', selectedTag);
            else url.searchParams.delete('tag');
            if (searchQuery) url.searchParams.set('q', searchQuery);
            else url.searchParams.delete('q');
            if (selectedSort !== 'popular') url.searchParams.set('sort', selectedSort);
            else url.searchParams.delete('sort');
            if (CURRENT_LANG === 'en') url.searchParams.set('lang', 'en');
            else url.searchParams.delete('lang');
            window.history.replaceState({}, '', url.toString());
        }

        function applyFilter() {
            const styleFiltered = selectedStyle === 'all'
                ? places
                : places.filter((place) => place.styles.includes(selectedStyle));
            const filtered = sortPlaces(styleFiltered.filter((place) => {
                return matchesTag(place, selectedTag) && matchesQuery(place, searchQuery);
            }));
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
            syncHomeUrlState();
        }

        if (CURRENT_LANG === 'en') {
            if (openEyebrow) openEyebrow.textContent = 'Open Travel Plans';
            if (openTitle) openTitle.textContent = 'Pick Your Seoul Plan';
            if (openDesc) openDesc.textContent = 'Start with the plan that matches your travel goal. You can switch anytime.';
            if (openExplore) openExplore.innerHTML = '<strong>Explore Spots</strong><span>Top places, map links, and filters</span>';
            if (openCourse) openCourse.innerHTML = '<strong>Course Planner</strong><span>One-day route with hotels and restaurants</span>';
            if (openGeneration) openGeneration.innerHTML = '<strong>Generation Plans</strong><span>Recommended pace by age group</span>';
            if (openKcontent) openKcontent.innerHTML = '<strong>Screen Picks</strong><span>Characters, idols, actors, and matching routes</span>';
            if (openSaju) openSaju.innerHTML = '<strong>Saju Plan</strong><span>Saju analysis and travel suggestions</span>';
            styleButtons.forEach((button) => {
                const styleKey = button.dataset.style;
                if (!styleKey) return;
                button.textContent = getStyleLabel(styleKey);
            });
            tagButtons.forEach((button) => {
                const tagKey = button.dataset.tag;
                if (!tagKey) return;
                button.textContent = TAG_LABELS_BY_LANG.en[tagKey] || button.textContent;
            });
        } else {
            if (openEyebrow) openEyebrow.textContent = '오픈 여행 플랜';
            if (openTitle) openTitle.textContent = '원하는 서울 여행 플랜을 선택하세요';
            if (openDesc) openDesc.textContent = '목적에 맞는 플랜부터 시작하고, 필요할 때 언제든 전환할 수 있습니다.';
            if (openExplore) openExplore.innerHTML = '<strong>여행지 탐색</strong><span>핵심 명소, 지도 링크, 필터 탐색</span>';
            if (openCourse) openCourse.innerHTML = '<strong>코스 플래너</strong><span>하루 동선 + 호텔 + 맛집 추천</span>';
            if (openGeneration) openGeneration.innerHTML = '<strong>세대별 플랜</strong><span>세대별 페이스 맞춤 추천</span>';
            if (openKcontent) openKcontent.innerHTML = '<strong>콘텐츠 플랜</strong><span>캐릭터/아이돌/배우 기반 추천</span>';
            if (openSaju) openSaju.innerHTML = '<strong>사주 플랜</strong><span>사주 해석 기반 여행 제안</span>';
        }
        renderTravelerTools();
        searchInput.value = searchQuery;
        sortSelect.value = selectedSort;
        styleTabs.addEventListener('click', (event) => {
            const button = event.target.closest('.style-tab-btn');
            if (!button) return;
            const nextStyle = button.dataset.style;
            if (!nextStyle || nextStyle === selectedStyle) return;
            selectedStyle = nextStyle;
            markActiveStyle(selectedStyle);
            applyFilter();
        });
        document.getElementById('quick-tag-list')?.addEventListener('click', (event) => {
            const button = event.target.closest('.tag-chip');
            if (!button) return;
            const nextTag = button.dataset.tag || 'all';
            if (nextTag === selectedTag) return;
            selectedTag = nextTag;
            markActiveTag(selectedTag);
            applyFilter();
        });
        searchInput.addEventListener('input', () => {
            searchQuery = searchInput.value.trim();
            applyFilter();
        });
        sortSelect.addEventListener('change', () => {
            selectedSort = sortSelect.value;
            applyFilter();
        });
        markActiveStyle(selectedStyle);
        markActiveTag(selectedTag);
        applyFilter();
    }

    function initEntryFunLab() {
        const section = document.querySelector('.fun-lab');
        if (!section) return;

        const isEn = CURRENT_LANG === 'en';
        const showcaseTitle = document.getElementById('entry-showcase-title');
        const showcaseDesc = document.getElementById('entry-showcase-desc');
        const showcaseDate = document.getElementById('entry-showcase-date');
        const showcaseLink1 = document.getElementById('entry-showcase-link-1');
        const showcaseImg1 = document.getElementById('entry-showcase-img-1');
        const showcaseCap1 = document.getElementById('entry-showcase-cap-1');
        const funEyebrow = document.getElementById('entry-fun-eyebrow');
        const funTitle = document.getElementById('entry-fun-title');
        const funToggleBtn = document.getElementById('entry-fun-toggle-btn');
        const quizTitle = document.getElementById('quiz-card-title');
        const quizDesc = document.getElementById('quiz-card-desc');
        const weatherTitle = document.getElementById('weather-card-title');
        const weatherDesc = document.getElementById('weather-card-desc');
        const budgetTitle = document.getElementById('budget-card-title');
        const budgetDesc = document.getElementById('budget-card-desc');
        const quizRunBtn = document.getElementById('quiz-run-btn');
        const quizEnergySelect = document.getElementById('quiz-energy-select');
        const quizStyleSelect = document.getElementById('quiz-style-select');
        const quizGroupSelect = document.getElementById('quiz-group-select');
        const quizResult = document.getElementById('quiz-result');
        const weatherSunnyBtn = document.getElementById('weather-sunny-btn');
        const weatherRainyBtn = document.getElementById('weather-rainy-btn');
        const weatherList = document.getElementById('weather-route-list');
        const budgetSliderLabel = document.getElementById('budget-slider-label');
        const budgetSlider = document.getElementById('budget-game-slider');
        const budgetValue = document.getElementById('budget-game-value');
        const budgetRunBtn = document.getElementById('budget-game-run-btn');
        const budgetResult = document.getElementById('budget-game-result');
        const budgetSaveBtn = document.getElementById('budget-save-btn');
        const budgetSavedList = document.getElementById('budget-saved-list');
        const luckyPickBtn = document.getElementById('entry-lucky-pick-btn');
        const luckyPickResult = document.getElementById('entry-lucky-pick-result');
        const BUDGET_SAVE_KEY = 'seoul-entry-budget-result-saves-v1';

        if (!quizRunBtn || !quizEnergySelect || !quizStyleSelect || !quizGroupSelect || !quizResult || !weatherSunnyBtn || !weatherRainyBtn || !weatherList || !budgetSliderLabel || !budgetSlider || !budgetValue || !budgetRunBtn || !budgetResult || !budgetSaveBtn || !budgetSavedList) return;

        if (showcaseTitle) showcaseTitle.textContent = isEn ? 'Today\'s Featured Pick' : '오늘의 대표 추천';
        if (showcaseDesc) showcaseDesc.textContent = isEn
            ? 'Start here first.'
            : '오늘은 이곳부터 시작해 보세요.';
        if (funEyebrow) funEyebrow.textContent = isEn ? 'Fun Planner Lab' : '재미 플래너 랩';
        if (funTitle) funTitle.textContent = isEn
            ? 'Quick Interactive Tools'
            : '빠른 인터랙티브 도구';
        const updateFunToggleLabel = () => {
            if (!funToggleBtn) return;
            const isCollapsed = section.classList.contains('is-collapsed');
            funToggleBtn.textContent = isEn
                ? (isCollapsed ? 'Show Fun Tools' : 'Hide Fun Tools')
                : (isCollapsed ? '재미 도구 펼치기' : '재미 도구 접기');
            funToggleBtn.setAttribute('aria-expanded', isCollapsed ? 'false' : 'true');
        };
        updateFunToggleLabel();
        if (quizTitle) quizTitle.textContent = isEn ? '1) Seoul Archetype Quiz' : '1) 서울 여행자 유형 퀴즈';
        if (quizDesc) quizDesc.textContent = isEn
            ? '3 picks, 1 type.'
            : '3가지 선택, 1개 유형.';
        if (weatherTitle) weatherTitle.textContent = isEn ? '2) Rainy Day vs Sunny Day Switch' : '2) 비 오는 날 vs 맑은 날 스위치';
        if (weatherDesc) weatherDesc.textContent = isEn
            ? 'Toggle to swap route.'
            : '토글로 루트 전환.';
        if (budgetTitle) budgetTitle.textContent = isEn ? '3) Budget Game' : '3) 예산 게임';
        if (budgetDesc) budgetDesc.textContent = isEn
            ? 'Set budget, get bundle.'
            : '예산 설정, 즉시 추천.';
        if (quizRunBtn) quizRunBtn.textContent = isEn ? 'Get My Archetype' : '내 유형 보기';
        if (budgetSliderLabel) budgetSliderLabel.textContent = isEn ? 'Daily budget (USD)' : '하루 예산 (USD)';
        if (budgetRunBtn) budgetRunBtn.textContent = isEn ? 'Run Budget Plan' : '예산 플랜 실행';
        if (budgetSaveBtn) budgetSaveBtn.textContent = isEn ? 'Save Result' : '결과 저장';
        if (luckyPickBtn) luckyPickBtn.textContent = isEn ? 'Draw Today\'s Lucky Route' : '오늘의 랜덤 럭키 코스 뽑기';
        if (luckyPickResult) {
            luckyPickResult.innerHTML = `<p class="data-source-note">${isEn
                ? 'Click to get three random route ideas based on your current preferences.'
                : '버튼을 누르면 현재 취향 기준으로 랜덤 코스 3개를 추천합니다.'}</p>`;
        }
        weatherSunnyBtn.textContent = isEn ? 'Sunny' : '맑음';
        weatherRainyBtn.textContent = isEn ? 'Rainy' : '비';

        const energyOptions = isEn
            ? [['low', 'Relaxed pace'], ['mid', 'Balanced pace'], ['high', 'High energy']]
            : [['low', '여유롭게'], ['mid', '균형 있게'], ['high', '에너지 높게']];
        const styleOptions = isEn
            ? [['history', 'History & culture'], ['food', 'Food & local vibe'], ['night', 'Night view & trend']]
            : [['history', '역사/문화'], ['food', '로컬 먹거리'], ['night', '야경/트렌드']];
        const groupOptions = isEn
            ? [['solo', 'Solo'], ['pair', 'Couple/Friends'], ['family', 'Family']]
            : [['solo', '혼자'], ['pair', '연인/친구'], ['family', '가족']];

        quizEnergySelect.innerHTML = energyOptions.map(([value, label]) => `<option value="${value}">${escapeHtml(label)}</option>`).join('');
        quizStyleSelect.innerHTML = styleOptions.map(([value, label]) => `<option value="${value}">${escapeHtml(label)}</option>`).join('');
        quizGroupSelect.innerHTML = groupOptions.map(([value, label]) => `<option value="${value}">${escapeHtml(label)}</option>`).join('');

        const todayPickSets = [
            ['place-001', 'place-021', 'place-058'],
            ['place-014', 'place-033', 'place-072'],
            ['place-009', 'place-044', 'place-089'],
            ['place-005', 'place-026', 'place-067'],
            ['place-012', 'place-039', 'place-095']
        ];

        const todayPickFallbackImages = [
            'assets/home/gyeongbokgung.jpg',
            'assets/home/itaewon.jpg',
            'assets/home/yangjaecheon.jpg'
        ];
        const todayPickFixedImageByPlaceId = {
            'place-001': 'assets/home/gyeongbokgung.jpg',
            'place-021': 'assets/home/itaewon.jpg',
            'place-058': 'assets/home/yangjaecheon.jpg'
        };

        const weatherRoutesByLang = {
            en: {
                sunny: [
                    { text: 'Gyeongbokgung + Bukchon + Cheonggyecheon Walk', href: withCurrentLang('course.html?style=history') },
                    { text: 'Han River Sunset + N Seoul Tower Night View', href: withCurrentLang('course.html?style=night') },
                    { text: 'Seongsu Trend Street + Seoul Forest', href: withCurrentLang('explore.html?style=shopping') }
                ],
                rainy: [
                    { text: 'National Museum + COEX Starfield + Indoor Cafes', href: withCurrentLang('course.html?style=art') },
                    { text: 'Lotte World Mall + Aquarium + Jamsil Food Lane', href: withCurrentLang('course.html?style=family') },
                    { text: 'Insadong Tea House + Museum Day Route', href: withCurrentLang('course.html?style=history') }
                ]
            },
            ko: {
                sunny: [
                    { text: '경복궁 + 북촌 + 청계천 산책 코스', href: withCurrentLang('course.html?style=history') },
                    { text: '한강 노을 + 남산타워 야경 코스', href: withCurrentLang('course.html?style=night') },
                    { text: '성수 트렌드 거리 + 서울숲 코스', href: withCurrentLang('explore.html?style=shopping') }
                ],
                rainy: [
                    { text: '국립중앙박물관 + 코엑스 + 실내 카페 코스', href: withCurrentLang('course.html?style=art') },
                    { text: '롯데월드몰 + 아쿠아리움 + 잠실 맛집 코스', href: withCurrentLang('course.html?style=family') },
                    { text: '인사동 찻집 + 전시 중심 코스', href: withCurrentLang('course.html?style=history') }
                ]
            }
        };

        const budgetStepValues = Array.from({ length: 20 }, (_, idx) => (idx + 1) * 50);
        const budgetStyleCycle = ['history', 'local', 'night', 'art', 'shopping', 'family'];
        const budgetRestaurantPool = {
            en: {
                history: [
                    { name: 'Tongin Market Street Bites', query: 'Tongin Market Street Food Seoul' },
                    { name: 'Gwangjang Market Kalguksu', query: 'Gwangjang Market Kalguksu Seoul' },
                    { name: 'Insadong Traditional Tea House', query: 'Insadong Traditional Tea House Seoul' }
                ],
                local: [
                    { name: 'Myeongdong Kyoja', query: 'Myeongdong Kyoja Seoul' },
                    { name: 'Ikseon-dong Hanok Dining', query: 'Ikseon-dong Hanok Restaurant Seoul' },
                    { name: 'Mangwon Market Eats', query: 'Mangwon Market food Seoul' }
                ],
                night: [
                    { name: 'Namsan Area Korean BBQ', query: 'Namsan Korean BBQ Seoul' },
                    { name: 'Euljiro Night Pub', query: 'Euljiro pub Seoul' },
                    { name: 'Han River Rooftop Bar', query: 'Han River rooftop bar Seoul' }
                ],
                art: [
                    { name: 'Samcheong Brunch Cafe', query: 'Samcheong brunch cafe Seoul' },
                    { name: 'Seongsu Design Cafe', query: 'Seongsu design cafe Seoul' },
                    { name: 'MMCA Area Bistro', query: 'MMCA Seoul nearby bistro' }
                ],
                shopping: [
                    { name: 'Garosu-gil Dining Spot', query: 'Garosu-gil dining Seoul' },
                    { name: 'COEX Modern Korean', query: 'COEX modern korean restaurant Seoul' },
                    { name: 'Cheongdam Signature Dining', query: 'Cheongdam signature restaurant Seoul' }
                ],
                family: [
                    { name: 'Lotte World Mall Family Dining', query: 'Lotte World Mall family restaurant Seoul' },
                    { name: 'Jamsil Casual Korean', query: 'Jamsil casual korean restaurant Seoul' },
                    { name: 'Olympic Park Brunch', query: 'Olympic Park brunch Seoul' }
                ]
            },
            ko: {
                history: [
                    { name: '통인시장 길거리 간식', query: '통인시장 길거리 간식 서울' },
                    { name: '광장시장 칼국수', query: '광장시장 칼국수 서울' },
                    { name: '인사동 전통찻집', query: '인사동 전통찻집 서울' }
                ],
                local: [
                    { name: '명동교자', query: '명동교자 서울' },
                    { name: '익선동 한옥 다이닝', query: '익선동 한옥 식당 서울' },
                    { name: '망원시장 먹거리', query: '망원시장 먹거리 서울' }
                ],
                night: [
                    { name: '남산 인근 고깃집', query: '남산 인근 고깃집 서울' },
                    { name: '을지로 야간 펍', query: '을지로 펍 서울' },
                    { name: '한강 루프탑 바', query: '한강 루프탑 바 서울' }
                ],
                art: [
                    { name: '삼청동 브런치 카페', query: '삼청동 브런치 카페 서울' },
                    { name: '성수 디자인 카페', query: '성수 디자인 카페 서울' },
                    { name: '국현미 인근 비스트로', query: '국현미 서울 인근 비스트로' }
                ],
                shopping: [
                    { name: '가로수길 다이닝', query: '가로수길 다이닝 서울' },
                    { name: '코엑스 모던 한식', query: '코엑스 모던 한식 서울' },
                    { name: '청담 시그니처 다이닝', query: '청담 시그니처 레스토랑 서울' }
                ],
                family: [
                    { name: '롯데월드몰 패밀리 다이닝', query: '롯데월드몰 패밀리 식당 서울' },
                    { name: '잠실 캐주얼 한식', query: '잠실 캐주얼 한식 서울' },
                    { name: '올림픽공원 브런치', query: '올림픽공원 브런치 서울' }
                ]
            }
        };

        let latestBudgetSnapshot = null;

        const resolveTodayPicks = () => {
            const now = new Date();
            const dayIndex = Math.floor((Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - Date.UTC(now.getFullYear(), 0, 0)) / 86400000);
            const ids = todayPickSets[dayIndex % todayPickSets.length];
            return ids.map((id) => placeMap[id]).filter(Boolean).slice(0, 1);
        };

        const renderTodayPicks = async () => {
            const picks = resolveTodayPicks();
            const dateText = new Intl.DateTimeFormat(isEn ? 'en-US' : 'ko-KR', {
                year: 'numeric', month: 'long', day: 'numeric'
            }).format(new Date());
            if (showcaseDate) {
                showcaseDate.textContent = isEn
                    ? `Updated daily • ${dateText}`
                    : `매일 추천 갱신 • ${dateText}`;
            }

            const cards = [
                { place: picks[0], link: showcaseLink1, img: showcaseImg1, cap: showcaseCap1, fallback: todayPickFallbackImages[0] }
            ];

            cards.forEach((card, idx) => {
                if (!card.place || !card.link || !card.img || !card.cap) return;
                card.link.href = getPlaceLink('place.html', card.place.id);
                card.cap.textContent = isEn
                    ? `${idx + 1}. ${card.place.nameEn || card.place.name}`
                    : `${idx + 1}. ${card.place.name}`;
                card.img.src = todayPickFixedImageByPlaceId[card.place.id] || card.fallback;
                card.img.alt = isEn
                    ? `${card.place.nameEn || card.place.name} in Seoul`
                    : `서울 추천지 ${card.place.name}`;
            });

            await Promise.all(cards.map(async (card) => {
                if (!card.place || !card.img) return;
                if (todayPickFixedImageByPlaceId[card.place.id]) return;
                try {
                    const response = await fetch(`/api/place-photo?query=${encodeURIComponent(card.place.mapQuery)}`);
                    if (!response.ok) return;
                    const json = await response.json();
                    if (json?.photoUrl) card.img.src = json.photoUrl;
                } catch (_) {
                    // Keep fallback image.
                }
            }));
        };

        const runQuiz = () => {
            const energy = quizEnergySelect.value;
            const style = quizStyleSelect.value;
            const group = quizGroupSelect.value;
            let archetype = isEn ? 'Balanced Seoul Walker' : '균형형 서울 워커';
            let styleKey = 'history';

            if (style === 'night' || energy === 'high') {
                archetype = isEn ? 'Night Pulse Chaser' : '나이트 펄스 체이서';
                styleKey = 'night';
            } else if (style === 'food') {
                archetype = isEn ? 'Local Food Hunter' : '로컬 푸드 헌터';
                styleKey = 'local';
            } else if (group === 'family') {
                archetype = isEn ? 'Family Comfort Planner' : '패밀리 컴포트 플래너';
                styleKey = 'family';
            }

            const routeHref = withCurrentLang(`course.html?style=${encodeURIComponent(styleKey)}`);
            const routeLabel = isEn ? 'Open matching route' : '맞춤 코스 열기';
            quizResult.innerHTML = `${escapeHtml(archetype)} · <a class="text-link" href="${routeHref}">${escapeHtml(routeLabel)}</a>`;
        };

        const pickRandomUnique = (rows, count) => {
            const pool = [...rows];
            const picked = [];
            while (pool.length > 0 && picked.length < count) {
                const idx = Math.floor(Math.random() * pool.length);
                picked.push(pool[idx]);
                pool.splice(idx, 1);
            }
            return picked;
        };

        const runLuckyPick = () => {
            if (!luckyPickResult) return;
            const styleFromQuiz = quizStyleSelect.value === 'food' ? 'local' : quizStyleSelect.value;
            const byStyle = places.filter((row) => Array.isArray(row.styles) && row.styles.includes(styleFromQuiz));
            const sourcePool = byStyle.length >= 3 ? byStyle : places;
            const picks = pickRandomUnique(sourcePool, 3);
            if (!picks.length) return;

            const luckyTitle = isEn ? 'Lucky picks for this moment' : '지금 이 순간, 럭키 추천 코스';
            const luckyHint = isEn ? 'Press again to shuffle.' : '다시 누르면 새로운 조합으로 바뀝니다.';
            const listHtml = picks.map((row, idx) => {
                const href = getPlaceLink('place.html', row.id);
                const label = isEn ? (row.nameEn || row.name) : row.name;
                return `<li>${idx + 1}. <a class="text-link" href="${href}">${escapeHtml(label)}</a></li>`;
            }).join('');

            luckyPickResult.classList.remove('is-reveal');
            // Re-trigger reveal animation on repeated clicks.
            void luckyPickResult.offsetWidth;
            luckyPickResult.classList.add('is-reveal');
            luckyPickResult.innerHTML = `
                <p><strong>${escapeHtml(luckyTitle)}</strong></p>
                <ul class="review-list compact-list">${listHtml}</ul>
                <p class="data-source-note">${escapeHtml(luckyHint)}</p>
            `;

            if (typeof window.gtag === 'function') {
                window.gtag('event', 'entry_lucky_pick_click', {
                    lang: CURRENT_LANG,
                    style_seed: styleFromQuiz
                });
            }
        };

        const renderWeatherRoutes = (mode) => {
            const langKey = isEn ? 'en' : 'ko';
            const rows = weatherRoutesByLang[langKey][mode] || [];
            weatherList.innerHTML = rows.map((row) => `<li><a class="text-link" href="${row.href}">${escapeHtml(row.text)}</a></li>`).join('');
            weatherSunnyBtn.classList.toggle('active', mode === 'sunny');
            weatherRainyBtn.classList.toggle('active', mode === 'rainy');
        };

        const updateBudgetSliderLabel = () => {
            const amount = Number(budgetSlider.value || '150');
            budgetValue.textContent = `$${amount}`;
        };

        const getBudgetBandValue = (amount) => {
            const normalized = Math.max(10, Math.min(1000, amount));
            if (normalized <= 50) return 50;
            return Math.min(1000, Math.ceil(normalized / 50) * 50);
        };

        const buildBudgetPlan = (amount, langKey) => {
            const bandValue = getBudgetBandValue(amount);
            const bandIndex = Math.max(0, budgetStepValues.indexOf(bandValue));
            const styleKey = budgetStyleCycle[bandIndex % budgetStyleCycle.length];
            const restaurantsPool = budgetRestaurantPool[langKey]?.[styleKey] || [];
            const r1 = restaurantsPool[bandIndex % Math.max(restaurantsPool.length, 1)] || restaurantsPool[0];
            const r2 = restaurantsPool[(bandIndex + 1) % Math.max(restaurantsPool.length, 1)] || restaurantsPool[1] || restaurantsPool[0];

            const tierLabel = (bandValue <= 150)
                ? (langKey === 'en' ? 'Saver' : '절약형')
                : (bandValue <= 400)
                    ? (langKey === 'en' ? 'Balanced' : '균형형')
                    : (bandValue <= 700)
                        ? (langKey === 'en' ? 'Premium' : '프리미엄')
                        : (langKey === 'en' ? 'Luxury' : '럭셔리');
            const title = langKey === 'en'
                ? `$${bandValue} ${tierLabel} Seoul Plan`
                : `$${bandValue} ${tierLabel} 서울 플랜`;
            const summary = langKey === 'en'
                ? `Budget band $${bandValue}. Route focus: ${getStyleLabel(styleKey)} with realistic movement and meal stops.`
                : `예산 구간 $${bandValue}. ${getStyleLabel(styleKey)} 중심 동선과 식사 스팟을 결합한 현실형 코스입니다.`;

            return {
                bandValue,
                title,
                summary,
                styleKey,
                restaurants: [r1, r2].filter(Boolean)
            };
        };

        const runBudgetGame = () => {
            const amount = Number(budgetSlider.value || '150');
            const langKey = isEn ? 'en' : 'ko';
            const plan = buildBudgetPlan(amount, langKey);
            if (!plan) return;

            const routeHref = withCurrentLang(`course.html?style=${encodeURIComponent(plan.styleKey)}`);
            const restaurants = plan.restaurants.map((row) => {
                const href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(row.query)}`;
                return `<li><a class="text-link" href="${href}" target="_blank" rel="noopener noreferrer">${escapeHtml(row.name)}</a></li>`;
            }).join('');

            budgetResult.innerHTML = `
                <p><strong>${isEn ? 'Input' : '입력값'}: $${amount} · ${isEn ? 'Band' : '적용 구간'}: $${plan.bandValue}</strong></p>
                <p><strong>${escapeHtml(plan.title)}</strong></p>
                <p>${escapeHtml(plan.summary)}</p>
                <p><a class="text-link" href="${routeHref}">${isEn ? 'Open recommended course' : '추천 코스 열기'}</a></p>
                <p><strong>${isEn ? 'Restaurant picks' : '식당 추천'}</strong></p>
                <ul class="review-list compact-list">${restaurants}</ul>
            `;

            latestBudgetSnapshot = {
                amount,
                bandValue: plan.bandValue,
                title: plan.title,
                summary: plan.summary,
                routeHref,
                restaurants: plan.restaurants.map((row) => row.name),
                savedAt: new Date().toISOString()
            };
        };

        const readBudgetSaves = () => {
            try {
                const raw = localStorage.getItem(BUDGET_SAVE_KEY);
                if (!raw) return [];
                const parsed = JSON.parse(raw);
                return Array.isArray(parsed) ? parsed : [];
            } catch (_) {
                return [];
            }
        };

        const writeBudgetSaves = (items) => {
            try {
                localStorage.setItem(BUDGET_SAVE_KEY, JSON.stringify(items.slice(0, 10)));
            } catch (_) {
                // ignore
            }
        };

        const renderBudgetSaves = () => {
            const items = readBudgetSaves();
            if (!items.length) {
                budgetSavedList.innerHTML = `<p class="data-source-note">${isEn ? 'No saved results yet.' : '아직 저장된 결과가 없습니다.'}</p>`;
                return;
            }
            budgetSavedList.innerHTML = items.map((item) => {
                const langKey = isEn ? 'en' : 'ko';
                const localizedPlan = buildBudgetPlan(Number(item.amount || 150), langKey);
                const when = formatFxUpdatedAt(item.savedAt);
                const restaurantsFromPlan = Array.isArray(localizedPlan?.restaurants)
                    ? localizedPlan.restaurants.map((row) => row.name)
                    : [];
                const restaurants = restaurantsFromPlan.length
                    ? restaurantsFromPlan.join(', ')
                    : (Array.isArray(item.restaurants) ? item.restaurants.join(', ') : '');
                const title = localizedPlan?.title || item.title || '-';
                const summary = localizedPlan?.summary || item.summary || '';
                const routeHref = withCurrentLang(`course.html?style=${encodeURIComponent(localizedPlan?.styleKey || item.styleKey || 'history')}`);
                return `
                    <article class="offline-plan-card">
                        <strong>${escapeHtml(title)}</strong>
                        <p class="offline-plan-meta">${isEn ? 'Saved' : '저장일'}: ${escapeHtml(when)} · ${isEn ? 'Budget' : '예산'}: $${escapeHtml(item.amount)}</p>
                        <p class="offline-plan-meta">${escapeHtml(summary)}</p>
                        <p class="offline-plan-meta">${isEn ? 'Restaurants' : '식당'}: ${escapeHtml(restaurants)}</p>
                        <a class="text-link" href="${escapeHtml(routeHref || item.routeHref || withCurrentLang('course.html'))}">${isEn ? 'Open route' : '코스 열기'}</a>
                    </article>
                `;
            }).join('');
        };

        const saveBudgetResult = () => {
            if (!latestBudgetSnapshot) runBudgetGame();
            if (!latestBudgetSnapshot) return;
            const items = readBudgetSaves();
            items.unshift({ ...latestBudgetSnapshot, savedAt: new Date().toISOString() });
            writeBudgetSaves(items);
            renderBudgetSaves();
            budgetResult.innerHTML = `<p class="data-source-note">${isEn ? 'Saved. You can review it below.' : '결과가 저장되었습니다. 아래 목록에서 확인할 수 있습니다.'}</p>`;
        };

        const initFunCardAccordion = () => {
            const toggles = section.querySelectorAll('.fun-card-toggle');
            toggles.forEach((toggle, idx) => {
                const targetId = toggle.getAttribute('data-target');
                const body = targetId ? document.getElementById(targetId) : null;
                if (!body) return;
                const shouldOpen = idx === 0;
                toggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
                body.classList.toggle('is-collapsed', !shouldOpen);
                if (toggle.dataset.bound) return;
                toggle.addEventListener('click', () => {
                    const expanded = toggle.getAttribute('aria-expanded') === 'true';
                    toggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
                    body.classList.toggle('is-collapsed', expanded);
                });
                toggle.dataset.bound = '1';
            });
        };

        if (!section.dataset.bound) {
            quizRunBtn.addEventListener('click', runQuiz);
            weatherSunnyBtn.addEventListener('click', () => renderWeatherRoutes('sunny'));
            weatherRainyBtn.addEventListener('click', () => renderWeatherRoutes('rainy'));
            budgetSlider.addEventListener('input', updateBudgetSliderLabel);
            budgetRunBtn.addEventListener('click', runBudgetGame);
            budgetSaveBtn.addEventListener('click', saveBudgetResult);
            if (luckyPickBtn) luckyPickBtn.addEventListener('click', runLuckyPick);
            if (funToggleBtn) {
                funToggleBtn.addEventListener('click', () => {
                    section.classList.toggle('is-collapsed');
                    updateFunToggleLabel();
                });
            }
            section.dataset.bound = '1';
        }
        initFunCardAccordion();

        renderTodayPicks();
        renderWeatherRoutes('sunny');
        updateBudgetSliderLabel();
        renderBudgetSaves();
        budgetResult.innerHTML = `<p class="data-source-note">${isEn ? 'Click run to generate your budget-based route and food picks.' : '실행 버튼을 누르면 예산 맞춤 코스와 식당 추천 결과가 표시됩니다.'}</p>`;
    }

    function renderEntryPage() {
        const eyebrow = document.getElementById('entry-eyebrow');
        const title = document.getElementById('entry-title');
        const desc = document.getElementById('entry-desc');
        const descExtra = document.getElementById('entry-desc-extra');
        const cta = document.getElementById('entry-primary-cta');
        const ctaNote = document.getElementById('entry-primary-note');
        const secondaryTitle = document.getElementById('entry-secondary-title');
        const sparkTitle = document.getElementById('entry-spark-title');
        const sparkBtn = document.getElementById('entry-spark-btn');
        const sparkResult = document.getElementById('entry-spark-result');
        const firstOverlay = document.getElementById('entry-first-overlay');
        const firstOverlayBackdrop = firstOverlay?.querySelector('[data-overlay-close="1"]');
        const firstOverlayClose = document.getElementById('entry-first-overlay-close');
        const firstOverlayEyebrow = document.getElementById('entry-first-overlay-eyebrow');
        const firstOverlayTitle = document.getElementById('entry-first-overlay-title');
        const firstOverlayDesc = document.getElementById('entry-first-overlay-desc');
        const firstOverlayCta = document.getElementById('entry-first-overlay-cta');
        const featuredLink = document.getElementById('entry-showcase-link-1');
        const explore = document.getElementById('entry-card-explore');
        const course = document.getElementById('entry-card-course');
        const funCard = document.getElementById('entry-card-fun');
        const navLinks = document.querySelectorAll('.top-nav a');
        if (!eyebrow || !title || !desc || !descExtra || !cta || !ctaNote || !secondaryTitle || !sparkTitle || !sparkBtn || !sparkResult || !explore || !course) return;
        const setChipTexts = (selector, labels) => {
            const chips = document.querySelectorAll(selector);
            chips.forEach((chip, idx) => {
                if (labels[idx]) chip.textContent = labels[idx];
            });
        };

        const isEn = CURRENT_LANG === 'en';
        const ctaVariant = getEntryCtaVariant();
        const overlayCopyVariant = getEntryOverlayCopyVariant();
        const sparkScenarios = isEn
            ? [
                { mood: 'Royal Heritage Sprint', note: 'Palace + Bukchon + tea alley', href: withCurrentLang('course.html?style=history') },
                { mood: 'Sunset Pulse Route', note: 'Han river + night view + late bites', href: withCurrentLang('course.html?style=night') },
                { mood: 'Trendy Local Wave', note: 'Seongsu + shopping + cafe chain', href: withCurrentLang('explore.html?style=shopping') }
            ]
            : [
                { mood: '궁궐 감성 러시', note: '궁궐 + 북촌 + 찻집 골목', href: withCurrentLang('course.html?style=history') },
                { mood: '노을 야경 루트', note: '한강 + 전망 포인트 + 야식', href: withCurrentLang('course.html?style=night') },
                { mood: '트렌드 로컬 루트', note: '성수 + 쇼핑 + 카페 동선', href: withCurrentLang('explore.html?style=shopping') }
            ];
        const overlayScenarios = isEn
            ? (overlayCopyVariant === 'A'
                ? [
                    {
                        eyebrow: 'First Visit Pick',
                        title: 'Royal Core Route',
                        desc: 'Gyeongbokgung, Bukchon, and Ikseon-dong in one smooth loop.',
                        cta: 'Open Royal Route',
                        href: withCurrentLang('course.html?style=history')
                    },
                    {
                        eyebrow: 'First Visit Pick',
                        title: 'Sunset Night Route',
                        desc: 'Han River sunset, N Seoul Tower, and local night food.',
                        cta: 'Open Night Route',
                        href: withCurrentLang('course.html?style=night')
                    }
                ]
                : [
                    {
                        eyebrow: 'Recommended Now',
                        title: 'Start Here for Zero Friction',
                        desc: 'A curated first-time route with easy flow and high hit-rate spots.',
                        cta: 'Start Easy Route',
                        href: withCurrentLang('course.html?style=history')
                    },
                    {
                        eyebrow: 'Recommended Now',
                        title: 'Night Energy, Low Thinking',
                        desc: 'Open one route and follow a sunset-to-night sequence instantly.',
                        cta: 'Start Night Route',
                        href: withCurrentLang('course.html?style=night')
                    }
                ])
            : (overlayCopyVariant === 'A'
                ? [
                    {
                        eyebrow: '첫 방문 추천',
                        title: '왕도 서울 핵심 루트',
                        desc: '경복궁, 북촌, 익선동을 한 번에 도는 안정적인 첫 코스입니다.',
                        cta: '핵심 루트 열기',
                        href: withCurrentLang('course.html?style=history')
                    },
                    {
                        eyebrow: '첫 방문 추천',
                        title: '노을 야경 몰입 루트',
                        desc: '한강 노을, 남산 야경, 로컬 야식으로 마무리하는 밤 코스입니다.',
                        cta: '야경 루트 열기',
                        href: withCurrentLang('course.html?style=night')
                    }
                ]
                : [
                    {
                        eyebrow: '지금 바로 추천',
                        title: '생각 없이 시작하는 서울 루트',
                        desc: '초행자 기준으로 이동이 편한 동선만 골라 바로 시작할 수 있습니다.',
                        cta: '쉬운 루트 시작',
                        href: withCurrentLang('course.html?style=history')
                    },
                    {
                        eyebrow: '지금 바로 추천',
                        title: '밤 감성 바로 타는 루트',
                        desc: '노을부터 야경까지 한 번에 이어지는 코스로 바로 이동합니다.',
                        cta: '야경 루트 시작',
                        href: withCurrentLang('course.html?style=night')
                    }
                ]);

        const runSparkPick = () => {
            const picked = sparkScenarios[Math.floor(Math.random() * sparkScenarios.length)];
            if (!picked) return;
            sparkResult.innerHTML = `
                <p><strong>${escapeHtml(picked.mood)}</strong></p>
                <p class="data-source-note">${escapeHtml(picked.note)}</p>
                <a class="text-link" href="${escapeHtml(picked.href)}">${isEn ? 'Open this route' : '이 루트 바로 열기'}</a>
            `;
            if (typeof window.gtag === 'function') {
                window.gtag('event', 'entry_spark_pick_click', {
                    lang: CURRENT_LANG,
                    mood: picked.mood
                });
            }
        };

        const closeFirstOverlay = (reason) => {
            if (!firstOverlay) return;
            firstOverlay.classList.remove('is-open');
            firstOverlay.setAttribute('aria-hidden', 'true');
            const todayKey = new Date().toISOString().slice(0, 10);
            localStorage.setItem(ENTRY_OVERLAY_LAST_SEEN_KEY, todayKey);
            if (typeof window.gtag === 'function' && reason) {
                window.gtag('event', 'entry_first_overlay_close', {
                    lang: CURRENT_LANG,
                    reason,
                    variant: overlayCopyVariant
                });
            }
        };

        const openFirstOverlay = () => {
            if (!firstOverlay || !firstOverlayEyebrow || !firstOverlayTitle || !firstOverlayDesc || !firstOverlayCta) return;
            const todayKey = new Date().toISOString().slice(0, 10);
            if (localStorage.getItem(ENTRY_OVERLAY_LAST_SEEN_KEY) === todayKey) return;
            const picked = overlayScenarios[Math.floor(Math.random() * overlayScenarios.length)];
            if (!picked) return;
            firstOverlayEyebrow.textContent = picked.eyebrow;
            firstOverlayTitle.textContent = picked.title;
            firstOverlayDesc.textContent = picked.desc;
            firstOverlayCta.textContent = picked.cta;
            firstOverlayCta.setAttribute('href', picked.href);
            firstOverlayCta.dataset.variant = overlayCopyVariant;
            firstOverlay.classList.add('is-open');
            firstOverlay.setAttribute('aria-hidden', 'false');
            if (typeof window.gtag === 'function') {
                window.gtag('event', 'entry_first_overlay_open', {
                    lang: CURRENT_LANG,
                    route: picked.title,
                    variant: overlayCopyVariant
                });
            }
        };

        if (isEn) {
            eyebrow.textContent = 'GoSeoul';
            title.textContent = 'Start Your Seoul Plan in 10 Seconds';
            desc.textContent = 'Pick one path and start now.';
            descExtra.textContent = 'Only essentials.';
            setChipTexts('.entry-quick-ui .ui-chip', ['Top Pick', 'Route', 'Map']);
            setChipTexts('#quiz-card-body .fun-mini-ui .ui-chip', ['3 Picks', 'Type', 'Route']);
            setChipTexts('#weather-card-body .fun-mini-ui .ui-chip', ['Sunny', 'Rainy', 'Switch']);
            setChipTexts('#budget-card-body .fun-mini-ui .ui-chip', ['Budget', 'Route', 'Food']);
            sparkTitle.textContent = 'Entrance Mood Check';
            sparkBtn.textContent = 'Draw Today\'s Seoul Mood';
            sparkBtn.setAttribute('aria-label', 'Draw today\'s Seoul mood');
            const langBtn = document.getElementById('lang-toggle-btn');
            if (langBtn) langBtn.setAttribute('aria-label', 'Switch language');
            sparkResult.innerHTML = '<p class="data-source-note">Press once to get a quick travel mood and instant route.</p>';
            cta.textContent = ctaVariant === 'A' ? 'Get My Seoul Route Now' : 'Start 1-Day Seoul Plan';
            ctaNote.textContent = ctaVariant === 'A'
                ? 'Fastest start: build a one-day route first, then expand with spot details.'
                : 'One tap is enough to generate your route, hotel, and food flow.';
            secondaryTitle.textContent = 'Or start with another path';
            explore.innerHTML = '<strong>Explore Top Spots</strong><span>Spots + maps</span>';
            course.innerHTML = '<strong>Build 1-Day Plan</strong><span>Route + food + hotel</span>';
            if (funCard) funCard.innerHTML = '<strong>Try Fun Planner</strong><span>Quiz + budget + weather</span>';
            if (navLinks[0]) navLinks[0].textContent = 'Explore';
            if (navLinks[1]) navLinks[1].textContent = 'Planner';
            if (navLinks[2]) navLinks[2].textContent = 'Fun Lab';
            if (firstOverlayClose) firstOverlayClose.setAttribute('aria-label', 'Close');
        } else {
            eyebrow.textContent = 'GoSeoul';
            title.textContent = '서울 여행, 10초 안에 시작';
            desc.textContent = '원하는 방식 하나만 고르면 바로 시작됩니다.';
            descExtra.textContent = '핵심만 빠르게.';
            setChipTexts('.entry-quick-ui .ui-chip', ['대표 추천', '동선', '지도']);
            setChipTexts('#quiz-card-body .fun-mini-ui .ui-chip', ['3선택', '유형', '루트']);
            setChipTexts('#weather-card-body .fun-mini-ui .ui-chip', ['맑음', '비', '전환']);
            setChipTexts('#budget-card-body .fun-mini-ui .ui-chip', ['예산', '루트', '식당']);
            sparkTitle.textContent = '입장 무드 체크';
            sparkBtn.textContent = '오늘의 서울 무드 뽑기';
            sparkBtn.setAttribute('aria-label', '오늘의 서울 무드 뽑기');
            const langBtn = document.getElementById('lang-toggle-btn');
            if (langBtn) langBtn.setAttribute('aria-label', '언어 전환');
            sparkResult.innerHTML = '<p class="data-source-note">한 번 누르면 바로 시작할 여행 무드와 루트를 추천합니다.</p>';
            cta.textContent = ctaVariant === 'A' ? '지금 코스 추천 받기' : '내 일정 바로 만들기';
            ctaNote.textContent = ctaVariant === 'A'
                ? '가장 빠른 시작: 1일 코스를 먼저 만든 뒤, 명소를 채워가세요.'
                : '한 번의 클릭으로 동선, 호텔, 식당 추천을 바로 받아보세요.';
            secondaryTitle.textContent = '또는 원하는 방식으로 시작';
            explore.innerHTML = '<strong>핵심 명소 둘러보기</strong><span>명소 + 지도</span>';
            course.innerHTML = '<strong>1일 코스 바로 만들기</strong><span>동선 + 식당 + 호텔</span>';
            if (funCard) funCard.innerHTML = '<strong>재미 플래너 체험하기</strong><span>퀴즈 + 예산 + 날씨</span>';
            if (navLinks[0]) navLinks[0].textContent = '여행지 탐색';
            if (navLinks[1]) navLinks[1].textContent = '코스 플래너';
            if (navLinks[2]) navLinks[2].textContent = '재미 플래너';
            if (firstOverlayClose) firstOverlayClose.setAttribute('aria-label', '닫기');
        }
        cta.dataset.variant = ctaVariant;
        if (!cta.dataset.bound) {
            cta.addEventListener('click', () => {
                if (typeof window.gtag === 'function') {
                    window.gtag('event', 'entry_primary_cta_click', {
                        variant: cta.dataset.variant || 'A',
                        lang: CURRENT_LANG
                    });
                }
            });
            cta.dataset.bound = '1';
        }
        if (!sparkBtn.dataset.bound) {
            sparkBtn.addEventListener('click', runSparkPick);
            sparkBtn.dataset.bound = '1';
        }
        if (featuredLink && !featuredLink.dataset.boundTransition) {
            featuredLink.addEventListener('click', (event) => {
                const href = featuredLink.getAttribute('href');
                if (!href) return;
                if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                event.preventDefault();
                event.stopPropagation();

                const card = featuredLink.closest('.korea-mood-card');
                const img = featuredLink.querySelector('img');
                if (!card || !img) {
                    window.location.href = href;
                    return;
                }

                const start = card.getBoundingClientRect();
                const targetWidth = Math.min(window.innerWidth * 0.92, 960);
                const targetHeight = Math.min(window.innerHeight * 0.74, 640);
                const endLeft = (window.innerWidth - targetWidth) / 2;
                const endTop = (window.innerHeight - targetHeight) / 2;

                const curtain = document.createElement('div');
                curtain.className = 'featured-transition-curtain';
                curtain.style.opacity = '0';

                const ghost = document.createElement('div');
                ghost.className = 'featured-transition-ghost';
                ghost.style.left = `${start.left}px`;
                ghost.style.top = `${start.top}px`;
                ghost.style.width = `${start.width}px`;
                ghost.style.height = `${start.height}px`;
                ghost.style.backgroundImage = `url("${img.currentSrc || img.src}")`;

                document.body.appendChild(curtain);
                document.body.appendChild(ghost);

                requestAnimationFrame(() => {
                    curtain.style.transition = 'opacity 360ms ease';
                    ghost.style.transition = 'left 380ms cubic-bezier(0.22,1,0.36,1), top 380ms cubic-bezier(0.22,1,0.36,1), width 380ms cubic-bezier(0.22,1,0.36,1), height 380ms cubic-bezier(0.22,1,0.36,1), border-radius 380ms ease';
                    curtain.style.opacity = '1';
                    ghost.style.left = `${endLeft}px`;
                    ghost.style.top = `${endTop}px`;
                    ghost.style.width = `${targetWidth}px`;
                    ghost.style.height = `${targetHeight}px`;
                    ghost.style.borderRadius = '20px';
                });

                if (typeof window.gtag === 'function') {
                    window.gtag('event', 'entry_featured_pick_transition_click', {
                        lang: CURRENT_LANG
                    });
                }

                window.setTimeout(() => {
                    window.location.href = href;
                }, 360);
            }, true);
            featuredLink.dataset.boundTransition = '1';
        }
        if (firstOverlay && !firstOverlay.dataset.bound) {
            if (firstOverlayClose) firstOverlayClose.addEventListener('click', () => closeFirstOverlay('close_button'));
            if (firstOverlayBackdrop) firstOverlayBackdrop.addEventListener('click', () => closeFirstOverlay('backdrop'));
            if (firstOverlayCta) {
                firstOverlayCta.addEventListener('click', () => {
                    const todayKey = new Date().toISOString().slice(0, 10);
                    localStorage.setItem(ENTRY_OVERLAY_LAST_SEEN_KEY, todayKey);
                    if (typeof window.gtag === 'function') {
                        window.gtag('event', 'entry_first_overlay_cta_click', {
                            lang: CURRENT_LANG,
                            variant: firstOverlayCta.dataset.variant || overlayCopyVariant
                        });
                    }
                });
            }
            firstOverlay.dataset.bound = '1';
        }
        if (firstOverlay) {
            if (firstOverlay.dataset.timerId) {
                clearTimeout(Number(firstOverlay.dataset.timerId));
            }
            const timerId = setTimeout(openFirstOverlay, 3000);
            firstOverlay.dataset.timerId = String(timerId);
        }
        initEntryFunLab();
    }

    function renderGenerationPage() {
        const heroTitle = document.getElementById('generation-hero-title');
        const heroDesc = document.getElementById('generation-hero-desc');
        const panelTitle = document.getElementById('generation-panel-title');
        const gridEl = document.getElementById('generation-grid');
        const noteEl = document.getElementById('generation-note');
        if (!heroTitle || !heroDesc || !panelTitle || !gridEl || !noteEl) return;

        const isEn = CURRENT_LANG === 'en';
        heroTitle.textContent = isEn ? 'Seoul Courses by Age Group' : '세대별 서울 추천 코스';
        heroDesc.textContent = isEn
            ? 'Choose by travel pace and group profile, then jump directly to the matching course.'
            : '여행 목적과 이동 강도에 따라 세대별로 가장 만족도가 높은 코스를 빠르게 선택하세요.';
        panelTitle.textContent = isEn ? 'Recommended Scenarios by Generation' : '세대별 추천 시나리오';
        noteEl.textContent = isEn
            ? 'Tip: adjust route details in the course page by weather, group size, and budget.'
            : '팁: 실제 이동은 날씨/인원/예산에 맞춰 코스 페이지에서 바로 조정할 수 있습니다.';

        const budgetLabel = {
            ko: { low: '예산대: 절약형', mid: '예산대: 보통', high: '예산대: 여유형' },
            en: { low: 'Budget: Low', mid: 'Budget: Medium', high: 'Budget: Premium' }
        };
        const walkLabel = {
            ko: { low: '도보 강도: 낮음', mid: '도보 강도: 보통', high: '도보 강도: 높음' },
            en: { low: 'Walking: Light', mid: 'Walking: Moderate', high: 'Walking: High' }
        };

        gridEl.innerHTML = GENERATION_COURSES.map((course) => {
            const title = isEn ? course.title.en : course.title.ko;
            const desc = isEn ? course.desc.en : course.desc.ko;
            const bullets = isEn ? course.bullets.en : course.bullets.ko;
            const cta = isEn ? course.cta.en : course.cta.ko;
            const budget = (isEn ? budgetLabel.en : budgetLabel.ko)[course.budget];
            const walk = (isEn ? walkLabel.en : walkLabel.ko)[course.walk];
            const href = withCurrentLang(`course.html?style=${encodeURIComponent(course.style)}`);
            return `
                <article class="generation-card">
                    <h3>${escapeHtml(title)}</h3>
                    <div class="generation-meta">
                        <span class="generation-chip">${escapeHtml(budget)}</span>
                        <span class="generation-chip">${escapeHtml(walk)}</span>
                    </div>
                    <p>${escapeHtml(desc)}</p>
                    <ul class="review-list">
                        ${bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}
                    </ul>
                    <a class="button-link" href="${href}">${escapeHtml(cta)}</a>
                </article>
            `;
        }).join('');
    }

    function formatReviewCount(count) {
        if (typeof count !== 'number') return '-';
        return `${count.toLocaleString()}+`;
    }

    async function fetchLivePlaceDetails(place, lang) {
        if (STATIC_SITE_MODE) return null;
        const response = await fetch(`/api/place-details?query=${encodeURIComponent(place.mapQuery)}&lang=${encodeURIComponent(lang || 'ko')}`);
        if (!response.ok) throw new Error(`API request failed: ${response.status}`);
        const json = await response.json();
        return json.details;
    }

    async function fetchTopHotels(queryText) {
        if (STATIC_SITE_MODE) throw new Error('Static mode enabled');
        const response = await fetch(`/api/hotels-top?query=${encodeURIComponent(queryText)}`);
        if (!response.ok) throw new Error(`Hotels API request failed: ${response.status}`);
        const json = await response.json();
        return json.hotels || [];
    }

    async function fetchTopRestaurantsByMeal(district, meal) {
        if (STATIC_SITE_MODE) {
            throw new Error('Static mode enabled');
        }
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

    function updatePlaceStructuredData(place, details) {
        const langParam = CURRENT_LANG === 'ko' ? '&lang=ko' : '';
        const canonicalUrl = `${window.location.origin}${window.location.pathname}?id=${encodeURIComponent(place.id)}${langParam}`;
        const canonicalEl = document.getElementById('canonical-link');
        const altKoEl = document.getElementById('alternate-ko-link');
        const altEnEl = document.getElementById('alternate-en-link');
        if (canonicalEl) canonicalEl.href = canonicalUrl;
        if (altKoEl) altKoEl.href = `${window.location.origin}${window.location.pathname}?id=${encodeURIComponent(place.id)}&lang=ko`;
        if (altEnEl) altEnEl.href = `${window.location.origin}${window.location.pathname}?id=${encodeURIComponent(place.id)}`;

        const breadcrumbScript = document.getElementById('ld-breadcrumb');
        const attractionScript = document.getElementById('ld-attraction');
        const placeName = (CURRENT_LANG === 'en' && details?.displayName) ? details.displayName : getPlaceName(place);
        const placeDescription = (CURRENT_LANG === 'en' && details?.editorialSummary)
            ? details.editorialSummary
            : (CURRENT_LANG === 'en' ? place.descriptionEn : place.description);
        const mapUrl = details?.googleMapsUri || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapQuery)}`;
        const addressText = details?.formattedAddress || `${getDistrictLabel(place.district)}, Seoul, South Korea`;
        const ratingValue = details?.rating || place.ratingValue || 0;
        const reviewCount = details?.userRatingCount || place.reviewCountValue || 0;
        const lat = Number(details?.location?.latitude ?? place.geo?.lat ?? 37.5665);
        const lng = Number(details?.location?.longitude ?? place.geo?.lng ?? 126.9780);
        const categoryLabel = getCategoryLabel(place.category);
        const districtLabel = getDistrictLabel(place.district);
        const shareImagePath = `assets/og/places/${place.id}.svg`;
        const shareImageUrl = `${window.location.origin}/${shareImagePath}`;
        const metaDescription = CURRENT_LANG === 'en'
            ? `${placeName} in ${districtLabel}, Seoul. Check map link, ratings, review highlights, and best time to visit for a smoother Seoul itinerary.`
            : `${placeName}(${districtLabel}, 서울) 상세 정보입니다. 지도 링크, 평점, 리뷰 요약, 추천 방문 시간까지 확인해 더 좋은 서울 여행 동선을 계획하세요.`;
        const socialTitle = CURRENT_LANG === 'en'
            ? `${placeName} | Seoul ${categoryLabel} | GoSeoul`
            : `${placeName} | 서울 ${categoryLabel} | GoSeoul`;
        const socialDescription = CURRENT_LANG === 'en'
            ? `${categoryLabel} spot in ${districtLabel}, Seoul with map-ready navigation and travel notes.`
            : `서울 ${districtLabel}의 ${categoryLabel} 여행지. 지도 이동 링크와 여행 메모를 한 번에 확인하세요.`;

        document.documentElement.lang = CURRENT_LANG === 'ko' ? 'ko' : 'en';

        const setMetaContent = (id, value) => {
            const el = document.getElementById(id);
            if (el && value) el.setAttribute('content', value);
        };

        setMetaContent('meta-description', metaDescription);
        setMetaContent('meta-og-title', socialTitle);
        setMetaContent('meta-og-description', socialDescription);
        setMetaContent('meta-og-url', canonicalUrl);
        setMetaContent('meta-og-image', shareImageUrl);
        setMetaContent('meta-og-locale', CURRENT_LANG === 'ko' ? 'ko_KR' : 'en_US');
        setMetaContent('meta-twitter-title', socialTitle);
        setMetaContent('meta-twitter-description', socialDescription);
        setMetaContent('meta-twitter-image', shareImageUrl);
        setMetaContent('meta-geo-placename', `${placeName}, Seoul`);
        setMetaContent('meta-geo-position', `${lat};${lng}`);
        setMetaContent('meta-icbm', `${lat}, ${lng}`);

        const breadcrumbData = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'GoSeoul',
                    item: `${window.location.origin}/`
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: placeName,
                    item: canonicalUrl
                }
            ]
        };

        const attractionData = {
            '@context': 'https://schema.org',
            '@type': 'TouristAttraction',
            name: placeName,
            description: placeDescription,
            url: canonicalUrl,
            image: shareImageUrl,
            inLanguage: CURRENT_LANG,
            touristType: place.styles.map((style) => getStyleLabel(style)),
            address: {
                '@type': 'PostalAddress',
                addressLocality: districtLabel,
                addressRegion: 'Seoul',
                addressCountry: 'KR',
                streetAddress: addressText
            },
            geo: {
                '@type': 'GeoCoordinates',
                latitude: lat,
                longitude: lng
            },
            containedInPlace: {
                '@type': 'City',
                name: 'Seoul'
            },
            hasMap: mapUrl,
            sameAs: mapUrl
        };

        if (ratingValue > 0 && reviewCount > 0) {
            attractionData.aggregateRating = {
                '@type': 'AggregateRating',
                ratingValue: Number(ratingValue.toFixed ? ratingValue.toFixed(1) : ratingValue),
                reviewCount: Number(reviewCount)
            };
        }

        if (breadcrumbScript) breadcrumbScript.textContent = JSON.stringify(breadcrumbData);
        if (attractionScript) attractionScript.textContent = JSON.stringify(attractionData);
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
        const shareCopyBtn = document.getElementById('place-share-copy-btn');
        const shareCopyStatusEl = document.getElementById('place-share-copy-status');
        const reviewList = document.getElementById('review-list');
        const dataSourceEl = document.getElementById('place-data-source');

        document.title = `${getPlaceName(place)} | GoSeoul`;
        nameEl.textContent = getPlaceName(place);
        categoryEl.textContent = getCategoryLabel(place.category);
        descEl.textContent = CURRENT_LANG === 'en' ? place.descriptionEn : place.description;
        rankEl.textContent = `TOP ${place.rank}`;
        districtEl.textContent = getDistrictLabel(place.district);
        bestTimeEl.textContent = place.bestTime;
        ratingEl.textContent = `${place.rating} (정적 데이터)`;
        reviewCountEl.textContent = `${place.reviewCount} (정적 데이터)`;
        styleBadgesEl.innerHTML = place.styles
            .map((style) => `<span class=\"${styleClass(style)}\">${getStyleLabel(style)}</span>`)
            .join('');

        const mapQuery = encodeURIComponent(place.mapQuery);
        const sharePageUrl = `${window.location.origin}/places/${encodeURIComponent(place.id)}.html`;
        mapEl.src = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
        mapExternal.href = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
        mapExternal.textContent = CURRENT_LANG === 'en' ? 'Open in Google Maps' : 'Google 지도에서 열기';
        if (shareCopyBtn) {
            shareCopyBtn.textContent = CURRENT_LANG === 'en' ? 'Copy Share Link' : '공유 링크 복사';
            shareCopyBtn.onclick = async () => {
                try {
                    const copied = await copyToClipboard(sharePageUrl);
                    if (shareCopyStatusEl) {
                        shareCopyStatusEl.textContent = copied
                            ? (CURRENT_LANG === 'en'
                                ? 'Share link copied. Paste this URL in social apps for a custom preview card.'
                                : '공유 링크가 복사되었습니다. 소셜 앱에 이 URL을 붙여넣으면 전용 미리보기 카드가 표시됩니다.')
                            : (CURRENT_LANG === 'en'
                                ? 'Copy failed. Please copy the share URL manually.'
                                : '복사에 실패했습니다. 공유 URL을 직접 복사해 주세요.');
                    }
                } catch (_) {
                    if (shareCopyStatusEl) {
                        shareCopyStatusEl.textContent = CURRENT_LANG === 'en'
                            ? 'Copy failed. Please copy the share URL manually.'
                            : '복사에 실패했습니다. 공유 URL을 직접 복사해 주세요.';
                    }
                }
            };
        }
        if (shareCopyStatusEl) {
            shareCopyStatusEl.textContent = CURRENT_LANG === 'en'
                ? `Share URL: ${sharePageUrl}`
                : `공유 URL: ${sharePageUrl}`;
        }
        renderReviews(reviewList, place.reviews);
        dataSourceEl.textContent = CURRENT_LANG === 'en'
            ? 'Ratings/Reviews: Static data mode is active.'
            : '리뷰/평점: 정적 데이터 모드로 운영 중입니다.';
        updatePlaceStructuredData(place, null);

        try {
            const details = await fetchLivePlaceDetails(place, CURRENT_LANG === 'en' ? 'en' : 'ko');
            if (!details) return;
            if (CURRENT_LANG === 'en' && details?.displayName) nameEl.textContent = details.displayName;
            if (CURRENT_LANG === 'en' && details?.formattedAddress) districtEl.textContent = details.formattedAddress;
            if (CURRENT_LANG === 'en' && details?.editorialSummary) descEl.textContent = details.editorialSummary;
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
            if (details?.googleMapsUri) {
                mapExternal.href = safeExternalUrl(details.googleMapsUri, mapExternal.href);
            }
            dataSourceEl.textContent = CURRENT_LANG === 'en'
                ? 'Ratings/Reviews: Live Google Places data applied'
                : '리뷰/평점: Google Places API 실시간 데이터 반영됨';
            updatePlaceStructuredData(place, details);
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
        const styleButtons = Array.from(document.querySelectorAll('#course-style-tabs .style-tab-btn'));
        const budgetTabs = document.getElementById('course-budget-tabs');
        const budgetButtons = Array.from(document.querySelectorAll('#course-budget-tabs .budget-tab-btn'));
        const insightSummaryEl = document.getElementById('course-insight-summary');
        const saveOfflineBtn = document.getElementById('course-save-offline-btn');
        const shareCardBtn = document.getElementById('course-share-card-btn');
        const offlinePlanSearchInput = document.getElementById('offline-plan-search-input');
        const offlinePlanListEl = document.getElementById('offline-plan-list');
        const toolsNoteEl = document.getElementById('course-tools-note');
        const titleEl = document.getElementById('day-course-title');
        const summaryEl = document.getElementById('day-course-summary');
        const routeLinkEl = document.getElementById('course-route-link');
        const timeSlotsEl = document.getElementById('course-time-slots');
        const stopListEl = document.getElementById('course-stop-list');
        const hotelListEl = document.getElementById('hotel-list');
        const hotelSourceEl = document.getElementById('hotel-source-note');
        const restaurantSourceEl = document.getElementById('restaurant-source-note');
        const restaurantSectionsEl = document.getElementById('restaurant-sections');
        if (!styleTabs || !styleButtons.length || !budgetTabs || !budgetButtons.length || !insightSummaryEl || !saveOfflineBtn || !shareCardBtn || !offlinePlanSearchInput || !offlinePlanListEl || !toolsNoteEl || !titleEl || !summaryEl || !routeLinkEl || !timeSlotsEl || !stopListEl || !hotelListEl || !hotelSourceEl || !restaurantSourceEl || !restaurantSectionsEl) return;

        const BUDGET_PRESETS = {
            budget: { ko: '실속형', en: 'Budget', lodgingFactor: 0.82, foodFactor: 0.86, transitFarePerLeg: 1500, transitMinutesPerLeg: 14 },
            standard: { ko: '균형형', en: 'Standard', lodgingFactor: 1, foodFactor: 1, transitFarePerLeg: 2100, transitMinutesPerLeg: 12 },
            premium: { ko: '프리미엄형', en: 'Premium', lodgingFactor: 1.35, foodFactor: 1.45, transitFarePerLeg: 5600, transitMinutesPerLeg: 10 }
        };

        let currentStyle = getStyleFromQuery();
        let currentBudget = localStorage.getItem(COURSE_BUDGET_STORAGE_KEY) || 'standard';
        if (!BUDGET_PRESETS[currentBudget]) currentBudget = 'standard';
        let latestCourseSnapshot = null;
        let offlineSearchQuery = '';

        function getBudgetPreset(budgetKey) {
            return BUDGET_PRESETS[budgetKey] || BUDGET_PRESETS.standard;
        }

        function getMapSearchUrl(queryText) {
            return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(queryText)}`;
        }

        function parsePriceForDisplay(priceText) {
            if (!priceText) return null;
            const raw = String(priceText).trim();
            if (!raw) return null;
            const numeric = Number(raw.replace(/[^\d.]/g, ''));
            if (!Number.isFinite(numeric) || numeric <= 0) return null;
            if (/\$|usd/i.test(raw)) return { currency: 'USD', amount: numeric };
            return { currency: 'KRW', amount: numeric };
        }

        function applyBudgetFactor(price, budgetKey, priceType) {
            const preset = getBudgetPreset(budgetKey);
            if (priceType === 'lodging') return { ...price, amount: price.amount * preset.lodgingFactor };
            if (priceType === 'food') return { ...price, amount: price.amount * preset.foodFactor };
            return price;
        }

        function displayPrice(priceText, budgetKey, priceType) {
            const parsed = parsePriceForDisplay(priceText);
            if (!parsed) return '-';

            const adjusted = applyBudgetFactor(parsed, budgetKey, priceType);
            const rate = getCurrentFxRate();
            const isEn = CURRENT_LANG === 'en';

            if (adjusted.currency === 'USD') {
                const usd = adjusted.amount;
                const krw = Math.round(usd * rate);
                return `$${formatNumber(usd, 2)} (${isEn ? 'about' : '약'} ₩${formatNumber(krw, 0)})`;
            }

            const krw = Math.round(adjusted.amount);
            const usd = Math.ceil(krw / rate);
            return `₩${formatNumber(krw, 0)} (${isEn ? 'about' : '약'} $${formatNumber(usd, 0)})`;
        }

        function markActiveStyle(styleKey) {
            styleButtons.forEach((btn) => {
                const active = btn.dataset.style === styleKey;
                btn.classList.toggle('active', active);
                btn.setAttribute('aria-selected', active ? 'true' : 'false');
            });
        }

        function markActiveBudget(budgetKey) {
            budgetButtons.forEach((btn) => {
                const active = btn.dataset.budget === budgetKey;
                btn.classList.toggle('active', active);
                btn.setAttribute('aria-selected', active ? 'true' : 'false');
            });
        }

        function formatDuration(totalMinutes) {
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            if (CURRENT_LANG === 'en') {
                if (hours <= 0) return `${minutes} min`;
                return `${hours}h ${minutes}m`;
            }
            if (hours <= 0) return `${minutes}분`;
            return `${hours}시간 ${minutes}분`;
        }

        function renderInsightSummary(filtered, totalWalking, budgetKey) {
            const preset = getBudgetPreset(budgetKey);
            const legs = Math.max(filtered.length - 1, 1);
            const transitMinutes = legs * preset.transitMinutesPerLeg;
            const transitCostKrw = legs * preset.transitFarePerLeg;
            const visitMinutes = filtered.length * 42;
            const totalCourseMinutes = totalWalking + transitMinutes + visitMinutes;
            const transitCostUsd = Math.ceil(transitCostKrw / getCurrentFxRate());
            const budgetLabel = CURRENT_LANG === 'en' ? preset.en : preset.ko;

            insightSummaryEl.innerHTML = `
                <p><strong>${CURRENT_LANG === 'en' ? 'Budget mode' : '예산 모드'}</strong>: ${budgetLabel}</p>
                <p><strong>${CURRENT_LANG === 'en' ? 'Walking + transfer' : '도보 + 환승 예상'}</strong>: ${formatDuration(totalWalking + transitMinutes)}</p>
                <p><strong>${CURRENT_LANG === 'en' ? 'Estimated total day time' : '예상 총 소요시간'}</strong>: ${formatDuration(totalCourseMinutes)}</p>
                <p><strong>${CURRENT_LANG === 'en' ? 'Local transit cost' : '교통비 추정'}</strong>: ₩${formatNumber(transitCostKrw, 0)} (${CURRENT_LANG === 'en' ? 'about' : '약'} $${formatNumber(transitCostUsd, 0)})</p>
            `;
            return { transitMinutes, transitCostKrw, totalCourseMinutes, budgetLabel };
        }

        function drawWrappedLines(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
            const words = String(text || '').split(/\s+/);
            let line = '';
            let lines = 0;
            words.forEach((word) => {
                const candidate = line ? `${line} ${word}` : word;
                if (ctx.measureText(candidate).width > maxWidth && line) {
                    ctx.fillText(line, x, y + (lines * lineHeight));
                    lines += 1;
                    line = word;
                } else {
                    line = candidate;
                }
            });
            if (line && lines < maxLines) {
                ctx.fillText(line, x, y + (lines * lineHeight));
                lines += 1;
            }
            return y + (lines * lineHeight);
        }

        function readOfflinePlans() {
            try {
                const raw = localStorage.getItem(OFFLINE_COURSE_PLAN_STORAGE_KEY);
                const parsed = raw ? JSON.parse(raw) : {};
                if (!parsed || typeof parsed !== 'object') return {};
                return parsed;
            } catch (_) {
                return {};
            }
        }

        function writeOfflinePlans(plans) {
            localStorage.setItem(OFFLINE_COURSE_PLAN_STORAGE_KEY, JSON.stringify(plans));
        }

        function renderOfflinePlanList() {
            const plans = readOfflinePlans();
            const rows = Object.entries(plans)
                .map(([key, value]) => ({ key, value }))
                .filter((entry) => entry.value && entry.value.styleKey && entry.value.budgetKey)
                .filter(({ value }) => {
                    const query = offlineSearchQuery.trim().toLowerCase();
                    if (!query) return true;
                    const haystack = [value.title, value.budgetLabel, value.styleKey, value.budgetKey].map((v) => String(v || '').toLowerCase()).join(' ');
                    return haystack.includes(query);
                })
                .sort((a, b) => {
                    const pinnedA = a.value.pinned ? 1 : 0;
                    const pinnedB = b.value.pinned ? 1 : 0;
                    if (pinnedA !== pinnedB) return pinnedB - pinnedA;
                    return String(b.value.savedAt || '').localeCompare(String(a.value.savedAt || ''));
                });

            if (!rows.length) {
                const hasQuery = offlineSearchQuery.trim().length > 0;
                offlinePlanListEl.innerHTML = `<p class="offline-plan-meta">${hasQuery
                    ? (CURRENT_LANG === 'en' ? 'No matching saved plans.' : '조건에 맞는 저장 코스가 없습니다.')
                    : (CURRENT_LANG === 'en' ? 'No saved plan yet.' : '아직 저장된 코스가 없습니다.')}</p>`;
                return;
            }

            offlinePlanListEl.innerHTML = rows.slice(0, 8).map(({ key, value }) => {
                const savedAtText = formatFxUpdatedAt(value.savedAt);
                return `
                    <article class="offline-plan-item">
                        <strong>${escapeHtml(value.title || '-')}</strong>
                        <p class="offline-plan-meta">${CURRENT_LANG === 'en' ? 'Saved' : '저장일'}: ${escapeHtml(savedAtText)} · ${CURRENT_LANG === 'en' ? 'Budget' : '예산'}: ${escapeHtml(value.budgetLabel || '-')}</p>
                        <div class="offline-plan-actions">
                            <button class="offline-plan-btn ${value.pinned ? 'pin-active' : ''}" type="button" data-action="pin" data-plan-key="${escapeHtml(key)}">${value.pinned ? (CURRENT_LANG === 'en' ? 'Unpin' : '핀해제') : (CURRENT_LANG === 'en' ? 'Pin' : '핀고정')}</button>
                            <button class="offline-plan-btn" type="button" data-action="load" data-plan-key="${escapeHtml(key)}">${CURRENT_LANG === 'en' ? 'Load' : '불러오기'}</button>
                            <button class="offline-plan-btn" type="button" data-action="delete" data-plan-key="${escapeHtml(key)}">${CURRENT_LANG === 'en' ? 'Delete' : '삭제'}</button>
                        </div>
                    </article>
                `;
            }).join('');
        }

        async function createShareCardBlob(snapshot) {
            const canvas = document.createElement('canvas');
            canvas.width = 1080;
            canvas.height = 1080;
            const ctx = canvas.getContext('2d');
            if (!ctx) return null;

            const gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
            gradient.addColorStop(0, '#0f172a');
            gradient.addColorStop(1, '#1d4ed8');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#e5edff';
            ctx.font = '700 44px "Noto Sans KR", sans-serif';
            ctx.fillText('GoSeoul', 76, 110);

            ctx.fillStyle = '#ffffff';
            ctx.font = '700 58px "Noto Sans KR", sans-serif';
            drawWrappedLines(ctx, snapshot.title, 76, 210, 920, 72, 3);

            ctx.font = '500 34px "Noto Sans KR", sans-serif';
            ctx.fillStyle = '#dbe8ff';
            ctx.fillText(`${CURRENT_LANG === 'en' ? 'Budget' : '예산'}: ${snapshot.budgetLabel}`, 76, 440);
            ctx.fillText(`${CURRENT_LANG === 'en' ? 'Total Time' : '총 소요'}: ${snapshot.totalDurationLabel}`, 76, 495);
            ctx.fillText(`${CURRENT_LANG === 'en' ? 'Transit' : '교통비'}: ${snapshot.transitFareLabel}`, 76, 550);

            ctx.fillStyle = '#9cc0ff';
            ctx.font = '700 30px "Noto Sans KR", sans-serif';
            ctx.fillText(CURRENT_LANG === 'en' ? 'TOP STOPS' : '주요 스팟', 76, 640);

            ctx.fillStyle = '#ffffff';
            ctx.font = '500 30px "Noto Sans KR", sans-serif';
            let lineY = 690;
            snapshot.stops.slice(0, 5).forEach((name, idx) => {
                lineY = drawWrappedLines(ctx, `${idx + 1}. ${name}`, 76, lineY, 920, 42, 1) + 6;
            });

            ctx.fillStyle = '#dbe8ff';
            ctx.font = '500 24px "Noto Sans KR", sans-serif';
            ctx.fillText(snapshot.routeUrl, 76, 1010);

            return new Promise((resolve) => {
                canvas.toBlob((blob) => resolve(blob), 'image/png');
            });
        }

        function saveCurrentPlanOffline() {
            if (!latestCourseSnapshot) return;
            const key = `${latestCourseSnapshot.styleKey}-${latestCourseSnapshot.budgetKey}-${CURRENT_LANG}`;
            const payload = {
                ...latestCourseSnapshot,
                pinned: false,
                savedAt: new Date().toISOString()
            };
            try {
                const allPlans = readOfflinePlans();
                const existing = allPlans[key];
                if (existing && existing.pinned) payload.pinned = true;
                allPlans[key] = payload;
                writeOfflinePlans(allPlans);
                renderOfflinePlanList();
                toolsNoteEl.textContent = CURRENT_LANG === 'en'
                    ? `Saved offline on this device (${formatFxUpdatedAt(payload.savedAt)}).`
                    : `이 기기에 오프라인 저장되었습니다. (${formatFxUpdatedAt(payload.savedAt)})`;
            } catch (_) {
                toolsNoteEl.textContent = CURRENT_LANG === 'en'
                    ? 'Could not save locally in this browser.'
                    : '브라우저 로컬 저장에 실패했습니다.';
            }
        }

        async function shareCurrentPlanCard() {
            if (!latestCourseSnapshot) return;
            toolsNoteEl.textContent = CURRENT_LANG === 'en' ? 'Generating share card...' : '공유 카드를 생성하는 중입니다...';
            const blob = await createShareCardBlob(latestCourseSnapshot);
            if (!blob) {
                toolsNoteEl.textContent = CURRENT_LANG === 'en' ? 'Share card generation failed.' : '공유 카드 생성에 실패했습니다.';
                return;
            }
            const fileName = `seoul-plan-${latestCourseSnapshot.styleKey}-${latestCourseSnapshot.budgetKey}.png`;
            const file = new File([blob], fileName, { type: 'image/png' });
            const shareTitle = latestCourseSnapshot.title;
            const shareText = CURRENT_LANG === 'en' ? 'My Seoul one-day plan' : '내 서울 1일 여행 플랜';
            const shareUrl = window.location.href;
            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        title: shareTitle,
                        text: shareText,
                        url: shareUrl,
                        files: [file]
                    });
                    toolsNoteEl.textContent = CURRENT_LANG === 'en' ? 'Share card ready and shared.' : '공유 카드가 생성되어 공유되었습니다.';
                    return;
                } catch (error) {
                    const message = String(error?.message || error || '').toLowerCase();
                    if (message.includes('flair')) {
                        const redditSubmitUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`;
                        toolsNoteEl.innerHTML = CURRENT_LANG === 'en'
                            ? `Reddit requires post flair in some communities. <a class="text-link" href="${redditSubmitUrl}" target="_blank" rel="noopener noreferrer">Open Reddit share</a> and choose a flair there.`
                            : `일부 Reddit 커뮤니티는 포스트 플레어가 필수입니다. <a class="text-link" href="${redditSubmitUrl}" target="_blank" rel="noopener noreferrer">Reddit 공유 열기</a>에서 플레어를 선택해 주세요.`;
                        return;
                    }
                    // Fall through to download.
                }
            }
            const objectUrl = URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = objectUrl;
            anchor.download = fileName;
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
            URL.revokeObjectURL(objectUrl);
            toolsNoteEl.textContent = CURRENT_LANG === 'en' ? 'Share card downloaded.' : '공유 카드가 다운로드되었습니다.';
        }

        async function drawCourse(selectedStyle) {
            const filtered = places.filter((place) => place.styles.includes(selectedStyle)).slice(0, 6);
            if (filtered.length < 2) return;
            const budgetPreset = getBudgetPreset(currentBudget);
            const budgetLabel = CURRENT_LANG === 'en' ? budgetPreset.en : budgetPreset.ko;

            titleEl.textContent = CURRENT_LANG === 'en'
                ? `${getStyleLabel(selectedStyle)} One-Day Walking Course`
                : `${getStyleLabel(selectedStyle)} 도보 1일 코스`;

            const totalWalking = filtered.slice(0, -1).reduce((sum, place, idx) => {
                return sum + makeWalkingMinutes(place, filtered[idx + 1], idx);
            }, 0);
            const insight = renderInsightSummary(filtered, totalWalking, currentBudget);

            summaryEl.textContent = `총 ${filtered.length}개 스팟, 예상 도보 이동 ${totalWalking}분 기준 추천 코스입니다. (${budgetLabel})`;
            if (CURRENT_LANG === 'en') {
                summaryEl.textContent = `${filtered.length} spots with about ${totalWalking} minutes of walking in total (${budgetLabel} mode).`;
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
                    ? grouped[slot].map((place) => `<li>${getPlaceName(place)} (${getDistrictLabel(place.district)})</li>`).join('')
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
                li.innerHTML = `<span class=\"stop-title\">${idx + 1}. ${getPlaceName(place)}</span> (${getDistrictLabel(place.district)})${walk}`;
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
                    const mapHref = safeExternalUrl(
                        hotel.googleMapsUri,
                        getMapSearchUrl(`${hotel.name} ${filtered[0].district} Seoul`)
                    );
                    const safeHotelName = escapeHtml(hotel.name || '-');
                    const safeHotelAddress = escapeHtml(hotel.address || '');
                    const mapAnchor = ` <a class=\"inline-map-btn\" href=\"${mapHref}\" target=\"_blank\" rel=\"noopener noreferrer\">${CURRENT_LANG === 'en' ? 'Open Map' : '지도 열기'}</a>`;
                    li.innerHTML = `
                        <a class=\"hotel-name\" href=\"${mapHref}\" target=\"_blank\" rel=\"noopener noreferrer\">${idx + 1}. ${safeHotelName}</a><br>
                        <span class=\"hotel-meta\">${CURRENT_LANG === 'en' ? 'Rating' : '평점'} ${hotel.rating || '-'} / ${CURRENT_LANG === 'en' ? 'Reviews' : '리뷰'} ${hotel.userRatingCount?.toLocaleString?.() || '-'} / ${CURRENT_LANG === 'en' ? 'Avg price' : '평균가격'} ${displayPrice(hotel.averagePrice, currentBudget, 'lodging')}</span><br>
                        <span class=\"hotel-meta\">${safeHotelAddress}${mapAnchor}</span>
                    `;
                    hotelListEl.appendChild(li);
                });
                hotelSourceEl.textContent = CURRENT_LANG === 'en'
                    ? 'Hotels: Top 5 based on Google Places rating'
                    : '숙소 데이터: Google Places 평점 기준 상위 5개';
            } catch (_) {
                const fallback = filtered.slice(0, 5).map((place, idx) => ({
                    name: CURRENT_LANG === 'en'
                        ? `${getDistrictLabel(place.district)} Recommended Hotel ${idx + 1}`
                        : `${place.district} 중심 호텔 추천 ${idx + 1}`,
                    rating: (4.3 + idx * 0.1).toFixed(1),
                    reviewCount: `${(1200 + idx * 330).toLocaleString()}+`,
                    averagePrice: `약 ₩${(110000 + idx * 25000).toLocaleString()}`,
                    address: `${getDistrictLabel(place.district)} ${CURRENT_LANG === 'en' ? 'near major attractions' : '주요 관광 동선 인접'}`
                }));
                fallback.forEach((hotel, idx) => {
                    const li = document.createElement('li');
                    const mapHref = getMapSearchUrl(`${hotel.name} ${filtered[0].district} Seoul`);
                    const safeHotelName = escapeHtml(hotel.name || '-');
                    const safeHotelAddress = escapeHtml(hotel.address || '');
                    li.innerHTML = `
                        <a class=\"hotel-name\" href=\"${mapHref}\" target=\"_blank\" rel=\"noopener noreferrer\">${idx + 1}. ${safeHotelName}</a><br>
                        <span class=\"hotel-meta\">${CURRENT_LANG === 'en' ? 'Rating' : '평점'} ${hotel.rating} / ${CURRENT_LANG === 'en' ? 'Reviews' : '리뷰'} ${hotel.reviewCount} / ${CURRENT_LANG === 'en' ? 'Avg price' : '평균가격'} ${displayPrice(hotel.averagePrice, currentBudget, 'lodging')}</span><br>
                        <span class=\"hotel-meta\">${safeHotelAddress} <a class=\"inline-map-btn\" href=\"${mapHref}\" target=\"_blank\" rel=\"noopener noreferrer\">${CURRENT_LANG === 'en' ? 'Open Map' : '지도 열기'}</a></span>
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
                const districtTitle = CURRENT_LANG === 'en'
                    ? `${getDistrictLabel(district)} - Top 3 by meal`
                    : `${district} 맛집 3곳씩 추천`;
                districtBlock.innerHTML = `<h3>${escapeHtml(districtTitle)}</h3><div class=\"meal-grid\"></div>`;
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
                                name: CURRENT_LANG === 'en' ? `${getDistrictLabel(district)} ${meal.label} Pick ${n}` : `${district} ${meal.label} 추천 ${n}`,
                                rating: (4.2 + n * 0.1).toFixed(1),
                                userRatingCount: 1000 + n * 300,
                                address: CURRENT_LANG === 'en' ? `${getDistrictLabel(district)} hot area` : `${district} 인기 상권`,
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
                        const broadcastTag = matchedBroadcast ? ` <span class=\"broadcast-chip\">${escapeHtml(matchedBroadcast.show)}</span>` : '';
                        const mapHref = safeExternalUrl(
                            r.googleMapsUri,
                            getMapSearchUrl(`${r.name} ${district} Seoul`)
                        );
                        const safeRestaurantName = escapeHtml(r.name || '-');
                        const safeRestaurantAddress = escapeHtml(r.address || '');
                        const mapLink = ` <a class=\"inline-map-btn\" href=\"${mapHref}\" target=\"_blank\" rel=\"noopener noreferrer\">${CURRENT_LANG === 'en' ? 'Open Map' : '지도 열기'}</a>`;
                        return `<li><a class=\"hotel-name\" href=\"${mapHref}\" target=\"_blank\" rel=\"noopener noreferrer\">${idx + 1}. ${safeRestaurantName}</a>${broadcastTag}<br><span class=\"hotel-meta\">${CURRENT_LANG === 'en' ? 'Rating' : '평점'} ${r.rating || '-'} / ${CURRENT_LANG === 'en' ? 'Reviews' : '리뷰'} ${(r.userRatingCount || 0).toLocaleString()} / ${CURRENT_LANG === 'en' ? 'Avg price' : '평균가격'} ${displayPrice(r.averagePrice || '-', currentBudget, 'food')}</span><br><span class=\"hotel-meta\">${safeRestaurantAddress}${mapLink}</span></li>`;
                    }).join('');

                    const extraBroadcast = (mealData.broadcastPicks || []).filter((pick) => !mealData.restaurants.some((r) => r.name.includes(pick.name) || pick.name.includes(r.name)));
                    const curation = extraBroadcast.length
                        ? `<p class=\"data-source-note\">${CURRENT_LANG === 'en' ? 'Broadcast curation' : '방송 큐레이션'}: ${extraBroadcast.map((pick) => `${escapeHtml(pick.name)}(${escapeHtml(pick.show)})`).join(', ')}</p>`
                        : '';
                    mealCard.innerHTML = `<h4>${escapeHtml(mealData.label)}</h4><ul>${rows}</ul>${curation}`;
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

            latestCourseSnapshot = {
                styleKey: selectedStyle,
                budgetKey: currentBudget,
                title: titleEl.textContent || '',
                budgetLabel: insight.budgetLabel,
                totalDurationLabel: formatDuration(insight.totalCourseMinutes),
                transitFareLabel: `₩${formatNumber(insight.transitCostKrw, 0)} (${CURRENT_LANG === 'en' ? 'about' : '약'} $${formatNumber(Math.ceil(insight.transitCostKrw / getCurrentFxRate()), 0)})`,
                stops: filtered.map((place) => getPlaceName(place)),
                routeUrl: routeLinkEl.href
            };
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

        budgetTabs.addEventListener('click', (event) => {
            const button = event.target.closest('.budget-tab-btn');
            if (!button) return;
            const nextBudget = button.dataset.budget;
            if (!nextBudget || nextBudget === currentBudget || !BUDGET_PRESETS[nextBudget]) return;
            currentBudget = nextBudget;
            localStorage.setItem(COURSE_BUDGET_STORAGE_KEY, currentBudget);
            markActiveBudget(currentBudget);
            drawCourse(currentStyle);
        });

        saveOfflineBtn.addEventListener('click', saveCurrentPlanOffline);
        shareCardBtn.addEventListener('click', shareCurrentPlanCard);
        offlinePlanSearchInput.addEventListener('input', () => {
            offlineSearchQuery = offlinePlanSearchInput.value || '';
            renderOfflinePlanList();
        });
        offlinePlanListEl.addEventListener('click', (event) => {
            const button = event.target.closest('.offline-plan-btn');
            if (!button) return;
            const planKey = button.getAttribute('data-plan-key');
            const action = button.getAttribute('data-action');
            if (!planKey || !action) return;
            const plans = readOfflinePlans();
            const target = plans[planKey];
            if (!target) {
                renderOfflinePlanList();
                return;
            }
            if (action === 'pin') {
                target.pinned = !target.pinned;
                plans[planKey] = target;
                writeOfflinePlans(plans);
                renderOfflinePlanList();
                toolsNoteEl.textContent = target.pinned
                    ? (CURRENT_LANG === 'en' ? 'Plan pinned to top.' : '해당 코스를 상단 고정했습니다.')
                    : (CURRENT_LANG === 'en' ? 'Pin removed.' : '상단 고정을 해제했습니다.');
                return;
            }
            if (action === 'delete') {
                delete plans[planKey];
                writeOfflinePlans(plans);
                renderOfflinePlanList();
                toolsNoteEl.textContent = CURRENT_LANG === 'en' ? 'Saved plan deleted.' : '저장된 코스를 삭제했습니다.';
                return;
            }
            if (action === 'load') {
                if (target.styleKey) currentStyle = target.styleKey;
                if (target.budgetKey && BUDGET_PRESETS[target.budgetKey]) currentBudget = target.budgetKey;
                localStorage.setItem(COURSE_BUDGET_STORAGE_KEY, currentBudget);
                markActiveStyle(currentStyle);
                markActiveBudget(currentBudget);
                const nextUrl = new URL(window.location.href);
                nextUrl.searchParams.set('style', currentStyle);
                window.history.replaceState({}, '', nextUrl.toString());
                drawCourse(currentStyle);
                toolsNoteEl.textContent = CURRENT_LANG === 'en'
                    ? `Loaded saved plan (${formatFxUpdatedAt(target.savedAt)}).`
                    : `저장된 코스를 불러왔습니다. (${formatFxUpdatedAt(target.savedAt)})`;
            }
        });

        window.addEventListener('fx-rate-updated', () => {
            drawCourse(currentStyle);
        });

        markActiveStyle(currentStyle);
        markActiveBudget(currentBudget);
        renderOfflinePlanList();
        drawCourse(currentStyle);
    }

    function renderPartnerPage() {
        const place = placeMap[getPlaceIdFromQuery()];
        if (!place) return;

        updateTopNavLinks(place.id);

        const selectedName = document.getElementById('selected-place-name');
        const selectedId = document.getElementById('selected-place-id');
        const message = document.getElementById('message');

        selectedName.textContent = getPlaceName(place);
        selectedId.value = place.id;
        message.placeholder = CURRENT_LANG === 'en'
            ? `Leave your partnership inquiry for ${place.name}.`
            : `${place.name} 제휴 관련 문의를 남겨주세요.`;
    }

    function renderSajuPage() {
        const form = document.getElementById('saju-form');
        const pageTitle = document.getElementById('saju-page-title');
        const pageDesc = document.getElementById('saju-page-desc');
        const submitBtn = document.getElementById('saju-submit-btn');
        const resultTitle = document.getElementById('saju-result-title');
        const resultNote = document.getElementById('saju-result-note');
        const pillarsEl = document.getElementById('saju-pillars');
        const summaryEl = document.getElementById('saju-summary');
        const analysisLongEl = document.getElementById('saju-analysis-long');
        const warningEl = document.getElementById('saju-warning');
        const recoTitle = document.getElementById('saju-reco-title');
        const styleChipsEl = document.getElementById('saju-style-chips');
        const routePlanEl = document.getElementById('saju-route-plan');
        const placeListEl = document.getElementById('saju-place-list');
        const guideTitle = document.getElementById('saju-guide-title');
        const guide1 = document.getElementById('saju-guide-1');
        const guide2 = document.getElementById('saju-guide-2');
        const tojeongTitle = document.getElementById('saju-tojeong-title');
        const fortuneOverallLabel = document.getElementById('saju-fortune-overall-label');
        const fortuneTimingLabel = document.getElementById('saju-fortune-timing-label');
        const fortuneCautionLabel = document.getElementById('saju-fortune-caution-label');
        const fortuneRouteLabel = document.getElementById('saju-fortune-route-label');
        const fortuneOverall = document.getElementById('saju-fortune-overall');
        const fortuneTiming = document.getElementById('saju-fortune-timing');
        const fortuneCaution = document.getElementById('saju-fortune-caution');
        const fortuneRoute = document.getElementById('saju-fortune-route');
        const elementLightsEl = document.getElementById('saju-element-lights');
        const yearInput = document.getElementById('birth-year');
        const monthInput = document.getElementById('birth-month');
        const dayInput = document.getElementById('birth-day');
        const calendarType = document.getElementById('calendar-type');
        const yearLabel = document.getElementById('birth-year-label');
        const monthLabel = document.getElementById('birth-month-label');
        const dayLabel = document.getElementById('birth-day-label');
        const calendarLabel = document.getElementById('calendar-type-label');
        const westernTitle = document.getElementById('saju-western-title');
        const westernDesc = document.getElementById('saju-western-desc');
        const westernPoint1 = document.getElementById('saju-western-point-1');
        const westernPoint2 = document.getElementById('saju-western-point-2');
        const westernPoint3 = document.getElementById('saju-western-point-3');
        const travelWhyTitle = document.getElementById('saju-travel-why-title');
        const travelWhy1 = document.getElementById('saju-travel-why-1');
        const travelWhy2 = document.getElementById('saju-travel-why-2');
        const travelWhy3 = document.getElementById('saju-travel-why-3');

        if (!form || !pageTitle || !pageDesc || !submitBtn || !resultTitle || !resultNote || !pillarsEl || !summaryEl || !analysisLongEl || !warningEl || !recoTitle || !styleChipsEl || !placeListEl || !guideTitle || !guide1 || !guide2 || !yearInput || !monthInput || !dayInput || !calendarType || !yearLabel || !monthLabel || !dayLabel || !calendarLabel) return;

        const isEn = CURRENT_LANG === 'en';
        pageTitle.textContent = isEn ? 'Saju-Based Travel Recommender' : '사주 기반 여행 추천';
        pageDesc.textContent = isEn
            ? 'Enter birth date and calendar type to get a lightweight saju profile and matching Seoul courses.'
            : '생년월일과 양력/음력 구분을 입력하면, 간이 사주 성향과 맞는 서울 코스를 추천해 드립니다.';
        submitBtn.textContent = isEn ? 'Show Saju & Recommendations' : '사주/추천 보기';
        resultTitle.textContent = isEn ? 'Saju Result' : '사주 결과';
        recoTitle.textContent = isEn ? 'Recommended Travel Courses' : '추천 여행 코스';
        guideTitle.textContent = isEn ? 'Notes' : '안내';
        guide1.textContent = isEn
            ? 'This is a lightweight interpretation for travel style exploration and is not professional fortune reading.'
            : '본 기능은 여행 취향 탐색을 위한 간이 사주 해석입니다. 전문 역학 감정 결과와는 차이가 있을 수 있습니다.';
        guide2.textContent = isEn
            ? 'Lunar input uses a simplified conversion model. For exact reading, consult a professional service.'
            : '음력 입력은 간이 계산 방식으로 해석되며, 정확한 개인 사주 감정을 원하면 전문 서비스를 이용하세요.';
        yearLabel.textContent = isEn ? 'Birth Year' : '태어난 년도';
        monthLabel.textContent = isEn ? 'Birth Month' : '태어난 월';
        dayLabel.textContent = isEn ? 'Birth Day' : '태어난 일';
        calendarLabel.textContent = isEn ? 'Calendar Type' : '달력 구분';
        yearInput.placeholder = isEn ? 'e.g. 1992' : '예: 1992';
        monthInput.placeholder = isEn ? 'e.g. 8' : '예: 8';
        dayInput.placeholder = isEn ? 'e.g. 14' : '예: 14';
        if (calendarType.options[0]) calendarType.options[0].textContent = isEn ? 'Solar' : '양력';
        if (calendarType.options[1]) calendarType.options[1].textContent = isEn ? 'Lunar' : '음력';
        resultNote.textContent = isEn ? 'Fill the form to generate your result.' : '입력 후 결과가 표시됩니다.';
        if (tojeongTitle) tojeongTitle.textContent = isEn ? 'Tojeong-style Travel Reading' : '토정비결 스타일 여행 해설';
        if (fortuneOverallLabel) fortuneOverallLabel.textContent = isEn ? 'Overall Flow' : '총운 흐름';
        if (fortuneTimingLabel) fortuneTimingLabel.textContent = isEn ? 'Timing' : '시기 운';
        if (fortuneCautionLabel) fortuneCautionLabel.textContent = isEn ? 'Caution' : '주의 포인트';
        if (fortuneRouteLabel) fortuneRouteLabel.textContent = isEn ? 'Route Tip' : '동선 조언';
        if (westernTitle) westernTitle.textContent = isEn
            ? 'How to read Saju if you are new to East Asian astrology'
            : '동양 점성 개념이 익숙하지 않은 분을 위한 사주 읽기';
        if (westernDesc) westernDesc.textContent = isEn
            ? 'Saju can be read as an energy-pattern framework. In this page, it is simplified into travel pace, mood, and route style so first-time users can apply it without technical terms.'
            : '사주는 에너지 패턴을 읽는 프레임으로 볼 수 있습니다. 이 페이지에서는 이를 여행 속도, 분위기, 동선 스타일로 단순화해 처음 보는 분도 쉽게 활용할 수 있게 구성했습니다.';
        if (westernPoint1) westernPoint1.textContent = isEn
            ? 'Think of Saju as a personality-energy map, not a fixed prediction of fate.'
            : '사주를 고정된 운명 예측이 아니라 성향/에너지 지도처럼 이해해 보세요.';
        if (westernPoint2) westernPoint2.textContent = isEn
            ? 'The five elements (Wood, Fire, Earth, Metal, Water) are used here as travel-style signals.'
            : '이 페이지에서는 오행(목·화·토·금·수)을 여행 스타일 신호로 활용합니다.';
        if (westernPoint3) westernPoint3.textContent = isEn
            ? 'Use the result as a starting hypothesis, then adjust with your real budget, weather, and walking stamina.'
            : '결과를 출발 가설로 쓰고, 실제 예산·날씨·체력에 맞춰 조정하는 방식이 가장 좋습니다.';
        if (travelWhyTitle) travelWhyTitle.textContent = isEn
            ? 'Why planning travel with Saju can still be useful'
            : '사주 기반으로 여행계획을 세우면 좋은 이유';
        if (travelWhy1) travelWhy1.textContent = isEn
            ? 'Faster decisions: it narrows options when you are overwhelmed by too many places.'
            : '의사결정 속도 향상: 선택지가 너무 많아 막힐 때 후보를 빠르게 줄여줍니다.';
        if (travelWhy2) travelWhy2.textContent = isEn
            ? 'Better trip rhythm: it helps balance high-energy spots and recovery stops.'
            : '여행 리듬 최적화: 에너지 높은 스팟과 회복 구간의 균형을 잡기 쉽습니다.';
        if (travelWhy3) travelWhy3.textContent = isEn
            ? 'More personal routes: it encourages style-fit choices rather than generic top-10 lists.'
            : '개인화된 동선: 획일적인 인기 순위보다 본인 성향에 맞는 코스 선택을 돕습니다.';
        summaryEl.textContent = '';
        analysisLongEl.innerHTML = '';
        warningEl.textContent = '';
        if (fortuneOverall) fortuneOverall.textContent = '';
        if (fortuneTiming) fortuneTiming.textContent = '';
        if (fortuneCaution) fortuneCaution.textContent = '';
        if (fortuneRoute) fortuneRoute.textContent = '';
        if (elementLightsEl) elementLightsEl.innerHTML = '';

        const STEMS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
        const BRANCHES = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];
        const STEMS_EN = ['Gap', 'Eul', 'Byeong', 'Jeong', 'Mu', 'Gi', 'Gyeong', 'Sin', 'Im', 'Gye'];
        const BRANCHES_EN = ['Ja', 'Chuk', 'In', 'Myo', 'Jin', 'Sa', 'O', 'Mi', 'Sin', 'Yu', 'Sul', 'Hae'];
        const ELEMENT_BY_STEM_INDEX = ['wood', 'wood', 'fire', 'fire', 'earth', 'earth', 'metal', 'metal', 'water', 'water'];
        const ELEMENT_LABEL = {
            ko: { wood: '목', fire: '화', earth: '토', metal: '금', water: '수' },
            en: { wood: 'Wood', fire: 'Fire', earth: 'Earth', metal: 'Metal', water: 'Water' }
        };

        const styleMapByElement = {
            wood: ['nature', 'local'],
            fire: ['night', 'shopping'],
            earth: ['history', 'family'],
            metal: ['art', 'shopping'],
            water: ['nature', 'history']
        };

        const summaryByElement = {
            ko: {
                wood: '목(木) 기운이 강하게 작동하는 명식으로, 확장성과 성장 의지가 여행 동선에도 반영됩니다.',
                fire: '화(火) 기운이 도드라져 활기·표현·현장 체감형 일정에서 에너지가 상승하는 구조입니다.',
                earth: '토(土) 기운이 중심을 잡아 안정적 동선, 휴식 리듬, 균형 잡힌 일정에서 만족도가 높습니다.',
                metal: '금(金) 기운이 선명해 구조화된 공간, 완성도 높은 전시, 정돈된 코스에서 집중력이 살아납니다.',
                water: '수(水) 기운이 살아 있어 흐름·이동·몰입형 경험에 강점이 있고 유연한 코스 적응력이 높습니다.'
            },
            en: {
                wood: 'Wood is prominent in your chart, favoring growth-oriented exploration and expanding routes.',
                fire: 'Fire is active, so energetic, expressive, and experience-heavy plans feel especially rewarding.',
                earth: 'Earth provides core stability, making balanced pacing and restful flow highly compatible.',
                metal: 'Metal is clear, supporting structured spaces, curated exhibitions, and organized itineraries.',
                water: 'Water is vivid, indicating strength in flow, movement, immersion, and adaptive scheduling.'
            }
        };

        const seasonByMonth = {
            ko: {
                1: '한겨울 수기(水氣)', 2: '입춘 직후 목기(木氣)', 3: '봄 목기(木氣)', 4: '늦봄 화기(火氣) 상승',
                5: '초여름 화기(火氣)', 6: '한여름 화기(火氣) 극성', 7: '늦여름 토기(土氣)', 8: '초가을 금기(金氣)',
                9: '가을 금기(金氣)', 10: '늦가을 수기(水氣) 전환', 11: '초겨울 수기(水氣)', 12: '겨울 수기(水氣)'
            },
            en: {
                1: 'deep winter water qi', 2: 'early spring wood qi', 3: 'spring wood qi', 4: 'late spring rising fire qi',
                5: 'early summer fire qi', 6: 'midsummer peak fire qi', 7: 'late summer earth qi', 8: 'early autumn metal qi',
                9: 'autumn metal qi', 10: 'late autumn transition to water qi', 11: 'early winter water qi', 12: 'winter water qi'
            }
        };

        const styleReasonByElement = {
            ko: {
                wood: '목 기운은 확장·성장을 뜻해 공원 산책과 로컬 골목 탐방에서 운세 흐름이 자연스럽게 이어집니다.',
                fire: '화 기운은 활력·가시성을 중시하므로 야경, 트렌드 상권, 저녁 체험형 코스에서 만족도가 높습니다.',
                earth: '토 기운은 안정·축적 성향이 강해 역사·가족형 코스처럼 페이스가 안정적인 일정과 궁합이 좋습니다.',
                metal: '금 기운은 정제·완성도를 선호해 전시/뮤지엄/디자인 스팟처럼 구조화된 콘텐츠가 잘 맞습니다.',
                water: '수 기운은 흐름과 몰입을 강화해 강변/자연/문화가 이어지는 유동적 동선에서 강점을 보입니다.'
            },
            en: {
                wood: 'Wood favors growth and expansion, so parks and local-neighborhood exploration align naturally.',
                fire: 'Fire prioritizes vitality and visibility, matching night views and trend-heavy evening districts.',
                earth: 'Earth favors stability and accumulation, fitting history/family routes with reliable pacing.',
                metal: 'Metal prefers refinement and structure, resonating with museums, exhibitions, and design spaces.',
                water: 'Water strengthens flow and immersion, matching river/nature/culture blended itineraries.'
            }
        };

        const mod = (n, m) => ((n % m) + m) % m;
        const pillarText = (idx) => {
            const stemIndex = mod(idx, 10);
            const branchIndex = mod(idx, 12);
            if (isEn) return `${STEMS_EN[stemIndex]}${BRANCHES_EN[branchIndex]}`;
            return `${STEMS[stemIndex]}${BRANCHES[branchIndex]}`;
        };
        const stemElement = (idx) => ELEMENT_BY_STEM_INDEX[mod(idx, 10)];

        function calculatePillars(year, month, day, calendar) {
            const baseDate = new Date(Date.UTC(year, month - 1, day));
            const isValid = baseDate.getUTCFullYear() === year
                && baseDate.getUTCMonth() === month - 1
                && baseDate.getUTCDate() === day;
            if (!isValid) return null;

            const yearIndex = year - 1984;
            const monthIndex = yearIndex * 12 + month + (calendar === 'lunar' ? 1 : 0);
            const dayIndex = calendar === 'solar'
                ? Math.floor(baseDate.getTime() / 86400000)
                : (year * 372 + month * 31 + day + 33);
            const hourIndex = dayIndex * 12 + 6;
            return { yearIndex, monthIndex, dayIndex, hourIndex };
        }

        function getTopElements(indices) {
            const counts = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
            indices.forEach((idx) => {
                counts[stemElement(idx)] += 1;
            });
            const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
            return { sorted, counts };
        }

        function relationBetween(a, b) {
            const cycle = ['wood', 'fire', 'earth', 'metal', 'water'];
            const ai = cycle.indexOf(a);
            const bi = cycle.indexOf(b);
            if (ai < 0 || bi < 0) return 'neutral';
            if ((ai + 1) % 5 === bi) return 'generate';
            if ((ai + 2) % 5 === bi) return 'control';
            if (ai === bi) return 'same';
            return 'neutral';
        }

        function buildLongAnalysis(primary, secondary, counts, pillars, month, calendar) {
            const relation = relationBetween(primary, secondary);
            const relationText = isEn
                ? ({
                    generate: 'The primary and secondary elements form a productive generating sequence.',
                    control: 'The two key elements stand in a controlling relationship, creating disciplined tension.',
                    same: 'Primary and secondary energies are homogeneous, strengthening consistency but reducing variation.',
                    neutral: 'The two dominant energies interact in a neutral way, leaving room for situational balance.'
                }[relation])
                : ({
                    generate: '주요 오행과 보조 오행이 상생 구조를 이루어 기운이 비교적 순환적으로 작동합니다.',
                    control: '두 핵심 오행이 상극 축에 걸려 있어 긴장감은 있으나 실행력은 또렷해지는 구조입니다.',
                    same: '주요·보조 오행이 동질적으로 겹쳐 장점은 선명해지지만 변주 폭은 줄어드는 편입니다.',
                    neutral: '두 핵심 오행이 중립 관계라, 외부 환경에 따라 균형점이 달라지는 명식입니다.'
                }[relation]);

            const elementOrder = Object.entries(counts)
                .sort((a, b) => b[1] - a[1])
                .map(([el, c]) => `${isEn ? ELEMENT_LABEL.en[el] : ELEMENT_LABEL.ko[el]} ${c}`)
                .join(isEn ? ', ' : ' / ');

            if (isEn) {
                return [
                    `Reading basis: This interpretation follows practical Myeongri principles used in four-pillar reading: day-master centered view, seasonal month force, five-element balance, and generating/controlling relationships among major elements.`,
                    `Pillar structure: Year ${pillarText(pillars.yearIndex)}, Month ${pillarText(pillars.monthIndex)}, Day ${pillarText(pillars.dayIndex)}, Hour ${pillarText(pillars.hourIndex)}. The month branch indicates ${seasonByMonth.en[month]}, which strongly affects how the chart expresses energy in real-life movement and recovery rhythm.`,
                    `Element distribution: ${elementOrder}. In this chart, ${ELEMENT_LABEL.en[primary]} leads and ${ELEMENT_LABEL.en[secondary]} follows. ${relationText}`,
                    `Interpretation logic: when the dominant element supports movement style and sensory preference, travel satisfaction rises. This is why we map your element pattern to route tempo, time slot preference, and content type (nature/history/night/art/local).`,
                    `Calendar note: ${calendar === 'lunar' ? 'Lunar input is converted with a simplified model in this service, so treat this as trend-oriented guidance.' : 'Solar input is interpreted directly in this simplified model.'}`
                ];
            }

            return [
                `해석 기준: 본 결과는 사주팔자 실무에서 자주 쓰는 명리 프레임(일간 중심 해석, 월지의 계절력, 오행의 균형, 상생/상극 작용)을 간이 모델로 적용한 것입니다.`,
                `사주 구성: 년주 ${pillarText(pillars.yearIndex)}, 월주 ${pillarText(pillars.monthIndex)}, 일주 ${pillarText(pillars.dayIndex)}, 시주 ${pillarText(pillars.hourIndex)}. 특히 월지에는 ${seasonByMonth.ko[month]} 흐름이 반영되어, 실제 여행 시 체력 소모 방식과 회복 리듬에 영향을 주는 축으로 해석합니다.`,
                `오행 분포: ${elementOrder}. 본 명식은 ${ELEMENT_LABEL.ko[primary]} 기운이 주도하고 ${ELEMENT_LABEL.ko[secondary]}가 보조하는 양상입니다. ${relationText}`,
                `판단 논리: 우세 오행이 선호하는 이동 템포·공간 밀도·체험 방식과 일정이 맞으면 만족도가 높아집니다. 그래서 오행 구조를 바탕으로 자연/역사/야경/예술/로컬 축의 코스를 연결해 추천합니다.`,
                `달력 참고: ${calendar === 'lunar' ? '음력 입력은 본 서비스의 간이 변환 규칙을 사용하므로, 방향성 중심 참고값으로 보시는 것이 적절합니다.' : '양력 입력은 간이 규칙 내에서 직접 해석됩니다.'}`
            ];
        }

        function renderElementLights(counts, primaryElement) {
            if (!elementLightsEl) return;
            const order = ['wood', 'fire', 'earth', 'metal', 'water'];
            const labels = ELEMENT_LABEL[isEn ? 'en' : 'ko'];
            elementLightsEl.innerHTML = order.map((el) => {
                const score = Math.max(0, Number(counts[el] || 0));
                const dots = [0, 1, 2, 3].map((idx) => {
                    const active = idx < score ? 'is-on' : '';
                    return `<span class="saju-light-dot ${active}"></span>`;
                }).join('');
                const dominant = el === primaryElement ? 'is-dominant' : '';
                return `
                    <article class="saju-element-card ${dominant}">
                        <p class="saju-element-name">${escapeHtml(labels[el])}</p>
                        <div class="saju-light-row">${dots}</div>
                        <p class="saju-element-score">${isEn ? 'Power' : '강도'} ${score}/4</p>
                    </article>
                `;
            }).join('');
        }

        function buildTojeongTravelReading(primary, secondary, month, calendar) {
            const relation = relationBetween(primary, secondary);
            const primaryLabel = ELEMENT_LABEL[isEn ? 'en' : 'ko'][primary];
            const secondaryLabel = ELEMENT_LABEL[isEn ? 'en' : 'ko'][secondary];
            if (isEn) {
                const overallByRelation = {
                    generate: `Your main flow is constructive. ${primaryLabel} and ${secondaryLabel} reinforce each other, so travel momentum improves after the first stop.`,
                    control: `Your chart shows productive tension. ${primaryLabel} leads while ${secondaryLabel} restrains excess, giving strong execution when plans stay simple.`,
                    same: `Your energy is concentrated on one tone. This increases consistency but requires intentional variation to avoid fatigue.`,
                    neutral: `Your flow is neutral and adaptive. The day quality depends more on timing and pacing than fixed destination order.`
                };
                const cautionByElement = {
                    wood: 'Avoid over-expanding your route. Too many neighborhood jumps can dilute the experience.',
                    fire: 'Avoid stacking too many high-energy night spots. Keep one recovery block before late evening.',
                    earth: 'Avoid over-fixing your schedule. Leave one flexible slot for local discoveries.',
                    metal: 'Avoid perfection overload. Keep practical transport margins instead of optimizing every stop.',
                    water: 'Avoid drifting without anchors. Set at least two fixed core stops to stabilize the day.'
                };
                const routeByElement = {
                    wood: 'Start with open-air and local areas, then close with one structured cultural stop.',
                    fire: 'Start with trend zones and finish with skyline/night-view highlights.',
                    earth: 'Begin with history/family-friendly cores and keep transfer count low.',
                    metal: 'Pair one museum/design cluster with one curated dining district.',
                    water: 'Use river-park-cultural flow and keep transitions smooth rather than rushed.'
                };
                const timing = `Month signal: ${seasonByMonth.en[month]}. ${calendar === 'lunar' ? 'Lunar input is interpreted as directional guidance.' : 'Solar input gives a direct seasonal pacing cue.'}`;
                return {
                    overall: overallByRelation[relation] || overallByRelation.neutral,
                    timing,
                    caution: cautionByElement[primary],
                    route: routeByElement[primary]
                };
            }

            const overallByRelation = {
                generate: `총운은 상생 흐름입니다. ${primaryLabel}과 ${secondaryLabel}이 서로 힘을 보태 첫 코스 이후 운세 흐름이 점점 좋아지는 편입니다.`,
                control: `총운은 긴장 속 실행형입니다. ${primaryLabel}이 주도하고 ${secondaryLabel}이 과잉을 제어해, 단순하고 명확한 일정일수록 성과가 좋습니다.`,
                same: `총운은 단일 성향 집중형입니다. 장점은 선명하지만 리듬 변화가 부족하면 피로가 빨리 올 수 있습니다.`,
                neutral: `총운은 중립·유동형입니다. 고정 운세보다 시간대와 페이스 조절이 하루 만족도를 좌우합니다.`
            };
            const cautionByElement = {
                wood: '동선을 과도하게 넓히지 마세요. 지역을 많이 옮기면 집중도가 떨어질 수 있습니다.',
                fire: '야간 고에너지 스팟을 연달아 넣지 마세요. 늦은 시간 전 회복 구간을 1회 확보하세요.',
                earth: '일정을 너무 고정하지 마세요. 현장 변수에 대응할 유동 슬롯 1개를 남겨두세요.',
                metal: '완벽주의 과부하를 피하세요. 모든 스팟 최적화보다 이동 여유 시간을 우선 확보하세요.',
                water: '흐름만 따라가다 중심을 잃지 마세요. 핵심 앵커 스팟 2곳은 고정해 두는 것이 좋습니다.'
            };
            const routeByElement = {
                wood: '오픈형 산책/로컬 구역으로 시작하고, 마무리는 구조화된 문화 스팟으로 닫아보세요.',
                fire: '트렌드 구역으로 시동을 걸고, 마지막은 전망·야경 포인트로 정리하는 구성이 좋습니다.',
                earth: '역사/가족 친화 코스를 먼저 두고, 환승 횟수를 최소화하는 동선이 잘 맞습니다.',
                metal: '뮤지엄/디자인 클러스터 1개와 정제된 식음 구역 1개를 짝지어 구성해 보세요.',
                water: '강변-공원-문화 구간을 흐름형으로 연결하고 급한 이동보다 리듬 유지를 우선하세요.'
            };
            const timing = `시기 운: ${seasonByMonth.ko[month]} 흐름이 강조됩니다. ${calendar === 'lunar' ? '음력 입력은 방향성 참고용으로 해석됩니다.' : '양력 입력 기준으로 계절 페이스를 직접 반영합니다.'}`;
            return {
                overall: overallByRelation[relation] || overallByRelation.neutral,
                timing,
                caution: cautionByElement[primary],
                route: routeByElement[primary]
            };
        }

        function parseStartHour(bestTime) {
            const match = /^(\d{1,2})/.exec(String(bestTime || ''));
            if (!match) return 13;
            const hour = Number(match[1]);
            if (!Number.isFinite(hour)) return 13;
            return Math.max(0, Math.min(23, hour));
        }

        function geoDistanceScore(prevPlace, nextPlace) {
            if (!prevPlace?.geo || !nextPlace?.geo) return 0;
            const dx = prevPlace.geo.lat - nextPlace.geo.lat;
            const dy = prevPlace.geo.lng - nextPlace.geo.lng;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist <= 0.01) return 10;
            if (dist <= 0.02) return 7;
            if (dist <= 0.04) return 4;
            if (dist <= 0.06) return 2;
            return -2;
        }

        function geoDistanceKm(a, b) {
            if (!a?.geo || !b?.geo) return null;
            const toRad = (deg) => deg * Math.PI / 180;
            const R = 6371;
            const dLat = toRad(b.geo.lat - a.geo.lat);
            const dLng = toRad(b.geo.lng - a.geo.lng);
            const lat1 = toRad(a.geo.lat);
            const lat2 = toRad(b.geo.lat);
            const sinLat = Math.sin(dLat / 2);
            const sinLng = Math.sin(dLng / 2);
            const h = sinLat * sinLat + Math.cos(lat1) * Math.cos(lat2) * sinLng * sinLng;
            const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
            return R * c;
        }

        function estimateTransitMinutes(prevPlace, nextPlace) {
            if (!prevPlace || !nextPlace) return 0;
            const km = geoDistanceKm(prevPlace, nextPlace);
            if (km == null) return prevPlace.district === nextPlace.district ? 20 : 35;
            const speedKmh = 20;
            const transferBuffer = 10;
            const walkBuffer = 4;
            const raw = (km / speedKmh) * 60 + transferBuffer + walkBuffer;
            const adjusted = prevPlace.district === nextPlace.district ? raw - 5 : raw;
            return Math.max(10, Math.min(75, Math.round(adjusted)));
        }

        function formatDuration(minutes) {
            const total = Math.max(0, Math.round(minutes));
            const h = Math.floor(total / 60);
            const m = total % 60;
            if (isEn) return h > 0 ? `${h}h ${m}m` : `${m}m`;
            return h > 0 ? `${h}시간 ${m}분` : `${m}분`;
        }

        function buildSajuDayRoute(styles, primaryElement, secondaryElement) {
            const slotKeys = ['morning', 'lunch', 'afternoon', 'evening'];
            const slotLabels = isEn
                ? { morning: 'Morning', lunch: 'Lunch Time', afternoon: 'Afternoon', evening: 'Evening' }
                : { morning: '오전', lunch: '점심 시간', afternoon: '오후', evening: '저녁' };
            const slotTargets = { morning: 10, lunch: 12, afternoon: 15, evening: 19 };
            const primaryBiasBySlot = {
                wood: { morning: 4, lunch: 2, afternoon: 3, evening: 1 },
                fire: { morning: 1, lunch: 2, afternoon: 3, evening: 5 },
                earth: { morning: 3, lunch: 3, afternoon: 2, evening: 2 },
                metal: { morning: 2, lunch: 2, afternoon: 4, evening: 3 },
                water: { morning: 2, lunch: 2, afternoon: 3, evening: 4 }
            };

            const candidates = places
                .filter((place) => styles.some((style) => place.styles.includes(style)))
                .map((place) => {
                    const matchCount = place.styles.filter((style) => styles.includes(style)).length;
                    const primaryHit = place.styles.includes((styleMapByElement[primaryElement] || [])[0]) || place.styles.includes((styleMapByElement[primaryElement] || [])[1]);
                    const secondaryHit = place.styles.includes((styleMapByElement[secondaryElement] || [])[0]) || place.styles.includes((styleMapByElement[secondaryElement] || [])[1]);
                    return {
                        place,
                        baseScore: (matchCount * 12) + (primaryHit ? 14 : 0) + (secondaryHit ? 8 : 0) + (place.popularityScore || 0) * 0.015
                    };
                });

            const used = new Set();
            const route = [];

            slotKeys.forEach((slotKey) => {
                const targetHour = slotTargets[slotKey];
                let best = null;

                candidates.forEach((item) => {
                    if (used.has(item.place.id)) return;
                    const hour = parseStartHour(item.place.bestTime);
                    const timeScore = Math.max(-8, 12 - Math.abs(hour - targetHour) * 1.8);
                    const prev = route[route.length - 1]?.place || null;
                    const districtScore = prev ? (prev.district === item.place.district ? 9 : 0) : 0;
                    const geoScore = prev ? geoDistanceScore(prev, item.place) : 0;
                    const elementSlotBonus = (primaryBiasBySlot[primaryElement] && primaryBiasBySlot[primaryElement][slotKey]) || 0;
                    const total = item.baseScore + timeScore + districtScore + geoScore + elementSlotBonus;
                    if (!best || total > best.total) {
                        best = {
                            ...item,
                            slotKey,
                            slotLabel: slotLabels[slotKey],
                            total,
                            breakdown: {
                                baseScore: item.baseScore,
                                timeScore,
                                districtScore,
                                geoScore,
                                elementSlotBonus
                            }
                        };
                    }
                });

                if (best) {
                    used.add(best.place.id);
                    route.push(best);
                }
            });

            const backup = candidates
                .filter((item) => !used.has(item.place.id))
                .sort((a, b) => b.baseScore - a.baseScore)
                .slice(0, 2)
                .map((item, idx) => ({
                    ...item,
                    slotKey: 'backup',
                    slotLabel: isEn ? `Backup ${idx + 1}` : `예비 코스 ${idx + 1}`,
                    total: item.baseScore,
                    breakdown: {
                        baseScore: item.baseScore,
                        timeScore: 0,
                        districtScore: 0,
                        geoScore: 0,
                        elementSlotBonus: 0
                    }
                }));

            return [...route, ...backup];
        }

        function renderRecommendations(primaryElement, secondaryElement) {
            const styles = [...new Set([...(styleMapByElement[primaryElement] || []), ...(styleMapByElement[secondaryElement] || [])])];
            styleChipsEl.innerHTML = styles.map((style) => {
                const href = withCurrentLang(`course.html?style=${encodeURIComponent(style)}`);
                return `<a class="generation-chip" href="${href}">${escapeHtml(getStyleLabel(style))}</a>`;
            }).join('');

            const route = buildSajuDayRoute(styles, primaryElement, secondaryElement);
            const coreRoute = route.filter((item) => item.slotKey !== 'backup');
            const normalizeScore = (value, min, max) => {
                const ratio = (value - min) / (max - min);
                return Math.max(0, Math.min(100, Math.round(ratio * 100)));
            };
            route.forEach((item) => {
                const b = item.breakdown || {};
                const styleFit = normalizeScore(b.baseScore || 0, 20, 70);
                const timingFit = normalizeScore(b.timeScore || 0, -8, 12);
                const flowFit = normalizeScore((b.districtScore || 0) + (b.geoScore || 0), -2, 19);
                item.confidence = Math.round((styleFit * 0.5) + (timingFit * 0.25) + (flowFit * 0.25));
                item.explain = { styleFit, timingFit, flowFit };
            });
            let totalTransitMins = 0;
            const transitByIndex = new Map();
            coreRoute.forEach((item, idx) => {
                if (idx === 0) {
                    transitByIndex.set(item.place.id, 0);
                    return;
                }
                const prev = coreRoute[idx - 1].place;
                const mins = estimateTransitMinutes(prev, item.place);
                totalTransitMins += mins;
                transitByIndex.set(item.place.id, mins);
            });
            const estimatedStayMins = coreRoute.length * 95;
            const totalDayMins = estimatedStayMins + totalTransitMins;
            const confidenceAvg = coreRoute.length
                ? Math.round(coreRoute.reduce((sum, item) => sum + (item.confidence || 0), 0) / coreRoute.length)
                : 0;

            if (routePlanEl) {
                const routeIntro = isEn
                    ? `One-day route optimized by your dominant ${ELEMENT_LABEL.en[primaryElement]} pattern:`
                    : `${ELEMENT_LABEL.ko[primaryElement]} 중심 기운에 맞춰 최적화한 1일 루트:`;
                const routeSummary = isEn
                    ? `Transit estimate: about ${formatDuration(totalTransitMins)} by public transport. Total route: around ${formatDuration(totalDayMins)}.`
                    : `대중교통 이동시간 추정: 약 ${formatDuration(totalTransitMins)}. 전체 루트 소요: 약 ${formatDuration(totalDayMins)}.`;
                const trustTitle = isEn ? 'Why this route is reliable' : '이 루트가 신뢰되는 이유';
                const trustLine1 = isEn
                    ? `Overall route confidence: ${confidenceAvg}/100 (element-fit + time-fit + movement flow).`
                    : `루트 신뢰도 평균: ${confidenceAvg}/100 (오행 적합 + 시간대 적합 + 이동 흐름).`;
                const trustLine2 = isEn
                    ? `Each stop is scored by your dominant element and preferred slot timing.`
                    : `각 코스는 주요 오행과 시간대 적합도를 함께 점수화해 선정했습니다.`;
                const trustLine3 = isEn
                    ? `District continuity and geo distance are applied to reduce unnecessary transfers.`
                    : `같은 구역 연속성과 좌표 거리 점수를 반영해 불필요한 환승을 줄였습니다.`;
                routePlanEl.innerHTML = `
                    <p class="saju-route-intro">${escapeHtml(routeIntro)}</p>
                    <p class="saju-route-summary">${escapeHtml(routeSummary)}</p>
                    <div class="saju-route-evidence">
                        <p class="saju-route-evidence-title">${escapeHtml(trustTitle)}</p>
                        <ul class="review-list compact-list">
                            <li>${escapeHtml(trustLine1)}</li>
                            <li>${escapeHtml(trustLine2)}</li>
                            <li>${escapeHtml(trustLine3)}</li>
                        </ul>
                    </div>
                    <div class="saju-route-grid">
                        ${route.map((item, idx) => `
                            <article class="saju-route-card">
                                <p class="saju-route-slot">${escapeHtml(item.slotLabel)}</p>
                                <h3>${idx + 1}. ${escapeHtml(getPlaceName(item.place))}</h3>
                                <p class="saju-route-meta">${escapeHtml(getDistrictLabel(item.place.district))} · ${escapeHtml(item.place.bestTime || '')}</p>
                                <p class="saju-route-confidence">${isEn ? 'Confidence' : '신뢰도'} ${item.confidence || 0}/100 · ${isEn ? 'Element' : '오행'} ${item.explain?.styleFit || 0} · ${isEn ? 'Time' : '시간'} ${item.explain?.timingFit || 0} · ${isEn ? 'Flow' : '동선'} ${item.explain?.flowFit || 0}</p>
                                ${item.slotKey === 'backup'
                                    ? `<p class="saju-route-transit">${isEn ? 'Optional replacement stop' : '상황별 대체 코스'}</p>`
                                    : (idx === 0
                                        ? `<p class="saju-route-transit">${isEn ? 'Starting point' : '루트 시작점'}</p>`
                                        : `<p class="saju-route-transit">${isEn ? 'Move from previous: ~' : '이전 코스에서 이동: 약 '}${formatDuration(transitByIndex.get(item.place.id) || 0)}</p>`)}
                            </article>
                        `).join('')}
                    </div>
                `;
            }

            placeListEl.innerHTML = route.map((item, idx) => {
                const place = item.place;
                const href = getPlaceLink('place.html', place.id);
                const matchStyles = place.styles.filter((style) => styles.includes(style)).slice(0, 2);
                const reasonByStyle = matchStyles.map((style) => `${getStyleLabel(style)} ${isEn ? 'theme' : '테마'}`).join(isEn ? ' + ' : ' + ');
                const elementReason = styleReasonByElement[isEn ? 'en' : 'ko'][primaryElement];
                const reasonText = isEn
                    ? `${item.slotLabel}: ${place.nameEn || place.name} aligns with ${reasonByStyle || 'your element profile'}, and its ${getCategoryLabel(place.category)} character supports your ${ELEMENT_LABEL.en[primaryElement]}-driven rhythm. ${elementReason}`
                    : `${item.slotLabel}: ${getPlaceName(place)}은(는) ${reasonByStyle || '오행 성향'}과 맞물리고, ${getCategoryLabel(place.category)} 성격이 ${ELEMENT_LABEL.ko[primaryElement]} 중심 이동 리듬과 잘 맞습니다. ${elementReason}`;
                return `<li><a class="hotel-name" href="${href}">${idx + 1}. ${escapeHtml(getPlaceName(place))}</a> <span class="hotel-meta">(${escapeHtml(getDistrictLabel(place.district))} · ${escapeHtml(place.bestTime || '')})</span><p class="saju-reason">${escapeHtml(reasonText)}</p></li>`;
            }).join('');
        }

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const year = Number(yearInput.value);
            const month = Number(monthInput.value);
            const day = Number(dayInput.value);
            const calendar = calendarType.value === 'lunar' ? 'lunar' : 'solar';

            if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day) || year < 1900 || year > 2100 || month < 1 || month > 12 || day < 1 || day > 31) {
                resultNote.textContent = isEn ? 'Please enter a valid birth date.' : '유효한 생년월일을 입력해 주세요.';
                pillarsEl.innerHTML = '';
                summaryEl.textContent = '';
                analysisLongEl.innerHTML = '';
                styleChipsEl.innerHTML = '';
                if (routePlanEl) routePlanEl.innerHTML = '';
                placeListEl.innerHTML = '';
                if (fortuneOverall) fortuneOverall.textContent = '';
                if (fortuneTiming) fortuneTiming.textContent = '';
                if (fortuneCaution) fortuneCaution.textContent = '';
                if (fortuneRoute) fortuneRoute.textContent = '';
                if (elementLightsEl) elementLightsEl.innerHTML = '';
                return;
            }

            const pillars = calculatePillars(year, month, day, calendar);
            if (!pillars) {
                resultNote.textContent = isEn ? 'Invalid date. Please check month/day.' : '유효하지 않은 날짜입니다. 월/일을 확인해 주세요.';
                pillarsEl.innerHTML = '';
                summaryEl.textContent = '';
                analysisLongEl.innerHTML = '';
                styleChipsEl.innerHTML = '';
                if (routePlanEl) routePlanEl.innerHTML = '';
                placeListEl.innerHTML = '';
                if (fortuneOverall) fortuneOverall.textContent = '';
                if (fortuneTiming) fortuneTiming.textContent = '';
                if (fortuneCaution) fortuneCaution.textContent = '';
                if (fortuneRoute) fortuneRoute.textContent = '';
                if (elementLightsEl) elementLightsEl.innerHTML = '';
                return;
            }

            const labels = isEn ? ['Year Pillar', 'Month Pillar', 'Day Pillar', 'Hour Pillar(Noon Base)'] : ['년주', '월주', '일주', '시주(정오 기준)'];
            const indices = [pillars.yearIndex, pillars.monthIndex, pillars.dayIndex, pillars.hourIndex];
            pillarsEl.innerHTML = indices.map((idx, i) => `<div class="generation-chip"><strong>${labels[i]}:</strong> ${escapeHtml(pillarText(idx))}</div>`).join('');

            const elementMeta = getTopElements(indices);
            const topElements = elementMeta.sorted.map(([el]) => el);
            const primary = topElements[0];
            const secondary = topElements[1];
            const elementLabel = isEn ? ELEMENT_LABEL.en[primary] : ELEMENT_LABEL.ko[primary];
            resultNote.textContent = isEn ? `Dominant element: ${elementLabel}` : `주요 오행: ${elementLabel}`;
            summaryEl.textContent = summaryByElement[isEn ? 'en' : 'ko'][primary];
            const analysisParagraphs = buildLongAnalysis(primary, secondary, elementMeta.counts, pillars, month, calendar);
            analysisLongEl.innerHTML = analysisParagraphs.map((text) => `<p>${escapeHtml(text)}</p>`).join('');
            renderElementLights(elementMeta.counts, primary);
            const tojeongReading = buildTojeongTravelReading(primary, secondary, month, calendar);
            if (fortuneOverall) fortuneOverall.textContent = tojeongReading.overall;
            if (fortuneTiming) fortuneTiming.textContent = tojeongReading.timing;
            if (fortuneCaution) fortuneCaution.textContent = tojeongReading.caution;
            if (fortuneRoute) fortuneRoute.textContent = tojeongReading.route;
            warningEl.textContent = calendar === 'lunar'
                ? (isEn ? 'Lunar date uses simplified conversion for entertainment purposes.' : '음력 입력은 오락용 간이 변환을 사용합니다.')
                : (isEn ? 'This result is a lightweight, entertainment-oriented interpretation.' : '본 결과는 오락용 간이 해석입니다.');

            renderRecommendations(primary, secondary);
        });
    }

    function getKContentCharacterById(characterId) {
        return KCONTENT_CHARACTERS.find((entry) => entry.id === characterId) || KCONTENT_CHARACTERS[0] || null;
    }

    function getKContentCharacterIdFromQuery() {
        const params = new URLSearchParams(window.location.search);
        const charId = params.get('char');
        return getKContentCharacterById(charId)?.id || (KCONTENT_CHARACTERS[0]?.id || null);
    }

    function getKContentLocalImagePath(characterId) {
        const path = KCONTENT_LOCAL_IMAGE_MAP[characterId];
        return path ? withCurrentLang(path) : null;
    }

    const KCONTENT_WIKI_IMAGE_CACHE = new Map();
    async function getKContentWikiImagePath(entry) {
        if (!entry?.portraitPage) return null;
        const cacheKey = String(entry.portraitPage);
        if (KCONTENT_WIKI_IMAGE_CACHE.has(cacheKey)) {
            return KCONTENT_WIKI_IMAGE_CACHE.get(cacheKey);
        }
        try {
            const endpoint = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=720&titles=${encodeURIComponent(cacheKey)}&origin=*`;
            const response = await fetch(endpoint, { method: 'GET' });
            if (!response.ok) {
                KCONTENT_WIKI_IMAGE_CACHE.set(cacheKey, null);
                return null;
            }
            const json = await response.json();
            const pages = json?.query?.pages ? Object.values(json.query.pages) : [];
            const thumb = pages.find((page) => page?.thumbnail?.source)?.thumbnail?.source || null;
            KCONTENT_WIKI_IMAGE_CACHE.set(cacheKey, thumb);
            return thumb;
        } catch (_) {
            KCONTENT_WIKI_IMAGE_CACHE.set(cacheKey, null);
            return null;
        }
    }

    function renderKContentResultByCharacter(character, opts = {}) {
        const isEn = CURRENT_LANG === 'en';
        const summaryEl = opts.summaryEl;
        const chipsEl = opts.chipsEl;
        const listEl = opts.listEl;
        const foodListEl = opts.foodListEl;
        const analysisEl = opts.analysisEl;
        if (!character || !summaryEl || !chipsEl || !listEl) return;

        const workName = isEn ? character.work.en : character.work.ko;
        const typeName = isEn ? character.type.en : character.type.ko;
        const charName = isEn ? character.character.en : character.character.ko;
        const mood = isEn ? character.mood.en : character.mood.ko;
        const reason = isEn ? character.reason.en : character.reason.ko;
        const styles = [...new Set(character.styles)];
        const styleText = styles.map((style) => getStyleLabel(style)).join(isEn ? ', ' : ', ');
        summaryEl.innerHTML = isEn
            ? `<strong>${escapeHtml(charName)} (${escapeHtml(workName)}, ${escapeHtml(typeName)})</strong><br>${escapeHtml(mood)}<br><span class="data-source-note">Mood basis: ${escapeHtml(reason)} · Route axis: ${escapeHtml(styleText)}</span>`
            : `<strong>${escapeHtml(charName)} (${escapeHtml(workName)}, ${escapeHtml(typeName)})</strong><br>${escapeHtml(mood)}<br><span class="data-source-note">해석 근거: ${escapeHtml(reason)} · 추천 축: ${escapeHtml(styleText)}</span>`;

        const traitLabels = styles.map((style) => KCONTENT_TRAIT_BY_STYLE[isEn ? 'en' : 'ko'][style] || getStyleLabel(style));
        chipsEl.innerHTML = traitLabels.map((tag) => {
            return `<span class="generation-chip">${escapeHtml(tag)}</span>`;
        }).join('');

        if (analysisEl) {
            const paragraphs = isEn
                ? [
                    `${charName} is interpreted as a traveler profile that values ${styleText}. This route is designed to maintain the same emotional tempo found in the character's narrative arc.`,
                    `The first movement prioritizes place identity and atmosphere rather than checklist tourism. That is why the selected districts combine scene-making visual tone with realistic movement flow between nearby spots.`,
                    `The final movement adds contrast to avoid emotional flattening: intense sections are followed by calmer views or local streets, so the entire day feels like a coherent character-led storyline rather than disconnected stops.`
                ]
                : [
                    `${charName}은(는) ${styleText} 성향이 강한 여행자 프로필로 해석됩니다. 그래서 추천 동선은 캐릭터 서사의 감정 리듬을 실제 이동 흐름으로 옮기는 방식으로 설계했습니다.`,
                    `첫 구간은 체크리스트형 관광보다 장소의 분위기와 결을 먼저 체감하도록 구성했습니다. 선택된 지역은 장면 연출감과 실제 이동 편의가 동시에 확보되는 지점을 우선 반영했습니다.`,
                    `마지막 구간은 감정 피로를 줄이기 위해 대비를 넣었습니다. 몰입도가 높은 스팟 뒤에 안정적인 산책/로컬 구간을 붙여, 하루 전체가 끊기지 않는 '캐릭터 중심 여행 서사'로 이어지도록 맞췄습니다.`
                ];
            const relatedCharacters = KCONTENT_CHARACTERS
                .filter((entry) => entry.id !== character.id && entry.styles.some((style) => styles.includes(style)))
                .slice(0, 10);
            const relatedTitle = isEn ? 'Similar Celebrity Profiles' : '비슷한 연예인 프로필';
            const relatedHtml = relatedCharacters.length
                ? `
                    <p><strong>${escapeHtml(relatedTitle)}</strong></p>
                    <ul class="review-list compact-list">
                        ${relatedCharacters.map((entry) => {
                            const relatedName = isEn ? entry.character.en : entry.character.ko;
                            const relatedWork = isEn ? entry.work.en : entry.work.ko;
                            const href = withCurrentLang(`kcontent-result.html?char=${encodeURIComponent(entry.id)}`);
                            return `<li><a class="text-link" href="${href}">${escapeHtml(relatedName)}</a> <span class="hotel-meta">(${escapeHtml(relatedWork)})</span></li>`;
                        }).join('')}
                    </ul>
                `
                : '';
            analysisEl.innerHTML = `${paragraphs.map((text) => `<p>${escapeHtml(text)}</p>`).join('')}${relatedHtml}`;
        }

        const picked = places.filter((place) => styles.some((style) => place.styles.includes(style))).slice(0, 16);
        listEl.innerHTML = picked.map((place, idx) => {
            const href = getPlaceLink('place.html', place.id);
            const matched = place.styles.filter((style) => styles.includes(style)).slice(0, 2).map((style) => getStyleLabel(style)).join(isEn ? ' + ' : ' + ');
            const placeReason = isEn
                ? `Why this spot: ${place.nameEn || place.name} reflects ${matched || 'the selected mood'} and keeps the travel tone consistent with ${charName}'s narrative rhythm.`
                : `추천 이유: ${getPlaceName(place)}은(는) ${matched || '선택한 무드'}를 잘 반영하며, ${charName} 서사의 감정 리듬을 실제 여행 동선에 자연스럽게 연결해 줍니다.`;
            return `<li><a class="hotel-name" href="${href}">${idx + 1}. ${escapeHtml(getPlaceName(place))}</a> <span class="hotel-meta">(${escapeHtml(getDistrictLabel(place.district))})</span><p class="saju-reason">${escapeHtml(placeReason)}</p></li>`;
        }).join('');

        if (foodListEl) {
            const foodPicks = KCONTENT_FOOD_SPOTS
                .filter((food) => styles.some((style) => food.styles.includes(style)))
                .slice(0, 14);
            foodListEl.innerHTML = foodPicks.map((food, idx) => {
                const why = isEn ? food.desc.en : food.desc.ko;
                return `<li><strong>${idx + 1}. ${escapeHtml(food.name)}</strong> <span class="hotel-meta">(${escapeHtml(getDistrictLabel(food.district))})</span><p class="saju-reason">${escapeHtml(why)}</p></li>`;
            }).join('');
        }
    }

    function renderKContentPage() {
        const titleEl = document.getElementById('kcontent-title');
        const descEl = document.getElementById('kcontent-desc');
        const selectedNoteEl = document.getElementById('kcontent-selected-note');
        const gridEl = document.getElementById('kcontent-character-grid');
        const eyebrowEl = document.querySelector('body[data-page="kcontent"] .panel .eyebrow');
        if (!titleEl || !descEl || !selectedNoteEl || !gridEl) return;

        const isEn = CURRENT_LANG === 'en';
        if (eyebrowEl) eyebrowEl.textContent = isEn ? 'Screen Picks' : '스크린픽 추천';
        titleEl.textContent = isEn ? 'K-Content Character Travel Recommender' : '한국 콘텐츠 캐릭터 기반 여행 추천';
        descEl.textContent = isEn
            ? 'Choose globally popular Korean content characters by photo and open a full recommendation screen.'
            : '해외 인지도가 높은 한국 콘텐츠 캐릭터를 사진으로 고르고, 결과 화면에서 상세 추천을 확인하세요.';
        gridEl.setAttribute('aria-label', isEn ? 'Character selection' : '캐릭터 선택');
        const normalizePersonText = (text) => String(text || '')
            .toLowerCase()
            .replace(/[^a-z0-9가-힣]/g, '');
        const NON_PERSON_PORTRAIT_KEYS = new Set(['kpopdemonhunters']);
        const getPersonKey = (entry) => {
            const portrait = normalizePersonText(entry.portraitPage);
            if (portrait && !NON_PERSON_PORTRAIT_KEYS.has(portrait)) return `portrait:${portrait}`;
            const nameEn = normalizePersonText(entry.character?.en);
            const nameKo = normalizePersonText(entry.character?.ko);
            if (nameEn) return `name-en:${nameEn}`;
            if (nameKo) return `name-ko:${nameKo}`;
            return `id:${entry.id}`;
        };
        const dedupeByPerson = (rows) => {
            const seen = new Set();
            const uniqueRows = [];
            rows.forEach((entry) => {
                const key = getPersonKey(entry);
                if (seen.has(key)) return;
                seen.add(key);
                uniqueRows.push(entry);
            });
            return uniqueRows;
        };

        const trendIndexById = Object.fromEntries(KCONTENT_TREND_RANK.map((id, idx) => [id, idx]));
        const getTrendScore = (entry, idx) => {
            const rankIdx = trendIndexById[entry.id];
            const base = typeof rankIdx === 'number' ? (1000 - rankIdx * 10) : (400 - idx);
            const styleBonus = Array.isArray(entry.styles) ? entry.styles.length * 8 : 0;
            const typeText = `${entry.type?.en || ''}`.toLowerCase();
            const actorBonus = (typeText.includes('actor') || typeText.includes('actress')) ? 5 : 0;
            return base + styleBonus + actorBonus;
        };
        const shuffleRows = (rows) => {
            const shuffled = [...rows];
            for (let i = shuffled.length - 1; i > 0; i -= 1) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        };

        const renderCharacterGrid = () => {
            let rows = dedupeByPerson([...KCONTENT_CHARACTERS]);
            rows = shuffleRows(rows);
            const uniqueTotal = dedupeByPerson([...KCONTENT_CHARACTERS]).length;

            selectedNoteEl.textContent = isEn
                ? `Tap a character card to open full recommendations. ${rows.length} unique profiles shown in random order.`
                : `캐릭터 카드를 누르면 상세 추천 결과가 열립니다. 중복 제거된 ${rows.length}개 프로필을 랜덤 순서로 표시합니다.`;

            gridEl.innerHTML = rows.map((entry) => {
                const charName = isEn ? entry.character.en : entry.character.ko;
                const workName = isEn ? entry.work.en : entry.work.ko;
                const score = getTrendScore(entry, 0);
                const badge = isEn ? `Trend ${score}` : `인기지수 ${score}`;
                return `<button class="kcontent-card" type="button" data-id="${entry.id}" role="option" aria-selected="false" aria-label="${escapeHtml(charName)} - ${escapeHtml(workName)}"><span class="kcontent-card-thumb"><img src="${KCONTENT_IMAGE_FALLBACK}" alt=""></span><span class="kcontent-card-meta"><span class="kcontent-card-title">${escapeHtml(charName)}</span><span class="kcontent-card-work">${escapeHtml(workName)}</span><span class="kcontent-card-badge">${escapeHtml(badge)}</span></span></button>`;
            }).join('');

            const cards = Array.from(gridEl.querySelectorAll('.kcontent-card'));
            cards.forEach((card) => {
                card.addEventListener('click', () => {
                    const charId = card.dataset.id;
                    window.location.href = withCurrentLang(`kcontent-result.html?char=${encodeURIComponent(charId)}`);
                });
            });

            cards.forEach((card) => {
                const entry = getKContentCharacterById(card.dataset.id);
                const imgEl = card.querySelector('img');
                if (!entry || !imgEl) return;
                const src = getKContentLocalImagePath(entry.id);
                const altName = isEn ? entry.character.en : entry.character.ko;
                const altWork = isEn ? entry.work.en : entry.work.ko;
                imgEl.loading = 'lazy';
                imgEl.decoding = 'async';
                imgEl.alt = `${altName} - ${altWork}`;
                imgEl.src = src || KCONTENT_IMAGE_FALLBACK;
                imgEl.onerror = () => {
                    imgEl.src = KCONTENT_IMAGE_FALLBACK;
                    imgEl.alt = altName;
                };
                if (!src) {
                    void getKContentWikiImagePath(entry).then((wikiThumb) => {
                        if (!wikiThumb) return;
                        imgEl.src = wikiThumb;
                    }).catch(() => {
                        // Keep fallback image.
                    });
                }
            });
        };
        renderCharacterGrid();
    }

    function renderKContentResultPage() {
        const backEl = document.getElementById('kcontent-back-link');
        const pageTitleEl = document.getElementById('kcontent-result-page-title');
        const pageDescEl = document.getElementById('kcontent-result-page-desc');
        const summaryEl = document.getElementById('kcontent-result-summary');
        const chipsEl = document.getElementById('kcontent-style-chips');
        const analysisEl = document.getElementById('kcontent-why-analysis');
        const listEl = document.getElementById('kcontent-place-list');
        const foodListEl = document.getElementById('kcontent-food-list');
        const whyTitleEl = document.getElementById('kcontent-why-title');
        const spotsTitleEl = document.getElementById('kcontent-spots-title');
        const foodTitleEl = document.getElementById('kcontent-food-title');
        if (!backEl || !pageTitleEl || !pageDescEl || !summaryEl || !chipsEl || !analysisEl || !listEl || !foodListEl || !whyTitleEl || !spotsTitleEl || !foodTitleEl) return;

        const isEn = CURRENT_LANG === 'en';
        const charId = getKContentCharacterIdFromQuery();
        const character = getKContentCharacterById(charId);
        if (!character) return;

        backEl.href = withCurrentLang('kcontent.html');
        pageTitleEl.textContent = isEn ? 'Character-Based Seoul Recommendation' : '캐릭터 기반 서울 추천 결과';
        pageDescEl.textContent = isEn
            ? 'A long-form interpretation and route recommendation based on your selected character.'
            : '선택한 캐릭터의 성향을 바탕으로, 긴 설명과 함께 서울 여행 동선을 추천합니다.';
        whyTitleEl.textContent = isEn ? 'Interpretation and Route Strategy' : '해석과 이동 전략';
        spotsTitleEl.textContent = isEn ? 'Recommended Places' : '추천 여행지';
        foodTitleEl.textContent = isEn ? 'Recommended Food Spots' : '추천 맛집';

        renderKContentResultByCharacter(character, { summaryEl, chipsEl, listEl, foodListEl, analysisEl });
    }

    function initAdSenseSlots() {
        const shells = Array.from(document.querySelectorAll('.adsense-slot-shell'));
        if (!shells.length) return;

        const page = document.body.dataset.page || '';
        const params = new URLSearchParams(window.location.search);
        const slotConfig = window.GOSEOUL_ADSENSE_SLOTS && typeof window.GOSEOUL_ADSENSE_SLOTS === 'object'
            ? window.GOSEOUL_ADSENSE_SLOTS
            : {};
        const adSettings = window.GOSEOUL_ADSENSE_SETTINGS && typeof window.GOSEOUL_ADSENSE_SETTINGS === 'object'
            ? window.GOSEOUL_ADSENSE_SETTINGS
            : {};
        const rollout = adSettings.rollout && typeof adSettings.rollout === 'object' ? adSettings.rollout : null;

        function logAdSenseEvent(name, paramsObj) {
            if (typeof window.gtag !== 'function') return;
            try {
                window.gtag('event', name, Object.assign({
                    event_category: 'adsense',
                    ads_page: page,
                    non_interaction: true
                }, paramsObj || {}));
            } catch (_) {
                // Ignore analytics failures so ad rendering is not blocked.
            }
        }

        function getPageAbVariant() {
            if (!rollout || rollout.mode !== 'page_ab') return 'test';
            const forceVariant = params.get('ads_variant');
            if (forceVariant === 'control' || forceVariant === 'test') return forceVariant;
            try {
                const stored = localStorage.getItem(rollout.experimentKey || 'goseoul_ads_rollout_v1');
                if (stored === 'control' || stored === 'test') return stored;
                const ratio = Number.isFinite(Number(rollout.ratio)) ? Number(rollout.ratio) : 0.5;
                const assigned = Math.random() < ratio ? 'test' : 'control';
                localStorage.setItem(rollout.experimentKey || 'goseoul_ads_rollout_v1', assigned);
                return assigned;
            } catch (_) {
                return 'test';
            }
        }

        const abVariant = getPageAbVariant();
        const forceEnableAll = params.get('ads_force') === 'on';
        const forceDisableAll = params.get('ads_force') === 'off';
        const adTestEnabled = adSettings.adTest === true || params.get('adtest') === '1';
        const hasForcedVariant = params.get('ads_variant') === 'control' || params.get('ads_variant') === 'test';
        const adsForceMode = forceEnableAll ? 'on' : (forceDisableAll ? 'off' : 'default');

        if (rollout && rollout.mode === 'page_ab') {
            logAdSenseEvent('adsense_ab_assignment', {
                ads_exp_key: rollout.experimentKey || 'goseoul_ads_rollout_v1',
                ads_exp_mode: rollout.mode,
                ads_exp_page: rollout.page || '',
                ads_exp_slot_key: rollout.slotKey || '',
                ads_variant: abVariant,
                ads_variant_forced: hasForcedVariant,
                ads_force_mode: adsForceMode,
                ads_adtest_enabled: adTestEnabled
            });
        }

        shells.forEach((shell) => {
            const ins = shell.querySelector('.adsbygoogle');
            const slotKey = shell.getAttribute('data-adsense-slot-key') || '';
            if (!ins || !slotKey) {
                shell.classList.add('is-empty');
                logAdSenseEvent('adsense_slot_state', {
                    ads_slot_key: slotKey || 'unknown',
                    ads_state: 'missing_markup'
                });
                return;
            }

            const slotId = String(slotConfig[slotKey] || '').trim();
            if (!slotId) {
                shell.classList.add('is-empty');
                logAdSenseEvent('adsense_slot_state', {
                    ads_slot_key: slotKey,
                    ads_state: 'no_slot_id',
                    ads_adtest_enabled: adTestEnabled
                });
                return;
            }

            const isRolloutSlot = rollout && rollout.slotKey === slotKey;
            const isRolloutPage = rollout && rollout.page === page;
            const slotEnabledByRollout = !rollout
                || rollout.mode !== 'page_ab'
                || !isRolloutSlot
                || !isRolloutPage
                || forceEnableAll
                || (abVariant === 'test');

            if (forceDisableAll || !slotEnabledByRollout) {
                shell.classList.add('is-disabled');
                shell.classList.add('is-empty');
                logAdSenseEvent('adsense_slot_state', {
                    ads_slot_key: slotKey,
                    ads_state: 'disabled',
                    ads_disable_reason: forceDisableAll ? 'force_off' : 'rollout_control',
                    ads_variant: abVariant,
                    ads_adtest_enabled: adTestEnabled
                });
                return;
            }

            shell.classList.remove('is-disabled');
            ins.setAttribute('data-ad-slot', slotId);
            ins.setAttribute('data-adtest', adTestEnabled ? 'on' : 'off');
            shell.classList.remove('is-empty');
            shell.classList.add('is-live');

            if (ins.dataset.adsbygoogleStatus) {
                logAdSenseEvent('adsense_slot_state', {
                    ads_slot_key: slotKey,
                    ads_state: 'already_initialized',
                    ads_variant: abVariant,
                    ads_adtest_enabled: adTestEnabled
                });
                return;
            }
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                logAdSenseEvent('adsense_slot_state', {
                    ads_slot_key: slotKey,
                    ads_state: 'requested',
                    ads_variant: abVariant,
                    ads_adtest_enabled: adTestEnabled
                });
            } catch (_) {
                shell.classList.remove('is-live');
                shell.classList.add('is-empty');
                logAdSenseEvent('adsense_slot_state', {
                    ads_slot_key: slotKey,
                    ads_state: 'push_error',
                    ads_variant: abVariant,
                    ads_adtest_enabled: adTestEnabled
                });
            }
        });
    }

    function init() {
        initLanguage();
        initFxRateAutoSync();
        initServiceWorker();
        initThemeToggle();
        markActiveNav();
        initGlobalMobileDock();
        initPageTransition();
        initStickyOffsets();
        const page = document.body.dataset.page;
        if (page === 'home') renderHome();
        else if (page === 'entry') renderEntryPage();
        else if (page === 'place') renderPlaceDetail();
        else if (page === 'course') renderCoursePage();
        else if (page === 'generation') renderGenerationPage();
        else if (page === 'kcontent') renderKContentPage();
        else if (page === 'kcontent-result') renderKContentResultPage();
        else if (page === 'partner') renderPartnerPage();
        else if (page === 'saju') renderSajuPage();
        initAdSenseSlots();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
