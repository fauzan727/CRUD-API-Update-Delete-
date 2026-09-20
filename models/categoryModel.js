import { db } from '../database/connection.js';

export const getAllCategories = async () => {
  const [rows] = await db.query('SELECT category_id, category_name FROM product_categories');
  return rows.map(row => ({
    id: row.category_id, // 💡 Petakan category_id ke properti 'id' untuk frontend
    name: row.category_name
  }));
};

export const findCategoryWithProducts = async (id) => {
  const [categories] = await db.query('SELECT category_id, category_name FROM product_categories WHERE category_id = ?', [id]);
  if (categories.length === 0) return null;
  const [products] = await db.query('SELECT * FROM products WHERE category_id = ?', [id]);
  
  return {
    id: categories[0].category_id,
    name: categories[0].category_name,
    products: products.map(p => ({ id: p.product_id, ...p }))
  };
};

export const countProductsInCategory = async (id) => {
  const [rows] = await db.query('SELECT COUNT(*) as count FROM products WHERE category_id = ?', [id]);
  return rows[0].count;
};

export const createCategory = async (data) => {
  const { category_name } = data;
  const [result] = await db.query('INSERT INTO product_categories (category_name) VALUES (?)', [category_name]);
  return { id: result.insertId, name: category_name };
};

export const updateCategory = async (id, data) => {
  const { category_name } = data;
  await db.query('UPDATE product_categories SET category_name = ? WHERE category_id = ?', [category_name, id]);
  return { id, name: category_name };
};

export const deleteCategory = async (id) => {
  const [result] = await db.query('DELETE FROM product_categories WHERE category_id = ?', [id]);
  return result.affectedRows > 0;
};
