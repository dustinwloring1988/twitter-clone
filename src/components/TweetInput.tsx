import React, { useState } from 'react';
import { Bird, Smile } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { db } from '../data/mockDb';
import { useColorScheme } from '../hooks/useColorScheme';
import { useAccessibility } from '../hooks/useAccessibility';

interface TweetInputProps {
  onTweet: (content: string, userId: string) => void;
}

export function TweetInput({ onTweet }: TweetInputProps) {
  const [content, setContent] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const currentUser = db.getUser('current-user');
  const { getAccentColor } = useColorScheme();
  const { getFontSizeClass } = useAccessibility();

  if (!currentUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onTweet(content, currentUser.id);
      setContent('');
    }
  };

  const handleEmojiClick = (emojiData: any) => {
    setContent(prevContent => prevContent + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <form onSubmit={handleSubmit} className="border-b border-gray-200 dark:border-gray-700 p-4">
      <div className="flex gap-4">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening?"
              className={`w-full resize-none border-none focus:ring-0 placeholder-gray-500 bg-transparent p-3 ${getFontSizeClass()}`}
              rows={3}
            />
          </div>
          <div className="flex justify-end items-center gap-2 mt-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Smile size={20} style={{ color: getAccentColor() }} />
              </button>
              {showEmojiPicker && (
                <div className="absolute bottom-12 right-0 z-10">
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={!content.trim()}
              className="flex items-center gap-2 px-6 py-2 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-white"
              style={{ backgroundColor: getAccentColor() }}
            >
              <Bird size={18} className="fill-current" />
              Chirp
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}