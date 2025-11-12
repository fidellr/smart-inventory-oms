import { createBreaker } from "../circuit/breaker";

const orderBreaker = createBreaker("order-service");
const ORDER_BASE = process.env.ORDER_SERVICE_URL || "http://localhost:4002";

export async function getOrders() {
  return orderBreaker.fire(`${ORDER_BASE}/orders`);
}

export async function createOrders(payload: any) {
  return orderBreaker.fire(`${ORDER_BASE}/orders`, {
    method: "POST",
    data: payload,
  });
}

export async function getOrdersById(id: number) {
  return orderBreaker.fire(`${ORDER_BASE}/orders/${id}`, {
    method: "GET",
  });
}
