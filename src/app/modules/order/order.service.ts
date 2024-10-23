import { OrderModel } from '../order.model';
import { ProductModel } from '../product.model';
import { Order } from './order.interface';

// Service function to create a new order in the database
const createOrderInDB = async (orderData: Order) => {
  try {
    const product = await ProductModel.findById(orderData.productId);
    if (!product) {
     console.error('Product not found ');
     return {error:'Product not found'}
    }
    if (product.inventory.quantity < orderData.quantity) {
       console.error('Insufficient stock')
       return{error:'Insufficient stock'}
    }
    product.inventory.quantity -= orderData.quantity;

    product.inventory.inStock = product.inventory.quantity > 0;
    //save the products
    await product.save();
    const result = await OrderModel.create(orderData);
    return result;
  } catch (error: unknown) {
    console.error('Error creating order',error);
    return{error:'Error creating order'}
  }
};

const getOrderFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};
const getOrderByEmailFromDB = async (email: string) => {
  let query = {};
   //if email is porvided,set the query that filter based on email
   if(email){
    query = {email};
   }
   console.log(email)
  const result = await OrderModel.find(query).exec();
  return result;
};
// Export the service
export const orderService = {
  createOrderInDB,
  getOrderFromDB,
  getOrderByEmailFromDB,
};
