import {Item} from "./Item";

export interface PurchaseDetail {
  id: number;
  purchaseId: number;
  itemId: number;
  quantity: number;
  item: Item;
}
