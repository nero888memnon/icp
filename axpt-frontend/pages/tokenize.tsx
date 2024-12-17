import { useState } from 'react';
import React from 'react';
import { useAuth } from '../hooks/useAuth'; // Import useAuth to access user authentication context

export default function TokenizePage() {
  const { user } = useAuth(); // Access user data from AuthContext
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleTokenize = async () => {
    setErrorMessage(null);
    setMessage(null);

    if (!user) {
      setErrorMessage('You must be logged in to tokenize an asset.');
      return;
    }

    if (!file) {
      setErrorMessage('Please select a file to tokenize.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', user.id); // Include the user ID in the request payload

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/tokenize', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Tokenization failed. Please try again.');
        return;
      }

      const data = await response.json();
      setMessage(data.status || 'Asset tokenized successfully! 🎉');
    } catch (error) {
      console.error('Tokenization failed', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">Tokenize Your Asset</h1>

      {errorMessage && (
        <div className="bg-red-100 text-red-800 p-4 rounded-md mt-4">
          {errorMessage}
        </div>
      )}

      {message && (
        <div className="bg-green-100 text-green-800 p-4 rounded-md mt-4">
          {message}
        </div>
      )}

      <div className="mt-10">
        <label htmlFor="file-upload" className="block font-semibold mb-2">
          Select a file to tokenize
        </label>
        <input 
          type="file" 
          id="file-upload" 
          onChange={handleFileChange} 
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <button 
          onClick={handleTokenize} 
          disabled={isLoading}
          className={`bg-blue-600 text-white px-6 py-3 mt-4 rounded-md hover:bg-blue-700 transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Tokenizing...' : 'Tokenize Asset'}
        </button>
      </div>
    </div>
  );
}
