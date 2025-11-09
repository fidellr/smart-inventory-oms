import { Pool } from "pg";
import { IInventoryRepository } from "../../domain/repositories/IInventoryRepository";
import {
  createInventory,
  Inventory,
  toPrimitives,
} from "../../domain/entities/Inventory";
import {
  CreateInventoryDTO,
  UpdateInventoryDTO,
} from "../../interface/dtos/InventoryDTO";

export class PgInventoryRepository implements IInventoryRepository {
  constructor(private pool: Pool) {}

  async save(inv: CreateInventoryDTO): Promise<void> {
    const p = createInventory(inv);
    console.log(Object.values(p));
    await this.pool.query(
      `INSERT INTO inventory
          (sku,
          name, 
          description, 
          category_id,
          quantity_on_hand,
          reorder_threshold,
          location,
          supplier_id,
          created_at,
          updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      Object.values(p)
    );
  }

  async findById(id: number): Promise<Inventory | null> {
    const results = await this.pool.query(
      `SELECT * FROM inventory WHERE id=$1`,
      [id]
    );
    if (results.rowCount === 0) return null;

    const row = results.rows[0];
    if (!row) return null;

    return row;
  }

  async findBySKU(sku: string): Promise<Inventory | null> {
    const results = await this.pool.query(
      `SELECT * FROM inventory WHERE sku=$1`,
      [sku]
    );
    if (results.rowCount === 0) return null;
    const row = results.rows[0];

    return {
      id: row.id,
      sku: row.sku,
      name: row.name,
      description: row.description,
      category_id: row.category_id,
      quantity_on_hand: row.quantity_on_hand,
      reorder_threshold: row.reorder_threshold,
      location: row.location,
      supplier_id: row.supplier_id,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  async list(): Promise<Inventory[]> {
    const results = await this.pool.query(`SELECT * FROM inventory`);
    return results.rows;
  }

  async update(id: number, inv: UpdateInventoryDTO): Promise<Inventory | null> {
    const p = createInventory(inv);
    const results = await this.pool.query(
      `UPDATE inventory
    SET name=$1, description=$2, quantity_on_hand=$3, reorder_threshold=$4, 
        location=$5, supplier_id=$6, updated_at=$7, created_at=$8
    WHERE id=$9
    RETURNING *;`,
      [
        p.name,
        p.description,
        p.quantity_on_hand,
        p.reorder_threshold,
        p.location,
        p.supplier_id,
        new Date(),
        p.created_at,
        id,
      ]
    );
    if (results.rowCount === 0)
      throw new Error(`Inventory not found with ID: ${id}`);

    const row = results.rows[0];

    return {
      id: row.id,
      sku: row.sku,
      name: row.name,
      description: row.description,
      category_id: row.category_id,
      quantity_on_hand: row.quantity_on_hand,
      reorder_threshold: row.reorder_threshold,
      location: row.location,
      supplier_id: row.supplier_id,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  async delete(id: number): Promise<void> {
    await this.pool.query(`DELETE FROM inventory WHERE id=$1`, [id]);
  }
}
