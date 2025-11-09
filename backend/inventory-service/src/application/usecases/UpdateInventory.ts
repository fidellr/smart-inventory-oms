import { Inventory } from "../../domain/entities/Inventory";
import { IInventoryRepository } from "../../domain/repositories/IInventoryRepository";
import { Quantity } from "../../domain/value-objects/Quantity";
import { SKU } from "../../domain/value-objects/SKU";
import { UpdateInventoryDTO } from "../../interface/dtos/InventoryDTO";

export class UpdateInventoryUsecase {
  constructor(private productRepo: IInventoryRepository) {}

  async execute(
    id: number,
    dto: UpdateInventoryDTO
  ): Promise<Inventory | null> {
    // let existing = await this.productRepo.findById(id);
    // if (!existing) throw new Error("Product not found");
    // // console.log("EXISTING", existing?.toPrimitives(), { dto });
    // return existing;
    // if (dto.sku !== undefined) existing.changeSKU(new SKU(dto.sku));
    // if (dto.name !== undefined) existing.rename(dto.name);
    // if (dto.description !== undefined)
    //   existing.changeDescription(dto.description);
    // if (dto.categoryId !== undefined) existing.changeCategory(dto.categoryId);
    // if (dto.location !== undefined) existing.changeLocation(dto.location);
    // if (dto.supplierId !== undefined) existing.changeSupplier(dto.supplierId);
    // if (dto.reorderThreshold !== undefined)
    //   existing.changeReorderThreshold(dto.reorderThreshold);
    // if (dto.quantityOnHand !== undefined)
    //   existing.setQuantityOnHand(dto.quantityOnHand);
    // const updatedData = await this.productRepo.update(id, existing);
    // if (!updatedData) return null;
    // return updatedData;

    console.log({ dto });

    return await this.productRepo.update(id, dto);
  }
}
