/* ═══════════════════════════════════════════════════════════
   ONEMO — Manufacturing Company
   Global Scripts
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Custom Cursor ---
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (cursor && follower && window.matchMedia('(hover: hover)').matches) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        function animateFollower() {
            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Scale cursor on hover
        document.querySelectorAll('a, button, .lookbook-item, .gallery-full-item, .topic-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                follower.style.transform = 'scale(1.5)';
                follower.style.opacity = '0.5';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                follower.style.transform = 'scale(1)';
                follower.style.opacity = '1';
            });
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        // Check on load
        if (window.scrollY > 50) navbar.classList.add('scrolled');
    }

    // --- Hamburger Menu ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            if (mobileMenu) mobileMenu.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            });
        });
    }

    // --- Scroll Reveal Animation ---
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .scroll-reveal');
    const revealOnScroll = () => {
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 120;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // --- Newsletter Form (Global) ---
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            // Note: If you want newsletter to actually send an email,
            // we should point it to FormSubmit.co like the contact form.
            // For now, we simulate success if the page has the alert div.
            const emailInput = form.querySelector('input[type="email"]');
            const alertDiv = form.parentElement.querySelector('.form-alert');

            if (alertDiv) {
                e.preventDefault();
                const val = emailInput.value.trim();
                if (!val) {
                    alertDiv.textContent = 'Please enter your email.';
                    alertDiv.className = 'form-alert error show';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
                    alertDiv.textContent = 'Please enter a valid email.';
                    alertDiv.className = 'form-alert error show';
                } else {
                    alertDiv.textContent = 'Welcome to the movement! 🙌';
                    alertDiv.className = 'form-alert success show';
                    emailInput.value = '';
                }
                setTimeout(() => { alertDiv.className = 'form-alert'; }, 4000);
            }
        });
    });

    // --- Contact Form ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            console.log('Sending message to Onemoclu6@gmail.com via FormSubmit...');
        });
    }

    // --- Parallax Hero ---
    const heroBg = document.querySelector('.hero-bg img');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = `scale(${1 + scrolled * 0.0003}) translateY(${scrolled * 0.3}px)`;
            }
        });
    }
});
