// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Typing effect
const typingText = document.querySelector('.typing-text');
const texts = [
    "Cyber Security Specialist",
    "Ethical Hacker",
    "CTF Player",
    "Penetration Tester"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function type() {
    const currentText = texts[textIndex];
    const currentChar = currentText.substring(0, charIndex);
    
    typingText.textContent = currentChar;
    
    if (!isDeleting && charIndex < currentText.length) {
        charIndex++;
        setTimeout(type, 100);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 50);
    } else {
        isDeleting = !isDeleting;
        
        if (!isDeleting) {
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(type, 1000);
    }
}

// Animate skills bars
function animateSkills() {
    const skills = document.querySelectorAll('.skill');
    
    skills.forEach(skill => {
        const percent = skill.getAttribute('data-percent');
        const progress = skill.querySelector('.skill-progress');
        progress.style.width = `${percent}%`;
    });
}

// Scroll animations
function handleScroll() {
    const scrollPosition = window.scrollY;
    
    // Animate skills when about section is in view
    const aboutSection = document.querySelector('#about');
    if (aboutSection.offsetTop - window.innerHeight + 200 < scrollPosition) {
        animateSkills();
    }
    
    // Active nav link
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Start typing effect
    setTimeout(type, 1000);
    
    // Initialize scroll events
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once on load
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
});