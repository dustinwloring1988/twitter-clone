export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio?: string;
  location?: string;
  website?: string;
  joinedDate: Date;
  coverImage?: string;
  followers: number;
  following: number;
}

export interface Tweet {
  id: string;
  content: string;
  author: string;
  likes: number;
  likedBy: string[];
  retweets: number;
  retweetedBy: string[];
  replies: string[];
  createdAt: Date;
}

export interface Message {
  id: string;
  content: string;
  sender: string;
  recipient: string;
  createdAt: Date;
  read: boolean;
  parentId?: string;
}

export interface Notification {
  id: string;
  type: 'like' | 'follow' | 'reply' | 'retweet';
  actor: string;
  target?: string;
  createdAt: Date;
  read: boolean;
}