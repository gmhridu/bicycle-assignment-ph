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

// update a product in db

const updateProductFromDB = async (
  productId: string,
  updates: Partial<TBicycle>,
) => {
  const result = await Product.findByIdAndUpdate(
    productId,
    {
      $set: updates,
    },
    { new: true },
  );

  return result;
};

// delete a product from db
const deleteProductFromDB = async (productId: string) => {
  const res = await Product.findByIdAndDelete(productId);

  return res;
};

export const productServices = {
  createProductIntoDB,
  getProductFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
};
