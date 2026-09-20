import { Router } from 'express';
// Mengimpor objek ProductController dari folder controller yang benar
import { ProductController } from '../controller/productController.js';

const router = Router();

// Menggunakan fungsi di dalam objek ProductController
router.get('/', ProductController.getProducts); 
router.get('/:id', ProductController.getById);
router.post('/', ProductController.create); 
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.destroy);

export default router;
