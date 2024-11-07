import { Request, Response } from 'express';
import { orderService } from './order.service';
import { orderSchema } from './order.joi.validatio';
import { Order } from './order.interface';



const createOrder = async (req: Request, res: Response): Promise<Response<{ success: boolean; message: string; data: Order | null }>> =>{
  try {
    const { error } = orderSchema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: 'validation error',
        data: error.details,
      });
    }
    const order = req.body;

    const result = await orderService.createOrderInDB(order) ;
    return res.status(200).json({
      success: true,
      message: 'Data is created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
    if (err instanceof Error && err.message.includes('Insufficient stock')) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity avaliable in Inventory0',
      });
    }
    res.status(500).json({
      success: false,
      message: 'order is failed to create',
      data: err,
    });
  }
  return res.status(500).json({
    success:false,
    message:'Unexpected error occurred'
  })
};
const getOrder = async <T extends Array<unknown> = Order[]>(req: Request, res: Response): Promise<Response<T>> => {
  try {


    const email = req.query.email as string | undefined;

    // Corrected this line
    const result: T = email ? await orderService.getOrderFromDB<T>(email) : await orderService.getOrderFromDB();

    if (!result || (Array.isArray(result) && result.length === 0)) {
      return res.status(404).json({
        success: false,
        message: email ? 'No orders found for this email' : 'No orders found',
      });
    }

    return res.status(200).json({
      success: true,
      message: email ? 'Orders fetched successfully for user email!' : 'Orders found',
      data: result,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching orders.',
    });
  }
};


  

// const getOrderUsingEmail = async (req: Request, res: Response) => {
//   const { error } = emailSchema.validate(req.query);
//   if (error) {
//     return res.status(400).json({
//       success: false,
//       message: 'validation error',
//       data: error,
//     });
//   }

//   const email = req.query.email as string;
//     console.log(email)
//   try {
//     const result = await orderService.getOrderByEmailFromDB(email);
//     res.status(200).json({
//       success: true,
//       message: 'Orders fetched successfully for user email!',
//       result: result,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       message: 'oops!sorry order is fetching using email is not successfull',
//       result: err,
//     });
//   }
// };
export const neworderController = {
  createOrder,
  getOrder

};
