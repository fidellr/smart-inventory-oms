import { Elysia } from "elysia";
import { Pool } from "pg";
import { CreateInventoryUsecase } from "../../application/usecases/CreateInventory";
import { ListInventoryUsecase } from "../../application/usecases/ListInventory";
import { UpdateInventoryUsecase } from "../../application/usecases/UpdateInventory";
import { DeleteInventoryUsecase } from "../../application/usecases/DeleteInventory";
import { CreateInventoryDTO, UpdateInventoryDTO } from "../dtos/InventoryDTO";
import { FindByIdInventoryUsecase } from "../../application/usecases/FindByID";
import { FindBySKUInventoryUsecase } from "../../application/usecases/FindBySKU";
import { PgInventoryRepository } from "../../infrastructure/db/postgresql/PgInventoryRepository";
// import { ReleaseStockInventoryUsecase } from "../../application/usecases/ReleaseStock";
// import { ReserveStockInventoryUsecase } from "../../application/usecases/ReserveStock";
import { availableParallelism } from "node:os";
import process from "node:process";

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
  // const releaseStockInventoryUsecase = new ReleaseStockInventoryUsecase(repo);
  // const reserveStockInventoryUsecase = new ReserveStockInventoryUsecase(repo);

  app.get("/health", async () => {
    const numCPUs = availableParallelism();

    return { message: "OK", pid: process.pid, num_cpus: numCPUs };
  });

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

  // app.post("/inventory/release", async ({ body }) => {
  //   const dto = body as { product_id: number; quantity: number };
  //   const res = await releaseStockInventoryUsecase.execute(
  //     dto.product_id,
  //     dto.quantity
  //   );
  //   return res;
  // });

  // app.post("/inventory/reserve", async ({ body }) => {
  //   const dto = body as { product_id: number; quantity: number };
  //   console.log({ dto });
  //   const res = await reserveStockInventoryUsecase.execute(
  //     dto.product_id,
  //     dto.quantity
  //   );
  //   return res;
  // });

  return app;
};
