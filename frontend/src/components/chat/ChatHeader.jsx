import ThemeToggle from '../layout/ThemeToggle';

const ChatHeader = ({ user }) => {
  return (
    <div className="border-b dark:border-gray-700 p-4 bg-white dark:bg-gray-800 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold">AI Chat Assistant</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Chatting as {user.name}
        </p>
      </div>
      <ThemeToggle />
    </div>
  );
};

export default ChatHeader;