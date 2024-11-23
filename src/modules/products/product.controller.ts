import { Request, Response } from 'express';
import { productServices } from './product.service';
import { BicycleValidationSchema } from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;

    // parse product with zod
    const parsedProduct = BicycleValidationSchema.parse(product);

    // create product
    const result = await productServices.createProductIntoDB(parsedProduct);

    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create product',
      error: error,
    });
  }
};

export const ProductController = {
  createProduct,
};
