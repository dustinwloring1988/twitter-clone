import React from 'react';
import { useNotifications } from '../hooks/useNotifications';
import { db } from '../data/mockDb';

export function Notifications() {
  const { notifications, resetCount, markAsRead, markAsUnread, deleteNotification } = useNotifications();
  const [activeTab, setActiveTab] = React.useState<'all' | 'unread'>('all');

  React.useEffect(() => {
    resetCount();
  }, [resetCount]);

  const filteredNotifications = React.useMemo(() => {
    return notifications.filter(n => activeTab === 'all' || !n.read);
  }, [notifications, activeTab]);

  const handleReadToggle = (e: React.MouseEvent, notification: any) => {
    e.stopPropagation();
    if (notification.read) {
      markAsUnread(notification.id);
    } else {
      markAsRead(notification.id);
    }
  };

  const renderNotificationContent = (notification: any) => {
    const actor = db.getUser(notification.actor);
    if (!actor) return null;

    let content = '';
    switch (notification.type) {
      case 'like':
      case 'reply':
      case 'retweet': {
        const tweet = notification.target ? db.getTweet(notification.target) : null;
        if (!tweet) return null;
        content = tweet.content;
        break;
      }
    }

    return (
      <div
        key={notification.id}
        className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors relative group"
        onClick={() => markAsRead(notification.id)}
      >
        <div className="flex gap-4">
          <img
            src={actor.avatar}
            alt={actor.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-grow">
            <p className="text-gray-900 dark:text-gray-100">
              <span className="font-bold hover:underline">
                {actor.name}
              </span>{' '}
              {notification.type === 'like' && 'liked your tweet'}
              {notification.type === 'follow' && 'followed you'}
              {notification.type === 'reply' && 'replied to your tweet'}
              {notification.type === 'retweet' && 'retweeted your tweet'}
            </p>
            {content && (
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {content}
              </p>
            )}
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(notification.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <button
              className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all"
              onClick={(e) => {
                e.stopPropagation();
                deleteNotification(notification.id);
              }}
              aria-label="Delete notification"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              className={`opacity-0 group-hover:opacity-100 p-2 rounded-full transition-all ${
                notification.read 
                  ? 'text-green-500 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20' 
                  : 'text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
              }`}
              onClick={(e) => handleReadToggle(e, notification)}
              aria-label={notification.read ? "Mark as unread" : "Mark as read"}
            >
              {notification.read ? (
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
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <header className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="p-4">
          <h1 className="text-xl font-bold">Notifications</h1>
        </div>
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`flex-1 py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'all'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button
            className={`flex-1 py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'unread'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('unread')}
          >
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </button>
        </div>
      </header>

      {filteredNotifications.map(renderNotificationContent)}
    </div>
  );
}