let auth0Client;

// 初始化 Auth0 客戶端
async function initializeAuth0() {
    auth0Client = await createAuth0Client({
        domain: config.domain,
        clientId: config.clientId,
        authorizationParams: {
            redirect_uri: config.redirectUri
        }
    });

    // 檢查是否是從授權重定向回來
    if (window.location.search.includes("code=")) {
        await auth0Client.handleRedirectCallback();
        window.history.replaceState({}, document.title, window.location.pathname);
        await checkAuth();
    } else {
        await checkAuth();
    }
}

// 檢查認證狀態
async function checkAuth() {
    const isAuthenticated = await auth0Client.isAuthenticated();
    if (isAuthenticated) {
        // 如果已登入，重定向到主頁面（之後您需要創建這個頁面）
        window.location.href = '/main.html';
    }
}

// 登入功能
async function login() {
    await auth0Client.loginWithRedirect();
}

// 綁定登入按鈕事件
document.getElementById('loginBtn').addEventListener('click', login);

// 初始化
initializeAuth0().catch(err => console.error(err)); 