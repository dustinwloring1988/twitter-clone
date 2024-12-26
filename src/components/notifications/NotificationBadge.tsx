import React from 'react';
import { useColorScheme } from '../../hooks/useColorScheme';

interface NotificationBadgeProps {
  count: number;
}

export function NotificationBadge({ count }: NotificationBadgeProps) {
  const { getAccentColor } = useColorScheme();
  
  if (count === 0) return null;

  return (
    <div 
      className="absolute -top-1 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
      style={{ backgroundColor: getAccentColor() }}
    >
      {count > 9 ? '9+' : count}
    </div>
  );
}