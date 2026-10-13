/**
 * VANSH SHARMA PORTFOLIO - JAVASCRIPT
 * Features:
 * - Dynamic Background Particle / Constellation Canvas
 * - Typing Text Effect (Hero)
 * - Mobile Navigation Toggle with Outside-Click Close
 * - Active Section Highlighting on Scroll
 * - Sticky Navbar Background Transition
 * - Scroll Reveal Animations
 * - Copy Email to Clipboard with Toast Notification
 * - Interactive Contact Form with Mailto Integration
 * - Dynamic Copyright Year
 */

document.addEventListener('DOMContentLoaded', () => {
    initDynamicYear();
    initMobileNav();
    initTypingEffect();
    initNavbarScroll();
    initActiveNavLinks();
    initBackToTop();
    initEmailCopy();
    initContactForm();
    initScrollReveal();
    initParticleCanvas();
});

/* ----------------------------------------------------
   1. Dynamic Copyright Year
---------------------------------------------------- */
function initDynamicYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/* ----------------------------------------------------
   2. Mobile Navigation Toggle
---------------------------------------------------- */
function initMobileNav() {
    const toggleBtn = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!toggleBtn || !navMenu) return;

    function toggleMenu(open) {
        const isOpen = open !== undefined ? open : !navMenu.classList.contains('open');
        navMenu.classList.toggle('open', isOpen);
        toggleBtn.classList.toggle('active', isOpen);
        toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close mobile nav when clicking any nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu(false);
            }
        });
    });

    // Close when clicking outside the menu
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
            toggleMenu(false);
        }
    });
}

/* ----------------------------------------------------
   3. Typing Animation in Hero Section
---------------------------------------------------- */
function initTypingEffect() {
    const typedTextEl = document.getElementById('typed-text');
    if (!typedTextEl) return;

    const phrases = [
        "1st Year B.Tech CSE Student",
        "Aspiring AI Engineer",
        "Aspiring Software Engineer",
        "Learning C Programming",
        "Coding & Gaming Enthusiast"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeLoop() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 90;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Finished typing word, wait before starting to delete
            typingSpeed = 1800;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, switch to next word
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400;
        }

        setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
}

/* ----------------------------------------------------
   4. Navbar Scroll Effect & Sticky State
---------------------------------------------------- */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });
}

/* ----------------------------------------------------
   5. Active Section Indicator in Navbar
---------------------------------------------------- */
function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length === 0 || navLinks.length === 0) return;

    function updateActiveLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
}

/* ----------------------------------------------------
   6. Back to Top Button
---------------------------------------------------- */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ----------------------------------------------------
   7. Copy Email Address to Clipboard + Toast
---------------------------------------------------- */
function initEmailCopy() {
    const copyBtn = document.getElementById('copy-email-btn');
    const tooltip = document.getElementById('copy-tooltip');
    const emailToCopy = "vnsh30288@gmail.com";

    if (!copyBtn) return;

    copyBtn.addEventListener('click', async () => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(emailToCopy);
            } else {
                // Fallback for older browsers or file:// context
                const tempInput = document.createElement('input');
                tempInput.value = emailToCopy;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
            }

            // Update tooltip text temporarily
            if (tooltip) {
                const originalText = tooltip.textContent;
                tooltip.textContent = "Copied!";
                setTimeout(() => {
                    tooltip.textContent = originalText;
                }, 2000);
            }

            showToast("✓ Email copied to clipboard: vnsh30288@gmail.com");
        } catch (err) {
            showToast("Failed to copy email. Please copy manually: " + emailToCopy);
        }
    });
}

/* Helper function to show floating toast messages */
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

/* ----------------------------------------------------
   8. Contact Form Handling
---------------------------------------------------- */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const notification = document.getElementById('form-notification');

    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('sender-name').value.trim();
        const email = document.getElementById('sender-email').value.trim();
        const subject = document.getElementById('sender-subject').value.trim();
        const message = document.getElementById('sender-message').value.trim();

        if (!name || !email || !subject || !message) {
            showToast("Please fill in all form fields.");
            return;
        }

        // Build mailto link so it prepares an email directly to Vansh
        const mailtoUrl = `mailto:vnsh30288@gmail.com?subject=${encodeURIComponent(subject + " - from " + name)}&body=${encodeURIComponent("Sender Name: " + name + "\nSender Email: " + email + "\n\nMessage:\n" + message)}`;

        // Show feedback notification
        if (notification) {
            notification.className = "form-notification success";
            notification.textContent = `Thank you, ${name}! Opening your default email client to send your message to Vansh...`;
            notification.style.display = "block";
        }

        showToast("Opening email client to send message...");

        // Open mail client after brief delay
        setTimeout(() => {
            window.location.href = mailtoUrl;
        }, 600);

        // Reset form
        contactForm.reset();
    });
}

/* ----------------------------------------------------
   9. Scroll Reveal Animations (IntersectionObserver)
---------------------------------------------------- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.card-glass, .timeline-item, .tech-card, .status-badge, .about-headline, .fact-box'
    );

    if (!('IntersectionObserver' in window)) {
        // Fallback: If browser doesn't support IntersectionObserver, ensure visible
        revealElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.12
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)`;
        // Stagger slightly if in quick succession
        el.style.transitionDelay = `${(index % 4) * 0.08}s`;
        revealObserver.observe(el);
    });
}

/* ----------------------------------------------------
   10. Interactive Particle / Network Canvas
---------------------------------------------------- */
function initParticleCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Configuration
    const particleCountRatio = 0.000045; // density based on screen pixels
    const maxDistance = 110;

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        createParticles();
    }

    function createParticles() {
        particles = [];
        const count = Math.max(25, Math.floor(width * height * particleCountRatio));

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.45,
                vy: (Math.random() - 0.5) * 0.45,
                radius: Math.random() * 1.8 + 0.8,
                alpha: Math.random() * 0.5 + 0.2
            });
        }
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Mouse tracking for subtle hover repulsion/connection
    let mouse = { x: null, y: null, radius: 100 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    let animationFrameId;

    function render() {
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            p.x += p.vx;
            p.y += p.vy;

            // Bounce off edges smoothly
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            // Draw particle dot
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 242, 254, ${p.alpha})`;
            ctx.fill();

            // Connect lines between nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDistance) {
                    const lineAlpha = (1 - dist / maxDistance) * 0.18;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 242, 254, ${lineAlpha})`;
                    ctx.lineWidth = 0.75;
                    ctx.stroke();
                }
            }

            // Connect to mouse if close
            if (mouse.x !== null && mouse.y !== null) {
                const mdx = p.x - mouse.x;
                const mdy = p.y - mouse.y;
                const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

                if (mdist < mouse.radius) {
                    const mAlpha = (1 - mdist / mouse.radius) * 0.3;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(59, 130, 246, ${mAlpha})`;
                    ctx.lineWidth = 0.9;
                    ctx.stroke();
                }
            }
        }

        animationFrameId = requestAnimationFrame(render);
    }

    // Handle tab visibility to save resources
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationFrameId);
        } else {
            animationFrameId = requestAnimationFrame(render);
        }
    });

    render();
}
