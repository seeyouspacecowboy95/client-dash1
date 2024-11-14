import React from 'react';
import { Sun, Moon, LayoutDashboard, User, FileText, CreditCard, Activity, MessageSquare, LogOut } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function Sidebar({ isOpen, onClose, onLogout }: SidebarProps) {
  const { isDark, toggleTheme } = useTheme();

  const menuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '#' },
    { icon: <User className="w-5 h-5" />, label: 'My Account', path: '#' },
    { icon: <FileText className="w-5 h-5" />, label: 'Statements', path: '#' },
    { icon: <CreditCard className="w-5 h-5" />, label: 'Payment', path: '#' },
    { icon: <Activity className="w-5 h-5" />, label: 'Meter Readings', path: '#' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Query', path: '#' },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-dark-bg transform transition-transform duration-200 ease-in-out z-50 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header with Logo */}
          <div className="p-4 border-b dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <img
                  src="https://raw.githubusercontent.com/twinbladeRoG/mohokare-municipality/main/logo.png"
                  alt="Mohokare Municipality"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-dark-card hover:bg-gray-200 dark:hover:bg-dark-hover transition-colors"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-orange-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Menu
              </h3>
              <nav className="space-y-1">
                {menuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.path}
                    className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors group"
                  >
                    <span className="text-gray-500 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-500">
                      {item.icon}
                    </span>
                    <span className="ml-3">{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t dark:border-gray-700">
            <button
              onClick={onLogout}
              className="flex items-center w-full px-3 py-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors group"
            >
              <span className="text-gray-500 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-500">
                <LogOut className="w-5 h-5" />
              </span>
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}