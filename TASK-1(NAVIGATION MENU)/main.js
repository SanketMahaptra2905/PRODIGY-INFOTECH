document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");

    // Navbar change on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
});
