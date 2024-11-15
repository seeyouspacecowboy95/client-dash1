import React from 'react';
import AdminSidebar from './AdminSidebar';

interface AdminDashboardProps {
  onLogout: () => void;
  userEmail: string;
  userName: string;
}

function AdminDashboard({ onLogout, userEmail, userName }: AdminDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      
      {/* Main content */}
      <div className="lg:ml-64">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-theme">Admin</h1>
              </div>
              <div className="flex items-center">
                <span className="mr-4 text-gray-700">Welcome, {userName}</span>
                <button
                  onClick={onLogout}
                  className="bg-theme text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
              <p className="text-gray-500 text-xl">Admin Dashboard Content</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;