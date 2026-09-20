import { db } from '../database/connection.js';

export const getAllCategories = async () => {
  // 📁 Diubah dari categories menjadi product_categories
  const [rows] = await db.query('SELECT * FROM product_categories');
  return rows;
};

export const findCategoryWithProducts = async (id) => {
  const [categories] = await db.query('SELECT * FROM product_categories WHERE id = ?', [id]);
  if (categories.length === 0) return null;

  const [products] = await db.query('SELECT * FROM products WHERE category_id = ?', [id]);
  
  return {
    ...categories[0], 
    products: products
  };
};

export const countProductsInCategory = async (id) => {
  const [rows] = await db.query('SELECT COUNT(*) as count FROM products WHERE category_id = ?', [id]);
  return rows[0].count; 
};

export const createCategory = async (data) => {
  const { category_name } = data;
  const [result] = await db.query('INSERT INTO product_categories (category_name) VALUES (?)', [category_name]);
  return { id: result.insertId, category_name };
};

export const updateCategory = async (id, data) => {
  const { category_name } = data;
  await db.query('UPDATE product_categories SET category_name = ? WHERE id = ?', [category_name, id]);
  return { id, category_name };
};

export const deleteCategory = async (id) => {
  const [result] = await db.query('DELETE FROM product_categories WHERE id = ?', [id]);
  return result.affectedRows > 0;
};
