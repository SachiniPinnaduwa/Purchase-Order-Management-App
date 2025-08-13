export enum PurchaseOrderStatus {
  Draft = 'Draft',
  Approved = 'Approved',
  Shipped = 'Shipped',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

export interface PurchaseOrder {
  id: number;
  poNumber: string;
  poDescription: string;
  supplierName: string;
  orderDate: string;
  totalAmount: number;
  status: 'Draft' | 'Approved' | 'Shipped' | 'Completed' | 'Cancelled';
}

export interface CreatePurchaseOrder {
  poDescription: string;
  supplierName: string;
  orderDate: string;
  totalAmount: number;
}

export interface UpdatePurchaseOrder extends CreatePurchaseOrder {
  id: number;
  status: PurchaseOrder['status'];
}
