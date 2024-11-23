import { Router } from 'express';
import { ProductController } from './product.controller';

const router = Router();

router.post('/', ProductController.createProduct);
router.get('/', ProductController.getAllProducts);

export const ProductRouter = router;
