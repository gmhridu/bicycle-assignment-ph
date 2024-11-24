import mongoose, { Model } from "mongoose";

export type TOrder = {
    email: string;
    products: {
        product: mongoose.Types.ObjectId;
        quantity: number;
    }[];
    totalQuantity?: number;
    totalPrice: number;
}

// extend the mongoose model type

export interface IOrderModel extends Model<TOrder>{
    createOrderWithCalculation(
        orderData: Omit<TOrder, "totalPrice">
      ): Promise<TOrder>;
    
}