import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrder = async (orderData: Omit<TOrder, 'totalPrice'>) => {
  const res = await Order.createOrderWithCalculation(orderData);

  return res;
};

export const orderServices = {
  createOrder,
};
