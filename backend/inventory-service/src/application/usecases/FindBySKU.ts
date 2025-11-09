import { Inventory } from "../../domain/entities/Inventory";
import { IInventoryRepository } from "../../domain/repositories/IInventoryRepository";

export class FindBySKUInventoryUsecase {
  constructor(private productRepo: IInventoryRepository) {}

  async execute(sku: string): Promise<Inventory | null> {
    return await this.productRepo.findBySKU(sku);
  }
}
