import { ReceiptItem } from "@/types/receipt";

export const getReceiptItemPrice = (item: ReceiptItem) => {
  if (!item || typeof item.price !== "string") return "0.00";
  return parseFloat(item.price).toFixed(2);
};

export const getReceiptItemTotalPrice = (item: ReceiptItem) => {
  if (!item || typeof item.price !== "string") return "0.00";
  if (typeof item.quantity !== "number") return "0.00";
  if (item.quantity < 1) return "0.00";
  return (parseFloat(item.price) * item.quantity).toFixed(2);
};

export const getReceiptItemQuantity = (item: ReceiptItem) => {
  if (!item || typeof item.quantity !== "number") return 0;
  return item.quantity;
};

export const getReceiptItemName = (item: ReceiptItem, index: number) => {
  if (!index || typeof index !== "number") return "Unknown Item";
  if (!item || typeof item.name !== "string") return `Item ${index + 1}`;
  return item.name;
};

export const calculateTotalTax = (subtotal: number, taxPercent: number) => {
  if (typeof subtotal !== "number" || subtotal < 0) return 0;
  if (typeof taxPercent !== "number" || taxPercent < 0) return 0;
  return parseFloat((subtotal * (taxPercent / 100)).toFixed(2));
};

export const calculateTotalTip = (subtotal: number, tipPercent: number, applyTipToAll: boolean) => {
  if (typeof subtotal !== "number" || subtotal < 0) return 0;
  if (typeof tipPercent !== "number" || tipPercent < 0) return 0;
  return applyTipToAll ? parseFloat((subtotal * (tipPercent / 100)).toFixed(2)) : 0;
};

export const calculateGrandTotal = (subtotal: number, taxPercent: number, tipPercent: number, applyTipToAll: boolean) => {
  if (typeof subtotal !== "number" || subtotal < 0) return 0;
  if (typeof taxPercent !== "number" || taxPercent < 0) return subtotal
  if (typeof tipPercent !== "number" || tipPercent < 0) return subtotal + calculateTotalTax(subtotal, taxPercent);
  if (typeof applyTipToAll !== "boolean") return subtotal + calculateTotalTax(subtotal, taxPercent);
  // All inputs are valid, calculate grand total
  const totalTax = calculateTotalTax(subtotal, taxPercent);
  const totalTip = calculateTotalTip(subtotal, tipPercent, applyTipToAll);
  return subtotal + totalTax + totalTip;
};
