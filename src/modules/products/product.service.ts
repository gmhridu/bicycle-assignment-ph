import { TBicycle } from './product.interface';
import Product from './product.model';

const createProductIntoDB = async (productData: TBicycle) => {
  const res = await Product.create(productData);

  return res;
};

export const productServices = {
  createProductIntoDB,
};
