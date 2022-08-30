import {Purchase} from "./purchase";

export interface Customer {
  id: number;
  email: string;
  password: string;
  purchases: Purchase[];
}
