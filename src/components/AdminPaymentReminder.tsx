import React, { useState } from 'react';
import { Send, Mail, MessageSquare, Phone, Info, Plus } from 'lucide-react';
import Tooltip from './Tooltip';

interface PaymentReminder {
  id: string;
  customerName: string;
  accountNumber: string;
  outstandingAmount: number;
  dueDate: string;
  communicationStats: {
    sms: number;
    email: number;
    whatsapp: number;
  };
}

const sampleData: PaymentReminder[] = [
  {
    id: '1',
    customerName: 'John Doe',
    accountNumber: 'ACC-001',
    outstandingAmount: 1500.00,
    dueDate: '2024-02-15',
    communicationStats: { sms: 2, email: 1, whatsapp: 0 }
  },
  {
    id: '2',
    customerName: 'Sarah Smith',
    accountNumber: 'ACC-002',
    outstandingAmount: 2750.50,
    dueDate: '2024-02-14',
    communicationStats: { sms: 1, email: 2, whatsapp: 1 }
  },
  {
    id: '3',
    customerName: 'Michael Johnson',
    accountNumber: 'ACC-003',
    outstandingAmount: 950.75,
    dueDate: '2024-02-16',
    communicationStats: { sms: 3, email: 0, whatsapp: 1 }
  },
  {
    id: '4',
    customerName: 'Emily Brown',
    accountNumber: 'ACC-004',
    outstandingAmount: 3200.25,
    dueDate: '2024-02-13',
    communicationStats: { sms: 1, email: 1, whatsapp: 0 }
  },
  {
    id: '5',
    customerName: 'David Wilson',
    accountNumber: 'ACC-005',
    outstandingAmount: 1875.60,
    dueDate: '2024-02-17',
    communicationStats: { sms: 0, email: 2, whatsapp: 1 }
  }
];

function AdminPaymentReminder() {
  const [selectedReminders, setSelectedReminders] = useState<string[]>([]);

  const handleBulkAction = (method: 'sms' | 'email' | 'whatsapp') => {
    // TODO: Integrate with messaging service
    console.log(`Sending bulk ${method} to:`, selectedReminders);
  };

  const handleSingleAction = (id: string, method: 'sms' | 'email' | 'whatsapp') => {
    // TODO: Integrate with messaging service
    console.log(`Sending ${method} to reminder ${id}`);
  };

  const handleCreateReminder = () => {
    // TODO: Implement create reminder modal
    console.log('Creating new reminder');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Reminders</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage and send payment reminders to customers
          </p>
        </div>
        <button
          onClick={handleCreateReminder}
          className="inline-flex items-center px-4 py-2 bg-theme dark:bg-theme-dark text-white rounded-lg hover:opacity-90 transition-all shadow-sm hover:shadow-md"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Reminder
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden">
        {/* Action Bar */}
        <div className="p-4 border-b border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-card-secondary">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">{selectedReminders.length}</span>
              <span className="ml-1">selected</span>
            </div>
            
            <div className="flex gap-2">
              <Tooltip content="Send bulk SMS">
                <button
                  onClick={() => handleBulkAction('sms')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    selectedReminders.length === 0
                      ? 'bg-gray-100 text-gray-400 dark:bg-dark-hover dark:text-gray-600 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-dark-card dark:text-gray-300 dark:hover:bg-dark-hover shadow-sm hover:shadow'
                  }`}
                  disabled={selectedReminders.length === 0}
                >
                  <Phone className="w-5 h-5" />
                </button>
              </Tooltip>
              
              <Tooltip content="Send bulk email">
                <button
                  onClick={() => handleBulkAction('email')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    selectedReminders.length === 0
                      ? 'bg-gray-100 text-gray-400 dark:bg-dark-hover dark:text-gray-600 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-dark-card dark:text-gray-300 dark:hover:bg-dark-hover shadow-sm hover:shadow'
                  }`}
                  disabled={selectedReminders.length === 0}
                >
                  <Mail className="w-5 h-5" />
                </button>
              </Tooltip>
              
              <Tooltip content="Send bulk WhatsApp">
                <button
                  onClick={() => handleBulkAction('whatsapp')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    selectedReminders.length === 0
                      ? 'bg-gray-100 text-gray-400 dark:bg-dark-hover dark:text-gray-600 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-dark-card dark:text-gray-300 dark:hover:bg-dark-hover shadow-sm hover:shadow'
                  }`}
                  disabled={selectedReminders.length === 0}
                >
                  <MessageSquare className="w-5 h-5" />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-border">
            <thead className="bg-gray-50 dark:bg-dark-card-secondary">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedReminders(sampleData.map(r => r.id));
                      } else {
                        setSelectedReminders([]);
                      }
                    }}
                    className="rounded border-gray-300 text-theme focus:ring-theme dark:border-dark-border dark:bg-dark-card"
                  />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Customer Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Account Number
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Outstanding Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Due Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Communication Stats
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-dark-card divide-y divide-gray-200 dark:divide-dark-border">
              {sampleData.map((reminder) => (
                <tr key={reminder.id} className="hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedReminders.includes(reminder.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedReminders([...selectedReminders, reminder.id]);
                        } else {
                          setSelectedReminders(selectedReminders.filter(id => id !== reminder.id));
                        }
                      }}
                      className="rounded border-gray-300 text-theme focus:ring-theme dark:border-dark-border dark:bg-dark-card"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {reminder.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {reminder.accountNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    R{reminder.outstandingAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {new Date(reminder.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-4">
                      <Tooltip content="SMS sent">
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 dark:bg-dark-hover text-sm">
                          <Phone className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">{reminder.communicationStats.sms}</span>
                        </span>
                      </Tooltip>
                      <Tooltip content="Emails sent">
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 dark:bg-dark-hover text-sm">
                          <Mail className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">{reminder.communicationStats.email}</span>
                        </span>
                      </Tooltip>
                      <Tooltip content="WhatsApp sent">
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 dark:bg-dark-hover text-sm">
                          <MessageSquare className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">{reminder.communicationStats.whatsapp}</span>
                        </span>
                      </Tooltip>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <Tooltip content="Send SMS">
                        <button
                          onClick={() => handleSingleAction(reminder.id, 'sms')}
                          className="p-1.5 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                        </button>
                      </Tooltip>
                      <Tooltip content="Send Email">
                        <button
                          onClick={() => handleSingleAction(reminder.id, 'email')}
                          className="p-1.5 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                      </Tooltip>
                      <Tooltip content="Send WhatsApp">
                        <button
                          onClick={() => handleSingleAction(reminder.id, 'whatsapp')}
                          className="p-1.5 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPaymentReminder;