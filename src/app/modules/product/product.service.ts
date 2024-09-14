import { ProductModel } from "../product.model";
import { Product } from "./product.interface";

const createProductFromDB = async (product: Product) => {
  const result = await ProductModel.create(product); // Use create to insert a new product
  return result;
};

export const productService = {
  createProductFromDB,
};
