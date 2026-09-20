import * as CategoryModel from '../models/categoryModel.js';

export const CategoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = await CategoryModel.getAllCategories();
      res.status(200).json({ success: true, message: "Kategori berhasil diambil", data: categories });
    } catch (err) {
      res.status(500).json({ success: false, message: "Gagal mengambil kategori", error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const categoryData = await CategoryModel.findCategoryWithProducts(req.params.id);
      if (!categoryData) return res.status(404).json({ success: false, message: "Kategori tidak ditemukan" });
      res.status(200).json({ success: true, message: "Detail kategori berhasil diambil", data: categoryData });
    } catch (err) {
      res.status(500).json({ success: false, message: "Gagal mengambil detail kategori", error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      if (!req.body.category_name) return res.status(400).json({ success: false, message: "category_name wajib diisi" });
      const newCategory = await CategoryModel.createCategory(req.body);
      res.status(201).json({ success: true, message: "Kategori berhasil dibuat", data: newCategory });
    } catch (err) {
      res.status(400).json({ success: false, message: "Gagal membuat kategori", error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const updatedCategory = await CategoryModel.updateCategory(req.params.id, req.body);
      res.status(200).json({ success: true, message: "Kategori berhasil diperbarui", data: updatedCategory });
    } catch (err) {
      res.status(400).json({ success: false, message: "Gagal memperbarui kategori", error: err.message });
    }
  },

  destroy: async (req, res) => {
    try {
      const id = req.params.id;
      const productCount = await CategoryModel.countProductsInCategory(id);
      if (productCount > 0) {
        return res.status(400).json({ success: false, message: `Gagal hapus. Masih ada ${productCount} produk terkait.` });
      }
      const success = await CategoryModel.deleteCategory(id);
      if (!success) return res.status(404).json({ success: false, message: "Kategori tidak ditemukan" });
      res.status(200).json({ success: true, message: "Kategori berhasil dihapus" });
    } catch (err) {
      res.status(500).json({ success: false, message: "Gagal menghapus kategori", error: err.message });
    }
  }
};
