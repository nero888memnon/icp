import { useEffect } from 'react';
import React, { useState } from 'react';
import axios from '../services/axios'; // Centralized Axios instance
import router from 'next/router';
import { useAuth } from '../hooks/useAuth'; // Import useAuth for context

export default function Profile() {
  const { user, logout } = useAuth(); // Access AuthContext for user and logout function
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) {
          console.warn('No user found in context, redirecting to login');
          router.push('/ic-connect'); // Redirect to login if no user in context
          return;
        }

        const response = await axios.get('/user/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
          },
        });

        setUserData(response.data.user);
      } catch (error) {
        console.error('Failed to fetch user data', error);
        if (error.response?.status === 401) {
          logout(); // Logout user if token is invalid or expired
          router.push('/ic-connect');
        }
      }
    };

    fetchUserData();
  }, [user, logout]);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">User Profile</h1>

      <div className="mt-8">
        <p><strong>Name:</strong> {userData.name || 'N/A'}</p>
        <p><strong>Email:</strong> {userData.email || 'N/A'}</p>
        <p><strong>Country:</strong> {userData.country || 'N/A'}</p>
        <p><strong>Address:</strong> {userData.address || 'N/A'}</p>
        <p><strong>Public Key:</strong> {userData.publicKey || 'N/A'}</p>
        <p><strong>Private Key:</strong> {userData.privateKey || 'N/A'}</p>
      </div>

      <div className="mt-8">
        <button 
          onClick={() => router.push('/dashboard')} 
          className="bg-blue-600 text-white px-6 py-3 mt-4 rounded-md hover:bg-blue-700"
        >
          Go to Dashboard
        </button>

        <button 
          onClick={() => router.push('/settings')} 
          className="bg-blue-600 text-white px-6 py-3 mt-4 rounded-md hover:bg-blue-700"
        >
          Go to Settings
        </button>

        <button 
          onClick={() => router.push('/currency-converter')} 
          className="bg-blue-600 text-white px-6 py-3 mt-4 rounded-md hover:bg-blue-700"
        >
          Currency Converter
        </button>

        <button 
          onClick={() => router.push('/wallet')} 
          className="bg-blue-600 text-white px-6 py-3 mt-4 rounded-md hover:bg-blue-700"
        >
          Go to Wallet
        </button>

        <button 
          onClick={logout} 
          className="bg-red-600 text-white px-6 py-3 mt-4 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
