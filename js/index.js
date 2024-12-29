const scrollContainer = document.querySelector('.scroll-container');
let scrollStep = 1; // Скорость прокрутки
let direction = 1; // Направление прокрутки: 1 = вправо, -1 = влево
let animationPaused = false; // Флаг паузы анимации
let resumeTimeout;

// Функция плавной анимации
function smoothScroll() {
    if (!animationPaused) {
        scrollContainer.scrollLeft += scrollStep * direction;

        // Меняем направление, если достигнут конец или начало
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
            direction = -1; // Идём влево
        } else if (scrollContainer.scrollLeft <= 0) {
            direction = 1; // Идём вправо
        }
    }

    requestAnimationFrame(smoothScroll); // Запуск следующего кадра
}

// Запуск анимации
smoothScroll();

// Остановка анимации при наведении на фото
const photos = document.querySelectorAll('.photo img');
photos.forEach((photo) => {
    photo.addEventListener('mouseenter', () => {
        animationPaused = true; // Ставим анимацию на паузу
        clearTimeout(resumeTimeout); // Очищаем таймер на случай повторного наведения
    });

    photo.addEventListener('mouseleave', () => {
        resumeTimeout = setTimeout(() => {
            animationPaused = false; // Возобновляем анимацию
        }, 2000); // Задержка в 2 секунды перед возобновлением
    });
});

// Открытие фото в модальном окне
const modal = document.createElement('div');
modal.classList.add('modal');
document.body.appendChild(modal);

photos.forEach((photo) => {
    photo.addEventListener('click', () => {
        modal.innerHTML = `<img src="${photo.src}" alt="${photo.alt}"><span class="close">&times;</span>`;
        modal.style.display = 'flex';

        // Закрытие модального окна
        modal.querySelector('.close').addEventListener('click', () => {
            modal.style.display = 'none';
        });
    });
});
