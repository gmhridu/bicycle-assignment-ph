import { Request, Response } from 'express';
import { productServices } from './product.service';
import { BicycleValidationSchema } from './product.validation';
import { isValidObjectId } from 'mongoose';

// POST /api/products
// Create a product
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    // parse product with zod
    const parsedProduct = BicycleValidationSchema.parse(product);

    if (!parsedProduct) {
      return res.status(400).json({
        success: false,
        message: 'Invalid data',
      });
    }

    // create product
    const result = await productServices.createProductIntoDB(parsedProduct);

    if(!result){
      return res.status(400).json({
        success: false,
        message: 'Failed to create Bicycle',
      });
    }

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

    if(!result){
      return res.status(404).json({
        success: false,
        message: 'No bicycles found',
      });
    }

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

// GET /api/products/:productId
// get single product
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;

    if (!isValidObjectId(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID',
      });
    }

    const result = await productServices.getSingleProductFromDB(productId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Bicycle not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Bicycle retrieved successfully',
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get Bicycle',
      error: error,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
};
