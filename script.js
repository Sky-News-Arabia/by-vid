// ============================================================
// ساده‌ترین نسخه - تضمینی
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    
    var url = 'https://urlto.me/byvid';
    
    document.querySelectorAll('[data-download]').forEach(function(btn) {
        btn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.open(url, '_blank');
            return false;
        };
    });
    
});
