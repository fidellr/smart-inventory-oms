import { inventoryClient } from "../../../infrastructure/http/inventoryClient";

export class ReserveInventoryStep {
  async execute(ctx: any) {
    const { orderId, items } = ctx;
    for (const item of items) {
      await inventoryClient.reserveStock(item.productId, item.quantity);
    }
    console.log(`[Saga] Reserved stock for order ${orderId}`);
  }
  async rollback(ctx: any) {
    const { orderId, items } = ctx;
    for (const item of items) {
      await inventoryClient.releaseStock(item.productId, item.quantity);
    }
    console.log(`[Saga] Rolled back stock for order ${orderId}`);
  }
}
