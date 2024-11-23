import { TBicycle } from './product.interface';
import Product from './product.model';

const createProductIntoDB = async (productData: TBicycle) => {
  const res = await Product.create(productData);

  return res;
};

const getProductFromDB = async () => {
  const res = await Product.find();

  return res;
};

export const productServices = {
  createProductIntoDB,
  getProductFromDB,
};
