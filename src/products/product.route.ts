import { Router } from 'express';
import { ProductController } from './product.controller';

const router = Router();

router.post('/', ProductController.createProduct);
router.get('/', ProductController.getAllProducts);
router.get('/:productId', ProductController.getSingleProduct);
router.put('/:productId', ProductController.updateAProduct);
router.delete('/:productId', ProductController.deleteAProduct);

export const ProductRouter = router;
