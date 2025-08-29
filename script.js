// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
});

// Add loading animation for service cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards for animation
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add hover effect for contact methods
document.querySelectorAll('.contact-method').forEach(method => {
    method.addEventListener('mouseenter', () => {
        method.style.transform = 'scale(1.02)';
        method.style.transition = 'transform 0.3s ease';
    });
    
    method.addEventListener('mouseleave', () => {
        method.style.transform = 'scale(1)';
    });
});

// Simple form validation for future contact forms
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ff0000';
            isValid = false;
        } else {
            input.style.borderColor = '#000000';
        }
    });
    
    return isValid;
}

// Add click-to-copy functionality for phone number
const phoneNumber = document.querySelector('.contact-method p');
if (phoneNumber && phoneNumber.textContent.includes('+49')) {
    phoneNumber.style.cursor = 'pointer';
    phoneNumber.title = 'Klicken Sie zum Kopieren';
    
    phoneNumber.addEventListener('click', () => {
        navigator.clipboard.writeText(phoneNumber.textContent).then(() => {
            const originalText = phoneNumber.textContent;
            phoneNumber.textContent = 'Telefonnummer kopiert!';
            phoneNumber.style.color = '#28a745';
            
            setTimeout(() => {
                phoneNumber.textContent = originalText;
                phoneNumber.style.color = '#333333';
            }, 2000);
        });
    });
}

// Add scroll-to-top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #000000;
    color: #ffffff;
    border: none;
    cursor: pointer;
    font-size: 20px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add loading state for buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.href && this.href.startsWith('#')) {
            return; // Don't add loading for anchor links
        }
        
        const originalText = this.textContent;
        this.textContent = 'Lädt...';
        this.style.pointerEvents = 'none';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.pointerEvents = 'auto';
        }, 2000);
    });
});

// Load footer from separate file
function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading footer:', error);
                // Fallback footer if loading fails
                footerPlaceholder.innerHTML = `
                    <footer class="footer">
                        <div class="container">
                            <div class="footer-bottom">
                                <p>&copy; 2024 Taxi Service. Alle Rechte vorbehalten.</p>
                            </div>
                        </div>
                    </footer>
                `;
            });
    }
}

// Load footer when page loads
document.addEventListener('DOMContentLoaded', loadFooter);

// Function to show phone number when booking button is clicked
function showPhoneNumber() {
    const phoneDisplay = document.getElementById('phone-display');
    const bookingBtn = document.querySelector('.booking-btn');
    
    if (phoneDisplay.style.display === 'none') {
        phoneDisplay.style.display = 'block';
        bookingBtn.textContent = 'Telefonnummer verstecken';
        bookingBtn.classList.remove('btn-primary');
        bookingBtn.classList.add('btn-secondary');
    } else {
        phoneDisplay.style.display = 'none';
        bookingBtn.textContent = 'Jetzt anrufen';
        bookingBtn.classList.remove('btn-secondary');
        bookingBtn.classList.add('btn-primary');
    }
}

// Add click-to-copy functionality for the phone number in booking section
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('phone-number')) {
        const phoneText = e.target.textContent;
        navigator.clipboard.writeText(phoneText).then(() => {
            const originalText = e.target.textContent;
            e.target.textContent = 'Telefonnummer kopiert!';
            e.target.style.color = '#28a745';
            
            setTimeout(() => {
                e.target.textContent = originalText;
                e.target.style.color = '#000000';
            }, 2000);
        });
    }
}); 