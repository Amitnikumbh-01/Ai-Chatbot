import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { chatService } from '../services/chatService';
import ChatHeader from '../components/chat/ChatHeader';
import ChatBox from '../components/chat/ChatBox';
import ChatInput from '../components/chat/ChatInput';
import Loader from '../components/common/Loader';
import toast from 'react-hot-toast';

const ChatPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    fetchChatHistory();
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchChatHistory = async () => {
    try {
      const history = await chatService.getChatHistory();
      setMessages(Array.isArray(history) ? history : []);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      toast.error('Failed to load chat history');
    } finally {
      setIsFetching(false);
    }
  };

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    try {
      setIsLoading(true);
      
      // Optimistically add user message
      const userMessage = {
        _id: Date.now().toString(), // Temporary ID
        role: 'user',
        content: message,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, userMessage]);

      // Send message to backend
      const response = await chatService.sendMessage(message);
      
      if (response.success && response.message) {
        // Add AI response
        const aiMessage = {
          _id: Date.now().toString() + '-ai',
          role: 'assistant',
          content: response.message,
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error('Invalid response from AI');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Remove the optimistically added user message
      setMessages(prev => prev.slice(0, -1));
      toast.error(error.message || 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await chatService.deleteMessage(messageId);
      setMessages(prev => prev.filter(msg => msg._id !== messageId));
      toast.success('Message deleted');
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
    }
  };

  const handleClearChat = async () => {
    try {
      await chatService.clearChat();
      setMessages([]);
      toast.success('Chat cleared');
    } catch (error) {
      console.error('Error clearing chat:', error);
      toast.error('Failed to clear chat');
    }
  };

  if (isFetching) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-gray-50 dark:bg-gray-900">
      <ChatHeader user={user} />
      
      <div 
        ref={chatBoxRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700"
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400 text-center">
              No messages yet. Start a conversation!
            </p>
          </div>
        ) : (
          <ChatBox
            messages={messages}
            onDeleteMessage={handleDeleteMessage}
            onClearChat={handleClearChat}
          />
        )}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <ChatInput 
          onSendMessage={handleSendMessage} 
          isLoading={isLoading}
          placeholder="Type your message here..."
        />
        {isLoading && (
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            AI is thinking...
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;