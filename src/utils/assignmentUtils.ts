import { savePerson } from "@/services/FirebaseService";
import { useAddPerson } from "@/store/receipt";
import { getUser } from "@/store/user";
import { useUserStore } from "@/store/user/userStore";
import { AddPersonResponse } from "@/types/person";
import { Person } from "@/types/receipt";
import uuid from 'react-native-uuid';

// Add a person to Firestore
export const addNewPerson = async (
  newPersonName: string,
  savedPeople: Person[]
): Promise<AddPersonResponse> => {
  const addPerson = useAddPerson();
  const user = useUserStore(getUser);
  if (!user || !user.uid) {
    return { id: '', name: '', userId: '', error: 'Auth Error:User not authenticated' };
  }
  if (savedPeople.some(p => p.name.toLowerCase() === newPersonName.toLowerCase())) {
    return { id: '', name: '', userId: '', error: 'Duplicate:This person already exists' };
  }
  try {
    const personToAdd = { name: newPersonName, id: uuid.v4(), userId: user.uid };
    await savePerson(personToAdd);
    console.log('Adding person:', personToAdd);
    addPerson(personToAdd);
    return personToAdd;
  } catch (err: any) {
    return {
      id: '',
      name: '',
      userId: '',
      error: `Save Error:${err.message}`
        || 'Unknown error:An unknown error occurred'
    };
  }
};