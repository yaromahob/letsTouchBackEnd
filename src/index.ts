import express, {Request, Response} from 'express';
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 5000;

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}];
const addresses = [{id: 1, value: 'village 15'}, {id: 2, value: 'agaSTREET 85'}];

const parserMiddleware = bodyParser();
app.use(parserMiddleware);

app.get('/products', (req: Request, res: Response) => {
  if (req.query.title) {
    const searchTitle = req.query.title.toString();
    res.send(products.filter(p => p.title.includes(searchTitle)));
  } else {
    
    res.send(products);
  }
});

app.get('/products/:id', (req: Request, res: Response) => {
  const product = products.find(pr => pr.id === +req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});

app.post('/products', (req: Request, res: Response) => {
  const newProduct = {
    id: +(new Date()),
    title: req.body.title
  };
  
  products.push(newProduct);
  res.status(201).send(newProduct);
});

app.put('/products/:id', (req: Request, res: Response) => {
  const newProduct = products.find(pr => pr.id === +req.params.id);
  if (newProduct) {
    newProduct.title = req.body.title;
    res.send(newProduct);
  }
  res.send(404);
});

app.delete('/products/:id', (req: Request, res: Response) => {
  products.forEach((pr, index) => {
    if (pr.id === +req.params.id) {
      products.splice(index, 1);
      res.send(204);
    }
  });
  res.send(404);
});

app.get('/addresses', (req: Request, res: Response) => {
  res.send(addresses);
});

app.get('/addresses/:id', (req: Request, res: Response) => {
  const address = addresses.find(pr => pr.id === +req.params.id);
  if (address) {
    res.send(address);
  } else {
    res.send(404);
  }
  res.send(addresses);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});