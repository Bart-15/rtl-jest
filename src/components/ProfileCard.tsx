'use client';

import { useState } from 'react';

interface ProfileCardProps {
  name: string;
  jobTitle: string;
  initialIsFollowing?: boolean;
}

const ProfileCard = ({
  name,
  jobTitle,
  initialIsFollowing = false,
}: ProfileCardProps) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="max-w-xs rounded-lg bg-white p-4 shadow-md">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-600">{jobTitle}</p>
      <button
        onClick={handleFollowToggle}
        className={`mt-4 rounded px-4 py-2 ${
          isFollowing ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
        }`}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
};

export default ProfileCard;
