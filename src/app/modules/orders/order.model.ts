import { model, Schema } from 'mongoose';
import { IOrderModel, TOrder } from './order.interface';
import Product from '../products/product.model';

const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: true,
      validate: /\S+@\S+\.\S+/,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalQuantity: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true },
);

/* 
Static Method to create Order with total price calculation
*/

orderSchema.statics.createOrderWithCalculation = async function(orderData: Omit<TOrder, 'totalPrice'>):Promise<TOrder>{
    const {email, products} = orderData;

    let totalPrice = 0;

    for(const item of products){
        const product = await Product.findById(item.product);

        if(!product){
            throw new Error(`Product with ID: ${item.product} not found`);
        }

        if(product.quantity < item.quantity){
            throw new Error(`Insufficient stock for product: ${product.name} (Stock: ${product.quantity})`);
        }

        // calculate total price 
        totalPrice += product.price * item.quantity;

        // update stock after order
        product.quantity -= item.quantity;
        await product.save();
    }

    const totalQuantity = products.reduce((sum, item)=> sum + item.quantity, 0);

    const order = new this({
        email,
        products,
        totalQuantity,
        totalPrice,
    })

    return await order.save();
}

// for total revenue

orderSchema.statics.getTotalRevenue = async function():Promise<number>{
  const result = await this.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: {$sum: '$totalPrice'},
      }
    }
  ])

  return result.length > 0 ? result[0].totalRevenue : 0;
}

export const Order = model<TOrder, IOrderModel>('Order', orderSchema);
