import { ReceiptState, useReceiptStore } from './receiptStore';

export const useSetItems = () => useReceiptStore((state: ReceiptState) => state.setReceiptItems);
export const useAddPerson = () => useReceiptStore((state: ReceiptState) => state.addPerson);
export const useRemovePerson = () => useReceiptStore((state: ReceiptState) => state.removePerson);
export const useAddReceiptItem = () => useReceiptStore((state: ReceiptState) => state.addReceiptItem);
export const useAssignItem = () => useReceiptStore((state: ReceiptState) => state.assignItem);
export const useUpdateReceiptItem = () => useReceiptStore((state: ReceiptState) => state.updateReceiptItem);
export const useResetReceipt = () => useReceiptStore((state: ReceiptState) => state.resetReceipt);
export const useSetCurrentReceiptId = () => useReceiptStore((state: ReceiptState) => state.setCurrentReceiptId);
