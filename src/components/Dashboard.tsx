import React, { useEffect, useState } from 'react';
import { FileText, CreditCard, Activity, MessageSquare } from 'lucide-react';
import { getGreeting, getSASTHour } from '../utils/timeUtils';
import Sidebar from './Sidebar';

interface DashboardProps {
  onLogout: () => void;
  userEmail: string;
  userName: string;
}

export default function Dashboard({ onLogout, userEmail, userName }: DashboardProps) {
  const [greeting, setGreeting] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    { label: 'Last Payment', value: 'R 500.00' },
    { label: 'Due Date', value: '25 Mar 2024' },
    { label: 'Account Status', value: 'Active' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={onLogout}
      />

      <main className="lg:ml-64">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Greeting */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{greeting}</h1>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <button className="flex flex-col items-center p-6 bg-white dark:bg-dark-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <FileText className="w-8 h-8 text-orange-600" />
              <span className="text-gray-900 dark:text-white mt-2">View Statement</span>
            </button>
            <button className="flex flex-col items-center p-6 bg-white dark:bg-dark-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <CreditCard className="w-8 h-8 text-orange-600" />
              <span className="text-gray-900 dark:text-white mt-2">Make Payment</span>
            </button>
            <button className="flex flex-col items-center p-6 bg-white dark:bg-dark-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Activity className="w-8 h-8 text-orange-600" />
              <span className="text-gray-900 dark:text-white mt-2">Submit Reading</span>
            </button>
            <button className="flex flex-col items-center p-6 bg-white dark:bg-dark-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <MessageSquare className="w-8 h-8 text-orange-600" />
              <span className="text-gray-900 dark:text-white mt-2">Log Query</span>
            </button>
          </div>

          {/* Recent Activity */}
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
        </div>
      </main>
    </div>
  );
}