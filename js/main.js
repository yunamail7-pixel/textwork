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
                    const rect = toggle.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;

                    // 如果點擊是在右側指示器區域（預留 40px），則切換選單而不跳轉
                    if (clickX > rect.width - 60) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    }
                    // 否則點擊文字區域，執行默認跳轉動作
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
    // --- Phase 4: Accessibility & Dark Mode ---
    const setupAccessibility = () => {
        const navbarContainer = document.querySelector('.navbar .container');
        if (!navbarContainer) return;

        // Create UI controls container
        const controls = document.createElement('div');
        controls.className = 'nav-controls';
        controls.style.display = 'flex';
        controls.style.alignItems = 'center';
        controls.style.gap = '1rem';
        controls.style.marginLeft = '1.5rem';

        // Dark Mode Toggle
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle btn-icon';
        themeToggle.setAttribute('aria-label', '切換深淺模式');
        themeToggle.innerHTML = '<i data-lucide="moon" size="20"></i>';

        // Font Size Controls
        const fontControls = document.createElement('div');
        fontControls.style.display = 'flex';
        fontControls.style.alignItems = 'center';
        fontControls.style.gap = '0.5rem';
        fontControls.style.borderLeft = '1px solid var(--border)';
        fontControls.style.paddingLeft = '1rem';

        const btnFontIncr = document.createElement('button');
        btnFontIncr.className = 'btn-icon';
        btnFontIncr.innerHTML = '<span style="font-weight: 700; font-size: 1.1rem;">A+</span>';
        btnFontIncr.setAttribute('aria-label', '字體放大');

        const btnFontDecr = document.createElement('button');
        btnFontDecr.className = 'btn-icon';
        btnFontDecr.innerHTML = '<span style="font-weight: 500; font-size: 0.8rem;">A-</span>';
        btnFontDecr.setAttribute('aria-label', '字體縮小');

        fontControls.appendChild(btnFontDecr);
        fontControls.appendChild(btnFontIncr);

        controls.appendChild(themeToggle);
        controls.appendChild(fontControls);

        // Responsive handling
        if (window.innerWidth > 768) {
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                // Insert BEFORE nav-menu for better balance
                navbarContainer.insertBefore(controls, navMenu.nextSibling);
            } else {
                navbarContainer.appendChild(controls);
            }
        } else {
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                controls.style.margin = '2rem 0 0 0';
                controls.style.width = '100%';
                controls.style.justifyContent = 'space-between';
                navMenu.appendChild(controls);
            }
        }


        // Theme Logic
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);

        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
                if (window.lucide) lucide.createIcons();
            }
        }

        // Font Scale Logic
        let fontScale = parseFloat(localStorage.getItem('fontScale')) || 1.0;
        document.documentElement.style.setProperty('--font-scale', fontScale);

        btnFontIncr.addEventListener('click', () => {
            if (fontScale < 1.4) {
                fontScale += 0.1;
                updateFontScale();
            }
        });

        btnFontDecr.addEventListener('click', () => {
            if (fontScale > 0.8) {
                fontScale -= 0.1;
                updateFontScale();
            }
        });

        function updateFontScale() {
            document.documentElement.style.setProperty('--font-scale', fontScale);
            localStorage.setItem('fontScale', fontScale);
        }

        if (window.lucide) lucide.createIcons();
    };

    setupAccessibility();
});
