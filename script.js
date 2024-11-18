// AI 對話框功能
function toggleChat() {
    const messages = document.getElementById('chatMessages');
    const input = document.querySelector('.ai-chat-input');
    const button = document.querySelector('.minimize-btn');
    
    if (messages.style.display === 'none') {
        // 展開對話框
        messages.style.display = 'flex';
        input.style.display = 'flex';
        button.textContent = '−';  // 更改按鈕符號為減號
    } else {
        // 最小化對話框
        messages.style.display = 'none';
        input.style.display = 'none';
        button.textContent = '+';  // 更改按鈕符號為加號
    }
}

// 發送訊息功能
function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message) {
        // 添加用戶訊息
        addMessage(message, 'user');
        
        // 模擬AI回覆
        setTimeout(() => {
            const responses = [
                "我了解您的需求，讓我為您詳細說明。",
                "這是個很好的問題，我很樂意為您解答。",
                "感謝您的提問，我們可以這樣處理。",
                "我建議您可以考慮以下方案...",
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, 'ai');
        }, 1000);
        
        // 清空輸入框
        input.value = '';
    }
}

// 添加訊息到對話框
function addMessage(text, type) {
    const messages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = type === 'user' ? '👤' : '🤖';
    
    const textDiv = document.createElement('div');
    textDiv.className = 'text';
    textDiv.textContent = text;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(textDiv);
    messages.appendChild(messageDiv);
    
    // 滾動到最新訊息
    messages.scrollTop = messages.scrollHeight;
}

// 允許按Enter鍵發送訊息
document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// 確保DOM加載完成後初始化事件監聽器
document.addEventListener('DOMContentLoaded', function() {
    // 初始化輸入框的Enter鍵事件
    const input = document.getElementById('messageInput');
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}); 