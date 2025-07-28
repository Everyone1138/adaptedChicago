// script.js
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        document.getElementById("loader").classList.add("hidden");
        document.getElementById("content").classList.remove("hidden");
    }, 2000); // Simulates loading delay
});


document.getElementById("menu-btn").addEventListener("click", function(event) {
    event.stopPropagation();
    this.classList.add("rotate-180");
    document.getElementById("menu").style.right = "0";
});

document.getElementById("close-btn").addEventListener("click", function(event) {
    event.stopPropagation();
    document.getElementById("menu-btn").classList.remove("rotate-180");
    document.getElementById("menu").style.right = "-100%";
});

function closeMenu(event) {
    let menu = document.getElementById("menu");
    let menuBtn = document.getElementById("menu-btn");
    if (!menu.contains(event.target) && event.target !== menuBtn) {
        menu.style.right = "-100%";
        menuBtn.classList.remove("rotate-180");
    }
}

// banner // 


// about us in home page //
function fadeInOnScroll() {
    const aboutSection = document.getElementById("aboutUs");
    const sectionPosition = aboutSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (sectionPosition < screenPosition) {
        aboutSection.classList.remove("opacity-0", "translate-y-10");
    }
}

window.addEventListener("scroll", fadeInOnScroll);


// slit screen animation
$(document).ready(function() {
    $("#leftPaneButton").click(function() {
        $("#leftPane").animate({ width: 0 }, 1000);
        $("#rightPane").animate({ width: "100%" }, 1000);
    });

    $("#rightPaneButton").click(function() {
        $("#leftPane").animate({ width: "100%" }, 1000);
        $("#rightPane").animate({ width: 0 }, 1000);
    });
});



// tailwind.config.js
module.exports = {
    theme: {
        extend: {
            keyframes: {
                'fade-in': {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
                'fade-in-left': {
                    '0%': { opacity: 0, transform: 'translateX(-20px)' },
                    '100%': { opacity: 1, transform: 'translateX(0)' },
                },
                'fade-in-up': {
                    '0%': { opacity: 0, transform: 'translateY(20px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
            },
            animation: {
                'fade-in': 'fade-in 1s ease-out',
                'fade-in-left': 'fade-in-left 1s ease-out',
                'fade-in-up': 'fade-in-up 1s ease-out',
            },

        },
    },
    plugins: [],
};


module.exports = {
    content: ["./*.html"],
    theme: {
        extend: {
            animation: {
                'pop': 'pop 0.7s cubic-bezier(0.26, 0.53, 0.74, 1.48) backwards',
                'slide': 'slide 0.7s cubic-bezier(0.26, 0.53, 0.74, 1.48) backwards',
                'slide-left': 'slide-left 0.7s cubic-bezier(0.26, 0.53, 0.74, 1.48) backwards',
                'slide-up': 'slide-up 0.7s cubic-bezier(0.26, 0.53, 0.74, 1.48) backwards',
            },
            keyframes: {
                pop: {
                    '0%': { opacity: '0', transform: 'scale(0.5)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                slide: {
                    '0%': { opacity: '0', transform: 'translateX(4em)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                'slide-left': {
                    '0%': { opacity: '0', transform: 'translateX(-40px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                'slide-up': {
                    '0%': { opacity: '0', transform: 'translateY(3em)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            }
        }
    },
    plugins: [],
}


// Carousel Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const indicators = document.querySelectorAll('.carousel-indicator');
const totalSlides = slides.length;

function updateCarousel() {
    const carouselInner = document.querySelector('.carousel-inner');
    carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

// Auto slide change
setInterval(nextSlide, 5000);

// Initialize carousel
updateCarousel();







/**
 * script.js
 * Initializes Swipers, lightbox modals, lazy-loading, and scroll animations.
 */

// Simple logger
const log = {
    info: (...args) => console.info('[INFO]', ...args),
    debug: (...args) => console.debug('[DEBUG]', ...args),
};

/**
 * Initialize all Swiper carousels.
 */
function initSwipers() {
    log.info('Initializing portfolio swiper...');
    new Swiper('.portfolioSwiper', {
        loop: true,
        spaceBetween: 20,
        slidesPerView: 1,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
    });
}

/**
 * Lazy-load images & videos with Intersection Observer.
 */
function initLazyLoading() {
    const lazyElements = document.querySelectorAll('img.lazy, video.lazy');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const src = el.getAttribute('data-src');
            if (src) {
                log.debug('Lazy-loading', src);
                if (el.tagName === 'VIDEO') {
                    el.src = src;
                    el.load();
                } else {
                    el.src = src;
                }
                el.addEventListener('load', () => el.classList.add('loaded'));
            }
            obs.unobserve(el);
        });
    }, { rootMargin: '200px' });

    lazyElements.forEach(el => observer.observe(el));
}

/**
 * Animate fade-in-up elements on scroll.
 */
function initScrollAnimations() {
    const elems = document.querySelectorAll('.fade-in-up');
    const obs = new IntersectionObserver((entries, o) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                o.unobserve(e.target);
            }
        });
    }, { threshold: 0.2 });

    elems.forEach(el => obs.observe(el));
}

/**
 * Hook Flowbite modals (no extra code needed if using data-modal attributes).
 */
function initModals() {
    log.info('Flowbite auto-handles modals via data-modal-* attributes');
    // Flowbite will scan data-modal-target & data-modal-hide automatically.
}

document.addEventListener('DOMContentLoaded', () => {
    log.info('🏗️ Starting interactive feature initialization');
    initSwipers();
    initLazyLoading();
    initScrollAnimations();
    initModals();
});