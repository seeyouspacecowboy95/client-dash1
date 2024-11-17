import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

const USERS_COLLECTION = 'users';

// Add a new user to Firestore
export const addUser = async (user: Omit<any, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, USERS_COLLECTION), {
      ...user,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (err) {
    console.error('Error adding user: ', err);
    throw err;
  }
};

// Fetch all users from Firestore
export const fetchUsers = async () => {
  try {
    const snapshot = await getDocs(collection(db, USERS_COLLECTION));
    const users: any[] = [];
    snapshot.forEach((doc) => users.push({ id: doc.id, ...doc.data() }));
    return users;
  } catch (err) {
    console.error('Error fetching users: ', err);
    throw err;
  }
};
