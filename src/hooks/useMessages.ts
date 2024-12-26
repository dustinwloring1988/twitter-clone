import { useState } from 'react';
import type { Message } from '../types';
import { mockDb, db } from '../data/mockDb';

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>(Object.values(mockDb.messages));
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const markAsRead = (messageId: string) => {
    const message = db.getMessage(messageId);
    if (!message || message.read) return;

    const updatedMessage = { ...message, read: true };
    mockDb.messages[messageId] = updatedMessage;
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? updatedMessage : msg
    ));
  };

  const markAsUnread = (messageId: string) => {
    const message = db.getMessage(messageId);
    if (!message || !message.read) return;

    const updatedMessage = { ...message, read: false };
    mockDb.messages[messageId] = updatedMessage;
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? updatedMessage : msg
    ));
  };

  const deleteMessage = (messageId: string) => {
    // Delete from mock database
    delete mockDb.messages[messageId];
    
    // Update state
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
    
    // Clear selected message if it was deleted
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null);
    }
  };

  const addReply = (messageId: string, content: string, currentUserId: string) => {
    const originalMessage = db.getMessage(messageId);
    if (!originalMessage) return;

    const newMessage = db.createMessage({
      content,
      sender: currentUserId,
      recipient: originalMessage.sender,
      createdAt: new Date(),
      read: false,
      parentId: messageId
    });

    setMessages(prev => [...prev, newMessage]);
  };

  const getThreadMessages = (messageId: string): Message[] => {
    // Get all messages in the thread, including the parent and all replies
    const rootMessage = db.getMessage(messageId);
    if (!rootMessage) return [];

    // If this is a reply, get the root message instead
    const rootId = rootMessage.parentId || messageId;
    
    return messages.filter(msg => 
      msg.id === rootId || msg.parentId === rootId
    ).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  };

  const exportMessages = () => {
    const exportData = messages.map(msg => ({
      id: msg.id,
      content: msg.content,
      sender: msg.sender,
      recipient: msg.recipient,
      createdAt: msg.createdAt,
      read: msg.read,
      parentId: msg.parentId
    }));
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'messages.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return {
    messages,
    selectedMessage,
    setSelectedMessage,
    markAsRead,
    markAsUnread,
    addReply,
    deleteMessage,
    getThreadMessages,
    exportMessages
  };
}