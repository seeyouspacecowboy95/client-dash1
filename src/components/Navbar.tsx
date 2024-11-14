import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import AuthModal from './AuthModal';

interface NavbarProps {
  onLoginSuccess: () => void;
}

export default function Navbar({ onLoginSuccess }: NavbarProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-orange-600">Mohokare Municipality</div>
            </div>
            <div className="flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-orange-600 transition-colors">Features</a>
              <a href="#about" className="text-gray-700 hover:text-orange-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-orange-600 transition-colors">Contact</a>
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-700 transition-colors"
              >
                <LogIn size={18} />
                <span>Login</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={onLoginSuccess}
      />
    </>
  );
}