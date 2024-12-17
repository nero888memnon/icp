import React from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const { user, logout } = useAuth(); // Access user and logout from AuthContext

  return (
    (<header className="bg-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-white font-bold text-xl">ICP-DAPP</h1>
      
      {user ? (
        <div className="flex items-center space-x-4">
          <p className="text-white">Welcome, {user.email}</p>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-white">Not Logged In</p>
      )}
    </header>)
  );
}
