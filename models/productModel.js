import { db } from '../database/connection.js';

export const getAllProducts = async () => {
  const query = `
    SELECT 
      p.product_id, 
      p.product_name, 
      p.price, 
      p.stock,
      c.category_id, 
      c.category_name, 
      u.user_id, 
      u.user_name
    FROM products p
    LEFT JOIN product_categories c ON p.category_id = c.category_id
    LEFT JOIN users u ON p.user_id = u.user_id
  `;
  const [rows] = await db.query(query);
  
  return rows.map(row => ({
    id: row.product_id,
    title: row.product_name,
    price: row.price,
    stock: row.stock,
    category: row.category_id ? { id: row.category_id, name: row.category_name } : null,
    seller: row.user_id ? { id: row.user_id, name: row.user_name } : null 
  }));
};

export const findProductById = async (id) => {
  const query = `
    SELECT 
      p.product_id, 
      p.product_name, 
      p.price, 
      p.stock,
      c.category_id, 
      c.category_name, 
      u.user_id, 
      u.user_name
    FROM products p
    LEFT JOIN product_categories c ON p.category_id = c.category_id
    LEFT JOIN users u ON p.user_id = u.user_id
    WHERE p.product_id = ?
  `;
  const [rows] = await db.query(query, [id]);
  if (rows.length === 0) return null;

  const row = rows[0];
  return {
    id: row.product_id,
    title: row.product_name,
    price: row.price,
    stock: row.stock,
    category: row.category_id ? { id: row.category_id, name: row.category_name } : null,
    seller: row.user_id ? { id: row.user_id, name: row.user_name } : null // Mengembalikan ke format objek 'seller' asli
  };
};

export const createProduct = async (data) => {
  const product_name = data.product_name || data.title;
  const user_id = data.user_id || data.seller_id;
  const { price, stock, category_id } = data;
  
  const [result] = await db.query(
    'INSERT INTO products (product_name, price, stock, category_id, user_id) VALUES (?, ?, ?, ?, ?)',
    [product_name, price, stock, category_id, user_id]
  );
  
  return { id: result.insertId, ...data };
};

export const updateProduct = async (id, data) => {
  const product_name = data.product_name || data.title;
  const { price, stock, category_id } = data;
  
  await db.query(
    'UPDATE products SET product_name = ?, price = ?, stock = ?, category_id = ? WHERE product_id = ?',
    [product_name, price, stock, category_id, id]
  );
  
  return findProductById(id);
};

export const deleteProduct = async (id) => {
  const [result] = await db.query('DELETE FROM products WHERE product_id = ?', [id]);
  return result.affectedRows > 0;
};
