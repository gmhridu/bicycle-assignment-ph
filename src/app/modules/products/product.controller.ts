import { Request, Response } from 'express';
import { productServices } from './product.service';
import { BicycleValidationSchema } from './product.validation';
import { isValidObjectId } from 'mongoose';

// POST /api/products
// Create a product
const createProduct = async (req: Request, res: Response): Promise<any> => {
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

    if (!result) {
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
const getAllProducts = async (req: Request, res: Response): Promise<any> => {
  try {
    const result = await productServices.getProductFromDB();

    if (!result) {
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

const getSingleProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const { productId } = req.params;

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

// PUT /api/products/:productId
// update a product
const updateAProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const { productId } = req.params;

    // validate product id
    if (!isValidObjectId(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID',
      });
    }

    const updates = req.body;

    const parsedPriceAndQuantity =
      await BicycleValidationSchema.partial().parse(updates);

    const result = await productServices.updateProductFromDB(
      productId,
      parsedPriceAndQuantity,
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Bicycle not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Bicycle updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to updated Bicycle',
      error: error,
    });
  }
};

// DELETE /api/products/:productId
// delete a product

const deleteAProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const { productId } = req.params;

    // validate product id
    if (!isValidObjectId(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID',
      });
    }

    const result = await productServices.deleteProductFromDB(productId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Bicycle not found',
      });
    }

    res.status(201).json({
      status: true,
      message: 'Bicycle deleted successfully',
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to updated Bicycle',
      error: error,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateAProduct,
  deleteAProduct,
};
