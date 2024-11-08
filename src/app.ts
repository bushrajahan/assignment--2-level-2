import express, { Request, Response } from 'express';
import cors from 'cors';
import { productRoute } from './app/modules/product/product.route';
import { OrderRouter } from './app/modules/order/order.router';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Application routes
app.use('/api/products', productRoute);
app.use('/api/orders', OrderRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
  });

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});



export default app;
