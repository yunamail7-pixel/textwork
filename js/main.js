document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);

        mobileToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = isActive ? 'hidden' : '';

            // Swap icons (Menu <-> X)
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', isActive ? 'x' : 'menu');
                lucide.createIcons();
            }
        });

        overlay.addEventListener('click', () => {
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';

            // Reset icon to menu
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    }

    // Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const overlay = document.querySelector('.nav-overlay');
        if (navMenu && navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !mobileToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Phase 2: Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Once revealed, stay revealed
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // --- Smart Navbar (Hide on scroll down, Show on scroll up) ---
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Prevent triggering at the very top (bounce effect fix)
        if (scrollTop <= 0) {
            navbar.classList.remove('hidden');
            lastScrollTop = scrollTop;
            return;
        }

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling Down -> Hide Navbar
            navbar.classList.add('hidden');
            document.body.classList.add('nav-hidden');

            // Also close mobile menu if it's open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const overlay = document.querySelector('.nav-overlay');
                if (overlay) overlay.classList.remove('active');
                document.body.style.overflow = '';
            }

        } else {
            // Scrolling Up -> Show Navbar
            navbar.classList.remove('hidden');
            document.body.classList.remove('nav-hidden');
        }

        lastScrollTop = scrollTop;
    });
});
