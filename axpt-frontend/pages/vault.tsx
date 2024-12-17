import { useState, useEffect } from 'react';
import axios from '../services/axios'; // Centralized Axios instance
import { useAuth } from '../hooks/useAuth';

interface Asset {
  id: string; // Added to uniquely identify each asset
  name: string;
  type: string;
  description?: string; // Optional field for asset description
  previewUrl?: string; // Optional field for file preview image
}

export default function Vault() {
  const { user } = useAuth(); // Use user instead of identity to access the user object
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return; // Wait until the user is available

    const fetchAssets = async () => {
      try {
        const token = localStorage.getItem('auth-token'); // Use localStorage token
        if (!token) {
          setErrorMessage('You must be logged in to access your vault.');
          setIsLoading(false);
          return;
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${apiUrl}/api/vault`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAssets(response.data.assets || []); // Default to an empty array if data is null
      } catch (error) {
        console.error('Failed to fetch assets', error);
        setErrorMessage('Failed to load your vault. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssets();
  }, [user]);

  if (isLoading) return <p>Loading your vault...</p>;
  if (!user) return <p>Please log in to access your vault.</p>;

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">My Vault</h1>

      {errorMessage && (
        <div className="bg-red-100 text-red-800 p-4 rounded-md mt-4">
          {errorMessage}
        </div>
      )}

      {assets.length === 0 ? (
        <p className="mt-4 text-gray-500">No assets in your vault. Start by uploading one!</p>
      ) : (
        <ul className="mt-4">
          {assets.map((asset) => (
            <li key={asset.id} className="p-4 bg-gray-100 rounded-md mb-2 shadow-md">
              {asset.previewUrl && (
                <img 
                  src={asset.previewUrl} 
                  alt={`${asset.name} preview`} 
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
              )}
              <h3 className="font-bold">{asset.name}</h3>
              <p>Type: {asset.type}</p>
              {asset.description && <p>Description: {asset.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
