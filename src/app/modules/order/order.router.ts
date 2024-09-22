import express from 'express';
import { orderController } from './order.controller';

const router = express.Router();

// Route for creating an order
router.post('/', orderController.createOrder);

router.get('/', orderController.getOrder);
router.get('/', orderController.getOrderUsingEmail);

export const OrderRouter = router;
