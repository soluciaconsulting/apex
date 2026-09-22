// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                company: formData.get('company'),
                message: formData.get('message')
            };

            // Validate required fields
            if (!data.name || !data.email || !data.message) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Show success message (in a real implementation, this would send to a server)
            showMessage('Thank you for your message! We will get back to you shortly.', 'success');

            // Reset form
            contactForm.reset();

            // In a production environment, you would send the data to a server:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(data)
            // })
            // .then(response => response.json())
            // .then(result => {
            //     if (result.success) {
            //         showMessage('Thank you for your message! We will get back to you shortly.', 'success');
            //         contactForm.reset();
            //     } else {
            //         showMessage('There was an error sending your message. Please try again.', 'error');
            //     }
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            //     showMessage('There was an error sending your message. Please try again.', 'error');
            // });
        });
    }

    // Helper function to display messages
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-note ' + type;

        // Auto-clear success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-note';
            }, 5000);
        }
    }

    // Sign-up form handler
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

            // Pretend to send to server
            signupMessage.textContent = 'Thanks — you are subscribed!';
            signupMessage.className = 'signup-note success';
            signupForm.reset();

            setTimeout(() => {
                signupMessage.textContent = '';
                signupMessage.className = 'signup-note';
            }, 5000);
        });
    }

    // IntersectionObserver for scroll animations
    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    if ('IntersectionObserver' in window && scrollElements.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger animation delay for multiple elements
                    setTimeout(() => {
                        entry.target.classList.add('in-view');
                    }, index * 50);
                    // Unobserve to run only once
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        scrollElements.forEach(el => io.observe(el));
    } else {
        // Fallback: reveal all
        scrollElements.forEach(el => el.classList.add('in-view'));
    }

    // Simple hero parallax on mouse move
    const hero = document.querySelector('.hero');
    const heroImg = document.querySelector('.hero-image');
    if (hero && heroImg) {
        let raf = null;
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            const tx = x * 6; // translate percentages
            const ty = y * 6;
            if (raf) cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                heroImg.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(1.02)`;
            });
        });
        hero.addEventListener('mouseleave', () => {
            if (raf) cancelAnimationFrame(raf);
            heroImg.style.transform = '';
        });
    }

    // Subtle tilt effect for featured cards
    const featuredCards = document.querySelectorAll('.featured-card');
    featuredCards.forEach(card => {
        let rAF = null;
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            const rx = (-y * 6).toFixed(2);
            const ry = (x * 8).toFixed(2);
            if (rAF) cancelAnimationFrame(rAF);
            rAF = requestAnimationFrame(() => {
                card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
            });
        });
        card.addEventListener('mouseleave', () => {
            if (rAF) cancelAnimationFrame(rAF);
            card.style.transform = '';
        });
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
