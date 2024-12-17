import React from 'react';
import { useAuth } from '../hooks/useAuth'; // Import useAuth for authentication

type AssetCardProps = {
  name: string;
  type: string;
  date: string;
  previewUrl?: string;
  onClick?: () => void;
};

export default function AssetCard({ name, type, date, previewUrl, onClick }: AssetCardProps) {
  const { user } = useAuth(); // Access user details from AuthContext

  return (
    <div
      className="bg-primary text-white p-6 rounded-lg shadow-md hover:shadow-glow cursor-pointer transition-all"
      onClick={onClick}
    >
      {previewUrl && (
        <img
          src={previewUrl}
          alt={`${name} preview`}
          className="w-full h-32 object-cover rounded-md mb-4"
        />
      )}

      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-sm text-gray-400">Type: {type}</p>
      <p className="text-sm text-gray-400">Created: {new Date(date).toLocaleDateString()}</p>

      {user ? (
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          View Details
        </button>
      ) : (
        <p className="text-red-500 text-sm mt-4">
          Log in to view more details about this asset.
        </p>
      )}
    </div>
  );
}
