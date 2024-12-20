# Auth0 登入示範

這是一個使用Auth0進行身份驗證的示範網站。

## 功能
- 使用Auth0進行用戶認證
- 單頁應用程式（SPA）設計
- 安全的登入流程

## 設定步驟

1. 在Auth0 Dashboard創建新應用程式
2. 複製您的Auth0域名和Client ID
3. 在 `js/auth_config.js` 中更新設定：
   ```javascript
   const config = {
       domain: "YOUR_AUTH0_DOMAIN",
       clientId: "YOUR_CLIENT_ID",
       redirectUri: window.location.origin + window.location.pathname
   };
   ```

## 本地開發
1. 使用本地伺服器運行專案（例如 Live Server）
2. 確保在Auth0設定中添加了 `http://localhost:3000` 作為允許的回調URL

## GitHub Pages部署
1. 在儲存庫設定中啟用GitHub Pages
2. 選擇部署分支（通常是 `main` 或 `master`）
3. 確保在Auth0設定中添加了正確的GitHub Pages URL作為允許的回調URL #   l o g i n t e s t  
 