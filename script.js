// Mech a Popel - Website JavaScript
// Interactive features and animations

// ==== Particle Background ====
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float-up ${Math.random() * 20 + 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(particle);
    }
}

// ==== Hero Particles ====
function createHeroParticles() {
    const heroContainer = document.querySelector('.hero-particles');
    if (!heroContainer) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('hero-particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = Math.random() * 4 + 6 + 's';
        heroContainer.appendChild(particle);
    }
}

// ==== Smooth Scroll Nav Links ====
function setupNaveLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

// ==== Scroll Animation for Sections ====
function setupScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
}

// ==== Hover Card Effects ====
function setupCardEffects() {
    const cards = document.querySelectorAll('.about-card, .character-card, .mechanic-box, .biome-card, .enemy-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });

        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

// ==== Button Click Effects ====
function setupButtonEffects() {
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.animation = 'ripple-animation 0.6s ease-out';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ==== Navbar Scroll Effect ====
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 0 40px rgba(0, 217, 255, 0.4)';
        } else {
            navbar.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.2)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// ==== Text Counter Animation ====
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const increment = target / 30;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                setTimeout(updateCounter, 30);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// ==== Glitch Text Effect ====
function setupGlitchEffect() {
    const glitchElements = document.querySelectorAll('[data-glitch]');
    
    glitchElements.forEach(elem => {
        const text = elem.textContent;
        elem.addEventListener('mouseenter', function() {
            let glitches = 0;
            const interval = setInterval(() => {
                if (glitches > 10) {
                    clearInterval(interval);
                    elem.textContent = text;
                    return;
                }
                
                let newText = '';
                for (let i = 0; i < text.length; i++) {
                    newText += String.fromCharCode(text.charCodeAt(i) + Math.random() * 20);
                }
                elem.textContent = newText;
                glitches++;
            }, 50);
        });
    });
}

// ==== Initialize All Functions ====
function init() {
    console.log('Mech a Popel website initialized');
    
    createParticles();
    createHeroParticles();
    setupNaveLinks();
    setupScrollAnimations();
    setupCardEffects();
    setupButtonEffects();
    setupNavbarScroll();
    animateCounters();
    setupGlitchEffect();
}

// ==== Add Ripple Animation CSS ====
const style = document.createElement('style');
style.innerHTML = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes float-up {
        to {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==== Run on Page Load ====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}