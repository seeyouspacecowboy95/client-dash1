import React from 'react';
import { Calendar, DollarSign, Clock } from 'lucide-react';

interface PaymentArrangementProps {
  arrangement: PaymentArrangementType;
  onMakePayment: (arrangementId: string) => void;
}

export interface PaymentArrangementType {
  id: string;
  totalAmount: number;
  installmentAmount: number;
  startDate: string;
  endDate: string;
  nextPaymentDate: string;
  status: 'active' | 'completed' | 'defaulted';
  remainingAmount: number;
}

export default function PaymentArrangement({ arrangement, onMakePayment }: PaymentArrangementProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'completed':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      case 'defaulted':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Payment Plan #{arrangement.id}
          </h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${getStatusColor(arrangement.status)}`}>
            {arrangement.status.charAt(0).toUpperCase() + arrangement.status.slice(1)}
          </span>
        </div>
        <button
          onClick={() => onMakePayment(arrangement.id)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-theme hover:bg-theme/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme"
        >
          Make Payment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center">
          <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Payment</p>
            <p className="text-base font-medium text-gray-900 dark:text-white">
              R {arrangement.installmentAmount.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <Calendar className="w-5 h-5 text-gray-400 mr-2" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Next Payment</p>
            <p className="text-base font-medium text-gray-900 dark:text-white">
              {new Date(arrangement.nextPaymentDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <Clock className="w-5 h-5 text-gray-400 mr-2" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Remaining Amount</p>
            <p className="text-base font-medium text-gray-900 dark:text-white">
              R {arrangement.remainingAmount.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}