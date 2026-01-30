// 資料管理邏輯
const DATA_KEYS = {
    NEWS: 'xinyun_news_data',
    STORIES: 'xinyun_stories_data'
};

// 初始模擬數據
const initialNews = [
    {
        id: 1,
        date: '2026-02-15',
        title: '【活動】「愛在心雲」慈善義賣會 - 讓清寒學子安心就學',
        category: '活動快訊',
        summary: '誠摯邀請您參與我們的年度慈善義賣，所得將全數撥入「清寒學生助學基金」，幫助貧困學子減輕經濟負擔...',
        content: '誠摯邀請您參與我們的年度慈善義賣，所得將全數撥入「清寒學生助學基金」，幫助貧困學子減輕經濟負擔。活動將於 2/15 在台北車站南二門廣場舉行，當天會有許多公益大使共襄盛舉，歡迎大家大手牽小手，一起來做公益，讓愛延續！'
    },
    {
        id: 2,
        date: '2026-03-01',
        title: '【公告】偏鄉數位教學與陪伴志工招募中',
        category: '服務成果',
        summary: '我們正在招募具備數位專長或熱愛教學的志工，透過遠端系統陪伴孩童成長，跨越地理的限制，傳遞知識的力量...',
        content: '我們正在招募具備數位專長或熱愛教學的志工，透過遠端系統陪伴孩童成長，跨越地理的限制，傳遞知識的力量。無論您是有經驗的教師，還是熱心的大學生，只要您願意撥出一點點時間，都能成為孩子生命中的光。報名網址見內文公告。'
    }
];

const initialStories = [
    {
        id: 1,
        location: '新北山區',
        category: '弱勢關懷',
        title: '獨居不孤單：林阿嬤的溫暖午餐',
        summary: '高齡 85 歲的林阿嬤獨自居住在偏遠山區，自從基金會的送餐服務接入後，阿嬤不僅每天能吃到熱騰騰的飯菜...',
        content: '高齡 85 歲的林阿嬤獨自居住在偏遠山區，自從基金會的送餐服務接入後，阿嬤不僅每天能吃到熱騰騰的飯菜，更有志工定期的關懷陪伴。阿嬤說：「以前煮一鍋菜要吃三天，現在每天都有新鮮的午餐送上來，還有志工跟我聊天，心裡真的暖暖的。」',
        image: 'images/care_delivery.png'
    },
    {
        id: 2,
        location: '屏東偏鄉',
        category: '教育推廣',
        title: '翻轉未來的筆記本：小明的數位學習路',
        summary: '在資源小組的協助下，小明透過基金會提供的數位教室與線上導師，克服了城鄉差距的隔閡...',
        content: '在資源小組的協助下，小明透過基金會提供的數位教室與線上導師，克服了城鄉差距的隔閡。數位學習不僅帶給他知識，更給了他看見世界的窗。如今的他已能在全國青少年程式競賽中大放異彩，這是我們最樂見的成長。',
        image: 'images/education_mentor.png'
    }
];

// 初始化資料庫
function initDB() {
    if (!localStorage.getItem(DATA_KEYS.NEWS)) {
        localStorage.setItem(DATA_KEYS.NEWS, JSON.stringify(initialNews));
    }
    if (!localStorage.getItem(DATA_KEYS.STORIES)) {
        localStorage.setItem(DATA_KEYS.STORIES, JSON.stringify(initialStories));
    }
    renderAll();
}

// XSS 防護
function escapeHtml(text) {
    if (!text) return text;
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// 渲染所有列表
function renderAll() {
    renderNews();
    renderStories();
}

// 消息渲染
function renderNews() {
    let news = [];
    try {
        news = JSON.parse(localStorage.getItem(DATA_KEYS.NEWS)) || [];
    } catch (e) {
        console.error('Failed to parse news data', e);
        news = [];
    }

    const tbody = document.getElementById('newsTableBody');
    if (!tbody) return;

    if (news.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">目前沒有最新消息</td></tr>';
        return;
    }

    tbody.innerHTML = news.map(item => `
        <tr>
            <td>${escapeHtml(item.date)}</td>
            <td style="font-weight:600;">${escapeHtml(item.title)}</td>
            <td><span class="badge">${escapeHtml(item.category)}</span></td>
            <td class="text-muted" style="font-size:0.85rem;">${escapeHtml(item.summary.substring(0, 30))}...</td>
            <td>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="action-btn" onclick="showDetail('NEWS', ${item.id})" title="預覽詳情" style="color: var(--primary);"><i data-lucide="eye" size="18"></i></button>
                    <button class="action-btn delete-btn" onclick="deleteItem('NEWS', ${item.id})" title="刪除"><i data-lucide="trash-2" size="18"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
    if (window.lucide) lucide.createIcons();
}

// 故事渲染
function renderStories() {
    let stories = [];
    try {
        stories = JSON.parse(localStorage.getItem(DATA_KEYS.STORIES)) || [];
    } catch (e) {
        console.error('Failed to parse stories data', e);
        stories = [];
    }

    const tbody = document.getElementById('storiesTableBody');
    if (!tbody) return;

    if (stories.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">目前沒有服務故事</td></tr>';
        return;
    }

    tbody.innerHTML = stories.map(item => `
        <tr>
            <td>${escapeHtml(item.location)}</td>
            <td><span class="badge">${escapeHtml(item.category)}</span></td>
            <td style="font-weight:600;">${escapeHtml(item.title)}</td>
            <td class="text-muted" style="font-size:0.85rem;">${escapeHtml(item.summary.substring(0, 30))}...</td>
            <td>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="action-btn" onclick="showDetail('STORIES', ${item.id})" title="預覽詳情" style="color: var(--primary);"><i data-lucide="eye" size="18"></i></button>
                    <button class="action-btn delete-btn" onclick="deleteItem('STORIES', ${item.id})" title="刪除"><i data-lucide="trash-2" size="18"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
    if (window.lucide) lucide.createIcons();
}

// 查看詳情
window.showDetail = function (type, id) {
    const data = JSON.parse(localStorage.getItem(DATA_KEYS[type])) || [];
    const item = data.find(i => i.id === id);
    if (!item) return;

    document.getElementById('modalTitle').textContent = item.title;
    document.getElementById('modalMeta').textContent = type === 'NEWS'
        ? `${item.date} | ${item.category}`
        : `${item.location} | ${item.category}`;
    document.getElementById('modalContent').textContent = item.content || '此項目目前沒有詳細內容。';

    document.getElementById('detailModal').style.display = 'flex';
    if (window.lucide) lucide.createIcons();
};

window.closeDetailModal = function () {
    document.getElementById('detailModal').style.display = 'none';
};

// 刪除項目
window.deleteItem = function (type, id) {
    if (!confirm('確定要刪除此項目嗎？此動作無法復原。')) return;
    try {
        const data = JSON.parse(localStorage.getItem(DATA_KEYS[type])) || [];
        const filtered = data.filter(item => item.id !== id);
        localStorage.setItem(DATA_KEYS[type], JSON.stringify(filtered));
        renderAll();
    } catch (e) {
        console.error('Delete failed', e);
        alert('刪除失敗，請重新整理頁面後再試。');
    }
};

// 表單處理
document.getElementById('newsForm')?.addEventListener('submit', (e) => {
    e.preventDefault();

    // 取得並修剪輸入值
    const title = document.getElementById('newsTitle').value.trim();
    const date = document.getElementById('newsDate').value;
    const category = document.getElementById('newsCategory').value;
    const summary = document.getElementById('newsSummary').value.trim();
    const content = document.getElementById('newsContent').value.trim();

    if (!title || !date || !summary) {
        alert('請填寫所有必填欄位');
        return;
    }

    const newData = {
        id: Date.now(),
        date,
        title,
        category,
        summary,
        content
    };

    try {
        const data = JSON.parse(localStorage.getItem(DATA_KEYS.NEWS)) || [];
        data.unshift(newData);
        localStorage.setItem(DATA_KEYS.NEWS, JSON.stringify(data));
        e.target.reset();
        document.getElementById('news-form-container').style.display = 'none';
        renderNews();
    } catch (e) {
        console.error('Save failed', e);
        alert('儲存失敗，可能是儲存空間已滿。');
    }
});

document.getElementById('storiesForm')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('storyTitle').value.trim();
    const location = document.getElementById('storyLocation').value.trim();
    const category = document.getElementById('storyCategory').value;
    const image = document.getElementById('storyImage').value.trim();
    const summary = document.getElementById('storySummary').value.trim();
    const content = document.getElementById('storyContent').value.trim();

    if (!title || !location || !image || !summary) {
        alert('請填寫所有必填欄位');
        return;
    }

    const newData = {
        id: Date.now(),
        location,
        category,
        title,
        summary,
        content,
        image
    };

    try {
        const data = JSON.parse(localStorage.getItem(DATA_KEYS.STORIES)) || [];
        data.unshift(newData);
        localStorage.setItem(DATA_KEYS.STORIES, JSON.stringify(data));
        e.target.reset();
        document.getElementById('stories-form-container').style.display = 'none';
        renderStories();
    } catch (e) {
        console.error('Save failed', e);
        alert('儲存失敗，可能是儲存空間已滿。');
    }
});

// 當頁面載入時初始化
document.addEventListener('DOMContentLoaded', initDB);
