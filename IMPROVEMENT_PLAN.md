# 網站提升與無障礙優化計畫

本文件詳細說明了針對心雲基金會網站進行的優化措施，包含已完成的修復以及未來的提升建議。

## 1. 已完成的優化 (Completed Optimizations)

### 1.1 字型調整功能修復 (Font Adjustment Fix)
*   **問題**: 網站上的「字體放大/縮小」按鈕雖然有 JavaScript 邏輯，但未與 CSS 連結，導致無反應。
*   **解決方案**: 在 `css/style.css` 中引入了 `html { font-size: calc(100% * var(--font-scale)); }`。這使得 JavaScript 設定的 `--font-scale` 變數能正確影響根元素的字體大小，進而透過 `rem` 單位縮放全站文字。

### 1.2 無障礙環境優化 (Accessibility Improvements)
*   **色彩對比度**: 將輔助文字顏色 (`--text-muted`) 從 `#475569` 加深至 `#334155`，以符合 WCAG AA 對比度標準，提升閱讀性。
*   **彈跳視窗 (Modal) 無障礙**:
    *   為詳情視窗 (`#publicDetailModal`) 加入 `role="dialog"`, `aria-modal="true"`, `aria-labelledby` 屬性。
    *   實作 **Focus Trap (焦點限制)**：當視窗開啟時，Tab 鍵焦點將被限制在視窗內，避免跳轉至背景內容。
    *   實作 **焦點還原**：關閉視窗後，焦點會自動回到原本觸發按鈕上，方便鍵盤使用者操作。
    *   支援 `Escape` 鍵快速關閉視窗。

### 1.3 程式碼整理與 SEO (Code Organization & SEO)
*   **SEO**: 在首頁加入 `<meta name="description">` 標籤，提升搜尋引擎對網站內容的理解。
*   **CSS Refactoring**: 將首頁 `index.html` 中關於 Hero Section 的大量行內樣式 (Inline CSS) 移至 `css/style.css`，保持 HTML 結構乾淨，利於維護。

## 2. 短期提升建議 (Short-term Recommendations)

### 2.1 全面 SEO 優化
*   **動作**: 為其餘頁面 (`about.html`, `services.html` 等) 添加獨特的 Meta Description 與 Title。
*   **目的**: 提升各個服務項目的搜尋能見度。

### 2.2 圖片無障礙檢查
*   **動作**: 全面檢查所有 `<img>` 標籤，確保裝飾性圖片有 `alt=""` (空字串)，而資訊性圖片有準確的描述文字。
*   **目的**: 確保螢幕閱讀器使用者能正確理解圖片內容。

### 2.3 鍵盤導覽測試
*   **動作**: 針對導覽列 (Navbar) 的下拉選單進行鍵盤操作測試，確保能完全使用鍵盤展開與收合選單。
*   **目的**: 完善無滑鼠使用者的體驗。

## 3. 長期規劃 (Long-term Roadmap)

### 3.1 效能優化 (Performance)
*   **圖片最佳化**: 引入 WebP 格式圖片，並實作 `srcset` 屬性以針對不同裝置提供適當大小的圖片。
*   **資源壓縮**: 建立自動化流程 (Build Process) 壓縮 CSS 與 JS 檔案。

### 3.2 內容管理系統 (CMS)
*   目前網站內容主要依賴 LocalStorage 模擬或靜態 HTML。建議未來導入輕量級 CMS (如 Strapi 或 WordPress Headless) 或整合後端 API，以便非技術人員能輕鬆更新最新消息與故事。

### 3.3 深色模式完善
*   目前已實作深色模式變數，建議進一步檢查所有元件在深色模式下的對比度與視覺表現，確保一致的舒適體驗。
