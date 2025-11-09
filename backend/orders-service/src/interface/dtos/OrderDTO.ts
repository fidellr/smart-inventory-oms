import { z } from "zod";

//#region CREATE ORDER SCHEMA
export const CreateOrderSchema = z.object({
  customer_name: z.string().min(3),
  items: z.array(
    z.object({
      product_id: z.number().int().positive(),
      quantity: z.number().int().positive(),
      price: z.number().nonnegative(),
    })
  ),
});
export type CreateOrderDTO = z.infer<typeof CreateOrderSchema>;
//#endregion

//#region UPDATE ORDER SCHEMA
export const UpdateOrderSchema = z.object({
  customer_name: z.string().min(3),
  items: z.array(
    z.object({
      product_id: z.number().int().positive(),
      quantity: z.number().int().positive(),
      price: z.number().nonnegative(),
    })
  ),
  status: z.string(),
});
export type UpdateOrderDTO = z.infer<typeof UpdateOrderSchema>;
//#endregion
