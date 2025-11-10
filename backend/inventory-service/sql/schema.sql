DROP TABLE IF EXISTS inventory;
CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    supplier_id INT NOT NULL,
    sku VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INT,
    quantity_on_hand INT DEFAULT 0,
    reorder_threshold INT DEFAULT 0,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    -- CONSTRAINT fk_inventory_supplier FOREIGN KEY (supplier_id)
    --     REFERENCES suppliers (id) ON DELETE CASCADE,
    -- CONSTRAINT fk_inventory_category FOREIGN KEY (category_id)
    --     REFERENCES categories (id) ON DELETE SET NULL
);
