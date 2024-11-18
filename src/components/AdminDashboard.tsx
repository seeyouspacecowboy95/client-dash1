import React, { useState, useEffect } from 'react';
import { doc, collection, addDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import AdminSidebar from './AdminSidebar';
import AccountsView from './AccountsView';
import CreateProfileModal from './CreateProfileModal';
import EditProfileModal from './EditProfileModal';
import DashboardOverview from './analytics/DashboardOverview';
import AdminReports from './AdminReports';
import AdminPaymentReminder from './AdminPaymentReminder';
import QueryManagement from './QueryManagement';
import AdminMeterReadings from './AdminMeterReadings';

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
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'profiles'), (snapshot) => {
      const fetchedProfiles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Profile[];
      setProfiles(fetchedProfiles);
    });

    return () => unsubscribe();
  }, []);

  const handleCreateProfile = async (profileData: Omit<Profile, 'id' | 'createdAt'>) => {
    try {
      await addDoc(collection(db, 'profiles'), {
        ...profileData,
        createdAt: new Date().toISOString(),
      });
      setIsCreateProfileModalOpen(false);
    } catch (error) {
      console.error('Error adding profile:', error);
    }
  };

  const handleEditProfile = (profile: Profile) => {
    setSelectedProfile(profile);
    setIsEditProfileModalOpen(true);
  };

  const handleSaveProfile = async (updatedProfile: Profile) => {
    try {
      const profileRef = doc(db, 'profiles', updatedProfile.id);
      await updateDoc(profileRef, { ...updatedProfile });
      setIsEditProfileModalOpen(false);
      setSelectedProfile(null);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'reports':
        return <AdminReports />;
      case 'accounts':
        return (
          <AccountsView
            profiles={profiles}
            onCreateProfile={() => setIsCreateProfileModalOpen(true)}
            onEditProfile={handleEditProfile}
          />
        );
      case 'reminders':
        return <AdminPaymentReminder />;
      case 'queries':
        return <QueryManagement />;
      case 'meters':
        return <AdminMeterReadings />;
      default:
        return (
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 dark:border-dark-border rounded-lg h-96 flex items-center justify-center">
              <p className="text-gray-500 dark:text-dark-text-secondary text-xl">
                {currentView.charAt(0).toUpperCase() + currentView.slice(1)} Content
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark-bg">
      <AdminSidebar 
        onNavigate={setCurrentView} 
        currentView={currentView} 
        onLogout={onLogout}
        userName={userName}
      />
      
      <div className="lg:ml-64">
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {renderCurrentView()}
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