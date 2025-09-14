export interface PersonAssignment {
  personId: string;
  name: string;
  quantity: number;
}

export interface ReceiptItem {
  name: string;
  price: string;
  quantity: number;
  assignedTo: PersonAssignment[];
}

export interface Person {
  id: string;
  name: string;
  userId: string;
}

export interface PersonResultData {
  name: string;
  userId: string;
}

export interface PersonData {
  id: string;
  name: string;
  userId: string;
}

export interface ReceiptStoreItem {
  storeId: string;
  name: string;
  website: string;
  phone: string;
  address: string;
  category?: string;
}

export interface Receipt {
  ownerId: string;
  createdAt: string;
  imageUrl: string;
  store: ReceiptStoreItem;
  items: ReceiptItem[];
  people: Person[];
  taxPercent?: number;
  tipPercent?: number;
  total?: string;
  applyTipToAll?: boolean;
}

export interface SavedReceipt extends Receipt {
  id: string;
}
