import { Order } from "../../../domain/entities/Order";
import { OrderItem } from "../../../domain/value-objects/OrderItem";
import { inventoryClient } from "../../services/inventoryClient";

export class ReserveInventoryStep {
  async execute(order: Order) {
    console.log("[Saga] Reserving inventory...");
    await inventoryClient.reserveStock(order.id!, order.items.length);
  }

  async compensate(order: Order) {
    console.log("[Saga] Releasing inventory...");
    await inventoryClient.releaseStock(order.id!, order.items.length);
  }
}
