import React from 'react';
import { Sun, Moon, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function Settings() {
  const { isDark, toggleTheme, themeColor, setThemeColor } = useTheme();

  const themeColors = [
    { id: 'orange', label: 'Orange', color: 'rgb(234, 88, 12)' },
    { id: 'blue', label: 'Blue', color: 'rgba(39, 200, 245, 0.8)' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h2>
      
      <div className="space-y-6">
        <div className="bg-white dark:bg-dark-card p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900 dark:text-white">Theme Mode</p>
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

            <div>
              <p className="text-gray-900 dark:text-white mb-2">Theme Color</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Choose your preferred accent color
              </p>
              <div className="flex space-x-4">
                {themeColors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setThemeColor(color.id as 'orange' | 'blue')}
                    className="group relative rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                  >
                    <div
                      className="h-8 w-8 rounded-full border-2 border-transparent"
                      style={{ backgroundColor: color.color }}
                    />
                    {themeColor === color.id && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <span className="sr-only">{color.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}