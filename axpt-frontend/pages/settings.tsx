import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Settings() {
  // Access AuthContext values
  const { user, login, logout } = useAuth();

  // Initialize state variables
  const [name, setName] = useState<string>(user?.id || ''); // Using user ID for demonstration purposes
  const [email, setEmail] = useState<string>(user?.email || ''); // Default to user's email if available
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handle form submission for updating user info
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset messages
    setErrorMessage(null);
    setSuccessMessage(null);

    // Basic validation
    if (!name.trim() || !email.trim()) {
      setErrorMessage('Both name and email are required.');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call for updating user info
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Updated Info:', { name, email });
      setSuccessMessage('Settings updated successfully!');
    } catch (error) {
      setErrorMessage('Failed to update settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-4">Settings</h1>

      {/* Display error messages */}
      {errorMessage && (
        <div className="bg-red-100 text-red-800 p-4 rounded-md mb-4">
          {errorMessage}
        </div>
      )}

      {/* Display success messages */}
      {successMessage && (
        <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleUpdate} className="space-y-6">
        {/* Full Name Input */}
        <div className="flex flex-col">
          <label htmlFor="name" className="font-semibold mb-1">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email Input */}
        <div className="flex flex-col">
          <label htmlFor="email" className="font-semibold mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 mt-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update Settings'}
        </button>
      </form>
    </div>
  );
}
