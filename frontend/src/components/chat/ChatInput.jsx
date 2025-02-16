import { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      try {
        await onSendMessage(message.trim());
        setMessage('');
      } catch (error) {
        console.error('Error in ChatInput:', error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t dark:border-gray-700 p-4 bg-white dark:bg-gray-800"
    >
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 input"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !message.trim()}
          className="btn btn-primary disabled:opacity-50"
        >
          <PaperAirplaneIcon className="w-5 h-5" />
        </button>
      </div>
      {isLoading && (
        <p className="text-sm text-gray-500 mt-2">AI is thinking...</p>
      )}
    </form>
  );
};

export default ChatInput;