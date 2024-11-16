import React, { useState } from 'react';
import { AlertCircle, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

const queryCategories = [
  'Compliment',
  'Water Meter Faulty',
  'Sewage Faulty',
  'Electricity Meter Faulty',
  'Service Disconnected',
  'Incorrect Billing (Water)',
  'Incorrect Billing (Electricity)',
  'Other'
];

interface Query {
  id: string;
  accountNumber: string;
  type: string;
  date: string;
  status: 'Open' | 'Active' | 'Resolved';
  description: string;
}

// Sample data for recent queries
const recentQueries: Query[] = [
  {
    id: 'QR7B2D',
    accountNumber: '035555666',
    type: 'Water Meter Faulty',
    date: '2024-03-15',
    status: 'Open',
    description: 'Water meter showing incorrect readings'
  },
  {
    id: 'QX9H4P',
    accountNumber: '035555666',
    type: 'Incorrect Billing (Water)',
    date: '2024-03-10',
    status: 'Active',
    description: 'Last month\'s bill seems incorrect'
  },
  {
    id: 'QM5N8K',
    accountNumber: '035555666',
    type: 'Compliment',
    date: '2024-03-05',
    status: 'Resolved',
    description: 'Excellent service from maintenance team'
  }
];

const StatusBadge = ({ status }: { status: Query['status'] }) => {
  const statusStyles = {
    Open: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    Active: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    Resolved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
  };

  const StatusIcon = {
    Open: AlertTriangle,
    Active: Clock,
    Resolved: CheckCircle2
  }[status];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      <StatusIcon className="w-3 h-3 mr-1" />
      {status}
    </span>
  );
};

export default function QueryForm() {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category || !description.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Query submitted successfully');
      setCategory('');
      setDescription('');
    } catch (error) {
      toast.error('Failed to submit query');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Submit a Query</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Please provide details about your query below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Query Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-theme focus:border-theme bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            >
              <option value="">Select a category</option>
              {queryCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Query Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-theme focus:border-theme bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Please provide detailed information about your query..."
              required
            />
          </div>

          {description.length > 0 && description.length < 20 && (
            <div className="flex items-center text-yellow-600 dark:text-yellow-500 text-sm">
              <AlertCircle className="w-4 h-4 mr-2" />
              <span>Please provide more details (minimum 20 characters)</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !category || description.length < 20}
            className="w-full px-4 py-2 text-white bg-theme hover:bg-theme-dark rounded-md shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Query'}
          </button>
        </form>
      </div>

      {/* Recent Queries Section */}
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Queries</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Track the status of your recent queries
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Reference ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Account Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-dark-card divide-y divide-gray-200 dark:divide-gray-700">
              {recentQueries.map((query) => (
                <tr key={query.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {query.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {query.accountNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {query.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(query.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <StatusBadge status={query.status} />
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