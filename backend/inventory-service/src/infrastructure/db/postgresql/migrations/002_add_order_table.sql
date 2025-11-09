BEGIN;

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  supplier_id INT REFERENCES suppliers(id) ON DELETE SET NULL,
  order_date DATE NOT NULL,
  delivery_date DATE,
  status VARCHAR(30) DEFAULT 'pending',
  payment_status VARCHAR(30) DEFAULT 'unpaid',
  shipment_tracking_number VARCHAR(100),
  shipment_carrier VARCHAR(100),
  shipment_status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id) ON DELETE CASCADE,
  inventory_id INT REFERENCES inventory(id) ON DELETE SET NULL,
  quantity INT NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL,
  total_price NUMERIC(12,2) GENERATED ALWAYS AS (quantity * unit_price) STORED
);

COMMIT;
