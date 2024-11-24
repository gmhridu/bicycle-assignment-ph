import mongoose from "mongoose";

export type TOrder = {
    email: string;
    products: {
        product: mongoose.Types.ObjectId;
        quantity: number;
    }[];
    totalQuantity?: number;
    totalPrice: number;
}