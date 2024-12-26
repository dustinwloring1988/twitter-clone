import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Tweet as TweetType } from '../types';
import { ReplyModal } from './ReplyModal';
import { TweetReplies } from './TweetReplies';
import { db } from '../data/mockDb';
import { useColorScheme } from '../hooks/useColorScheme';
import { useAccessibility } from '../hooks/useAccessibility';

interface TweetProps {
  tweet: TweetType;
  onReply: (tweetId: string, content: string) => void;
  onLike: (tweetId: string) => void;
  onRetweet: (tweetId: string) => void;
}

const renderTweetContent = (content: string, accentColor: string, coloredHashtags: boolean, inlineLinks: boolean) => {
  let processedContent = content;
  let elements: React.ReactNode[] = [];
  let lastIndex = 0;

  // Process markdown links if enabled
  if (inlineLinks) {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = linkRegex.exec(processedContent)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        elements.push(processedContent.slice(lastIndex, match.index));
      }
      
      // Add the link
      elements.push(
        <a
          key={match.index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-current hover:underline"
          style={{ color: accentColor }}
        >
          {match[1]}
        </a>
      );
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < processedContent.length) {
      processedContent = processedContent.slice(lastIndex);
    } else {
      processedContent = '';
    }
  }

  // Process hashtags if enabled
  if (coloredHashtags && processedContent) {
    const parts = processedContent.split(/(#\w+)/g);
    elements.push(...parts.map((part, index) => {
      if (part.startsWith('#')) {
        return (
          <span key={`hashtag-${index}`} style={{ color: accentColor }}>
            {part}
          </span>
        );
      }
      return part;
    }));
  } else if (processedContent) {
    elements.push(processedContent);
  }

  return elements;
};

export function Tweet({ tweet, onReply, onLike, onRetweet }: TweetProps) {
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const { getAccentColor } = useColorScheme();
  const { coloredHashtags, inlineLinks } = useAccessibility();

  const author = db.getUser(tweet.author);
  const currentUser = db.getUser('current-user');
  if (!author || !currentUser) return null;

  const handleReply = (content: string) => {
    onReply(tweet.id, content);
  };

  const isLiked = tweet.likedBy.includes(currentUser.id);
  const isRetweeted = tweet.retweetedBy.includes(currentUser.id);
  const hasReplied = tweet.replies.some(replyId => {
    const reply = db.getTweet(replyId);
    return reply?.author === currentUser.id;
  });

  return (
    <>
      <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        <div className="flex gap-4">
          <Link to={`/user/${author.handle}`}>
            <img
              src={author.avatar}
              alt={author.name}
              className="w-12 h-12 rounded-full"
            />
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Link 
                to={`/user/${author.handle}`}
                className="font-bold hover:underline"
              >
                {author.name}
              </Link>
              <span className="text-gray-500">@{author.handle}</span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-500">
                {new Date(tweet.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-2">{renderTweetContent(tweet.content, getAccentColor(), coloredHashtags, inlineLinks)}</p>
            <div className="flex gap-10 mt-4 text-gray-500">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowReplyModal(true)}
                  className={`p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors ${
                    hasReplied ? 'text-blue-500 fill-blue-500' : ''
                  }`}
                >
                  <MessageCircle 
                    size={18} 
                    className={hasReplied ? 'fill-current' : ''}
                  />
                </button>
                <button 
                  onClick={() => setShowReplies(!showReplies)}
                  className={`hover:text-blue-500 ${hasReplied ? 'text-blue-500' : ''}`}
                >
                  {tweet.replies.length}
                </button>
              </div>
              <button 
                onClick={() => onRetweet(tweet.id)}
                className={`flex items-center gap-2 p-2 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-full transition-colors ${
                  isRetweeted ? 'text-green-500 fill-green-500' : ''
                }`}
              >
                <Repeat2 size={18} />
                <span>{tweet.retweets}</span>
              </button>
              <button 
                onClick={() => onLike(tweet.id)}
                className={`flex items-center gap-2 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors ${
                  isLiked ? 'text-red-500 fill-red-500' : ''
                }`}
              >
                <Heart 
                  size={18} 
                  className={isLiked ? 'fill-current' : ''}
                />
                <span>{tweet.likes}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showReplies && tweet.replies.length > 0 && (
        <div className="ml-16 border-l-2 border-gray-200 dark:border-gray-700">
          <TweetReplies replies={tweet.replies} />
        </div>
      )}

      {showReplyModal && (
        <ReplyModal
          tweet={tweet}
          author={author}
          onClose={() => setShowReplyModal(false)}
          onReply={handleReply}
        />
      )}
    </>
  );
}