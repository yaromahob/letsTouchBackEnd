"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const products = [{ id: 1, title: 'tomato' }, { id: 2, title: 'orange' }];
const addresses = [{ id: 1, value: 'village 15' }, { id: 2, value: 'agaSTREET 85' }];
const parserMiddleware = (0, body_parser_1.default)();
app.use(parserMiddleware);
app.get('/products', (req, res) => {
    if (req.query.title) {
        const searchTitle = req.query.title.toString();
        res.send(products.filter(p => p.title.includes(searchTitle)));
    }
    else {
        res.send(products);
    }
});
app.get('/products/:id', (req, res) => {
    const product = products.find(pr => pr.id === +req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
});
app.post('/products', (req, res) => {
    const newProduct = {
        id: +(new Date()),
        title: req.body.title
    };
    products.push(newProduct);
    res.status(201).send(newProduct);
});
app.put('/products/:id', (req, res) => {
    const newProduct = products.find(pr => pr.id === +req.params.id);
    if (newProduct) {
        newProduct.title = req.body.title;
        res.send(newProduct);
    }
    res.send(404);
});
app.delete('/products/:id', (req, res) => {
    products.forEach((pr, index) => {
        if (pr.id === +req.params.id) {
            products.splice(index, 1);
            res.send(204);
        }
    });
    res.send(404);
});
app.get('/addresses', (req, res) => {
    res.send(addresses);
});
app.get('/addresses/:id', (req, res) => {
    const address = addresses.find(pr => pr.id === +req.params.id);
    if (address) {
        res.send(address);
    }
    else {
        res.send(404);
    }
    res.send(addresses);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
