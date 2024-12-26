import React from 'react';
import { Message } from './Message';
import type { Message as MessageType } from '../../types';

interface MessageListProps {
  messages: MessageType[];
  onSelect: (message: MessageType) => void;
}

export function MessageList({ messages, onSelect }: MessageListProps) {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {messages.map((message) => (
        <Message key={message.id} message={message} onClick={() => onSelect(message)} />
      ))}
    </div>
  );
}