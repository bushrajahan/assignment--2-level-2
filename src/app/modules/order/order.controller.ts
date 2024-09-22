import { Request, Response } from "express";
import { orderService } from "./order.service";
import { emailSchema, orderSchema } from "./order.joi.validatio";


const createOrder = async(req:Request,res:Response)=>{
   try{
    const{error} = orderSchema.validate(req.body);
    if(error){
      console.log(error)
      return res.status(400).json({
        success:false,
        message:'validation error',
        data:error
      });

    }
    const order = req.body;
  
    const result = await orderService.createOrderInDB(order);
    res.status(200).json({
      success:true,
      message:'Data is created successfully',
      data:result
    })
   }catch(err:any){
    console.log(err);
    if(err.message.includes('Insufficient stock')){
      return res.status(400).json({
        success:false,
        message:'Insufficient quantity avaliable in Inventory0'
      })

    }
    res.status(500).json({
      success:false,
      message:'order is failed to create',
      data:err
    })
   }
}
const getOrder = async(req:Request,res:Response)=>{
  try{
  const result = await orderService.getOrderFromDB();
  if(result.length === 0) {
    res.status(404).json({
      status:false,
      message:'order  not found'
    })
  }
  //if order is found return success message 
  res.status(500).json({
    status:'success',
    message:'Orders fetched successfully',
    result:result
  })
    
  }
  catch(err){
    console.log(err);
    res.status(500).json({
      success:false,
      messsage:'oops!! order is failed to fatch',
      result:err
    })
  }  
}
const getOrderUsingEmail = async(req:Request,res:Response)=>{
  const{error} = emailSchema.validate(req.query);
  if(error){
    return res.status(400).json({
      success:false,
      message:'validation error',
      data:error
    })
  }
  
  const email = req.query.email as string;
  try{
    const result = await orderService.getOrderByEmailFromDB(email);
    res.status(200).json({
      success:true,
      message:'Orders fetched successfully for user email!',
      result:result
    })
  }catch(err){
    console.log(err)
    res.status(500).json({
      success:false,
      message:'oops!sorry order is fetching using email is not successfull',
      result:err
    })

  }


}
export const orderController = {
  createOrder,
  getOrder,
  getOrderUsingEmail
}