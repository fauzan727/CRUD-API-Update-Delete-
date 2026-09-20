import { db } from '../database/connection.js';

export const getAllUsers = async () => {
  const [rows] = await db.query('SELECT * FROM users');
  return rows;
};
