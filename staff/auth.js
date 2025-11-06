// ============================================
// Staff Authentication - Password Protection
// ============================================

/**
 * パスワード認証機能
 * スタッフ専用ページへのアクセス制御
 */
(function() {
    const PASSWORD = 'beengineercamp2025'; // パスワード（変更可能）
    const passwordOverlay = document.getElementById('passwordOverlay');
    const mainContent = document.getElementById('mainContent');
    const passwordInput = document.getElementById('passwordInput');
    const passwordBtn = document.getElementById('passwordBtn');
    const passwordError = document.getElementById('passwordError');
    
    // セッションストレージでログイン状態を保持
    if (sessionStorage.getItem('staffLoggedIn') === 'true') {
        showMainContent();
    }
    
    // Enterキーでログイン
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
    
    // ログインボタン
    passwordBtn.addEventListener('click', checkPassword);
    
    /**
     * パスワードをチェック
     */
    function checkPassword() {
        const inputValue = passwordInput.value;
        
        if (inputValue === PASSWORD) {
            sessionStorage.setItem('staffLoggedIn', 'true');
            showMainContent();
        } else {
            passwordError.classList.add('show');
            passwordInput.value = '';
            passwordInput.focus();
            
            // エラーメッセージを3秒後に非表示
            setTimeout(() => {
                passwordError.classList.remove('show');
            }, 3000);
        }
    }
    
    /**
     * メインコンテンツを表示
     */
    function showMainContent() {
        passwordOverlay.style.display = 'none';
        mainContent.classList.remove('content-hidden');
    }
})();

// ============================================
// 持ち物リストの開閉機能
// ============================================

/**
 * 持ち物リストのトグル機能を初期化
 */
function initStaffItemsToggle() {
    const itemsSection = document.querySelector('[data-staff-items]');
    
    if (!itemsSection) return;
    
    const header = itemsSection.querySelector('.staff-items-header');
    const content = itemsSection.querySelector('.staff-items-content');
    const toggleIcon = itemsSection.querySelector('.staff-items-toggle');
    
    if (!header || !content || !toggleIcon) return;
    
    // ヘッダーをクリックで開閉
    header.addEventListener('click', function() {
        const isOpen = itemsSection.classList.contains('active');
        
        if (isOpen) {
            // 閉じる
            itemsSection.classList.remove('active');
            content.style.maxHeight = '0';
            toggleIcon.style.transform = 'rotate(0deg)';
        } else {
            // 開く
            itemsSection.classList.add('active');
            content.style.maxHeight = content.scrollHeight + 'px';
            toggleIcon.style.transform = 'rotate(180deg)';
        }
    });
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', function() {
    initStaffItemsToggle();
});

