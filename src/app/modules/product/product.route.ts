import express from "express"
import { productService } from "./product.service";
import { productController } from "./product.controller";
const router = express.Router();
router.put('/:productId',productController.updateProduct)
router.post('/',productController.productCreate);
router.get('/',productController.getAllProduct);
router.get('/:productId',productController.getSingleProduct)

router.delete('/:productId',productController.deleteProduct)
router.get('/api/products',productController.searchProduct)

export const productRoute = router;