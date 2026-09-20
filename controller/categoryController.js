import * as CategoryModel from '../models/categoryModel.js';

export const CategoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = await CategoryModel.getAllCategories();
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json({ message: "Error fetching categories", error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const categoryData = await CategoryModel.findCategoryWithProducts(id);
      
      if (!categoryData) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.status(200).json({
        id: categoryData[0]?.id || id,
        category_name: categoryData[0]?.category_name || "",
        products: categoryData.products || []
      });
    } catch (err) {
      res.status(500).json({ message: "Error fetching category details", error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const body = req.body;
      if (!body.category_name) return res.status(400).json({ message: "category_name is required" });
      const newCategory = await CategoryModel.createCategory(body);
      res.status(201).json(newCategory);
    } catch (err) {
      res.status(400).json({ message: "Database error", error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedCategory = await CategoryModel.updateCategory(id, req.body);
      res.status(200).json(updatedCategory);
    } catch (err) {
      res.status(400).json({ message: "Database error", error: err.message });
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const productCount = await CategoryModel.countProductsInCategory(id);
      if (productCount > 0) {
        return res.status(400).json({ message: `Cannot delete category. There are ${productCount} products linked.` });
      }
      const success = await CategoryModel.deleteCategory(id);
      if (!success) return res.status(404).json({ message: "Category not found" });
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting category", error: err.message });
    }
  }
};
