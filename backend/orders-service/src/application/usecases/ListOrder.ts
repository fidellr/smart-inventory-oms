import { Order } from "../../domain/entities/Order";
import { IOrderRepository } from "../../domain/repositories/IOrderRepository";

export class ListOrderUsecase {
  constructor(private readonly repo: IOrderRepository) {}

  async execute(): Promise<Order[]> {
    return await this.repo.findAll();
  }
}
