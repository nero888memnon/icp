import { useState } from 'react';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuth } from '../hooks/useAuth'; // Import useAuth for context

export default function Signup() {
  const router = useRouter();
  const { login } = useAuth(); // Access login from AuthContext

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage(null);
    setSuccessMessage(null);

    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to create account. Please try again.');
        return;
      }

      const data = await response.json();
      setSuccessMessage('Account created successfully! 🎉');

      // Log the user in automatically after signup
      await login(email, password); // Call login from AuthContext

      router.push('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Error details:', error); // Logs error for debugging
      setErrorMessage('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">Sign Up</h1>

      {errorMessage && (
        <div className="text-red-500 mt-4">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="text-green-500 mt-4">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSignup} className="mt-8 space-y-6">
        <div className="flex flex-col">
          <label htmlFor="name" className="font-semibold mb-1">Full Name</label>
          <input 
            id="name" 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Full Name" 
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required 
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="font-semibold mb-1">Email</label>
          <input 
            id="email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required 
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="font-semibold mb-1">Password</label>
          <input 
            id="password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required 
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="font-semibold mb-1">Confirm Password</label>
          <input 
            id="confirmPassword" 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="Confirm Password" 
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required 
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading} 
          className={`bg-blue-600 text-white px-6 py-3 mt-4 rounded-md hover:bg-blue-700 ${isLoading ? 'button-disabled' : ''}`}
        >
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
