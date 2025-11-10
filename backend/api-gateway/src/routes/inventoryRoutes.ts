import { Elysia } from "elysia";
import { forwardRequest } from "../utils/httpClient";
import { config } from "../utils/config";

export const inventoryRoutes = (app: Elysia) =>
  app.group("/inventory", (group) =>
    group
      .get(
        "/",
        async () =>
          await forwardRequest(
            config.INVENTORY_SERVICE_URL,
            "/inventory",
            "GET"
          )
      )
      .post(
        "/",
        async ({ body }) =>
          await forwardRequest(
            config.INVENTORY_SERVICE_URL,
            "/inventory",
            "POST",
            body
          )
      )
      .put(
        "/",
        async ({ body }) =>
          await forwardRequest(
            config.INVENTORY_SERVICE_URL,
            "/inventory",
            "PUT",
            body
          )
      )
  );
