document.addEventListener('DOMContentLoaded', () => {
    const numbersContainer = document.getElementById('numbers');
    const generateBtn = document.getElementById('generate-btn');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeStorageKey = 'lottery-theme';

    const applyTheme = (theme) => {
        const isLight = theme === 'light';
        document.body.classList.toggle('light-mode', isLight);
        themeToggleBtn.textContent = isLight ? 'Dark Mode' : 'Light Mode';
        themeToggleBtn.setAttribute(
            'aria-label',
            isLight ? 'Switch to dark mode' : 'Switch to light mode'
        );
    };

    const initializeTheme = () => {
        const savedTheme = localStorage.getItem(themeStorageKey);
        if (savedTheme === 'light' || savedTheme === 'dark') {
            applyTheme(savedTheme);
            return;
        }

        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        applyTheme(prefersLight ? 'light' : 'dark');
    };

    const getNumberColor = (number) => {
        if (number <= 10) return '#fbc400'; // Yellow
        if (number <= 20) return '#69c8f2'; // Blue
        if (number <= 30) return '#ff7272'; // Red
        if (number <= 40) return '#aaa';     // Gray
        return '#b0d840';                     // Green
    };

    const generateAndDisplayNumbers = () => {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

        numbersContainer.innerHTML = ''; // Clear previous numbers

        sortedNumbers.forEach(number => {
            const circle = document.createElement('div');
            circle.classList.add('number');
            circle.textContent = number;
            circle.style.backgroundColor = getNumberColor(number);
            numbersContainer.appendChild(circle);
        });
    };

    generateBtn.addEventListener('click', generateAndDisplayNumbers);
    themeToggleBtn.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
        applyTheme(nextTheme);
        localStorage.setItem(themeStorageKey, nextTheme);
    });

    // Generate numbers on initial load
    initializeTheme();
    generateAndDisplayNumbers();
});
