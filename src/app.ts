import express, { Request, Response } from 'express';
import cors from 'cors';
import { productRoute } from './app/modules/product/product.route';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Application routes 
app.use('/api/v1', productRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
