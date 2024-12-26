import React, { useState, useMemo } from 'react';
import { TweetInput } from '../components/TweetInput';
import { TweetList } from '../components/TweetList';
import { useTweets } from '../hooks/useTweets';
import { Search, Filter, MessageCircle, UserPlus, UserCheck } from 'lucide-react';
import { db } from '../data/mockDb';
import { User } from '../types';
import { useColorScheme } from '../hooks/useColorScheme';

export function Home() {
  const { tweets, addTweet, addReply, toggleLike, toggleRetweet } = useTweets();
  const { getAccentColor } = useColorScheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [hideOwnPosts, setHideOwnPosts] = useState(false);
  const [hideCommentedPosts, setHideCommentedPosts] = useState(false);
  const [hideLikedPosts, setHideLikedPosts] = useState(false);
  const [hideRechirpedPosts, setHideRechirpedPosts] = useState(false);
  const [activeTab, setActiveTab] = useState<'tweets' | 'users'>('tweets');
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messageContent, setMessageContent] = useState('');

  const currentUser = db.getUser('current-user');

  const filteredTweets = useMemo(() => {
    return tweets.filter(tweet => {
      // Search filter
      if (searchQuery && !tweet.content.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Hide own posts filter
      if (hideOwnPosts && tweet.author === currentUser?.id) {
        return false;
      }

      // Hide commented posts filter
      if (hideCommentedPosts && tweet.replies.some(replyId => {
        const reply = db.getTweet(replyId);
        return reply?.author === currentUser?.id;
      })) {
        return false;
      }

      // Hide liked posts filter
      if (hideLikedPosts && tweet.likedBy.includes(currentUser?.id)) {
        return false;
      }

      // Hide rechirped posts filter
      if (hideRechirpedPosts && tweet.retweetedBy.includes(currentUser?.id)) {
        return false;
      }

      return true;
    });
  }, [tweets, searchQuery, hideOwnPosts, hideCommentedPosts, hideLikedPosts, hideRechirpedPosts, currentUser]);

  const users = useMemo(() => {
    const allUsers = Object.values(db.getAllUsers()) as User[];
    return allUsers.filter(user => {
      if (user.id === currentUser?.id) return false;
      if (!userSearchQuery) return true;
      
      const searchLower = userSearchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchLower) ||
        user.handle.toLowerCase().includes(searchLower) ||
        user.bio?.toLowerCase().includes(searchLower)
      );
    });
  }, [userSearchQuery, currentUser]);

  const handleReply = (tweetId: string, content: string) => {
    addReply(tweetId, content, 'current-user');
  };

  const handleLike = (tweetId: string) => {
    toggleLike(tweetId, 'current-user');
  };

  const handleRetweet = (tweetId: string) => {
    toggleRetweet(tweetId, 'current-user');
  };

  const handleFollow = (userId: string) => {
    if (!currentUser) return;
    const isFollowing = db.getFollowing(currentUser.id).includes(userId);
    if (isFollowing) {
      db.unfollowUser(currentUser.id, userId);
    } else {
      db.followUser(currentUser.id, userId);
    }
  };

  const handleMessage = (user: User) => {
    setSelectedUser(user);
    setShowMessageModal(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !selectedUser || !messageContent.trim()) return;

    db.createMessage({
      content: messageContent,
      sender: currentUser.id,
      recipient: selectedUser.id,
      createdAt: new Date(),
      read: false
    });

    setMessageContent('');
    setShowMessageModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-4">
        <h1 className="text-xl font-bold mb-4">Home</h1>
        <div className="flex gap-4 mb-4">
          <button
            className={`py-2 px-4 font-medium rounded-full transition-colors ${
              activeTab === 'tweets'
                ? ''
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('tweets')}
            style={{ color: activeTab === 'tweets' ? getAccentColor() : undefined }}
          >
            Chirps
          </button>
          <button
            className={`py-2 px-4 font-medium rounded-full transition-colors ${
              activeTab === 'users'
                ? ''
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('users')}
            style={{ color: activeTab === 'users' ? getAccentColor() : undefined }}
          >
            Users
          </button>
        </div>
        {activeTab === 'tweets' ? (
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search chirps"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 dark:bg-gray-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setShowFilterPopover(!showFilterPopover)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                <Filter size={20} style={{ color: getAccentColor() }} />
              </button>
              {showFilterPopover && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800/95 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-10">
                  <div className="space-y-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={hideOwnPosts}
                        onChange={(e) => setHideOwnPosts(e.target.checked)}
                        className="rounded text-blue-500"
                      />
                      <span>Hide my chirps</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={hideCommentedPosts}
                        onChange={(e) => setHideCommentedPosts(e.target.checked)}
                        className="rounded text-blue-500"
                      />
                      <span>Hide chirps I've commented on</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={hideLikedPosts}
                        onChange={(e) => setHideLikedPosts(e.target.checked)}
                        className="rounded text-blue-500"
                      />
                      <span>Hide chirps I've liked</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={hideRechirpedPosts}
                        onChange={(e) => setHideRechirpedPosts(e.target.checked)}
                        className="rounded text-blue-500"
                      />
                      <span>Hide chirps I've rechirped</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search users by name, handle, or bio"
              value={userSearchQuery}
              onChange={(e) => setUserSearchQuery(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </header>

      {activeTab === 'tweets' ? (
        <>
          <TweetInput onTweet={addTweet} />
          <TweetList 
            tweets={filteredTweets}
            onReply={handleReply}
            onLike={handleLike}
            onRetweet={handleRetweet}
          />
        </>
      ) : (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {users.map((user) => {
            const isFollowing = currentUser ? db.getFollowing(currentUser.id).includes(user.id) : false;
            
            return (
              <div key={user.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{user.name}</span>
                      <span className="text-gray-500">@{user.handle}</span>
                    </div>
                    {user.bio && (
                      <p className="text-gray-600 dark:text-gray-400 mt-1">{user.bio}</p>
                    )}
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleFollow(user.id)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
                          isFollowing
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                      >
                        {isFollowing ? (
                          <>
                            <UserCheck size={16} />
                            Following
                          </>
                        ) : (
                          <>
                            <UserPlus size={16} />
                            Follow
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleMessage(user)}
                        className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        <MessageCircle size={16} />
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showMessageModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-lg p-4">
            <h2 className="text-xl font-bold mb-4">Message {selectedUser.name}</h2>
            <form onSubmit={handleSendMessage}>
              <textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Type your message..."
                className="w-full h-32 resize-none rounded-lg border border-gray-200 dark:border-gray-700 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowMessageModal(false);
                    setSelectedUser(null);
                    setMessageContent('');
                  }}
                  className="px-4 py-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!messageContent.trim()}
                  className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}