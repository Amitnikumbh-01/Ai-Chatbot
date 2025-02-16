export const API_ENDPOINTS = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    CHAT: '/chat',
    CHAT_HISTORY: '/chat/history',
    DELETE_MESSAGE: '/chat/message',
    CLEAR_CHAT: '/chat/clear',
  };
  
  export const TOAST_OPTIONS = {
    success: {
      duration: 3000,
      style: {
        background: '#10B981',
        color: '#fff',
      },
    },
    error: {
      duration: 4000,
      style: {
        background: '#EF4444',
        color: '#fff',
      },
    },
  };
  
  export const COUNTRIES = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'India',
    'Germany',
    'France',
    'Japan',
    // Add more countries as needed
  ];
  
  export const MESSAGE_TYPES = {
    USER: 'user',
    ASSISTANT: 'assistant',
  };
  
  export const THEME_TYPES = {
    LIGHT: 'light',
    DARK: 'dark',
  };