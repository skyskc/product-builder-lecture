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
    const KCONTENT_CHARACTERS = [
        {
            id: 'gi-hun',
            work: { ko: '오징어 게임', en: 'Squid Game' },
            type: { ko: '드라마', en: 'Drama' },
            character: { ko: '성기훈', en: 'Seong Gi-hun' },
            portraitPage: 'Lee_Jung-jae',
            styles: ['local', 'history'],
            mood: {
                ko: '감정선이 큰 폭으로 흔들리지만 결국 사람 사이의 온도로 회복되는 타입',
                en: 'A profile that swings emotionally yet regains balance through human warmth.'
            },
            reason: {
                ko: '극한 상황에서도 사람을 포기하지 않는 결이 강해, 오래된 골목과 생활권 중심 동선에서 몰입이 깊어집니다.',
                en: 'Because his arc never fully abandons people even under pressure, lived-in districts and old streets feel most immersive.'
            }
        },
        {
            id: 'sae-byeok',
            work: { ko: '오징어 게임', en: 'Squid Game' },
            type: { ko: '드라마', en: 'Drama' },
            character: { ko: '강새벽', en: 'Kang Sae-byeok' },
            portraitPage: 'HoYeon_Jung',
            styles: ['night', 'local'],
            mood: {
                ko: '과묵한 경계심과 빠른 상황 판단으로 도시의 이면을 읽는 타입',
                en: 'A guarded, fast-reading profile that navigates the hidden layers of the city.'
            },
            reason: {
                ko: '절제된 감정과 생존형 시선이 강해, 야간 무드와 로컬 마켓이 섞인 코스가 설득력 있습니다.',
                en: 'With restrained emotion and survival instinct, mixed night scenes and local-market routes fit best.'
            }
        },
        {
            id: 'front-man',
            work: { ko: '오징어 게임', en: 'Squid Game' },
            type: { ko: '드라마', en: 'Drama' },
            character: { ko: '프론트맨', en: 'Front Man' },
            portraitPage: 'Lee_Byung-hun',
            styles: ['night', 'art'],
            mood: {
                ko: '통제와 긴장, 미장센 중심의 구조적 공간을 선호하는 타입',
                en: 'A profile drawn to control, tension, and composition-driven spaces.'
            },
            reason: {
                ko: '질서와 연출을 중시하는 성향이라 전망/야경과 건축 미학이 또렷한 장소에서 만족도가 높습니다.',
                en: 'His control-oriented stance matches view-heavy night spots and architecturally strong venues.'
            }
        },
        {
            id: 'yoon-se-ri',
            work: { ko: '사랑의 불시착', en: 'Crash Landing on You' },
            type: { ko: '드라마', en: 'Drama' },
            character: { ko: '윤세리', en: 'Yoon Se-ri' },
            portraitPage: 'Son_Ye-jin',
            styles: ['shopping', 'art'],
            mood: {
                ko: '세련된 감각과 실행력이 결합되어 트렌드와 품격을 함께 보는 타입',
                en: 'A refined and decisive profile balancing trend awareness with elegance.'
            },
            reason: {
                ko: '브랜드 감도와 디테일 취향이 강해, 쇼핑 중심지와 디자인 스팟이 결합된 동선이 잘 맞습니다.',
                en: 'Her brand sensitivity and detail focus align with routes combining shopping cores and design spaces.'
            }
        },
        {
            id: 'ri-jeong-hyeok',
            work: { ko: '사랑의 불시착', en: 'Crash Landing on You' },
            type: { ko: '드라마', en: 'Drama' },
            character: { ko: '리정혁', en: 'Ri Jeong-hyeok' },
            portraitPage: 'Hyun_Bin',
            styles: ['nature', 'history'],
            mood: {
                ko: '절제된 태도와 책임감으로 조용한 서사를 쌓는 타입',
                en: 'A restrained and dutiful profile that builds quiet narrative momentum.'
            },
            reason: {
                ko: '감정 표현은 절제되어도 깊이가 큰 캐릭터라, 고궁/강변처럼 정적인 장소에서 강점이 살아납니다.',
                en: 'Though emotionally restrained, his depth resonates in serene routes such as palaces and riverside walks.'
            }
        },
        {
            id: 'kim-shin',
            work: { ko: '도깨비', en: 'Guardian: The Lonely and Great God' },
            type: { ko: '드라마', en: 'Drama' },
            character: { ko: '김신', en: 'Kim Shin' },
            portraitPage: 'Gong_Yoo',
            styles: ['history', 'night'],
            mood: {
                ko: '시간의 축적과 운명 서사를 동시에 품는 타입',
                en: 'A profile that carries both accumulated time and destiny-driven narrative.'
            },
            reason: {
                ko: '장기적 서사에 강한 캐릭터라, 역사 공간과 야간 풍경의 대비가 큰 코스에서 해석이 선명해집니다.',
                en: 'His long-arc narrative shines on routes contrasting heritage sites with cinematic night views.'
            }
        },
        {
            id: 'woo-young-woo',
            work: { ko: '이상한 변호사 우영우', en: 'Extraordinary Attorney Woo' },
            type: { ko: '드라마', en: 'Drama' },
            character: { ko: '우영우', en: 'Woo Young-woo' },
            portraitPage: 'Park_Eun-bin',
            styles: ['art', 'nature'],
            mood: {
                ko: '관찰력과 몰입력이 높아 정교한 디테일을 천천히 즐기는 타입',
                en: 'A highly observant profile that enjoys detail through focused, slower immersion.'
            },
            reason: {
                ko: '세밀한 인지 방식이 강해 전시/뮤지엄과 산책형 동선을 조합할 때 여행 만족이 높습니다.',
                en: 'Her detail-first cognition works especially well with museum-plus-walk combinations.'
            }
        },
        {
            id: 'moon-dong-eun',
            work: { ko: '더 글로리', en: 'The Glory' },
            type: { ko: '드라마', en: 'Drama' },
            character: { ko: '문동은', en: 'Moon Dong-eun' },
            portraitPage: 'Song_Hye-kyo',
            styles: ['art', 'history'],
            mood: {
                ko: '차갑게 정돈된 계획성과 서사적 축적을 중시하는 타입',
                en: 'A controlled profile centered on precision and narrative accumulation.'
            },
            reason: {
                ko: '장면의 맥락과 구조를 읽는 힘이 강해, 역사-전시형 코스에서 해석 일관성이 높습니다.',
                en: 'Her strength in reading structural context makes history-and-exhibition routes especially coherent.'
            }
        },
        {
            id: 'park-sae-ro-yi',
            work: { ko: '이태원 클라쓰', en: 'Itaewon Class' },
            type: { ko: '드라마', en: 'Drama' },
            character: { ko: '박새로이', en: 'Park Sae-ro-yi' },
            portraitPage: 'Park_Seo-joon',
            styles: ['local', 'shopping'],
            mood: {
                ko: '직진형 추진력과 관계 기반 성장 서사를 동시에 가진 타입',
                en: 'A direct, momentum-driven profile with strong relationship-based growth.'
            },
            reason: {
                ko: '현장 실행력이 강해 로컬 상권과 트렌드 지역을 빠르게 순환하는 동선이 잘 맞습니다.',
                en: 'His operational drive matches fast loops through local business streets and trend districts.'
            }
        },
        {
            id: 'vincenzo',
            work: { ko: '빈센조', en: 'Vincenzo' },
            type: { ko: '드라마', en: 'Drama' },
            character: { ko: '빈센조 카사노', en: 'Vincenzo Cassano' },
            portraitPage: 'Song_Joong-ki',
            styles: ['night', 'art'],
            mood: {
                ko: '냉정한 계산과 스타일리시한 연출을 결합하는 타입',
                en: 'A profile blending cool calculation with stylish staging.'
            },
            reason: {
                ko: '극적인 연출 감각이 커서, 야경과 디자인 밀도가 높은 공간에서 캐릭터 톤이 자연스럽게 이어집니다.',
                en: 'His dramatic style aligns with night-view and design-dense destinations.'
            }
        },
        {
            id: 'yoon-ji-woo',
            work: { ko: '마이 네임', en: 'My Name' },
            type: { ko: '드라마', en: 'Drama' },
            character: { ko: '윤지우', en: 'Yoon Ji-woo' },
            portraitPage: 'Han_So-hee',
            styles: ['night', 'nature'],
            mood: {
                ko: '강한 의지와 긴장 지속력이 높아 몰입형 야간 동선에 강한 타입',
                en: 'A strong-willed profile with sustained focus for high-immersion night routes.'
            },
            reason: {
                ko: '감정 압력이 큰 캐릭터라 야간 포인트 후 자연 공간에서 완급을 조절하는 구성이 효과적입니다.',
                en: 'Given her high emotional pressure, pairing intense night spots with calming nature breaks works best.'
            }
        },
        {
            id: 'cha-hyun-su',
            work: { ko: '스위트홈', en: 'Sweet Home' },
            type: { ko: '드라마', en: 'Drama' },
            character: { ko: '차현수', en: 'Cha Hyun-su' },
            portraitPage: 'Song_Kang',
            styles: ['night', 'local'],
            mood: {
                ko: '불안과 회복을 오가며 자극과 안정의 균형을 찾는 타입',
                en: 'A profile oscillating between anxiety and recovery, seeking balance between stimulus and calm.'
            },
            reason: {
                ko: '긴장-완화 리듬이 중요한 캐릭터라, 야간 명소와 생활권 코스를 함께 배치하면 체감이 좋습니다.',
                en: 'Because rhythm matters here, a mix of night landmarks and neighborhood routes is effective.'
            }
        },
        {
            id: 'lee-chang',
            work: { ko: '킹덤', en: 'Kingdom' },
            type: { ko: '드라마', en: 'Drama' },
            character: { ko: '이창', en: 'Crown Prince Lee Chang' },
            portraitPage: 'Ju_Ji-hoon',
            styles: ['history', 'nature'],
            mood: {
                ko: '책임감과 위기 대응이 중심인 리더형 타입',
                en: 'A leadership profile centered on duty and crisis response.'
            },
            reason: {
                ko: '시대극 기반 리더 서사라 궁궐과 자연 지형을 함께 도는 흐름이 가장 설득력 있습니다.',
                en: 'As a period-lead archetype, routes combining palaces and natural terrain feel most authentic.'
            }
        },
        {
            id: 'jang-tae-sang',
            work: { ko: '경성크리처', en: 'Gyeongseong Creature' },
            type: { ko: '드라마', en: 'Drama' },
            character: { ko: '장태상', en: 'Jang Tae-sang' },
            portraitPage: 'Park_Seo-joon',
            styles: ['history', 'local'],
            mood: {
                ko: '시대 전환기의 생존 감각과 인간적 관계성을 함께 보는 타입',
                en: 'A profile balancing survival instincts and relational nuance in transitional eras.'
            },
            reason: {
                ko: '역사적 밀도와 현실 동선이 함께 살아야 해석이 완성되어, 로컬+역사 조합이 적합합니다.',
                en: 'This character reads best when historical density and practical movement coexist.'
            }
        },
        {
            id: 'seok-woo',
            work: { ko: '부산행', en: 'Train to Busan' },
            type: { ko: '영화', en: 'Film' },
            character: { ko: '서석우', en: 'Seok-woo' },
            portraitPage: 'Gong_Yoo',
            styles: ['family', 'night'],
            mood: {
                ko: '방어적 현실주의에서 책임 중심 태도로 전환되는 타입',
                en: 'A profile shifting from defensive realism to responsibility-first action.'
            },
            reason: {
                ko: '보호 본능이 강화되는 서사라, 가족/테마 동선에 야간 포인트를 가볍게 섞는 구성이 좋습니다.',
                en: 'His protective arc pairs well with family-themed routes plus selective night highlights.'
            }
        },
        {
            id: 'kim-ki-taek',
            work: { ko: '기생충', en: 'Parasite' },
            type: { ko: '영화', en: 'Film' },
            character: { ko: '김기택', en: 'Kim Ki-taek' },
            portraitPage: 'Song_Kang-ho',
            styles: ['local', 'history'],
            mood: {
                ko: '계층 감각과 생활 밀착형 현실 인지가 강한 타입',
                en: 'A profile with strong class-awareness and grounded daily-life perception.'
            },
            reason: {
                ko: '도시의 층위를 읽는 힘이 큰 캐릭터라, 로컬 생활권과 역사 맥락을 함께 보는 코스가 어울립니다.',
                en: 'His urban-layer awareness fits routes that connect local neighborhoods and historical context.'
            }
        },
        {
            id: 'kim-bong-seok',
            work: { ko: '무빙', en: 'Moving' },
            type: { ko: '드라마', en: 'Drama' },
            character: { ko: '김봉석', en: 'Kim Bong-seok' },
            portraitPage: 'Lee_Jung-ha',
            styles: ['family', 'nature'],
            mood: {
                ko: '유쾌함과 보호 본능이 함께 있어 밝은 회복형 이동에 강한 타입',
                en: 'A cheerful recovery-oriented profile with strong protective instincts.'
            },
            reason: {
                ko: '일상성과 특별함을 동시에 다루는 캐릭터라, 공원 산책과 가족형 스팟 조합이 잘 맞습니다.',
                en: 'Because his arc bridges ordinary life and special power, parks plus family spots work naturally.'
            }
        },
        {
            id: 'jang-hui-soo',
            work: { ko: '무빙', en: 'Moving' },
            type: { ko: '드라마', en: 'Drama' },
            character: { ko: '장희수', en: 'Jang Hui-soo' },
            portraitPage: 'Go_Youn-jung',
            styles: ['shopping', 'nature'],
            mood: {
                ko: '도전 의식과 회복 탄력이 커서 다양한 분위기 전환을 즐기는 타입',
                en: 'A resilient profile that enjoys shifts between energetic and calm atmospheres.'
            },
            reason: {
                ko: '활동성과 감정 회복 속도가 빠른 캐릭터라, 트렌드 지역과 산책 코스를 함께 묶는 게 좋습니다.',
                en: 'Her high resilience supports itineraries that pair trend districts with restorative walks.'
            }
        },
        {
            id: 'rumi',
            work: { ko: '케이팝 데몬 헌터스', en: 'KPop Demon Hunters' },
            type: { ko: '애니메이션', en: 'Animation' },
            character: { ko: '루미', en: 'Rumi' },
            portraitPage: 'KPop_Demon_Hunters',
            styles: ['night', 'art'],
            mood: {
                ko: '무대 에너지와 전투 집중력을 동시에 끌어올리는 몰입형 타입',
                en: 'An immersion-driven profile that blends stage energy with battle focus.'
            },
            reason: {
                ko: '강한 퍼포먼스 감각이 핵심이라 야경 포인트와 시각 밀도 높은 공간을 묶는 동선이 잘 맞습니다.',
                en: 'Her performance-centric tone matches itineraries that combine night landmarks with visually dense spaces.'
            }
        },
        {
            id: 'mira',
            work: { ko: '케이팝 데몬 헌터스', en: 'KPop Demon Hunters' },
            type: { ko: '애니메이션', en: 'Animation' },
            character: { ko: '미라', en: 'Mira' },
            portraitPage: 'KPop_Demon_Hunters',
            styles: ['shopping', 'night'],
            mood: {
                ko: '강렬한 스타일링과 속도감 있는 전개를 선호하는 타입',
                en: 'A profile that prefers bold styling and fast-paced progression.'
            },
            reason: {
                ko: '캐릭터 톤이 선명하고 카리스마가 강해 트렌드 상권과 야간 동선을 결합할 때 시너지가 큽니다.',
                en: 'Her vivid charisma works best when trend districts are paired with night-oriented routes.'
            }
        },
        {
            id: 'zoey',
            work: { ko: '케이팝 데몬 헌터스', en: 'KPop Demon Hunters' },
            type: { ko: '애니메이션', en: 'Animation' },
            character: { ko: '조이', en: 'Zoey' },
            portraitPage: 'KPop_Demon_Hunters',
            styles: ['local', 'shopping'],
            mood: {
                ko: '리듬감과 즉흥성이 좋아 활기 있는 거리에서 에너지가 오르는 타입',
                en: 'A rhythmic, spontaneous profile energized by lively city streets.'
            },
            reason: {
                ko: '민첩한 반응과 스트리트 감성이 강해 로컬 동선과 쇼핑 구간을 함께 두는 편이 효율적입니다.',
                en: 'Her quick, street-driven vibe is best matched by combining local neighborhoods with shopping segments.'
            }
        },
        {
            id: 'jinu',
            work: { ko: '케이팝 데몬 헌터스', en: 'KPop Demon Hunters' },
            type: { ko: '애니메이션', en: 'Animation' },
            character: { ko: '지누', en: 'Jinu' },
            portraitPage: 'KPop_Demon_Hunters',
            styles: ['night', 'history'],
            mood: {
                ko: '어두운 서사와 압도적 존재감을 중심으로 몰입하는 타입',
                en: 'A profile immersed in dark narrative weight and commanding presence.'
            },
            reason: {
                ko: '긴장감 있는 분위기와 상징성이 중요해 야간 포인트와 역사 공간의 대비가 특히 잘 맞습니다.',
                en: 'His symbolic intensity pairs especially well with contrast between historical sites and night views.'
            }
        },
        {
            id: 'glenn-rhee',
            work: { ko: '워킹 데드', en: 'The Walking Dead' },
            type: { ko: '드라마', en: 'Drama' },
            character: { ko: '글렌 리', en: 'Glenn Rhee' },
            portraitPage: 'Glenn_Rhee',
            styles: ['local', 'family'],
            mood: {
                ko: '현장 대응력과 인간적 유대를 함께 챙기는 생존형 타입',
                en: 'A survival-oriented profile balancing field adaptability with human bonds.'
            },
            reason: {
                ko: '민첩한 판단과 동료 중심 성향이 뚜렷해 로컬 동선에 안정적인 휴식 포인트를 섞는 구성이 좋습니다.',
                en: 'His fast judgment and team-first nature fit routes mixing local movement with steady rest stops.'
            }
        },
        {
            id: 'jungkook',
            work: { ko: '방탄소년단 (BTS)', en: 'BTS' },
            type: { ko: '아이돌 멤버', en: 'Idol Member' },
            character: { ko: '정국', en: 'Jungkook' },
            portraitPage: 'Jungkook',
            styles: ['shopping', 'night'],
            mood: {
                ko: '고집중 퍼포먼스와 완성도 집착이 강한 하이텐션 타입',
                en: 'A high-intensity profile focused on performance precision and completion quality.'
            },
            reason: {
                ko: '디테일 감각과 실행력이 뛰어나 트렌드 스팟과 야간 무드를 빠르게 이어 붙이는 동선이 잘 맞습니다.',
                en: 'His detail focus and execution speed fit routes linking trend spots with energetic night scenes.'
            }
        },
        {
            id: 'rm',
            work: { ko: '방탄소년단 (BTS)', en: 'BTS' },
            type: { ko: '아이돌 멤버', en: 'Idol Member' },
            character: { ko: 'RM', en: 'RM' },
            portraitPage: 'RM_(musician)',
            styles: ['art', 'history'],
            mood: {
                ko: '사유형 콘텐츠와 맥락 있는 공간에서 영감을 받는 분석형 타입',
                en: 'An analytical profile inspired by thoughtful content and context-rich spaces.'
            },
            reason: {
                ko: '텍스트·전시·도시 서사를 연결해 읽는 성향이 강해 뮤지엄/역사형 동선에서 몰입이 올라갑니다.',
                en: 'His tendency to connect text, exhibitions, and urban narratives aligns with museum/history routes.'
            }
        },
        {
            id: 'jennie',
            work: { ko: '블랙핑크 (BLACKPINK)', en: 'BLACKPINK' },
            type: { ko: '아이돌 멤버', en: 'Idol Member' },
            character: { ko: '제니', en: 'Jennie' },
            portraitPage: 'Jennie_(singer)',
            styles: ['shopping', 'art'],
            mood: {
                ko: '스타일 밀도와 브랜드 감도를 중심으로 선택하는 큐레이션형 타입',
                en: 'A curation-driven profile centered on style density and brand sensitivity.'
            },
            reason: {
                ko: '비주얼 완성도와 공간 무드의 균형을 중시해 쇼핑/디자인 동선의 효율이 좋습니다.',
                en: 'She values visual completeness and mood balance, making shopping/design routes highly efficient.'
            }
        },
        {
            id: 'jisoo',
            work: { ko: '블랙핑크 (BLACKPINK)', en: 'BLACKPINK' },
            type: { ko: '아이돌 멤버', en: 'Idol Member' },
            character: { ko: '지수', en: 'Jisoo' },
            portraitPage: 'Jisoo',
            styles: ['art', 'nature'],
            mood: {
                ko: '차분한 고급감과 안정된 페이스를 선호하는 밸런스형 타입',
                en: 'A balanced profile preferring calm sophistication and steady pacing.'
            },
            reason: {
                ko: '과하지 않은 동선에서 집중력이 살아나 전시/산책형 조합과 궁합이 좋습니다.',
                en: 'Her focus rises in non-overloaded routes, matching exhibition-and-walk combinations.'
            }
        },
        {
            id: 'karina',
            work: { ko: '에스파 (aespa)', en: 'aespa' },
            type: { ko: '아이돌 멤버', en: 'Idol Member' },
            character: { ko: '카리나', en: 'Karina' },
            portraitPage: 'Karina_(South_Korean_singer)',
            styles: ['night', 'shopping'],
            mood: {
                ko: '선명한 콘셉트와 미래지향 무드를 선호하는 비주얼 중심 타입',
                en: 'A visual-first profile drawn to sharp concepts and futuristic mood.'
            },
            reason: {
                ko: '컨셉 몰입이 강해 야간 조명 포인트와 트렌드 상권을 결합한 구성이 어울립니다.',
                en: 'Her concept immersion aligns with routes combining lit night points and trend districts.'
            }
        },
        {
            id: 'ma-dong-seok',
            work: { ko: '부산행 / 범죄도시', en: 'Train to Busan / The Roundup' },
            type: { ko: '영화배우', en: 'Film Actor' },
            character: { ko: '마동석', en: 'Ma Dong-seok' },
            portraitPage: 'Ma_Dong-seok',
            styles: ['local', 'family'],
            mood: {
                ko: '직선적 에너지와 보호 본능이 강한 액션형 타입',
                en: 'An action-oriented profile with direct energy and strong protective instinct.'
            },
            reason: {
                ko: '현장감 있는 로컬 이동과 확실한 식사/휴식 포인트를 함께 두는 편이 만족도가 높습니다.',
                en: 'He fits itineraries that combine grounded local movement with clear meal/rest anchors.'
            }
        },
        {
            id: 'kim-tae-ri',
            work: { ko: '아가씨 / 2521', en: 'The Handmaiden / Twenty-Five Twenty-One' },
            type: { ko: '영화배우', en: 'Film Actor' },
            character: { ko: '김태리', en: 'Kim Tae-ri' },
            portraitPage: 'Kim_Tae-ri',
            styles: ['art', 'history'],
            mood: {
                ko: '서사 밀도와 감정 결을 섬세하게 따라가는 타입',
                en: 'A profile that follows narrative density and emotional texture with precision.'
            },
            reason: {
                ko: '장면의 미장센과 맥락을 중요하게 보는 성향이라 역사/전시형 동선이 설득력 있습니다.',
                en: 'Her mise-en-scene sensitivity makes history/exhibition routes feel coherent and compelling.'
            }
        },
        {
            id: 'bae-doona',
            work: { ko: '괴물 / 센스8', en: 'The Host / Sense8' },
            type: { ko: '영화배우', en: 'Film Actor' },
            character: { ko: '배두나', en: 'Bae Doona' },
            portraitPage: 'Bae_Doona',
            styles: ['night', 'art'],
            mood: {
                ko: '실험적 분위기와 독립적 무드를 선호하는 도시형 타입',
                en: 'An urban profile favoring experimental atmosphere and independent mood.'
            },
            reason: {
                ko: '비정형 공간과 야간 톤에서 감도가 올라가 예술/야경 결합 코스가 잘 맞습니다.',
                en: 'She resonates with irregular spaces and night tone, fitting art-plus-night routes.'
            }
        },
        {
            id: 'choi-min-sik',
            work: { ko: '올드보이 / 신세계', en: 'Oldboy / New World' },
            type: { ko: '영화배우', en: 'Film Actor' },
            character: { ko: '최민식', en: 'Choi Min-sik' },
            portraitPage: 'Choi_Min-sik',
            styles: ['history', 'local'],
            mood: {
                ko: '강한 서사 압력과 현실 밀도를 중시하는 묵직한 타입',
                en: 'A weighty profile prioritizing narrative pressure and grounded realism.'
            },
            reason: {
                ko: '도시의 시간감과 거리의 결을 체감하는 로컬/역사 동선에서 몰입이 극대화됩니다.',
                en: 'Immersion peaks in local-and-history routes that carry urban time depth and street texture.'
            }
        },
        {
            id: 'g-dragon',
            work: { ko: '빅뱅 (BIGBANG)', en: 'BIGBANG' },
            type: { ko: '아이돌 멤버', en: 'Idol Member' },
            character: { ko: '지드래곤', en: 'G-Dragon' },
            portraitPage: 'G-Dragon',
            styles: ['shopping', 'art'],
            mood: {
                ko: '강한 콘셉트 주도력과 스타일 큐레이션이 핵심인 트렌드형 타입',
                en: 'A trend-led profile driven by concept control and style curation.'
            },
            reason: {
                ko: '패션/공간 감도를 동시에 보는 성향이라 디자인 밀도 높은 쇼핑 동선과 궁합이 좋습니다.',
                en: 'His fashion-space sensitivity matches high-design shopping itineraries.'
            }
        },
        {
            id: 'taeyeon',
            work: { ko: '소녀시대 (Girls’ Generation)', en: 'Girls’ Generation' },
            type: { ko: '아이돌 멤버', en: 'Idol Member' },
            character: { ko: '태연', en: 'Taeyeon' },
            portraitPage: 'Taeyeon',
            styles: ['art', 'nature'],
            mood: {
                ko: '섬세한 감정선과 안정된 호흡을 선호하는 감성형 타입',
                en: 'An emotional profile preferring delicate expression and steady tempo.'
            },
            reason: {
                ko: '자극보다 분위기와 여운을 중시해 전시+산책 결합 코스가 잘 맞습니다.',
                en: 'She values mood and aftertaste over speed, fitting exhibition-plus-walk routes.'
            }
        },
        {
            id: 'iu',
            work: { ko: '솔로 아티스트 (IU)', en: 'Solo Artist (IU)' },
            type: { ko: '아이돌 멤버', en: 'Idol Member' },
            character: { ko: '아이유', en: 'IU' },
            portraitPage: 'IU_(singer)',
            styles: ['history', 'art'],
            mood: {
                ko: '스토리텔링과 정서적 디테일을 깊게 소비하는 서사형 타입',
                en: 'A narrative profile that deeply absorbs storytelling and emotional detail.'
            },
            reason: {
                ko: '장소의 맥락과 감정 톤을 함께 체감할 때 만족도가 높아 역사/예술 축이 어울립니다.',
                en: 'She resonates with context and emotion together, aligning with history/art routes.'
            }
        },
        {
            id: 'suga',
            work: { ko: '방탄소년단 (BTS)', en: 'BTS' },
            type: { ko: '아이돌 멤버', en: 'Idol Member' },
            character: { ko: '슈가', en: 'Suga' },
            portraitPage: 'Suga',
            styles: ['local', 'art'],
            mood: {
                ko: '현실 기반 감각과 창작 몰입을 동시에 추구하는 제작형 타입',
                en: 'A production-oriented profile balancing realism and creative immersion.'
            },
            reason: {
                ko: '생활권 로컬성과 작업형 공간 분위기를 함께 갖춘 동선이 잘 맞습니다.',
                en: 'He fits routes that combine everyday local texture with creation-focused spaces.'
            }
        },
        {
            id: 'jimin',
            work: { ko: '방탄소년단 (BTS)', en: 'BTS' },
            type: { ko: '아이돌 멤버', en: 'Idol Member' },
            character: { ko: '지민', en: 'Jimin' },
            portraitPage: 'Jimin',
            styles: ['night', 'art'],
            mood: {
                ko: '표현력과 퍼포먼스 감도를 크게 살리는 무드형 타입',
                en: 'A mood-centric profile amplifying expressive performance sensitivity.'
            },
            reason: {
                ko: '조명/동선/분위기 대비가 큰 야간-예술 코스에서 몰입이 극대화됩니다.',
                en: 'Immersion peaks in night-and-art routes with strong lighting and mood contrast.'
            }
        },
        {
            id: 'v-bts',
            work: { ko: '방탄소년단 (BTS)', en: 'BTS' },
            type: { ko: '아이돌 멤버', en: 'Idol Member' },
            character: { ko: '뷔', en: 'V' },
            portraitPage: 'V_(singer)',
            styles: ['art', 'local'],
            mood: {
                ko: '빈티지 질감과 감각적 연출을 선호하는 큐레이션형 타입',
                en: 'A curation profile drawn to vintage texture and sensory staging.'
            },
            reason: {
                ko: '레트로 감성과 로컬 결을 함께 보는 시선이 강해 예술/로컬 조합이 적합합니다.',
                en: 'His retro-local gaze is best served by art-plus-local combinations.'
            }
        },
        {
            id: 'cha-eun-woo',
            work: { ko: '아스트로 (ASTRO)', en: 'ASTRO' },
            type: { ko: '아이돌 멤버', en: 'Idol Member' },
            character: { ko: '차은우', en: 'Cha Eun-woo' },
            portraitPage: 'Cha_Eun-woo',
            styles: ['shopping', 'family'],
            mood: {
                ko: '정돈된 이미지와 안정적 동선을 선호하는 밸런스형 타입',
                en: 'A balanced profile preferring polished image and stable movement.'
            },
            reason: {
                ko: '과하지 않은 트렌드 체험과 편안한 휴식 구간을 함께 두면 만족도가 높습니다.',
                en: 'Satisfaction rises with moderate trend stops paired with comfortable rests.'
            }
        },
        {
            id: 'wonyoung',
            work: { ko: '아이브 (IVE)', en: 'IVE' },
            type: { ko: '아이돌 멤버', en: 'Idol Member' },
            character: { ko: '장원영', en: 'Jang Won-young' },
            portraitPage: 'Jang_Won-young',
            styles: ['shopping', 'art'],
            mood: {
                ko: '비주얼 완성도와 트렌드 소비가 빠른 하이브리드 타입',
                en: 'A hybrid profile with high visual standards and rapid trend adoption.'
            },
            reason: {
                ko: '감도 높은 쇼핑 스팟과 포토제닉 전시 공간을 함께 묶는 구성이 효과적입니다.',
                en: 'Pairing trend shopping with photogenic exhibitions works especially well.'
            }
        },
        {
            id: 'nayeon',
            work: { ko: '트와이스 (TWICE)', en: 'TWICE' },
            type: { ko: '아이돌 멤버', en: 'Idol Member' },
            character: { ko: '나연', en: 'Nayeon' },
            portraitPage: 'Nayeon',
            styles: ['shopping', 'nature'],
            mood: {
                ko: '밝은 에너지와 경쾌한 이동을 선호하는 라이트형 타입',
                en: 'A light, upbeat profile favoring bright energy and lively movement.'
            },
            reason: {
                ko: '과도한 밀도보다 리듬감 있는 쇼핑+산책 루프가 잘 맞습니다.',
                en: 'She fits rhythmic shopping-and-walk loops over overloaded schedules.'
            }
        },
        {
            id: 'taemin',
            work: { ko: '샤이니 (SHINee)', en: 'SHINee' },
            type: { ko: '아이돌 멤버', en: 'Idol Member' },
            character: { ko: '태민', en: 'Taemin' },
            portraitPage: 'Taemin',
            styles: ['night', 'art'],
            mood: {
                ko: '강한 무대 미학과 실험적 표현을 즐기는 몰입형 타입',
                en: 'An immersive profile enjoying stage aesthetics and experimental expression.'
            },
            reason: {
                ko: '야간 감도와 퍼포먼스형 공간 연출이 중요한 코스에서 강점이 살아납니다.',
                en: 'His strengths emerge in routes emphasizing night tone and performative spaces.'
            }
        },
        {
            id: 'seulgi',
            work: { ko: '레드벨벳 (Red Velvet)', en: 'Red Velvet' },
            type: { ko: '아이돌 멤버', en: 'Idol Member' },
            character: { ko: '슬기', en: 'Seulgi' },
            portraitPage: 'Seulgi',
            styles: ['art', 'shopping'],
            mood: {
                ko: '세련된 콘셉트와 디테일 실행을 함께 가져가는 타입',
                en: 'A profile combining refined concept sense with detailed execution.'
            },
            reason: {
                ko: '아트 공간과 트렌드 지역을 균형 있게 순환하는 동선이 가장 효율적입니다.',
                en: 'Balanced circulation between art spaces and trend districts is most effective.'
            }
        },
        {
            id: 'hanni',
            work: { ko: '뉴진스 (NewJeans)', en: 'NewJeans' },
            type: { ko: '아이돌 멤버', en: 'Idol Member' },
            character: { ko: '하니', en: 'Hanni' },
            portraitPage: 'Hanni_(singer)',
            styles: ['local', 'shopping'],
            mood: {
                ko: '가벼운 리듬과 스트리트 감각을 즐기는 실전형 타입',
                en: 'A practical profile that enjoys light rhythm and street sensibility.'
            },
            reason: {
                ko: '로컬 거리 체험과 트렌드 숍 탐색을 짧게 이어가는 루트가 잘 맞습니다.',
                en: 'Short loops between local street experiences and trend shops suit her best.'
            }
        },
        {
            id: 'psy',
            work: { ko: 'K-POP 퍼포먼스 아이콘', en: 'K-Pop Performance Icon' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '싸이', en: 'Psy' },
            portraitPage: 'Psy',
            styles: ['night', 'local'],
            mood: {
                ko: '강한 무대 에너지와 대중 친화성이 큰 페스티벌형 타입',
                en: 'A festival-driven profile with explosive stage energy and mass appeal.'
            },
            reason: {
                ko: '현장 분위기와 리듬이 중요한 성향이라 야간/로컬 밀집 구간에서 만족도가 높습니다.',
                en: 'He thrives where live energy and rhythm matter, especially in night and local hubs.'
            }
        },
        {
            id: 'boa',
            work: { ko: 'K-POP 레전드 솔로', en: 'K-Pop Legend Solo' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '보아', en: 'BoA' },
            portraitPage: 'BoA',
            styles: ['art', 'shopping'],
            mood: {
                ko: '완성도 높은 퍼포먼스와 세련된 취향을 중시하는 타입',
                en: 'A profile centered on polished performance and refined taste.'
            },
            reason: {
                ko: '디자인/트렌드 밀도가 높은 동선에서 캐릭터 감도가 잘 살아납니다.',
                en: 'Her profile resonates in design-forward and trend-dense routes.'
            }
        },
        {
            id: 'rain',
            work: { ko: '월드 스타 솔로', en: 'Global Star Solo' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '비', en: 'Rain' },
            portraitPage: 'Rain_(entertainer)',
            styles: ['night', 'shopping'],
            mood: {
                ko: '강한 카리스마와 무대 중심 리듬을 선호하는 타입',
                en: 'A charismatic profile favoring stage-led rhythm and momentum.'
            },
            reason: {
                ko: '야간 무드와 트렌드 이동을 짧고 강하게 연결할 때 효율이 높습니다.',
                en: 'Short, high-impact transitions between night mood and trend spots work best.'
            }
        },
        {
            id: 'lee-min-ho',
            work: { ko: '한류 드라마 스타', en: 'Hallyu Drama Star' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '이민호', en: 'Lee Min-ho' },
            portraitPage: 'Lee_Min-ho',
            styles: ['shopping', 'family'],
            mood: {
                ko: '클래식한 스타 무드와 안정 동선을 선호하는 타입',
                en: 'A profile preferring classic star mood and stable movement flow.'
            },
            reason: {
                ko: '과하지 않은 럭셔리/휴식 균형 코스에서 만족도가 높습니다.',
                en: 'He fits balanced routes with moderate luxury and comfortable pacing.'
            }
        },
        {
            id: 'kim-soo-hyun',
            work: { ko: '한류 배우', en: 'Hallyu Actor' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '김수현', en: 'Kim Soo-hyun' },
            portraitPage: 'Kim_Soo-hyun',
            styles: ['history', 'art'],
            mood: {
                ko: '정교한 감정선과 서사 중심 경험을 선호하는 타입',
                en: 'A profile that prefers precise emotional tone and narrative-centric experiences.'
            },
            reason: {
                ko: '맥락 있는 역사/전시 구간에서 감정 몰입도가 올라갑니다.',
                en: 'Context-rich history and exhibition stops enhance immersion for this profile.'
            }
        },
        {
            id: 'lee-dong-wook',
            work: { ko: '드라마 배우', en: 'Drama Actor' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '이동욱', en: 'Lee Dong-wook' },
            portraitPage: 'Lee_Dong-wook',
            styles: ['night', 'art'],
            mood: {
                ko: '도시적이고 세련된 야간 무드를 선호하는 타입',
                en: 'An urban profile drawn to refined night atmosphere.'
            },
            reason: {
                ko: '야경/예술 결합 코스에서 감성 톤이 가장 자연스럽게 이어집니다.',
                en: 'Night-view and art combined routes best match his atmospheric tone.'
            }
        },
        {
            id: 'bae-suzy',
            work: { ko: '가수·배우', en: 'Singer-Actress' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '배수지', en: 'Bae Suzy' },
            portraitPage: 'Bae_Suzy',
            styles: ['nature', 'shopping'],
            mood: {
                ko: '부드러운 무드와 트렌드 체험의 균형을 선호하는 타입',
                en: 'A profile balancing soft mood with trend exploration.'
            },
            reason: {
                ko: '산책/카페와 트렌드 지역을 함께 묶을 때 만족이 큽니다.',
                en: 'Satisfaction increases when walk-cafe flow is paired with trend districts.'
            }
        },
        {
            id: 'park-bo-gum',
            work: { ko: '드라마 배우', en: 'Drama Actor' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '박보검', en: 'Park Bo-gum' },
            portraitPage: 'Park_Bo-gum',
            styles: ['family', 'history'],
            mood: {
                ko: '따뜻한 이미지와 안정적 페이스를 선호하는 타입',
                en: 'A warm profile preferring stable, reassuring pace.'
            },
            reason: {
                ko: '고궁/공원처럼 편안하고 정돈된 동선과 잘 맞습니다.',
                en: 'He aligns well with calm, structured routes like palaces and parks.'
            }
        },
        {
            id: 'hyuna',
            work: { ko: '퍼포먼스 솔로', en: 'Performance Solo' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '현아', en: 'Hyuna' },
            portraitPage: 'HyunA',
            styles: ['night', 'shopping'],
            mood: {
                ko: '대담한 스타일과 강한 개성을 선호하는 타입',
                en: 'A profile that prefers bold style and strong individuality.'
            },
            reason: {
                ko: '야간 포인트와 트렌드 쇼핑 구간이 결합된 동선이 가장 잘 맞습니다.',
                en: 'Routes combining night hotspots and trend shopping fit best.'
            }
        },
        {
            id: 'wonho',
            work: { ko: '퍼포먼스 아티스트', en: 'Performance Artist' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '원호', en: 'Wonho' },
            portraitPage: 'Wonho',
            styles: ['night', 'family'],
            mood: {
                ko: '강한 에너지와 팬 친화성을 모두 갖춘 타입',
                en: 'A profile combining high energy with fan-friendly warmth.'
            },
            reason: {
                ko: '활동량 있는 야간 코스 뒤 안정 휴식 구간을 붙이면 만족도가 높습니다.',
                en: 'Best results come from active night routes followed by stable recovery stops.'
            }
        },
        {
            id: 'taeyang',
            work: { ko: '빅뱅 (BIGBANG)', en: 'BIGBANG' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '태양', en: 'Taeyang' },
            portraitPage: 'Taeyang',
            styles: ['night', 'art'],
            mood: {
                ko: '무대 몰입과 감성 표현을 동시에 중시하는 타입',
                en: 'A profile valuing both stage immersion and emotional expression.'
            },
            reason: {
                ko: '야경과 예술 공간의 대비가 큰 코스에서 체감이 좋습니다.',
                en: 'High-contrast routes between night views and art spaces feel most fitting.'
            }
        },
        {
            id: 'gong-hyo-jin',
            work: { ko: '드라마 배우', en: 'Drama Actress' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '공효진', en: 'Gong Hyo-jin' },
            portraitPage: 'Gong_Hyo-jin',
            styles: ['nature', 'local'],
            mood: {
                ko: '자연스러운 리듬과 생활 밀착 무드를 선호하는 타입',
                en: 'A profile favoring natural rhythm and lived-in local mood.'
            },
            reason: {
                ko: '산책형 코스와 로컬 거리 탐색을 함께 두는 구성과 잘 맞습니다.',
                en: 'She matches itineraries combining walkable routes with local street exploration.'
            }
        },
        {
            id: 'jun-ji-hyun',
            work: { ko: '한류 배우', en: 'Hallyu Actress' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '전지현', en: 'Jun Ji-hyun' },
            portraitPage: 'Jun_Ji-hyun',
            styles: ['shopping', 'night'],
            mood: {
                ko: '세련된 도시 무드와 스타 감도를 선호하는 타입',
                en: 'A profile preferring polished urban mood and star-level style.'
            },
            reason: {
                ko: '트렌드/야경을 결합한 고밀도 코스에서 만족도가 높습니다.',
                en: 'High-density routes combining trend districts and night views fit her profile.'
            }
        },
        {
            id: 'lee-jong-suk',
            work: { ko: '드라마 배우', en: 'Drama Actor' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '이종석', en: 'Lee Jong-suk' },
            portraitPage: 'Lee_Jong-suk',
            styles: ['art', 'history'],
            mood: {
                ko: '감정 서사와 분위기 중심 경험을 선호하는 타입',
                en: 'A profile that prefers emotional narrative and atmosphere-driven experiences.'
            },
            reason: {
                ko: '전시/역사 축에서 여유 있게 이동하는 코스가 가장 잘 맞습니다.',
                en: 'Slower-paced routes built around art and history suit this profile best.'
            }
        },
        {
            id: 'song-hye-kyo',
            work: { ko: '한류 배우', en: 'Hallyu Actress' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '송혜교', en: 'Song Hye-kyo' },
            portraitPage: 'Song_Hye-kyo',
            styles: ['art', 'nature'],
            mood: {
                ko: '절제된 감성과 고급스러운 무드를 선호하는 타입',
                en: 'A profile preferring restrained emotion and premium atmosphere.'
            },
            reason: {
                ko: '조용한 산책과 전시 중심 코스를 섞으면 만족도가 높습니다.',
                en: 'Satisfaction rises when quiet walks are paired with gallery-led stops.'
            }
        },
        {
            id: 'song-kang',
            work: { ko: '드라마 배우', en: 'Drama Actor' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '송강', en: 'Song Kang' },
            portraitPage: 'Song_Kang',
            styles: ['night', 'shopping'],
            mood: {
                ko: '도시적 무드와 트렌드 포인트를 빠르게 소비하는 타입',
                en: 'An urban profile that quickly consumes trend-driven night points.'
            },
            reason: {
                ko: '야간 감성과 트렌드 지역을 짧게 순환하는 루프가 잘 맞습니다.',
                en: 'Short loops between trend districts and night mood stops fit best.'
            }
        },
        {
            id: 'kim-yoo-jung',
            work: { ko: '드라마 배우', en: 'Drama Actress' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '김유정', en: 'Kim Yoo-jung' },
            portraitPage: 'Kim_Yoo-jung',
            styles: ['history', 'family'],
            mood: {
                ko: '밝고 안정적인 동선을 선호하는 클래식형 타입',
                en: 'A classic profile preferring bright and stable movement flow.'
            },
            reason: {
                ko: '고궁과 공원 중심의 편안한 코스에서 체감이 좋습니다.',
                en: 'Comfort-focused routes around palaces and parks feel most natural.'
            }
        },
        {
            id: 'kim-seon-ho',
            work: { ko: '드라마 배우', en: 'Drama Actor' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '김선호', en: 'Kim Seon-ho' },
            portraitPage: 'Kim_Seon-ho',
            styles: ['local', 'nature'],
            mood: {
                ko: '친근한 로컬 무드와 느긋한 리듬을 선호하는 타입',
                en: 'A profile favoring friendly local mood and relaxed pacing.'
            },
            reason: {
                ko: '로컬 거리와 산책형 코스를 이어갈 때 만족도가 높습니다.',
                en: 'Combining local streets with gentle walking routes works very well.'
            }
        },
        {
            id: 'han-so-hee',
            work: { ko: '드라마 배우', en: 'Drama Actress' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '한소희', en: 'Han So-hee' },
            portraitPage: 'Han_So-hee',
            styles: ['night', 'art'],
            mood: {
                ko: '강렬한 분위기와 시각적 임팩트를 선호하는 타입',
                en: 'A profile drawn to intense atmosphere and visual impact.'
            },
            reason: {
                ko: '야경과 전시를 결합한 대비 코스에서 몰입도가 올라갑니다.',
                en: 'Immersion improves on high-contrast routes combining night views and art.'
            }
        },
        {
            id: 'rowoon',
            work: { ko: '배우·아이돌', en: 'Actor-Idol' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '로운', en: 'Rowoon' },
            portraitPage: 'Rowoon',
            styles: ['history', 'shopping'],
            mood: {
                ko: '클래식 서사와 트렌드 체험의 균형을 선호하는 타입',
                en: 'A profile balancing classic narrative with trend exploration.'
            },
            reason: {
                ko: '역사 구간 후 트렌드 지역으로 전환하는 동선이 잘 맞습니다.',
                en: 'Routes that shift from history zones to trend areas suit him well.'
            }
        },
        {
            id: 'kwon-eun-bi',
            work: { ko: '솔로 아티스트', en: 'Solo Artist' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '권은비', en: 'Kwon Eun-bi' },
            portraitPage: 'Kwon_Eun-bi',
            styles: ['night', 'shopping'],
            mood: {
                ko: '무대형 에너지와 스타일 소비가 빠른 타입',
                en: 'A profile with stage-driven energy and fast style consumption.'
            },
            reason: {
                ko: '야간 포인트와 쇼핑 루프를 결합하면 만족도가 높습니다.',
                en: 'Combining night highlights with shopping loops is highly effective.'
            }
        },
        {
            id: 'ahn-yu-jin',
            work: { ko: '아이브 (IVE)', en: 'IVE' },
            type: { ko: '아이돌 멤버', en: 'Idol Member' },
            character: { ko: '안유진', en: 'An Yu-jin' },
            portraitPage: 'An_Yu-jin',
            styles: ['shopping', 'family'],
            mood: {
                ko: '활발한 이동과 안정적인 쉼을 함께 가져가는 타입',
                en: 'A profile balancing active movement with stable recovery stops.'
            },
            reason: {
                ko: '트렌드 지역과 휴식형 거점을 번갈아 배치하면 효율적입니다.',
                en: 'Alternating trend districts with rest-friendly anchors works best.'
            }
        },
        {
            id: 'winter-aespa',
            work: { ko: '에스파 (aespa)', en: 'aespa' },
            type: { ko: '아이돌 멤버', en: 'Idol Member' },
            character: { ko: '윈터', en: 'Winter' },
            portraitPage: 'Winter_(singer)',
            styles: ['art', 'shopping'],
            mood: {
                ko: '선명한 콘셉트와 미래지향 감도를 선호하는 타입',
                en: 'A profile preferring sharp concepts and futuristic sensibility.'
            },
            reason: {
                ko: '전시형 공간과 트렌드 샵을 연결한 코스에서 체감이 좋습니다.',
                en: 'She resonates with routes linking exhibition-style spaces and trend shops.'
            }
        },
        {
            id: 'doyoung-nct',
            work: { ko: 'NCT', en: 'NCT' },
            type: { ko: '아이돌 멤버', en: 'Idol Member' },
            character: { ko: '도영', en: 'Doyoung' },
            portraitPage: 'Doyoung_(singer)',
            styles: ['art', 'night'],
            mood: {
                ko: '감성 보컬 톤과 도시 야간 무드를 선호하는 타입',
                en: 'A profile leaning toward emotive tone and urban night mood.'
            },
            reason: {
                ko: '야간 산책과 전시 구간을 함께 배치할 때 만족도가 높습니다.',
                en: 'Satisfaction increases when night walks are paired with art stops.'
            }
        },
        {
            id: 'ji-chang-wook',
            work: { ko: '드라마 배우', en: 'Drama Actor' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '지창욱', en: 'Ji Chang-wook' },
            portraitPage: 'Ji_Chang-wook',
            styles: ['night', 'local'],
            mood: {
                ko: '현장감 있는 도시 리듬과 액션형 동선을 선호하는 타입',
                en: 'A profile favoring live urban rhythm and action-paced movement.'
            },
            reason: {
                ko: '로컬 거리와 야간 포인트를 연속 배치한 코스가 잘 맞습니다.',
                en: 'Back-to-back local streets and night hotspots fit this profile well.'
            }
        },
        {
            id: 'park-shin-hye',
            work: { ko: '드라마 배우', en: 'Drama Actor' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '박신혜', en: 'Park Shin-hye' },
            portraitPage: 'Park_Shin-hye',
            styles: ['history', 'family'],
            mood: {
                ko: '안정적이고 따뜻한 리듬을 선호하는 타입',
                en: 'A profile preferring stable and warm travel rhythm.'
            },
            reason: {
                ko: '고궁과 산책형 코스를 중심으로 이동하면 만족도가 높습니다.',
                en: 'Palace and walk-focused routes tend to work best.'
            }
        },
        {
            id: 'kim-go-eun',
            work: { ko: '드라마·영화', en: 'Drama & Film' },
            type: { ko: '배우', en: 'Actor' },
            character: { ko: '김고은', en: 'Kim Go-eun' },
            portraitPage: 'Kim_Go-eun',
            styles: ['art', 'local'],
            mood: {
                ko: '섬세한 감정선과 로컬 결을 동시에 보는 타입',
                en: 'A profile balancing subtle emotion and local texture.'
            },
            reason: {
                ko: '전시 공간과 골목형 로컬 스팟을 결합하면 몰입이 깊어집니다.',
                en: 'Combining gallery spaces with local alleys deepens immersion.'
            }
        },
        {
            id: 'shin-min-a',
            work: { ko: '드라마 배우', en: 'Drama Actor' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '신민아', en: 'Shin Min-a' },
            portraitPage: 'Shin_Min-a',
            styles: ['nature', 'shopping'],
            mood: {
                ko: '편안한 회복감과 세련된 트렌드를 함께 추구하는 타입',
                en: 'A profile combining restorative comfort with refined trends.'
            },
            reason: {
                ko: '공원·강변 동선 뒤 트렌드 구역으로 이어지는 구성이 효율적입니다.',
                en: 'A nature-first route followed by trend districts is effective.'
            }
        },
        {
            id: 'kim-ji-won',
            work: { ko: '드라마 배우', en: 'Drama Actor' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '김지원', en: 'Kim Ji-won' },
            portraitPage: 'Kim_Ji-won',
            styles: ['shopping', 'night'],
            mood: {
                ko: '도시형 세련미와 야간 무드를 선호하는 타입',
                en: 'A profile favoring urban polish and night mood.'
            },
            reason: {
                ko: '야간 뷰포인트와 쇼핑 축을 묶은 코스가 잘 맞습니다.',
                en: 'Routes mixing night viewpoints with shopping hubs fit well.'
            }
        },
        {
            id: 'byeon-woo-seok',
            work: { ko: '드라마 배우', en: 'Drama Actor' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '변우석', en: 'Byeon Woo-seok' },
            portraitPage: 'Byeon_Woo-seok',
            styles: ['night', 'art'],
            mood: {
                ko: '감성적인 야간 톤과 시각적 연출을 중시하는 타입',
                en: 'A profile focused on emotional night tone and visual staging.'
            },
            reason: {
                ko: '야경과 전시형 스팟을 결합한 코스에서 강점이 드러납니다.',
                en: 'Strength appears on routes linking night scenes and art spots.'
            }
        },
        {
            id: 'kim-hye-yoon',
            work: { ko: '드라마 배우', en: 'Drama Actor' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '김혜윤', en: 'Kim Hye-yoon' },
            portraitPage: 'Kim_Hye-yoon',
            styles: ['history', 'nature'],
            mood: {
                ko: '밝은 톤의 스토리성과 산책형 이동을 선호하는 타입',
                en: 'A profile preferring bright storytelling and walkable flow.'
            },
            reason: {
                ko: '고궁권과 강변 산책 구간을 함께 넣으면 체감이 좋습니다.',
                en: 'Palace zones plus riverside walks create strong balance.'
            }
        },
        {
            id: 'ahn-hyo-seop',
            work: { ko: '드라마 배우', en: 'Drama Actor' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '안효섭', en: 'Ahn Hyo-seop' },
            portraitPage: 'Ahn_Hyo-seop',
            styles: ['shopping', 'art'],
            mood: {
                ko: '현대적 감각과 깔끔한 동선을 선호하는 타입',
                en: 'A profile favoring modern taste and clean movement flow.'
            },
            reason: {
                ko: '전시/디자인 스팟 중심 코스와 트렌드 구역 연결이 적합합니다.',
                en: 'Design-forward routes linked to trend zones fit naturally.'
            }
        },
        {
            id: 'lee-jae-wook',
            work: { ko: '드라마 배우', en: 'Drama Actor' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '이재욱', en: 'Lee Jae-wook' },
            portraitPage: 'Lee_Jae-wook',
            styles: ['history', 'night'],
            mood: {
                ko: '서사 중심 이동과 강한 야간 포인트를 선호하는 타입',
                en: 'A profile preferring narrative routes and bold night points.'
            },
            reason: {
                ko: '역사 구간과 야경 구간의 대비가 큰 동선이 잘 맞습니다.',
                en: 'High-contrast routes between history and night work well.'
            }
        },
        {
            id: 'go-min-si',
            work: { ko: '드라마 배우', en: 'Drama Actor' },
            type: { ko: '연예인', en: 'Celebrity' },
            character: { ko: '고민시', en: 'Go Min-si' },
            portraitPage: 'Go_Min-si',
            styles: ['local', 'night'],
            mood: {
                ko: '로컬 밀도와 야간 리듬을 함께 체험하는 타입',
                en: 'A profile exploring local density with night rhythm.'
            },
            reason: {
                ko: '로컬 골목-야간 포인트가 이어지는 코스에서 만족도가 높습니다.',
                en: 'Local alley to night-spot continuity raises satisfaction.'
            }
        },
        {
            id: 'rose-blackpink',
            work: { ko: 'BLACKPINK', en: 'BLACKPINK' },
            type: { ko: '아이돌 멤버', en: 'Idol Member' },
            character: { ko: '로제', en: 'Rosé' },
            portraitPage: 'Rosé_(singer)',
            styles: ['shopping', 'art'],
            mood: {
                ko: '세련된 스타일 감도와 아트 무드를 선호하는 타입',
                en: 'A profile with polished style sense and art mood.'
            },
            reason: {
                ko: '쇼핑 허브와 전시형 공간을 묶은 코스가 높은 적합도를 보입니다.',
                en: 'Routes linking shopping hubs and art spaces fit strongly.'
            }
        },
        {
            id: 'lisa-blackpink',
            work: { ko: 'BLACKPINK', en: 'BLACKPINK' },
            type: { ko: '아이돌 멤버', en: 'Idol Member' },
            character: { ko: '리사', en: 'Lisa' },
            portraitPage: 'Lisa_(rapper)',
            styles: ['night', 'shopping'],
            mood: {
                ko: '고에너지 리듬과 트렌드 소비가 빠른 타입',
                en: 'A high-energy profile with fast trend adoption.'
            },
            reason: {
                ko: '야간 핫스팟과 트렌드 거리 중심의 고속 동선이 잘 맞습니다.',
                en: 'Fast-paced routes around night hotspots and trend streets fit best.'
            }
        },
        {
            id: 'jin-bts',
            work: { ko: 'BTS', en: 'BTS' },
            type: { ko: '아이돌 멤버', en: 'Idol Member' },
            character: { ko: '진', en: 'Jin' },
            portraitPage: 'Jin_(singer)',
            styles: ['family', 'history'],
            mood: {
                ko: '안정적인 페이스와 클래식한 코스를 선호하는 타입',
                en: 'A profile preferring stable pace and classic routes.'
            },
            reason: {
                ko: '역사 스팟과 편안한 식음·휴식 동선을 함께 배치하는 구성이 적합합니다.',
                en: 'A balanced flow of history spots and comfort stops works well.'
            }
        },
        {
            id: 'sana-twice',
            work: { ko: 'TWICE', en: 'TWICE' },
            type: { ko: '아이돌 멤버', en: 'Idol Member' },
            character: { ko: '사나', en: 'Sana' },
            portraitPage: 'Sana_(singer)',
            styles: ['shopping', 'nature'],
            mood: {
                ko: '밝은 무드와 산책형 휴식을 함께 추구하는 타입',
                en: 'A profile blending bright mood with walkable recovery.'
            },
            reason: {
                ko: '트렌드 쇼핑 동선 사이에 공원형 휴식 포인트를 넣는 구성이 좋습니다.',
                en: 'Adding park-like recovery points between shopping segments works well.'
            }
        },
        {
            id: 'hyunjin-skz',
            work: { ko: 'Stray Kids', en: 'Stray Kids' },
            type: { ko: '아이돌 멤버', en: 'Idol Member' },
            character: { ko: '현진', en: 'Hyunjin' },
            portraitPage: 'Hyunjin_(singer)',
            styles: ['art', 'night'],
            mood: {
                ko: '비주얼 아트 감도와 야간 몰입감을 동시에 중시하는 타입',
                en: 'A profile emphasizing visual-art sensitivity and night immersion.'
            },
            reason: {
                ko: '전시형 공간 후 야간 무드 포인트로 이어지는 흐름이 가장 적합합니다.',
                en: 'Art-space first, then night-mood points is the best sequence.'
            }
        },
        {
            id: 'kai-exo',
            work: { ko: 'EXO', en: 'EXO' },
            type: { ko: '아이돌 멤버', en: 'Idol Member' },
            character: { ko: '카이', en: 'Kai' },
            portraitPage: 'Kai_(singer,_born_1994)',
            styles: ['night', 'art'],
            mood: {
                ko: '퍼포먼스형 에너지와 스타일 연출을 선호하는 타입',
                en: 'A profile preferring performance-driven energy and style staging.'
            },
            reason: {
                ko: '야간 포인트와 디자인 스팟이 결합된 코스에서 몰입이 높습니다.',
                en: 'Immersion peaks on routes combining night highlights and design spots.'
            }
        },
        {
            id: 'bong-joon-ho',
            work: { ko: '기생충', en: 'Parasite' },
            type: { ko: '영화감독', en: 'Film Director' },
            character: { ko: '봉준호', en: 'Bong Joon-ho' },
            portraitPage: 'Bong_Joon-ho',
            styles: ['local', 'art'],
            mood: {
                ko: '현실 밀도와 구조적 시선을 함께 보는 타입',
                en: 'A profile reading both social texture and structural perspective.'
            },
            reason: {
                ko: '로컬 골목과 전시 공간을 교차하면 해석 밀도가 높아집니다.',
                en: 'Alternating local alleys with art spaces increases narrative depth.'
            }
        },
        {
            id: 'park-chan-wook',
            work: { ko: '헤어질 결심', en: 'Decision to Leave' },
            type: { ko: '영화감독', en: 'Film Director' },
            character: { ko: '박찬욱', en: 'Park Chan-wook' },
            portraitPage: 'Park_Chan-wook',
            styles: ['art', 'night'],
            mood: {
                ko: '강한 미장센과 긴장감 있는 도시 리듬을 선호하는 타입',
                en: 'A profile preferring strong mise-en-scene and tense urban rhythm.'
            },
            reason: {
                ko: '야간 뷰와 전시 구간을 묶는 구성이 가장 적합합니다.',
                en: 'Routes linking night views and gallery stops are highly compatible.'
            }
        },
        {
            id: 'youn-yuh-jung',
            work: { ko: '미나리', en: 'Minari' },
            type: { ko: '배우', en: 'Actor' },
            character: { ko: '윤여정', en: 'Youn Yuh-jung' },
            portraitPage: 'Youn_Yuh-jung',
            styles: ['history', 'family'],
            mood: {
                ko: '생활 밀도와 여유 있는 관찰 리듬을 중시하는 타입',
                en: 'A profile valuing lived texture and relaxed observational pace.'
            },
            reason: {
                ko: '고궁권과 정적인 휴식 포인트 중심 이동이 잘 맞습니다.',
                en: 'Palace areas plus calm rest points fit this profile best.'
            }
        },
        {
            id: 'lee-young-ae',
            work: { ko: '대장금', en: 'Jewel in the Palace' },
            type: { ko: '배우', en: 'Actor' },
            character: { ko: '이영애', en: 'Lee Young-ae' },
            portraitPage: 'Lee_Young-ae',
            styles: ['history', 'art'],
            mood: {
                ko: '전통 미감과 정제된 동선을 선호하는 타입',
                en: 'A profile favoring traditional aesthetics and refined routes.'
            },
            reason: {
                ko: '역사 유산과 전시형 공간을 잇는 코스에서 만족도가 높습니다.',
                en: 'Satisfaction is high on routes connecting heritage and gallery spaces.'
            }
        },
        {
            id: 'cho-yong-pil',
            work: { ko: '가왕 조용필', en: 'Legendary Vocalist' },
            type: { ko: '가수', en: 'Singer' },
            character: { ko: '조용필', en: 'Cho Yong-pil' },
            portraitPage: 'Cho_Yong-pil',
            styles: ['family', 'night'],
            mood: {
                ko: '세대 공감형 리듬과 안정적인 이동을 선호하는 타입',
                en: 'A profile preferring cross-generation rhythm and stable movement.'
            },
            reason: {
                ko: '가족 동선과 야간 명소를 적절히 섞으면 체감이 좋습니다.',
                en: 'Balanced family routes with selected night spots work effectively.'
            }
        },
        {
            id: 'nam-june-paik',
            work: { ko: '비디오 아트', en: 'Video Art' },
            type: { ko: '예술가', en: 'Artist' },
            character: { ko: '백남준', en: 'Nam June Paik' },
            portraitPage: 'Nam_June_Paik',
            styles: ['art', 'history'],
            mood: {
                ko: '실험성과 시대 감각을 동시에 추구하는 타입',
                en: 'A profile pursuing experimentation and historical context together.'
            },
            reason: {
                ko: '미술관/전시 중심 코스와 역사 구간의 결합이 적합합니다.',
                en: 'A museum-heavy route paired with historical zones fits strongly.'
            }
        },
        {
            id: 'han-kang',
            work: { ko: '채식주의자', en: 'The Vegetarian' },
            type: { ko: '작가', en: 'Writer' },
            character: { ko: '한강', en: 'Han Kang' },
            portraitPage: 'Han_Kang',
            styles: ['nature', 'art'],
            mood: {
                ko: '고요한 관찰과 감정 밀도의 균형을 중시하는 타입',
                en: 'A profile balancing quiet observation with emotional density.'
            },
            reason: {
                ko: '강변 산책과 전시 공간을 이어주는 서정형 동선이 잘 맞습니다.',
                en: 'Poetic routes linking riverside walks and art spaces work best.'
            }
        },
        {
            id: 'hwang-dong-hyuk',
            work: { ko: '오징어 게임', en: 'Squid Game' },
            type: { ko: '감독', en: 'Director' },
            character: { ko: '황동혁', en: 'Hwang Dong-hyuk' },
            portraitPage: 'Hwang_Dong-hyuk',
            styles: ['local', 'night'],
            mood: {
                ko: '도시의 현실감과 극적 대비를 함께 읽는 타입',
                en: 'A profile reading urban realism and dramatic contrast together.'
            },
            reason: {
                ko: '로컬 밀도 높은 구간과 야간 전환 포인트를 섞는 구성이 적합합니다.',
                en: 'Dense local zones with night transitions fit this profile well.'
            }
        },
        {
            id: 'lee-jung-jae',
            work: { ko: '오징어 게임', en: 'Squid Game' },
            type: { ko: '배우', en: 'Actor' },
            character: { ko: '이정재', en: 'Lee Jung-jae' },
            portraitPage: 'Lee_Jung-jae',
            styles: ['night', 'local'],
            mood: {
                ko: '도시 긴장감과 강한 몰입 리듬을 선호하는 타입',
                en: 'A profile favoring urban tension and high-immersion pacing.'
            },
            reason: {
                ko: '야간 뷰포인트와 로컬 골목을 연계한 코스가 특히 잘 맞습니다.',
                en: 'Routes linking night viewpoints and dense local streets fit especially well.'
            }
        },
        {
            id: 'gong-yoo',
            work: { ko: '도깨비', en: 'Guardian: The Lonely and Great God' },
            type: { ko: '배우', en: 'Actor' },
            character: { ko: '공유', en: 'Gong Yoo' },
            portraitPage: 'Gong_Yoo',
            styles: ['history', 'art'],
            mood: {
                ko: '정제된 서사와 감성적인 공간 연출을 선호하는 타입',
                en: 'A profile preferring refined narrative and emotional spatial staging.'
            },
            reason: {
                ko: '고궁/전시를 잇는 서정형 코스에서 만족도가 높습니다.',
                en: 'Poetic routes connecting palace and gallery zones deliver high satisfaction.'
            }
        },
        {
            id: 'park-seo-joon',
            work: { ko: '이태원 클라쓰', en: 'Itaewon Class' },
            type: { ko: '배우', en: 'Actor' },
            character: { ko: '박서준', en: 'Park Seo-joon' },
            portraitPage: 'Park_Seo-joon',
            styles: ['shopping', 'night'],
            mood: {
                ko: '트렌드 중심 동선과 에너지 있는 야간 리듬을 선호하는 타입',
                en: 'A profile preferring trend-led routes and energetic nightlife rhythm.'
            },
            reason: {
                ko: '트렌드 상권과 야간 핫스팟을 묶은 코스가 잘 맞습니다.',
                en: 'Routes combining trend districts with nightlife hotspots fit strongly.'
            }
        }
    ];
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
    const DISTRICT_GEO_COORDS = {
        '종로구': { lat: 37.5735, lng: 126.9790 },
        '중구': { lat: 37.5638, lng: 126.9976 },
        '용산구': { lat: 37.5325, lng: 126.9900 },
        '마포구': { lat: 37.5663, lng: 126.9015 },
        '성동구': { lat: 37.5633, lng: 127.0367 },
        '광진구': { lat: 37.5384, lng: 127.0822 },
        '강동구': { lat: 37.5301, lng: 127.1238 },
        '강남구': { lat: 37.5172, lng: 127.0473 },
        '서초구': { lat: 37.4836, lng: 127.0326 },
        '송파구': { lat: 37.5145, lng: 127.1060 },
        '영등포구': { lat: 37.5264, lng: 126.8962 },
        '동작구': { lat: 37.5124, lng: 126.9393 },
        '강서구': { lat: 37.5509, lng: 126.8495 },
        '성북구': { lat: 37.5894, lng: 127.0167 },
        '동대문구': { lat: 37.5744, lng: 127.0396 },
        '강북구': { lat: 37.6396, lng: 127.0257 },
        '노원구': { lat: 37.6542, lng: 127.0568 },
        '관악구': { lat: 37.4782, lng: 126.9515 }
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
            if (faqA3) faqA3.textContent = 'Use the top language toggle to switch Korean UI when needed, and links will sync to the lang=ko state.';
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
            const h2s = document.querySelectorAll('.panel h2');
            if (h2s[0]) h2s[0].textContent = 'Google Map';
            if (h2s[1]) h2s[1].textContent = 'Review Summary';
            if (h2s[2]) h2s[2].textContent = 'Traveler Notes';
            const metaLabels = document.querySelectorAll('.label-value span');
            if (metaLabels[0]) metaLabels[0].textContent = 'Rank';
            if (metaLabels[1]) metaLabels[1].textContent = 'District';
            if (metaLabels[2]) metaLabels[2].textContent = 'Best Time';
            if (metaLabels[3]) metaLabels[3].textContent = 'Rating';
            if (metaLabels[4]) metaLabels[4].textContent = 'Review Count';
            const mapExternalLink = document.getElementById('map-external-link');
            if (mapExternalLink) mapExternalLink.textContent = 'Open in Google Maps';
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
            return withCurrentLang(`/places/${encodeURIComponent(id)}.html`);
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
        const placeListEl = document.getElementById('saju-place-list');
        const guideTitle = document.getElementById('saju-guide-title');
        const guide1 = document.getElementById('saju-guide-1');
        const guide2 = document.getElementById('saju-guide-2');
        const yearInput = document.getElementById('birth-year');
        const monthInput = document.getElementById('birth-month');
        const dayInput = document.getElementById('birth-day');
        const calendarType = document.getElementById('calendar-type');
        const yearLabel = document.getElementById('birth-year-label');
        const monthLabel = document.getElementById('birth-month-label');
        const dayLabel = document.getElementById('birth-day-label');
        const calendarLabel = document.getElementById('calendar-type-label');

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
        summaryEl.textContent = '';
        analysisLongEl.innerHTML = '';
        warningEl.textContent = '';

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

        function renderRecommendations(primaryElement, secondaryElement) {
            const styles = [...new Set([...(styleMapByElement[primaryElement] || []), ...(styleMapByElement[secondaryElement] || [])])];
            styleChipsEl.innerHTML = styles.map((style) => {
                const href = withCurrentLang(`course.html?style=${encodeURIComponent(style)}`);
                return `<a class="generation-chip" href="${href}">${escapeHtml(getStyleLabel(style))}</a>`;
            }).join('');

            const picked = places.filter((place) => styles.some((style) => place.styles.includes(style))).slice(0, 5);
            placeListEl.innerHTML = picked.map((place, idx) => {
                const href = getPlaceLink('place.html', place.id);
                const matchStyles = place.styles.filter((style) => styles.includes(style)).slice(0, 2);
                const reasonByStyle = matchStyles.map((style) => `${getStyleLabel(style)} ${isEn ? 'theme' : '테마'}`).join(isEn ? ' + ' : ' + ');
                const elementReason = styleReasonByElement[isEn ? 'en' : 'ko'][primaryElement];
                const reasonText = isEn
                    ? `Why this place: ${place.nameEn || place.name} aligns with ${reasonByStyle || 'your element profile'}, and its ${getCategoryLabel(place.category)} character supports your ${ELEMENT_LABEL.en[primaryElement]}-driven travel rhythm. ${elementReason}`
                    : `추천 이유: ${getPlaceName(place)}은(는) ${reasonByStyle || '오행 성향'}과 맞물리고, ${getCategoryLabel(place.category)} 성격이 ${ELEMENT_LABEL.ko[primaryElement]} 중심 기운의 이동 리듬과 잘 맞습니다. ${elementReason}`;
                return `<li><a class="hotel-name" href="${href}">${idx + 1}. ${escapeHtml(getPlaceName(place))}</a> <span class="hotel-meta">(${escapeHtml(getDistrictLabel(place.district))})</span><p class="saju-reason">${escapeHtml(reasonText)}</p></li>`;
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
                placeListEl.innerHTML = '';
                return;
            }

            const pillars = calculatePillars(year, month, day, calendar);
            if (!pillars) {
                resultNote.textContent = isEn ? 'Invalid date. Please check month/day.' : '유효하지 않은 날짜입니다. 월/일을 확인해 주세요.';
                pillarsEl.innerHTML = '';
                summaryEl.textContent = '';
                analysisLongEl.innerHTML = '';
                styleChipsEl.innerHTML = '';
                placeListEl.innerHTML = '';
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
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
