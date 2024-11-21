import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import BlogSection from './components/BlogSection';
import AdvertisingSection from './components/AdvertisingSection';
import Dashboard from './components/Dashboard';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import AdminDashboard from './components/AdminDashboard';
import LoadingSpinner from './components/LoadingSpinner';
import { ThemeProvider } from './contexts/ThemeContext';

interface User {
  email: string;
  name: string;
  role: 'user' | 'superadmin' | 'admin';
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
  },
  'admin@zimako.co.za': {
    email: 'admin@zimako.co.za',
    name: 'Admin',
    role: 'admin'
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isLoggedIn && currentUser) {
    switch (currentUser.role) {
      case 'superadmin':
        return <SuperAdminDashboard onLogout={handleLogout} />;
      case 'admin':
        return (
          <AdminDashboard
            onLogout={handleLogout}
            userEmail={currentUser.email}
            userName={currentUser.name}
          />
        );
      default:
        return (
          <Dashboard
            onLogout={handleLogout}
            userEmail={currentUser.email}
            userName={currentUser.name}
          />
        );
    }
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white">
        <Navbar
          onLoginSuccess={handleLoginSuccess}
          onNewUserSignup={handleNewUserSignup}
        />
        <main>
          <Hero />
          <Features />
          <Testimonials />
          <BlogSection />
          <AdvertisingSection />
        </main>
        <footer className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-gray-600">
              <p>© 2024 Zimako Smart Digital Solutions. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;