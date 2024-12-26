import React from 'react';
import { MessageList } from '../components/messages/MessageList';
import { MessageConversation } from '../components/messages/MessageConversation';
import { useMessages } from '../hooks/useMessages';
import { useColorScheme } from '../hooks/useColorScheme';

export function Messages() {
  const { 
    messages, 
    selectedMessage, 
    setSelectedMessage, 
    markAsRead,
    markAsUnread,
    addReply,
    deleteMessage,
    getThreadMessages,
    exportMessages 
  } = useMessages();
  const [activeTab, setActiveTab] = React.useState<'all' | 'unread'>('all');
  const { getAccentColor } = useColorScheme();

  // Filter out reply messages from the main list, only show root messages
  const rootMessages = React.useMemo(() => {
    return messages.filter(m => !m.parentId);
  }, [messages]);

  const filteredMessages = React.useMemo(() => {
    return rootMessages.filter(m => activeTab === 'all' || !m.read);
  }, [rootMessages, activeTab]);

  const handleSelectMessage = (message: typeof messages[0]) => {
    setSelectedMessage(message);
    markAsRead(message.id);
  };

  const handleReply = (content: string) => {
    if (selectedMessage) {
      addReply(selectedMessage.id, content, 'current-user');
    }
  };

  const handleReadToggle = (e: React.MouseEvent, message: typeof messages[0]) => {
    e.stopPropagation();
    if (message.read) {
      markAsUnread(message.id);
    } else {
      markAsRead(message.id);
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Messages</h1>
          <button
            onClick={exportMessages}
            className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 rounded-full transition-colors"
          >
            Export as JSON
          </button>
        </div>
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`flex-1 py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'all'
                ? 'border-current'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('all')}
            style={{ color: activeTab === 'all' ? getAccentColor() : undefined }}
          >
            All
          </button>
          <button
            className={`flex-1 py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'unread'
                ? 'border-current'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('unread')}
            style={{ color: activeTab === 'unread' ? getAccentColor() : undefined }}
          >
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </button>
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredMessages.map(message => (
            <div
              key={message.id}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors relative group cursor-pointer"
              onClick={() => handleSelectMessage(message)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  <MessageList messages={[message]} onSelect={handleSelectMessage} />
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteMessage(message.id);
                    }}
                    aria-label="Delete message"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    className={`opacity-0 group-hover:opacity-100 p-2 rounded-full transition-all ${
                      message.read 
                        ? 'text-green-500 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20' 
                        : 'text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
                    }`}
                    onClick={(e) => handleReadToggle(e, message)}
                    aria-label={message.read ? "Mark as unread" : "Mark as read"}
                  >
                    {message.read ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedMessage && (
        <MessageConversation
          message={selectedMessage}
          thread={getThreadMessages(selectedMessage.id)}
          onClose={() => setSelectedMessage(null)}
          onReply={handleReply}
        />
      )}
    </div>
  );
}