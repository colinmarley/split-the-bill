import { ReceiptState } from './receiptStore';

export const getCurrentReceipt = (state: ReceiptState) => state.currentReceipt;
export const getCurrentReceiptId = (state: ReceiptState) => state.currentReceiptId;
export const getReceiptItems = (state: ReceiptState) => state.currentReceipt.items;
export const getReceiptPeople = (state: ReceiptState) => state.currentReceipt.people;
