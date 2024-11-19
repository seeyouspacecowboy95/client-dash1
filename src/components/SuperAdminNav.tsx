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
  const [activeItem, setActiveItem] = useState('Home');

  return (
    <div className="w-full">
      {/* Top Bar */}
      <div className={`${isDarkMode ? 'bg-dark-card text-dark-text-primary' : 'bg-white text-gray-900'} shadow-sm border-b ${isDarkMode ? 'border-dark-border' : 'border-gray-200'}`}>
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
                <Menu.Button className={`p-2 hover:bg-${themeColor}-50 dark:hover:bg-dark-hover rounded-full transition-colors duration-200`}>
                  <Palette className={`w-6 h-6 ${isDarkMode ? 'text-dark-text-primary hover:text-' + themeColor + '-400' : 'text-gray-600 hover:text-' + themeColor + '-500'} transition-colors duration-200`} />
                </Menu.Button>
                <Transition
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className={`absolute right-0 mt-2 w-48 ${
                    isDarkMode ? 'bg-dark-card' : 'bg-white'
                  } shadow-lg rounded-md py-1 ring-1 ring-black ring-opacity-5 z-50`}>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setThemeColor('orange')}
                          className={`${
                            active ? (isDarkMode ? 'bg-dark-hover' : 'bg-gray-100') : ''
                          } flex w-full px-4 py-2 text-sm ${
                            isDarkMode ? 'text-dark-text-primary' : 'text-gray-700'
                          } transition-colors duration-150`}
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
                          } transition-colors duration-150`}
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
              <button className={`relative p-2 hover:bg-${themeColor}-50 dark:hover:bg-dark-hover rounded-full transition-colors duration-200`}>
                <Bell className={`w-6 h-6 ${isDarkMode ? 'text-dark-text-primary hover:text-' + themeColor + '-400' : 'text-gray-600 hover:text-' + themeColor + '-500'} transition-colors duration-200`} />
                {notifications > 0 && (
                  <span className={`absolute top-1 right-1 bg-${themeColor}-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center`}>
                    {notifications}
                  </span>
                )}
              </button>

              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme} 
                className={`p-2 hover:bg-${themeColor}-50 dark:hover:bg-dark-hover rounded-full transition-colors duration-200`}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? (
                  <Sun className={`w-6 h-6 text-dark-text-primary hover:text-${themeColor}-400 transition-colors duration-200`} />
                ) : (
                  <Moon className={`w-6 h-6 text-gray-600 hover:text-${themeColor}-500 transition-colors duration-200`} />
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
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className={`absolute right-0 mt-2 w-48 ${
                    isDarkMode ? 'bg-dark-card' : 'bg-white'
                  } shadow-lg rounded-md py-1 ring-1 ring-black ring-opacity-5 z-50`}>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={onLogout}
                          className={`${
                            active ? (isDarkMode ? 'bg-dark-hover' : 'bg-gray-100') : ''
                          } flex w-full px-4 py-2 text-sm ${
                            isDarkMode ? 'text-dark-text-primary' : 'text-gray-700'
                          } transition-colors duration-150`}
                        >
                          <LogOut className="w-5 h-5 mr-2" />
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className={`${isDarkMode ? 'bg-dark-card' : 'bg-white'} shadow-sm border-b ${isDarkMode ? 'border-dark-border' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 h-12">
            {navigation.map((item) => (
              <Menu as="div" key={item.name} className="relative inline-block text-left">
                {({ open }) => (
                  <>
                    <Menu.Button
                      onClick={() => setActiveItem(item.name)}
                      className={`inline-flex items-center px-1 h-12 text-sm font-medium relative
                        ${isDarkMode ? 'text-dark-text-primary hover:text-' + themeColor + '-400' : 'text-gray-900 hover:text-' + themeColor + '-600'}
                        transition-colors duration-200`}
                    >
                      {React.cloneElement(item.icon as React.ReactElement, {
                        className: `w-5 h-5 transition-colors duration-200 ${
                          activeItem === item.name
                            ? `text-${themeColor}-500`
                            : isDarkMode
                            ? 'text-dark-text-primary group-hover:text-' + themeColor + '-400'
                            : 'text-gray-600 group-hover:text-' + themeColor + '-500'
                        }`
                      })}
                      <span className="ml-2">{item.name}</span>
                      {item.items && (
                        <ChevronDown className={`ml-1 w-4 h-4 transform transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                      )}
                      {/* Animated underline */}
                      <div
                        className={`absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-transform duration-200 ${
                          activeItem === item.name ? 'scale-x-100' : 'scale-x-0'
                        } bg-${themeColor}-500`}
                      />
                    </Menu.Button>

                    {item.items && (
                      <Transition
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className={`absolute left-0 mt-2 w-48 ${
                          isDarkMode ? 'bg-dark-card' : 'bg-white'
                        } shadow-lg rounded-md py-1 ring-1 ring-black ring-opacity-5 z-50`}>
                          {item.items.map((subItem) => (
                            <Menu.Item key={subItem.name}>
                              {({ active }) => (
                                <a
                                  href={subItem.href}
                                  className={`${
                                    active ? (isDarkMode ? 'bg-dark-hover' : `bg-${themeColor}-50`) : ''
                                  } flex px-4 py-2 text-sm ${
                                    isDarkMode ? 'text-dark-text-primary' : 'text-gray-700'
                                  } transition-colors duration-150`}
                                >
                                  {React.cloneElement(subItem.icon as React.ReactElement, {
                                    className: `w-5 h-5 ${active ? `text-${themeColor}-500` : ''} transition-colors duration-150`
                                  })}
                                  <span className="ml-2">{subItem.name}</span>
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    )}
                  </>
                )}
              </Menu>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SuperAdminNav;