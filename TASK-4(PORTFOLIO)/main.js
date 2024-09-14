// Smooth Scrolling Effect
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Contact Form Submission (Basic Example)
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (name && email && message) {
        alert(`Thank you for your message, ${name}! We will get back to you at ${email}.`);
        this.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Scroll Reveal Animations
const elements = document.querySelectorAll('.about-image, .project-item');
elements.forEach(element => {
    element.classList.add('fade-in');
});

// Intersection Observer for Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.about-text, .contact-form, .project-item').forEach(element => {
    observer.observe(element);
});
