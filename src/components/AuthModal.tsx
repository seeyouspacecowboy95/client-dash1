import React, { useState } from 'react';
import { X } from 'lucide-react';
import { validateCredentials } from '../utils/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'signup';
  onLoginSuccess: (email: string) => void;
  onNewUserSignup: (email: string, name: string) => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  initialView = 'login',
  onLoginSuccess,
  onNewUserSignup
}: AuthModalProps) {
  const [view, setView] = useState<'login' | 'signup'>(initialView);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (validateCredentials({ email, password })) {
      onLoginSuccess(email);
      onClose();
    } else {
      setError('Invalid email or password');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      onNewUserSignup(email, name);
      setView('login');
      setEmail('');
      setPassword('');
      setName('');
    }
  };

  if (!isOpen) return null;

  const welcomeMessage = (
    <div className="bg-theme/10 p-6 rounded-lg">
      <h3 className="text-xl font-bold text-theme mb-4">Welcome to Zimako Smart Digital Solutions</h3>
      <p className="text-gray-800 mb-4">Access your services with ease:</p>
      <ul className="space-y-2 text-gray-700">
        <li>✓ Manage your digital solutions</li>
        <li>✓ Access analytics and reports</li>
        <li>✓ Monitor system performance</li>
        <li>✓ Available 24/7 for your convenience</li>
      </ul>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {view === 'login' ? (
              <>
                <h2 className="text-3xl font-bold text-gray-900">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-lg">
                      {error}
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-theme focus:ring-theme"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-theme focus:ring-theme"
                      placeholder="Enter your password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-theme text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Login
                  </button>
                </form>
                <p className="text-center text-gray-600">
                  Don't have an account?{' '}
                  <button
                    onClick={() => setView('signup')}
                    className="text-theme hover:opacity-90"
                  >
                    Sign up
                  </button>
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-gray-900">Sign Up</h2>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-theme focus:ring-theme"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-theme focus:ring-theme"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-theme focus:ring-theme"
                      placeholder="Create a password"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-theme text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Sign Up
                  </button>
                </form>
                <p className="text-center text-gray-600">
                  Already have an account?{' '}
                  <button
                    onClick={() => setView('login')}
                    className="text-theme hover:opacity-90"
                  >
                    Login
                  </button>
                </p>
              </>
            )}
          </div>
          <div>{welcomeMessage}</div>
        </div>
      </div>
    </div>
  );
}