// Toggle menú hamburguesa
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.nav-2');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Toggle dropdowns en móvil
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        const dropdown = toggle.parentElement;
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// Cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});