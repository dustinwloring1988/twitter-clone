import React from 'react';
import { Search } from 'lucide-react';

export function RightSidebar() {
  const trends = [
    { topic: 'Technology', tweets: '125K' },
    { topic: 'Programming', tweets: '85K' },
    { topic: 'React', tweets: '65K' },
    { topic: 'TypeScript', tweets: '45K' },
  ];

  return (
    <div className="fixed right-0 h-screen w-80 border-l border-gray-200 p-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mt-4 bg-gray-50 rounded-xl p-4">
        <h2 className="text-xl font-bold mb-4">Trends for you</h2>
        {trends.map((trend) => (
          <div key={trend.topic} className="mb-4">
            <p className="font-bold">{trend.topic}</p>
            <p className="text-gray-500">{trend.tweets} Tweets</p>
          </div>
        ))}
      </div>
    </div>
  );
}