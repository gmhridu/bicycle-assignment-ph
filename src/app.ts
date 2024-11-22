import express, { Request, Response } from 'express';

const app = express();

// middleware
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Bicycle Shop!');
});

export default app;
