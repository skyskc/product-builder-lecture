(function () {
    window.GOSEOUL_SITE_DATA = window.GOSEOUL_SITE_DATA || {};
    window.GOSEOUL_SITE_DATA.KCONTENT_CHARACTERS = [
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
    window.GOSEOUL_SITE_DATA.PLACE_SEEDS = [
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
})();
