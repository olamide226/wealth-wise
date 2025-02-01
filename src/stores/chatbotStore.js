import { defineStore } from 'pinia'

export const useChatbotStore = defineStore('chatbot', {
    state: () => ({
        messages: [],
        lastMessageId: 0
    }),

    actions: {
        addMessage(message) {
            this.lastMessageId++
            this.messages.push({
                ...message,
                id: this.lastMessageId
            })
            this.saveToStorage()
        },

        saveToStorage() {
            localStorage.setItem('chatbot-messages', JSON.stringify(this.messages))
            localStorage.setItem('chatbot-lastId', this.lastMessageId.toString())
        },

        hydrate() {
            const messages = localStorage.getItem('chatbot-messages')
            const lastId = localStorage.getItem('chatbot-lastId')

            if (messages) {
                this.messages = JSON.parse(messages)
                this.lastMessageId = parseInt(lastId || '0')
            }
        }
    }
})