import { Inventory } from "../entities/Inventory";
// import { ProductSchema } from "../entities/ProductSchema";

export interface IInventoryRepository {
  save(inventory: Inventory): Promise<void>;
  findById(id: number): Promise<Inventory | null>;
  findBySKU(sku: string): Promise<Inventory | null>;
  list(): Promise<Inventory[]>;
  update(id: number, inventory: Inventory): Promise<Inventory | null>;
  delete(id: number): Promise<void>;
}
