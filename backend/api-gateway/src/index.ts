import { Elysia } from "elysia";
import { rateLimiter } from "./middlewares/rateLimiter";
import { inventoryRoutes } from "./routes/inventoryRoutes";
import { orderRoutes } from "./routes/orderRoutes";
import { config } from "./utils/config";

const app = new Elysia();
rateLimiter(app);

inventoryRoutes(app)
orderRoutes(app)

app.listen(config.PORT, () => {
  console.log(`🚀 API Gateway running on port ${config.PORT}`);
});
