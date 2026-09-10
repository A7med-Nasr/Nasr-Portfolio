//================= show sidebar =================
const navMenu = document.getElementById('sidebar'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

if (navToggle) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.add('show-sidebar');
        navToggle.style.display = 'none'
    })
}

if (navClose) {
    navClose.addEventListener("click", () => {
        navMenu.classList.remove('show-sidebar');
        navToggle.style.display = 'flex';
    })
}

//================= To top =================
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({
        top: 0
    });
});


//================= skills tab =================
const tabs = document.querySelectorAll('[data-target]'),
    tabContent = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        const target = document.querySelector(tab.dataset.target);

        tabContent.forEach(tabContents => {
            tabContents.classList.remove('skills-active');
        });

        target.classList.add('skills-active');

        tabs.forEach(tab => {
            tab.classList.remove('skills-active');
        });

        tab.classList.add('skills-active');
    });
});



//================= mixitup filter =================
let mixerPortfolio = mixitup('.work-container', {
    selectors: {
        target: '.work-card'
    },
    animation: {
        duration: 300
    }
});

//================= link active work =================
const linkWork = document.querySelectorAll(".work-item");

function activeWork() {
    linkWork.forEach(L => L.classList.remove("active-work"));
    this.classList.add("active-work");
}

linkWork.forEach(L => L.addEventListener("click", activeWork))

//================= work popoup =================
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("work-button")) {
        togglePortfolioPopup();
        portfolioItemDetails(e.target.parentElement);
    }
})

function togglePortfolioPopup() {
    document.querySelector(".portfolio-popup").classList.toggle("open");
}

document.querySelector(".portfolio-popup-close").addEventListener("click", togglePortfolioPopup);

function portfolioItemDetails(portfolioItem) {
    document.querySelector(".pp-thumbnail img").src = portfolioItem.querySelector(".work-img").src;
    document.querySelector(".portfolio-popup-subtitle span").innerHTML = portfolioItem.querySelector(".work-title").innerHTML;
    document.querySelector(".portfolio-popup-body").innerHTML = portfolioItem.querySelector(".portfolio-item-datails").innerHTML;
}

//================= services modal =================
const modalViews = document.querySelectorAll('.services-modal'),
    modalBtns = document.querySelectorAll('.services-button'),
    modalCloses = document.querySelectorAll('.services-modal-close');

let modal = function (modalClick) {
    modalViews[modalClick].classList.add('active-modal');
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i);
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal');
        })
    })
})

//================= swiper testinomial =================
let swiper = new Swiper(".testinomials-container", {
    spaceBetween: 24,
    loop: true,
    grapCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        576: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 48,
        },
    },
});

//================= input animation =================
const inputs = document.querySelectorAll(".input");

function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add("focus");
}

function blurFunc() {
    let parent = this.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");
    }
}

inputs.forEach((input) => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);
})

//================= scroll section active link =================
const sections = document.querySelectorAll("section[id]");
//================= add event listener for scroll =================
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
    //================= get current scroll position =================
    let scrollY = window.pageYOffset;
    //================= loop through sections to get height, top and id values for each =================
    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute("id");
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(".nav-menu a[href*=" + sectionId + "]").classList.add("active-link");
        } else {
            document.querySelector(".nav-menu a[href*=" + sectionId + "]").classList.remove("active-link");
        }
    });
}

//================= typing effect (home subtitle) =================
const typedTarget = document.getElementById('typed-role');

if (typedTarget) {
    const roles = ['Frontend Developer', 'React Developer', 'UI Engineer'];
    let roleIndex = 0, charIndex = 0, deleting = false;

    function typeLoop() {
        const currentRole = roles[roleIndex];

        if (!deleting) {
            charIndex++;
            typedTarget.textContent = currentRole.slice(0, charIndex);
            if (charIndex === currentRole.length) {
                deleting = true;
                setTimeout(typeLoop, 1800);
                return;
            }
        } else {
            charIndex--;
            typedTarget.textContent = currentRole.slice(0, charIndex);
            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }
        setTimeout(typeLoop, deleting ? 40 : 90);
    }

    typeLoop();
}

//================= animated skill progress bars =================
const skillBars = document.querySelectorAll('.skills-percentage');

const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.width + '%';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });

skillBars.forEach((bar) => skillsObserver.observe(bar));

//================= close modals on outside click =================
document.querySelectorAll('.services-modal, .portfolio-popup').forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active-modal', 'open');
        }
    });
});

//================= share button ================= 
document.addEventListener('DOMContentLoaded', () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);

    document.getElementById('share-facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    document.getElementById('share-twitter').href = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
    document.getElementById('share-whatsapp').href = `https://api.whatsapp.com/send?text=${title}%20${url}`;
});
//================= custom cursor (dot + hover growth + hover label) =================
// Vanilla JS, no external library: the project's existing stack (Bootstrap,
// mixitup, Swiper) has no animation engine, so a rAF-driven lerp gives a
// smooth trailing feel without adding a GSAP dependency just for this.
const cursorDot = document.querySelector('.cursor-dot');
const canHover = window.matchMedia('(hover: hover)').matches;

if (cursorDot && canHover) {
    let targetX = window.innerWidth / 2, targetY = window.innerHeight / 2;
    let currentX = targetX, currentY = targetY;

    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    function renderCursor() {
        currentX += (targetX - currentX) * 0.2;
        currentY += (targetY - currentY) * 0.2;
        cursorDot.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
        requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    document.querySelectorAll('a, button, .work-item, .services-button, .contact-button').forEach((el) => {
        el.addEventListener('mouseenter', () => cursorDot.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursorDot.classList.remove('cursor-hover'));
    });

    document.querySelectorAll('[data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('cursor-label');
            cursorDot.textContent = el.getAttribute('data-cursor');
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('cursor-label');
            cursorDot.textContent = '';
        });
    });
} else if (cursorDot) {
    cursorDot.style.display = 'none';
}

//================= hero cursor spotlight =================
const heroSection = document.getElementById('home');

if (heroSection && canHover) {
    heroSection.addEventListener('mousemove', (e) => {
        const r = heroSection.getBoundingClientRect();
        heroSection.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        heroSection.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
}
