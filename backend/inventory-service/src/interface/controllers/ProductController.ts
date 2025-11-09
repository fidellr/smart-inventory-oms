import { Elysia } from "elysia";
import { CreateInventoryUsecase } from "../../application/usecases/CreateInventory";
import { ListInventoryUsecase } from "../../application/usecases/ListInventory";
import { UpdateInventoryUsecase } from "../../application/usecases/UpdateInventory";
import { DeleteInventoryUsecase } from "../../application/usecases/DeleteInventory";
import { CreateInventoryDTO, UpdateInventoryDTO } from "../dtos/InventoryDTO";
import { Pool } from "pg";
import { FindByIdInventoryUsecase } from "../../application/usecases/FindByID";
import { FindBySKUInventoryUsecase } from "../../application/usecases/FindBySKU";
import { PgInventoryRepository } from "../../infrastructure/db/postgresql/PgInventoryRepository";

const connectionString = process.env.DATABASE_URL;
export const registerProductionRoutes = (app: Elysia) => {
  const pool = new Pool({ connectionString });
  const repo = new PgInventoryRepository(pool);
  const createInventoryUsecase = new CreateInventoryUsecase(repo);
  const listInventoryUsecase = new ListInventoryUsecase(repo);
  const findByIdInventoryUsecase = new FindByIdInventoryUsecase(repo);
  const findBySKUInventoryUsecase = new FindBySKUInventoryUsecase(repo);
  const updateInventoryUsecase = new UpdateInventoryUsecase(repo);
  const deleteInventoryUsecase = new DeleteInventoryUsecase(repo);

  app.post("/inventory", async ({ body }) => {
    const dto = body as CreateInventoryDTO;
    await createInventoryUsecase.execute(dto);
    return { message: "Inventory created successfully" };
  });

  app.get("/inventory", async ({ query }) => {
    const sku = query["sku"];
    if (typeof sku !== "undefined" && sku.length > 0) {
      return await findBySKUInventoryUsecase.execute(sku);
    }
    return await listInventoryUsecase.execute();
  });

  app.get("/inventory/:id", async ({ params }) => {
    const id = parseInt(params.id);
    return await findByIdInventoryUsecase.execute(id);
  });

  app.put("/inventory/:id", async ({ params, body }) => {
    const id = parseInt(params.id);
    const dto = body as UpdateInventoryDTO;
    const res = await updateInventoryUsecase.execute(id, dto);
    if (!res) return { message: `Inventory with id ${id} is not found!` };
    return res;
  });

  app.delete("/inventory/:id", async ({ params }) => {
    const id = parseInt(params.id);
    await deleteInventoryUsecase.execute(id);
    return { message: `Inventory with id ${id} successfully deleted!` };
  });

  return app;
};
