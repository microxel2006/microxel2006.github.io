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

        // Replace with your actual Formspree endpoint
        // Get it from https://formspree.io after creating a form
        const formspreeEndpoint = "https://formspree.io/f/mvzovlgv"; // ← CHANGE THIS!

        const formData = new FormData(contactForm);

        // Optional: Add honeypot for basic spam protection
        // <input type="text" name="_gotcha" style="display:none" /> in HTML

        try {
            const res = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
            });

            if (res.ok) {
                // Show thank-you modal
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