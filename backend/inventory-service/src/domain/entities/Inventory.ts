import { SKU } from "../value-objects/SKU";
import { Quantity } from "../value-objects/Quantity";

export type InventoryProps = {
  id?: number;
  sku: string;
  name: string;
  description: string;
  category_id: number;
  quantity_on_hand: number;
  reorder_threshold: number;
  location: string;
  supplier_id: number;
  created_at?: Date;
  updated_at?: Date;
};

export type Inventory = Readonly<InventoryProps>;

/**
 * Factory: create a validated Inventory object
 */
export function createInventory(props: InventoryProps) {
  if (!props.name || props.name.trim().length < 3)
    throw new Error("Inventory name must be at least 3 characters");
  if (props.reorder_threshold < 0)
    throw new Error("Reorder threshold cannot be negative");

  const sku = new SKU(props.sku);
  const quantity = new Quantity(props.quantity_on_hand);

  return {
    ...props,
    sku: sku.getValue(),
    name: props.name.trim(),
    description: props.description ?? "",
    quantity_on_hand: quantity.getValue(),
    created_at: props.created_at ?? new Date(),
    updated_at: props.updated_at ?? new Date(),
  };
}

/**
 * Pure behavior functions — functional domain style
 */
export function increaseStock(inventory: Inventory, amount: number): Inventory {
  const newQuantity = new Quantity(inventory.quantity_on_hand).add(amount);
  return {
    ...inventory,
    quantity_on_hand: newQuantity.getValue(),
    updated_at: new Date(),
  };
}

export function decreaseStock(inventory: Inventory, amount: number): Inventory {
  const newQuantity = new Quantity(inventory.quantity_on_hand).subtract(amount);
  return {
    ...inventory,
    quantity_on_hand: newQuantity.getValue(),
    updated_at: new Date(),
  };
}

export function rename(inventory: Inventory, newName: string): Inventory {
  if (!newName || newName.trim().length < 3)
    throw new Error("New name must be at least 3 characters");
  return { ...inventory, name: newName.trim(), updated_at: new Date() };
}

/**
 * Serializer for returning to API layer
 */
export function toPrimitives(inventory: Inventory) {
  return {
    id: inventory.id,
    sku: inventory.sku,
    name: inventory.name,
    description: inventory.description,
    category_id: inventory.category_id,
    quantity_on_hand: inventory.quantity_on_hand,
    reorder_threshold: inventory.reorder_threshold,
    location: inventory.location,
    supplier_id: inventory.supplier_id,
    created_at: inventory.created_at,
    updated_at: inventory.updated_at,
  };
}
