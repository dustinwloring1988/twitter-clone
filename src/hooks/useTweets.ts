import { useState } from 'react';
import type { Tweet } from '../types';
import { mockDb, db } from '../data/mockDb';

export function useTweets() {
  const [tweets, setTweets] = useState<Tweet[]>(Object.values(mockDb.tweets));

  const addTweet = (content: string, userId: string) => {
    const newTweet = db.createTweet({
      content,
      author: userId,
      likes: 0,
      likedBy: [],
      retweets: 0,
      retweetedBy: [],
      replies: [],
      createdAt: new Date()
    });
    setTweets(prev => [newTweet, ...prev]);
  };

  const addReply = (tweetId: string, content: string, userId: string) => {
    const reply = db.createTweet({
      content,
      author: userId,
      likes: 0,
      likedBy: [],
      retweets: 0,
      retweetedBy: [],
      replies: [],
      createdAt: new Date()
    });

    setTweets(prev => prev.map(tweet => {
      if (tweet.id === tweetId) {
        return { ...tweet, replies: [reply.id, ...tweet.replies] };
      }
      return tweet;
    }));
  };

  const toggleLike = (tweetId: string, userId: string) => {
    const tweet = db.getTweet(tweetId);
    if (!tweet) return;

    if (tweet.likedBy.includes(userId)) {
      db.unlikeTweet(userId, tweetId);
    } else {
      db.likeTweet(userId, tweetId);
    }

    setTweets(prev => prev.map(t => 
      t.id === tweetId ? db.getTweet(tweetId)! : t
    ));
  };

  const toggleRetweet = (tweetId: string, userId: string) => {
    const tweet = db.getTweet(tweetId);
    if (!tweet) return;

    if (tweet.retweetedBy.includes(userId)) {
      db.unretweet(userId, tweetId);
    } else {
      db.retweet(userId, tweetId);
    }

    setTweets(prev => prev.map(t => 
      t.id === tweetId ? db.getTweet(tweetId)! : t
    ));
  };

  return {
    tweets,
    addTweet,
    addReply,
    toggleLike,
    toggleRetweet,
  };
}