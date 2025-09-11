export enum FirebaseCollections {
  PEOPLE = 'people',
  RECEIPTS = 'receipts',
  STORES = 'stores',
  USERS = 'users',
}

export type FirebaseCollectionName = keyof typeof FirebaseCollections;

