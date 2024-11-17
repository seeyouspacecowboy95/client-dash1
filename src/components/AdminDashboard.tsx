import React, { useState, useEffect } from 'react';
import { doc, collection, addDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust the import path based on your project structure
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
  const [profiles, setProfiles] = useState<Profile[]>([]);

  // Fetch profiles from Firestore on mount
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

  // Add a new profile to Firestore
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

  // Open the Edit Profile Modal
  const handleEditProfile = (profile: Profile) => {
    setSelectedProfile(profile);
    setIsEditProfileModalOpen(true);
  };

  // Save profile updates to Firestore
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