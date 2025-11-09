import { Elysia } from "elysia";
import { registerProductionRoutes } from "./interface/controllers/ProductController";

const app = new Elysia();
registerProductionRoutes(app);

app.listen(3000);

console.log(
  `Inventory Service is running at ${app.server?.hostname}:${app.server?.port}`
);
