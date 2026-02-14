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
    let CURRENT_LANG = 'ko';
    const DISTRICT_LABELS_EN = {
        '종로구': 'Jongno-gu',
        '중구': 'Jung-gu',
        '용산구': 'Yongsan-gu',
        '마포구': 'Mapo-gu',
        '성동구': 'Seongdong-gu',
        '광진구': 'Gwangjin-gu',
        '강동구': 'Gangdong-gu',
        '강남구': 'Gangnam-gu',
        '서초구': 'Seocho-gu',
        '송파구': 'Songpa-gu',
        '영등포구': 'Yeongdeungpo-gu',
        '동작구': 'Dongjak-gu',
        '강서구': 'Gangseo-gu',
        '성북구': 'Seongbuk-gu',
        '동대문구': 'Dongdaemun-gu',
        '강북구': 'Gangbuk-gu',
        '노원구': 'Nowon-gu',
        '관악구': 'Gwanak-gu'
    };
    const CATEGORY_LABELS_EN = {
        '역사/문화': 'History/Culture',
        '쇼핑/트렌드': 'Shopping/Trends',
        '야경/전망': 'Night View',
        '자연/산책': 'Nature/Walk',
        '가족/테마': 'Family/Theme',
        '예술/뮤지엄': 'Art/Museum',
        '로컬/시장': 'Local/Market'
    };
    const PLACE_NAME_EN = {
        '경복궁': 'Gyeongbokgung Palace',
        '창덕궁': 'Changdeokgung Palace',
        '창경궁': 'Changgyeonggung Palace',
        '덕수궁': 'Deoksugung Palace',
        '종묘': 'Jongmyo Shrine',
        '북촌한옥마을': 'Bukchon Hanok Village',
        '인사동': 'Insadong',
        '익선동 한옥거리': 'Ikseon-dong Hanok Street',
        '삼청동길': 'Samcheong-dong Street',
        '서촌': 'Seochon Village',
        '광화문광장': 'Gwanghwamun Square',
        '청계천': 'Cheonggyecheon Stream',
        'N서울타워': 'N Seoul Tower',
        '남산공원': 'Namsan Park',
        '명동거리': 'Myeongdong Street',
        '동대문디자인플라자(DDP)': 'Dongdaemun Design Plaza (DDP)',
        '동대문시장': 'Dongdaemun Market',
        '광장시장': 'Gwangjang Market',
        '남대문시장': 'Namdaemun Market',
        '서울로7017': 'Seoullo 7017',
        '이태원': 'Itaewon',
        '한남동': 'Hannam-dong',
        '리움미술관': 'Leeum Museum of Art',
        '국립중앙박물관': 'National Museum of Korea',
        '국립한글박물관': 'National Hangeul Museum',
        '전쟁기념관': 'War Memorial of Korea',
        '용산아이파크몰': 'Yongsan I\'Park Mall',
        '노들섬': 'Nodeul Island',
        '한강진 카페거리': 'Hangangjin Cafe Street',
        '남산골한옥마을': 'Namsangol Hanok Village',
        '홍대거리': 'Hongdae Street',
        '연남동': 'Yeonnam-dong',
        '합정': 'Hapjeong',
        '망원시장': 'Mangwon Market',
        '경의선숲길': 'Gyeongui Line Forest Park',
        '월드컵공원': 'World Cup Park',
        '하늘공원': 'Haneul Park',
        '디지털미디어시티(DMC)': 'Digital Media City (DMC)',
        '상암문화광장': 'Sangam Culture Plaza',
        '문화비축기지': 'Oil Tank Culture Park',
        '성수동 카페거리': 'Seongsu Cafe Street',
        '서울숲': 'Seoul Forest',
        '뚝섬한강공원': 'Ttukseom Hangang Park',
        '어린이대공원': 'Children\'s Grand Park',
        '아차산': 'Achasan Mountain',
        '건대 커먼그라운드': 'Konkuk Univ. Common Ground',
        '광진교 8번가': 'Gwangjin Bridge 8th Avenue',
        '성수연방': 'Seongsu Yeonbang',
        '서울숲 갤러리아포레 산책로': 'Seoul Forest Galleria Foret Walkway',
        '성수동 수제화거리': 'Seongsu Handmade Shoe Street',
        '코엑스': 'COEX',
        '별마당도서관': 'Starfield Library',
        '봉은사': 'Bongeunsa Temple',
        '가로수길': 'Garosu-gil',
        '압구정로데오': 'Apgujeong Rodeo Street',
        '청담동 명품거리': 'Cheongdam Luxury Street',
        '선릉과정릉': 'Seolleung and Jeongneung Royal Tombs',
        '양재천': 'Yangjaecheon Stream',
        '예술의전당': 'Seoul Arts Center',
        '강남역': 'Gangnam Station',
        '롯데월드타워 서울스카이': 'Lotte World Tower Seoul Sky',
        '롯데월드 어드벤처': 'Lotte World Adventure',
        '석촌호수': 'Seokchon Lake',
        '올림픽공원': 'Olympic Park',
        '잠실한강공원': 'Jamsil Hangang Park',
        '잠실종합운동장': 'Jamsil Sports Complex',
        '잠실새내 먹자골목': 'Jamsilsaenae Food Street',
        '문정동 로데오거리': 'Munjeong Rodeo Street',
        '가든파이브': 'Garden5',
        '풍납토성': 'Pungnap Earthen Fortress',
        '반포한강공원': 'Banpo Hangang Park',
        '세빛섬': 'Sebitseom',
        '반포대교 달빛무지개분수': 'Banpo Bridge Moonlight Rainbow Fountain',
        '잠수교': 'Jamsu Bridge',
        '서래마을': 'Seorae Village',
        '양재시민의숲': 'Yangjae Citizens\' Forest',
        '예술의전당 한가람미술관': 'Hangaram Art Museum',
        '국립국악원': 'National Gugak Center',
        '고속터미널 지하상가': 'Express Bus Terminal Underground Mall',
        '한강대교 전망쉼터': 'Hangang Bridge Observatory Rest Area',
        '여의도한강공원': 'Yeouido Hangang Park',
        '여의도공원': 'Yeouido Park',
        '더현대서울': 'The Hyundai Seoul',
        'IFC몰': 'IFC Mall',
        '63스퀘어': '63 Square',
        '여의도 샛강생태공원': 'Yeouido Saetgang Ecological Park',
        '문래창작촌': 'Mullae Art Village',
        '타임스퀘어 영등포': 'Times Square Yeongdeungpo',
        '노량진수산시장': 'Noryangjin Fish Market',
        '보라매공원': 'Boramae Park',
        '서울식물원': 'Seoul Botanic Park',
        '선유도공원': 'Seonyudo Park',
        '서울시립미술관': 'Seoul Museum of Art',
        '서울공예박물관': 'Seoul Museum of Craft Art',
        '국립현대미술관 서울관': 'MMCA Seoul',
        '서울역사박물관': 'Seoul Museum of History',
        '서울도서관': 'Seoul Metropolitan Library',
        '서울광장': 'Seoul Plaza',
        '세종문화회관': 'Sejong Center for the Performing Arts',
        '덕수궁 돌담길': 'Deoksugung Stone Wall Road',
        '정동길': 'Jeongdong-gil',
        '청와대': 'Cheong Wa Dae (Blue House)',
        '북악산 한양도성길': 'Bugaksan Hanyangdoseong Trail',
        '남산 한양도성길': 'Namsan Hanyangdoseong Trail',
        '낙산공원': 'Naksan Park',
        '이화벽화마을': 'Ihwa Mural Village',
        '대학로': 'Daehangno',
        '혜화': 'Hyehwa',
        '성균관 명륜당': 'Sungkyunkwan Myeongnyundang Hall',
        '길상사': 'Gilsangsa Temple',
        '경희궁': 'Gyeonghuigung Palace',
        '국립민속박물관': 'National Folk Museum of Korea',
        '북악스카이웨이 팔각정': 'Bugak Skyway Pavilion',
        '서울성곽박물관': 'Seoul City Wall Museum',
        '보신각': 'Bosingak Belfry',
        '청운문학도서관': 'Cheongun Literature Library',
        '서울한방진흥센터': 'Seoul K-Medi Center',
        '서울풍물시장': 'Seoul Folk Flea Market',
        '응봉산 야경포인트': 'Eungbongsan Night View Point',
        '서울함공원': 'Seoul Battleship Park',
        '북서울꿈의숲': 'Dream Forest',
        '경춘선숲길': 'Gyeongchun Line Forest Trail',
        '화랑대 철도공원': 'Hwarangdae Railway Park',
        '낙성대공원': 'Nakseongdae Park',
        '암사동선사유적지': 'Amsa-dong Prehistoric Site',
        '몽촌토성': 'Mongchontoseong Fortress',
        '서울책보고': 'Seoul Book Repository',
        '잠실롯데월드몰': 'Jamsil Lotte World Mall',
        '서울아차산성': 'Achasanseong Fortress',
        '이촌한강공원': 'Ichon Hangang Park'
    };

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
        { name: '길상사', district: '성북구', category: '역사/문화', bestTime: '10:00-16:00', styles: ['history', 'nature'] },
        { name: '경희궁', district: '종로구', category: '역사/문화', bestTime: '10:00-16:00', styles: ['history', 'nature'] },
        { name: '국립민속박물관', district: '종로구', category: '예술/뮤지엄', bestTime: '10:00-17:00', styles: ['history', 'art', 'family'] },
        { name: '북악스카이웨이 팔각정', district: '종로구', category: '야경/전망', bestTime: '18:00-22:00', styles: ['night', 'nature'] },
        { name: '서울성곽박물관', district: '종로구', category: '예술/뮤지엄', bestTime: '10:00-17:00', styles: ['history', 'art'] },
        { name: '보신각', district: '종로구', category: '역사/문화', bestTime: '17:00-21:00', styles: ['history', 'night'] },
        { name: '청운문학도서관', district: '종로구', category: '예술/뮤지엄', bestTime: '11:00-18:00', styles: ['art', 'nature'] },
        { name: '서울한방진흥센터', district: '동대문구', category: '예술/뮤지엄', bestTime: '10:00-17:00', styles: ['history', 'art'] },
        { name: '서울풍물시장', district: '동대문구', category: '로컬/시장', bestTime: '11:00-19:00', styles: ['local', 'shopping'] },
        { name: '응봉산 야경포인트', district: '성동구', category: '야경/전망', bestTime: '18:00-22:00', styles: ['night', 'nature'] },
        { name: '서울함공원', district: '마포구', category: '가족/테마', bestTime: '14:00-19:00', styles: ['family', 'night'] },
        { name: '북서울꿈의숲', district: '강북구', category: '자연/산책', bestTime: '16:00-20:00', styles: ['nature', 'family', 'night'] },
        { name: '경춘선숲길', district: '노원구', category: '자연/산책', bestTime: '15:00-19:00', styles: ['nature', 'local'] },
        { name: '화랑대 철도공원', district: '노원구', category: '가족/테마', bestTime: '12:00-18:00', styles: ['family', 'history'] },
        { name: '낙성대공원', district: '관악구', category: '역사/문화', bestTime: '10:00-16:00', styles: ['history', 'nature'] },
        { name: '암사동선사유적지', district: '강동구', category: '역사/문화', bestTime: '10:00-16:00', styles: ['history', 'family'] },
        { name: '몽촌토성', district: '송파구', category: '역사/문화', bestTime: '10:00-17:00', styles: ['history', 'nature'] },
        { name: '서울책보고', district: '송파구', category: '예술/뮤지엄', bestTime: '12:00-19:00', styles: ['art', 'local'] },
        { name: '잠실롯데월드몰', district: '송파구', category: '쇼핑/트렌드', bestTime: '12:00-21:00', styles: ['shopping', 'family'] },
        { name: '서울아차산성', district: '광진구', category: '역사/문화', bestTime: '09:00-14:00', styles: ['history', 'nature'] },
        { name: '이촌한강공원', district: '용산구', category: '자연/산책', bestTime: '17:00-21:00', styles: ['nature', 'night'] }
    ];

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
        if (navLinks[2]) navLinks[2].textContent = 'By Generation';
        if (navLinks[3]) navLinks[3].textContent = 'Partner';
        if (navLinks[4]) navLinks[4].textContent = 'Comments';

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
            if (journeyTitle) journeyTitle.textContent = 'Quick Move';
            const styleTitle = document.getElementById('course-style-title');
            if (styleTitle) styleTitle.textContent = 'Choose Course Style';
            document.querySelectorAll('.style-tab-btn').forEach((btn) => {
                const styleKey = btn.dataset.style;
                if (styleKey) btn.textContent = getStyleLabel(styleKey);
            });
            const panels = document.querySelectorAll('.panel h2');
            if (panels[1]) panels[1].textContent = 'Top 5 Hotels (Google Rating)';
            if (panels[2]) panels[2].textContent = 'District Restaurant Picks (Breakfast/Lunch/Dinner/Drinks)';
            if (panels[3]) panels[3].textContent = 'How to Use This Course';
            const routeLink = document.getElementById('course-route-link');
            if (routeLink) routeLink.textContent = 'Open Walking Route in Google Maps';
            const journeyLinks = document.querySelectorAll('.journey-step-link');
            if (journeyLinks[0]) journeyLinks[0].textContent = '1. View Route';
            if (journeyLinks[1]) journeyLinks[1].textContent = '2. Choose Hotel';
            if (journeyLinks[2]) journeyLinks[2].textContent = '3. Choose Restaurants';
            const guideParagraphs = document.querySelectorAll('.panel p');
            if (guideParagraphs[guideParagraphs.length - 2]) {
                guideParagraphs[guideParagraphs.length - 2].textContent = 'This route is optimized for walkable movement with optional short subway transfers. A typical flow is history/culture in the morning, cafe or shopping in the afternoon, and night views or local dining in the evening.';
            }
            if (guideParagraphs[guideParagraphs.length - 1]) {
                guideParagraphs[guideParagraphs.length - 1].textContent = 'Hotel and restaurant recommendations are prioritized by Google ratings and review counts, with broadcast curation shown as a secondary reference. Check map links for latest opening hours and reservations.';
            }
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
        if (page === 'generation') {
            const heroTitle = document.getElementById('generation-hero-title');
            const heroDesc = document.getElementById('generation-hero-desc');
            const panelTitle = document.getElementById('generation-panel-title');
            if (heroTitle) heroTitle.textContent = 'Seoul Courses by Age Group';
            if (heroDesc) heroDesc.textContent = 'Choose by travel pace and group profile, then jump directly to the matching course.';
            if (panelTitle) panelTitle.textContent = 'Recommended Scenarios by Generation';
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
        const generationLink = document.getElementById('generation-link');
        const partnerLink = document.getElementById('partner-link');
        const commentsLink = document.getElementById('comments-link');
        const place = placeMap[id];
        if (courseLink && place) {
            courseLink.href = withCurrentLang(`course.html?style=${encodeURIComponent(place.styles[0])}`);
        }
        if (generationLink) generationLink.href = withCurrentLang('generation.html');
        if (partnerLink) partnerLink.href = getPlaceLink('partner.html', id);
        if (commentsLink) commentsLink.href = getPlaceLink('comments.html', id);
    }

    function markActiveNav() {
        const page = document.body.dataset.page;
        const links = document.querySelectorAll('.top-nav a');
        links.forEach((link) => link.classList.remove('active'));
        if (page === 'home' || page === 'place') links[0]?.classList.add('active');
        if (page === 'course') links[1]?.classList.add('active');
        if (page === 'generation') links[2]?.classList.add('active');
        if (page === 'partner') links[3]?.classList.add('active');
        if (page === 'comments') links[4]?.classList.add('active');
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
        rateNoteEl.textContent = isEn
            ? 'Reference-only estimate. Final card/cash amount may differ due to fees.'
            : '참고용 계산값이며 결제 시점 환율/수수료와 다를 수 있습니다.';
        krwInput.placeholder = isEn ? 'e.g. 50,000' : '예: 50000';
        usdInput.placeholder = isEn ? 'e.g. 36' : '예: 36';

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
            const rate = parseNumber(rateInput.value);
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
            const rate = parseNumber(rateInput.value);
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
        rateInput.oninput = () => {
            if (document.activeElement === usdInput) syncFromUsd();
            else syncFromKrw();
        };
        krwInput.onblur = () => normalizeField(krwInput, 0);
        usdInput.onblur = () => normalizeField(usdInput, 2);
        rateInput.onblur = () => normalizeField(rateInput, 2);

        if (!krwInput.value.trim() && !usdInput.value.trim()) {
            krwInput.value = '50000';
        }
        syncFromKrw();
        normalizeField(krwInput, 0);
        normalizeField(rateInput, 2);
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
        const response = await fetch(`/api/place-details?query=${encodeURIComponent(place.mapQuery)}&lang=${encodeURIComponent(lang || 'ko')}`);
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

    function updatePlaceStructuredData(place, details) {
        const langParam = CURRENT_LANG === 'en' ? '&lang=en' : '';
        const canonicalUrl = `${window.location.origin}${window.location.pathname}?id=${encodeURIComponent(place.id)}${langParam}`;
        const canonicalEl = document.getElementById('canonical-link');
        const altKoEl = document.getElementById('alternate-ko-link');
        const altEnEl = document.getElementById('alternate-en-link');
        if (canonicalEl) canonicalEl.href = canonicalUrl;
        if (altKoEl) altKoEl.href = `${window.location.origin}${window.location.pathname}?id=${encodeURIComponent(place.id)}`;
        if (altEnEl) altEnEl.href = `${window.location.origin}${window.location.pathname}?id=${encodeURIComponent(place.id)}&lang=en`;

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

        const breadcrumbData = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Seoul Explorer',
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
            touristType: place.styles.map((style) => getStyleLabel(style)),
            address: {
                '@type': 'PostalAddress',
                addressLocality: getDistrictLabel(place.district),
                addressRegion: 'Seoul',
                addressCountry: 'KR',
                streetAddress: addressText
            },
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: Number(ratingValue.toFixed ? ratingValue.toFixed(1) : ratingValue),
                reviewCount: Number(reviewCount)
            },
            hasMap: mapUrl,
            sameAs: mapUrl
        };

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
        const reviewList = document.getElementById('review-list');
        const dataSourceEl = document.getElementById('place-data-source');

        document.title = `${getPlaceName(place)} | Seoul Explorer`;
        nameEl.textContent = getPlaceName(place);
        categoryEl.textContent = getCategoryLabel(place.category);
        descEl.textContent = CURRENT_LANG === 'en' ? place.descriptionEn : place.description;
        rankEl.textContent = `TOP ${place.rank}`;
        districtEl.textContent = getDistrictLabel(place.district);
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
        updatePlaceStructuredData(place, null);

        try {
            const details = await fetchLivePlaceDetails(place, CURRENT_LANG === 'en' ? 'en' : 'ko');
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

        function getMapSearchUrl(queryText) {
            return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(queryText)}`;
        }

        function toUsdCeilFromKrwText(priceText) {
            if (!priceText) return '-';
            const numeric = Number(String(priceText).replace(/[^\d]/g, ''));
            if (!Number.isFinite(numeric) || numeric <= 0) return '-';
            const usd = Math.ceil(numeric / 1400);
            return `about $${usd.toLocaleString()}`;
        }

        function displayPrice(priceText) {
            if (CURRENT_LANG !== 'en') return priceText || '-';
            return toUsdCeilFromKrwText(priceText);
        }

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
                        <span class=\"hotel-meta\">${CURRENT_LANG === 'en' ? 'Rating' : '평점'} ${hotel.rating || '-'} / ${CURRENT_LANG === 'en' ? 'Reviews' : '리뷰'} ${hotel.userRatingCount?.toLocaleString?.() || '-'} / ${CURRENT_LANG === 'en' ? 'Avg price' : '평균가격'} ${displayPrice(hotel.averagePrice)}</span><br>
                        <span class=\"hotel-meta\">${safeHotelAddress}${mapAnchor}</span>
                    `;
                    hotelListEl.appendChild(li);
                });
                hotelSourceEl.textContent = CURRENT_LANG === 'en'
                    ? 'Hotels: Top 5 based on Google Places rating'
                    : '숙소 데이터: Google Places 평점 기준 상위 5개';
            } catch (error) {
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
                        <span class=\"hotel-meta\">${CURRENT_LANG === 'en' ? 'Rating' : '평점'} ${hotel.rating} / ${CURRENT_LANG === 'en' ? 'Reviews' : '리뷰'} ${hotel.reviewCount} / ${CURRENT_LANG === 'en' ? 'Avg price' : '평균가격'} ${displayPrice(hotel.averagePrice)}</span><br>
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
                        return `<li><a class=\"hotel-name\" href=\"${mapHref}\" target=\"_blank\" rel=\"noopener noreferrer\">${idx + 1}. ${safeRestaurantName}</a>${broadcastTag}<br><span class=\"hotel-meta\">${CURRENT_LANG === 'en' ? 'Rating' : '평점'} ${r.rating || '-'} / ${CURRENT_LANG === 'en' ? 'Reviews' : '리뷰'} ${(r.userRatingCount || 0).toLocaleString()} / ${CURRENT_LANG === 'en' ? 'Avg price' : '평균가격'} ${displayPrice(r.averagePrice || '-')}</span><br><span class=\"hotel-meta\">${safeRestaurantAddress}${mapLink}</span></li>`;
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

        selectedName.textContent = getPlaceName(place);
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
        selectedName.textContent = getPlaceName(place);

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
        initStickyOffsets();
        const page = document.body.dataset.page;
        if (page === 'home') renderHome();
        else if (page === 'place') renderPlaceDetail();
        else if (page === 'course') renderCoursePage();
        else if (page === 'generation') renderGenerationPage();
        else if (page === 'partner') renderPartnerPage();
        else if (page === 'comments') renderCommentsPage();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
