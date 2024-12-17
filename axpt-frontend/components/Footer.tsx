import React from 'react';
import { useAuth } from '../hooks/useAuth'; // Import useAuth for authentication

export default function Footer() {
  const { user } = useAuth(); // Access user details from AuthContext

  return (
    <footer className="w-full bg-indigo-900 py-6 text-center text-sm text-white">
      <p>&copy; 2024 ICP-DAPP. All rights reserved.</p>
      {user && (
        <p className="mt-2">
          Logged in as: <span className="font-bold">{user.email}</span>
        </p>
      )}
    </footer>
  );
}
