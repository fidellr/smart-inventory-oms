export const config = {
  INVENTORY_SERVICE_URL:
    process.env.INVENTORY_SERVICE_URL || "http://inventory-service:4001",
  ORDER_SERVICE_URL:
    process.env.ORDER_SERVICE_URL || "http://order-service:4002",
  PORT: process.env.PORT || 4000,
};
