import { db } from '../database/connection.js';

export const getAllUsers = async () => {
  const [rows] = await db.query('SELECT * FROM users');

  return rows.map(row => ({
    id: row.id,
    name: row.name || row.username || "Unknown User",
    role: row.role || "customer"
  }));
};