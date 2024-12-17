import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext'; 

const Home = () => {
  const { user, logout } = useAuth(); 
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is only rendered after it is mounted on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="center-container">
      <h1 className="animate-fadeIn">Welcome to ICP-DAPP</h1>

      {user ? (
        <div className="card">
          <p>Logged in as: {user.email}</p>
          <button onClick={logout} className="button">Logout</button>
        </div>
      ) : (
        <div className="center-container">
          <Link href="/ic-connect">
            <span className="button">
              Sign In
            </span>
          </Link>

          <Link href="/signup">
            <span className="button">
              Sign Up
            </span>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mt-10">
        {user ? (
          <>
            <div className="card">
              <div className="flex-center">
                <h2 className="text-2xl font-bold">Tokenize</h2>
                <div className="icon">
                  <img src="https://img.icons8.com/ios-filled/20/ffffff/info.png" alt="Info" />
                </div>
              </div>
              <Link href="/tokenize">
                <span className="button">
                  Go to Tokenize
                </span>
              </Link>
            </div>

            <div className="card">
              <div className="flex-center">
                <h2 className="text-2xl font-bold">Vault</h2>
                <div className="icon">
                  <img src="https://img.icons8.com/ios-filled/20/ffffff/info.png" alt="Info" />
                </div>
              </div>
              <Link href="/vault">
                <span className="button">
                  Go to Vault
                </span>
              </Link>
            </div>
          </>
        ) : (
          <p className="mt-4">Log in to see Tokenize and Vault</p>
        )}
      </div>
    </div>
  );
};

export default Home;
