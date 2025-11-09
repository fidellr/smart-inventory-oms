import { Pool } from "pg";
import { IOrderRepository } from "../domain/repositories/IOrderRepository";
import { Order } from "../domain/entities/Order";

export class PgOrderRepository implements IOrderRepository {
  constructor(private readonly pool: Pool) {}

  async save(order: Order): Promise<Order> {
    const res = await this.pool.query(
      `INSERT INTO orders (customer_name, items, total_amount, status, created_at, updated_at)
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING *`,
      [
        order.customer_name,
        JSON.stringify(order.items),
        order.total_amount,
        order.status,
        order.created_at,
        order.updated_at,
      ]
    );
    return res.rows[0];
  }

  async findById(id: number): Promise<Order | null> {
    const res = await this.pool.query(`SELECT * FROM orders WHERE id=$1`, [id]);
    return res.rows[0] ?? null;
  }

  async findAll(): Promise<Order[]> {
    const res = await this.pool.query(`SELECT * FROM orders ORDER BY id DESC`);
    return res.rows;
  }

  async updateStatus(id: number, status: string): Promise<Order | null> {
    const res = await this.pool.query(
      `UPDATE orders SET status=$1, updated_at=$2 WHERE id=$3`,
      [status, new Date(), id]
    );
    if (res.rowCount === 0) return null;
    const row = res.rows[0];
    return row;
  }

  async delete(id: number): Promise<void> {
    await this.pool.query(`DELETE FROM orders WHERE id=$1`, [id]);
  }
}
