import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for User
interface User {
  id: string;
  email: string;
}

// Define the type for the AuthContext
export interface AuthContextType {
  user: User | null;  // Use the User interface directly
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context
export const AuthContext = createContext<AuthContextType | null>(null);

// Define the AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);  // Use User type here

  const login = async (email: string, password: string) => {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    setUser({ id: data.user.id, email: data.user.email });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
