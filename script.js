/**
 * ============================================================
 * پیکربندی BY VID
 * ============================================================
 * تمام تنظیمات در یک مکان متمرکز شده است.
 * برای تغییر مسیر دانلود، فقط این متغیر را ویرایش کنید.
 */

// ============================================================
// پیکربندی - مسیر دانلود APK
// ============================================================
const APK_URL = './download/by-vid.apk';

/**
 * ============================================================
 * مدیریت دکمه‌های دانلود
 * ============================================================
 * تمام دکمه‌های دانلود از یک مسیر واحد استفاده می‌کنند.
 * با تغییر APK_URL، همه دکمه‌ها به‌روز می‌شوند.
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ============================================================
    // ۱. تنظیم مسیر دانلود برای همه دکمه‌ها
    // ============================================================
    const downloadButtons = document.querySelectorAll('[data-download]');
    
    downloadButtons.forEach(button => {
        button.setAttribute('href', APK_URL);
        button.setAttribute('download', 'by-vid.apk');
        
        // اضافه کردن event listener برای ردیابی (اختیاری)
        button.addEventListener('click', function(e) {
            // می‌توانید در اینجا کد ردیابی اضافه کنید
            // مثال: console.log('Download initiated:', APK_URL);
        });
    });
    
    // ============================================================
    // ۲. منوی همبرگری موبایل
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
        
        // بستن منو با کلیک روی لینک‌ها
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.setAttribute('aria-expanded', 'false');
                mobileMenu.classList.remove('header__mobile-menu--open');
                document.body.style.overflow = '';
            });
        });
        
        // بستن منو با کلیک خارج از آن
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.setAttribute('aria-expanded', 'false');
                mobileMenu.classList.remove('header__mobile-menu--open');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ============================================================
    // ۳. هدر چسبنده با تغییر سایه در اسکرول
    // ============================================================
    const header = document.querySelector('.header');
    let lastScrollY = 0;
    
    if (header) {
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 20) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
            
            lastScrollY = currentScrollY;
        }, { passive: true });
    }
    
    // ============================================================
    // ۴. انیمیشن fade-in با Intersection Observer
    // ============================================================
    const fadeElements = document.querySelectorAll('.feature-card, .step, .screenshot-item, .security__content, .final-cta__content');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // افزودن تاخیر برای ایجاد افکت آبشاری
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
        // Fallback برای مرورگرهای قدیمی
        fadeElements.forEach(el => {
            el.classList.add('fade-in--visible');
        });
    }
    
    // ============================================================
    // ۵. اسکرول نرم برای لینک‌های داخلی
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================================
    // ۶. به‌روزرسانی سال در فوتر
    // ============================================================
    const footerYear = document.querySelector('.footer__copyright p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.textContent = `© ${currentYear} BY VID. تمامی حقوق محفوظ است.`;
    }
    
    // ============================================================
    // ۷. پشتیبانی از کیبورد برای منوی موبایل
    // ============================================================
    const mobileMenuLinks = document.querySelectorAll('.header__mobile-nav-link');
    mobileMenuLinks.forEach((link, index) => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                hamburger.focus();
                hamburger.click();
            }
            
            // حرکت با کلیدهای جهت‌دار
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
    
    // ============================================================
    // ۸. لاگ اطلاعات در کنسول (برای توسعه‌دهندگان)
    // ============================================================
    console.log('✅ BY VID Landing Page loaded successfully');
    console.log(`📱 APK Download URL: ${APK_URL}`);
    console.log('🔧 To change download path, edit APK_URL in script.js');
});

// ============================================================
// صادر کردن برای استفاده در صورت نیاز
// ============================================================
export { APK_URL };
