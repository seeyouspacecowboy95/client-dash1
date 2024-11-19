import React, { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { 
  Home, 
  Layout, 
  Mail, 
  Settings,
  Bell, 
  Sun, 
  Moon,
  LogOut,
  Menu as MenuIcon,
  X,
  ChevronDown,
  FileText,
  Box,
  Layers
} from 'lucide-react';

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
    icon: <Box className="w-5 h-5" />,
    href: '#',
    items: [
      { name: 'Components', icon: <Layers className="w-5 h-5" />, href: '/components' },
      { name: 'Cards', icon: <Layout className="w-5 h-5" />, href: '/cards' },
      { name: 'Buttons', icon: <Box className="w-5 h-5" />, href: '/buttons' }
    ]
  },
  { name: 'Form Elements', icon: <FileText className="w-5 h-5" />, href: '/forms' },
  {
    name: 'Extra',
    icon: <Box className="w-5 h-5" />,
    href: '#',
    items: [
      { name: 'Charts', icon: <FileText className="w-5 h-5" />, href: '/charts' },
      { name: 'Tables', icon: <Layout className="w-5 h-5" />, href: '/tables' }
    ]
  },
  {
    name: 'Layout',
    icon: <Layout className="w-5 h-5" />,
    href: '#',
    items: [
      { name: 'Grid', icon: <Layout className="w-5 h-5" />, href: '/grid' },
      { name: 'Containers', icon: <Box className="w-5 h-5" />, href: '/containers' }
    ]
  },
  { name: 'Emails', icon: <Mail className="w-5 h-5" />, href: '/emails' },
  {
    name: 'Settings',
    icon: <Settings className="w-5 h-5" />,
    href: '#',
    items: [
      { name: 'General', icon: <Settings className="w-5 h-5" />, href: '/settings/general' },
      { name: 'Security', icon: <Settings className="w-5 h-5" />, href: '/settings/security' }
    ]
  }
];

interface SuperAdminNavProps {
  onLogout: () => void;
}

const SuperAdminNav: React.FC<SuperAdminNavProps> = ({ onLogout }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications] = useState(3);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="bg-white shadow-lg">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Branding */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-orange-600">Super Admin</span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <button className="relative p-2">
              <Bell className="w-6 h-6 text-gray-600" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="p-2">
              {isDarkMode ? <Sun className="w-6 h-6 text-gray-600" /> : <Moon className="w-6 h-6 text-gray-600" />}
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
                  <span className="text-sm font-medium text-gray-700">Rofhiwa Mudau</span>
                  <br />
                  <span className="text-xs text-gray-500">Super Admin</span>
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
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 ring-1 ring-black ring-opacity-5">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={onLogout}
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } flex w-full px-4 py-2 text-sm text-gray-700`}
                      >
                        <LogOut className="w-5 h-5 mr-2" />
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-gray-600" /> : <MenuIcon className="w-6 h-6 text-gray-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Navigation */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="hidden md:flex h-12">
            {navigation.map((item) => (
              item.items ? (
                <Menu as="div" className="relative inline-block text-left" key={item.name}>
                  <Menu.Button className="inline-flex items-center h-12 px-4 text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50">
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </Menu.Button>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute left-0 mt-1 w-48 bg-white shadow-lg rounded-md py-1 ring-1 ring-black ring-opacity-5">
                      {item.items.map((subItem) => (
                        <Menu.Item key={subItem.name}>
                          {({ active }) => (
                            <a
                              href={subItem.href}
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } flex px-4 py-2 text-sm text-gray-700`}
                            >
                              {subItem.icon}
                              <span className="ml-2">{subItem.name}</span>
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="inline-flex items-center h-12 px-4 text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50"
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </a>
              )
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.items ? (
                  <Menu as="div" className="w-full">
                    <Menu.Button className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-700">
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                      <ChevronDown className="ml-auto w-4 h-4" />
                    </Menu.Button>
                    <Menu.Items className="ml-4">
                      {item.items.map((subItem) => (
                        <Menu.Item key={subItem.name}>
                          {({ active }) => (
                            <a
                              href={subItem.href}
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } flex px-4 py-2 text-sm text-gray-700`}
                            >
                              {subItem.icon}
                              <span className="ml-2">{subItem.name}</span>
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Menu>
                ) : (
                  <a
                    href={item.href}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700"
                  >
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminNav;