import { OrderModel } from '../order.model';
import { ProductModel } from '../product.model';
import { Order } from './order.interface';

// Service function to create a new order in the database
const createOrderInDB = async <T=Order>(orderData: Order):Promise<T | {error:string}> => {
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
    return result as unknown as T;
  } catch (error: unknown) {
    console.error('Error creating order',error);
    return{error:'Error creating order'}
  }
};

const getOrderFromDB = async <T = Order[]>(email?: string): Promise<T> => {
  try{
   const orders = email? await OrderModel.find({email}).lean():await OrderModel.find().lean();
    return orders as unknown as T;
}catch(error){
  console.error('Error fetching orders:', error);
  return [] as unknown as T;
}
}

// Export the service
export const orderService = {
  createOrderInDB,
  getOrderFromDB,

};
