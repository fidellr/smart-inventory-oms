import { IInventoryRepository } from "../../domain/repositories/IInventoryRepository";

export class DeleteInventoryUsecase {
  constructor(private inventoryRepo: IInventoryRepository) {}

  async execute(id: number): Promise<void> {
    await this.inventoryRepo.delete(id);
  }
}
