import { IOrderRepository } from "../../domain/repositories/IOrderRepository";
import { CreateOrderDTO, UpdateOrderDTO } from "../../interface/dtos/OrderDTO";

export class UpdateOrderUsecase {
  constructor(private readonly repo: IOrderRepository) {}

  async execute(id: number, dto: UpdateOrderDTO) {
    return await this.repo.updateStatus(id, dto.status);
  }
}
