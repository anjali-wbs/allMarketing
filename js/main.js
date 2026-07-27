document.addEventListener('DOMContentLoaded', () => {
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

    // Set active nav link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && currentPath.includes(href) && href !== 'index.html' && href !== './') {
            link.classList.add('active');
            // If inside a dropdown, highlight the parent too
            const parentItem = link.closest('.nav-item');
            if (parentItem) {
                const parentLink = parentItem.querySelector('.nav-link');
                if (parentLink) parentLink.classList.add('active');
            }
        } else if (href === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('index.html'))) {
            link.classList.add('active');
        }
    });
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
                        <li><a href="marketing.html" class="dropdown-link">Marketing</a></li>
                        <li><a href="search-engine-optimization.html" class="dropdown-link">Search Engine Optimization</a></li>
                        <li><a href="pay-per-click.html" class="dropdown-link">Pay Per Click</a></li>
                        <li><a href="social-media.html" class="dropdown-link">Social Media</a></li>
                        <li><a href="website-design.html" class="dropdown-link">Website Design</a></li>
                        <li><a href="graphic-design.html" class="dropdown-link">Graphic Design</a></li>
                        <li><a href="research-content.html" class="dropdown-link">Research & Content</a></li>
                        <li><a href="photography.html" class="dropdown-link">Photography</a></li>
                        <li><a href="videography.html" class="dropdown-link">Videography</a></li>
                    </ul>
                </li>
                <li class="nav-item"><a href="gallery.html" class="nav-link">Gallery</a></li>
                <li class="nav-item"><a href="contact.html" class="btn btn-primary" style="padding: 0.5rem 1.2rem; color: #fff;">Get Started!</a></li>
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
            <div class="footer-grid">
                <div class="footer-widget">
                    <h4>About Us</h4>
                    <p>All Marketing Experts is a boutique website design & SEO company located in Long Island, NY. We focus on providing personalized, numbers-driven business growth strategies and real transparency.</p>
                    <p>&copy; 2026 All Marketing Experts. All Rights Reserved.</p>
                </div>
                <div class="footer-widget">
                    <h4>Quick Links</h4>
                    <ul class="footer-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="company-profile.html">Company Profile</a></li>
                        <li><a href="testimonials.html">Testimonials</a></li>
                        <li><a href="gallery.html">Gallery</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                    </ul>
                </div>
                <div class="footer-widget">
                    <h4>Our Expertise</h4>
                    <ul class="footer-contact-info">
                        <li>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            <span>516-862-2653</span>
                        </li>
                        <li>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                            <span>info@allmarketingexperts.com</span>
                        </li>
                        <li>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            <span>Long Island, New York, NY</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <div>Designed for maximum performance and leads.</div>
                <div>
                    <a href="sitemap_index.xml" style="text-decoration: underline;">Sitemap</a>
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
