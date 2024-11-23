import { TBicycle } from './product.interface';
import Product from './product.model';

// create product into db
const createProductIntoDB = async (productData: TBicycle) => {
  const res = await Product.create(productData);

  return res;
};

// fetch all products from db
const getProductFromDB = async () => {
  const res = await Product.find();

  return res;
};

// get a single product from db
const getSingleProductFromDB = async (productId: string) => {
  const res = await Product.findById(productId);

  return res;
};

export const productServices = {
  createProductIntoDB,
  getProductFromDB,
  getSingleProductFromDB,
};
