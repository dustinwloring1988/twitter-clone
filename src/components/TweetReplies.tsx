import React from 'react';
import { Link } from 'react-router-dom';
import type { Tweet } from '../types';
import { db } from '../data/mockDb';
import { useColorScheme } from '../hooks/useColorScheme';
import { useAccessibility } from '../hooks/useAccessibility';

interface TweetRepliesProps {
  replies: string[]; // Array of tweet IDs
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

export function TweetReplies({ replies }: TweetRepliesProps) {
  const { getAccentColor } = useColorScheme();
  const { coloredHashtags, inlineLinks } = useAccessibility();

  return (
    <div className="space-y-4">
      {replies.map((replyId) => {
        const reply = db.getTweet(replyId);
        const author = reply ? db.getUser(reply.author) : null;
        if (!reply || !author) return null;

        return (
          <div key={reply.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex gap-4">
              <Link to={`/profile/${author.handle}`}>
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-10 h-10 rounded-full"
                />
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <Link 
                    to={`/profile/${author.handle}`}
                    className="font-bold hover:underline"
                  >
                    {author.name}
                  </Link>
                  <span className="text-gray-500">@{author.handle}</span>
                </div>
                <p className="mt-1">{renderTweetContent(reply.content, getAccentColor(), coloredHashtags, inlineLinks)}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}