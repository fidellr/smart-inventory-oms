export type ProductSchema = {
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
