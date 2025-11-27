// script.js
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.gallery-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const currentPage = document.querySelector('.current-page');
    const totalPages = document.querySelector('.total-pages');
    
    let currentIndex = 0;
    const slidesPerView = getSlidesPerView();
    
    // Определяем количество слайдов в зависимости от ширины экрана
    function getSlidesPerView() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        return 3;
    }
    
    // Рассчитываем общее количество страниц
    function calculateTotalPages() {
        return Math.ceil(slides.length / getSlidesPerView());
    }
    
    // Обновляем отображение пейджера
    function updatePager() {
        const total = calculateTotalPages();
        totalPages.textContent = total;
        currentPage.textContent = currentIndex + 1;
    }
    
    // Прокрутка к текущему слайду
    function scrollToSlide() {
        const slideWidth = slides[0].offsetWidth;
        track.scrollTo({
            left: currentIndex * slideWidth * getSlidesPerView(),
            behavior: 'smooth'
        });
        updatePager();
    }
    
    // Следующая страница
    nextBtn.addEventListener('click', function() {
        const maxIndex = calculateTotalPages() - 1;
        if (currentIndex < maxIndex) {
            currentIndex++;
            scrollToSlide();
        }
    });
    
    // Предыдущая страница
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            scrollToSlide();
        }
    });
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', function() {
        const newSlidesPerView = getSlidesPerView();
        const maxIndex = Math.ceil(slides.length / newSlidesPerView) - 1;
        
        // Корректируем текущий индекс при изменении количества слайдов на странице
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        scrollToSlide();
    });
    
    // Инициализация
    updatePager();
    
    // Блокировка кнопок в крайних положениях
    function updateButtons() {
        const maxIndex = calculateTotalPages() - 1;
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === maxIndex;
    }
    
    // Вызываем обновление кнопок при изменении страницы
    const originalScrollToSlide = scrollToSlide;
    scrollToSlide = function() {
        originalScrollToSlide();
        updateButtons();
    };
    
    updateButtons();
});