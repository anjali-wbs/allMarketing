document.addEventListener('DOMContentLoaded', () => {
    // Remove .html from browser address bar
    if (window.location.pathname.endsWith('.html')) {
        const cleanPath = window.location.pathname.slice(0, -5);
        window.history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
    }

    // Render Header and Footer
    renderHeader();
    renderFooter();

    // Shrink header on scroll
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    });

    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });
    }

    // Toggle dropdowns on mobile
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const dropdown = item.querySelector('.dropdown');
        
        if (dropdown && link) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
            });
        }
    });

    // Toggle sub-dropdowns (like Marketing) on mobile
    const submenus = document.querySelectorAll('.dropdown-submenu');
    submenus.forEach(submenu => {
        const link = submenu.querySelector('.dropdown-submenu-title');
        const list = submenu.querySelector('.submenu');
        
        if (list && link) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    if (!submenu.classList.contains('open')) {
                        e.preventDefault();
                        e.stopPropagation();
                        submenu.classList.add('open');
                    }
                }
            });
        }
    });

    // Set active nav link
    const currentPath = window.location.pathname.toLowerCase();
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');
    
    // Get the page name from the URL, e.g. "company-profile"
    const pathParts = currentPath.split('/');
    const lastPart = pathParts[pathParts.length - 1]; // e.g. "company-profile.html" or "company-profile"
    const currentPageName = lastPart.replace('.html', '') || 'index';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            const cleanHref = href.split('/').pop().replace('.html', '').toLowerCase();
            
            if (cleanHref && cleanHref === currentPageName && cleanHref !== 'index' && cleanHref !== '#' && cleanHref !== '') {
                link.classList.add('active');
                // Highlight parent items in the menu hierarchy
                let parent = link.parentElement;
                while (parent && !parent.classList.contains('nav-menu')) {
                    if (parent.classList.contains('nav-item')) {
                        const parentLink = parent.querySelector('.nav-link');
                        if (parentLink) parentLink.classList.add('active');
                    }
                    if (parent.classList.contains('dropdown-submenu')) {
                        const subTitle = parent.querySelector('.dropdown-submenu-title');
                        if (subTitle) subTitle.classList.add('active');
                    }
                    parent = parent.parentElement;
                }
            } else if ((href === 'index.html' || href === './' || href === '/') && (currentPageName === 'index' || currentPageName === '')) {
                link.classList.add('active');
            }
        }
    });

    // Typewriter Text Rotator for Homepage
    const typewriterElement = document.getElementById('typewriter-text');
    if (typewriterElement) {
        const words = ["WEBSITE DESIGN", "ONLINE MARKETING", "CORPORATE BRANDING", "AND MORE..."];
        let wordIndex = 0;
        let charIndex = 0;
        
        function type() {
            const currentWord = words[wordIndex];
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            
            let typeSpeed = 120;
            
            if (charIndex === currentWord.length) {
                // Pause at full word, then clear instantly and start next word
                setTimeout(() => {
                    typewriterElement.textContent = '';
                    charIndex = 0;
                    wordIndex = (wordIndex + 1) % words.length;
                    type();
                }, 2000);
                return;
            }
            
            setTimeout(type, typeSpeed);
        }
        
        setTimeout(type, 800);
    }
});

function renderHeader() {
    const headerHTML = `
    <header class="main-header">
        <div class="container header-container">
            <a href="index.html" class="logo">
                <img src="images/logo.png" alt="All Marketing Experts Logo" style="height: 50px; width: auto; object-fit: contain;">
            </a>
            <div class="menu-toggle" id="mobile-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul class="nav-menu">
                <li class="nav-item"><a href="index.html" class="nav-link">Home</a></li>
                <li class="nav-item">
                    <a href="#" class="nav-link">About Us <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
                    <ul class="dropdown">
                        <li><a href="company-profile.html" class="dropdown-link">Company Profile</a></li>
                        <li><a href="testimonials.html" class="dropdown-link">Testimonials</a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">Services <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
                    <ul class="dropdown">
                        <li><a href="branding.html" class="dropdown-link">Branding</a></li>
                        <li><a href="business-consulting.html" class="dropdown-link">Business Consulting</a></li>
                        <li class="dropdown-submenu">
                            <a href="marketing.html" class="dropdown-link dropdown-submenu-title" style="display: flex; align-items: center; justify-content: space-between;">Marketing <svg width="8" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(90deg); margin-left: 10px;"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
                            <ul class="submenu">
                                <li><a href="search-engine-optimization.html" class="dropdown-link">Search Engine Optimization</a></li>
                                <li><a href="pay-per-click.html" class="dropdown-link">Pay Per Click</a></li>
                                <li><a href="social-media.html" class="dropdown-link">Social Media</a></li>
                            </ul>
                        </li>
                        <li><a href="website-design.html" class="dropdown-link">Website Design</a></li>
                        <li><a href="graphic-design.html" class="dropdown-link">Graphic Design</a></li>
                        <li><a href="research-content.html" class="dropdown-link">Research & Content</a></li>
                        <li><a href="photography.html" class="dropdown-link">Photography</a></li>
                        <li><a href="videography.html" class="dropdown-link">Videography</a></li>
                    </ul>
                </li>
                <li class="nav-item"><a href="gallery.html" class="nav-link">Gallery</a></li>
            </ul>
        </div>
    </header>
    `;
    const target = document.getElementById('header-placeholder');
    if (target) {
        target.outerHTML = headerHTML;
    }
}

function renderFooter() {
    const footerHTML = `
    <footer class="main-footer">
        <div class="container">
            <div class="footer-grid-2">
                <div class="footer-widget">
                    <h4>About Us</h4>
                    <p>All Marketing Experts is a boutique website design & SEO company, located in New York. We want to show you what it’s like working with a dedicated team that actually takes the time to get to know you and your goals.</p>
                </div>
                <div class="footer-widget">
                    <h4>Quick links</h4>
                    <ul class="footer-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="company-profile.html">Company Profile</a></li>
                        <li><a href="gallery.html">Gallery</a></li>
                        <li><a href="contact.html">Sitemap</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-bottom-bar">
            <div class="container">
                <div class="footer-bottom-content">
                    ALL Marketing Experts &copy;2023. All Rights Reserved.
                </div>
            </div>
        </div>
    </footer>
    `;
    const target = document.getElementById('footer-placeholder');
    if (target) {
        target.outerHTML = footerHTML;
    }
}

