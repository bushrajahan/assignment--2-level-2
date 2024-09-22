
import { OrderModel } from '../order.model';
import { ProductModel } from '../product.model';
import { Order } from './order.interface';

// Service function to create a new order in the database
const createOrderInDB = async (orderData: Order) => {
  try {
  const product = await ProductModel.findById(orderData.productId)
   if(!product){
    throw new Error('product is not found');
   }
   if(product.inventory.quantity<orderData.quantity){
    throw new Error("insufficient stock")
   }
   product.inventory.quantity-=orderData.quantity;
   
   product.inventory.inStock=product.inventory.quantity>0;
   //save the products 
   await product.save();
   const result=await OrderModel.create(orderData);
   return result;
  } catch (error:any) {
    throw new Error('Error creating order: ' + error.message);
  }
};

const getOrderFromDB = async()=>{
  const result = await OrderModel.find();
  return result;
}
const getOrderByEmailFromDB = async(email:String)=>{
  const result = await OrderModel.find({email}).exec();
  return result;

}
// Export the service
export const orderService = {
  createOrderInDB,
  getOrderFromDB,
  getOrderByEmailFromDB
};
