import { Order } from "../entities/Order";

export interface IOrderRepository {
  save(order: Order): Promise<Order>;
  findById(id: number): Promise<Order | null>;
  findAll(): Promise<Order[]>;
  updateStatus(id: number, status: string): Promise<Order | null>;
  delete(id: number): Promise<void>;
}
