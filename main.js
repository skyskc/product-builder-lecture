document.addEventListener('DOMContentLoaded', () => {
    const locale = document.body.dataset.locale || 'ko';
    const supportedLocales = ['ko', 'en', 'ja', 'fr', 'it', 'de', 'zh'];
    const activeLocale = supportedLocales.includes(locale) ? locale : 'en';

    const recommendBtn = document.getElementById('recommend-btn');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const subtitleText = document.getElementById('subtitle-text');
    const categoryStrip = document.getElementById('category-strip');
    const menuPost = document.getElementById('menu-post');
    const menuCategory = document.getElementById('menu-category');
    const menuTitle = document.getElementById('menu-title');
    const menuDescription = document.getElementById('menu-description');
    const menuTags = document.getElementById('menu-tags');
    const foodImage = document.getElementById('food-image');

    const themeStorageKey = 'lunch-theme';
    let currentIndex = -1;

    const translations = {
        ko: {
            pageTitle: '오늘 뭐 먹지? | 점심 메뉴 추천',
            subtitle: '오늘의 점심 메뉴를 추천해드려요',
            recommend: '점심 메뉴 추천받기',
            all: '전체',
            darkLabel: 'Dark',
            lightLabel: 'Light',
            darkAria: '다크 모드로 전환',
            lightAria: '라이트 모드로 전환',
            imageAlt: (title) => `${title} 대표 이미지`
        },
        en: {
            pageTitle: 'What Should I Eat? | Lunch Recommendation',
            subtitle: 'Get a fresh lunch idea in one tap',
            recommend: 'Recommend Lunch',
            all: 'All',
            darkLabel: 'Dark',
            lightLabel: 'Light',
            darkAria: 'Switch to dark mode',
            lightAria: 'Switch to light mode',
            imageAlt: (title) => `${title} featured image`
        },
        ja: {
            pageTitle: '今日のランチは？ | ランチメニューおすすめ',
            subtitle: 'ワンタップで今日のランチを提案します',
            recommend: 'ランチをおすすめ',
            all: 'すべて',
            darkLabel: 'Dark',
            lightLabel: 'Light',
            darkAria: 'ダークモードに切り替え',
            lightAria: 'ライトモードに切り替え',
            imageAlt: (title) => `${title}のイメージ`
        },
        fr: {
            pageTitle: 'On Mange Quoi ? | Recommandation Déjeuner',
            subtitle: 'Trouvez votre déjeuner en un clic',
            recommend: 'Recommander un plat',
            all: 'Tous',
            darkLabel: 'Dark',
            lightLabel: 'Light',
            darkAria: 'Passer en mode sombre',
            lightAria: 'Passer en mode clair',
            imageAlt: (title) => `Image de ${title}`
        },
        it: {
            pageTitle: 'Cosa Mangio Oggi? | Consigli Pranzo',
            subtitle: 'Scopri il pranzo perfetto con un tap',
            recommend: 'Consiglia pranzo',
            all: 'Tutti',
            darkLabel: 'Dark',
            lightLabel: 'Light',
            darkAria: 'Passa alla modalita scura',
            lightAria: 'Passa alla modalita chiara',
            imageAlt: (title) => `Immagine di ${title}`
        },
        de: {
            pageTitle: 'Was esse ich heute? | Lunch Empfehlung',
            subtitle: 'Finde dein Mittagsmenu mit einem Klick',
            recommend: 'Lunch empfehlen',
            all: 'Alle',
            darkLabel: 'Dark',
            lightLabel: 'Light',
            darkAria: 'Zum Dunkelmodus wechseln',
            lightAria: 'Zum Hellmodus wechseln',
            imageAlt: (title) => `Bild von ${title}`
        },
        zh: {
            pageTitle: '今天吃什么？| 午餐推荐',
            subtitle: '一键获取今天的午餐灵感',
            recommend: '推荐午餐',
            all: '全部',
            darkLabel: 'Dark',
            lightLabel: 'Light',
            darkAria: '切换到深色模式',
            lightAria: '切换到浅色模式',
            imageAlt: (title) => `${title}示意图`
        }
    };

    const menusByLocale = {
        ko: [
            { title: '김치찌개 정식', category: '한식', description: '칼칼한 국물과 계란말이 조합으로 든든한 점심', tags: ['국물', '든든함', '밥도둑'], image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1000&q=80' },
            { title: '연어 포케 볼', category: '헬시', description: '신선한 연어와 채소를 가볍게 즐기는 메뉴', tags: ['가벼움', '단백질', '상큼함'], image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80' },
            { title: '마라탕', category: '중식', description: '취향대로 토핑을 넣어 먹는 얼얼한 한 그릇', tags: ['얼큰함', '중독성', '커스텀'], image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=1000&q=80' },
            { title: '치킨 시저 샐러드', category: '샐러드', description: '로메인과 치킨, 고소한 드레싱의 균형', tags: ['가벼운식사', '저탄수', '신선함'], image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80' },
            { title: '돈까스 정식', category: '일식', description: '바삭한 튀김옷과 진한 소스가 좋은 클래식', tags: ['바삭함', '클래식', '만족감'], image: 'https://images.unsplash.com/photo-1593030668930-8130abedd2cd?auto=format&fit=crop&w=1000&q=80' },
            { title: '불고기 덮밥', category: '한식', description: '달콤짭짤한 불고기로 실패 없는 점심', tags: ['단짠', '대중픽', '든든함'], image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1000&q=80' }
        ],
        en: [
            { title: 'Kimchi Stew Set', category: 'Korean', description: 'Spicy stew with side dishes for a warm and filling lunch', tags: ['hearty', 'spicy', 'comfort'], image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1000&q=80' },
            { title: 'Salmon Poke Bowl', category: 'Healthy', description: 'Fresh salmon and vegetables over rice in a clean bowl', tags: ['fresh', 'protein', 'light'], image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80' },
            { title: 'Mala Hot Pot Bowl', category: 'Chinese', description: 'Custom toppings in a bold and numbing spicy broth', tags: ['bold', 'custom', 'hot'], image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=1000&q=80' },
            { title: 'Chicken Caesar Salad', category: 'Salad', description: 'Grilled chicken, romaine, and creamy dressing in balance', tags: ['light', 'crunchy', 'classic'], image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80' },
            { title: 'Tonkatsu Set', category: 'Japanese', description: 'Crispy pork cutlet with rich sauce and rice', tags: ['crispy', 'classic', 'satisfying'], image: 'https://images.unsplash.com/photo-1593030668930-8130abedd2cd?auto=format&fit=crop&w=1000&q=80' },
            { title: 'Bulgogi Rice Bowl', category: 'Korean', description: 'Sweet and savory beef over rice for an easy win', tags: ['savory', 'popular', 'filling'], image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1000&q=80' }
        ],
        ja: [
            { title: 'キムチチゲ定食', category: '韓国料理', description: 'ピリ辛スープと副菜でしっかり満足できるランチ', tags: ['温かい', '満足感', '定番'], image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1000&q=80' },
            { title: 'サーモンポキボウル', category: 'ヘルシー', description: '新鮮なサーモンと野菜を気軽に楽しめる一品', tags: ['さっぱり', 'たんぱく質', '軽め'], image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80' },
            { title: '麻辣湯', category: '中華', description: '好きな具材を選んで楽しむ刺激的なスープ', tags: ['刺激', 'カスタム', '人気'], image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=1000&q=80' },
            { title: 'チキンシーザーサラダ', category: 'サラダ', description: 'チキンとロメインのバランスが良い定番サラダ', tags: ['軽食', 'さくさく', 'ヘルシー'], image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80' },
            { title: 'とんかつ定食', category: '和食', description: 'サクサク衣と濃厚ソースが相性抜群', tags: ['サクサク', '定番', '満腹'], image: 'https://images.unsplash.com/photo-1593030668930-8130abedd2cd?auto=format&fit=crop&w=1000&q=80' },
            { title: 'プルコギ丼', category: '韓国料理', description: '甘辛い味付けで外さない人気ランチ', tags: ['甘辛', '人気', 'ボリューム'], image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1000&q=80' }
        ],
        fr: [
            { title: 'Menu Ragoût Kimchi', category: 'Coreen', description: 'Un ragoût epice avec accompagnements pour un dejeuner copieux', tags: ['chaud', 'epice', 'reconfort'], image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1000&q=80' },
            { title: 'Poke Bowl au Saumon', category: 'Sain', description: 'Saumon frais et legumes pour un repas leger et complet', tags: ['frais', 'proteine', 'leger'], image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80' },
            { title: 'Bol Mala', category: 'Chinois', description: 'Bouillon releve avec ingredients au choix', tags: ['intense', 'personnalise', 'chaud'], image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=1000&q=80' },
            { title: 'Salade Cesar au Poulet', category: 'Salade', description: 'Poulet grille, romaine et sauce onctueuse bien equilibree', tags: ['leger', 'croquant', 'classique'], image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80' },
            { title: 'Menu Tonkatsu', category: 'Japonais', description: 'Porc pane croustillant avec sauce riche et riz', tags: ['croustillant', 'classique', 'gourmand'], image: 'https://images.unsplash.com/photo-1593030668930-8130abedd2cd?auto=format&fit=crop&w=1000&q=80' },
            { title: 'Bol Bulgogi', category: 'Coreen', description: 'Boeuf sucre-sale sur riz, un choix sur pour midi', tags: ['savoureux', 'populaire', 'copieux'], image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1000&q=80' }
        ],
        it: [
            { title: 'Menu Kimchi Jjigae', category: 'Coreano', description: 'Zuppa piccante con contorni per un pranzo sostanzioso', tags: ['caldo', 'piccante', 'comfort'], image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1000&q=80' },
            { title: 'Poké al Salmone', category: 'Healthy', description: 'Salmone fresco e verdure per un pranzo leggero', tags: ['fresco', 'proteine', 'leggero'], image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80' },
            { title: 'Ciotola Mala', category: 'Cinese', description: 'Brodo speziato con ingredienti scelti da te', tags: ['intenso', 'personalizzato', 'caldo'], image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=1000&q=80' },
            { title: 'Insalata Caesar con Pollo', category: 'Insalata', description: 'Pollo grigliato e lattuga romana con salsa cremosa', tags: ['leggero', 'croccante', 'classico'], image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80' },
            { title: 'Tonkatsu Set', category: 'Giapponese', description: 'Cotoletta croccante con salsa intensa e riso', tags: ['croccante', 'classico', 'saziante'], image: 'https://images.unsplash.com/photo-1593030668930-8130abedd2cd?auto=format&fit=crop&w=1000&q=80' },
            { title: 'Bulgogi Bowl', category: 'Coreano', description: 'Manzo agrodolce su riso, scelta sempre sicura', tags: ['sapido', 'popolare', 'sostanzioso'], image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1000&q=80' }
        ],
        de: [
            { title: 'Kimchi-Eintopf Set', category: 'Koreanisch', description: 'Wuerziger Eintopf mit Beilagen fuer ein sattes Mittagessen', tags: ['warm', 'wuerzig', 'herzhaft'], image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1000&q=80' },
            { title: 'Lachs Poke Bowl', category: 'Healthy', description: 'Frischer Lachs und Gemuese fuer ein leichtes Lunch', tags: ['frisch', 'proteinreich', 'leicht'], image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80' },
            { title: 'Mala Bowl', category: 'Chinesisch', description: 'Scharfe Suppe mit frei waehlbaren Zutaten', tags: ['intensiv', 'individuell', 'scharf'], image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=1000&q=80' },
            { title: 'Chicken Caesar Salad', category: 'Salat', description: 'Gegrilltes Huhn mit Romanasalat und cremigem Dressing', tags: ['leicht', 'knackig', 'klassisch'], image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80' },
            { title: 'Tonkatsu Set', category: 'Japanisch', description: 'Knuspriges Schnitzel mit kraeftiger Sauce und Reis', tags: ['knusprig', 'klassisch', 'satt'], image: 'https://images.unsplash.com/photo-1593030668930-8130abedd2cd?auto=format&fit=crop&w=1000&q=80' },
            { title: 'Bulgogi Rice Bowl', category: 'Koreanisch', description: 'Sueszhaftes Rindfleisch auf Reis, immer eine gute Wahl', tags: ['herzhaft', 'beliebt', 'fuellend'], image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1000&q=80' }
        ],
        zh: [
            { title: '泡菜炖锅套餐', category: '韩餐', description: '微辣热汤配小菜，适合饱足午餐', tags: ['热汤', '满足', '下饭'], image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1000&q=80' },
            { title: '三文鱼波奇饭', category: '健康', description: '新鲜三文鱼搭配蔬菜，清爽不油腻', tags: ['清爽', '蛋白质', '轻食'], image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80' },
            { title: '麻辣烫', category: '中餐', description: '按喜好选择配料的一碗麻辣鲜香', tags: ['麻辣', '自选', '过瘾'], image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=1000&q=80' },
            { title: '鸡肉凯撒沙拉', category: '沙拉', description: '烤鸡与生菜搭配浓郁酱汁，口感平衡', tags: ['轻食', '脆爽', '健康'], image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80' },
            { title: '日式炸猪排套餐', category: '日餐', description: '外酥里嫩搭配浓郁酱汁和米饭', tags: ['酥脆', '经典', '饱腹'], image: 'https://images.unsplash.com/photo-1593030668930-8130abedd2cd?auto=format&fit=crop&w=1000&q=80' },
            { title: '韩式烤牛肉盖饭', category: '韩餐', description: '甜咸平衡的烤牛肉，稳定好吃的选择', tags: ['下饭', '人气', '满足'], image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1000&q=80' }
        ]
    };

    const t = translations[activeLocale] || translations.en;
    const menus = menusByLocale[activeLocale] || menusByLocale.en;

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

    const highlightCurrentLocalePage = () => {
        const current = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.locale-link').forEach((link) => {
            const page = link.dataset.page;
            link.classList.toggle('active', page === current);
        });
    };

    const renderCategoryStrip = (activeCategory) => {
        const categories = [t.all, ...new Set(menus.map((menu) => menu.category))];
        categoryStrip.innerHTML = '';

        categories.forEach((category) => {
            const chip = document.createElement('span');
            chip.className = `category-chip${category === activeCategory ? ' active' : ''}`;
            chip.textContent = category;
            categoryStrip.appendChild(chip);
        });
    };

    const recommendMenu = () => {
        let nextIndex = Math.floor(Math.random() * menus.length);
        if (menus.length > 1) {
            while (nextIndex === currentIndex) {
                nextIndex = Math.floor(Math.random() * menus.length);
            }
        }

        currentIndex = nextIndex;
        const selected = menus[nextIndex];

        menuCategory.textContent = selected.category;
        menuTitle.textContent = selected.title;
        menuDescription.textContent = selected.description;
        menuTags.textContent = selected.tags.map((tag) => `#${tag}`).join(' ');

        foodImage.src = selected.image;
        foodImage.alt = t.imageAlt(selected.title);

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

    renderStaticText();
    initTheme();
    highlightCurrentLocalePage();
    recommendMenu();
});
