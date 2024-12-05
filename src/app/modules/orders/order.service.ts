import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrder = async (orderData: Omit<TOrder, 'totalPrice'>) => {
  const res = await Order.createOrderWithCalculation(orderData);

  return res;
};

const getOrderFromDB = async()=> {
  const res = await Order.find();

  return res;
}

const getTotalRevenue = async (): Promise<number> => {
  const revenue = await Order.getTotalRevenue();

  return revenue;
};

export const orderServices = {
  createOrder,
  getTotalRevenue,
  getOrderFromDB,
};
