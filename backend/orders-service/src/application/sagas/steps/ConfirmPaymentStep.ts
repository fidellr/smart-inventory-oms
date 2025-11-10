import { Order } from "../../../domain/entities/Order";
import { OrderItem } from "../../../domain/value-objects/OrderItem";
import { inventoryClient } from "../../services/inventoryClient";

export class ConfirmPaymentStep {
  async execute(order: Order) {
    console.log("[Saga] Confirming payment...");
    // @TODO: simulate success/failure
  }

  async compensate(order: Order) {
    console.log("[Saga] Refunding payment...");
  }
}
