DROP TABLE IF EXISTS orders;
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    -- supplier_id INT NOT NULL,
    -- order_date DATE NOT NULL,
    -- delivery_date DATE,
    status VARCHAR(50),
    items JSONB,
    total_amount BIGINT NOT NULL,
    -- payment_status VARCHAR(50),
    -- shipment_tracking_number VARCHAR(255),
    -- shipment_carrier VARCHAR(100),
    -- shipment_status VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    -- CONSTRAINT fk_orders_supplier FOREIGN KEY (supplier_id)
    --     REFERENCES suppliers (id) ON DELETE CASCADE
);
