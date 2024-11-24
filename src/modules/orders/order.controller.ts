import { Request, Response } from 'express';
import { orderValidationSchemaZod } from './order.validation.zod';
import { orderServices } from './order.service';
import { TOrder } from './order.interface';
import mongoose from 'mongoose';

const createOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const orderData = req.body;

    if (!orderData) {
      return res.status(400).json({
        success: false,
        message: 'No order data provided',
      });
    }

    const parsedOrderData = orderValidationSchemaZod.parse(orderData);

    const matchedOrderData: Omit<TOrder, 'totalPrice'> = {
      ...parsedOrderData,
      products: parsedOrderData.products.map((item) => ({
        ...item,
        product: new mongoose.Types.ObjectId(item.product),
      })),
    };

    const order = await orderServices.createOrder(matchedOrderData);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create order',
      error: error,
    });
  }
};

// get all orders
const getOrders = async (req: Request, res: Response): Promise<any> => {
  try {
    const orders = await orderServices.getOrderFromDB();

    res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully',
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve orders',
      error: error,
    });
  }
};

// get totalRevenue
const getTotalRevenue = async (req: Request, res: Response): Promise<any> => {
  try {
    const getTotal = await orderServices.getTotalRevenue();

    res.status(200).json({
      success: true,
      message: 'Total revenue retrieved successfully',
      data: {
        totalRevenue: getTotal,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve total revenue',
      error: error,
    });
  }
};

export const orderController = {
  createOrder,
  getOrders,
  getTotalRevenue,
};
