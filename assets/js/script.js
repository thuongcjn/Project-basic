

const addEventOnElem = function (element, type, callback) {
    if (element.length > 1) {
        for (let i = 0; i < element.length; i++) {
            element[i].addEventListener(type, callback);
        }
    } else {
        element.addEventListener(type, callback);
    }
}

const navTogglers = document.querySelectorAll('[nav-bar]');
const navbar = document.querySelector('.mobile-nav');
const navbarLinks = document.querySelectorAll(".mobile-nav__content li")
const overlay = document.querySelector('.overlay');


const toggleNavbar = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
}
addEventOnElem(navTogglers, 'click', toggleNavbar);
const closeNavbar = function () {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, 'click', closeNavbar);


// header sticky
const headerMobile = document.querySelector('.mobile-header__wrapper');
const headerDesktop = document.querySelector('.navbar');

let lastScrollPos = 0;

const handleScroll = function () {
    const currentScrollPos = window.scrollY;
    const activeHeaders = [headerMobile, headerDesktop];

    activeHeaders.forEach(header => {
        if (!header) return;

        if (currentScrollPos > 150) {
            header.classList.add("active");
        } else {
            header.classList.remove("active");
        }


        if (currentScrollPos > 150) {
            if (lastScrollPos >= currentScrollPos) {
                header.classList.remove("header-hide");
            } else {
                header.classList.add("header-hide");
            }
        }
    });

    lastScrollPos = currentScrollPos;
}


window.addEventListener("scroll", handleScroll);

// 
const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    loop:true,
    effect:'fade',
    speed:1000,
    centeredSlides: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    on: {
        init: function () {
            const firstImg = this.slides[this.activeIndex].querySelector('img').src;
            document.querySelector('.hero-slider').style.setProperty('--bg-image', `url(${firstImg})`);
        }
        ,
        autoplayTimeLeft(s, time, progress) {
            progressCircle.style.setProperty("--progress", 1 - progress);
            progressContent.textContent = `${Math.ceil(time / 1000)}s`;
        },
        slideChange: function () {
            const imgSrc = this.slides[this.activeIndex].querySelector('img').src;
            document.querySelector('.hero-slider').style.setProperty('--bg-image', `url(${imgSrc})`);
        },
    }
});

document.querySelector('.touch-left').addEventListener('click', () => {
    swiper.slidePrev();
});

document.querySelector('.touch-right').addEventListener('click', () => {
    swiper.slideNext();
});