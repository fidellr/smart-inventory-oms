import { Order } from "../../domain/entities/Order";
import { IOrderRepository } from "../../domain/repositories/IOrderRepository";
import { CreateOrderDTO } from "../../interface/dtos/OrderDTO";
import { CreateOrderSaga } from "../sagas/CreateOrderSaga";

export class CreateOrderUsecase {
  constructor(private readonly repo: IOrderRepository) {}

  async execute(dto: CreateOrderDTO) {
    const saga = new CreateOrderSaga();
    const total = dto.items.reduce((all, i) => all + i.price * i.quantity, 0);

    const order = {
      customer_name: dto.customer_name,
      items: dto.items,
      total_amount: total,
      status: "PENDING" as const,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const o = new Order(order);
    await saga.execute(o);

    return await this.repo.save(o);
  }
}
