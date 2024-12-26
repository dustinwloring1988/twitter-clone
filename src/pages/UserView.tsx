import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProfileHeader } from '../components/ProfileHeader';
import { TweetList } from '../components/TweetList';
import { FollowersList } from '../components/FollowersList';
import { useTweets } from '../hooks/useTweets';
import { db } from '../data/mockDb';
import type { User } from '../types';
import { useColorScheme } from '../hooks/useColorScheme';

type TabType = 'tweets' | 'followers' | 'following';

export function UserView() {
  const { handle } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('tweets');
  const { tweets } = useTweets();
  const { getAccentColor } = useColorScheme();

  useEffect(() => {
    const loadUser = async () => {
      const foundUser = handle 
        ? db.getUserByHandle(handle)
        : null;
      
      if (foundUser) {
        setUser(foundUser);
      }
    };
    loadUser();
  }, [handle]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const userTweets = tweets.filter(tweet => tweet.author === user.id);

  const handleReply = (tweetId: string, content: string) => {
    // This is a view-only page, so we don't need to implement these handlers
  };

  const handleLike = (tweetId: string) => {
    // This is a view-only page, so we don't need to implement these handlers
  };

  const handleRetweet = (tweetId: string) => {
    // This is a view-only page, so we don't need to implement these handlers
  };

  return (
    <div>
      <ProfileHeader
        user={user}
        isCurrentUser={false}
        onEditProfile={() => {}} // Empty function since this is view-only
      />
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex">
          <button
            onClick={() => setActiveTab('tweets')}
            className={`px-6 py-4 font-semibold transition-colors relative ${
              activeTab === 'tweets'
                ? ''
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            style={{ color: activeTab === 'tweets' ? getAccentColor() : undefined }}
          >
            Chirps
            {activeTab === 'tweets' && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-1" 
                style={{ backgroundColor: getAccentColor() }}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('followers')}
            className={`px-6 py-4 font-semibold transition-colors relative ${
              activeTab === 'followers'
                ? ''
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            style={{ color: activeTab === 'followers' ? getAccentColor() : undefined }}
          >
            Followers
            {activeTab === 'followers' && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-1" 
                style={{ backgroundColor: getAccentColor() }}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('following')}
            className={`px-6 py-4 font-semibold transition-colors relative ${
              activeTab === 'following'
                ? ''
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            style={{ color: activeTab === 'following' ? getAccentColor() : undefined }}
          >
            Following
            {activeTab === 'following' && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-1" 
                style={{ backgroundColor: getAccentColor() }}
              />
            )}
          </button>
        </div>
      </div>

      {activeTab === 'tweets' && (
        <TweetList 
          tweets={userTweets}
          onReply={handleReply}
          onLike={handleLike}
          onRetweet={handleRetweet}
        />
      )}
      {activeTab === 'followers' && (
        <FollowersList userId={user.id} isFollowing={false} />
      )}
      {activeTab === 'following' && (
        <FollowersList userId={user.id} isFollowing={true} />
      )}
    </div>
  );
} 