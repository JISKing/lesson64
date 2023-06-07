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
      return `<div style="border: 1px solid #000; width: fit-content; margin: 0 0 20px 0; padding: 0 10px">
      <span>${customer.name}:</span> <span style="padding: 0 10px">${customer.product_id.title}</span>  <span>Price: ${customer.product_id.price}</span>
    </div>`;
    });
    res.send(`<h1>Users purchases:</h1>\n${output.join('\n')}`);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Error retrieving data');
  }
});
