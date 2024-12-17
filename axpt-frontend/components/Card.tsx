import React from 'react';
import { useAuth } from '../hooks/useAuth'; // Import useAuth for authentication

type CardProps = {
  title: string;
  description: string;
  href: string;
  gradient: string;
};

export default function Card({ title, description, href, gradient }: CardProps) {
  const { user } = useAuth(); // Access user details from AuthContext

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!user) {
      e.preventDefault(); // Prevent navigation if the user is not authenticated
      alert('Please log in to access this content.');
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick} // Add authentication check
      className={`p-6 rounded-lg shadow-lg bg-gradient-to-r ${gradient} text-white transform hover:scale-105 transition duration-300 ${
        !user ? 'opacity-50 cursor-not-allowed' : ''
      }`} // Add visual indication if the user is not logged in
    >
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2">{description}</p>
    </a>
  );
}
