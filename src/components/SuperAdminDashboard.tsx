import React, { useState } from 'react';
import { Users, DollarSign, FileText, Activity, MessageSquare, HandshakeIcon, PlusCircle } from 'lucide-react';
import SuperAdminNav from './SuperAdminNav';
import DashboardCard from './DashboardCard';
import ChangeLog from './ChangeLog';
import { useTheme } from '../contexts/ThemeContext';

// Mock data for trends
const generateTrendData = (points: number, min: number, max: number) => {
  const data = Array.from({ length: points }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  );
  const labels = Array.from({ length: points }, (_, i) => 
    `2024-03-${(i + 1).toString().padStart(2, '0')}`
  );
  return { data, labels };
};

const determineChangeType = (trend: number): 'increase' | 'decrease' | 'neutral' => {
  if (trend > 0) return 'increase';
  if (trend < 0) return 'decrease';
  return 'neutral';
};

export default function SuperAdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { isDarkMode, themeColor } = useTheme();
  const [currentView, setCurrentView] = useState<'dashboard' | 'changelog'>('dashboard');
  
  const dashboardData = [
    {
      icon: <Users />,
      title: "Total Accounts",
      value: "15,234",
      trend: "12",
      trendData: generateTrendData(30, 14000, 16000),
      changeType: determineChangeType(12)
    },
    {
      icon: <DollarSign />,
      title: "Book Value",
      value: "R 45.2M",
      trend: "8",
      trendData: generateTrendData(30, 40000000, 50000000),
      changeType: determineChangeType(8)
    },
    {
      icon: <FileText />,
      title: "Statements Distributed",
      value: "12,450",
      trend: "15",
      trendData: generateTrendData(30, 11000, 13000),
      changeType: determineChangeType(15)
    },
    {
      icon: <Activity />,
      title: "Meter Readings",
      value: "8,756",
      trend: "10",
      trendData: generateTrendData(30, 8000, 9000),
      changeType: determineChangeType(10)
    },
    {
      icon: <MessageSquare />,
      title: "Payment Reminders",
      value: "5,432",
      trend: "18",
      trendData: generateTrendData(30, 5000, 6000),
      changeType: determineChangeType(18)
    },
    {
      icon: <HandshakeIcon />,
      title: "Payment Arrangements",
      value: "1,245",
      trend: "5",
      trendData: generateTrendData(30, 1000, 1500),
      changeType: determineChangeType(5)
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-dark-bg' : 'bg-gray-50'}`}>
      <div className="flex flex-col h-screen">
        {/* Top Navigation */}
        <SuperAdminNav onLogout={onLogout} onViewChange={setCurrentView} currentView={currentView} />

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {currentView === 'changelog' ? (
              <ChangeLog />
            ) : (
              <>
                {/* Dashboard Header */}
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-dark-text-primary' : 'text-gray-900'}`}>
                      Dashboard
                    </h1>
                    <p className={`mt-1 text-sm ${isDarkMode ? 'text-dark-text-secondary' : 'text-gray-500'}`}>
                      Overview
                    </p>
                  </div>
                  <button
                    className={`inline-flex items-center px-4 py-2 rounded-md bg-${themeColor}-500 text-white hover:bg-${themeColor}-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${themeColor}-500 transition-colors duration-200`}
                  >
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Create New Report
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dashboardData.map((item, index) => (
                    <DashboardCard
                      key={index}
                      icon={item.icon}
                      title={item.title}
                      value={item.value}
                      trend={item.trend}
                      trendData={item.trendData}
                      changeType={item.changeType}
                    />
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="mt-8">
                  <h2 className={`text-lg font-semibold ${
                    isDarkMode ? 'text-dark-text-primary' : 'text-gray-900'
                  } mb-4`}>
                    Recent System Activity
                  </h2>
                  <div className={`${isDarkMode ? 'bg-dark-card' : 'bg-white'} shadow-sm rounded-lg`}>
                    <div className="divide-y divide-gray-200 dark:divide-dark-border">
                      <div className="p-4">
                        <p className={`text-sm ${isDarkMode ? 'text-dark-text-secondary' : 'text-gray-600'}`}>
                          New Account Created
                        </p>
                        <p className={isDarkMode ? 'text-dark-text-primary' : 'text-gray-900'}>
                          Account #12345 - 15 Mar 2024
                        </p>
                      </div>
                      <div className="p-4">
                        <p className={`text-sm ${isDarkMode ? 'text-dark-text-secondary' : 'text-gray-600'}`}>
                          Bulk Statement Distribution
                        </p>
                        <p className={isDarkMode ? 'text-dark-text-primary' : 'text-gray-900'}>
                          2,500 Statements Sent - 14 Mar 2024
                        </p>
                      </div>
                      <div className="p-4">
                        <p className={`text-sm ${isDarkMode ? 'text-dark-text-secondary' : 'text-gray-600'}`}>
                          Payment Reminder Campaign
                        </p>
                        <p className={isDarkMode ? 'text-dark-text-primary' : 'text-gray-900'}>
                          1,000 SMS Reminders - 13 Mar 2024
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}