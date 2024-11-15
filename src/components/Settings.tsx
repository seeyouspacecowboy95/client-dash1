import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function Settings() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h2>
      
      <div className="space-y-6">
        <div className="bg-white dark:bg-dark-card p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900 dark:text-white">Theme</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Switch between light and dark themes
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-hover hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? (
                <div className="flex items-center space-x-2">
                  <Sun className="w-5 h-5 text-orange-500" />
                  <span className="text-sm text-gray-900 dark:text-white">Light Mode</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Moon className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-900 dark:text-white">Dark Mode</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}