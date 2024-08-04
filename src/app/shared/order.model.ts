import {Food} from "./food.model";

export interface Order {
  firstItemName: string;
  totalPrice: number;
  status: string;
  showDetails: boolean;
  items: Food[];
}
