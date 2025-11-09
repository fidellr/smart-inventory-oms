import { Elysia } from "elysia";
import { Pool } from "pg";
import { PgOrderRepository } from "../../infrastructure/PgOrderRepository";
import { CreateOrderUsecase } from "../../application/usecases/CreateOrder";
import { ListOrderUsecase } from "../../application/usecases/ListOrder";
import { UpdateOrderUsecase } from "../../application/usecases/UpdateOrder";
import { DeleteOrderUsecase } from "../../application/usecases/DeleteOrder";
import { CreateOrderDTO, UpdateOrderDTO } from "../dtos/OrderDTO";
import { FindByOrderIdUsecase } from "../../application/usecases/FindByOrderId";

const connectionString = process.env.DATABASE_URL;
export const registerOrderRoutes = (app: Elysia) => {
  const pool = new Pool({ connectionString });
  const repo = new PgOrderRepository(pool);
  const createOrderUsecase = new CreateOrderUsecase(repo);
  const listOrderUsecase = new ListOrderUsecase(repo);
  const findByOrderIdUsecase = new FindByOrderIdUsecase(repo);
  const updateOrderUsecase = new UpdateOrderUsecase(repo);
  const deleteOrderUsecase = new DeleteOrderUsecase(repo);

  app.post("/orders", async ({ body }) => {
    const dto = body as CreateOrderDTO;
    await createOrderUsecase.execute(dto);
    return { message: "Order created successfully" };
  });

  app.get("/orders", async () => {
    return await listOrderUsecase.execute();
  });

  app.get("/orders/:id", async ({ params }) => {
    const id = parseInt(params.id);
    return await findByOrderIdUsecase.execute(id);
  });

  app.put("/orders/:id", async ({ params, body }) => {
    const id = parseInt(params.id);
    const dto = body as UpdateOrderDTO;
    const res = await updateOrderUsecase.execute(id, dto);
    if (!res) return { message: `Order with id ${id} is not found!` };

    return res;
  });

  app.delete("/orders/:id", async ({ params }) => {
    const id = parseInt(params.id);
    await deleteOrderUsecase.execute(id);
    return { message: `Order with id ${id} successfully deleted!` };
  });
};
