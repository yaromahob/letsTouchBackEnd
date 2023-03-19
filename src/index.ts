import express, {Request, Response} from 'express';

const app = express();
const port = 3000;

const products = [{title: 'tomato'}, {title: 'orange'}];
const addresses = [{value: 'village 15'}, {value: 'agaSTREET 85'}];

app.get('/products', (req: Request, res: Response) => {
  res.send(products);
});

app.get('/addresses', (req: Request, res: Response) => {
  res.send(addresses);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});