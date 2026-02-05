// ハンバーガーメニューの動作
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('.nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            // ハンバーガーメニューの状態を切り替え
            hamburger.classList.toggle('active');
            nav.classList.toggle('mobile-open');
            
            // ボディのスクロールを制御
            if (nav.classList.contains('mobile-open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // メニューリンクをクリックしたときにメニューを閉じる（内部リンクのみ）
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // 内部リンク（#で始まる）の場合のみメニューを閉じる
                if (this.getAttribute('href').startsWith('#')) {
                    hamburger.classList.remove('active');
                    nav.classList.remove('mobile-open');
                    document.body.style.overflow = '';
                }
                // 外部リンクの場合は少し遅延してメニューを閉じる
                else {
                    setTimeout(() => {
                        hamburger.classList.remove('active');
                        nav.classList.remove('mobile-open');
                        document.body.style.overflow = '';
                    }, 200);
                }
            });
        });
        
        // ウィンドウサイズが変更されたときの処理
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768) {
                hamburger.classList.remove('active');
                nav.classList.remove('mobile-open');
                document.body.style.overflow = '';
            }
        });
        
        // メニュー外をクリックした時にメニューを閉じる
        document.addEventListener('click', function(e) {
            if (nav.classList.contains('mobile-open')) {
                if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
                    hamburger.classList.remove('active');
                    nav.classList.remove('mobile-open');
                    document.body.style.overflow = '';
                }
            }
        });
    }
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 画像の遅延読み込み
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// チケットボタンのクリック効果
document.querySelector('.ticket-button')?.addEventListener('click', function() {
    // チケットページへの遷移
    window.location.href = 'pages/ticket.html';
});