import express, { Request, Response } from 'express';
import { ProductRouter } from './modules/products/product.route';
import { orderRouter } from './modules/orders/order.route';

const app = express();

// middleware
app.use(express.json());

// routes
app.use('/api/products', ProductRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Bicycle Shop!');
});

export default app;