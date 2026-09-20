import * as ProductModel from '../models/productModel.js';

const getJsonBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
};

const sendJson = (res, status, data) => {
  res.writeHead(status, { 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*' 
  });
  res.end(JSON.stringify(data));
};

export const ProductController = {
  getProducts: async (req, res) => {
    try {
      const products = await ProductModel.getAllProducts();
      sendJson(res, 200, products);
    } catch (err) {
      sendJson(res, 500, { message: "Error fetching products", error: err.message });
    }
  },

  getById: async (res, id) => {
    try {
      const { id } = req.params; // Mengambil ID dari URL Express
      const product = await ProductModel.findProductById(id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      return res.status(200).json(product);
    } catch (err) {
      return res.status(500).json({ message: "Error fetching product", error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const body = await getJsonBody(req);
      if (!body.product_name || body.price === undefined) {
        return sendJson(res, 400, { message: "product_name and price are required fields" });
      }
      const newProduct = await ProductModel.createProduct(body);
      sendJson(res, 201, newProduct);
    } catch (err) {
      sendJson(res, 400, { message: "Invalid data or database error", error: err.message });
    }
  },

  update: async (req, res, id) => {
    try {
      const body = await getJsonBody(req);
      const updatedProduct = await ProductModel.updateProduct(id, body);
      if (!updatedProduct) return sendJson(res, 404, { message: "Product not found" });
      sendJson(res, 200, updatedProduct);
    } catch (err) {
      sendJson(res, 400, { message: "Invalid data or database error", error: err.message });
    }
  },

  destroy: async (res, id) => {
    try {
      const success = await ProductModel.deleteProduct(id);
      if (!success) return sendJson(res, 404, { message: "Product not found" });
      sendJson(res, 200, { message: "Product deleted successfully" });
    } catch (err) {
      sendJson(res, 500, { message: "Error deleting product", error: err.message });
    }
  }
};
