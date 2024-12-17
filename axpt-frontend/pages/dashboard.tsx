import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getTransactionHistory } from '../services/transactions';
import Card from '../components/Card';

export default function Dashboard() {
  // Mocked User for Development
  const user = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User'
  };

  const router = useRouter();
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userId = user.id; // Use user ID from mocked user
        const history = await getTransactionHistory(userId);
        setTransactions(history);
      } catch (error) {
        console.error('Failed to fetch transactions', error);
      }
    };

    fetchTransactions();
  }, [user]);

  const handleLogout = () => {
    router.push('/ic-connect'); // Redirect user to login page after logout
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">Dashboard</h1>

      {user && (
        <div className="bg-green-100 text-green-800 p-4 rounded-md mt-4">
          <p>Welcome, <strong>{user.email}</strong>!</p>
        </div>
      )}

      <div className="mt-4">
        <button 
          onClick={handleLogout} 
          className="bg-red-600 text-white px-6 py-3 mt-4 rounded-md hover:bg-red-700">
          Logout
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Quick Links</h2>

        <button 
          onClick={() => router.push('/settings')} 
          className="bg-blue-600 text-white px-6 py-3 mt-4 rounded-md hover:bg-blue-700">
          Go to Settings
        </button>

        <button 
          onClick={() => router.push('/wallet')} 
          className="bg-blue-600 text-white px-6 py-3 mt-4 rounded-md hover:bg-blue-700">
          Wallet with Currency Converter
        </button>

        <button 
          onClick={() => router.push('/vault')} 
          className="bg-blue-600 text-white px-6 py-3 mt-4 rounded-md hover:bg-blue-700">
          Vault with Tokenize Tool
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Transaction History</h2>

        {transactions.length === 0 && (
          <p className="mt-4 text-gray-400">No transactions available.</p>
        )}

        <ul className="mt-4">
          {transactions.map((transaction, idx) => (
            <li 
              key={idx} 
              className="p-4 bg-gray-800 text-white rounded-md mb-2 shadow-md">
              <p><strong>Type:</strong> {transaction.type}</p>
              <p><strong>Amount:</strong> {transaction.amount} {transaction.currency}</p>
              <p><strong>Status:</strong> {transaction.status}</p>
              <p><strong>Date:</strong> {new Date(transaction.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
