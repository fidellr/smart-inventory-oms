import { Elysia } from "elysia";
import { registerOrderRoutes } from "./interface/controllers/OrderController";

const app = new Elysia();
registerOrderRoutes(app);
app.listen(3001);

console.log(
  `Order Service is running at ${app.server?.hostname}:${app.server?.port}`
);
