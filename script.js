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

const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you! Your message has been received.");
        contactForm.reset();
    });
}
