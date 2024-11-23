import { Request, Response } from 'express';
import { productServices } from './product.service';
import { BicycleValidationSchema } from './product.validation';

// POST /api/products
// Create a product
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    // parse product with zod
    const parsedProduct = BicycleValidationSchema.parse(product);

    // create product
    const result = await productServices.createProductIntoDB(parsedProduct);

    res.status(200).json({
      success: true,
      message: 'Bicycle created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create Bicycle',
      error: error,
    });
  }
};

// GET /api/products
// get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getProductFromDB();

    res.status(200).json({
      success: true,
      message: 'Bicycles retrieved successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get Bicycles',
      error: error,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
};
