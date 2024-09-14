import { ProductModel } from "../product.model";
import { Product } from "./product.interface";

const createProductFromDB = async (product: Product) => {
  const result = await ProductModel.create(product); // Use create to insert a new product
  return result;
};
const getProductfromDB = async()=>{
  const result = await ProductModel.find();
  return result;
}
const getSingleProductFromDB = async(id:string)=>{
  const result = await ProductModel.findOne({id});
  return result;
}

export const productService = {
  createProductFromDB,
  getProductfromDB,
  getSingleProductFromDB
};
