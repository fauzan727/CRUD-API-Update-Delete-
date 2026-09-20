import { Router } from 'express';
import { ProductController } from '../controller/productController.js';

const router = Router();

router.get('/', ProductController.getProducts); 
router.get('/:id', ProductController.getById);
router.post('/', ProductController.create); 
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.destroy);

export default router;
