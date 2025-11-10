import { z } from "zod";

//#region CREATE PRODUCT SCHEMA
export const CreateInventorySchema = z.object({
  sku: z.string().min(3, "SKU must be at least 3 characters"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional().default(""),
  category_id: z.number().int().positive(),
  quantity_on_hand: z.number().int().nonnegative(),
  reorder_threshold: z.number().int().nonnegative(),
  location: z.string().min(2),
  supplier_id: z.number().int().positive(),
});
export type CreateInventoryDTO = z.infer<typeof CreateInventorySchema>;
//#endregion

//#region UPDATE Inventory SCHEMA
export const UpdateInventorySchema = z.object({
  id: z.number().int(),
  sku: z.string().min(3),
  name: z.string().min(3),
  description: z.string(),
  category_id: z.number().int(),
  quantity_on_hand: z.number().int().min(0),
  reorder_threshold: z.number().int().min(0),
  location: z.string(),
  supplier_id: z.number().int(),
});
export type UpdateInventoryDTO = z.infer<typeof UpdateInventorySchema>;
//#endregion

//#region RESERVE STOCK Inventory SCHEMA
export const ReserveStockInventorySchema = z.object({
  productId: z.number().int(),
  released: z.number().int(),
  current: z.number().int(),
});
export type ReserveStockInventoryDTO = z.infer<
  typeof ReserveStockInventorySchema
>;
//#endregion

//#region RESERVE STOCK Inventory SCHEMA
export const ReleasedStockInventorySchema = z.object({
  productId: z.number().int(),
  released: z.number().int(),
  current: z.number().int(),
});
export type ReleasedStockInventoryDTO = z.infer<
  typeof ReserveStockInventorySchema
>;
//#endregion
