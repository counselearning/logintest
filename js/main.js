let auth0Client;

// 初始化 Auth0 客戶端
async function initializeAuth0() {
    try {
        auth0Client = await auth0.createAuth0Client({
            domain: config.domain,
            clientId: config.clientId,
            authorizationParams: {
                redirect_uri: config.redirectUri
            }
        });

        // 檢查是否已登入
        const isAuthenticated = await auth0Client.isAuthenticated();
        if (!isAuthenticated) {
            window.location.href = 'index.html';
        }
    } catch (err) {
        console.error("Auth0初始化錯誤:", err);
        window.location.href = 'index.html';
    }
}

// 登出功能
async function logout() {
    try {
        await auth0Client.logout({
            logoutParams: {
                returnTo: "https://counselearning.github.io/logintest/"
            }
        });
    } catch (err) {
        console.error("登出錯誤:", err);
    }
}

// 綁定登出按鈕事件
document.getElementById('logoutBtn').addEventListener('click', logout);

// 初始化
window.addEventListener('load', () => {
    initializeAuth0().catch(err => {
        console.error("初始化錯誤:", err);
        window.location.href = 'index.html';
    });
}); 