import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import type { User } from '../types';
import { db } from '../data/mockDb';

interface FollowersListProps {
  userId: string;
  isFollowing?: boolean;
}

export function FollowersList({ userId, isFollowing = false }: FollowersListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const userIds = isFollowing ? db.getFollowing(userId) : db.getFollowers(userId);
  
  const filteredUsers = useMemo(() => {
    return userIds.filter(id => {
      const user = db.getUser(id);
      if (!user) return false;
      if (!searchQuery) return true;

      const searchLower = searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchLower) ||
        user.handle.toLowerCase().includes(searchLower) ||
        user.bio?.toLowerCase().includes(searchLower)
      );
    });
  }, [userIds, searchQuery]);
  
  return (
    <div>
      <div className="sticky top-[185px] bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
          <input
            type="text"
            placeholder={`Search ${isFollowing ? 'following' : 'followers'}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {filteredUsers.map((id) => {
          const user = db.getUser(id);
          if (!user) return null;

          return (
            <div key={id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-4">
                <Link to={`/profile/${user.handle}`}>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full"
                  />
                </Link>
                <div className="flex-1">
                  <Link 
                    to={`/profile/${user.handle}`}
                    className="font-bold hover:underline"
                  >
                    {user.name}
                  </Link>
                  <p className="text-gray-500">@{user.handle}</p>
                  {user.bio && (
                    <p className="mt-1 text-gray-600 dark:text-gray-400">{user.bio}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 