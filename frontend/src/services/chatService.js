import api from './api';

export const chatService = {
  async sendMessage(message) {
    try {
      const response = await api.post('/chat/send', { message });
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to send message');
      }
      return response.data;
    } catch (error) {
      console.error('Chat Service Error:', error);
      throw new Error(error.response?.data?.message || 'Failed to send message');
    }
  },

  async getChatHistory() {
    try {
      const response = await api.get('/chat/history');
      return response.data;
    } catch (error) {
      console.error('Chat History Error:', error);
      throw new Error('Failed to load chat history');
    }
  },

  async deleteMessage(messageId) {
    try {
      const response = await api.delete(`/chat/message/${messageId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete message');
    }
  },

  async clearChat() {
    try {
      const response = await api.delete('/chat/clear');
      return response.data;
    } catch (error) {
      throw new Error('Failed to clear chat');
    }
  },
};