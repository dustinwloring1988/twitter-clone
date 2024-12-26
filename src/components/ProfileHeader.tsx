import React, { useState } from 'react';
import { MapPin, Link as LinkIcon, Calendar } from 'lucide-react';
import type { User } from '../types';
import { ImageLightbox } from './ImageLightbox';

interface ProfileHeaderProps {
  user: User;
  isCurrentUser: boolean;
  onEditProfile: () => void;
}

export function ProfileHeader({ user, isCurrentUser, onEditProfile }: ProfileHeaderProps) {
  const [showAvatarLightbox, setShowAvatarLightbox] = useState(false);

  return (
    <div className="relative">
      <div className="h-48 bg-gray-200 dark:bg-gray-800">
        {user.coverImage && (
          <img
            src={user.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <button
            onClick={() => setShowAvatarLightbox(true)}
            className="rounded-full transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 -mt-16"
            />
          </button>
          {isCurrentUser && (
            <button
              onClick={onEditProfile}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full font-semibold hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Edit profile
            </button>
          )}
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-500">@{user.handle}</p>
          {user.bio && <p className="mt-4">{user.bio}</p>}
          <div className="flex flex-wrap gap-4 mt-4 text-gray-500">
            {user.location && (
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{user.location}</span>
              </div>
            )}
            {user.website && (
              <div className="flex items-center gap-1">
                <LinkIcon size={16} />
                <a href={user.website} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                  {user.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>Joined {user.joinedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <span><strong>{user.following}</strong> <span className="text-gray-500">Following</span></span>
            <span><strong>{user.followers}</strong> <span className="text-gray-500">Followers</span></span>
          </div>
        </div>
      </div>

      {showAvatarLightbox && (
        <ImageLightbox
          imageUrl={user.avatar}
          altText={user.name}
          onClose={() => setShowAvatarLightbox(false)}
        />
      )}
    </div>
  );
}