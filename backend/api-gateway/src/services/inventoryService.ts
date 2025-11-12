import { createBreaker } from "../circuit/breaker";

const inventoryBreaker = createBreaker("inventory-service");
const INVENTORY_BASE =
  process.env.INVENTORY_SERVICE_URL || "http://localhost:4001";

export async function getInventory() {
  return inventoryBreaker.fire(`${INVENTORY_BASE}/inventory`);
}

export async function getInventoryById(id: number) {
  return inventoryBreaker.fire(`${INVENTORY_BASE}/inventory/${id}`, {
    method: "GET",
  });
}

export async function createInventory(payload: any) {
  return inventoryBreaker.fire(`${INVENTORY_BASE}/inventory`, {
    method: "POST",
    data: payload,
  });
}

export async function updateInventory(id: number, payload: any) {
  return inventoryBreaker.fire(`${INVENTORY_BASE}/inventory/${id}`, {
    method: "PUT",
    data: payload,
  });
}

export async function deleteInventory(id: number) {
  return inventoryBreaker.fire(`${INVENTORY_BASE}/inventory/${id}`, {
    method: "DELETE",
  });
}
