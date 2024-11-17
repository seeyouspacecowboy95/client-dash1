import React from 'react';
import { format } from 'date-fns';
import { Search, UserPlus, Pencil } from 'lucide-react';

interface Profile {
  id: string;
  fullName: string;
  surname: string;
  idNumber: string;
  customerNumber: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

interface AccountsViewProps {
  profiles: Profile[];
  onCreateProfile: () => void;
  onEditProfile: (profile: Profile) => void;
}

export default function AccountsView({ profiles, onCreateProfile, onEditProfile }: AccountsViewProps) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredProfiles = profiles.filter(profile => 
    profile.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.idNumber.includes(searchTerm) ||
    profile.customerNumber.includes(searchTerm)
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Client Accounts</h1>
        <button
          onClick={onCreateProfile}
          className="flex items-center px-4 py-2 bg-theme text-white rounded-md hover:opacity-90"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Create Profile
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search profiles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-theme focus:border-theme"
          />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProfiles.map((profile) => (
                <tr key={profile.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {profile.fullName} {profile.surname}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{profile.idNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{profile.customerNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{profile.email}</div>
                    <div className="text-sm text-gray-500">{profile.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(profile.createdAt), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => onEditProfile(profile)}
                      className="text-theme hover:opacity-90 inline-flex items-center"
                    >
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {filteredProfiles.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No profiles found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}