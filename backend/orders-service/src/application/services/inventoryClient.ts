import axios from "axios";
import { CircuitBreaker } from "../circuit-breaker/CircuitBreaker";

const breaker = new CircuitBreaker(3, 500, 2);

export const inventoryClient = {
  reserveStock: async (productId: number, quantity: number) => {
    return breaker.exec(async () => {
      const res = await axios.post("http://localhost:3000/reserve", {
        productId,
        quantity,
      });
      return res.data;
    });
  },
  releaseStock: async (productId: number, quantity: number) => {
    return breaker.exec(async () => {
      const res = await axios.post("http://localhost:3000/release", {
        productId,
        quantity,
      });
      return res.data;
    });
  },
};
