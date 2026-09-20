import { db } from '../database/connection.js';

export const getAllProducts = async () => {
  const query = `
    SELECT 
      p.product_id, p.title, p.description, p.price, p.rating, p.thumbnail, p.file_path, p.download_count, p.status,
      c.category_id, c.category_name,
      u.id AS seller_id, u.name AS seller_name
    FROM products p
    LEFT JOIN product_categories c ON p.category_id = c.category_id
    LEFT JOIN users u ON p.seller_id = u.id
  `;
  const [rows] = await db.query(query);
  return rows.map(row => ({
    id: row.product_id, // 💡 Tetap kirim sebagai 'id' ke frontend
    title: row.title,
    description: row.description,
    price: row.price,
    rating: row.rating,
    thumbnail: row.thumbnail,
    file_path: row.file_path,
    download_count: row.download_count,
    status: row.status,
    category: row.category_id ? { id: row.category_id, name: row.category_name } : null,
    seller: row.seller_id ? { id: row.seller_id, name: row.seller_name } : null
  }));
};

export const findProductById = async (id) => {
  const query = `
    SELECT 
      p.product_id, p.title, p.description, p.price, p.rating, p.thumbnail, p.file_path, p.download_count, p.status,
      c.category_id, c.category_name,
      u.id AS seller_id, u.name AS seller_name
    FROM products p
    LEFT JOIN product_categories c ON p.category_id = c.category_id
    LEFT JOIN users u ON p.seller_id = u.id
    WHERE p.product_id = ?
  `;
  const [rows] = await db.query(query, [id]);
  if (rows.length === 0) return null;
  const row = rows[0];
  return {
    id: row.product_id,
    title: row.title,
    description: row.description,
    price: row.price,
    rating: row.rating,
    thumbnail: row.thumbnail,
    file_path: row.file_path,
    download_count: row.download_count,
    status: row.status,
    category: row.category_id ? { id: row.category_id, name: row.category_name } : null,
    seller: row.seller_id ? { id: row.seller_id, name: row.seller_name } : null
  };
};

export const createProduct = async (data) => {
  const { title, description, price, thumbnail, file_path, category_id, seller_id } = data;
  const [result] = await db.query(
    'INSERT INTO products (title, description, price, thumbnail, file_path, category_id, seller_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, "active")',
    [title, description, price, thumbnail, file_path, category_id, seller_id]
  );
  return { id: result.insertId, ...data, status: "active" };
};

export const updateProduct = async (id, data) => {
  const { title, description, price, thumbnail, file_path, category_id, status } = data;
  await db.query(
    'UPDATE products SET title = ?, description = ?, price = ?, thumbnail = ?, file_path = ?, category_id = ?, status = ? WHERE product_id = ?',
    [title, description, price, thumbnail, file_path, category_id, status, id]
  );
  return findProductById(id);
};

export const deleteProduct = async (id) => {
  const [result] = await db.query('DELETE FROM products WHERE product_id = ?', [id]);
  return result.affectedRows > 0;
};

