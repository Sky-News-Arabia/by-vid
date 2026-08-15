/**
 * ============================================================
 * BY VID - LANDING PAGE SCRIPT (FIXED VERSION)
 * ============================================================
 * این نسخه مشکل اسکرول به بالای صفحه را به طور کامل حل می‌کند
 */

// ============================================================
// تنظیم لینک دانلود
// ============================================================
const APK_URL = 'https://urlto.me/byvid';

// ============================================================
// اجرای کدها پس از بارگذاری کامل صفحه
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    console.log('🚀 BY VID - Landing Page Loaded');
    console.log('📥 Download URL:', APK_URL);

    // ============================================================
    // بخش 1: راه‌اندازی دکمه‌های دانلود (اصلاح شده)
    // ============================================================
    
    // پیدا کردن تمام دکمه‌های دانلود
    var downloadButtons = document.querySelectorAll('[data-download]');
    
    console.log('🔍 تعداد دکمه‌های دانلود:', downloadButtons.length);

    if (downloadButtons.length === 0) {
        console.warn('⚠️ هیچ دکمه دانلودی پیدا نشد!');
        return;
    }

    // برای هر دکمه، یک رویداد کلیک تعریف کن
    downloadButtons.forEach(function(button, index) {
        // حذف هر گونه رویداد کلیک قبلی
        var newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // اضافه کردن رویداد کلیک جدید با جلوگیری کامل از رفتار پیش‌فرض
        newButton.addEventListener('click', function(event) {
            // جلوگیری کامل از رفتار پیش‌فرض (اسکرول به بالا)
            event.preventDefault();
            event.stopPropagation();
            
            console.log('📥 کلیک روی دکمه دانلود شماره ' + (index + 1));
            
            // شروع دانلود
            startDownload(APK_URL);
            
            // بازگشت false برای اطمینان بیشتر
            return false;
        });
        
        // اضافه کردن ویژگی‌های کمکی
        newButton.setAttribute('role', 'button');
        newButton.setAttribute('aria-label', 'دانلود اپلیکیشن BY VID');
        
        console.log('✅ دکمه شماره ' + (index + 1) + ' آماده شد');
    });

    // ============================================================
    // تابع شروع دانلود (مشترک برای همه دکمه‌ها)
    // ============================================================
    function startDownload(url) {
        // بررسی اعتبار لینک
        if (!url || url === '') {
            console.error('❌ خطا: لینک دانلود خالی است!');
            alert('متأسفانه لینک دانلود در دسترس نیست.');
            return;
        }
        
        console.log('📥 شروع دانلود از:', url);
        
        // روش 1: استفاده از لینک مخفی (بهترین روش)
        try {
            var link = document.createElement('a');
            link.href = url;
            link.download = 'by-vid.apk';
            link.style.display = 'none';
            link.target = '_blank';
            
            document.body.appendChild(link);
            link.click();
            
            // حذف لینک بعد از کلیک
            setTimeout(function() {
                document.body.removeChild(link);
            }, 100);
            
            console.log('✅ دانلود با موفقیت شروع شد!');
            return true;
            
        } catch (error) {
            console.warn('⚠️ روش اول دانلود با خطا مواجه شد:', error);
            
            // روش 2: باز کردن در پنجره جدید
            try {
                window.open(url, '_blank');
                console.log('✅ دانلود با روش جایگزین شروع شد!');
                return true;
            } catch (fallbackError) {
                console.error('❌ خطا در دانلود:', fallbackError);
                alert('متأسفانه دانلود با مشکل مواجه شد.\nلطفاً از لینک زیر استفاده کنید:\n' + url);
                return false;
            }
        }
    }

    // ============================================================
    // بخش 2: منوی همبرگری (موبایل)
    // ============================================================
    var hamburger = document.querySelector('.header__hamburger');
    var mobileMenu = document.querySelector('.header__mobile-menu');

    if (hamburger && mobileMenu) {
        // باز و بسته کردن منو
        hamburger.addEventListener('click', function() {
            var isOpen = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isOpen);
            mobileMenu.classList.toggle('header__mobile-menu--open');
            document.body.style.overflow = isOpen ? '' : 'hidden';
        });

        // بستن منو با کلیک روی لینک‌ها
        var mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(function(link) {
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
    // بخش 3: هدر چسبنده
    // ============================================================
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

    // ============================================================
    // بخش 4: انیمیشن fade-in
    // ============================================================
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

    // ============================================================
    // بخش 5: اسکرول نرم (برای لینک‌های داخلی)
    // ============================================================
    var navLinks = document.querySelectorAll('a[href^="#"]:not([data-download])');
    
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

    // ============================================================
    // بخش 6: به‌روزرسانی سال در فوتر
    // ============================================================
    var footerYear = document.querySelector('.footer__copyright p');
    if (footerYear) {
        var currentYear = new Date().getFullYear();
        footerYear.textContent = '© ' + currentYear + ' BY VID. جميع الحقوق محفوظة.';
    }

    // ============================================================
    // پیام نهایی
    // ============================================================
    console.log('✅ همه چیز آماده است!');
    console.log('📱 لینک دانلود:', APK_URL);
    console.log('💡 برای تغییر لینک، متغیر APK_URL را در خط 11 ویرایش کنید.');
});

// ============================================================
// صادر کردن
// ============================================================
export { APK_URL };
