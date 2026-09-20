import { db } from '../database/connection.js';

export async function getAllProducts() {
  const [rows] = await db.execute(
    'SELECT product_id, product_name, price, stock, category_id, user_id FROM products ORDER BY product_id'
  );
  return rows;
}

export async function createProduct({ product_name, price, stock, category_id, user_id }) {
  const [result] = await db.execute(
    'INSERT INTO products (product_name, price, stock, category_id, user_id) VALUES (?, ?, ?, ?, ?)',
    [
      product_name, 
      Number(price), 
      stock ? parseInt(stock, 10) : 0, 
      category_id ? parseInt(category_id, 10) : null, 
      user_id ? parseInt(user_id, 10) : null
    ]
  );
  return findProductById(result.insertId);
}

export async function findProductById(id) {
  const [rows] = await db.execute(
    'SELECT product_id, product_name, price, stock, category_id, user_id FROM products WHERE product_id = ?', 
    [id]
  );
  return rows[0] ?? null;
}

export async function updateProduct(id, { product_name, price, stock, category_id, user_id }) {
  await db.execute(
    'UPDATE products SET product_name = ?, price = ?, stock = ?, category_id = ?, user_id = ? WHERE product_id = ?',
    [
      product_name, 
      Number(price), 
      parseInt(stock, 10), 
      category_id ? parseInt(category_id, 10) : null, 
      user_id ? parseInt(user_id, 10) : null, 
      id
    ]
  );
  return findProductById(id);
}

export async function updateProductPrice(id, price) {
  await db.execute('UPDATE products SET price = ? WHERE product_id = ?', [Number(price), id]);
  return findProductById(id);
}

export async function deleteProduct(id) {
  const [result] = await db.execute('DELETE FROM products WHERE product_id = ?', [id]);
  return result.affectedRows > 0;
}
