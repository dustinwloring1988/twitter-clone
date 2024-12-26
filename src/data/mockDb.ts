import type { User, Tweet, Message, Notification } from '../types';

// Initialize with a default user
let currentUserId = 'user-developer';

// Mock Database Tables
interface MockDatabase {
  users: Record<string, User>;
  tweets: Record<string, Tweet>;
  messages: Record<string, Message>;
  notifications: Record<string, Notification>;
  // Relationships
  followers: Record<string, string[]>; // userId -> followerIds
  following: Record<string, string[]>; // userId -> followingIds
  likes: Record<string, string[]>; // tweetId -> userIds
  retweets: Record<string, string[]>; // tweetId -> userIds
}

// Demo Users Data
const DEMO_USERS: Record<string, User> = {
  'user-developer': {
    id: 'user-developer',
    name: 'Tech Developer',
    handle: 'techdev',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    joinedDate: new Date('2024-01-01'),
    followers: 1234,
    following: 567,
    bio: 'Full-stack developer passionate about React, TypeScript, and cloud technologies',
    location: 'San Francisco, CA',
    website: 'https://techdev.codes',
    coverImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=400&fit=crop'
  },
  'user-designer': {
    id: 'user-designer',
    name: 'UI Designer',
    handle: 'uidesigner',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    joinedDate: new Date('2024-01-01'),
    followers: 2345,
    following: 678,
    bio: 'UI/UX designer creating beautiful and intuitive interfaces',
    location: 'New York, NY',
    website: 'https://designer.portfolio',
    coverImage: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200&h=400&fit=crop'
  },
  'user-manager': {
    id: 'user-manager',
    name: 'Product Manager',
    handle: 'prodmgr',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    joinedDate: new Date('2024-01-01'),
    followers: 3456,
    following: 789,
    bio: 'Product Manager bridging the gap between users and technology',
    location: 'Seattle, WA',
    website: 'https://product.manager',
    coverImage: 'https://images.unsplash.com/photo-1557425955-df376b5903c8?w=1200&h=400&fit=crop'
  },
  'user-researcher': {
    id: 'user-researcher',
    name: 'UX Researcher',
    handle: 'uxresearch',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
    joinedDate: new Date('2024-02-15'),
    followers: 892,
    following: 445,
    bio: 'User research specialist. Making products more human-centered through data-driven insights 📊',
    location: 'Boston, MA',
    website: 'https://uxresearch.blog',
    coverImage: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=1200&h=400&fit=crop'
  },
  'user-engineer': {
    id: 'user-engineer',
    name: 'DevOps Engineer',
    handle: 'devopsmaster',
    avatar: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=100&h=100&fit=crop',
    joinedDate: new Date('2024-02-01'),
    followers: 1567,
    following: 321,
    bio: 'Infrastructure & automation enthusiast. CI/CD pipeline wizard 🔧',
    location: 'Austin, TX',
    website: 'https://devops.tech',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=400&fit=crop'
  },
  'user-cto': {
    id: 'user-cto',
    name: 'Tech Leader',
    handle: 'techlead',
    avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=100&h=100&fit=crop',
    joinedDate: new Date('2024-01-01'),
    followers: 5678,
    following: 234,
    bio: 'CTO | Building the future of tech | Open source advocate | Speaker 🚀',
    location: 'Silicon Valley',
    website: 'https://techleader.blog',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop'
  }
};

// Initialize Mock Database
export const mockDb: MockDatabase = {
  users: DEMO_USERS,
  tweets: {
    // Most recent tweets first
    'tweet-url-1': {
      id: 'tweet-url-1',
      content: 'Check out our new design system documentation! [Bolt Design System](https://boltdesign.dev) 📚 #design #documentation',
      author: 'user-designer',
      likes: 156,
      likedBy: ['user-developer', 'user-manager', 'user-researcher', 'user-engineer', 'user-cto'],
      retweets: 28,
      retweetedBy: ['user-developer', 'user-engineer', 'user-cto'],
      replies: ['reply-url-1', 'reply-url-2', 'reply-url-3'],
      createdAt: new Date('2024-03-17')
    },
    'reply-url-1': {
      id: 'reply-url-1',
      content: 'Love the new documentation! The interactive examples at [component playground](https://boltdesign.dev/playground) are especially helpful 👏',
      author: 'user-developer',
      likes: 42,
      likedBy: ['user-designer', 'user-manager'],
      retweets: 5,
      retweetedBy: ['user-designer'],
      replies: [],
      createdAt: new Date('2024-03-17T10:30:00')
    },
    'reply-url-2': {
      id: 'reply-url-2',
      content: 'The accessibility guidelines are comprehensive. This will help us maintain consistency across all our products.',
      author: 'user-researcher',
      likes: 38,
      likedBy: ['user-designer', 'user-developer'],
      retweets: 3,
      retweetedBy: ['user-developer'],
      replies: [],
      createdAt: new Date('2024-03-17T11:15:00')
    },
    'reply-url-3': {
      id: 'reply-url-3',
      content: 'Great work on the dark mode implementation! The color system adapts beautifully.',
      author: 'user-cto',
      likes: 45,
      likedBy: ['user-designer', 'user-developer', 'user-manager'],
      retweets: 4,
      retweetedBy: ['user-developer', 'user-manager'],
      replies: [],
      createdAt: new Date('2024-03-17T12:00:00')
    },
    'tweet-url-2': {
      id: 'tweet-url-2',
      content: 'Just published a blog post about our Kubernetes migration journey! [Read it here](https://techblog.bolt.dev/k8s-migration) 🚀 Featuring performance metrics and lessons learned #devops #kubernetes',
      author: 'user-engineer',
      likes: 203,
      likedBy: ['user-developer', 'user-cto', 'user-manager', 'user-designer'],
      retweets: 45,
      retweetedBy: ['user-developer', 'user-cto', 'user-manager'],
      replies: ['reply-url-4', 'reply-url-5', 'reply-url-6'],
      createdAt: new Date('2024-03-17')
    },
    'reply-url-4': {
      id: 'reply-url-4',
      content: 'Excellent write-up! The section about handling stateful sets was particularly insightful.',
      author: 'user-cto',
      likes: 67,
      likedBy: ['user-engineer', 'user-developer', 'user-manager'],
      retweets: 8,
      retweetedBy: ['user-developer', 'user-manager'],
      replies: [],
      createdAt: new Date('2024-03-17T13:30:00')
    },
    'reply-url-5': {
      id: 'reply-url-5',
      content: 'Would love to see a follow-up post about your monitoring setup! [Our setup](https://techblog.bolt.dev/monitoring) has some similarities.',
      author: 'user-developer',
      likes: 51,
      likedBy: ['user-engineer', 'user-cto', 'user-manager'],
      retweets: 6,
      retweetedBy: ['user-engineer', 'user-manager'],
      replies: [],
      createdAt: new Date('2024-03-17T14:15:00')
    },
    'reply-url-6': {
      id: 'reply-url-6',
      content: 'The performance improvements are impressive! How are you handling database migrations?',
      author: 'user-manager',
      likes: 39,
      likedBy: ['user-engineer', 'user-developer'],
      retweets: 2,
      retweetedBy: ['user-developer'],
      replies: [],
      createdAt: new Date('2024-03-17T15:00:00')
    },
    'tweet-6': {
      id: 'tweet-6',
      content: 'Excited to announce our new tech strategy! Focus on AI, blockchain, and sustainable computing for 2024. Thread below... 🧵 #innovation #tech',
      author: 'user-cto',
      likes: 245,
      likedBy: ['user-developer', 'user-designer', 'user-manager', 'user-researcher', 'user-engineer'],
      retweets: 56,
      retweetedBy: ['user-developer', 'user-manager', 'user-engineer'],
      replies: ['reply-13', 'reply-14', 'reply-15', 'reply-18', 'reply-19'],
      createdAt: new Date('2024-03-16')
    },
    'reply-32': {
      id: 'reply-32',
      content: 'This will be a great case study for our tech blog. The community would love to learn from this.',
      author: 'user-developer',
      likes: 32,
      likedBy: ['user-cto', 'user-manager', 'user-engineer', 'user-researcher'],
      retweets: 4,
      retweetedBy: ['user-cto', 'user-engineer'],
      replies: [],
      createdAt: new Date('2024-03-16T13:45:00')
    },
    'reply-33': {
      id: 'reply-33',
      content: 'The reduced deployment time will help us iterate faster on our UX improvements. Win-win! 🎯',
      author: 'user-researcher',
      likes: 26,
      likedBy: ['user-cto', 'user-engineer', 'user-manager', 'user-developer'],
      retweets: 2,
      retweetedBy: ['user-manager', 'user-engineer'],
      replies: [],
      createdAt: new Date('2024-03-16T14:30:00')
    },
    'tweet-3': {
      id: 'tweet-3',
      content: 'Product roadmap review went great! Excited about our upcoming features 📈 #product #management',
      author: 'user-manager',
      likes: 89,
      likedBy: ['user-developer', 'user-designer', 'user-engineer', 'user-cto'],
      retweets: 12,
      retweetedBy: ['user-designer', 'user-engineer', 'user-cto'],
      replies: ['reply-4', 'reply-5'],
      createdAt: new Date('2024-03-15')
    },
    'reply-29': {
      id: 'reply-29',
      content: 'Impressive results! Would love to hear more about your monitoring setup.',
      author: 'user-engineer',
      likes: 18,
      likedBy: ['user-manager', 'user-cto', 'user-developer'],
      retweets: 1,
      retweetedBy: ['user-developer'],
      replies: [],
      createdAt: new Date('2024-03-15T14:20:00')
    },
    'tweet-4': {
      id: 'tweet-4',
      content: 'Just wrapped up a fascinating user research session. The insights we gathered will revolutionize our onboarding flow! 🧪 #UX #research',
      author: 'user-researcher',
      likes: 76,
      likedBy: ['user-designer', 'user-manager', 'user-developer'],
      retweets: 8,
      retweetedBy: ['user-designer', 'user-manager'],
      replies: ['reply-21', 'reply-22', 'reply-23'],
      createdAt: new Date('2024-03-14')
    },
    'reply-30': {
      id: 'reply-30',
      content: 'The sustainable computing focus is crucial. Our current infrastructure optimizations align perfectly with this.',
      author: 'user-engineer',
      likes: 22,
      likedBy: ['user-researcher', 'user-cto', 'user-manager'],
      retweets: 2,
      retweetedBy: ['user-cto', 'user-manager'],
      replies: [],
      createdAt: new Date('2024-03-14T18:10:00')
    },
    'tweet-5': {
      id: 'tweet-5',
      content: 'Successfully migrated our entire infrastructure to Kubernetes. Deployment time reduced by 70%! 🎉 #devops #k8s',
      author: 'user-engineer',
      likes: 95,
      likedBy: ['user-developer', 'user-manager', 'user-researcher'],
      retweets: 15,
      retweetedBy: ['user-developer', 'user-manager'],
      replies: ['reply-10', 'reply-11', 'reply-24', 'reply-25', 'reply-26'],
      createdAt: new Date('2024-03-13')
    },
    'reply-31': {
      id: 'reply-31',
      content: 'The AI features will need robust testing. I can help set up a comprehensive test plan.',
      author: 'user-researcher',
      likes: 28,
      likedBy: ['user-engineer', 'user-cto', 'user-manager', 'user-developer'],
      retweets: 3,
      retweetedBy: ['user-manager', 'user-developer'],
      replies: [],
      createdAt: new Date('2024-03-13T20:05:00')
    },
    // ... rest of the existing tweets and replies ...
  },
  messages: {
    'msg-1': {
      id: 'msg-1',
      content: 'Hey! Love your latest design work. Would you be interested in collaborating?',
      sender: 'user-developer',
      recipient: 'user-designer',
      createdAt: new Date('2024-03-15T10:30:00'),
      read: false
    },
    'msg-2': {
      id: 'msg-2',
      content: 'Let\'s discuss the new feature requirements tomorrow.',
      sender: 'user-manager',
      recipient: 'user-developer',
      createdAt: new Date('2024-03-14T15:45:00'),
      read: true
    },
    'msg-3': {
      id: 'msg-3',
      content: 'I have some interesting user research data to share about the new features.',
      sender: 'user-researcher',
      recipient: 'user-manager',
      createdAt: new Date('2024-03-15T09:15:00'),
      read: false
    },
    'msg-4': {
      id: 'msg-4',
      content: 'Can we review the deployment pipeline changes next week?',
      sender: 'user-engineer',
      recipient: 'user-developer',
      createdAt: new Date('2024-03-14T16:30:00'),
      read: true
    },
    'msg-5': {
      id: 'msg-5',
      content: 'Your recent contributions to the frontend modernization have been outstanding. Let\'s discuss your career growth.',
      sender: 'user-cto',
      recipient: 'user-developer',
      createdAt: new Date('2024-03-16T09:30:00'),
      read: false
    }
  },
  notifications: {
    'notif-1': {
      id: 'notif-1',
      type: 'like',
      actor: 'user-designer',
      target: 'tweet-1',
      createdAt: new Date('2024-03-15T11:30:00'),
      read: false
    },
    'notif-2': {
      id: 'notif-2',
      type: 'follow',
      actor: 'user-manager',
      createdAt: new Date('2024-03-15T10:15:00'),
      read: false
    },
    'notif-3': {
      id: 'notif-3',
      type: 'reply',
      actor: 'user-designer',
      target: 'tweet-2',
      createdAt: new Date('2024-03-14T09:20:00'),
      read: false
    },
    'notif-4': {
      id: 'notif-4',
      type: 'like',
      actor: 'user-researcher',
      target: 'tweet-4',
      createdAt: new Date('2024-03-14T14:45:00'),
      read: false
    },
    'notif-5': {
      id: 'notif-5',
      type: 'retweet',
      actor: 'user-engineer',
      target: 'tweet-5',
      createdAt: new Date('2024-03-13T17:20:00'),
      read: false
    },
    'notif-6': {
      id: 'notif-6',
      type: 'reply',
      actor: 'user-cto',
      target: 'tweet-1',
      createdAt: new Date('2024-03-10T16:30:00'),
      read: false
    }
  },
  followers: {
    'user-developer': ['user-designer', 'user-manager', 'user-engineer', 'user-researcher', 'user-cto'],
    'user-designer': ['user-developer', 'user-manager', 'user-researcher', 'user-engineer', 'user-cto'],
    'user-manager': ['user-developer', 'user-designer', 'user-researcher', 'user-cto'],
    'user-researcher': ['user-developer', 'user-designer', 'user-manager', 'user-engineer', 'user-cto'],
    'user-engineer': ['user-developer', 'user-manager', 'user-researcher', 'user-cto'],
    'user-cto': ['user-developer', 'user-designer', 'user-manager', 'user-researcher', 'user-engineer']
  },
  following: {
    'user-developer': ['user-designer', 'user-manager', 'user-researcher', 'user-engineer', 'user-cto'],
    'user-designer': ['user-developer', 'user-manager', 'user-researcher', 'user-engineer', 'user-cto'],
    'user-manager': ['user-developer', 'user-designer', 'user-researcher', 'user-cto'],
    'user-researcher': ['user-developer', 'user-designer', 'user-manager', 'user-engineer', 'user-cto'],
    'user-engineer': ['user-developer', 'user-manager', 'user-researcher', 'user-cto'],
    'user-cto': ['user-developer', 'user-designer', 'user-manager', 'user-researcher', 'user-engineer']
  },
  likes: {
    'tweet-1': ['user-designer', 'user-manager', 'user-researcher', 'user-cto'],
    'tweet-2': ['user-developer', 'user-manager', 'user-researcher', 'user-engineer', 'user-cto'],
    'tweet-3': ['user-developer', 'user-designer', 'user-engineer', 'user-cto'],
    'tweet-4': ['user-designer', 'user-manager', 'user-developer', 'user-cto'],
    'tweet-5': ['user-developer', 'user-manager', 'user-researcher', 'user-cto'],
    'tweet-6': ['user-developer', 'user-designer', 'user-manager', 'user-researcher', 'user-engineer'],
    'reply-1': ['user-developer', 'user-researcher'],
    'reply-3': ['user-designer', 'user-researcher'],
    'reply-4': ['user-manager', 'user-engineer'],
    'reply-5': ['user-manager', 'user-developer', 'user-researcher'],
    'reply-6': ['user-developer', 'user-designer'],
    'reply-7': ['user-designer', 'user-developer'],
    'reply-8': ['user-researcher', 'user-manager'],
    'reply-9': ['user-researcher', 'user-manager'],
    'reply-10': ['user-engineer', 'user-manager'],
    'reply-11': ['user-engineer', 'user-developer', 'user-researcher'],
    'reply-12': ['user-developer', 'user-designer', 'user-engineer'],
    'reply-13': ['user-cto', 'user-manager', 'user-engineer'],
    'reply-14': ['user-cto', 'user-developer', 'user-manager'],
    'reply-15': ['user-cto', 'user-manager', 'user-designer']
  },
  retweets: {
    'tweet-1': ['user-designer', 'user-engineer'],
    'tweet-2': ['user-developer', 'user-researcher', 'user-cto'],
    'tweet-3': ['user-designer', 'user-engineer', 'user-cto'],
    'tweet-4': ['user-designer', 'user-manager', 'user-cto'],
    'tweet-5': ['user-developer', 'user-manager', 'user-cto'],
    'tweet-6': ['user-developer', 'user-manager', 'user-engineer'],
    'reply-3': ['user-researcher'],
    'reply-5': ['user-manager'],
    'reply-7': ['user-developer'],
    'reply-8': ['user-manager'],
    'reply-9': ['user-manager'],
    'reply-10': ['user-manager'],
    'reply-11': ['user-developer', 'user-researcher'],
    'reply-12': ['user-engineer'],
    'reply-13': ['user-manager'],
    'reply-14': ['user-developer'],
    'reply-15': ['user-manager']
  }
};

// Mock Database Operations
export const db = {
  // Users
  getUser: (id: string): User => {
    return mockDb.users[id === 'current-user' ? currentUserId : id];
  },
  getAllUsers: () => mockDb.users,
  setCurrentUser: (userId: string) => {
    currentUserId = userId;
  },
  getUserByHandle: (handle: string): User | undefined => {
    return Object.values(mockDb.users).find(user => user.handle === handle);
  },
  updateUser: (id: string, data: Partial<User>) => {
    mockDb.users[id] = { ...mockDb.users[id], ...data };
    return mockDb.users[id];
  },

  // Followers
  getFollowers: (userId: string) => mockDb.followers[userId] || [],
  getFollowing: (userId: string) => mockDb.following[userId] || [],
  followUser: (userId: string, targetId: string) => {
    if (!mockDb.followers[targetId]) mockDb.followers[targetId] = [];
    if (!mockDb.following[userId]) mockDb.following[userId] = [];
    mockDb.followers[targetId].push(userId);
    mockDb.following[userId].push(targetId);
  },
  unfollowUser: (userId: string, targetId: string) => {
    mockDb.followers[targetId] = mockDb.followers[targetId]?.filter(id => id !== userId) || [];
    mockDb.following[userId] = mockDb.following[userId]?.filter(id => id !== targetId) || [];
  },

  // Tweets
  getTweet: (id: string) => mockDb.tweets[id],
  getUserTweets: (userId: string) => 
    Object.values(mockDb.tweets).filter(tweet => tweet.author === userId),
  createTweet: (data: Omit<Tweet, 'id'>) => {
    const id = `tweet-${Date.now()}`;
    mockDb.tweets[id] = { id, ...data };
    return mockDb.tweets[id];
  },

  // Messages
  getMessage: (id: string) => mockDb.messages[id],
  getUserMessages: (userId: string) => 
    Object.values(mockDb.messages).filter(
      msg => msg.sender === userId || msg.recipient === userId
    ),
  createMessage: (data: Omit<Message, 'id'>) => {
    const id = `msg-${Date.now()}`;
    mockDb.messages[id] = { id, ...data };
    return mockDb.messages[id];
  },

  // Notifications
  getNotification: (id: string) => mockDb.notifications[id],
  getUserNotifications: (userId: string) => 
    Object.values(mockDb.notifications).filter(
      notif => notif.actor === userId || 
      (mockDb.tweets[notif.target as string]?.author === userId)
    ),
  createNotification: (data: Omit<Notification, 'id'>) => {
    const id = `notif-${Date.now()}`;
    mockDb.notifications[id] = { id, ...data };
    return mockDb.notifications[id];
  },

  // Interactions
  getTweetLikes: (tweetId: string) => mockDb.likes[tweetId] || [],
  likeTweet: (userId: string, tweetId: string) => {
    if (!mockDb.likes[tweetId]) mockDb.likes[tweetId] = [];
    mockDb.likes[tweetId].push(userId);
    mockDb.tweets[tweetId].likedBy.push(userId);
    mockDb.tweets[tweetId].likes += 1;
  },
  unlikeTweet: (userId: string, tweetId: string) => {
    mockDb.likes[tweetId] = mockDb.likes[tweetId]?.filter(id => id !== userId) || [];
    mockDb.tweets[tweetId].likedBy = mockDb.tweets[tweetId].likedBy.filter(id => id !== userId);
    mockDb.tweets[tweetId].likes -= 1;
  },
  getTweetRetweets: (tweetId: string) => mockDb.retweets[tweetId] || [],
  retweet: (userId: string, tweetId: string) => {
    if (!mockDb.retweets[tweetId]) mockDb.retweets[tweetId] = [];
    mockDb.retweets[tweetId].push(userId);
    mockDb.tweets[tweetId].retweetedBy.push(userId);
    mockDb.tweets[tweetId].retweets += 1;
  },
  unretweet: (userId: string, tweetId: string) => {
    mockDb.retweets[tweetId] = mockDb.retweets[tweetId]?.filter(id => id !== userId) || [];
    mockDb.tweets[tweetId].retweetedBy = mockDb.tweets[tweetId].retweetedBy.filter(id => id !== userId);
    mockDb.tweets[tweetId].retweets -= 1;
  }
}; 