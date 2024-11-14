import React from 'react';
import { Users, DollarSign, FileText, Activity, MessageSquare, HandshakeIcon, LogOut } from 'lucide-react';

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend?: string;
}

const DashboardCard = ({ icon, title, value, trend }: DashboardCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div className="p-2 bg-orange-100 rounded-lg">
        {icon}
      </div>
      {trend && (
        <span className="text-green-500 text-sm">
          +{trend}%
        </span>
      )}
    </div>
    <h3 className="mt-4 text-gray-600 text-sm">{title}</h3>
    <p className="mt-2 text-2xl font-semibold">{value}</p>
  </div>
);

export default function SuperAdminDashboard({ onLogout }: { onLogout: () => void }) {
  const dashboardData = [
    {
      icon: <Users className="w-6 h-6 text-orange-600" />,
      title: "Total Accounts",
      value: "15,234",
      trend: "12"
    },
    {
      icon: <DollarSign className="w-6 h-6 text-orange-600" />,
      title: "Book Value",
      value: "R 45.2M",
      trend: "8"
    },
    {
      icon: <FileText className="w-6 h-6 text-orange-600" />,
      title: "Statements Distributed",
      value: "12,450",
      trend: "15"
    },
    {
      icon: <Activity className="w-6 h-6 text-orange-600" />,
      title: "Meter Readings",
      value: "8,756",
      trend: "10"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-orange-600" />,
      title: "Payment Reminders",
      value: "5,432",
      trend: "18"
    },
    {
      icon: <HandshakeIcon className="w-6 h-6 text-orange-600" />,
      title: "Payment Arrangements",
      value: "1,245",
      trend: "5"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-orange-600">Super Admin Dashboard</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-orange-600"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardData.map((item, index) => (
            <DashboardCard
              key={index}
              icon={item.icon}
              title={item.title}
              value={item.value}
              trend={item.trend}
            />
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent System Activity</h2>
          <div className="bg-white shadow-sm rounded-lg">
            <div className="divide-y divide-gray-200">
              <div className="p-4">
                <p className="text-sm text-gray-600">New Account Created</p>
                <p className="text-gray-900">Account #12345 - 15 Mar 2024</p>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600">Bulk Statement Distribution</p>
                <p className="text-gray-900">2,500 Statements Sent - 14 Mar 2024</p>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600">Payment Reminder Campaign</p>
                <p className="text-gray-900">1,000 SMS Reminders - 13 Mar 2024</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}