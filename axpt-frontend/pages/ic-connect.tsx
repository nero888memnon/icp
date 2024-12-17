import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';

export default function ICConnect() {
  const { login, identity } = useAuth(); // Access context for login and identity
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleLoginWithInternetIdentity = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login failed', error);
      setErrorMessage('Failed to log in with Internet Identity.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null); // Clear any previous errors

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      
      // Store JWT token (for authentication)
      localStorage.setItem('auth-token', response.data.token);
      
      // Redirect to dashboard after login
      router.push('/dashboard');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    (<div className="center-container scrollable-container">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login to ICP dApp</h1>

        {identity ? (
          <Link href="/dashboard" legacyBehavior>
            <button className="form-button mt-4">Go to Dashboard</button>
          </Link>
        ) : (
          <button 
            onClick={handleLoginWithInternetIdentity} 
            className="form-button mt-4"
            disabled={loading}
          >
            {loading ? 'Connecting...' : 'Login with Internet Identity'}
          </button>
        )}

        <hr className="my-6" />

        <h2 className="text-xl font-bold mb-2">Or Login with Email</h2>

        {errorMessage && (
          <div className="text-red-500 mt-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleEmailPasswordLogin} className="mt-8">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="form-input"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="form-input mt-4"
          />
          <button 
            type="submit" 
            className={`bg-blue-600 text-white px-6 py-3 mt-4 rounded-md hover:bg-blue-700 ${loading ? 'button-disabled' : ''}`} 
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4">
          Don't have an account? 
          <Link href="/signup" className="text-blue-600 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>)
  );
}
