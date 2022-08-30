import {PurchaseDetail} from "./PurchaseDetail";

export interface Purchase{
  id: number;
  customerId: number;
  purchaseDetails: PurchaseDetail[];
  date: Date;
  amount: number;
}
