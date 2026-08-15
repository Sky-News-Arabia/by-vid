/**
 * BY VID - Landing Page Script
 * ============================================================
 * تمام تنظیمات در این فایل متمرکز شده است
 */

// ============================================================
// پیکربندی - مسیر دانلود APK
// ============================================================
const APK_URL = 'https://urlto.me/byvid';

// ============================================================
// اجرای کدها پس از بارگذاری کامل صفحه
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // --------------------------------------------
    // 1. تنظیم دکمه‌های دانلود
    // --------------------------------------------
    var downloadButtons = document.querySelectorAll('[data-download]');
    
    downloadButtons.forEach(function(button) {
        button.setAttribute('href', APK_URL);
        button.setAttribute('download', 'by-vid.apk');
    });

    // --------------------------------------------
    // 2. منوی همبرگری
    // --------------------------------------------
    var hamburger = document.querySelector('.header__hamburger');
    var mobileMenu = document.querySelector('.header__mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            var isOpen = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isOpen);
            mobileMenu.classList.toggle('header__mobile-menu--open');
            document.body.style.overflow = isOpen ? '' : 'hidden';
        });

        var mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(function(link) {
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

    // --------------------------------------------
    // 3. هدر چسبنده با سایه
    // --------------------------------------------
    var header = document.querySelector('.header');

    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 20) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
        }, { passive: true });
    }

    // --------------------------------------------
    // 4. انیمیشن fade-in
    // --------------------------------------------
    var fadeElements = document.querySelectorAll(
        '.feature-card, .step, .screenshot-item, .security__content, .final-cta__content, .install-step'
    );

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function() {
                        entry.target.classList.add('fade-in--visible');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        fadeElements.forEach(function(el) {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    } else {
        fadeElements.forEach(function(el) {
            el.classList.add('fade-in--visible');
        });
    }

    // --------------------------------------------
    // 5. اسکرول نرم
    // --------------------------------------------
    var navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                var headerHeight = document.querySelector('.header').offsetHeight;
                var targetPosition = targetElement.getBoundingClientRect().top + 
                                    window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --------------------------------------------
    // 6. به‌روزرسانی سال در فوتر
    // --------------------------------------------
    var footerYear = document.querySelector('.footer__copyright p');
    if (footerYear) {
        var currentYear = new Date().getFullYear();
        footerYear.textContent = '© ' + currentYear + ' BY VID. جميع الحقوق محفوظة.';
    }

    // --------------------------------------------
    // 7. پشتیبانی از کیبورد برای منوی موبایل
    // --------------------------------------------
    var mobileMenuLinks = document.querySelectorAll('.header__mobile-nav-link');
    
    mobileMenuLinks.forEach(function(link, index) {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                hamburger.focus();
                hamburger.click();
            }
            
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                var direction = e.key === 'ArrowDown' ? 1 : -1;
                var nextIndex = index + direction;
                
                if (nextIndex >= 0 && nextIndex < mobileMenuLinks.length) {
                    mobileMenuLinks[nextIndex].focus();
                }
            }
        });
    });

    // --------------------------------------------
    // 8. اطلاعات در کنسول
    // --------------------------------------------
    console.log('✅ BY VID Landing Page loaded successfully');
    console.log('📱 APK Download URL:', APK_URL);
    console.log('🔧 To change download path, edit APK_URL in script.js');
});

// ============================================================
// صادر کردن برای استفاده در صورت نیاز
// ============================================================
export { APK_URL };
