import { savePerson } from "@/services/FirebaseService";
import { useAddPerson } from "@/store/receipt";
import { getUser } from "@/store/user";
import { useUserStore } from "@/store/user/userStore";
import uuid from 'react-native-uuid';

type AddPersonResponse = {
  id: string;
  name: string;
  userId: string;
  error?: any;
}

// Add a person to Firestore
export const addNewPerson = async (newPersonName: string): Promise<AddPersonResponse> => {
  const addPerson = useAddPerson();
  const user = useUserStore(getUser);
  if (!user || !user.uid) {
    return { id: '', name: '', userId: '', error: 'User not found' };
  }
  try {
    const personToAdd = { name: newPersonName, id: uuid.v4(), userId: user.uid };
    await savePerson(personToAdd);
    console.log('Adding person:', personToAdd);
    addPerson(personToAdd);
    return personToAdd;
  } catch (err: any) {
    return { id: '', name: '', userId: '', error: err.message || 'Unknown error' };
  }
};