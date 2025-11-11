import { Elysia } from "elysia";
import { inventoryRoutes } from "./routes/inventory.routes";
import { ordersRoutes } from "./routes/order.routes";

const app = new Elysia();
inventoryRoutes(app);
ordersRoutes(app);

app.listen(4000);
console.log("🚀 API Gateway running on port 8080");
