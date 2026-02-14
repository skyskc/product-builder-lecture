document.addEventListener('DOMContentLoaded', () => {
    const recommendBtn = document.getElementById('recommend-btn');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const categoryStrip = document.getElementById('category-strip');
    const menuPost = document.getElementById('menu-post');
    const menuCategory = document.getElementById('menu-category');
    const menuTitle = document.getElementById('menu-title');
    const menuDescription = document.getElementById('menu-description');
    const menuTags = document.getElementById('menu-tags');
    const foodImage = document.getElementById('food-image');

    const themeStorageKey = 'lunch-theme';

    const lunchMenus = [
        {
            title: '김치찌개 정식',
            category: '한식',
            description: '칼칼한 김치찌개와 계란말이 조합으로 든든한 점심',
            tags: ['국물', '든든함', '밥도둑'],
            image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1000&q=80'
        },
        {
            title: '연어 포케 볼',
            category: '헬시',
            description: '신선한 연어와 채소를 가볍게 즐기는 클린 점심',
            tags: ['가벼운식사', '단백질', '상큼함'],
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80'
        },
        {
            title: '마라탕',
            category: '중식',
            description: '취향대로 토핑을 골라 먹는 얼얼한 한 그릇',
            tags: ['얼큰함', '중독성', '커스텀'],
            image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=1000&q=80'
        },
        {
            title: '치킨 시저 샐러드',
            category: '샐러드',
            description: '로메인과 구운 치킨, 고소한 드레싱의 균형 잡힌 메뉴',
            tags: ['저탄수', '가벼움', '바삭함'],
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80'
        },
        {
            title: '돈까스 정식',
            category: '일식',
            description: '바삭한 튀김옷과 진한 소스가 어울리는 클래식 점심',
            tags: ['바삭함', '클래식', '만족감'],
            image: 'https://images.unsplash.com/photo-1593030668930-8130abedd2cd?auto=format&fit=crop&w=1000&q=80'
        },
        {
            title: '바질 크림 파스타',
            category: '양식',
            description: '향긋한 바질과 부드러운 크림이 조화로운 파스타',
            tags: ['향긋함', '크리미', '데이트감성'],
            image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&w=1000&q=80'
        },
        {
            title: '쌀국수',
            category: '아시안',
            description: '진한 육수와 숙주, 고수 향으로 개운하게 마무리',
            tags: ['따뜻함', '개운함', '가성비'],
            image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=1000&q=80'
        },
        {
            title: '불고기 덮밥',
            category: '한식',
            description: '달콤짭짤한 불고기를 얹은 실패 없는 점심 메뉴',
            tags: ['단짠', '대중픽', '든든함'],
            image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1000&q=80'
        }
    ];

    let currentIndex = -1;

    const applyTheme = (theme) => {
        const isDark = theme === 'dark';
        document.body.classList.toggle('dark-mode', isDark);
        themeToggleBtn.textContent = isDark ? 'Dark' : 'Light';
        themeToggleBtn.setAttribute('aria-label', isDark ? '라이트 모드로 전환' : '다크 모드로 전환');
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

    const renderCategoryStrip = (activeCategory) => {
        const categories = ['전체', ...new Set(lunchMenus.map((menu) => menu.category))];
        categoryStrip.innerHTML = '';

        categories.forEach((category) => {
            const chip = document.createElement('span');
            chip.className = `category-chip${category === activeCategory ? ' active' : ''}`;
            chip.textContent = category;
            categoryStrip.appendChild(chip);
        });
    };

    const recommendMenu = () => {
        let nextIndex = Math.floor(Math.random() * lunchMenus.length);

        if (lunchMenus.length > 1) {
            while (nextIndex === currentIndex) {
                nextIndex = Math.floor(Math.random() * lunchMenus.length);
            }
        }

        currentIndex = nextIndex;
        const selected = lunchMenus[nextIndex];

        menuCategory.textContent = selected.category;
        menuTitle.textContent = selected.title;
        menuDescription.textContent = selected.description;
        menuTags.textContent = selected.tags.map((tag) => `#${tag}`).join(' ');

        foodImage.src = selected.image;
        foodImage.alt = `${selected.title} 대표 이미지`;

        menuPost.style.animation = 'none';
        void menuPost.offsetWidth;
        menuPost.style.animation = 'fadeIn 0.35s ease';

        renderCategoryStrip(selected.category);
    };

    themeToggleBtn.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(nextTheme);
        localStorage.setItem(themeStorageKey, nextTheme);
    });

    recommendBtn.addEventListener('click', recommendMenu);

    initTheme();
    recommendMenu();
});
