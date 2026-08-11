/**
 * ============================================================
 * پیکربندی BY VID
 * ============================================================
 */

const APK_URL = './download/by-vid.apk';

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ============================================================
    // ۱. تنظیم مسیر دانلود
    // ============================================================
    const downloadButtons = document.querySelectorAll('[data-download]');
    
    downloadButtons.forEach(button => {
        button.setAttribute('href', APK_URL);
        button.setAttribute('download', 'by-vid.apk');
        
        button.addEventListener('click', function(e) {
            console.log('📥 Download initiated:', APK_URL);
        });
    });
    
    // ============================================================
    // ۲. منوی همبرگری
    // ============================================================
    const hamburger = document.querySelector('.header__hamburger');
    const mobileMenu = document.querySelector('.header__mobile-menu');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            const isOpen = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isOpen);
            mobileMenu.classList.toggle('header__mobile-menu--open');
            document.body.style.overflow = isOpen ? '' : 'hidden';
        });
        
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.setAttribute('aria-expanded', 'false');
                mobileMenu.classList.remove('header__mobile-menu--open');
                document.body.style.overflow = '';
            });
        });
        
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.setAttribute('aria-expanded', 'false');
                mobileMenu.classList.remove('header__mobile-menu--open');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ============================================================
    // ۳. هدر چسبنده
    // ============================================================
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 20) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
        }, { passive: true });
    }
    
    // ============================================================
    // ۴. انیمیشن fade-in
    // ============================================================
    const fadeElements = document.querySelectorAll(
        '.feature-card, .step, .screenshot-item, .security__content, .final-cta__content, .install-step'
    );
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in--visible');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        fadeElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    } else {
        fadeElements.forEach(el => {
            el.classList.add('fade-in--visible');
        });
    }
    
    // ============================================================
    // ۵. اسکرول نرم
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + 
                                      window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================================
    // ۶. به‌روزرسانی سال
    // ============================================================
    const footerYear = document.querySelector('.footer__copyright p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.textContent = `© ${currentYear} BY VID. جميع الحقوق محفوظة.`;
    }
    
    // ============================================================
    // ۷. پشتیبانی از کیبورد
    // ============================================================
    const mobileMenuLinks = document.querySelectorAll('.header__mobile-nav-link');
    mobileMenuLinks.forEach((link, index) => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                hamburger.focus();
                hamburger.click();
            }
            
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                const direction = e.key === 'ArrowDown' ? 1 : -1;
                const nextIndex = index + direction;
                
                if (nextIndex >= 0 && nextIndex < mobileMenuLinks.length) {
                    mobileMenuLinks[nextIndex].focus();
                }
            }
        });
    });
    
    console.log('✅ BY VID Landing Page loaded successfully');
    console.log(`📱 APK Download URL: ${APK_URL}`);
});

export { APK_URL };
