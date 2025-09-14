import { Person, PersonData, PersonResultData, Receipt, SavedReceipt } from '@/types/receipt';
import { FirebaseCollections } from '@/utils/constants/firebase';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';
import { auth } from '../utils/firebase'; // adjust path as needed

const firestore = getFirestore(); // Get Firestore instance

// People Collection
export async function getPeople(): Promise<Person[]> {
  const user = auth.currentUser;
  if (!user) throw new Error('User not signed in');

  const peopleRef = collection(firestore, FirebaseCollections.PEOPLE);
  const q = query(peopleRef, where('userId', '==', user.uid));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => {
    const peopleData: PersonResultData = doc.data() as PersonResultData;
    return {
      id: doc.id,
      ...peopleData
    };
  });
}

export async function savePerson(person: PersonData) {
  const user = auth.currentUser;
  if (!user) throw new Error('User not signed in');
  if (!person?.id) throw new Error('Person ID is required');
  if (!person?.name) throw new Error('Person name is required');
  if (person.name.trim() === '') throw new Error('Person name cannot be empty');
  if (!person?.userId) person.userId = user.uid;

  const personRef = doc(firestore, FirebaseCollections.PEOPLE, person.id);
  try {
    await setDoc(personRef, { ...person });
    console.log('Person saved successfully:', person);
  } catch (error) {
    console.error('Error saving person:', error);
    throw new Error('Could not save person');
  }
}

// Receipts Collection
export async function getReceipts() {
  const user = auth.currentUser;
  if (!user) throw new Error('User not signed in');

  // Query receipts where ownerId == current user's UID
  const receiptsRef = collection(firestore, FirebaseCollections.RECEIPTS);
  const q = query(receiptsRef, where('ownerId', '==', user.uid));
  const querySnapshot = await getDocs(q);

  // Map results to array
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function saveReceipt(receipt: Receipt) {
  const user = auth.currentUser;
  if (!user) throw new Error('User not signed in');

  // Add the user ID to the receipt data
  const receiptData: Receipt = {
    ...receipt,
    ownerId: user.uid
  };

  // Save the receipt to Firestore
  const receiptsRef = collection(firestore, FirebaseCollections.RECEIPTS);
  const docRef = await addDoc(receiptsRef, receiptData);
  return docRef.id;
}

export async function updateReceipt(receipt: Receipt, receiptId: string) {
  const user = auth.currentUser;
  if (!user) throw new Error('User not signed in');

  const receiptRef = doc(firestore, FirebaseCollections.RECEIPTS, receiptId);
  try {
    await setDoc(receiptRef, { ...receipt, ownerId: user.uid });
    console.log('Receipt updated successfully:', receipt);
  } catch (error) {
    console.error('Error updating receipt:', error);
    throw new Error('Could not update receipt');
  }
}

export async function getReceiptById(receiptId: string): Promise<SavedReceipt> {
  const receiptRef = doc(firestore, FirebaseCollections.RECEIPTS, receiptId);
  const docSnap = await getDoc(receiptRef);

  if (!docSnap.exists()) {
    throw new Error('Receipt not found');
  }

  return { id: docSnap.id, ...docSnap.data() } as SavedReceipt;
}

// Stores Collection
export async function getStores() {
  const storesRef = collection(firestore, FirebaseCollections.STORES);
  const querySnapshot = await getDocs(storesRef);

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function getStoresByType(type: string) {
  const storesRef = collection(firestore, FirebaseCollections.STORES);
  const q = query(storesRef, where('type', '==', type));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

// Users Collection
export async function getUserProfileById(uid: string) {
  const userDoc = doc(firestore, FirebaseCollections.USERS, uid);
  const docSnap = await getDoc(userDoc);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}
