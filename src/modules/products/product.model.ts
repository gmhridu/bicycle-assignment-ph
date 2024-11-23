import { model, Schema } from "mongoose";
import { TBicycle } from "./product.interface";

const productSchema = new Schema<TBicycle>({
name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  type: {
    type: String,
    required: true,
    enum: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  inStock: {
    type: Boolean,
    required: true,
    default: true,
  }
}, {timestamps: true});

const Product = model<TBicycle>('Product', productSchema)

export default Product;
