import { Inventory } from "../../domain/entities/Inventory";
import { IInventoryRepository } from "../../domain/repositories/IInventoryRepository";

export class FindByIdInventoryUsecase {
  constructor(private productRepo: IInventoryRepository) {}

  async execute(id: number): Promise<Inventory | null> {
    return await this.productRepo.findById(id);
  }
}
