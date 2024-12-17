import React from 'react';
import { useAuth } from '../hooks/useAuth'; // Import useAuth for authentication

type ButtonProps = {
  text: string;
  onClick: () => void;
  loading?: boolean;
};

export default function Button({ text, onClick, loading }: ButtonProps) {
  const { user } = useAuth(); // Access user details from AuthContext

  return (
    <button
      onClick={() => {
        if (user) {
          onClick(); // Only execute onClick if the user is logged in
        } else {
          alert('Please log in to perform this action.');
        }
      }}
      disabled={loading || !user} // Disable button if loading or user is not logged in
      className={`bg-gold text-white px-6 py-3 rounded-md hover:shadow-glow ${
        loading || !user ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {loading ? 'Loading...' : text}
    </button>
  );
}
