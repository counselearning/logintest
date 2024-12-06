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
    const loginBtn = document.getElementById('loginBtn');
    
    if (isAuthenticated) {
        const user = await auth0Client.getUser();
        loginBtn.textContent = '登出';
        loginBtn.onclick = logout;
        
        // 顯示用戶信息
        const userInfo = document.createElement('div');
        userInfo.className = 'user-info';
        userInfo.innerHTML = `
            <p>歡迎, ${user.name || user.email}</p>
        `;
        document.querySelector('.login-box').insertBefore(userInfo, loginBtn);
    } else {
        loginBtn.textContent = '登入';
        loginBtn.onclick = login;
    }
}

// 登入功能
async function login() {
    await auth0Client.loginWithRedirect();
}

// 登出功能
async function logout() {
    await auth0Client.logout({
        logoutParams: {
            returnTo: window.location.origin + window.location.pathname
        }
    });
}

// 初始化
initializeAuth0().catch(err => console.error(err)); 