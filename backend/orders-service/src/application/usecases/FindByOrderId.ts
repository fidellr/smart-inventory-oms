import { Order } from "../../domain/entities/Order";
import { IOrderRepository } from "../../domain/repositories/IOrderRepository";

export class FindByOrderIdUsecase {
  constructor(private productRepo: IOrderRepository) {}

  async execute(id: number): Promise<Order | null> {
    return await this.productRepo.findById(id);
  }
}
