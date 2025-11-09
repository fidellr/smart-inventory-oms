BEGIN;

-- Enforce non-negative inventory
ALTER TABLE inventory
ADD CONSTRAINT chk_quantity_nonnegative CHECK (quantity_on_hand >= 0);

-- Enforce positive price
ALTER TABLE order_items
ADD CONSTRAINT chk_unit_price_positive CHECK (unit_price > 0);

COMMIT;
