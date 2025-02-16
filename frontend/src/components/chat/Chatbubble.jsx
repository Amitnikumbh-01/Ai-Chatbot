import { TrashIcon } from '@heroicons/react/24/outline';

const ChatBubble = ({ message, onDelete }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`relative max-w-xl px-4 py-2 rounded-lg ${
          isUser
            ? 'bg-primary-600 text-white'
            : 'bg-gray-100 dark:bg-gray-800'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        <button
          onClick={onDelete}
          className={`absolute -top-2 ${
            isUser ? '-left-2' : '-right-2'
          } p-1 rounded-full bg-red-100 hover:bg-red-200 text-red-600`}
        >
          <TrashIcon className="w-4 h-4" />
        </button>
        <span className="block text-xs mt-1 opacity-70">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default ChatBubble;