import { Inventory } from "../../domain/entities/Inventory";
import { IInventoryRepository } from "../../domain/repositories/IInventoryRepository";

export class ListInventoryUsecase {
  constructor(private productRepo: IInventoryRepository) {}

  async execute(): Promise<Inventory[]> {
    const data = await this.productRepo.list();
    return data;
  }
}
