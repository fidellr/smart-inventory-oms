import { Order } from "../../domain/entities/Order";
import { ConfirmPaymentStep } from "./steps/ConfirmPaymentStep";
import { ReserveInventoryStep } from "./steps/ReserveInventoryStep";
import { ShipOrderStep } from "./steps/ShipOrderStep";

export class CreateOrderSaga {
  private steps = [
    new ReserveInventoryStep(),
    new ConfirmPaymentStep(),
    new ShipOrderStep(),
  ];

  async execute(order: Order) {
    const executedSteps:
      | ReserveInventoryStep
      | ConfirmPaymentStep
      | ShipOrderStep[] = [];

    try {
      console.log(
        `[Saga] Starting order ${order.id ?? "(new)"} for ${
          order.customer_name
        }`
      );

      for (const step of this.steps) {
        await step.execute(order);
        executedSteps.push(step);
      }
      // order.confirm();
      console.log("[Saga] Order completed successfully ✅");
    } catch (err) {
      console.error("[Saga] Failed, rolling back...", err);
      for (const step of executedSteps.reverse()) {
        await step.compensate(order);
      }
    }
  }
}
