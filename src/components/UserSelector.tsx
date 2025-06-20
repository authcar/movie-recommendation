import React from 'react';
import { User } from 'lucide-react';
import { userProfiles } from '../data';

interface UserSelectorProps {
  currentUser: number;
  onUserChange: (userId: number) => void;
}

export const UserSelector: React.FC<UserSelectorProps> = ({
  currentUser,
  onUserChange
}) => {
  return (
    <div className="mb-6 text-center">
      <div className="inline-flex items-center space-x-3 bg-white rounded-lg shadow-md p-4">
        <User className="w-5 h-5 text-gray-600" />
        <label className="text-sm font-medium text-gray-700">
          Select User Profile:
        </label>
        <select
          value={currentUser}
          onChange={(e) => onUserChange(parseInt(e.target.value))}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[200px]"
        >
          {userProfiles.map(profile => (
            <option key={profile.id} value={profile.id}>
              {profile.name}
            </option>
          ))}
        </select>
      </div>

      {/* Show current user description */}
      <div className="mt-3 text-sm text-gray-600">
        {userProfiles.find(profile => profile.id === currentUser)?.description}
      </div>
    </div>
  );
};
