---
description: 將專案上傳至 GitHub 的標準作業程序
---

1. **檢查 Git 狀態**
   - 執行 `git status` 檢查當前目錄是否為 git 倉庫。
   - 如果出現 "not a git repository"，請執行 `git init` 初始化倉庫。

2. **檢查並設定遠端倉庫 (Remote)**
   - 執行 `git remote -v` 查看是否已設定遠端位置。
   - **如果沒有輸出 (即未設定 remote)**：
     - 如果用戶曾在對話中提供 GitHub 網址，請使用該網址。
     - 否則，請**暫停並詢問用戶**：「請提供您的 GitHub Repository 網址 (例如 https://github.com/user/repo.git)」。
     - 取得網址後，執行 `git remote add origin <URL>`。
   - **如果有輸出**：
     - 確認 remote url 是否正確 (可詢問用戶確認)。
     
3. **提交變更 (Commit)**
   - 執行 `git add .` 將所有檔案加入暫存區。
   - 執行 `git commit -m "Update project"` (或詢問用戶特定的 commit 訊息)。
     - *注意：若 `git status` 顯示 "nothing to commit, working tree clean"，則跳過此步驟。*

4. **推送到 GitHub (Push)**
   - 執行 `git branch -M main` 確保主分支名稱為 main。
   - 執行 `git push -u origin main`。
   - **如果推送失敗**：
     - 若錯誤為 "non-fast-forward"，表示遠端有新版本。請詢問用戶是否要 `git pull --rebase` 或強制推送 (僅限確定的情況)。
     - 若錯誤為權限問題 (Authentication failed)，請提示用戶檢查 GitHub 登入資訊或 Token。
