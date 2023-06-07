import express from 'express';
import mongoose from 'mongoose';
import { Product, Customer } from './models/models.js';
import open from 'open';

const app = express();
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Successfully connected to the database');
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
      open(`http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

app.get('/', async (req, res) => {
  try {
    const customers = await Customer.find().populate('product_id');
    const output = customers.map((customer) => {
      const product = customer.product_id;
      return `${customer.name}: ${product.title} Price:${product.price}`;
    });
    res.send(`Users purchases:\n${output.join('\n')}`);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Error retrieving data');
  }
});
