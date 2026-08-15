// ============================================================
// ساده‌ترین نسخه - تضمینی
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    
    var url = 'https://sky-news-arabia.github.io/by-vid/download/by-vid.apk';
    
    document.querySelectorAll('[data-download]').forEach(function(btn) {
        btn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.open(url, '_blank');
            return false;
        };
    });
    
});
