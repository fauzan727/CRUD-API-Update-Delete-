import { db } from '../database/connection.js';

export const getAllCategories = async () => {
  const [rows] = await pool.query('SELECT * FROM categories');
  return rows;
};

export const findCategoryWithProducts = async (id) => {
  const [categories] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
  if (categories.length === 0) return null;
  const [products] = await pool.query('SELECT * FROM products WHERE category_id = ?', [id]);
  return { ...categories[0], products };
};

export const countProductsInCategory = async (id) => {
  const [rows] = await pool.query('SELECT COUNT(*) as count FROM products WHERE category_id = ?', [id]);
  return rows[0].count;
};

export const createCategory = async (data) => {
  const { category_name } = data;
  const [result] = await pool.query('INSERT INTO categories (category_name) VALUES (?)', [category_name]);
  return { id: result.insertId, category_name };
};

export const updateCategory = async (id, data) => {
  const { category_name } = data;
  await pool.query('UPDATE categories SET category_name = ? WHERE id = ?', [category_name, id]);
  return { id, category_name };
};

export const deleteCategory = async (id) => {
  const [result] = await pool.query('DELETE FROM categories WHERE id = ?', [id]);
  return result.affectedRows > 0;
};
