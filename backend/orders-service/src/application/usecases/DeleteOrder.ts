import { Order } from "../../domain/entities/Order";
import { OrderRepository } from "../../domain/repositories/IOrderRepository";

export class DeleteOrderUsecase {
  constructor(private readonly repo: OrderRepository) {}

  async execute(id: number): Promise<void> {
    return await this.repo.delete(id);
  }
}
