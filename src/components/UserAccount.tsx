import React from 'react';
import { Calendar, DollarSign } from 'lucide-react';

interface UserAccountProps {
  userName: string;
  accountNumber: string;
  lastPaymentDate: string;
  lastAmountPaid: string;
  arrangements: {
    accountNumber: string;
    arrangementDate: string;
    amountArranged: string;
  }[];
}

export default function UserAccount({
  userName,
  accountNumber = '035555666',
  lastPaymentDate,
  lastAmountPaid,
  arrangements = []
}: UserAccountProps) {
  return (
    <div className="space-y-8">
      {/* User Profile Section */}
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">User Profile</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Name:</span>
            <span className="font-medium text-gray-900 dark:text-white">{userName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Account Number:</span>
            <span className="font-medium text-gray-900 dark:text-white">{accountNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Last Payment Date:</span>
            <span className="font-medium text-gray-900 dark:text-white">{lastPaymentDate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Last Amount Paid:</span>
            <span className="font-medium text-gray-900 dark:text-white">R {lastAmountPaid}</span>
          </div>
        </div>
      </div>

      {/* Payment Arrangements Section */}
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Payment Arrangements</h2>
          <button className="px-4 py-2 bg-theme text-white rounded-lg hover:bg-theme/90 transition-colors">
            Make Arrangement
          </button>
        </div>
        
        {arrangements.length > 0 ? (
          <div className="space-y-4">
            {arrangements.map((arrangement, index) => (
              <div key={index} className="border dark:border-gray-700 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-theme" />
                    <span className="text-gray-600 dark:text-gray-400">{arrangement.arrangementDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-theme" />
                    <span className="text-gray-900 dark:text-white">R {arrangement.amountArranged}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center py-4">
            No payment arrangements found
          </p>
        )}
      </div>
    </div>
  );
}