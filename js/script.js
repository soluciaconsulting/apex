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
