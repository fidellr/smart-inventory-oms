import { Order } from "../../../domain/entities/Order";
import { OrderItem } from "../../../domain/value-objects/OrderItem";

export class ShipOrderStep {
  async execute(order: Order) {
    console.log("[Saga] Shipping order...");
    // @TODO: simulate success/failure
  }

  async compensate(order: Order) {
    console.log("[Saga] Cancel shipment...");
  }
}
