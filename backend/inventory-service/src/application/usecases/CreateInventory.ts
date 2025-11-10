import { IInventoryRepository } from "../../domain/repositories/IInventoryRepository";
import { CreateInventoryDTO } from "../../interface/dtos/InventoryDTO";

export class CreateInventoryUsecase {
  constructor(private InventoryRepo: IInventoryRepository) {}

  async execute(dto: CreateInventoryDTO) {
    await this.InventoryRepo.save(dto);
  }
}
