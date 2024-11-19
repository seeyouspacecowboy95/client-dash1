import React, { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { 
  Home, 
  Layout, 
  Mail, 
  HelpCircle, 
  Bell, 
  Sun, 
  Moon,
  LogOut,
  Menu as MenuIcon,
  X,
  ChevronDown,
  Palette,
  FileText,
  Plus,
  Image
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface NavItem {
  name: string;
  icon: React.ReactNode;
  href: string;
  items?: NavItem[];
}

const navigation: NavItem[] = [
  { name: 'Home', icon: <Home className="w-5 h-5" />, href: '/' },
  {
    name: 'Interface',
    icon: <Palette className="w-5 h-5" />,
    href: '#',
    items: [
      { name: 'Colors', icon: <Palette className="w-5 h-5" />, href: '/colors' },
      { name: 'Typography', icon: <FileText className="w-5 h-5" />, href: '/typography' },
    ]
  },
  { name: 'Form Elements', icon: <FileText className="w-5 h-5" />, href: '/forms' },
  {
    name: 'Extra',
    icon: <Plus className="w-5 h-5" />,
    href: '#',
    items: [
      { name: 'Charts', icon: <FileText className="w-5 h-5" />, href: '/charts' },
      { name: 'Tables', icon: <FileText className="w-5 h-5" />, href: '/tables' },
    ]
  },
  {
    name: 'Layout',
    icon: <Layout className="w-5 h-5" />,
    href: '#',
    items: [
      { name: 'Grid', icon: <Layout className="w-5 h-5" />, href: '/grid' },
      { name: 'Flex', icon: <Layout className="w-5 h-5" />, href: '/flex' },
    ]
  },
  { name: 'Emails', icon: <Mail className="w-5 h-5" />, href: '/emails' },
  { name: 'Illustrations', icon: <Image className="w-5 h-5" />, href: '/illustrations' },
  {
    name: 'Help',
    icon: <HelpCircle className="w-5 h-5" />,
    href: '#',
    items: [
      { name: 'Documentation', icon: <FileText className="w-5 h-5" />, href: '/docs' },
      { name: 'Support', icon: <HelpCircle className="w-5 h-5" />, href: '/support' },
    ]
  },
];

interface SuperAdminNavProps {
  onLogout: () => void;
}

const SuperAdminNav: React.FC<SuperAdminNavProps> = ({ onLogout }) => {
  const { isDarkMode, toggleTheme, themeColor, setThemeColor } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications] = useState(3);

  return (
    <div className={`${isDarkMode ? 'bg-dark-card text-dark-text-primary' : 'bg-white text-gray-900'} shadow-lg`}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Branding */}
          <div className="flex items-center">
            <span className={`text-xl font-bold text-${themeColor}-600`}>Super Admin</span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Color Toggle */}
            <Menu as="div" className="relative">
              <Menu.Button className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full transition-colors">
                <Palette className={`w-6 h-6 ${isDarkMode ? 'text-dark-text-primary' : 'text-gray-600'}`} />
              </Menu.Button>
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className={`absolute right-0 mt-2 w-48 ${
                  isDarkMode ? 'bg-dark-card' : 'bg-white'
                } shadow-lg rounded-md py-1 ring-1 ring-black ring-opacity-5`}>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setThemeColor('orange')}
                        className={`${
                          active ? (isDarkMode ? 'bg-dark-hover' : 'bg-gray-100') : ''
                        } flex w-full px-4 py-2 text-sm ${
                          isDarkMode ? 'text-dark-text-primary' : 'text-gray-700'
                        }`}
                      >
                        <div className="w-4 h-4 rounded-full bg-orange-500 mr-2" />
                        Orange Theme
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setThemeColor('blue')}
                        className={`${
                          active ? (isDarkMode ? 'bg-dark-hover' : 'bg-gray-100') : ''
                        } flex w-full px-4 py-2 text-sm ${
                          isDarkMode ? 'text-dark-text-primary' : 'text-gray-700'
                        }`}
                      >
                        <div className="w-4 h-4 rounded-full bg-blue-500 mr-2" />
                        Blue Theme
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Notification Bell */}
            <button className="relative p-2">
              <Bell className={`w-6 h-6 ${isDarkMode ? 'text-dark-text-primary' : 'text-gray-600'}`} />
              {notifications > 0 && (
                <span className={`absolute top-1 right-1 bg-${themeColor}-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center`}>
                  {notifications}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full transition-colors"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Sun className="w-6 h-6 text-dark-text-primary" />
              ) : (
                <Moon className="w-6 h-6 text-gray-600" />
              )}
            </button>

            {/* Profile Menu */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-2">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://ui-avatars.com/api/?name=Rofhiwa+Mudau"
                  alt="Profile"
                />
                <div className="hidden md:block text-left">
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-dark-text-primary' : 'text-gray-700'}`}>
                    Rofhiwa Mudau
                  </span>
                  <br />
                  <span className={`text-xs ${isDarkMode ? 'text-dark-text-secondary' : 'text-gray-500'}`}>
                    Super Admin
                  </span>
                </div>
              </Menu.Button>

              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className={`absolute right-0 mt-2 w-48 ${
                  isDarkMode ? 'bg-dark-card' : 'bg-white'
                } shadow-lg rounded-md py-1 ring-1 ring-black ring-opacity-5`}>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={onLogout}
                        className={`${
                          active ? (isDarkMode ? 'bg-dark-hover' : 'bg-gray-100') : ''
                        } flex w-full px-4 py-2 text-sm ${
                          isDarkMode ? 'text-dark-text-primary' : 'text-gray-700'
                        }`}
                      >
                        <LogOut className="w-5 h-5 mr-2" />
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 ${isDarkMode ? 'text-dark-text-primary' : 'text-gray-600'}`} />
              ) : (
                <MenuIcon className={`w-6 h-6 ${isDarkMode ? 'text-dark-text-primary' : 'text-gray-600'}`} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminNav;