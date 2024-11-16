import React, { useState } from 'react';
import { CreditCard, CalendarRange, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import PaymentArrangement, { PaymentArrangementType } from './PaymentArrangement';

interface PaymentDetails {
  name: string;
  accountNumber: string;
  lastPaymentDate: string;
  lastAmountPaid: number;
  amountDue: number;
}

export default function Payment() {
  const [paymentDetails] = useState<PaymentDetails>({
    name: "Tshepang",
    accountNumber: "035555666",
    lastPaymentDate: "2024-02-15",
    lastAmountPaid: 580.00,
    amountDue: 2450.00
  });

  const [isArrangementFormOpen, setIsArrangementFormOpen] = useState(false);
  const [arrangementAmount, setArrangementAmount] = useState('');
  const [installments, setInstallments] = useState('');
  const [arrangements, setArrangements] = useState<PaymentArrangementType[]>([
    {
      id: '1',
      totalAmount: 2450.00,
      installmentAmount: 408.33,
      startDate: '2024-03-15',
      endDate: '2024-09-15',
      nextPaymentDate: '2024-04-15',
      status: 'active',
      remainingAmount: 2041.67
    }
  ]);

  const handlePayNow = () => {
    toast.success('Redirecting to payment gateway...');
  };

  const handleMakeArrangement = () => {
    setIsArrangementFormOpen(true);
  };

  const handleCreateArrangement = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = parseFloat(arrangementAmount);
    const months = parseInt(installments);
    
    if (isNaN(amount) || isNaN(months) || months <= 0) {
      toast.error('Please enter valid amount and number of installments');
      return;
    }

    const monthlyPayment = amount / months;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + months);

    const newArrangement: PaymentArrangementType = {
      id: (arrangements.length + 1).toString(),
      totalAmount: amount,
      installmentAmount: monthlyPayment,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      nextPaymentDate: startDate.toISOString(),
      status: 'active',
      remainingAmount: amount
    };

    setArrangements([...arrangements, newArrangement]);
    setIsArrangementFormOpen(false);
    setArrangementAmount('');
    setInstallments('');
    toast.success('Payment arrangement created successfully');
  };

  const handleMakeArrangementPayment = (arrangementId: string) => {
    toast.success('Processing arrangement payment...');
    // Payment gateway integration would go here
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm mb-8">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Payment Details
          </h2>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Account Holder</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {paymentDetails.name}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Account Number</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {paymentDetails.accountNumber}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Last Payment Date</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {new Date(paymentDetails.lastPaymentDate).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Last Amount Paid</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                R {paymentDetails.lastAmountPaid.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-50 dark:bg-dark-hover rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Amount Due</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  R {paymentDetails.amountDue.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Due Date</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  25 Mar 2024
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={handlePayNow}
              className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-theme hover:bg-theme/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Pay Now
            </button>
            <button
              onClick={handleMakeArrangement}
              className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-dark-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme"
            >
              <CalendarRange className="w-5 h-5 mr-2" />
              Make Arrangement
            </button>
          </div>
        </div>
      </div>

      {/* Payment Arrangement Form */}
      {isArrangementFormOpen && (
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm mb-8 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Create Payment Arrangement
          </h3>
          <form onSubmit={handleCreateArrangement} className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Total Amount
              </label>
              <input
                type="number"
                id="amount"
                value={arrangementAmount}
                onChange={(e) => setArrangementAmount(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-theme focus:ring-theme sm:text-sm"
                placeholder="Enter amount"
                required
              />
            </div>
            <div>
              <label htmlFor="installments" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Number of Installments
              </label>
              <input
                type="number"
                id="installments"
                value={installments}
                onChange={(e) => setInstallments(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-theme focus:ring-theme sm:text-sm"
                placeholder="Enter number of months"
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsArrangementFormOpen(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-dark-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-theme hover:bg-theme/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme"
              >
                Create Arrangement
              </button>
            </div>
          </form>
        </div>
      )}

      {/* My Payment Arrangements Section */}
      {arrangements.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            My Payment Arrangements
          </h2>
          <div className="space-y-4">
            {arrangements.map((arrangement) => (
              <PaymentArrangement
                key={arrangement.id}
                arrangement={arrangement}
                onMakePayment={handleMakeArrangementPayment}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}