import express from 'express';
import { neworderController } from './neworder.controller';


const router = express.Router();

// Route for creating an order
router.post('/', neworderController.createOrder);

router.get('/', neworderController.getOrder);



export const OrderRouter = router;
