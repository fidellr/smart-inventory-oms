import axios, { AxiosInstance } from "axios";
import { CircuitBreaker } from "../../application/circuit-breaker/CircuitBreaker";

const breaker = new CircuitBreaker(3, 5000); // fail 3x -> open for 5s

const http: AxiosInstance = axios.create({
  baseURL: process.env.INVENTORY_SERVICE_URL ?? "http://inventory-service:4001",
  timeout: 5000, // ms
  headers: { "Content-Type": "application/json" },
});

async function callInventory<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await breaker.exec(fn);
  } catch (err) {
    // Normalize error for callers (you can enrich this with logging/tracing)
    throw err;
  }
}

export const inventoryClient = {
  reserveStock: async (productId: number, qty: number) => {
    return callInventory(async () => {
      const res = await http.post("/reserve", { productId, quantity: qty });
      return res.data;
    });
  },

  releaseStock: async (productId: number, qty: number) => {
    return callInventory(async () => {
      const res = await http.post("/release", { productId, quantity: qty });
      return res.data;
    });
  },

  // optional helper: query current stock
  getStock: async (productId: number) => {
    return callInventory(async () => {
      const res = await http.get(`/products/${productId}/stock`);
      return res.data;
    });
  },
};
