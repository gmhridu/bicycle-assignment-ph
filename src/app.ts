import express, { Request, Response } from 'express';
import { ProductRouter } from './modules/products/product.route';

const app = express();

// middleware
app.use(express.json());

// routes
app.use('/api/products', ProductRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Bicycle Shop!');
});

export default app;