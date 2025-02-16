import { useRef, useEffect } from 'react';
import ChatBubble from './ChatBubble';
import { TrashIcon } from '@heroicons/react/24/outline';

const ChatBox = ({ messages, onDeleteMessage, onClearChat }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.length > 0 && (
        <button
          onClick={onClearChat}
          className="flex items-center gap-2 px-4 py-2 mb-4 text-red-600 hover:text-red-700 transition-colors"
        >
          <TrashIcon className="w-5 h-5" />
          Clear Chat
        </button>
      )}
      <div className="space-y-4">
        {messages.map((message, index) => (
          <ChatBubble
            key={index}
            message={message}
            onDelete={() => onDeleteMessage(message._id)}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatBox;