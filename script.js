class ChatApp {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendButton');
        
        // API 端點
        this.API_URL = 'https://free.churchless.tech/v1/chat/completions';
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
    }

    async sendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;

        // 顯示用戶訊息
        this.addMessage(message, 'user');
        this.userInput.value = '';

        // 顯示正在輸入指示器
        const typingIndicator = this.addTypingIndicator();

        try {
            const response = await this.getAIResponse(message);
            // 移除輸入指示器
            typingIndicator.remove();
            // 顯示 AI 回應
            this.addMessage(response, 'ai');
        } catch (error) {
            console.error('Error:', error);
            typingIndicator.remove();
            this.addMessage('抱歉，發生錯誤。請稍後再試。', 'ai');
        }
    }

    async getAIResponse(message) {
        const requestBody = {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: message
                }
            ]
        };

        try {
            const response = await fetch(this.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${type}-message`);
        messageDiv.textContent = content;
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
        return messageDiv;
    }

    addTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.classList.add('typing-indicator');
        indicator.textContent = 'AI 正在輸入...';
        this.chatMessages.appendChild(indicator);
        this.scrollToBottom();
        return indicator;
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

// 初始化應用
document.addEventListener('DOMContentLoaded', () => {
    new ChatApp();
}); 