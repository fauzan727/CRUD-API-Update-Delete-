import { Router } from 'express';
import { CategoryController } from '../controller/categoryController.js';

const router = Router();

router.get('/', CategoryController.getCategories); 
router.get('/:id', CategoryController.getById);
router.post('/', CategoryController.create); 
router.put('/:id', CategoryController.update);
router.delete('/:id', CategoryController.destroy);

export default router;
