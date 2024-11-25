// AI 聊天功能
class ChatBot {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendButton');
        
        // API 設定
        this.API_URL = 'https://free.v36.cm/v1/chat/completions';
        this.API_KEY = 'sk-SKQwX8gxsXOAmbc1793831B370C347C6Ae878a31431358D4';
        
        // 綁定事件
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // 初始歡迎訊息
        this.addMessage("您好！我是 AI 助手，有什麼我可以幫您的嗎？", 'ai');
    }

    async sendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;

        // 顯示使用者訊息
        this.addMessage(message, 'user');
        this.userInput.value = '';

        try {
            // 顯示載入中
            const loadingMessage = this.addMessage('正在思考...', 'ai');
            
            // 發送 API 請求
            const response = await fetch(this.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.API_KEY}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{
                        role: 'user',
                        content: message
                    }]
                })
            });

            if (!response.ok) {
                throw new Error('API 請求失敗');
            }

            const data = await response.json();
            
            // 移除載入訊息
            loadingMessage.remove();
            
            // 顯示 AI 回應
            this.addMessage(data.choices[0].message.content, 'ai');

        } catch (error) {
            console.error('錯誤:', error);
            this.addMessage('抱歉，發生了一些錯誤。請稍後再試。', 'ai');
        }
    }

    addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${type}-message`);
        
        // 創建訊息內容
        const textDiv = document.createElement('div');
        textDiv.classList.add('message-text');
        textDiv.textContent = text;
        
        messageDiv.appendChild(textDiv);
        this.chatMessages.appendChild(messageDiv);
        
        // 滾動到最新訊息
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        
        return messageDiv;
    }
}

// 切換聊天窗口
function toggleChat() {
    const chatContainer = document.querySelector('.ai-chat-container');
    chatContainer.classList.toggle('minimized');
    
    const minimizeBtn = document.querySelector('.minimize-btn');
    minimizeBtn.textContent = chatContainer.classList.contains('minimized') ? '+' : '−';
}

// 初始化聊天機器人
document.addEventListener('DOMContentLoaded', () => {
    new ChatBot();
}); 