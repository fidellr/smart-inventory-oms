import { Elysia } from "elysia";
import { forwardRequest } from "../utils/httpClient";
import { config } from "../utils/config";

export const orderRoutes = (app: Elysia) =>
  app.group("/orders", (group) =>
    group
      .get(
        "/",
        async () =>
          await forwardRequest(config.ORDER_SERVICE_URL, "/orders", "GET")
      )
      .post(
        "/",
        async ({ body }) =>
          await forwardRequest(
            config.ORDER_SERVICE_URL,
            "/orders",
            "POST",
            body
          )
      )
  );
