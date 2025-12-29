// Disable transitions during load
document.documentElement.classList.add("disable-transitions");

// Theme toggle
const themeBtn = document.getElementById("theme-switch");
const themeImg = themeBtn ? themeBtn.querySelector("img") : null;

function setTheme(isDark) {
    document.body.classList.toggle("dark", isDark);
    if (themeImg) themeImg.src = isDark ? "dark.png" : "light.png";
    localStorage.setItem("theme", isDark ? "dark" : "light");
}

const savedTheme = localStorage.getItem("theme");
setTheme(savedTheme === "dark");

requestAnimationFrame(() => {
    document.documentElement.classList.remove("disable-transitions");
});

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        const isDark = !document.body.classList.contains("dark");
        setTheme(isDark);
    });
}

// Hamburger menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("active");
    });
}

// Profile image hover effect
const img = document.querySelector('.profile-frame img');

if (img) {
    img.addEventListener('mousemove', (e) => {
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * 10;

        const shadowX = ((x - centerX) / centerX) * 20;
        const shadowY = ((y - centerY) / centerY) * 20;

        img.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        img.style.boxShadow = `${-shadowX}px ${-shadowY}px 30px rgba(88, 238, 158, 0.66), 0 0 15px rgba(162, 230, 164, 0.94)`;
    });

    img.addEventListener('mouseleave', () => {
        img.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        img.style.boxShadow = '-30px 10px 20px rgba(166, 244, 175, 1)';
    });
}

// Thank-you modal close behavior
const thankYouModal = document.getElementById('thankYouModal');
const thankYouBtn = document.querySelector('.simple-modal-btn');

if (thankYouBtn) {
    thankYouBtn.addEventListener('click', () => {
        thankYouModal.classList.remove('active');
    });
}

if (thankYouModal) {
    thankYouModal.addEventListener('click', (e) => {
        if (e.target === thankYouModal) thankYouModal.classList.remove('active');
    });
}

// Contact Form Submission to Formspree
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;

        const formspreeEndpoint = "https://formspree.io/f/mvzovlgv";

        const formData = new FormData(contactForm);

        try {
            const res = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
            });

            if (res.ok) {
                if (thankYouModal) thankYouModal.classList.add('active');
                contactForm.reset();
            } else {
                let errMsg = 'Submission failed. Please try again.';
                try {
                    const data = await res.json();
                    if (data && data.error) errMsg = data.error;
                } catch {}
                alert(errMsg);
            }
        } catch (err) {
            alert('Network error. Please check your connection and try again.');
        } finally {
            if (submitBtn) submitBtn.disabled = false;
        }
    });
}

// Star follows cursor on hover for multiple elements
(() => {
    // List of all elements where you want the star to follow the cursor
    const interactiveElements = document.querySelectorAll(
        '.skill-box, .info-home, .info-about, .education-box, .info-project'
    );

    if (!interactiveElements.length) return;

    interactiveElements.forEach(el => {
        let star = null;

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (!star) {
                star = document.createElement('span');
                star.className = 'click-star';
                const core = document.createElement('span');
                core.className = 'star-core';
                star.appendChild(core);
                el.appendChild(star);
            }

            star.style.left = `${x}px`;
            star.style.top = `${y}px`;
            star.style.opacity = '1';
            star.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)';
        });

        el.addEventListener('mouseleave', () => {
            if (star) {
                star.style.opacity = '0';
                setTimeout(() => {
                    if (star && star.parentNode) {
                        star.parentNode.removeChild(star);
                        star = null;
                    }
                }, 400);
            }
        });
    });
})();

// Click-star for hobbies list items (kept as click)
(() => {
    const hobbyItems = document.querySelectorAll('.hobbies li');
    if (!hobbyItems.length) return;

    hobbyItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const star = document.createElement('span');
            star.className = 'click-star';
            const core = document.createElement('span');
            core.className = 'star-core';
            star.appendChild(core);

            star.style.left = x + 'px';
            star.style.top = y + 'px';

            item.appendChild(star);

            star.addEventListener('animationend', () => {
                if (star && star.parentNode) star.parentNode.removeChild(star);
            }, { once: true });
        });
    });
})();

// Click-star for general buttons (kept as click)
(() => {
    const buttons = document.querySelectorAll('button');
    if (!buttons.length) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (typeof e.clientX !== 'number') return;
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const star = document.createElement('span');
            star.className = 'click-star';
            const core = document.createElement('span');
            core.className = 'star-core';
            star.appendChild(core);

            star.style.left = x + 'px';
            star.style.top = y + 'px';

            btn.appendChild(star);

            star.addEventListener('animationend', () => {
                if (star && star.parentNode) star.parentNode.removeChild(star);
            }, { once: true });
        });
    });
})();

// Restart animations when elements scroll into view
(() => {
    const opts = { threshold: 0.3 };

    function restartClass(el, cls, keepMs = 1800) {
        if (!el) return;
        el.classList.remove(cls);
        el.offsetWidth; // force reflow
        el.classList.add(cls);
        if (keepMs > 0) {
            setTimeout(() => el.classList.remove(cls), keepMs);
        }
    }

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                if (el.matches('.project-img')) {
                    restartClass(el, 'enter', 1600);
                }
                if (el.matches('.info-about')) {
                    restartClass(el, 'in-view', 4200);
                }
            }
        });
    }, opts);

    const proj = document.querySelector('.project-img');
    const about = document.querySelector('.info-about');
    if (proj) io.observe(proj);
    if (about) io.observe(about);

    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', () => {
            const href = a.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            setTimeout(() => {
                const p = target.querySelector('.project-img');
                const info = target.querySelector('.info-about') || document.querySelector('.info-about');
                if (p) restartClass(p, 'enter', 1600);
                if (info) restartClass(info, 'in-view', 4200);
            }, 300);
        });
    });
})();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});