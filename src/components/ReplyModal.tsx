import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Tweet, User } from '../types';

interface ReplyModalProps {
  tweet: Tweet;
  author: User;
  onClose: () => void;
  onReply: (content: string) => void;
}

export function ReplyModal({ tweet, author, onClose, onReply }: ReplyModalProps) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onReply(content);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Reply</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <X size={20} />
          </button>
        </div>
        <div className="border-l-2 border-gray-300 dark:border-gray-700 ml-6 pl-4 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold">{author.name}</span>
            <span className="text-gray-500">@{author.handle}</span>
          </div>
          <p>{tweet.content}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tweet your reply"
            className="w-full resize-none border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
            rows={4}
          />
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={!content.trim()}
              className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold disabled:opacity-50 hover:bg-blue-600"
            >
              Reply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}