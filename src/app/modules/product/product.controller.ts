import { productService } from './product.service';
import { Request, Response } from 'express';

import { console } from 'inspector';
import {
  productIdSchema,
  productSchema,
  searchTermSchema,
} from './product.joi.validation';

const productCreate = async (req: Request, res: Response) => {
  try {
    const productData = req.body; // Use req.body directly
    const { error } = productSchema.validate(productData);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'validatio error',
        data: error,
      });
    }
    //if validate tha proceed with creatig product
    const result = await productService.createProductFromDB(productData);
    res.status(201).json({
      success: true,
      message: 'product  created successfully',
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      data: err,
    });
  }
};
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await productService.getProductfromDB();
    res.status(200).json({
      success: true,
      message: 'Product fetched  successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'server error',
      result: err,
    });
  }
};

//getsingledata
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { error } = productIdSchema.validate(req.params);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID',
        result: error,
      });
    }
    const { productId } = req.params;

    console.log('Product ID:', productId);

    const result = await productService.getSingleProductFromDB(productId);

    // Check if product exists
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully',
      data: result,
    });
  } catch (err) {
    console.error('Error fetching product:', err); // Use console.error for errors
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { error } = productSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'error validation',
        result: error,
      });
    }

    const { productId } = req.params;

    const productData = req.body;

    console.log(`Updating product ${productId} with data:`, productData); // Log the update details

    const updatedProduct = await productService.updateProductInDB(
      productId,
      productData,
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      result: updatedProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { error } = productIdSchema.validate(req.params);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product Id',
        data: error,
      });
    }
    const productId = req.params.productId;
    const deletedProduct = await productService.deleteProductFromDB(productId);
    if (!deletedProduct) {
      res.status(400).json({
        success: false,
        message: 'product is not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'product is deleted successfully',
      data: null,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      suceess: false,
      message: 'product is failed to delete',
      result: err,
    });
  }
};
const searchProduct = async (req: Request, res: Response) => {
  try {
    const { error } = searchTermSchema.validate(req.query);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product Id',
        data: error,
      });
    }

    const searchTerm = req.query.searchTerm as string;

    if (!searchTerm) {
      return res.status(400).json({
        success: false,
        message: 'Search term is required',
      });
    }

    const products = await productService.searchProductFromDB(searchTerm);

    return res.status(200).json({
      success: true,
      message: 'Product(s) found successfully',
      result: products,
    });
  } catch (err) {
    // Log full error details for debugging
    console.error('Error during product search:', err);

    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: err instanceof Error ? err.message : 'Unknown error',
    });
  }
};

export const productController = {
  productCreate,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};
