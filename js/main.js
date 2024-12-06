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
            window.location.href = config.redirectUri;
            return;
        }

        // 獲取用戶信息
        const user = await auth0Client.getUser();
        displayUserInfo(user);

    } catch (err) {
        console.error("Auth0初始化錯誤:", err);
        window.location.href = config.redirectUri;
    }
}

// 顯示用戶信息
function displayUserInfo(user) {
    const navContent = document.querySelector('.nav-content');
    const userInfo = document.createElement('span');
    userInfo.className = 'user-info';
    userInfo.textContent = `歡迎, ${user.name || user.email}`;
    navContent.insertBefore(userInfo, document.getElementById('logoutBtn'));
}

// 登出功能
async function logout() {
    try {
        await auth0Client.logout({
            logoutParams: {
                returnTo: config.redirectUri
            }
        });
    } catch (err) {
        console.error("登出錯誤:", err);
    }
}

// 綁定登出按鈕事件
document.getElementById('logoutBtn').addEventListener('click', logout);

// 等待DOM載入完成後初始化
window.addEventListener('load', () => {
    initializeAuth0().catch(err => {
        console.error("初始化錯誤:", err);
        window.location.href = config.redirectUri;
    });
}); 