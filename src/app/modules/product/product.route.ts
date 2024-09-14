import express from "express"
import { productService } from "./product.service";
import { productController } from "./product.controller";
const router = express.Router();

router.post('/',productController.productCreate);
router.get('/',productController.getAllProduct);
router.get('/:productId',productController.getSingleProductFromDB)

export const productRoute = router;