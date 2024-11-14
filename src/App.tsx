import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Dashboard from './components/Dashboard';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import LoadingSpinner from './components/LoadingSpinner';
import { ThemeProvider } from './contexts/ThemeContext';

interface User {
  email: string;
  name: string;
  role: 'user' | 'superadmin';
}

const USERS: Record<string, User> = {
  'tshepang@zimako.co.za': {
    email: 'tshepang@zimako.co.za',
    name: 'Tshepang',
    role: 'user'
  },
  'mudau@zimako.co.za': {
    email: 'mudau@zimako.co.za',
    name: 'Mudau',
    role: 'superadmin'
  }
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLoginSuccess = (email: string) => {
    const user = USERS[email];
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
      setCurrentUser(user);
    }, 4000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleNewUserSignup = (email: string, name: string) => {
    USERS[email] = {
      email,
      name,
      role: 'user'
    };
  };

  return (
    <ThemeProvider>
      {isLoading ? (
        <LoadingSpinner />
      ) : isLoggedIn && currentUser ? (
        currentUser.role === 'superadmin' ? (
          <SuperAdminDashboard onLogout={handleLogout} />
        ) : (
          <Dashboard
            onLogout={handleLogout}
            userEmail={currentUser.email}
            userName={currentUser.name}
          />
        )
      ) : (
        <div className="min-h-screen bg-white">
          <Navbar
            onLoginSuccess={handleLoginSuccess}
            onNewUserSignup={handleNewUserSignup}
          />
          <main>
            <Hero />
            <Features />
          </main>
          <footer className="bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center text-gray-600">
                <p>© 2024 Bolt. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;