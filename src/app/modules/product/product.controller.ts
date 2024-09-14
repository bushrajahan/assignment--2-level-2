import { productService } from "./product.service";
import { Request, Response } from "express";

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
    });
  }
};

export const productController = {
  productCreate,
};
