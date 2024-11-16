import React, { useEffect, useState } from 'react';
import { FileText, CreditCard, Activity, MessageSquare, Menu, HandshakeIcon, HelpCircle, UserPlus } from 'lucide-react';
import { getGreeting, getSASTHour } from '../utils/timeUtils';
import Sidebar from './Sidebar';
import Settings from './Settings';
import UserAccount from './UserAccount';
import MeterReadings from './MeterReadings';
import QueryForm from './QueryForm';
import Payment from './Payment';
import Statement from './Statement';

interface DashboardProps {
  onLogout: () => void;
  userEmail: string;
  userName: string;
}

interface RecentActivity {
  type: string;
  description: string;
  date: string;
}

interface CommunicationPreferences {
  sms: { enabled: boolean; value: string };
  whatsapp: { enabled: boolean; value: string };
  email: { enabled: boolean; value: string };
}

export default function Dashboard({ onLogout, userEmail, userName }: DashboardProps) {
  const [greeting, setGreeting] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([
    { type: 'Payment', description: 'Payment Received - R 500.00', date: '15 Mar 2024' },
    { type: 'Meter', description: 'Meter Reading Submitted - Reading: 1234 kWh', date: '10 Mar 2024' },
    { type: 'Statement', description: 'March 2024 Statement Generated', date: '1 Mar 2024' }
  ]);
  const [preferences, setPreferences] = useState<CommunicationPreferences>({
    sms: { enabled: false, value: '' },
    whatsapp: { enabled: false, value: '' },
    email: { enabled: false, value: '' }
  });

  useEffect(() => {
    const updateGreeting = () => {
      const hour = getSASTHour();
      setGreeting(`${getGreeting(hour)}, ${userName}`);
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);

    return () => clearInterval(interval);
  }, [userName]);

  const handlePreferencesSave = (newPreferences: CommunicationPreferences) => {
    setPreferences(newPreferences);
    
    const today = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const newActivity = {
      type: 'Preferences',
      description: 'Communication Preferences Updated',
      date: today
    };

    setRecentActivities(prev => [newActivity, ...prev]);
  };

  const navigateToReadings = () => {
    setCurrentView('readings');
  };

  const navigateToQuery = () => {
    setCurrentView('query');
  };

  const navigateToPayment = () => {
    setCurrentView('payment');
  };

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
      case 'account':
        return (
          <UserAccount
            userName={userName}
            accountNumber="035555666"
            lastPaymentDate="25 Oct 2024"
            lastAmountPaid="580.00"
            arrangements={[
              {
                accountNumber: "035555666",
                arrangementDate: "2024-03-15",
                amountArranged: "1,200.00"
              }
            ]}
            preferences={preferences}
            onPreferencesSave={handlePreferencesSave}
          />
        );
      case 'statements':
        return <Statement />;
      case 'readings':
        return <MeterReadings />;
      case 'query':
        return <QueryForm />;
      case 'payment':
        return <Payment />;
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

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-6 mb-8">
              <button 
                onClick={() => setCurrentView('statements')}
                className="flex flex-col items-center p-4 sm:p-6 bg-white dark:bg-dark-card rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-theme" />
                <span className="text-sm sm:text-base text-gray-900 dark:text-white mt-2">View Statement</span>
              </button>
              <button 
                onClick={navigateToPayment}
                className="flex flex-col items-center p-4 sm:p-6 bg-white dark:bg-dark-card rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-theme" />
                <span className="text-sm sm:text-base text-gray-900 dark:text-white mt-2">Settle Account</span>
              </button>
              <button 
                onClick={navigateToPayment}
                className="flex flex-col items-center p-4 sm:p-6 bg-white dark:bg-dark-card rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <HandshakeIcon className="w-6 h-6 sm:w-8 sm:h-8 text-theme" />
                <span className="text-sm sm:text-base text-gray-900 dark:text-white mt-2">Make Arrangement</span>
              </button>
              <button
                onClick={navigateToReadings}
                className="flex flex-col items-center p-4 sm:p-6 bg-white dark:bg-dark-card rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-theme" />
                <span className="text-sm sm:text-base text-gray-900 dark:text-white mt-2">Submit Reading</span>
              </button>
              <button
                onClick={navigateToQuery}
                className="flex flex-col items-center p-4 sm:p-6 bg-white dark:bg-dark-card rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-theme" />
                <span className="text-sm sm:text-base text-gray-900 dark:text-white mt-2">Log Query</span>
              </button>
              <button
                className="flex flex-col items-center p-4 sm:p-6 bg-white dark:bg-dark-card rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <UserPlus className="w-6 h-6 sm:w-8 sm:h-8 text-theme" />
                <span className="text-sm sm:text-base text-gray-900 dark:text-white mt-2">Apply for Indigent</span>
              </button>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
              <div className="bg-white dark:bg-dark-card shadow-sm rounded-lg">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{activity.type}</p>
                      <p className="text-gray-900 dark:text-white">{activity.description} - {activity.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex flex-col">
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

      <main className="lg:ml-64 transition-all duration-300 flex-grow">
        <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
          {renderContent()}
        </div>
      </main>

      <hr className="border-t border-gray-200 dark:border-gray-700 mt-8" />
      
      <footer className="lg:ml-64 py-4 px-6 bg-white dark:bg-dark-card shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Powered By: {' '}
            <a 
              href="https://zimako.co.za/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-800 dark:hover:text-blue-400 transition-colors"
            >
              Zimako Group
            </a>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Version 1.0.0
          </div>
        </div>
      </footer>
    </div>
  );
}