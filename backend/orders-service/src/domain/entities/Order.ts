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

export class Order {
  private props: OrderProps;

  constructor(props: OrderProps) {
    if (!props.customer_name || props.customer_name.trim().length < 3)
      throw new Error("Customer name must be at least 3 characters");

    if (props.items.length === 0)
      throw new Error("Order must have at least one item");

    this.props = {
      ...props,
      status: props.status ?? "PENDING",
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? new Date(),
    };
  }

  get id() {
    return this.props.id;
  }

  get customer_name() {
    return this.props.customer_name;
  }

  get items() {
    return this.props.items;
  }

  get total_amount() {
    return this.props.total_amount;
  }

  get status() {
    return this.props.status;
  }

  get created_at() {
    return this.props.created_at;
  }
  get updated_at() {
    return this.props.updated_at;
  }

  confirm() {
    this.props.status = "CONFIRMED";
    this.touch();
  }

  cancel() {
    this.props.status = "CANCELLED";
    this.touch();
  }

  ship() {
    if (this.props.status !== "CONFIRMED")
      throw new Error("Cannot ship unless confirmed");
    this.props.status = "SHIPPED";
    this.touch();
  }

  toPrimitives() {
    return { ...this.props };
  }

  private touch() {
    this.props.updated_at = new Date();
  }
}
