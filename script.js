document.documentElement.classList.add("disable-transitions");

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

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

        
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");   // show/hide menu
  hamburger.classList.toggle("active");  // change icon to X
});


const img = document.querySelector('.profile-frame img');

img.addEventListener('mousemove', (e) => {
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left; // cursor X inside image
    const y = e.clientY - rect.top;  // cursor Y inside image

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10; // max 10deg
    const rotateY = ((x - centerX) / centerX) * 10;

    // Dynamic shadow offset
    const shadowX = ((x - centerX) / centerX) * 20; // shadow moves opposite X
    const shadowY = ((y - centerY) / centerY) * 20; // shadow moves opposite Y

    img.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    img.style.boxShadow = `${-shadowX}px ${-shadowY}px 30px rgba(88, 238, 158, 0.66), 0 0 15px rgba(162, 230, 164, 0.94)`;
});

img.addEventListener('mouseleave', () => {
    img.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    img.style.boxShadow = '-30px 10px 20px rgba(166, 244, 175, 1)';
});

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector("button[type='submit']");
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                alert("Message sent successfully. Thank you!");
                contactForm.reset();
            } else {
                alert("Message failed to send. Please try again.");
            }
        } catch (error) {
            alert("Network error. Please check your internet connection.");
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit";
        }
    });
}
