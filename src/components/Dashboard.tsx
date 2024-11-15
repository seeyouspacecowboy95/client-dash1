import React, { useEffect, useState } from 'react';
import { FileText, CreditCard, Activity, MessageSquare, Menu, HandshakeIcon, HelpCircle, UserPlus } from 'lucide-react';
import { getGreeting, getSASTHour } from '../utils/timeUtils';
import Sidebar from './Sidebar';
import Settings from './Settings';

interface DashboardProps {
  onLogout: () => void;
  userEmail: string;
  userName: string;
}

export default function Dashboard({ onLogout, userEmail, userName }: DashboardProps) {
  const [greeting, setGreeting] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    const updateGreeting = () => {
      const hour = getSASTHour();
      setGreeting(`${getGreeting(hour)}, ${userName}`);
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);

    return () => clearInterval(interval);
  }, [userName]);

  const stats = [
    { label: 'Current Balance', value: 'R 2,450.00' },
    { label: 'Due Date', value: '25 Nov 2024' },
    { label: 'Last Payment', value: 'R 580.00' },
    { label: 'Last Payment Date', value: '25 Oct 2024' },
    { label: 'Account Status', value: 'Active'}
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'settings':
        return <Settings />;
      default:
        return (
          <>
            <div className="mb-8 mt-16 lg:mt-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{greeting}</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white dark:bg-dark-card p-4 sm:p-6 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-6">
              <button className="flex flex-col items-center p-4 sm:p-6 bg-white dark:bg-dark-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-theme" />
                <span className="text-sm sm:text-base text-gray-900 dark:text-white mt-2">View Statement</span>
              </button>
              <button className="flex flex-col items-center p-4 sm:p-6 bg-white dark:bg-dark-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-theme" />
                <span className="text-sm sm:text-base text-gray-900 dark:text-white mt-2">Settle Account</span>
              </button>
              <button className="flex flex-col items-center p-4 sm:p-6 bg-white dark:bg-dark-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <HandshakeIcon className="w-6 h-6 sm:w-8 sm:h-8 text-theme" />
                <span className="text-sm sm:text-base text-gray-900 dark:text-white mt-2">Make Arrangement</span>
              </button>
              <button className="flex flex-col items-center p-4 sm:p-6 bg-white dark:bg-dark-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-theme" />
                <span className="text-sm sm:text-base text-gray-900 dark:text-white mt-2">Submit Reading</span>
              </button>
              <button className="flex flex-col items-center p-4 sm:p-6 bg-white dark:bg-dark-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-theme" />
                <span className="text-sm sm:text-base text-gray-900 dark:text-white mt-2">Log Query</span>
              </button>
              <button className="flex flex-col items-center p-4 sm:p-6 bg-white dark:bg-dark-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <UserPlus className="w-6 h-6 sm:w-8 sm:h-8 text-theme" />
                <span className="text-sm sm:text-base text-gray-900 dark:text-white mt-2">Apply for Indigent Status</span>
              </button>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
              <div className="bg-white dark:bg-dark-card shadow-sm rounded-lg">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Payment Received</p>
                    <p className="text-gray-900 dark:text-white">R 500.00 - 15 Mar 2024</p>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Meter Reading Submitted</p>
                    <p className="text-gray-900 dark:text-white">Reading: 1234 kWh - 10 Mar 2024</p>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Statement Generated</p>
                    <p className="text-gray-900 dark:text-white">March 2024 Statement - 1 Mar 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg bg-white dark:bg-dark-card shadow-md"
        >
          <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={onLogout}
        onNavigate={(view) => setCurrentView(view)}
      />

      <main className="lg:ml-64 transition-all duration-300">
        <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}