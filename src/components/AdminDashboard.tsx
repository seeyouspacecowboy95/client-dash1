import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AccountsView from './AccountsView';
import CreateProfileModal from './CreateProfileModal';
import EditProfileModal from './EditProfileModal';

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

interface AdminDashboardProps {
  onLogout: () => void;
  userEmail: string;
  userName: string;
}

function AdminDashboard({ onLogout, userEmail, userName }: AdminDashboardProps) {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isCreateProfileModalOpen, setIsCreateProfileModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>(() => {
    const savedProfiles = localStorage.getItem('clientProfiles');
    return savedProfiles ? JSON.parse(savedProfiles) : [];
  });

  const handleCreateProfile = (profileData: Omit<Profile, 'id' | 'createdAt'>) => {
    const newProfile: Profile = {
      ...profileData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };

    const updatedProfiles = [...profiles, newProfile];
    setProfiles(updatedProfiles);
    localStorage.setItem('clientProfiles', JSON.stringify(updatedProfiles));
  };

  const handleEditProfile = (profile: Profile) => {
    setSelectedProfile(profile);
    setIsEditProfileModalOpen(true);
  };

  const handleSaveProfile = (updatedProfile: Profile) => {
    const updatedProfiles = profiles.map(profile =>
      profile.id === updatedProfile.id ? updatedProfile : profile
    );
    setProfiles(updatedProfiles);
    localStorage.setItem('clientProfiles', JSON.stringify(updatedProfiles));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar onNavigate={setCurrentView} currentView={currentView} />
      
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
          {currentView === 'accounts' ? (
            <AccountsView
              profiles={profiles}
              onCreateProfile={() => setIsCreateProfileModalOpen(true)}
              onEditProfile={handleEditProfile}
            />
          ) : (
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
                <p className="text-gray-500 text-xl">Admin Dashboard Content</p>
              </div>
            </div>
          )}
        </main>
      </div>

      <CreateProfileModal
        isOpen={isCreateProfileModalOpen}
        onClose={() => setIsCreateProfileModalOpen(false)}
        onCreateProfile={handleCreateProfile}
      />

      {selectedProfile && (
        <EditProfileModal
          isOpen={isEditProfileModalOpen}
          onClose={() => {
            setIsEditProfileModalOpen(false);
            setSelectedProfile(null);
          }}
          onSave={handleSaveProfile}
          profile={selectedProfile}
        />
      )}
    </div>
  );
}

export default AdminDashboard;