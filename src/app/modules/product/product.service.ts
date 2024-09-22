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
  const result = await ProductModel.findById(id);
  return result;
}
//update product 
const updateProductInDB = async (productId: string, productData: Partial<Product>) => {
  console.log('Updating product with ID:', productId); // Log product ID
  console.log('Product data:', productData);           // Log the product data being updated

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    productId,
    { $set: productData },
    { new: true, runValidators: true }
  );

  return updatedProduct;
};
const deleteProductFromDB = async(id:string)=>{
  const deleteProduct = await ProductModel.findByIdAndDelete(id);
  return deleteProduct;
}
const searchProductFromDB = async (searchTerm: string) => {
  try {
    const regex = new RegExp(searchTerm, 'i');
    const products = await ProductModel.find({
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
        { tags: { $regex: regex } }
      ]
    });
    return products;
  } catch (err) {
    console.error('Error in searchProductFromDB:', err);
    throw err; // Rethrow the error to be caught by the controller
  }
}
//create order into DB 

export const productService = {
  createProductFromDB,
  getProductfromDB,
  getSingleProductFromDB,
  updateProductInDB,
  deleteProductFromDB,
  searchProductFromDB
};
