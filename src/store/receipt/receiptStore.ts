import { Person, Receipt, ReceiptItem } from '@/types/receipt';
import { create } from 'zustand';

export interface ReceiptState {
  currentReceipt: Receipt;
  currentReceiptId: string | null;
  setReceiptItems: (items: ReceiptItem[]) => void;
  setCurrentReceiptId: (id: string) => void;
  addPerson: (person: Person) => void;
  removePerson: (personId: string) => void;
  addReceiptItem: (item: ReceiptItem) => void;
  updateReceiptItem: (itemIndex: number, updatedItem: ReceiptItem) => void;
  assignItem: (itemIndex: number, personId: string, name: string, quantity: number) => void;
  resetReceipt: () => void;
}

const initialCurrentReceipt = {
  ownerId: '',
  createdAt: '',
  imageUrl: '',
  store: {
    storeId: '',
    name: '',
    location: '',
    website: '',
    phone: '',
    address: '',
  },
  items: [],
  people: [],
} as Receipt;

const initialReceiptState = {
  currentReceipt: initialCurrentReceipt,
  currentReceiptId: null,
}

export const useReceiptStore = create<ReceiptState>((set, get) => ({
  currentReceipt: initialReceiptState.currentReceipt,
  currentReceiptId: initialReceiptState.currentReceiptId,
  setReceiptItems: (items) =>
    set((state) => ({ currentReceipt: { ...state.currentReceipt, items } })),
  setCurrentReceiptId(id) {
    set(() => ({ currentReceiptId: id }));
  },
  addPerson: (person) =>
    set((state) => ({ currentReceipt: { ...state.currentReceipt, people: [...state.currentReceipt.people, person] } })),
  removePerson: (personId) => set((state) => ({
    currentReceipt: {
      ...state.currentReceipt,
      people: state.currentReceipt.people.filter(person => person.id !== personId)
    }
  })),
  addReceiptItem: (item) => set((state) => ({ currentReceipt: { ...state.currentReceipt, items: [...state.currentReceipt?.items || [], item] } })),
  updateReceiptItem: (itemIndex, updatedItem) => set((state) => {
    const items = [...state.currentReceipt.items];
    items[itemIndex] = updatedItem;
    return { currentReceipt: { ...state.currentReceipt, items } };
  }),
  assignItem: (itemIndex, personId, name, quantity) => set((state) => {
    const items = [...state.currentReceipt.items];
    if (items[itemIndex]) {
      items[itemIndex] = {
        ...items[itemIndex],
        assignedTo: [
          ...items[itemIndex].assignedTo,
          { personId, name, quantity }
        ],
      };
    }
    return { currentReceipt: { ...state.currentReceipt, items } };
  }),
  resetReceipt: () => set(initialReceiptState),
}));
