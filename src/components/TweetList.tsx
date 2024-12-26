import React from 'react';
import { Tweet } from './Tweet';
import type { Tweet as TweetType } from '../types';

interface TweetListProps {
  tweets: TweetType[];
  onReply: (tweetId: string, content: string) => void;
  onLike: (tweetId: string) => void;
  onRetweet: (tweetId: string) => void;
}

export function TweetList({ tweets, onReply, onLike, onRetweet }: TweetListProps) {
  return (
    <div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweet={tweet}
            onReply={onReply}
            onLike={onLike}
            onRetweet={onRetweet}
          />
        ))}
      </div>
    </div>
  );
}