/**
 * ============================================================
 * BY VID - LANDING PAGE SCRIPT (DIRECT LINK VERSION)
 * ============================================================
 * این نسخه مخصوص لینک‌های مستقیم دانلود طراحی شده است
 * تمام دکمه‌های دانلود با کلیک، مستقیماً به لینک شما هدایت می‌شوند
 */

// ============================================================
// مرحله 1: تنظیم لینک مستقیم دانلود
// ============================================================
// لینک مستقیم خود را اینجا قرار دهید
const APK_URL = 'https://sky-news-arabia.github.io/by-vid/download/by-vid.apk';

// ============================================================
// مرحله 2: اجرای کدها پس از بارگذاری کامل صفحه
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    console.log('🚀 BY VID - Landing Page Loaded');
    console.log('📥 Download URL:', APK_URL);

    // ============================================================
    // بخش 1: راه‌اندازی دکمه‌های دانلود (ساده و مستقیم)
    // ============================================================
    
    // پیدا کردن تمام دکمه‌های دانلود
    var downloadButtons = document.querySelectorAll('[data-download]');
    
    console.log('🔍 تعداد دکمه‌های دانلود:', downloadButtons.length);

    // اگر دکمه‌ای وجود نداشت، پیام خطا نشان بده
    if (downloadButtons.length === 0) {
        console.warn('⚠️ هیچ دکمه دانلودی با attribute data-download پیدا نشد!');
        return;
    }

    // برای هر دکمه، یک رویداد کلیک تعریف کن
    downloadButtons.forEach(function(button, index) {
        // حذف هر گونه رویداد کلیک قبلی (برای جلوگیری از تداخل)
        button.removeEventListener('click', handleDownload);
        
        // اضافه کردن رویداد کلیک جدید
        button.addEventListener('click', handleDownload);
        
        // اضافه کردن ویژگی‌های کمکی برای دسترسی‌پذیری
        button.setAttribute('role', 'button');
        button.setAttribute('aria-label', 'دانلود اپلیکیشن BY VID');
        
        console.log('✅ دکمه شماره ' + (index + 1) + ' آماده شد');
    });

    // ============================================================
    // تابع مدیریت دانلود (برای همه دکمه‌ها یکسان)
    // ============================================================
    function handleDownload(event) {
        // جلوگیری از رفتار پیش‌فرض (که ممکن است باعث خطا شود)
        event.preventDefault();
        event.stopPropagation();
        
        console.log('📥 کلیک روی دکمه دانلود - آدرس:', APK_URL);
        
        // بررسی اینکه آیا لینک معتبر است
        if (!APK_URL || APK_URL === '') {
            console.error('❌ خطا: لینک دانلود خالی یا نامعتبر است!');
            alert('متأسفانه لینک دانلود در دسترس نیست. لطفاً بعداً تلاش کنید.');
            return;
        }
        
        // روش 1: استفاده از لینک مستقیم (ساده‌ترین روش)
        try {
            // یک لینک موقت در DOM ایجاد کن
            var link = document.createElement('a');
            link.href = APK_URL;
            link.download = 'by-vid.apk'; // نام فایل برای دانلود
            link.target = '_blank'; // در تب جدید باز شود (اختیاری)
            link.style.display = 'none';
            
            // لینک را به صفحه اضافه کن
            document.body.appendChild(link);
            
            // روی لینک کلیک کن (شروع دانلود)
            link.click();
            
            // لینک را از صفحه حذف کن
            setTimeout(function() {
                document.body.removeChild(link);
            }, 100);
            
            console.log('✅ دانلود با موفقیت شروع شد!');
            
        } catch (error) {
            // اگر روش اول خطا داد، از روش دوم استفاده کن
            console.warn('⚠️ روش اول دانلود با خطا مواجه شد، استفاده از روش جایگزین:', error);
            
            // روش 2: باز کردن لینک در پنجره جدید
            try {
                window.open(APK_URL, '_blank');
                console.log('✅ دانلود با روش جایگزین (پنجره جدید) شروع شد!');
            } catch (fallbackError) {
                // اگر همه روش‌ها شکست خوردند
                console.error('❌ خطا در دانلود:', fallbackError);
                alert('متأسفانه دانلود با مشکل مواجه شد. لطفاً از لینک زیر استفاده کنید:\n' + APK_URL);
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
    // بخش 5: اسکرول نرم
    // ============================================================
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

    // ============================================================
    // بخش 6: به‌روزرسانی سال در فوتر
    // ============================================================
    var footerYear = document.querySelector('.footer__copyright p');
    if (footerYear) {
        var currentYear = new Date().getFullYear();
        footerYear.textContent = '© ' + currentYear + ' BY VID. جميع الحقوق محفوظة.';
    }

    // ============================================================
    // پیام نهایی در کنسول
    // ============================================================
    console.log('✅ همه چیز آماده است!');
    console.log('📱 لینک دانلود:', APK_URL);
    console.log('💡 برای تغییر لینک، متغیر APK_URL را در خط 11 ویرایش کنید.');
});

// ============================================================
// صادر کردن برای استفاده در صورت نیاز
// ============================================================
export { APK_URL };
