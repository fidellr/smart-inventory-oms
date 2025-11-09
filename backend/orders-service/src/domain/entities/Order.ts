import { OrderItem } from "../value-objects/OrderItem";
import { OrderStatus } from "../value-objects/OrderStatus";

export type OrderProps = {
  id?: number;
  customer_name: string;
  items: OrderItem[];
  status?: OrderStatus;
  created_at: Date;
  updated_at: Date;
  total_amount: number;
};

export type Order = OrderProps;
