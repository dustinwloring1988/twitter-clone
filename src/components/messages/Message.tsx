import React from 'react';
import type { Message as MessageType } from '../../types';
import { db } from '../../data/mockDb';

interface MessageProps {
  message: MessageType;
  isCurrentUser: boolean;
}

export function Message({ message, isCurrentUser }: MessageProps) {
  const sender = db.getUser(message.sender);
  
  if (!sender) return null;

  return (
    <div className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
      <img
        src={sender.avatar}
        alt={sender.name}
        className="w-8 h-8 rounded-full"
      />
      <div className={`rounded-lg p-3 max-w-[80%] ${
        isCurrentUser 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-100 dark:bg-gray-800'
      }`}>
        <p>{message.content}</p>
        <span className={`text-xs mt-1 block ${
          isCurrentUser 
            ? 'text-blue-100' 
            : 'text-gray-500'
        }`}>
          {new Date(message.createdAt).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}