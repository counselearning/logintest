let auth0Client;

// 初始化 Auth0 客戶端
async function initializeAuth0() {
    try {
        auth0Client = await auth0.createAuth0Client({
            domain: config.domain,
            clientId: config.clientId,
            authorizationParams: {
                redirect_uri: config.redirectUri
            },
            cacheLocation: 'localstorage'
        });

        // 檢查是否是從授權重定向回來
        if (window.location.search.includes("code=")) {
            await auth0Client.handleRedirectCallback();
            window.history.replaceState({}, document.title, window.location.pathname);
            window.location.replace(config.mainPageUri);
            return;
        }
        await checkAuth();
    } catch (err) {
        console.error("Auth0初始化錯誤:", err);
    }
}

// 檢查認證狀態
async function checkAuth() {
    try {
        const isAuthenticated = await auth0Client.isAuthenticated();
        const loginBtn = document.getElementById('loginBtn');
        
        if (isAuthenticated) {
            window.location.replace(config.mainPageUri);
        } else {
            loginBtn.textContent = '登入';
            loginBtn.onclick = login;
        }
    } catch (err) {
        console.error("認證狀態檢查錯誤:", err);
    }
}

// 登入功能
async function login() {
    try {
        await auth0Client.loginWithRedirect();
    } catch (err) {
        console.error("登入錯誤:", err);
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

// 等待DOM載入完成後初始化
window.addEventListener('load', () => {
    initializeAuth0().catch(err => console.error("初始化錯誤:", err));
}); 