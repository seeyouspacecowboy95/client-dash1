import React from 'react';
import { Calendar, DollarSign, Phone, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

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
  preferences: {
    sms: { enabled: boolean; value: string };
    whatsapp: { enabled: boolean; value: string };
    email: { enabled: boolean; value: string };
  };
  onPreferencesSave: (preferences: {
    sms: { enabled: boolean; value: string };
    whatsapp: { enabled: boolean; value: string };
    email: { enabled: boolean; value: string };
  }) => void;
}

export default function UserAccount({
  userName,
  accountNumber = '035555666',
  lastPaymentDate,
  lastAmountPaid,
  arrangements = [],
  preferences,
  onPreferencesSave
}: UserAccountProps) {
  const [localPreferences, setLocalPreferences] = React.useState(preferences);

  React.useEffect(() => {
    setLocalPreferences(preferences);
  }, [preferences]);

  const handlePreferenceChange = (type: 'sms' | 'whatsapp' | 'email', field: 'enabled' | 'value', value: boolean | string) => {
    setLocalPreferences(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    }));
  };

  const handleSavePreferences = () => {
    onPreferencesSave(localPreferences);
    toast.success('Preferences Saved', {
      duration: 5000,
      style: {
        background: '#10B981',
        color: '#FFFFFF'
      }
    });
  };

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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Payment Arrangements</h2>
        {arrangements.length > 0 ? (
          <div className="space-y-4">
            {arrangements.map((arrangement, index) => (
              <div key={index} className="border dark:border-gray-700 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 dark:text-gray-400">ACC: {arrangement.accountNumber}</span>
                  </div>
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

      {/* Communication Preferences Section */}
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Select Preferred Communication Method(s)</h2>
        <div className="space-y-6">
          {/* SMS Preference */}
          <div className="flex items-start space-x-4">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                checked={localPreferences.sms.enabled}
                onChange={(e) => handlePreferenceChange('sms', 'enabled', e.target.checked)}
                className="w-4 h-4 text-theme border-gray-300 rounded focus:ring-theme"
              />
            </div>
            <div className="flex-1">
              <label className="flex items-center text-gray-900 dark:text-white">
                <Phone className="w-5 h-5 mr-2" />
                SMS
              </label>
              <input
                type="tel"
                value={localPreferences.sms.value}
                onChange={(e) => handlePreferenceChange('sms', 'value', e.target.value)}
                placeholder="Enter mobile number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-theme focus:ring focus:ring-theme focus:ring-opacity-50"
                disabled={!localPreferences.sms.enabled}
              />
            </div>
          </div>

          {/* WhatsApp Preference */}
          <div className="flex items-start space-x-4">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                checked={localPreferences.whatsapp.enabled}
                onChange={(e) => handlePreferenceChange('whatsapp', 'enabled', e.target.checked)}
                className="w-4 h-4 text-theme border-gray-300 rounded focus:ring-theme"
              />
            </div>
            <div className="flex-1">
              <label className="flex items-center text-gray-900 dark:text-white">
                <Phone className="w-5 h-5 mr-2" />
                WhatsApp
              </label>
              <input
                type="tel"
                value={localPreferences.whatsapp.value}
                onChange={(e) => handlePreferenceChange('whatsapp', 'value', e.target.value)}
                placeholder="Enter WhatsApp number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-theme focus:ring focus:ring-theme focus:ring-opacity-50"
                disabled={!localPreferences.whatsapp.enabled}
              />
            </div>
          </div>

          {/* Email Preference */}
          <div className="flex items-start space-x-4">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                checked={localPreferences.email.enabled}
                onChange={(e) => handlePreferenceChange('email', 'enabled', e.target.checked)}
                className="w-4 h-4 text-theme border-gray-300 rounded focus:ring-theme"
              />
            </div>
            <div className="flex-1">
              <label className="flex items-center text-gray-900 dark:text-white">
                <Mail className="w-5 h-5 mr-2" />
                Email
              </label>
              <input
                type="email"
                value={localPreferences.email.value}
                onChange={(e) => handlePreferenceChange('email', 'value', e.target.value)}
                placeholder="Enter email address"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-theme focus:ring focus:ring-theme focus:ring-opacity-50"
                disabled={!localPreferences.email.enabled}
              />
            </div>
          </div>

          <button
            onClick={handleSavePreferences}
            className="w-full mt-6 px-4 py-2 bg-theme text-white rounded-lg hover:bg-theme/90 transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}