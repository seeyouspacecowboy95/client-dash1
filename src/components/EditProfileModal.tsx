import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

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

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: Profile) => void;
  profile: Profile;
}

export default function EditProfileModal({ isOpen, onClose, onSave, profile }: EditProfileModalProps) {
  const [formData, setFormData] = useState<Profile>(profile);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.surname) newErrors.surname = 'Surname is required';
    if (!formData.idNumber) {
      newErrors.idNumber = 'ID number is required';
    } else if (!/^\d{13}$/.test(formData.idNumber)) {
      newErrors.idNumber = 'ID number must be exactly 13 digits';
    }
    if (!formData.customerNumber) newErrors.customerNumber = 'Customer number is required';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-900">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name *</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                } focus:ring-theme focus:border-theme`}
              />
              {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Surname *</label>
              <input
                type="text"
                value={formData.surname}
                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.surname ? 'border-red-500' : 'border-gray-300'
                } focus:ring-theme focus:border-theme`}
              />
              {errors.surname && <p className="mt-1 text-sm text-red-500">{errors.surname}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">ID Number *</label>
              <input
                type="text"
                value={formData.idNumber}
                onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                maxLength={13}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.idNumber ? 'border-red-500' : 'border-gray-300'
                } focus:ring-theme focus:border-theme`}
              />
              {errors.idNumber && <p className="mt-1 text-sm text-red-500">{errors.idNumber}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Customer Number *</label>
              <input
                type="text"
                value={formData.customerNumber}
                onChange={(e) => setFormData({ ...formData, customerNumber: e.target.value })}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.customerNumber ? 'border-red-500' : 'border-gray-300'
                } focus:ring-theme focus:border-theme`}
              />
              {errors.customerNumber && <p className="mt-1 text-sm text-red-500">{errors.customerNumber}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:ring-theme focus:border-theme`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                } focus:ring-theme focus:border-theme`}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-theme focus:border-theme"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-theme text-white rounded-md hover:opacity-90"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}