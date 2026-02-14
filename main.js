document.addEventListener('DOMContentLoaded', () => {
    const locale = document.body.dataset.locale || 'ko';
    const supportedLocales = ['ko', 'en', 'ja'];
    const activeLocale = supportedLocales.includes(locale) ? locale : 'en';

    const recommendBtn = document.getElementById('recommend-btn');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const localeSelect = document.getElementById('locale-select');
    const subtitleText = document.getElementById('subtitle-text');
    const menuPost = document.getElementById('menu-post');
    const menuCategory = document.getElementById('menu-category');
    const menuTitle = document.getElementById('menu-title');
    const menuDescription = document.getElementById('menu-description');
    const menuTags = document.getElementById('menu-tags');
    const foodImage = document.getElementById('food-image');

    const themeStorageKey = 'lunch-theme';
    let currentMenuIndex = -1;
    let currentImageIndex = -1;

    const translations = {
        ko: {
            pageTitle: '오늘 뭐 먹지? | 점심 메뉴 추천',
            subtitle: '간단하게 오늘의 점심 메뉴를 추천받으세요',
            recommend: '메뉴 다시 추천',
            darkLabel: 'Dark',
            lightLabel: 'Light',
            darkAria: '다크 모드로 전환',
            lightAria: '라이트 모드로 전환',
            imageAlt: (title) => `${title} 대표 이미지`
        },
        en: {
            pageTitle: 'What Should I Eat? | Lunch Recommendation',
            subtitle: 'Get a simple lunch recommendation instantly',
            recommend: 'Recommend Again',
            darkLabel: 'Dark',
            lightLabel: 'Light',
            darkAria: 'Switch to dark mode',
            lightAria: 'Switch to light mode',
            imageAlt: (title) => `${title} featured image`
        },
        ja: {
            pageTitle: '今日のランチは？ | ランチおすすめ',
            subtitle: 'シンプルに今日のランチをおすすめします',
            recommend: 'もう一度おすすめ',
            darkLabel: 'Dark',
            lightLabel: 'Light',
            darkAria: 'ダークモードに切り替え',
            lightAria: 'ライトモードに切り替え',
            imageAlt: (title) => `${title}のイメージ`
        }
    };

    const menusByLocale = {
        ko: [
            { title: '김치찌개 정식', category: '한식', description: '칼칼한 국물과 밥 조합으로 든든한 점심', tags: ['국물', '든든함', '인기'] },
            { title: '연어 포케 볼', category: '헬시', description: '신선한 연어와 채소로 가볍고 깔끔한 메뉴', tags: ['가벼움', '단백질', '신선함'] },
            { title: '마라탕', category: '중식', description: '취향대로 재료를 고르는 매콤한 한 그릇', tags: ['매콤함', '커스텀', '중독성'] },
            { title: '돈까스 정식', category: '일식', description: '바삭한 식감과 소스가 어우러진 클래식 메뉴', tags: ['바삭함', '클래식', '만족감'] },
            { title: '불고기 덮밥', category: '한식', description: '달콤짭짤한 불고기로 실패 없는 선택', tags: ['단짠', '대중픽', '든든함'] }
        ],
        en: [
            { title: 'Kimchi Stew Set', category: 'Korean', description: 'A warm spicy stew with rice for a hearty lunch', tags: ['hearty', 'spicy', 'comfort'] },
            { title: 'Salmon Poke Bowl', category: 'Healthy', description: 'Fresh salmon and vegetables in a light bowl', tags: ['fresh', 'protein', 'light'] },
            { title: 'Mala Hot Pot Bowl', category: 'Chinese', description: 'Custom toppings in a bold and numbing broth', tags: ['bold', 'custom', 'hot'] },
            { title: 'Tonkatsu Set', category: 'Japanese', description: 'Crispy cutlet with rich sauce and rice', tags: ['crispy', 'classic', 'satisfying'] },
            { title: 'Bulgogi Rice Bowl', category: 'Korean', description: 'Sweet and savory beef over rice', tags: ['savory', 'popular', 'filling'] }
        ],
        ja: [
            { title: 'キムチチゲ定食', category: '韓国料理', description: 'ピリ辛スープで体が温まる満足ランチ', tags: ['あたたかい', '定番', '満足'] },
            { title: 'サーモンポキボウル', category: 'ヘルシー', description: '新鮮なサーモンと野菜の軽めランチ', tags: ['さっぱり', 'たんぱく質', '軽め'] },
            { title: '麻辣湯', category: '中華', description: '具材を選べる刺激的なスープメニュー', tags: ['刺激', 'カスタム', '人気'] },
            { title: 'とんかつ定食', category: '和食', description: 'サクサク食感と濃厚ソースの定番', tags: ['サクサク', '定番', '満腹'] },
            { title: 'プルコギ丼', category: '韓国料理', description: '甘辛い味付けで食べやすい人気メニュー', tags: ['甘辛', '人気', 'ボリューム'] }
        ]
    };

    const fallbackFoodImages = [
        'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1593030668930-8130abedd2cd?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80'
    ];

    const t = translations[activeLocale];
    const menus = menusByLocale[activeLocale];

    const renderStaticText = () => {
        document.title = t.pageTitle;
        subtitleText.textContent = t.subtitle;
        recommendBtn.textContent = t.recommend;
    };

    const applyTheme = (theme) => {
        const isDark = theme === 'dark';
        document.body.classList.toggle('dark-mode', isDark);
        themeToggleBtn.textContent = isDark ? t.lightLabel : t.darkLabel;
        themeToggleBtn.setAttribute('aria-label', isDark ? t.lightAria : t.darkAria);
    };

    const initTheme = () => {
        const saved = localStorage.getItem(themeStorageKey);
        if (saved === 'light' || saved === 'dark') {
            applyTheme(saved);
            return;
        }
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    };

    const initLocaleSelector = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        localeSelect.value = currentPage;
        localeSelect.addEventListener('change', (event) => {
            const targetPage = event.target.value;
            if (targetPage && targetPage !== currentPage) {
                window.location.href = targetPage;
            }
        });
    };

    const pickRandomIndex = (length, current) => {
        let next = Math.floor(Math.random() * length);
        if (length > 1) {
            while (next === current) {
                next = Math.floor(Math.random() * length);
            }
        }
        return next;
    };

    const getGeneratedImageUrl = (menu) => {
        const seed = `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
        const prompt = `ultra realistic food photography, ${menu.title}, ${menu.category} cuisine, plated lunch, natural light, high detail`;
        return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1200&height=900&seed=${seed}&nologo=true`;
    };

    const setMenuImage = (menu) => {
        let usedFallback = false;
        foodImage.onerror = () => {
            if (usedFallback) {
                return;
            }
            usedFallback = true;
            currentImageIndex = pickRandomIndex(fallbackFoodImages.length, currentImageIndex);
            foodImage.src = fallbackFoodImages[currentImageIndex];
        };
        foodImage.src = getGeneratedImageUrl(menu);
    };

    const recommendMenu = () => {
        menuPost.classList.add('is-switching');

        setTimeout(() => {
            currentMenuIndex = pickRandomIndex(menus.length, currentMenuIndex);

            const selected = menus[currentMenuIndex];

            menuCategory.textContent = selected.category;
            menuTitle.textContent = selected.title;
            menuDescription.textContent = selected.description;
            menuTags.textContent = selected.tags.map((tag) => `#${tag}`).join(' ');

            setMenuImage(selected);
            foodImage.alt = t.imageAlt(selected.title);

            menuPost.classList.remove('is-switching');
        }, 180);
    };

    themeToggleBtn.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(nextTheme);
        localStorage.setItem(themeStorageKey, nextTheme);
    });

    recommendBtn.addEventListener('click', recommendMenu);

    renderStaticText();
    initTheme();
    initLocaleSelector();
    recommendMenu();
});
