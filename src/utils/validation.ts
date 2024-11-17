import { Profile } from '../types/profile';

export const validateAccountNumber = (accountNumber: string, profiles: Profile[]): boolean => {
  if (!accountNumber) return false;
  return profiles.some(profile => profile.customerNumber === accountNumber);
};

export const getStoredProfiles = (): Profile[] => {
  const savedProfiles = localStorage.getItem('clientProfiles');
  return savedProfiles ? JSON.parse(savedProfiles) : [];
};