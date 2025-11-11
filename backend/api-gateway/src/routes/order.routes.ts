import { Elysia } from "elysia";
import {
  createOrders,
  getOrders,
  getOrdersById,
} from "../services/orderService";

export const ordersRoutes = (app: Elysia) => {
  app.get("/api/orders", async () => await getOrders());
  app.get(
    "/api/orders/:id",
    async ({ params }) => await getOrdersById(parseInt(params.id))
  );
  app.post("/api/orders", async ({ body }) => await createOrders(body));
};
