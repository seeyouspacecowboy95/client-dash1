import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const createUser = async (userData: { name: string; email: string; role: string }) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), userData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const fetchUsers = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
