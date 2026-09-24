// Premium animations for Apex Carbides
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // ADVANCED SCROLL ANIMATION ENGINE
    // ============================================
    
    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    
    if ('IntersectionObserver' in window && scrollElements.length) {
        // Options for more granular control
        const observerOptions = {
            threshold: [0, 0.15, 0.3, 0.5, 0.7],
            rootMargin: '0px 0px -50px 0px'
        };
        
        const intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Staggered animation with more advanced timing
                    const staggerDelay = Math.min(index * 80, 500);
                    
                    setTimeout(() => {
                        entry.target.classList.add('in-view');
                        
                        // Trigger additional element animations
                        const cards = entry.target.querySelectorAll('.industry-card, .quality-feature, .featured-card');
                        cards.forEach((card, cardIndex) => {
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0) scale(1)';
                            }, cardIndex * 100);
                        });
                    }, staggerDelay);
                    
                    // Unobserve after animation
                    intersectionObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        scrollElements.forEach(el => intersectionObserver.observe(el));
    } else {
        // Fallback: immediately show all elements
        scrollElements.forEach(el => el.classList.add('in-view'));
    }

    // ============================================
    // ADVANCED PARALLAX AND SCROLL EFFECTS
    // ============================================
    
    const hero = document.querySelector('.hero');
    const heroImg = document.querySelector('.hero-image');
    
    if (hero && heroImg) {
        let ticking = false;
        let lastScrollY = 0;
        
        // Mouse parallax on hero section
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            const tx = x * 8;
            const ty = y * 8;
            
            heroImg.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(1.03)`;
        });
        
        hero.addEventListener('mouseleave', () => {
            heroImg.style.transform = 'translate3d(0, 0, 0) scale(1)';
        });
        
        // Scroll parallax effect
        window.addEventListener('scroll', () => {
            lastScrollY = window.scrollY;
            
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const heroRect = hero.getBoundingClientRect();
                    if (heroRect.bottom > 0) {
                        const offset = lastScrollY * 0.3;
                        heroImg.style.transform = `translateY(${offset}px) scale(1.05)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ============================================
    // ADVANCED CARD TILT EFFECTS
    // ============================================
    
    const tiltCards = document.querySelectorAll('.featured-card, .contact-card, .industry-card, .quality-feature');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            card.style.boxShadow = `0 20px 60px rgba(0, 0, 0, 0.15)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.boxShadow = '';
        });
    });

    // ============================================
    // SMOOTH NAVIGATION LINKS
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                
                const target = document.querySelector(href);
                const offset = 80; // Header height
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // CONTACT FORM HANDLER
    // ============================================
    
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                company: formData.get('company'),
                message: formData.get('message')
            };

            if (!data.name || !data.email || !data.message) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }

            showMessage('Thank you for your message! We will get back to you shortly.', 'success');
            contactForm.reset();
        });
    }

    function showMessage(message, type) {
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = 'form-note ' + type;

            if (type === 'success') {
                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.className = 'form-note';
                }, 5000);
            }
        }
    }

    // ============================================
    // SIGNUP FORM HANDLER
    // ============================================
    
    const signupForm = document.getElementById('signupForm');
    const signupMessage = document.getElementById('signupMessage');

    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = (document.getElementById('signupEmail') || {}).value || '';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email || !emailRegex.test(email)) {
                signupMessage.textContent = 'Please enter a valid email address.';
                signupMessage.className = 'signup-note error';
                return;
            }

            signupMessage.textContent = 'Thanks — you are subscribed!';
            signupMessage.className = 'signup-note success';
            signupForm.reset();

            setTimeout(() => {
                signupMessage.textContent = '';
                signupMessage.className = 'signup-note';
            }, 5000);
        });
    }

    // ============================================
    // BUTTON RIPPLE EFFECT
    // ============================================
    
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.className = 'ripple';

            // Clean up existing ripples
            const existingRipple = this.querySelector('.ripple');
            if (existingRipple) existingRipple.remove();

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ============================================
    // SCROLL-TO-TOP BUTTON
    // ============================================
    
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--accent-color), var(--accent-light));
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
        display: none;
        z-index: 999;
        box-shadow: 0 8px 24px rgba(245, 158, 11, 0.3);
        transition: all 0.3s ease;
        font-weight: bold;
    `;

    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) translateY(-5px)';
    });

    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });

    // ============================================
    // SCROLL VELOCITY AWARENESS
    // ============================================
    
    let lastScrollTime = 0;
    let lastScrollY = 0;
    let isScrolling = false;

    window.addEventListener('scroll', () => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - lastScrollTime;
        const scrollDelta = window.scrollY - lastScrollY;
        
        if (elapsedTime > 0) {
            const velocity = Math.abs(scrollDelta / elapsedTime);
            
            if (velocity > 0.3) {
                if (!isScrolling) {
                    document.body.classList.add('is-scrolling-fast');
                    isScrolling = true;
                }
            }
        }

        lastScrollTime = currentTime;
        lastScrollY = window.scrollY;

        // Reset fast scroll class after scrolling stops
        clearTimeout(document.scrollTimeout);
        document.scrollTimeout = setTimeout(() => {
            document.body.classList.remove('is-scrolling-fast');
            isScrolling = false;
        }, 150);
    });

    // ============================================
    // FADE IN CARDS ON LOAD
    // ============================================
    
    const cards = document.querySelectorAll('.industry-card, .quality-feature, .featured-card, .contact-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.95)';
        card.style.transition = `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`;
    });

    // Trigger on scroll
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' });

    cards.forEach(card => cardObserver.observe(card));

    // ============================================
    // BENEFITS LIST - SEQUENTIAL POPUP ON ABOUT VISIBILITY
    // ============================================
    const aboutSection = document.getElementById('about');
    if (aboutSection && 'IntersectionObserver' in window) {
        const aboutObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = aboutSection.querySelectorAll('.benefits-list li');
                    items.forEach((li, i) => {
                        setTimeout(() => {
                            li.classList.add('pop');
                        }, i * 180);
                    });
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25, rootMargin: '0px 0px -80px 0px' });

        aboutObserver.observe(aboutSection);
    }
});

// Premium CSS additions via JavaScript
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .scroll-to-top:hover {
        box-shadow: 0 12px 40px rgba(245, 158, 11, 0.5) !important;
    }
`;
document.head.appendChild(style);

