import { Elysia } from "elysia";
import {
  createInventory,
  deleteInventory,
  getInventory,
  getInventoryById,
  updateInventory,
} from "../services/inventoryService";

export const inventoryRoutes = (app: Elysia) => {
  app.get("/api/inventory", async () => await getInventory());
  app.get(
    "/api/inventory/:id",
    async ({ params }) => await getInventoryById(parseInt(params.id))
  );
  app.post("/api/inventory", async ({ body }) => await createInventory(body));
  app.put(
    "/api/inventory/:id",
    async ({ params, body }) => await updateInventory(parseInt(params.id), body)
  );
  app.delete(
    "/api/inventory/:id",
    async ({ params }) => await deleteInventory(parseInt(params.id))
  );
};
