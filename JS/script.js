const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');
const header = document.querySelector('.header');
const menuToggle = document.getElementById('menuToggle');
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 80);

    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 160;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            const active = document.querySelector(`.navbar a[href="#${id}"]`);
            if (active) active.classList.add('active');
        }
    });
});

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('open');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('bx-menu');
    icon.classList.toggle('bx-x');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        icon.classList.add('bx-menu');
        icon.classList.remove('bx-x');
    });
});
