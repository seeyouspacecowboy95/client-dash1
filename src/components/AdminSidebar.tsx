import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileBarChart,
  Users,
  Bell,
  MessageSquare,
  Gauge,
  Settings,
  Menu,
  X
} from 'lucide-react';

interface SidebarItem {
  name: string;
  icon: React.ReactNode;
  view: string;
}

interface AdminSidebarProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, view: 'dashboard' },
  { name: 'Reports', icon: <FileBarChart className="w-5 h-5" />, view: 'reports' },
  { name: 'Accounts', icon: <Users className="w-5 h-5" />, view: 'accounts' },
  { name: 'Payment Reminders', icon: <Bell className="w-5 h-5" />, view: 'reminders' },
  { name: 'Queries', icon: <MessageSquare className="w-5 h-5" />, view: 'queries' },
  { name: 'Meter Readings', icon: <Gauge className="w-5 h-5" />, view: 'meters' },
  { name: 'Settings', icon: <Settings className="w-5 h-5" />, view: 'settings' },
];

function AdminSidebar({ onNavigate, currentView }: AdminSidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b">
          <img
            src="https://i.imgur.com/rX38gBh.png"
            alt="Zimako Logo"
            className="h-12 w-auto mx-auto"
          />
        </div>

        <nav className="mt-6 px-3">
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => {
                    onNavigate(item.view);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${
                    currentView === item.view
                      ? 'bg-theme/10 text-theme'
                      : 'text-gray-700 hover:bg-theme/10 hover:text-theme'
                  }`}
                >
                  <span className={currentView === item.view ? 'text-theme' : ''}>{item.icon}</span>
                  <span className="ml-3">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}

export default AdminSidebar;