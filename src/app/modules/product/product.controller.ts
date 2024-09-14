import { CommandSucceededEvent } from "mongodb";
import { productService } from "./product.service";
import { Request, Response } from "express";
import { ProductModel } from "../product.model";

const productCreate = async (req: Request, res: Response) => {
  try {
    const productData = req.body; // Use req.body directly
    const result = await productService.createProductFromDB(productData);
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      data:err
    });
  }
};
const getAllProduct = async(req:Request,res:Response)=>{
  try{
    const result = await productService.getProductfromDB();
    res.status(200).json({
      success:true,
      message:'Product are retrived from successfully',
      data:result
    })
  }
  catch(err){
    console.log(err);
    res.status(500).json({
      success:false,
      message:'server error',
      result:err
    })
  }
}

//getsingledata 
const getSingleProductFromDB = async(req:Request,res:Response)=>{
  try{
    const {studentId}= req.params;
    const result = await productService.getSingleProductFromDB(studentId)
  
    res.status(200).json({
        success:true,
        message:'Product is retrived from Database',
        data:result
    })
  }catch(err){
    console.log(err);
    res.status(500).json({
      success:false,
      message:'server error',
      result:err
    })
  }
}
 
export const productController = {
  productCreate,
  getAllProduct
};
